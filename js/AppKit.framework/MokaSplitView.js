function MokaSplitView(){
	this.extend(MokaView);
	
	/*	Dividers and  properties	*/
	var _dividers = new MokaArray;
	var _dividerThickness = 8;
	var _dividerCell = MokaCell.make().initImageCell(MokaImage.imageWithLocation($s("./skin/MokaSplitView-divider.png")));
	var _alternateDividerCell = MokaCell.make().initImageCell(MokaImage.imageWithLocation($s("./skin/MokaSplitView-divider-alternate.png")));
	
	/*	Orientation	*/
	var _isVertical = NO;
	
	/*	Delegate	*/
	var _delegate = null;
	
	/*	Pane splitters	*/
	var _isPaneSplitter = NO;
	
	/*	For dragging	*/
	var _downPoint = null;
	var _downPointInDivider = null;
	var _dividerToMove = null;
	var _isMovingDividers = NO;
	
	
	
	
	
	// Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_dividers.init();
		_dividerCell.init();
		_alternateDividerCell.init()
		
		_dividerCell.setBackgroundColor( "grey" );
		_alternateDividerCell.setBackgroundColor( "lightgrey" );
		return this;
	}
		
	//Drawing
	//should be invoked when the orientation changes or when new subviews are added
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		this.adjustSubviews();
		for( var i = 0; i < this.subviews().count(); i++ ){
			var v = this.subviews().objectAtIndex(i);
			this.drawSubview(v);
			if( i < this.subviews().count()-1 ){
				var cellOrigin;
				var cellSize;
				if( !this.isVertical() ){
					cellOrigin = new MokaPoint(v.frame().origin().x() + v.frame().size().width(),0);
					cellSize = new MokaSize(this.dividerThickness(),this.frame().size().height());
				} else {
					cellOrigin = new MokaPoint(0,v.frame().origin().y() + v.frame().size().height());
					cellSize = new MokaSize(this.frame().size().width(),this.dividerThickness());
				}
				this.drawDividerInRect( MokaRect.rectWithOriginAndSize(cellOrigin,cellSize) );
			}
		}
	}
	/*void*/ this.drawDividerInRect = function(aRect){
		if( aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		var cellToDraw = _dividerCell;
		if( this.isPaneSplitter() ){
			cellToDraw = _alternateDividerCell;
		}
		this.drawCellInRect(cellToDraw,aRect);
	}
		
	//Managing orientation
	/*bool*/ this.isVertical = function(){
		return _isVertical;
	}	
	/*void*/ this.setIsVertical = function(yn){
		if( typeof(yn) != "boolean" ){ return; }
		_isVertical = yn;
		this.adjustSubviews();
	}
	
	//Setting the delegate
	/*id*/ this.delegate = function(){
		return _delegate;
	}	
	/*void*/ this.setDelegate = function(anObject){
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		_delegate = anObject;
	}
	
	//Managing component views
	//should be invoked when the sizing changes due to dragging
	/*void*/ this.adjustSubviews = function(){
		var oldSize = 0;
		for( var i = 0; i < this.subviews().count(); i++ ){
			var v = this.subviews().objectAtIndex(i);
			oldSize += ( this.isVertical() ? v.frame().size().width() : v.frame().size().height() );
		}
		
		var newSize = ( !this.isVertical() ? this.frame().size().height() : this.frame().size().width() ) - this.dividerThickness()*(this.subviews().count()-1);
		var sizeProportion = newSize/(oldSize == 0 ? 1 : oldSize);
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaSplitViewWillResizeSubviewsNotification,
																				this);
		
		var runningPosition = 0;
		for( var i = 0; i < this.subviews().count(); i++ ){
			var v = this.subviews().objectAtIndex(i);
			if( !this.isVertical() ){
				v.setFrame( MokaRect.rectWithOriginAndSize(new MokaPoint(0,runningPosition+i*this.dividerThickness()), new MokaSize(this.frame().size().width(),(oldSize == 0 ? 1 : v.frame().size().height()*sizeProportion)) ) );
			} else {
				v.setFrame( MokaRect.rectWithOriginAndSize(new MokaPoint(runningPosition+i*this.dividerThickness(),0), new MokaSize((oldSize == 0 ? 1 : v.frame().size().width()*sizeProportion),this.frame().size().height()) ) );
			}
			runningPosition += ( this.isVertical() ? v.frame().size().width() : v.frame().size().height() );
		}
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaSplitViewDidResizeSubviewsNotification,
																				this);
	}
	/*bool*/ this.isSubviewCollapsed = function(aView){
		if( typeof(aView.isKindOfClass) != "function" ){ return NO; }
		if( !aView.isKindOfClass(MokaView) ){ return NO; }
		if( !this.subviews().containsObject(aView) ){ return NO; }
		
		if( !this.subviews().containsObject(aView) ){ return NO; }
		
		return ( this.isVertical() ? aView.frame().size().width() : aView.frame().size().height() ) <= 0;
	}
	/*void*/ this.distributeSizeAmongSubviewsEvenly = function(){
		var subviewSize = (( this.isVertical() ? this.frame().size().width() : this.frame().size().height() ) - (this.subviews().count()-1)*this.dividerThickness())/this.subviews().count();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaSplitViewWillResizeSubviewsNotification,
																				this);
		
		for( var i = 0; i < this.subviews().count(); i++ ){
			var v = this.subviews().objectAtIndex(i);
			if( !this.isVertical() ){
				v.setFrame( MokaRect.rectWithOriginAndSize(new MokaPoint(0,i*(subviewSize+this.dividerThickness())), new MokaSize(this.frame().size().width(),subviewSize) ) );
			} else {
				v.setFrame( MokaRect.rectWithOriginAndSize(new MokaPoint(i*(subviewSize+this.dividerThickness()),0), new MokaSize(subviewSize,this.frame().size().height()) ) );
			}
		}
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaSplitViewDidResizeSubviewsNotification,
																				this);
	}
	
	
	//Managing the look of the dividers
	/*float*/ this.dividerThickness = function(){
		return _dividerThickness;
	}
	
	//Pane splitter
	/*bool*/ this.isPaneSplitter = function(){
		return _isPaneSplitter;
	}
	/*void*/ this.setIsPaneSplitter = function(yn){
		if( typeof(yn) != "boolean" ){ return; }
		_isPaneSplitter = yn;
	}

	//mouse event handlers
	/*void*/ this.mouseDown = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		_downPoint = this.convertPointFromPage(theEvent.mouseLocation());
		_isMovingDividers = NO;
		for( var i = 0; i < this.subviews().count() - 1; i++ ){
			var v = this.subviews().objectAtIndex(i);
			if( !this.isVertical() ){
				if( _downPoint.y() > v.frame().origin().y() + v.frame().size().height() - this.dividerThickness() && _downPoint.y() < this.subviews().objectAtIndex(i+1).frame().origin().y() ){
					_downPointInDivider = _downPoint.y() - v.frame().origin().y() - v.frame().size().height();
					_dividerToMove = i;
					_isMovingDividers = YES;
					break;
				}
			} else {
				if( _downPoint.x() > v.frame().origin().x() + v.frame().size().width() - this.dividerThickness() && _downPoint.x() < this.subviews().objectAtIndex(i+1).frame().origin().x() ){
					_downPointInDivider = _downPoint.x() - v.frame().origin().x() - v.frame().size().width();
					_dividerToMove = i;
					_isMovingDividers = YES;
					break;
				}
			}
		}
		
		if( _isMovingDividers ){
			MokaApp.responderIsCapturingPagewideMouseEvents(this,YES);
		}
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		_isMovingDividers = NO;
		
		MokaApp.responderIsCapturingPagewideMouseEvents(this,NO);
	}
	
	/*void*/ this.mouseDragged = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( _isMovingDividers ){
			var preDividerView = this.subviews().objectAtIndex(_dividerToMove);
			var postDividerView = this.subviews().objectAtIndex(_dividerToMove+1);
			var newPreDividerViewSize;
			var newPostDividerViewOrigin;
			var newPostDividerViewSize;
			if( !this.isVertical() ){
				
				MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaSplitViewWillResizeSubviewsNotification,
																						this);
				
				newPreDividerViewSize = new MokaSize(this.frame().size().width(), this.convertPointFromPage(theEvent.mouseLocation()).y() - _downPointInDivider - preDividerView.frame().origin().y());
				if( newPreDividerViewSize.height() < 0 ){ newPreDividerViewSize.setHeight( 0 ); }
				if( newPreDividerViewSize.height() > ( _dividerToMove < this.subviews().count() - 2 ? this.subviews().objectAtIndex(_dividerToMove+2).frame().origin().y() - this.dividerThickness() : this.frame().size().height() ) - preDividerView.frame().origin().y() - this.dividerThickness() ){
					newPreDividerViewSize.setHeight( ( _dividerToMove < this.subviews().count() - 2 ? this.subviews().objectAtIndex(_dividerToMove+2).frame().origin().y() - this.dividerThickness() : this.frame().size().height() ) - preDividerView.frame().origin().y() - this.dividerThickness() );
				}
				preDividerView.setFrameSize(newPreDividerViewSize);
				
				newPostDividerViewOrigin = new MokaPoint(0,preDividerView.frame().origin().y() + preDividerView.frame().size().height() + this.dividerThickness());
				postDividerView.setFrameOrigin( newPostDividerViewOrigin );
				newPostDividerViewSize = new MokaSize(this.frame().size().width(),( _dividerToMove == this.subviews().count() - 2 ? this.frame().size().height() : this.subviews().objectAtIndex(_dividerToMove+2).frame().origin().y() - this.dividerThickness() ) - postDividerView.frame().origin().y());
				if( newPostDividerViewSize.height() < 0 ){ newPostDividerViewSize.setHeight( 0 ); }
				postDividerView.setFrameSize( newPostDividerViewSize );
				
				MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaSplitViewDidResizeSubviewsNotification,
																						this);
				
			} else {
				
				MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaSplitViewWillResizeSubviewsNotification,
																						this);
				
				newPreDividerViewSize = new MokaSize(this.convertPointFromPage(theEvent.mouseLocation()).x() - _downPointInDivider - preDividerView.frame().origin().x(),this.frame().size().height());
				if( newPreDividerViewSize.width() < 0 ){ newPreDividerViewSize.setWidth( 0 ); }
				if( newPreDividerViewSize.width() > ( _dividerToMove < this.subviews().count() - 2 ? this.subviews().objectAtIndex(_dividerToMove+2).frame().origin().x() - this.dividerThickness() : this.frame().size().width() ) - preDividerView.frame().origin().x() - this.dividerThickness() ){
					newPreDividerViewSize.setWidth( ( _dividerToMove < this.subviews().count() - 2 ? this.subviews().objectAtIndex(_dividerToMove+2).frame().origin().x() - this.dividerThickness() : this.frame().size().width() ) - preDividerView.frame().origin().x() - this.dividerThickness() );
				}
				preDividerView.setFrameSize(newPreDividerViewSize);
				
				newPostDividerViewOrigin = new MokaPoint(preDividerView.frame().origin().x() + preDividerView.frame().size().width() + this.dividerThickness(),0);
				postDividerView.setFrameOrigin( newPostDividerViewOrigin );
				newPostDividerViewSize = new MokaSize(( _dividerToMove == this.subviews().count() - 2 ? this.frame().size().width() : this.subviews().objectAtIndex(_dividerToMove+2).frame().origin().x() - this.dividerThickness() ) - postDividerView.frame().origin().x(),this.frame().size().height());
				if( newPostDividerViewSize.width() < 0 ){ newPostDividerViewSize.setWidth( 0 ); }
				postDividerView.setFrameSize( newPostDividerViewSize );
				
				MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaSplitViewDidResizeSubviewsNotification,
																						this);
				
			}
			
		}
	}
	
	
}



//Notifications
MokaSplitViewDidResizeSubviewsNotification = $s("MokaSplitViewDidResizeSubviewsNotification");
MokaSplitViewWillResizeSubviewsNotification = $s("MokaSplitViewWillResizeSubviewsNotification");