function MokaClipView(){
	this.extend(MokaView);
	
	/*	Document Cursor	*/
	var _documentCursor = null;
	
	/*	Working with background color	*/
	var _drawsBackground = YES;
	var _backgroundColor = "white";
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		return this;
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		this.drawSubview(this.subviews().objectAtIndex(0));
	}
	
	
	//Setting the document view
	/*MokaView*/ this.documentView = function(){
		return this.subviews().objectAtIndex(0);
	}	
	/*void*/ this.setDocumentView = function(aView){
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		this.removeSubview( this.subviews().objectAtIndex(0) );
		
		aView.viewWillMoveToPanel(this.panel());
		aView.viewWillMoveToSuperview(this);
		this.subviews().insertObjectAtIndex(aView, 0);
		aView.viewDidMoveToSuperview();
		aView.viewDidMoveToPanel();
		aView.setNextResponder(this);
	

		aView.setFrameOrigin(new MokaPoint);
		
		this.display();
	}
	
	//Scrolling
	/*void*/ this.scrollToPoint = function(aPoint){
		if( aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		if( !this.documentView() ){ return; }
		
		var newScrollPoint = aPoint.copy();
		if( (this.documentView().frame().size().width() + this.bounds().origin().x()) < this.frame().size().width() ){
			newScrollPoint.setX( this.documentView().frame().size().width() - this.frame().size().width() );
		}
		if( (this.documentView().frame().size().height() + this.bounds().origin().y()) < this.frame().size().height() ){
			newScrollPoint.setY( this.documentView().frame().size().height() - this.frame().size().height() );
		}
		
		newScrollPoint = this.constrainScrollPoint(newScrollPoint);
		
		this.setBoundsOrigin( new MokaPoint( newScrollPoint.x(), newScrollPoint.y() ) );
	}
	/*MokaPoint*/ this.constrainScrollPoint = function(aPoint){
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		var newScrollPoint = aPoint.copy();
		
		if( newScrollPoint.x() < 0 ){ newScrollPoint.setX( 0 ); }
		if( newScrollPoint.y() < 0 ){ newScrollPoint.setY( 0 ); }
		if( (newScrollPoint.x()+this.frame().size().width()) > this.documentView().frame().size().width() ){ newScrollPoint.setX( this.documentView().frame().size().width() - this.frame().size().width() ); }
		if( (newScrollPoint.y()+this.frame().size().height()) > this.documentView().frame().size().height() ){ newScrollPoint.setY( this.documentView().frame().size().height() - this.frame().size().height() ); }
		
		if( this.documentView().frame().size().width() < this.frame().size().width() ){ newScrollPoint.setX( 0 ); }
		if( this.documentView().frame().size().height() < this.frame().size().height() ){ newScrollPoint.setY( 0 ); }
		
		return newScrollPoint;
	}
	/*bool*/ this.autoscroll = function(anEvent){
		if( anEvent == undefined ){ return NO; }
		if( typeof(anEvent.isKindOfClass) != "function" ){ return NO; }
		if( !anEvent.isKindOfClass(MokaEvent) ){ return NO; }
		
		if( !this.documentview() ){ return; }
		
		var thePoint = this.convertPointFromPage(anEvent.mouseLocation());
		var directionPoint;
		if( thePoint.y() < 0 && thePoint.x() < 0 ){
			var proportion = Math.sqrt(thePoint.x()*thePoint.x() + thePoint.y()*thePoint.y());
			directionPoint = new MokaPoint(-proportion,-proportion);
		} else if( thePoint.y() < 0 && thePoint.x() >= this.frame().size().width() ){
			var proportion = Math.sqrt(thePoint.x()*thePoint.x() + thePoint.y()*thePoint.y());
			directionPoint = new MokaPoint(proportion,-proportion);
		} else if( thePoint.y() < 0 ){
			directionPoint = new MokaPoint(0,-thePoint.y())
		} else if( thePoint.y() < this.frame().size().height() && thePoint.x() < 0 ){
			directionPoint = new MokaPoint(thePoint.x(),0);
		} else if( thePoint.y() < this.frame().size().height() && thePoint.x() >= this.frame().size().width() ){
			directionPoint = new MokaPoint(thePoint.x()-this.frame().size().width(),0);
		} else if( thePoint.x() < 0 ){
			var proportion = Math.sqrt(thePoint.x()*thePoint.x() + (thePoint.y()-this.frame().size().height())*(thePoint.y()-this.frame().size().height()));
			directionPoint = new MokaPoint(-proportion,proportion);
		} else if( thePoint.x() < this.frame().size().width() ){
			directionPoint = new MokaPoint(0,thePoint.y()-this.frame().size().height());
		} else {
			var proportion = Math.sqrt((thePoint.x()-this.frame().size().width())*(thePoint.x()-this.frame().size().width()) + (thePoint.y()-this.frame().size().height())*(thePoint.y()-this.frame().size().height()));
			directionPoint = new MokaPoint(proportion,proportion);
		}
		
		this.scrollToPoint(directionPoint.subtract(this.bounds().origin()));
	}
	
	//getting the visible portion
	/*MokaRect*/ this.documentRect = function(){
		if( !this.documentView() ){ return new MokaRect; }
		
		var documentRect = this.documentView().frame().copy();
		if( documentRect.size().width() < this.frame().size().width() ){ documentRect.size().setWidth( this.frame().size().width() ); }
		if( documentRect.size().height() < this.frame().size().height() ){ documentRect.size().setHeight( this.frame().size().height() ); }
		return documentRect;
	}
	/*MokaRect*/ this.documentVisibleRect = function(){
		if( !this.documentView() ){ return new MokaRect; }
		
		var visibleRect = this.frame().copy();
		if( visibleRect.size().width() > this.documentView().frame().size().width() ){ visibleRect.size().setWidth( this.documentView().frame().size().width() ); }
		if( visibleRect.size().height() > this.documentView().frame().size().height() ){ visibleRect.size().setHeight( this.documentView().frame().size().height() ); }
		visibleRect.origin().setX( -this.documentView().frame().origin().x() );
		visibleRect.origin().setY( -this.documentView().frame().origin().y() );
		return visibleRect;
	}
	
	//Setting the document cursor
	/*MokaCursor*/ this.documentCursor = function(){
		return _documentCursor;
	}
	/*void*/ this.setDocumentCursor = function(aCursor){
		if( typeof aCursor == undefined ){ return; }
		if( typeof(aCursor.isKindOfClass) != "function" ){ return; }
		if( !aCursor.isKindOfClass(MokaCursor) ){ return; }
		_documentCursor = aCursor;
	}
	
	//Working with background color
	/*bool*/ this.drawsBackground = function(){
		return _drawsBackground;
	}	
	/*void*/ this.setDrawsBackground = function(yn){
		if( typeof(yn) != "boolean" ){ return; }
		_drawsBackground = yn;
		if( yn ){
			this.pageDisplay().style.backgroundColor = this.backgroundColor;
		} else {
			this.pageDisplay().style.backgroundColor = "transparent";
		}
	}
	/*string*/ this.backgroundColor = function(){
		return _backgroundColor;
	}	
	/*void*/ this.setBackgroundColor = function(aSimpleColor){
		if( typeof(aSimpleColor) != "string" ){ return; }
		_backgroundColor = aSimpleColor;
		if( this.drawsBackground() ){
			this.pageDisplay().style.backgroundColor = this.backgroundColor;
		}
	}
	
	/*void*/ this.mouseDown = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		MokaApp.responderIsCapturingPagewideMouseEvents(this,YES);
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		MokaApp.responderIsCapturingPagewideMouseEvents(this,NO);
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if(!this.frame().containsPoint(this.convertPointFromPage(theEvent.mouseLocation()))){
			this.autoscroll(theEvent);
		}
	}
	
}