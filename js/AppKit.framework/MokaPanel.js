function MokaPanel(){
	this.extend( MokaResponder );
	
	/*	Sizing and Positioning	*/
	var _frame = new MokaRect;
	var _resizeFlags = 0;
	var _isMovableByPanelBackground = NO;
	var _isAnimatingFrame = NO;
	
	/*	Constraining panel size	*/
	var _maxSize = new MokaSize(0,0);
	var _minSize = new MokaSize(0,0);
	var _aspectRatio = new MokaSize(0,0);
	var _resizeIncrements = new MokaSize(1,1);
	
	/*	Managing content size	*/
	var _contentMaxSize = new MokaSize(0,0); //MokaSize;
	var _contentMinSize = new MokaSize(0,0); //MokaSize;
	var _contentAspectRatio = new MokaSize(0,0); //MokaSize;
	var _contentResizeIncrements = new MokaSize(1,1); //MokaSize;
	
	/*	Saving frame to user defaults	*/
	var _frameAutosaveName = null;
	
	/*	Ordering panels and controlling visibility	*/
	var _level = MokaNormalPanelLevel;
	
	/*	Key and main panels	*/
	var _isKeyPanel = NO;
	var _isMainPanel = NO;
	
	/*	Default button	*/
	var _defaultButton = null;
	
	/*	First responder	*/
	var _firstResponder = null;
	
	/*	Event handling	*/
	var _currentEvent = null;
	var _acceptsMouseMoveEvents = NO;
	var _ignoresMouseEvents = NO;
	
	/*	Keyboard interface control	*/
	var _initialFirstResponder = this;
	var _keyViewSelectionDirection = MokaSelectingNext;
	
	/*	Title and filename	*/
	var _title = $s("");
	var _titleTextfield = new MokaTextField;
	var _representedFilename = new MokaString;
	
	/*	Document is edited	*/
	var _isDocumentEdited = NO;
	
	/*	Closing the panel	*/
	var _isReleasedWhenClosed = YES;
	
	/*	Minitaturized	*/
	var _isMiniaturized = NO;
	var _minipanelImage = new MokaImage;
	var _minipanelTitle = MokaString.stringWithCharacters("untitled");
	
	/*	Shading	*/
	var _isShaded = NO;
	var _preshadeFrameSize = null;
	var _styleMaskBeforeShade = MokaBorderlessPanelMask;
	
	/*	Working with panel menus	*/
	var _isExcludedFromPanelsMenu = NO;
	
	/*	Cursor rects	*/
	var _areCursorRectsEnabled = YES;
	
	/*	Display characteristics	*/
	var _contentView = new MokaBox;
	var _styleMask = MokaTitledPanelMask | MokaClosablePanelMask | MokaMiniaturizablePanelMask | MokaResizablePanelMask | MokaShadeablePanelMask;
	var _hasShadow = YES;
	var _opacity = 1;
	var _isOpaque = YES;
	
	/*	Behavior	*/
	var _isFloatingPanel = NO;
	var _becomesKeyOnlyIfNeeded = NO;
	var _worksWhenModal = NO;
	
	/*	Delegate	*/
	var _delegate = null;
	
	/*	Toolbars	*/
	var _toolbar = null;
	var _toolbarShown = NO;
	
	/*	Standard panel buttons	*/
	var _closeButton = new MokaButton;
	var _miniaturizeButton = new MokaButton;
	var _shadeButton = new MokaButton;
	var _toolbarButton = new MokaButton;
	var _resizeControl = new MokaButton;
	
	/*	Panel dragging	*/
	var _isBeingDragged = NO;
	var _isBeingResized = NO;
	var _downPoint = new MokaPoint;
	
	/*	Page Display	*/
	var _pageDisplay = document.createElement('div');
	_pageDisplay.setAttribute("class",this.constructor.className());
	
	var self = this;
	_pageDisplay.view = function(){
		return self;
	}
	
	/*	Skin	*/
	var _shadow = document.createElement('div');
	_shadow.setAttribute("id","shadow");
	_shadow.style.position = "absolute";
	_shadow.style.left = 0;
	_shadow.style.top = 0;
	_shadow.style.zIndex = -20000;
	_pageDisplay.appendChild(_shadow);
	
	var _shadowTL = document.createElement('div');
	_shadowTL.setAttribute("id","topleft");
	_shadow.appendChild(_shadowTL);
	
	var _shadowT = document.createElement('div');
	_shadowT.setAttribute("id","top");
	_shadow.appendChild(_shadowT);
	
	var _shadowTR = document.createElement('div');
	_shadowTR.setAttribute("id","topright");
	_shadow.appendChild(_shadowTR);
	
	var _shadowL = document.createElement('div');
	_shadowL.setAttribute("id","left");
	_shadow.appendChild(_shadowL);
	
	var _shadowC = document.createElement('div');
	_shadowC.setAttribute("id","center");
	_shadow.appendChild(_shadowC);
	
	var _shadowR = document.createElement('div');
	_shadowR.setAttribute("id","right");
	_shadow.appendChild(_shadowR);
	
	var _shadowBL = document.createElement('div');
	_shadowBL.setAttribute("id","bottomleft");
	_shadow.appendChild(_shadowBL);
	
	var _shadowB = document.createElement('div');
	_shadowB.setAttribute("id","bottom");
	_shadow.appendChild(_shadowB);
	
	var _shadowBR = document.createElement('div');
	_shadowBR.setAttribute("id","bottomright");
	_shadow.appendChild(_shadowBR);
	
	var _skin = document.createElement('div');
	_skin.setAttribute("id","skin");
	_skin.style.width = "100%";
	_skin.style.height = "100%";
	_skin.style.position = "absolute";
	_skin.style.left = 0;
	_skin.style.top = 0;
	_skin.style.zIndex = -10000;
	_pageDisplay.appendChild(_skin);
	
	var _topLeft = document.createElement('div');
	_topLeft.setAttribute("id","topleft");
	_skin.appendChild(_topLeft);
	
	var _top = document.createElement('div');
	_top.setAttribute("id","top");
	_skin.appendChild(_top);
	
	var _topRight = document.createElement('div');
	_topRight.setAttribute("id","topright");
	_skin.appendChild(_topRight);
	
	var _background = document.createElement('div');
	_background.setAttribute("id","background");
	_skin.appendChild(_background);
	
	
	
	
	
	
	
	
	//Initialization
	/*id*/ this.initWithFrame = function(aFrame){
		return this.initWithFrameAndStyleMask(	aFrame,
												MokaTitledPanelMask | MokaClosablePanelMask | MokaMiniaturizablePanelMask | MokaResizablePanelMask | MokaShadeablePanelMask );
	}
	/*id*/ this.initWithStyleMask = function(styleMask){
		this.initWithFrameAndStyleMask( new MokaRect(0,0,200,200), styleMask );
	}
	/*id*/ this.initWithFrameAndStyleMask = function(aFrame,styleMask){
		if( aFrame == undefined ){ aFrame = new MokaFrame; }
		if( typeof(aFrame.isKindOfClass) != "function" ){ aFrame = new MokaFrame; }
		if( !aFrame.isKindOfClass(MokaRect) ){ aFrame = new MokaFrame; }
		if( styleMask == undefined ){ styleMask = MokaBorderlessPanelMask; }
		if( !MokaNumberIsInt(styleMask) ){ styleMask = MokaBorderlessPanelMask; }
		if( styleMask < MokaBorderlessPanelMask || styleMask > MokaDocModalPanelMask ){ styleMask = MokaBorderlessPanelMask; }
		
		this.supers().init();
		
		_frame = aFrame.copy();
		
		/*	Screen Elements	*/
		this.pageDisplay().style.position = "absolute";
		this.pageDisplay().style.left// = this.frame().origin().x() + MokaPageSizeUnits;
		this.pageDisplay().style.top = this.frame().origin().y() + MokaPageSizeUnits;
		//this.pageDisplay().style.border = "1" + MokaPageSizeUnits + " solid #999";
		this.pageDisplay().style.height = this.frame().size().height()+MokaPageSizeUnits;
		this.pageDisplay().style.width = this.frame().size().width()+MokaPageSizeUnits;
		//this.pageDisplay().style.overflow = "hidden";
		
		//Close button
		this.closeButton().setBezelStyle( MokaCustomFixedSizeBezelStyle );
		this.closeButton().setFrame(	MokaRect.rectWithOriginAndSize(	MokaPoint.pointWithCoordinates(4,0),
																	MokaSize.sizeWithDimensions(20,20) ) );
		//this.closeButton().pageDisplay().style.backgroundColor = "black";
		this.pageDisplay().appendChild(this.closeButton().pageDisplay() );
		this.closeButton().setTarget( this );
		this.closeButton().setAction( MokaSelector.selectorWithName("performClose") );
		this.closeButton().viewWillMoveToPanel( this );
		this.closeButton().viewDidMoveToPanel();
		this.closeButton().setTitle($s(""));
		
		//Miniaturize button
		this.miniaturizeButton().setBezelStyle(MokaCustomFixedSizeBezelStyle );
		this.miniaturizeButton().setFrame(	MokaRect.rectWithOriginAndSize(	MokaPoint.pointWithCoordinates(24,0),
																			MokaSize.sizeWithDimensions(20,20) ) );
		//this.miniaturizeButton().pageDisplay().style.backgroundColor = "black";
		this.pageDisplay().appendChild(this.miniaturizeButton().pageDisplay() );
		this.miniaturizeButton().setTarget( this );
		this.miniaturizeButton().setAction( MokaSelector.selectorWithName("performMiniaturize") );
		this.miniaturizeButton().viewWillMoveToPanel( this );
		this.miniaturizeButton().viewDidMoveToPanel();
		this.miniaturizeButton().setTitle($s(""));
		
		//Shade button
		this.shadeButton().setBezelStyle(MokaCustomFixedSizeBezelStyle);
		this.shadeButton().setFrame(	MokaRect.rectWithOriginAndSize(	MokaPoint.pointWithCoordinates(44,0),
																	MokaSize.sizeWithDimensions(20,20) ) );
		//this.shadeButton().pageDisplay().style.backgroundColor = "black";
		this.pageDisplay().appendChild(this.shadeButton().pageDisplay() );
		this.shadeButton().setTarget( this );
		this.shadeButton().setAction( MokaSelector.selectorWithName("performShade") );
		this.shadeButton().viewWillMoveToPanel( this );
		this.shadeButton().viewDidMoveToPanel();
		this.shadeButton().setTitle($s(""));
		
		//Content view
		this.contentView().setBorderType(MokaNoBorder);
		this.contentView().setFrame( this.frame() );
		this.contentView().viewWillMoveToPanel( this );
		this.contentView().viewDidMoveToPanel();
		this.contentView().setNextResponder( this );
		this.pageDisplay().appendChild(this.contentView().pageDisplay() );
		//this.contentView().pageDisplay().style.backgroundColor = "#cfa";
		//this.contentView().pageDisplay().style.opacity = "0.5";
		
		//Resize control
		this.resizeControl().setBezelStyle(MokaCustomFixedSizeBezelStyle);
		this.resizeControl().setFrame(	MokaRect.rectWithOriginAndSize(	MokaPoint.pointWithCoordinates( this.frame().size().width() - 15, this.frame().size().height() - 15 ),
																		MokaSize.sizeWithDimensions(15,15) ) );
		this.pageDisplay().appendChild(this.resizeControl().pageDisplay() );
		this.resizeControl().viewWillMoveToPanel( this );
		this.resizeControl().viewDidMoveToPanel();
		this.resizeControl().setTitle($s(""));
		
		this.setStyleMask( styleMask );
		this.setFrame( this.frame() );
		_styleMaskBeforeShade = this.styleMask();
		
		MokaApp.addPanel(this);
		
		return this;
	}
	/*id*/ this.initWithContentRect = function(aRect){
		return this.initWithContentRectAndStyleMask(	aRect,
														MokaTitledPanelMask | MokaClosablePanelMask | MokaMiniaturizablePanelMask | MokaResizablePanelMask | MokaShadeablePanelMask );
	}
	/*id*/ this.initWithContentRectAndStyleMask = function(aRect,styleMask){
		if( aRect == undefined ){ aFrame = new MokaFrame; }
		if( typeof(aRect.isKindOfClass) != "function" ){ aFrame = new MokaFrame; }
		if( !aRect.isKindOfClass(MokaRect) ){ aFrame = new MokaFrame; }
		if( styleMask == undefined ){ styleMask = MokaBorderlessPanelMask; }
		if( !MokaNumberIsInt(styleMask) ){ styleMask = MokaBorderlessPanelMask; }
		if( styleMask < MokaBorderlessPanelMask || styleMask > MokaDocModalPanelMask ){ styleMask = MokaBorderlessPanelMask; }
		
		if( styleMask & MokaTitledPanelMask ){
			contentRect.size().setHeight( contentRect.size().height() + 20 );
			contentRect.origin().setY( contentRect.origin().y() - 20 );
		}
		
		this.setFrame(frameRect);		
		
		return this.initWithStyleMask(styleMask);
	}
	
	//Page display
	/*div*/ this.pageDisplay = function(){
		return _pageDisplay;
	}
		
	//Calculating layout
	/*MokaRect*/ this.contentRectForFrameRect = function(aRect){
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		var contentRect = aRect.copy();
		
		if( this.styleMask() & MokaTitledPanelMask ){
			contentRect.size().setHeight( contentRect.size().height() - 20 );
			contentRect.origin().setY( contentRect.origin().y() + 20 );
		}
		
		return contentRect;
	}
	/*MokaRect*/ this.frameRectForContentRect = function(aRect){
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		var frameRect = aRect.copy();
		
		if( this.styleMask() & MokaTitledPanelMask ){
			contentRect.size().setHeight( contentRect.size().height() + 20 );
			contentRect.origin().setY( contentRect.origin().y() - 20 );
		}
		
		return frameRect;
	}
	
	//Converting coordinates
	/*MokaPoint*/ this.convertPointToPage = function(aPoint){
		if( !aPoint ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }

		var newPoint = aPoint.copy();
		newPoint.setX( newPoint.x() + this.frame().origin().x() );
		newPoint.setY( newPoint.y() + this.frame().origin().y() );
		return newPoint;
	}
	/*MokaPoint*/ this.convertPointFromPage = function(aPoint){
		if( !aPoint ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }

		return new MokaPoint( aPoint.x() - this.frame().origin().x(), aPoint.y() - this.frame().origin().y() );
	}
	
	//Moving and resizing
	/*MokaRect*/ this.frame = function(){
		return _frame.copy();
	}	
	/*void*/ this.setFrame = function(aRect){
		if( typeof aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		_frame = aRect.copy();
		
		if( _frame.size().width() < 75 ){ _frame.size().setWidth(75); }
		if( _frame.size().height() < 75 ){ _frame.size().setHeight(75); }
		
		this.pageDisplay().style.left = this.frame().origin().x()+MokaPageSizeUnits;
		this.pageDisplay().style.top = this.frame().origin().y()+MokaPageSizeUnits;
		
		_shadow.style.width = (this.frame().size().width() + 10 ) + MokaPageSizeUnits;
		_shadow.style.height = (this.frame().size().height() + 10 ) + MokaPageSizeUnits;
		_shadowT.style.width = (this.frame().size().width() - 30) + MokaPageSizeUnits;
		_shadowL.style.height = (this.frame().size().height() - 30) + MokaPageSizeUnits;
		_shadowC.style.width = (this.frame().size().width() - 30) + MokaPageSizeUnits;
		_shadowC.style.height = (this.frame().size().height() - 30) + MokaPageSizeUnits;
		_shadowR.style.height = (this.frame().size().height() - 30) + MokaPageSizeUnits;
		_shadowB.style.width = (this.frame().size().width() - 30) + MokaPageSizeUnits;
		
		_top.style.width = (this.frame().size().width() - 40) + MokaPageSizeUnits;
		_background.style.height = (this.frame().size().height() - 20) + MokaPageSizeUnits;
						
		this.pageDisplay().style.width = this.frame().size().width()+MokaPageSizeUnits;
		this.pageDisplay().style.height = this.frame().size().height()+MokaPageSizeUnits;
		
		this.resizeControl().setFrameOrigin( new MokaPoint(this.frame().size().width() - 15, this.frame().size().height() - 15) );
		
		var newContentViewSize = this.contentRectForFrameRect(this.frame()).size();
		this.contentView().setFrameSize( newContentViewSize );
		
		if( this.frameAutosaveName() && !_isAnimatingFrame ){
			this.saveFrameUsingName(this.frameAutosaveName());
		}
	}
	/*void*/ this.setFrameAndAnimateOverDuration = function(aRect,aDuration){
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		if( !MokaNumberIsFloat(aDuration) ){ return; }
		
		var animation = MokaViewAnimation.make().initWithviewAnimations( $arr($dict(	MokaViewAnimationTargetKey, this,
																						MokaViewAnimationEndFrameKey, aRect )))
		animation.setDuration( aDuration );
		animation.addProgressMark(1);
		
		MokaNotificationCenter.defaultCenter().addObserverWithSelectorNotificationNameAndObject(	this,
																									$sel("_animateFrameComplete"),
																									MokaAnimationProgressMarkNotification,
																									animation );
		
		_isAnimatingFrame = YES;
		animation.startAnimation();
		
	}
	/*void*/ this._animateFrameComplete = function(obj){
		if( !is(obj,MokaAnimation) ){ return; }
		
		_isAnimatingFrame = NO;
		if( this.frameAutosaveName() ){
			this.saveFrameUsingName(this.frameAutosaveName());
		}
	}
	/*void*/ this.setFrameOrigin = function(aPoint){
		if( typeof aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
				
		_frame.setOrigin( aPoint );
		
		this.pageDisplay().style.left = this.frame().origin().x()+MokaPageSizeUnits;
		this.pageDisplay().style.top = this.frame().origin().y()+MokaPageSizeUnits;
		
		if( this.frameAutosaveName() && !_isAnimatingFrame ){
			this.saveFrameUsingName(this.frameAutosaveName());
		}
	}
	/*void*/ this.setFrameSize = function(aSize){
		if( typeof(aSize) == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_frame.setSize( aSize.copy() );
		
		if( _frame.size().width() < 75 ){ _frame.size().setWidth(75); }
		if( _frame.size().height() < 75 ){ _frame.size().setHeight(75); }
		
		this.pageDisplay().style.width = this.frame().size().width()+MokaPageSizeUnits;
		this.pageDisplay().style.height = this.frame().size().height()+MokaPageSizeUnits;
		
		_shadow.style.width = (this.frame().size().width() + 10 ) + MokaPageSizeUnits;
		_shadow.style.height = (this.frame().size().height() + 10 ) + MokaPageSizeUnits;
		_shadowT.style.width = (this.frame().size().width() - 30) + MokaPageSizeUnits;
		_shadowL.style.height = (this.frame().size().height() - 30) + MokaPageSizeUnits;
		_shadowC.style.width = (this.frame().size().width() - 30) + MokaPageSizeUnits;
		_shadowC.style.height = (this.frame().size().height() - 30) + MokaPageSizeUnits;
		_shadowR.style.height = (this.frame().size().height() - 30) + MokaPageSizeUnits;
		_shadowB.style.width = (this.frame().size().width() - 30) + MokaPageSizeUnits;
		
		_top.style.width = (this.frame().size().width() - 40 ) + MokaPageSizeUnits;
		_background.style.height = (this.frame().size().height() - 20) + MokaPageSizeUnits;
				
		this.resizeControl().setFrameOrigin( new MokaPoint(this.frame().size().width() - 15, this.frame().size().height() - 15) );
				
		if( !this.isShaded() ){
			var newContentViewSize = this.contentRectForFrameRect(this.frame()).size();
			this.contentView().setFrameSize( newContentViewSize );
		}
		
		if( this.frameAutosaveName() && !_isAnimatingFrame ){
			this.saveFrameUsingName(this.frameAutosaveName());
		}
	}
	/*void*/ this.setContentRect = function(aRect){
		if( aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		this.setFrame(this.frameRectForContentRect(aRect));
	}
	/*void*/ this.setContentOrigin = function(aPoint){
		if( aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		this.setFrame(this.frameRectForContentRect(MokaRect.rectWithOriginAndSize(aPoint,this.contentView().frame().size())));
	}	
	/*void*/ this.setContentSize = function(aSize){
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		var newFrameSize = aSize.copy();
		
		if( this.styleMask() & MokaTitledPanelMask ){
			newFrameSize.setHeight( newFrameSize.height() + 20 );
		}
		
		this.setFrameSize( newFrameSize );
	}
	/*void*/ this.center = function(){
		this.setFrameOrigin( MokaPoint.pointWithCoordinates(	(document.body.clientWidth - this.frame().size().width())/2,
																(document.body.clientHeight - this.frame().size().height())/2) );
	}
	/*bool*/ this.isMovableByPanelBackground = function(){
		return _isMovableByPanelBackground;
	}	
	/*void*/ this.setIsMovableByPanelBackground = function(yn){
		if( typeof(yn) != "boolean" ){ return; }
		_isMovableByPanelBackground = yn;
	}
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		var newSize = aSize.copy();
		
		var hasContentMinSize = this.contentMinSize().width() != 0 && this.contentMinSize().height() != 0;
		var hasMinSize = this.minSize().width() != 0 && this.minSize().height() != 0;
		
		if( hasContentMinSize ){
			if( newSize.width() < this.contentMinSize().width()){ newSize.setWidth( this.contentMinSize().width() ); }
			if( newSize.height() < this.contentMinSize().height() + (this.styleMask() & MokaTitledPanelMask ? 20 : 0)){ newSize.setHeight( this.contentMinSize().height() + (this.styleMask() & MokaTitledPanelMask ? 20 : 0) ); }
		} else if( hasMinSize ){
			if( newSize.width() < this.minSize().width() ){ newSize.setWidth( this.minSize().width() ); }
			if( newSize.height() < this.minSize().height() ){ newSize.setHeight( this.minSize().height() ); }
		}
		
		var hasContentMaxSize = this.contentMaxSize().width() != 0 && this.contentMaxSize().height() != 0;
		var hasMaxSize = this.maxSize().width() != 0 && this.maxSize().height() != 0;
		
		if( hasContentMaxSize ){
			if( newSize.width() > this.contentMaxSize().width() ){ newSize.setWidth( this.contentMaxSize().width() ); }
			if( newSize.height() > this.contentMaxSize().height() + (this.styleMask() & MokaTitledPanelMask ? 20 : 0)){ newSize.setHeight( this.contentMaxSize().height() + (this.styleMask() & MokaTitledPanelMask ? 20 : 0) ); }
		} else if( hasMaxSize ){
			if( newSize.width() > this.maxSize().width() ){ newSize.setWidth( this.maxSize().width() ); }
			if( newSize.height() > this.maxSize().height() ){ newSize.setHeight( this.maxSize().height() ); }
		}
		
		if( this.contentAspectRatio().width() != 0 && this.contentAspectRatio().height() != 0 ){
			//does not take into account max and min sizes
			if( newSize.width()/this.contentAspectRatio().width() < (newSize.height() - (this.styleMask() & MokaTitledPanelMask ? 20 : 0))/this.contentAspectRatio().height() ){
				newSize.setHeight( newSize.width()*this.contentAspectRatio().height()/this.contentAspectRatio().width() + (this.styleMask() & MokaTitledPanelMask ? 20 : 0) );
			} else {
				newSize.setWidth( (newSize.height() - (this.styleMask() & MokaTitledPanelMask ? 20 : 0))*this.contentAspectRatio().width()/this.contentAspectRatio().height() );
			}
		} else if( this.contentResizeIncrements().width() != 1 || this.contentResizeIncrements().height() != 1 ){
			var increments = new MokaSize(	Math.round(newSize.width()/this.contentResizeIncrements().width()),
											Math.round((newSize.height() - (this.styleMask() & MokaTitledPanelMask ? 20 : 0))/this.contentResizeIncrements().height()) );
			
			
			if( hasContentMinSize ){
				if( increments.width()*this.contentResizeIncrements().width() < this.contentMinSize().width() ){
					increments.setWidth( Math.ceil(this.contentMinSize().width()/this.contentResizeIncrements().width()) );
				}
				if( increments.height()*this.contentResizeIncrements().height() < this.contentMinSize().height() ){
					increments.setHeight( Math.ceil(this.contentMinSize().height()/this.contentResizeIncrements().height()) );
				}
			} else if( hasMinSize ){
				if( increments.width()*this.contentResizeIncrements().width() < this.minSize().width() ){
					increments.setWidth( Math.ceil(this.minSize().width()/this.contentResizeIncrements().width()) );
				}
				if( increments.height()*this.contentResizeIncrements().height() + (this.styleMask() & MokaTitledPanelMask ? 20 : 0) < this.minSize().height() ){
					increments.setHeight( Math.ceil((this.minSize().height() - (this.styleMask() & MokaTitledPanelMask ? 20 : 0))/this.contentResizeIncrements().height()) );
				}
			}
			
			if( hasContentMaxSize ){
				if( increments.width()*this.contentResizeIncrements().width() > this.contentMaxSize().width() ){
					increments.setWidth( Math.floor(this.contentMaxSize().width()/this.contentResizeIncrements().width()) );
				}
				if( increments.height()*this.contentResizeIncrements().height() > this.contentMaxSize().height() ){
					increments.setHeight( Math.floor(this.contentMaxSize().height()/this.contentResizeIncrements().height()) );
				}
			} else if( hasMaxSize ){
				if( increments.width()*this.contentResizeIncrements().width() > this.maxSize().width() ){
					increments.setWidth( Math.floor(this.maxSize().width()/this.contentResizeIncrements().width()) );
				}
				if( increments.height()*this.contentResizeIncrements().height() + (this.styleMask() & MokaTitledPanelMask ? 20 : 0) > this.maxSize().height() ){
					increments.setHeight( Math.floor((this.maxSize().height() - (this.styleMask() & MokaTitledPanelMask ? 20 : 0))/this.contentResizeIncrements().height()) );
				}
			}
			
			newSize.setWidth( increments.width()*this.contentResizeIncrements().width() );
			newSize.setHeight( increments.height()*this.contentResizeIncrements().height() + (this.styleMask() & MokaTitledPanelMask ? 20 : 0) );
		} else if( this.aspectRatio().width() != 0 && this.aspectRatio().height() != 0 ){
			
			if( newSize.width()/this.aspectRatio().width() < newSize.height()/this.aspectRatio().height() ){
				newSize.setHeight( newSize.width()*this.aspectRatio().height()/this.aspectRatio().width() );
			} else {
				newSize.setWidth( newSize.height()*this.aspectRatio().width()/this.aspectRatio().height() );
			}
		} else if( this.resizeIncrements().width() != 1 || this.resizeIncrements().height() != 1 ){
			var increments = new MokaSize(	Math.round(newSize.width()/this.resizeIncrements().width()),
											Math.round(newSize.height()/this.resizeIncrements().height()) );
			
			
			if( hasContentMinSize ){
				if( increments.width()*this.resizeIncrements().width() < this.contentMinSize().width() ){
					increments.setWidth( Math.ceil(this.contentMinSize().width()/this.resizeIncrements().width()) );
				}
				if( increments.height()*this.resizeIncrements().height() - (this.styleMask() & MokaTitledPanelMask ? 20 : 0) < this.contentMinSize().height() ){
					increments.setHeight( Math.ceil((this.contentMinSize().height() + (this.styleMask() & MokaTitledPanelMask ? 20 : 0))/this.resizeIncrements().height()) );
				}
			} else if( hasMinSize ){
				if( increments.width()*this.resizeIncrements().width() < this.minSize().width() ){
					increments.setWidth( Math.ceil(this.minSize().width()/this.resizeIncrements().width()) );
				}
				if( increments.height()*this.resizeIncrements().height() < this.minSize().height() ){
					increments.setHeight( Math.ceil(this.minSize().height()/this.resizeIncrements().height()) );
				}
			}
			
			if( hasContentMaxSize ){
				if( increments.width()*this.resizeIncrements().width() > this.contentMaxSize().width() ){
					increments.setWidth( Math.floor(this.contentMaxSize().width()/this.resizeIncrements().width()) );
				}
				if( increments.height()*this.resizeIncrements().height() - (this.styleMask() & MokaTitledPanelMask ? 20 : 0) > this.contentMaxSize().height() ){
					increments.setHeight( Math.floor((this.contentMaxSize().height() + (this.styleMask() & MokaTitledPanelMask ? 20 : 0))/this.resizeIncrements().height()) );
				}
			} else if( hasMaxSize ){
				if( increments.width()*this.resizeIncrements().width() > this.maxSize().width() ){
					increments.setWidth( Math.floor(this.maxSize().width()/this.resizeIncrements().width()) );
				}
				if( increments.height()*this.resizeIncrements().height() > this.maxSize().height() ){
					increments.setHeight( Math.floor(this.maxSize().height()/this.resizeIncrements().height()) );
				}
			}
			
			newSize.setWidth( increments.width()*this.resizeIncrements().width() );
			newSize.setHeight( increments.height()*this.resizeIncrements().height() );
		}
		
		return newSize;
	}
	/*int*/ this.resizeFlags = function(){
		return _resizeFlags;
	}
	
	//Constraining panel size
	/*MokaSize*/ this.maxSize = function(){
		return _maxSize;
	}	
	/*void*/ this.setMaxSize = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_maxSize = aSize.copy();
	}
	/*MokaSize*/ this.minSize = function(){
		return _minSize;
	}	
	/*void*/ this.setMinSize = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_minSize = aSize.copy();
	}
	/*MokaSize*/ this.aspectRatio = function(){
		return _aspectRatio;
	}
	/*MokaSize*/ this.resizeIncrements = function(){
		return _resizeIncrements;
	}	
	/*void*/ this.setAspectRatio = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_aspectRatio = aSize.copy();
		_resizeIncrements = new MokaSize(1,1);
	}
	/*void*/ this.setResizeIncrements = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_resizeIncrements = aSize.copy();
		_aspectRatio = new MokaSize(0,0);
	}
	
	//Constraining content size
	/*MokaSize*/ this.contentMaxSize = function(){
		return _contentMaxSize;
	}	
	/*void*/ this.setContentMaxSize = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_contentMaxSize = aSize.copy();
	}
	/*MokaSize*/ this.contentMinSize = function(){
		return _contentMinSize;
	}	
	/*void*/ this.setContentMinSize = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_contentMinSize = aSize.copy();
	}
	/*MokaSize*/ this.contentAspectRatio = function(){
		return _contentAspectRatio;
	}	
	/*void*/ this.setContentAspectRatio = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_contentAspectRatio = aSize.copy();
		_contentResizeIncrements = new MokaSize(1,1);
	}
	/*MokaSize*/ this.contentResizeIncrements = function(){
		return _contentResizeIncrements;
	}	
	/*void*/ this.setContentResizeIncrements = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_contentResizeIncrements = aSize.copy();
		_contentAspectRatio = new MokaSize(0,0);
	}
	
	//Saving the frame to user defaults
	/*void*/ this.saveFrameUsingName = function(aString){
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
	}
	/*void*/ this.setFrameUsingName = function(aString){
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
	}
	/*MokaString*/ this.frameAutosaveName = function(){
		return _frameAutosaveName;
	}	
	/*void*/ this.setFrameAutosaveName = function(aString){
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_frameAutosaveName = aString;
	}
	
	//Ordering panels
	/*void*/ this.orderBack = function(sender){
		MokaApp.orderPanelBack(this);
	}
	/*void*/ this.orderFront = function(sender){
		MokaApp.orderPanelFront(this);
	}
	/*void*/ this.orderPanelRelativeTo = function(anOrder,aPanel){
		if( typeof anOrder == undefined ){ return; }
		if( !MokaNumberIsInt(anOrder) ){ return; }
		if( anOrder < 0 || anOrder > 5 ){ return; }
		if( typeof aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		
		if( this.level() != aPanel.level() ){
			return;
		}
		
		MokaApp.orderPanelToOrderRelativeTo(this,anOrder,aPanel);
	}
	/*void*/ this.isVisible = function(){
		//determine if the panel is visible
	}
	/*MokaPanelLevel*/ this.level = function(){
		return _level;
	}	
	/*void*/ this.setLevel = function(aLevel){
		_level = aLevel;
		MokaApp.movePanelToLevel(this,aLevel);
	}
	/*int*/ this.panelNumber = function(){
		return MokaApp.localNumberForPanel(this);
	}
	/*int*/ this.globalPanelNumber = function(){
		return MokaApp.globalNumberForPanel(this);
	}
	
	//Making key and main panel
	/*bool*/ this.canBecomeKeyPanel = function(){
		return this.styleMask()&(MokaTitledPanelMask|MokaResizablePanelMask);
	}
	/*void*/ this.makeKeyAndOrderFront = function(sender){
		this.makeKeyPanel();
		if( this.isKeyPanel() ){
			this.orderFront();
		}
	}
	/*void*/ this.makeKeyPanel = function(sender){
		MokaApp.setKeyPanel( this );
	}
	/*bool*/ this.isKeyPanel = function(){
		return _isKeyPanel;
	}	
	/*void*/ this.becomeKeyPanel = function(){
		_isKeyPanel = YES;
	}
	/*void*/ this.canResignKeyPanel = function(){
		return YES;
	}
	/*void*/ this.resignKeyPanel = function(sender){
		_isKeyPanel = NO;
	}
	/*bool*/ this.canBecomeMainPanel = function(){
		return YES;
	}
	/*void*/ this.makeMainPanel = function(){
		MokaApp.setMainPanel(this);
	}
	/*bool*/ this.isMainPanel = function(){
		return _isMainPanel;
	}	
	/*void*/ this.becomeMainPanel = function(){
		_isMainPanel = YES;
	}
	/*void*/ this.resignMainPanel = function(){
		_isMainPanel = NO;
	}
	/*bool*/ this.canResignMainPanel = function(){
		return YES;
	}
	
	//Default button
	/*MokaCell*/ this.defaultButton = function(){
		return _defaultButton;
	}	
	/*void*/ this.setDefaultButton = function(aButton){
		if( !is(aButton,MokaButton) ){ return; }
		
		_defaultButton = aButton;
	}
	
	//Make first responder
	/*MokaResponder*/ this.firstResponder = function(){
		return _firstResponder;
	}	
	/*void*/ this.makeFirstResponder = function(aResponder){
		if( typeof aResponder == undefined ){ return; }
		if( typeof(aResponder.isKindOfClass) != "function" ){ return; }
		if( !aResponder.isKindOfClass(MokaResponder) ){ return; }
		
		if( this.firstResponder() == aResponder ){ return; }
		
		if( this.firstResponder() ){
			if( this.firstResponder().resignFirstResponder() && aResponder.acceptsFirstResponder() ){
				aResponder.becomeFirstResponder();
				_firstResponder = aResponder;
			}
		} else if( aResponder.acceptsFirstResponder() ){
			aResponder.becomeFirstResponder();
			_firstResponder = aResponder;
		}
	}
	
	//Event handling
	/*bool*/ this.willSendEventToResponder = function(anEvent,aResponder){
		if( !is(anEvent,MokaEvent) ){ return NO; }
		if( !is(aResponder,MokaResponder) ){ return NO; }
		
		var eventIsFirstMouse = NO;
		if( !this.isKeyPanel() ){
			this.makeKeyAndOrderFront();
			eventIsFirstMouse = YES;
		}
		
		if( anEvent.type() == MokaMouseDown && aResponder == _resizeControl ){
			this.mouseDown(anEvent);
			return NO;
		} else if( anEvent.type() == MokaMouseUp && aResponder == _resizeControl ){
			this.mouseUp(anEvent);
			return NO;
		} else if( anEvent.type() == MokaMouseDragged && aResponder == _resizeControl ){
			this.mouseDragged(anEvent);
			return NO;
		}
		
		return YES;
	}
	/*void*/ this.didSendEvent = function(){}	
	/*void*/ this.sendEvent = function(anEvent){
		if( typeof anEvent == undefined ){ return; }
		if( typeof(anEvent.isKindOfClass) != "function" ){ return; }
		if( !anEvent.isKindOfClass(MokaEvent) ){ return; }
		
		
		
		if( anEvent.type() == MokaKeyDown && this.firstResponder() ){
			this.firstResponder().keyDown(anEvent);
		} else if( anEvent.type() == MokaKeyUp && this.firstResponder() ){
			this.firstResponder().keyUp(anEvent);
		} else if( anEvent.type() == MokaFlagsChanged ){
		} else {
			var eventIsFirstMouse = NO;
			if( !this.isKeyPanel() ){
				this.makeKeyAndOrderFront();
				eventIsFirstMouse = YES;
			}
			
			//Find the responder to accept the event
			var hitResponder = this.contentView().hitTest( anEvent.mouseLocation() );
			//myDiv.innerHTML = ( this.contentView().frame().size().height())
			var localPoint = this.convertPointFromPage(anEvent.mouseLocation());
			if( this.closeButton().frame().containsPoint( localPoint ) ){ hitResponder = this.closeButton(); }
			if( this.miniaturizeButton().frame().containsPoint( localPoint ) ){ hitResponder = this.miniaturizeButton(); }
			if( this.shadeButton().frame().containsPoint( localPoint ) ){ hitResponder = this.shadeButton(); }
			if( this.toolbarButton().frame().containsPoint( localPoint ) ){ hitResponder = this.toolbarButton(); }
			if( this.resizeControl().frame().containsPoint( localPoint ) ){ hitResponder = this;}
			
			if( !hitResponder ){ hitResponder = this;}
			else{ if( !hitResponder.isOpaque() ){ hitResponder = this; } }
			if( _isBeingDragged ){ hitResponder = this; }
			if( _isBeingResized ){ hitResponder = this; }
			
			//alert( hitResponder.constructor );
			
			if( anEvent.type() == MokaMouseDown ){ hitResponder.mouseDown(anEvent); }
			else if( anEvent.type() == MokaMouseUp ){ hitResponder.mouseUp(anEvent); }
			else if( anEvent.type() == MokaRightMouseDown ){ hitResponder.rightMouseDown(anEvent); }
			else if( anEvent.type() == MokaRightMouseUp ){ hitResponder.rightMouseUp(anEvent); }
			else if( anEvent.type() == MokaOtherMouseDown ){ hitResponder.otherMouseDown(anEvent); }
			else if( anEvent.type() == MokaOtherMouseUp ){ hitResponder.otherMouseUp(anEvent); }
			else if( anEvent.type() == MokaMouseEntered ){ hitResponder.mouseEntered(anEvent); }
			else if( anEvent.type() == MokaMouseExited ){ hitResponder.mouseExited(anEvent); }
			else if( anEvent.type() == MokaMouseMoved ){ hitResponder.mouseMoved(anEvent); }
			else if( anEvent.type() == MokaMouseDragged ){ hitResponder.mouseDragged(anEvent); }
			else if( anEvent.type() == MokaRightMouseDragged ){ hitResponder.rightMouseDragged(anEvent); }
			else if( anEvent.type() == MokaOtherMouseDragged ){ hitResponder.otherMouseDragged(anEvent); }
			else if( anEvent.type() == MokaFlagsChanged ){ hitResponder.flagsChanged(anEvent); }
			else if( anEvent.type() == MokaScrollWheel ){ hitResponder.scrollWheel(anEvent); }
			
		}
		
	}
	/*bool*/ this.tryToPerformWith = function(anAction,anObject){
		if( anAction == undefined ){ return NO; }
		if( typeof(anAction.isKindOfClass) != "function" ){ return NO; }
		if( !anAction.isKindOfClass(MokaSelector) ){ return NO; }
		if( anObject == undefined ){ return NO; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return NO; }
		
		if( this.supers().tryToPerformWith(anAction,anObject) || (this.delegate() && this.delegate().performSelectorWithObject(anAction,anObject)) ){
			return YES;
		}
		
		return NO;
		
	}
	/*MokaPoint*/ this.mouseLocationOutsideOfEventStream = function(){
		return this.convertPointFromPage(MokaApp.mouseLocation());
	}
	/*bool*/ this.acceptsMouseMoveEvents = function(){
		return _acceptsMouseMoveEvents;
	}	
	/*void*/ this.setAcceptsMouseMoveEvents = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		_acceptsMouseMoveEvents = yn;
	}
	/*bool*/ this.ignoresMouseEvents = function(){
		return _ignoresMouseEvents;
	}	
	/*void*/ this.setIgnoresMouseEvents = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_ignoresMouseEvents = yn;
	}
	
	//Keyboard interface control
	/*MokaResponder*/ this.initialFirstResponder = function(){
		return _initialFirstResponder;
	}	
	/*void*/ this.setInitialFirstResponder = function(aResponder){
		if( typeof(aResponder.isKindOfClass) != "function" ){ return; }
		if( !aResponder.isKindOfClass(MokaResponder) ){ return; }
		_initialFirstResponder = aResponder;
	}
	/*MokaSelectionDirection*/ this.keyViewSelectionDirection = function(){
		return _keyViewSelectionDirection;
	}	
	/*void*/ this.selectKeyViewFollowingView = function(aView){
		if( !is(aView,MokaView) ){ return; }
		this.makeFirstResponder( aView.nextKeyView() );
	}
	/*void*/ this.selectKeyViewPrecedingView = function(aView){
		if( !is(aView,MokaView) ){ return; }
		this.makeFirstResponder( aView.previousKeyView() );
	}
	/*void*/ this.selectNextKeyView = function(){
		var nextKeyView = null;
		
		if( this.firstResponder() ){
			nextKeyView = this.firstResponder.nextValidKeyView();
		}
		if( !nextKeyView && this.initialFirstResponder() && this.initialFirstResponder().acceptsFirstResponder() ){
			nextKeyView = this.initialFirstResponder();
		}
		if( !nextKeyView ){
			nextKeyView = this.initialFirstResponder.nextValidKeyView();
		}
		
		this.makeFirstResponder(nextKeyView);
	}
	/*void*/ this.selectPreviousKeyView = function(){
		var previousKeyView = null;
		
		if( this.firstResponder() ){
			previousKeyView = this.firstResponder.previousValidKeyView();
		}
		if( !previousKeyView && this.initialFirstResponder() && this.initialFirstResponder().acceptsFirstResponder() ){
			previousKeyView = this.initialFirstResponder();
		}
		if( !previousKeyView ){
			previousKeyView = this.initialFirstResponder.previousValidKeyView();
		}
		
		this.makeFirstResponder(previousKeyView);
	}
	
	//Setting title and filename
	/*MokaString*/ this.title = function(){
		return _title;
	}	
	/*void*/ this.setTitle = function(aString){
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		_title = aString;
	}
	/*void*/ this.setTitleWithRepresentedFilename = function(aPath){
		if( aPath == undefined ){ return; }
		if( typeof(aPath.isKindOfClass) != "function" ){ return; }
		if( !aPath.isKindOfClass(MokaString) ){ return; }
		
		var components = aPath.pathComponents();
		
		if( components.count() == 0 ){ return; }
		
		this.setTitle(components.lastObject());
		
		this.setRepresentedFilename(aPath);
	}
	/*MokaString*/ this.representedFilename = function(){
		return _representedFileName;
	}	
	/*void*/ this.setRepresentedFilename = function(aPath){
		if( aPath == undefined ){ return; }
		if( typeof(aPath.isKindOfClass) != "function" ){ return; }
		if( !aPath.isKindOfClass(MokaPath) ){ return; }
		
		_representedFilename = aPath;
	}
	
	//Set documented is edited
	/*bool*/ this.documentEdited = function(){
		return _documentEdited;
	}	
	/*void*/ this.setDocumentEdited = function(yn){
		if( typeof(yn) != "boolean" ){ return; }
		_documentEdited = yn;
		//if yes, change the look of the close button to indicate that the user is closing something that hasn't been saved.
		//this should only occur once, the first time the user modifies the document
	}
	
	//Closing the panel
	/*void*/ this.close = function(){
		//remove from the app: release or hide
		//alert("close");
		MokaApp.closePanel( this );
	}
	/*void*/ this.performClose = function(sender){
		this.close();
	}
	/*bool*/ this.isReleasedWhenClosed = function(){
		return _isReleasedWhenClosed;
	}	
	/*void*/ this.setIsReleasedWhenClosed = function(yn){
		
		if( typeof(yn) != "boolean" ){ return; }
		
		_isReleasedWhenClosed = yn;
	}
	
	//Miniaturizing
	/*void*/ this.miniaturize = function(){
		alert("miniaturize");
		// this.unshade();
		this.miniaturizeButton().action().setSelectorName("performDeminiaturize");
		//this.saveFrameUsingName( this.frameAutosaveName() );
		//ask the app where this panel should go then size it
		
	}
	/*void*/ this.performMiniaturize = function(sender){
		this.miniaturize();
	}
	/*void*/ this.deminiaturize = function(){
		alert("deminiaturize");
		this.miniaturizeButton().action().setSelectorName("performMiniaturize");
		//this.unshade();
	}
	/*void*/ this.performDeminiaturize = function(sender){
		this.deminiaturize();
	}
	/*MokaImage*/ this.minipanelImage = function(){
		return _minipanelImage;
	}	
	/*void*/ this.setMinipanelImage = function(anImage){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_minipanelImage = anImage;
	}
	/*MokaString*/ this.minipanelTitle = function(){
		return _minipanelTitle;
	}	
	/*void*/ this.setMinipanelTitle = function(aString){
		if( typeof aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_minipanelTitle = aString;
	}
	
	//Shading a panel
	/*bool*/ this.isShaded = function(){
		return _isShaded;
	}	
	/*void*/ this.shade = function(){
		if( !(this.styleMask()&MokaShadeablePanelMask) ){ return; }
		
		this.shadeButton().action().setSelectorName("performUnshade");
		this.contentView().setIsHidden(YES);	
		
		//TEMP?
		_preshadeFrameSize = this.frame().size();
		
		_isShaded = YES;
		
		this.setFrameSize( MokaSize.sizeWithDimensions(	this.frame().size().width() , 20 ) );
		this.resizeControl().setIsHidden(YES);
		if( this.styleMask() & MokaResizablePanelMask ){
			
			//TEMP?
			_styleMaskBeforeShade = this.styleMask();
			//this.setStyleMask( this.styleMask() - MokaResizablePanelMask );
		}

	}
	/*void*/ this.performShade = function(sender){
		this.shade();
	}	
	/*void*/ this.unshade = function(){
		//make dependent upon the presence of a title bar??
		this.shadeButton().action().setSelectorName("performShade");
		this.contentView().setIsHidden(NO);
		
		//TEMP?
		
		_isShaded = NO;
		
		this.setFrameSize( _preshadeFrameSize );
		this.setStyleMask( _styleMaskBeforeShade );
		this.resizeControl().setIsHidden(NO);
	}
	/*void*/ this.performUnshade = function(sender){
		this.unshade();
	}
		
	//Exclusion from panels menu
	/*bool*/ this.isExcludedFromPanelsMenu = function(){
		return _isExcludedFromPanelsMenu;
	}	
	/*void*/ this.setIsExcludedFromPanelsMenu = function(yn){
		if( typeof(yn) != "boolean" ){ return; }
		_isExcludedFromPanelsMenu = yn;
		//inform the app that this should not be in the panels menu
	}
	
	//Cursor rects
	/*void*/ this.enableCursorRects = function(){
		_areCursorRectsEnabled = YES;
	}
	/*void*/ this.disableCursorRects = function(){
		_areCursorRectsEnabled = NO;
	}
	/*void*/ this.discardCursorRects = function(){
		
	}
	/*void*/ this.invalidateCursorRectsForView = function(aView){
		if( !is(aView,MokaView) ){ return; }
		
	}
	/*void*/ this.resetCursorRects = function(){
		
	}
	
	//Dragging operations -- not related to dragging the panel
	//...
	
	//Working with display characteristics
	/*MokaView*/ this.contentView = function(){
		return _contentView;
	}	
	/*void*/ this.setContentView = function(aView){
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		_contentView = aView;
		//set the view's resize mask
		//update the size and such of the view to reflect this panel's settings
	}
	/*int*/ this.styleMask = function(){
		return _styleMask;
	}	
	/*void*/ this.setStyleMask = function(aStyleMask){
		if( !MokaNumberIsInt(aStyleMask) ){
			return;
		}
		
		if( aStyleMask < MokaBorderlessPanelMask || aStyleMask >= 2*MokaShadeablePanelMask ){
			return;
		}
		
		_styleMask = aStyleMask;
		
		//update the panel look to include or exclude the various elements
		
		//1: display or hide the titlebar
		if( this.styleMask() & MokaTitledPanelMask ){
			this.closeButton().setIsHidden( NO );
			this.miniaturizeButton().setIsHidden( NO );
			this.shadeButton().setIsHidden( NO );
			this.resizeControl().setIsHidden(NO);

			var newContentViewFrame = this.frame().copy();
				newContentViewFrame.size().setHeight( newContentViewFrame.size().height() - 20 );
				newContentViewFrame.setOrigin( MokaPoint.pointWithCoordinates(0,20) );
			this.contentView().setFrame( newContentViewFrame );
		} else {
			this.closeButton().setIsHidden( YES );
			this.miniaturizeButton().setIsHidden( YES );
			this.shadeButton().setIsHidden( YES );
			this.resizeControl().setIsHidden(YES);
			
			var newContentViewFrame = this.frame().copy();
				newContentViewFrame.size().setHeight( newContentViewFrame.size().height() + 20 );
				newContentViewFrame.setOrigin( MokaPoint.origin() );
			this.contentView().setFrame( newContentViewFrame );
		}
		
		//2: activate or deactivate relevant buttons
		this.closeButton().setIsEnabled( this.styleMask() & MokaClosablePanelMask );
		this.miniaturizeButton().setIsEnabled( this.styleMask() & MokaMiniaturizablePanelMask );
		this.shadeButton().setIsEnabled( this.styleMask() & MokaShadeablePanelMask );
		
		//3: display or hide the resizer widget
		this.resizeControl().setIsEnabled( (this.styleMask() & MokaResizablePanelMask ? YES : NO) );
		this.resizeControl().setIsHidden( (this.styleMask() & MokaResizablePanelMask ? NO : YES) );
		
		
		
	}
	/*bool*/ this.hasShadow = function(){
		return _hasShadow;
	}	
	/*void*/ this.setHasShadow = function(yn){
		if( typeof(yn) != "boolean" ){ return; }
		_hasShadow = yn;
		//insert or remove the shadow images
	}
	/*float*/ this.opacity = function(){
		return _opacity;
	}	
	/*void*/ this.setOpacity = function(anOpacity){
		if( typeof anOpacity == undefined ){ return; }
		if( !MokaNumberIsFloat(anOpacity) ){ return; }

		if( anOpacity < 0 ){ anOpacity = 0; }
		if( anOpacity > 1 ){ anOpacity = 1; }
		
		_opacity = anOpacity;
		this.pageDisplay().style.opacity = anOpacity;
	}
	/*bool*/ this.isOpaque = function(){
		return _isOpaque;
	}	
	/*void*/ this.setIsOpaque = function(yn){
		if( typeof(yn) != "boolean" ){ return; }
		_isOpaque = yn;
		//update the panel if necessary
	}
	
	//Configuring behavior
	/*bool*/ this.isFloatingPanel = function(){
		return _isFloatingPanel;
	}
	/*void*/ this.setIsFloatingPanel = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }

		_isFloatingPanel = yn;
	}
	/*bool*/ this.becomesKeyOnlyIfNeeded = function(){
		return _becomesKeyOnlyIfNeeded;
	}
	/*void*/ this.setBecomesKeyOnlyIfNeeded = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_becomesKeyOnlyIfNeeded = yn;
	}
	/*bool*/ this.worksWhenModal = function(){
		return _worksWhenModal;
	}
	/*void*/ this.setWorksWhenModal = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_worksWhenModal = yn;
	}
	
	//Setting the delegate
	/*id*/ this.delegate = function(){
		return _delegate;
	}	
	/*void*/ this.setDelegate = function(anObject){
		if( typeof(anObject.isKindOfClass) != "function" ){
			return;
		}
		_delegate = anObject;
	}
	
	//Working with the toolbar
	/*MokaToolbar*/ this.toolbar = function(){
		return _toolbar;
	}	
	/*void*/ this.setToolbar = function(aToolbar){
		if( typeof(aToolbar.isKindOfClass) != "function" ){ return; }
		if( !aToolbar.isKindOfClass(MokaToolbar) ){ return; }
		_toolbar = aToolbar;
		
		if( this.toolbarShown() ){
			//show the toolbar
		}
	}
	/*bool*/ this.toolbarShown = function(){
		return _toolbarShown;
	}	
	/*void*/ this.toggleToolbarShown = function(sender){
		_toolbarShown = !this.toolbarShown();
		//update the presence of the toolbar on the screen
	}
	/*void*/ this.runToolbarCustomizationPalette = function(sender){
		if( this.toolbar() ){
			this.toolbar().runCustomizationPalette();
		}
	}
	
	//Standard buttons
	/*MokaButton*/ this.closeButton = function(){
		return _closeButton;
	}
	/*MokaButton*/ this.miniaturizeButton = function(){
		return _miniaturizeButton;
	}
	/*MokaButton*/ this.shadeButton = function(){
		return _shadeButton;
	}
	/*MokaButton*/ this.toolbarButton = function(){
		return _toolbarButton;
	}
	/*MokaCell*/ this.resizeControl = function(){
		return _resizeControl;
	}	
	
	//Handing events
	/*void*/ this.mouseDown = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		/*if( this.delegate() && this.delegate().mouseDown ){
			this.delegate().mouseDown(theEvent);
		} else if( !this.isMainPanel() && this.nextResponder() ){
			this.nextResponder().mouseDown(theEvent);
		}*/
		_downPoint = this.convertPointFromPage( theEvent.mouseLocation() );
		
		if( !this.frame().containsPoint(theEvent.mouseLocation()) ){ return; }
		
		if( !this.isShaded() && this.resizeControl().frame().containsPoint(this.convertPointFromPage(theEvent.mouseLocation())) && (this.styleMask()&MokaResizablePanelMask) ){
			_isBeingResized = YES;
			_isBeingDragged = NO;
			_downPoint.setX( this.frame().size().width() - _downPoint.x() );
			_downPoint.setY( this.frame().size().height() - _downPoint.y() );
		} else {
			_isBeingDragged = ( this.isMovableByPanelBackground() ? YES : !this.contentView().frame().containsPoint(this.convertPointFromPage(theEvent.mouseLocation())) );
			_isBeingResized = NO;
		}
		MokaApp.responderIsCapturingPagewideMouseEvents(this,YES);
		
	}
	/*void*/ this.mouseUp = function(theEvent){ 
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		/*if( this.delegate() && this.delegate().mouseUp ){
			this.delegate().mouseUp(theEvent);
		} else if( !this.isMainPanel() && this.nextResponder() ){
			this.nextResponder().mouseUp(theEvent);
		}*/
		_isBeingDragged = NO;
		_isBeingResized = NO;
		MokaApp.responderIsCapturingPagewideMouseEvents(this,NO);
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		/*if( this.delegate() && this.delegate().mouseDragged ){
			this.delegate().mouseDragged(theEvent);
		} else if( !this.isMainPanel() && this.nextResponder() ){
			this.nextResponder().mouseDragged(theEvent);
		}*/
		
		if( _isBeingDragged ){
			this.setFrameOrigin( new MokaPoint(	theEvent.mouseLocation().x() - _downPoint.x(),
												theEvent.mouseLocation().y() - _downPoint.y() ) );
		} else if( _isBeingResized ){
			
			this.setFrameSize( this.constrainSize( new MokaSize(	theEvent.mouseLocation().x() - this.frame().origin().x() + _downPoint.x(),
																	theEvent.mouseLocation().y() - this.frame().origin().y() + _downPoint.y() ) ) );
		}
		
	}
	/*void*/ this.mouseMoved = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( this.delegate() && this.delegate().mouseMoved ){
			this.delegate().mouseMoved(theEvent);
		} else if( !this.isMainPanel() && this.nextResponder() ){
			this.nextResponder().mouseMoved(theEvent);
		}
	}
	/*void*/ this.mouseEntered = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.delegate() && this.delegate().mouseEntered ){
			this.delegate().mouseEntered(theEvent);
		} else if( !this.isMainPanel() && this.nextResponder() ){
			this.nextResponder().mouseEntered(theEvent);
		}
	}
	/*void*/ this.mouseExited = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.delegate() && this.delegate().mouseExited ){
			this.delegate().mouseExited(theEvent);
		} else if( !this.isMainPanel() && this.nextResponder() ){
			this.nextResponder().mouseExited(theEvent);
		}
	}
	/*void*/ this.keyDown = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.delegate() && this.delegate().keyDown ){
			this.delegate().keyDown(theEvent);
		} else if( !this.isMainPanel() && this.nextResponder() ){
			this.nextResponder().keyDown(theEvent);
		}
	}
	/*void*/ this.keyUp = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.delegate() && this.delegate().keyUp ){
			this.delegate().keyUp(theEvent);
		} else if( !this.isMainPanel() && this.nextResponder() ){
			this.nextResponder().keyUp(theEvent);
		}
	}
	/*void*/ this.flagsChanged = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.delegate() && this.delegate().flagsChanged ){
			this.delegate().flagsChanged(theEvent);
		} else if( !this.isMainPanel() && this.nextResponder() ){
			this.nextResponder().flagsChanged(theEvent);
		}
	}
	/*void*/ this.scrollWheel = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.delegate() && this.delegate().scrollWheel ){
			this.delegate().scrollWheel(theEvent);
		} else if( !this.isMainPanel() && this.nextResponder() ){
			this.nextResponder().scrollWheel(theEvent);
		}
	}
	
	/*MokaEvent*/ this.currentEvent = function(){
		return _currentEvent;
	}
	
}

//Panel border masks
MokaBorderlessPanelMask		= 0;
MokaTitledPanelMask			= 1 << 0;
MokaClosablePanelMask		= 1 << 1;
MokaMiniaturizablePanelMask	= 1 << 2;
MokaResizablePanelMask		= 1 << 3;
MokaShadeablePanelMask		= 1 << 4;
MokaUtilityPanelMask		= 1 << 5;
MokaDocModalPanelMask		= 1 << 6;

//Panel levels
MokaDocumentPanelLevel		= 0;
MokaNormalPanelLevel		= 1;
MokaFloatingPanelLevel		= 2;
MokaModalPanelLevel			= 3;
MokaMainMenuPanelLevel		= 4;
MokaPopUpMenuPanelLevel		= 5;

//Panel ordering
MokaPanelAbove	= 1;
MokaPanelBelow	= -1;

//Key view selection directions
MokaDirectSelection		= 0;
MokaSelectingNext		= 1;
MokaSelectingPrevious	= 2;