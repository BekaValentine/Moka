function MokaView(){
	this.extend( MokaResponder );
	
	/*	View hierarchy	*/
	var _superview = null;
	var _superviewToMoveTo = null;
	var _subviews = new MokaArray;
	var _panel = null;
	var _panelToMoveTo = null;
	
	/*	Display	*/
	var _needsDisplay = NO;
	var _displayTimer = null;
	
	/*	Drawing	*/
	var _drawingColor = MokaColor.clearColor();
	
	/*	Resizing subviews	*/
	var _autoresizesSubviews = YES;
	var _autoresizingMask = MokaViewNotSizable;
	
	/*	Hidden	*/
	var _isHidden = NO;
	
	/*	Frame	*/
	var _frame = new MokaRect;
	var _zIndex = 0;
	
	/*	Bounds	*/
	var _bounds = new MokaRect;
	
	/*	Notifications	*/
	var _postsFrameChangedNotifications = NO;
	var _postsBoundsChangedNotifications = NO;
	
	/*	Dragging	*/
	var _registeredDraggedTypes = MokaArray.make().init();
	
	/*	Cursor Rects	*/
	var _cursorRects = MokaDictionary.make().init();
	
	/*	Tool tips	*/
	var _toolTip = null;
	var _toolTips = MokaArray.make().init();
	
	/*	Key view loop	*/
	var _nextKeyView = null;
	var _previousKeyView = null;
	
	/*	Focus Ring	*/
	var _hasFocusRing = NO;
	
	/*	Live Resizing	*/
	var _inLiveResize = NO;
	
	/*	Page Display and Drawing Canvas	*/
	var _pageDisplay = document.createElement('div');
	_pageDisplay.style.position = "absolute";
	_pageDisplay.style.left = "0" + MokaPageSizeUnits;
	_pageDisplay.style.top = "0" + MokaPageSizeUnits;
	_pageDisplay.style.width = "0" + MokaPageSizeUnits;
	_pageDisplay.style.height = "0" + MokaPageSizeUnits;
	_pageDisplay.style.overflow = "hidden";
	_pageDisplay.setAttribute("class",this.constructor.className());
	
	var self = this;
	_pageDisplay.view = function(){
		return self;
	}
	
	var _drawingCanvas = document.createElement('div');
	_drawingCanvas.setAttribute("id","drawingCanvas");
	_drawingCanvas.style.position = "absolute";
	_drawingCanvas.style.left = "0" + MokaPageSizeUnits;
	_drawingCanvas.style.top = "0" + MokaPageSizeUnits;
	_drawingCanvas.style.width = "100%";
	_drawingCanvas.style.height = "100%";
	_pageDisplay.appendChild(_drawingCanvas);
	
	/*	Skin	*/
	var _skin = document.createElement('div');
	_skin.setAttribute("id","skin");
	_skin.style.width = "100%";
	_skin.style.height = "100%";
	_skin.style.position = "absolute";
	_skin.style.left = 0;
	_skin.style.top = 0;
	_skin.style.zIndex = -10000;
	_drawingCanvas.appendChild(_skin);
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_subviews.init();
		_cursorRects.init();
		_toolTips.init();
		
		return this;
	}
	
	//Focus Ring
	/*bool*/ this.hasFocusRing = function(){
		return _hasFocusRing;
	}	
	/*void*/ this.setHasFocusRing = function( yn ){
		if( typeof(yn) != "boolean" ){ return; }
		_hasFocusRing = yn;
		if( !yn ){ this.hideFocusRing(); }
	}
	/*void*/ this.showFocusRing = function(){
		if( this.hasFocusRing() ){
			this.pageDisplay().style.outline = "2" + MokaPageSizeUnits + " solid lightgrey";
		}
	}
	/*void*/ this.hideFocusRing = function(){
		this.pageDisplay().style.outline = "none";
	}
	
	//Managing the view hierarchy
	/*MokaView*/ this.superview = function(){
		return _superview;
	}
	/*void*/ this.removeFromSuperview = function(){
		if( this.superview() ){
			this.superview().removeSubview(this);
		}
	}	
	/*void*/ this.viewWillMoveToSuperview = function( aView ){
		if( typeof aView == undefined ){ return; }
		if( aView == null ){ _superviewToMoveTo = null; return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		this.removeFromSuperview();
		
		_superviewToMoveTo = aView;
	}
	/*void*/ this.viewDidMoveToSuperview = function(){
		_superview = _superviewToMoveTo;
	}	
	/*void*/ this.viewWillMoveToPanel = function(aPanel){
		if( typeof aPanel == undefined ){ return; }
		if( aPanel == null ){ _panelToMoveTo = null; return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		
		_panelToMoveTo = aPanel;
	}
	/*void*/ this.viewDidMoveToPanel = function(){
		_panel = _panelToMoveTo;
	}	
	/*MokaArray*/ this.subviews = function(){
		return _subviews;
	}	
	/*void*/ this.addSubview = function( aView ){
		if( typeof aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		aView.viewWillMoveToPanel(this.panel());
		aView.viewWillMoveToSuperview(this);
		this.subviews().addObject(aView);
		aView.viewDidMoveToSuperview();
		aView.viewDidMoveToPanel();
		aView.setNextResponder(this);
		
		this.didAddSubview(aView);
		
		var viewBefore = 0;
		for( var i = 0; i < this.subviews().count(); i++ ){
			var v = this.subviews().objectAtIndex(i);	
			v.pageDisplay().style.zIndex = i;
			if( aView.frame().origin().y() > v.frame().origin().y() || (aView.frame().origin().y() == v.frame().origin().y() && aView.frame().origin().x() > v.frame().origin().x() )){
				viewBefore = i;
			}
		}
		viewBefore = this.subviews().objectAtIndex(viewBefore);
		aView.setNextKeyView(viewBefore.nextKeyView())
		viewBefore.setNextKeyView(aView);
		aView.nextKeyView()._setPreviousKeyView(aView);
		aView._setPreviousKeyView(viewBefore);
		
		
		
		this.display();
	}
	/*void*/ this.didAddSubview = function( aView ){
		if( typeof aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		if( !this.subviews().containsObject(aView) ){ return; }
		
		//subclasses can override
	}
	/*void*/ this.willRemoveSubview = function(aView){
		
	}
	/*void*/ this.removeSubview = function( aView ){
		if( typeof aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		if( !this.subviews().containsObject(aView) ){ return; }
		
		this.willRemoveSubview(aView);

		this.eraseView(aView);
		aView.viewWillMoveToPanel(null);
		aView.viewWillMoveToSuperview(null);
		this.subviews().removeObject(aView);
		aView.viewDidMoveToSuperview();
		aView.viewDidMoveToPanel();
		aView.setNextResponder(null);
		
		var subv = this.subviews();
		this.subviews().each(function(v){
			v.pageDisplay().style.zIndex = subv.indexOfObject(v);
		});
		this.display();
	}
	/*void*/ this.addSubviewWithPositionRelativeToView = function(aView, place, otherView){
		if( !aView ){
			return;
		}
		
		if( !place ){
			return;
		}
		
		if( !otherView ){
			return;
		}
		
		if( typeof(aView.isKindOfClass) != "function" ){
			return;
		}

		if( !aView.isKindOfClass(MokaView) ){
			return;
		}

		if( typeof(otherView.isKindOfClass) != "function" ){
			return;
		}

		if( !otherView.isKindOfClass(MokaView) ){
			return;
		}

		if( place == MokaPanelAbove ){
			this.subviews().insertObjectAtIndex(aView, this.subviews().indexOfObject(otherView)+1 );
		} else if( place == MokaPanelBelow ){
			this.subviews().insertObjectAtIndex(aView, this.subviews().indexOfObject(otherView) );
		} else {
			return;
		}
		
		aView.viewWillMoveToSuperview(this);
		aView.viewDidMoveToSuperview();
		aView.viewWillMoveToPanel(this.panel());
		aView.viewDidMoveToPanel();
		aView.setNextResponder(this);
		this.drawSubview(aView);
		
		var subv = this.subviews();
		this.subviews().each(function(v){
			v.pageDisplay().style.zIndex = subv.indexOfObject(v);
		});
		this.display();
	}
	/*void*/ this.removeFromSuperview = function(){
		if( this.superview() ){
			this.superview().removeSubview(this);
		}
	}
	/*void*/ this.replaceSubviewWithView = function(aSubview,aView){
		if( !aSubview ){
			return;
		}
		
		if( !aView ){
			return;
		}
		
		if( typeof(aSubview.isKindOfClass) != "function" ){
			return;
		}

		if( !aSubview.isKindOfClass(MokaView) ){
			return;
		}
		
		if( typeof(aView.isKindOfClass) != "function" ){
			return;
		}

		if( !aView.isKindOfClass(MokaView) ){
			return;
		}

		this.addSubviewWithPositionRelativeToView(aView, MokaPanelAbove, aSubview);
		this.removeSubview(aSubview);
		this.display();
	}
	/*bool*/ this.isDescendantOf = function(aView){
		if( !aView ){ return NO; }
		if( typeof(aView.isKindOfClass) != "function" ){ return NO; }
		if( !aView.isKindOfClass(MokaView) ){ return NO; }
		
		return (this.superview() == aView) || ( this.superview() ? this.superview().isDescendantOf(aView) : NO );
	}
	/*MokaView*/ this.opaqueAncestor = function(){
		if( this.isOpaque() ){ return this; }
		else if( this.superview() == null ){ return null; }
		else{ return this.superview().opaqueAncestor(); }
	}
	/*MokaView*/ this.ancestorSharedWithView = function(aView){
		if( this == aView || aView.isDescendantOf(this) ){
			return this;
		} else if( aView.isDescendantOf(this.superview()) ){
			return this.superview();
		} else if( !this.superview() ){
			return null;
		} else {
			return this.superview().ancestorSharedWithView(aView);
		}
	}
	/*void*/ this.sortSubviewsUsingFunctionWithContext = function(sortFunction,contextData){
		
		_subviews = this.subviews().sortedArrayUsingFunctionWithContext(sortFunction,contextData);
		
		this.display();
	}	
	/*MokaPanel*/ this.panel = function(){
		return _panel;
	}	
	/*void*/ this.setPanel = function(aPanel){
		if( typeof aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		
		if( aPanel ){
			aPanel.contentView().addSubview(this);
		} else if( this.superview() ){
			this.superview().removeSubview(this);
		} else {
			_panel = null;
		}
	}
	
	//Finding views with tags
	/*MokaView*/ this.viewWithTag = function(aTag){
		if( !is(aTage,"int") ){ return; }
		
		for( var i = 0; i < this.subviews().count(); i++ ){
			var v = this.subviews().objectAtIndex(i);
			if( v.tag() == aTag ){
				return v;
			}
		}
		
		return null;
	}
	
	//Converting Coordinates
	/*MokaPoint*/ this.convertPointFromView = function( aPoint, aView ){
		if( !aPoint ){ return; }
		if( !aView ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){	return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){	return; }

		
		return this.convertPointFromPage( aView.convertPointToPage(aPoint) );
	}
	/*MokaPoint*/ this.convertPointToView = function(aPoint, aView){
		if( !aPoint ){ return; }
		if( !aView ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){	return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){	return; }
		

		return aView.convertPointFromPage( this.convertPointToPage(aPoint) );
	}
	/*MokaPoint*/ this.convertPointFromPage = function( aPoint ){
		if( !aPoint ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		//myDiv.innerHTML += aPoint.x();
		var newPoint = aPoint.copy();
		if( this.superview() ){
			newPoint = this.superview().convertPointFromPage(newPoint);
		} else if( this.panel() ){
			newPoint = this.panel().convertPointFromPage(newPoint);
		}
		
		newPoint.setX( newPoint.x() - this.frame().origin().x() );
		newPoint.setY( newPoint.y() - this.frame().origin().y() );
		//myDiv.innerHTML += ", " + newPoint.x() + ";";// - this.frame().origin().x();
		return newPoint;
	}
	/*MokaPoint*/ this.convertPointToPage = function(aPoint){
		if( !aPoint ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }

		
		
		var newPoint = aPoint.copy();
		
		if( this.superview() ){
			newPoint = this.superview().convertPointToPage(newPoint);
		} else if( this.panel() ){
			newPoint = this.panel().convertPointToPage(newPoint);
		}
		
		newPoint.setX( newPoint.x() + this.frame().origin().x() );
		newPoint.setY( newPoint.y() + this.frame().origin().y() );

		return newPoint;
	}

	//Resizing subviews
	/*void*/ this.resizeSubviewsWithOldSize = function(oldViewSize){
		if( typeof(oldViewSize.isKindOfClass) != "function" ){ return; }
		if( !oldViewSize.isKindOfClass(MokaSize) ){ return; }
		this.subviews().each( function(v){
			v.resizeWithOldSuperviewSize(oldViewSize);
		});
		
	}
	/*void*/ this.resizeWithOldSuperviewSize = function(oldSuperviewSize){
		if( typeof(oldSuperviewSize.isKindOfClass) != "function" ){ return; }
		if( !oldSuperviewSize.isKindOfClass(MokaSize) ){ return; }
		
		oldSuperviewSize = oldSuperviewSize.copy();
		var newSuperviewSize = this.superview().frame().size().copy();
		
		var newFrame = this.frame().copy();
		if( this.autoresizingMask() == MokaViewNotSizable ){
			return;
		}
		
		var totalXPartsToChange = 0;
		if( this.autoresizingMask()&MokaViewMinXMargin ){ totalXPartsToChange++; }
		if( this.autoresizingMask()&MokaViewWidthSizable ){ totalXPartsToChange++; }
		if( this.autoresizingMask()&MokaViewMaxXMargin ){ totalXPartsToChange++; }
		
		var totalXChange = newSuperviewSize.width() - oldSuperviewSize.width();
		var totalXChangePerPart = ( totalXPartsToChange ? totalXChange/totalXPartsToChange : 0 );
		
		var totalYPartsToChange = 0;
		if( this.autoresizingMask()&MokaViewMinYMargin ){ totalYPartsToChange++; }
		if( this.autoresizingMask()&MokaViewHeightSizable ){ totalYPartsToChange++; }
		if( this.autoresizingMask()&MokaViewMaxYMargin ){ totalYPartsToChange++; }
		
		var totalYChange = newSuperviewSize.height() - oldSuperviewSize.height();
		var totalYChangePerPart = ( totalYPartsToChange ? totalYChange/totalYPartsToChange : 0 );
		
		if( this.autoresizingMask()&MokaViewMinXMargin ){ newFrame.origin().setX( newFrame.origin().x() + totalXChangePerPart ); }
		if( this.autoresizingMask()&MokaViewWidthSizable ){ newFrame.size().setWidth( newFrame.size().width() + totalXChangePerPart ); }
		//if( this.autoresizingMask()&MokaViewMaxXMargin ){}
		
		if( this.autoresizingMask()&MokaViewMinYMargin ){ newFrame.origin().setY( newFrame.origin().y() + totalYChangePerPart ); }
		if( this.autoresizingMask()&MokaViewHeightSizable ){ newFrame.size().setHeight( newFrame.size().height() + totalYChangePerPart ); }
		//if( this.autoresizingMask()&MokaViewMaxYMargin ){}
		
		this.setFrame( newFrame );
	}
	/*bool*/ this.autoresizesSubviews = function(){
		return _autoresizesSubviews;
	}	
	/*void*/ this.setAutoresizesSubviews = function(yn){
		if( typeof(yn) != "boolean" ){ return; }
		_autoresizesSubviews = yn;
	}
	/*int*/ this.autoresizingMask = function(){
		return _autoresizingMask;
	}	
	/*void*/ this.setAutoresizingMask = function(aMask){
		if( !MokaNumberIsInt(aMask) ){ return; }
		if( aMask < 0 || aMask >= 64 ){ return; }

		_autoresizingMask = aMask;

	}
	
	//Set hidden
	/*bool*/ this.isHidden = function(){
		return _isHidden;
	}	
	/*void*/ this.setIsHidden = function( yn ){
		if( typeof(yn) != "boolean" ){ return; }
		
		_isHidden = yn;
		this.pageDisplay().style.visibility = ( yn ? "hidden" : "visible" );
	}
	/*bool*/ this.isHiddenOrHasHiddenAncestor = function(){
		return this.isHidden() || ( this.superview() ? this.superview().isHiddenOrHasHiddenAncestor() : NO );
	}
		
	//Set the frame, frame origin, and frame size
	//In concrete classes these can be overridden to provide size constraints
	/*MokaRect*/ this.frame = function(){
		return _frame.copy();
	}	
	/*void*/ this.setFrame = function( aRect ){	
		if( typeof(aRect.isKindOfClass) != "function" ){
			return;
		}
		if( !aRect.isKindOfClass(MokaRect) ){
			return;
		}
		
		var newFrame = aRect.copy();
		var oldFrameSize = this.frame().size().copy();
		
		newFrame.setSize( this.constrainSize(newFrame.size()) );
		
		if( this.frame().size().height() != newFrame.size().height() || this.frame().size().width() != newFrame.size().width() ){
			_inLiveResize = YES;
		}

		_frame = newFrame;

		this.pageDisplay().style.left = this.frame().origin().x()+MokaPageSizeUnits;
		this.pageDisplay().style.top = this.frame().origin().y()+MokaPageSizeUnits;
		
		this.pageDisplay().style.width = this.frame().size().width()+MokaPageSizeUnits;
		this.pageDisplay().style.height = this.frame().size().height()+MokaPageSizeUnits;
		
		if( this.autoresizesSubviews() ){
			this.resizeSubviewsWithOldSize(oldFrameSize);
		}
		
		this.display();
		_inLiveResize = NO;
		
		if( this.postsFrameChangedNotifications() ){
			MokaNotificationCenter.defaultCenter().postNotification( MokaNotification.notificationWithNameAndObject( $s("MokaViewFrameDidChangeNotification"), this ) );
		}
	}
	/*void*/ this.setFrameOrigin = function( aPoint ){
		if( typeof(aPoint.isKindOfClass) != "function" ){
			return;
		}

		if( !aPoint.isKindOfClass(MokaPoint) ){
			return;
		}

		_frame.setOrigin( aPoint.copy() );
		this.pageDisplay().style.left = this.frame().origin().x()+MokaPageSizeUnits;
		this.pageDisplay().style.top = this.frame().origin().y()+MokaPageSizeUnits;
		
		if( this.postsFrameChangedNotifications() ){
			MokaNotificationCenter.defaultCenter().postNotification( MokaNotification.notificationWithNameAndObject( $s("MokaViewFrameDidChangeNotification"), this ) );
		}
	}
	/*void*/ this.setFrameSize = function( aSize ){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		var newFrameSize = this.constrainSize(aSize.copy());
		
		if( this.frame().size().height() != newFrameSize.height() || this.frame().size().width() != newFrameSize.width() ){
			_inLiveResize = YES;
		}
		
		var oldFrameSize = this.frame().size().copy();
		
		_frame.setSize( newFrameSize );
		
		this.pageDisplay().style.width = this.frame().size().width()+MokaPageSizeUnits;
		this.pageDisplay().style.height = this.frame().size().height()+MokaPageSizeUnits;
		
		if( this.autoresizesSubviews() ){
			this.resizeSubviewsWithOldSize(oldFrameSize);
		}
		
		this.display();
		_inLiveResize = NO;
		
		if( this.postsFrameChangedNotifications() ){
			MokaNotificationCenter.defaultCenter().postNotification( MokaNotification.notificationWithNameAndObject( $s("MokaViewFrameDidChangeNotification"), this ) );
		}
	}
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( typeof aSize == undefined ){ return this.frame().size(); }
		if( typeof(aSize.isKindOfClass) != "function" ){ return this.frame().size(); }
		if( !aSize.isKindOfClass(MokaSize) ){ return this.frame().size(); }
		
		var newSize = aSize.copy();
		
		if( newSize.height() < 0 ){ newSize.setHeight( 0 ); }
		if( newSize.width() < 0 ){ newSize.setWidth( 0 ); }
		
		return newSize;
	}
	/*int*/ this.zIndex = function(){
		return _zIndex;
	}	
	/*void*/ this.setZIndex = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		_zIndex = aFloat;
		this.pageDisplay().style.zIndex = _zIndex;
	}
	/*bool*/ this.inLiveResize = function(){
		return _inLiveResize;
	}	
	
	//Bounds
	/*MokaRect*/ this.bounds = function(){
		return _bounds;
	}
	/*void*/ this.setBounds = function(aRect){
		if( aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		_bounds = aRect;
		this.drawingCanvas().style.left = -aRect.origin().x();
		this.drawingCanvas().style.top = -aRect.origin().y();
		this.display();
		
		if( this.postsBoundsChangedNotifications() ){
			MokaNotificationCenter.defaultCenter().postNotification( MokaNotification.notificationWithNameAndObject( $s("MokaViewBoundsDidChangeNotification"), this ) );
		}
	}
	/*void*/ this.setBoundsOrigin = function(aPoint){
		if( aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		_bounds.setOrigin(aPoint);
		this.drawingCanvas().style.left = -aPoint.x();
		this.drawingCanvas().style.top = -aPoint.y();
		this.display();
		
		if( this.postsBoundsChangedNotifications() ){
			MokaNotificationCenter.defaultCenter().postNotification( MokaNotification.notificationWithNameAndObject( $s("MokaViewBoundsDidChangeNotification"), this ) );
		}
	}
	/*void*/ this.setBoundsSize = function(aSize){
		if( aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_bounds.setSize(aSize);
		this.display();
		
		if( this.postsBoundsChangedNotifications() ){
			MokaNotificationCenter.defaultCenter().postNotification( MokaNotification.notificationWithNameAndObject( $s("MokaViewBoundsDidChangeNotification"), this ) );
		}
	}
	
	//Modifying the coordinate system
	/*void*/ this.translateOriginToPoint = function(aPoint){
		if( aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		this.setBoundsOrigin( new MokaPoint(-aPoint.x(),-aPoint.y()));
	}
	/*void*/ this.scaleUnitSquareToSize = function(aSize){
		if( aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		this.setBoundsSize( new MokaSize( this.bounds().size().width()/aSize.width(), this.bounds().size().height()/aSize.height() ));
		this.setBoundsOrigin( new MokaPoint( this.bounds().origin().x()/aSize.width(), this.bounds().origin().y()/aSize.height() ));
	}
	
	//Apparent scale of the view
	/*MokaSize*/ this.apparentScale = function(){
		/*	Use later when and if scaling becomes possible for font sizes	*/
		/*var scale = new MokaPoint( this.bounds().size().width()/this.frame().size().width(), this.bounds().size().height()/this.frame().size().height() );
		
		if( this.superview() ){
			var superScale = this.superview().apparentScale();
			scale.setX( scale.x()*superScale.x() );
			scale.setY( scale.y()*superScale.y() );
		}
		
		return scale;*/
		return new MokaSize(1,1);
	}
	
	//Displaying
	/*void*/ this.display = function(){
		this.draw();
		
		for( var i = 0; i < this.subviews().count(); i++ ){
			this.subviews().objectAtIndex(i).display();
		}
		this.drawingCanvas().appendChild(this.skin());
	}
	/*bool*/ this.isOpaque = function(){
		return NO;
	}	
	
	//Drawing
	/*div*/ this.pageDisplay = function(){
		return _pageDisplay;
	}	
	/*div*/ this.drawingCanvas = function(){
		return _drawingCanvas;
	}	
	/*div*/ this.skin = function(){
		return _skin;
	}	
	/*void*/ this.draw = function(){
		//overridden by concrete subclasses
	}
	/*MokaRect*/ this.visibleRect = function(){
		if( this.superview() ){
			return this.superview().visibleRect().intersectWith(this.frame())
		} else if( this.panel() ){
			return this.panel().frame().intersectWith(this.frame());
		}
		return new MokaRect;
	}
	/*void*/ this.drawSubview = function(aView){
		if( !is(aView,MokaView) || !this.subviews().containsObject(aView) ){ return; }
		this.drawingCanvas().appendChild( aView.pageDisplay() );
	}
	/*void*/ this.eraseSubview = function(aView){
		if( typeof aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		this.drawingCanvas().removeChild( aView.pageDisplay() );
	}	
	/*div*/ this.drawCellInRect = function(aCell,aRect){
		if( aCell == undefined ){ return; }
		if( typeof(aCell.isKindOfClass) != "function" ){ return; }
		if( !aCell.isKindOfClass(MokaCell) ){ return; }
		if( aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		var duplicateCellPageDisplay = aCell.pageDisplay();
		var scale = this.apparentScale();
		
		duplicateCellPageDisplay.style.left = aRect.origin().x()*scale.width()+MokaPageSizeUnits;
		duplicateCellPageDisplay.style.top = aRect.origin().y()*scale.height()+MokaPageSizeUnits;
		duplicateCellPageDisplay.style.width = aRect.size().width()-2*aCell.isBordered()*aCell.borderSize()+MokaPageSizeUnits;
		duplicateCellPageDisplay.style.height = aRect.size().height()-2*aCell.isBordered()*aCell.borderSize()+MokaPageSizeUnits;
		duplicateCellPageDisplay.style.backgroundColor = "red";
		this.drawingCanvas().appendChild(duplicateCellPageDisplay);
		
		return duplicateCellPageDisplay;
	}	
	/*void*/ this.eraseAll = function(){
		while( this.drawingCanvas().childNodes.length != 0 ){
			this.drawingCanvas().removeChild( this.drawingCanvas().childNodes[0] );
		}
	}
	/*MokaColor*/ this.drawingColor = function(){
		return _drawingColor;
	}	
	/*void*/ this.setDrawingColor = function(aColor){
		if( aColor == undefined ){ return; }
		if( typeof(aColor.isKindOfClass) != "function" ){ return; }
		if( !aColor.isKindOfClass(MokaColor) ){ return; }
		
		_drawingColor = aColor;
	}
	/*void*/ this.setBackgroundColor = function(aColor){
		if( !is(aColor,MokaColor) ){ return; }
		
		this.pageDisplay.style.backgroundColor = aColor;
	}
	/*div*/ this.fillRect = function(aRect){
		if( aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		var scale = this.apparentScale();
		var rectangle = document.createElement("div");
		rectangle.style.position = "absolute";
		rectangle.style.left = scale.width()*(aRect.origin().x()-this.bounds().origin().x())+MokaPageSizeUnits;
		rectangle.style.top = scale.height()*(aRect.origin().y()-this.bounds().origin().y())+MokaPageSizeUnits;
		rectangle.style.width = scale.width()*aRect.size().width()+MokaPageSizeUnits;
		rectangle.style.height = scale.height()*aRect.size().height()+MokaPageSizeUnits;
		rectangle.style.backgroundColor = this.drawingColor();
		rectangle.style.opacity = this.drawingColor().alphaComponent();
		this.drawingCanvas().appendChild(rectangle);
		
		return rectangle;
	}
	/*div*/ this.outlineRect = function(aRect){
		if( aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		var scale = this.apparentScale();
		var rectangle = document.createElement("div");
		rectangle.style.position = "absolute";
		rectangle.style.left = scale.width()*(aRect.origin().x()-this.bounds().origin().x())+MokaPageSizeUnits;
		rectangle.style.top = scale.height()*(aRect.origin().y()-this.bounds().origin().y())+MokaPageSizeUnits;
		rectangle.style.width = (scale.width()*aRect.size().width()-2)+MokaPageSizeUnits;
		rectangle.style.height = (scale.height()*aRect.size().height()-2)+MokaPageSizeUnits;
		rectangle.style.border = "1"+MokaPageSizeUnits+" solid "+this.drawingColor().getCSSRGBColor();
		this.drawingCanvas().appendChild(rectangle);
		
		return rectangle;
	}
	/*div*/ this.fillAndOutlineRectWithColors = function(aRect,fillColor,outlineColor){
		if( aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		if( fillColor == undefined ){ return; }
		if( typeof(fillColor.isKindOfClass) != "function" ){ return; }
		if( !fillColor.isKindOfClass(MokaColor) ){ return; }
		if( outlineColor == undefined ){ return; }
		if( typeof(outlineColor.isKindOfClass) != "function" ){ return; }
		if( !outlineColor.isKindOfClass(MokaColor) ){ return; }
		
		var scale = this.apparentScale();
		var rectangle = document.createElement("div");
		rectangle.style.position = "absolute";
		rectangle.style.left = scale.width()*(aRect.origin().x()-this.bounds().origin().x())+MokaPageSizeUnits;
		rectangle.style.top = scale.height()*(aRect.origin().y()-this.bounds().origin().y())+MokaPageSizeUnits;
		rectangle.style.width = (scale.width()*aRect.size().width()-2)+MokaPageSizeUnits;
		rectangle.style.height = (scale.height()*aRect.size().height()-2)+MokaPageSizeUnits;
		rectangle.style.backgroundColor = fillColor;
		rectangle.style.opacity = this.drawingColor().alphaComponent();
		rectangle.style.border = "1"+MokaPageSizeUnits+" solid "+outlineColor.getCSSRGBColor();
		this.drawingCanvas().appendChild(rectangle);
		
		return rectangle;
	}
	/*void*/ this.strokeBezierPath = function(aBezierPath){
		
	}
	/*void*/ this.fillBezierPath = function(aBezierPath){
		
	}
	/*img*/ this.drawImageAtPoint = function(anImage,aPoint){
		if( anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		if( aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		if(anImage.size().x() == 0 || anImage.size().y() == 0 ){ return; }
		
		var scale = this.apparentScale();
		var rep = anImage.representation();
		rep.style.position = "absolute";
		rep.style.left = scale.width()*(aPoint.x()-this.bounds().origin().x())+MokaPageSizeUnits;
		rep.style.top = scale.height()*(aPoint.y()-this.bounds().origin().y())+MokaPageSizeUnits;
		rep.style.width = scale.width()*anImage.size().width()+MokaPageSizeUnits;
		rep.style.height = scale.height()*anImage.size().height()+MokaPageSizeUnits;
		this.drawingCanvas().appendChild(rep);
		
		return rep;
	}
	/*img*/ this.drawImageInRect = function(anImage,aRect){
		if( anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		if( aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		var scale = this.apparentScale();
		var rep = anImage.representation();
		rep.style.position = "absolute";
		rep.style.left = scale.width()*(aRect.origin().x()-this.bounds().origin().x())+MokaPageSizeUnits;
		rep.style.top = scale.height()*(aRect.origin().y()-this.bounds().origin().y())+MokaPageSizeUnits;
		rep.style.width = scale.width()*aRect.size().width()+MokaPageSizeUnits;
		rep.style.height = scale.height()*aRect.size().height()+MokaPageSizeUnits;
		this.drawingCanvas().appendChild(rep);
		
		return rep;
	}
	/*span*/ this.drawTextWithFontSizeAtPoint = function(aString,aFontSize,aPoint){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		if( aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		if( aFontSize == undefined ){ return; }
		if( !MokaNumberIsFloat(aFontSize) ){ return; }
		
		if( aFontSize <= 0 ){ return; }
		if( aString.length() == 0 ){ return; }
		
		var scale = this.apparentScale();
		var span = document.createElement("span");
		span.style.position = "absolute";
		span.style.left = scale.width()*(aRect.origin().x()-this.bounds().origin().x())+MokaPageSizeUnits;
		span.style.top = scale.height()*(aRect.origin().y()-this.bounds().origin().y())+MokaPageSizeUnits;
		span.style.fontSize = scale.height()*aFontSize;
		this.drawingCanvas().appendChild(rectangle);
		
		return rectangle;
	}
		
	//Event handling
	/*bool*/ this.acceptsFirstMouse = function(aMouseEvent){
		return NO;
	}
	/*MokaView*/ this.hitTest = function(aPoint){
		var relativePoint = this.convertPointFromPage(aPoint);
		if( relativePoint.x() < 0 || relativePoint.y() < 0 || relativePoint.x() >= this.frame().size().width() || relativePoint.y() >= this.frame().size().height() ){ return null; }
		else{
			var hitView = this;
			for( var i = 0; i < this.subviews().count(); i++ ){
				var capturedHit = this.subviews().objectAtIndex(i).hitTest(aPoint)
				if( capturedHit ){ return capturedHit; }
			}
			return hitView;
		}
	}
	/*bool*/ this.performKeyEquivalent = function(aKeyEvent){
		if( !is(aKeyEvent,MokaEvent) ){ return NO; }
		
		for( var i = 0; i < this.subviews().count(); i++ ){
			if( this.subviews().objectAtIndex(i).performKeyEquivalent(aKeyEvent) ){
				return YES;
			}
		}
		
		return NO;
	}
	/*bool*/ this.mouseDownCanMovePanel = function(){
		return !this.isOpaque();
	}
	/*void*/ this.mouseDown = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( this.nextResponder() && this.mouseDownCanMovePanel() ){ this.nextResponder().mouseDown(theEvent); }
	}
	/*void*/ this.rightMouseDown = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( this.menu() ){ MokaMenu.popUpContextMenuWithEventForView(menu,theEvent,this); }
		
	}
	
	//Controlling notifications
	/*bool*/ this.postsFrameChangedNotifications = function(){
		return _postsFrameChangedNotifications;
	}
	/*void*/ this.setPostsFrameChangedNotifications = function(value){
		_postsFrameChangedNotifications = value;
	}
	/*bool*/ this.postsBoundsChangedNotifications = function(){
		return _postsBoundsChangedNotifications;
	}
	/*void*/ this.setPostsBoundsChangedNotifications = function(value){
		_postsBoundsChangedNotifications = value;
	}
	
	//Dragging operations
	/*void*/ this.dragImageAtPointWithOffsetEventPasteboardSourceAndSlideBack = function( anImageOrDOMElement, aPoint, anOffset, anEvent, aPasteboard, aSource, slideBackBool){
		
	}
	/*void*/ this.dragElementAtPointWithOffsetEventPasteboardSourceAndSlideBack = function( anElement, aPoint, anOffset, anEvent, aPasteboard, aSource, slideBackBool){
		
	}
	/*void*/ this.dragFileFromRectWithSlideBackAndEvent = function(aFile,aRect,slideBackBool,anEvent){
		
	}
	/*MokaArray*/ this.registeredDraggedTypes = function(){
		return _registeredDraggedTypes;
	}	
	/*void*/ this.registerForDraggedTypes = function(anArrayOfPboardTypes){
		
	}
	/*void*/ this.unregisterForDraggedTypes = function(anArrayOfPboardTypes){
		
	}
	/*bool*/ this.shouldDelayPanelOrderingForEvent = function(anEvent){
		
	}
	/*bool*/ this.dragPromisedFilesOfTypesFromRectWithSourceSlideBackAndEvent = function(types,aRect,aSource,slideBackBool,anEvent){
		
	}
	
	
	//Managing cursor rectangles
	/*void*/ this.addCursorRectWithCursor = function(aRect, aCursor){
		_cursorRects.setObjectForKey(aCursor,aRect);
	}
	/*void*/ this.removeCursorRectWithCursor = function(aRect, aCursor){
		_cursorRects.removeObjectForKey(aRect);
		for( var i = 0; i < _cursorRects.allKeys().count(); i++ ){
			var r = _cursorRects.allKeys().objectAtIndex(i);
			if( r.size().width() == aRect.size().width()
			&&	r.size().height() == aRect.size().height()
			&& r.origin().x() == aRect.origin().x()
			&& r.origin().y() == aRect.origin().y() ){
				_cursorRects.removeObjectForKey(r);
			}
		}
	}
	/*void*/ this.discardCursorRects = function(){
		_cursorRects.removeAllObjects();
	}
	/*void*/ this.resetCursorRects = function(){
		this.discardCursorRects();
		//default implementation does nothing
	}
	
	//Managing tool tips
	/*MokaString*/ this.toolTip = function(){
		return _toolTip;
	}	
	/*void*/ this.setToolTip = function(aString){
		if( !is(aString,MokaString) ){ return; }
		
		_toolTip = aString;
	}
	/*int*/ this.addToolTipRectWithOwnerAndUserData = function(aRect,anObject,userData){
		if( !is(aRect,MokaRect) || !is(anObject,MokaObject) ){ return; }
		
		var tag = _toolTips.count();
		var toolTip = $dict(	$s("toolTipRect"),	aRect,
								$s("toolTip"),	(anObject.respondsToSelector($sel("stringForToolTipPointUserDataAndView"))
												?	anObject.stringForToolTipPointUserDataAndView(tag,aRect.origin(),userData,this)
												:	anObject.description() ) );
		_toolTips.addObject(toolTip);		
		return tag;
	}
	/*void*/ this.removeAllToolTips = function(){
		_toolTips.removeAllObjects();
	}
	/*void*/ this.removeToolTip = function(aToolTip){
		_toolTips.removeObjectAtIndex(aToolTip);
	}
	
	//Scrolling
	/*void*/ this.scrollPoint = function(aPoint){
		if( typeof aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		if( !is(aRect,MokaRect) ){ return; }
		var clipView = null;
		var testView = this.superView();
		while( !clipView ){
			if( testView.isKindOfClass(MokaClipView) ){
				clipView = testView;
			} else if( testView.superview() ){
				testView = testView.superview();
			} else {
				break;
			}
		}
		if( clipView ){
			clipView.scrollToPoint( scrollView.contentView().convertPointFromView(aPoint,this) );
		}
		
	}
	/*MokaView*/ this.enclosingScrollView = function(){
		return ( this.superview() ? ( this.superview().isKindOfClass(MokaScrollView) ? this.superview() : this.superview().enclosingScrollView() ) : null );
	}
	/*void*/ this.scrollClipViewToPoint = function(aClipView,aPoint){
		//does nothing by default
	}
	/*void*/ this.reflectScrolledClipView = function(aClipView){
		//does nothing by default
	}
	
	//Context-sensitive menus
	/*MokaMenu*/ this.menuForEvent = function(anEvent){
		return null;
	}
	
	//Managing key view
	/*bool*/ this.canBecomeKeyView = function(){
		return YES;
	}
	/*bool*/ this.needsPanelToBecomeKey = function(){
		return NO;
	}
	/*MokaView*/ this.nextKeyView = function(){
		return _nextKeyView;
	}
	/*void*/ this.setNextKeyView = function(aView){
		if( !is(aView,MokaView) || aView == this.previousKeyView() ){ return; }
		
		_nextKeyView = aView;
	}
	/*MokaView*/ this.nextValidKeyView = function(){
		var nextKeyView = this.nextKeyView();
		
		if( !nextKeyView ){ return null; }
		
		while( true ){
			if( nextKeyView.acceptsFirstResponder() ){
				return nextKeyView;
			} else if( nextKeyView.nextKeyView() != this ){
				nextKeyView = nextKeyView.nextKeyView();
			} else {
				return null;
			}
		}
	}
	/*MokaView*/ this.previousKeyView = function(){
		return _previousKeyView;
	}
	/*void*/ this._setPreviousKeyView = function(aView){
		if( !is(aView,MokaView) || aView == this.nextKeyView() ){ return; }
		
		_previousKeyView = aView;
	}
	/*MokaView*/ this.previousValidKeyView = function(){
		var previousKeyView = this.previousKeyView();
		
		if( !previousKeyView ){ return null; }
		
		while( true ){
			if( previousKeyView.acceptsFirstResponder() ){
				return previousKeyView;
			} else if( previousKeyView.previousKeyView() != this ){
				previousKeyView = previousKeyView.previousKeyView();
			} else {
				return null;
			}
		}
	}
	
}
/*MokaMenu*/ MokaView.defaultMenu = function(){
	return null;
}

//View autoresizing masks
MokaViewNotSizable		= 0;
MokaViewMinXMargin		= 1 << 0;
MokaViewWidthSizable	= 1 << 1;
MokaViewMaxXMargin		= 1 << 2;
MokaViewMinYMargin		= 1 << 3;
MokaViewHeightSizable	= 1 << 4;
MokaViewMaxYMargin		= 1 << 5;

//Border types
MokaNoBorder		= 0;
MokaLineBorder		= 1;
MokaBezelBorder		= 2;
MokaGrooveBorder	= 3;