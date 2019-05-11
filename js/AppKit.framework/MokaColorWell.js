function MokaColorWell(){
	this.extend(MokaControl);
	
	/*	Color	*/
	var _color = MokaColor.blackColor();
	
	/*	Active	*/
	var _isActive = NO;
	
	/*	Border	*/
	var _isBordered = NO;
	
	/*	Dragging the color	*/
	var _needsToBeginDraggingColor = NO;
	
	/*	Skin	*/
	var _topLeft = document.createElement('div');
	_topLeft.setAttribute("id","topleft");
	this.skin().appendChild(_topLeft);
	
	var _top = document.createElement('div');
	_top.setAttribute("id","top");
	this.skin().appendChild(_top);
	
	var _topRight = document.createElement('div');
	_topRight.setAttribute("id","topright");
	this.skin().appendChild(_topRight);
	
	var _left = document.createElement('div');
	_left.setAttribute("id","left");
	this.skin().appendChild(_left);
	
	var _center = document.createElement('div');
	_center.setAttribute("id","center");
	this.skin().appendChild(_center);
	
	var _right = document.createElement('div');
	_right.setAttribute("id","right");
	this.skin().appendChild(_right);
	
	var _bottomLeft = document.createElement('div');
	_bottomLeft.setAttribute("id","bottomleft");
	this.skin().appendChild(_bottomLeft);
	
	var _bottom = document.createElement('div');
	_bottom.setAttribute("id","bottom");
	this.skin().appendChild(_bottom);
	
	var _bottomRight = document.createElement('div');
	_bottomRight.setAttribute("id","bottomRight");
	this.skin().appendChild(_bottomRight);
	
	
	
	
	
	
	
	
	//Activating
	/*void*/ this.activate = function(exclusive){
		if( !is(exclusive,Boolean) ){ return; }
		
		//if exclusive, post notification of exclusive activation
		if( exclusive ){
			MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	$s("MokaColorWellActivatedExclusiveNotification"),
																						this );
		}
		
		//subscribe to exclusive activation notices
		MokaNotificationCenter.defaultCenter().addObserverWithSelectorNotificationNameAndObject(	this,
																									$sel("deactivate"),
																									$s("MokaColorWellActivatedExclusiveNotification"),
																									null );
		
		//subscribe to color panel's color changes
		MokaNotificationCenter.defaultCenter().addObserverWithSelectorNotificationNameAndObject(	this,
																									$sel("takeColorFrom"),
																									$s("MokaColorPanelUpdatedColorNotification"),
																									MokaColorPanel.sharedColorPanel() );
		
		_isActive = YES;
		
		MokaColorPanel.defaultPanel().setColor(this.color());
	}
	/*void*/ this.deactivate = function(){
		
		//desubscribe from exclusive activatio notifications
		MokaNotificationCenter.defaultCenter().removeObserverWithNameAndObject(	this,
																				$s("MokaColorWellActivatedExclusiveNotification"),
																				null );
		
		//desubscribe from color panel's color changes
		MokaNotificationCenter.defaultCenter().removeObserverWithNameAndObject(	this,
																				$s("MokaColorPanelUpdatedColorNotification"),
																				MokaColorPanel.sharedColorPanel() );
				
		_isActive = NO;
	}
	/*bool*/ this.isActive = function(){
		return _isActive;
	}
	
	//Managing color
	/*MokaColor*/ this.color = function(){
		return _color;
	}
	/*void*/ this.setColor = function(aColor){
		if( !is(aColor,MokaColor) ){ return; }
		
		_color = aColor;
		
		this.display();
		
		if( this.isActive() && !MokaColorPanel.sharedColorPanel().color().isEqualTo(aColor) ){
			MokaColorPanel.sharedColorPanel().setColor(aColor);
		}
		
		if( this.target() && this.action() && this.target().respondsToSelector(this.action()) ){
			this.target[this.action().selectorName()](this);
		}
	}
	/*void*/ this.takeColorFrom = function(anObject){
		if( !is(anObject,MokaObject) || !anObject.respondsToSelector($sel("color")) ){ return; }
		
		if( !this.color().isEqualTo(anObject.color()) ){
			this.setColor(anObject.color());
		}
	}
	
	//Border
	/*bool*/ this.isBordered = function(){
		return _isBordered;
	}
	/*void*/ this.setIsBordered = function(yn){
		if( !is(yn,Boolean) ){ return; }
		
		_isBordered = yn;
		this.display();
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		_top.style.width = (this.frame().size().width() - parseInt(_topLeft.style.width) - parseInt(_topRight.style.width)) + MokaPageSizeUnits;
		_left.style.height = (this.frame().size().height() - parseInt(_topLeft.style.height) - parseInt(_bottomLeft.style.width)) + MokaPageSizeUnits;
		_center.style.width = (this.frame().size().width() - parseInt(_left.style.width) - parseInt(_right.style.width)) + MokaPageSizeUnits;
		_center.style.height = (this.frame().size().height() - parseInt(_top.style.height) - parseInt(_bottom.style.width)) + MokaPageSizeUnits;
		_right.style.height = (this.frame().size().height() - parseInt(_topRight.style.height) - parseInt(_bottomRight.style.width)) + MokaPageSizeUnits;
		_bottom.style.width = (this.frame().size().width() - parseInt(_bottomLeft.style.width) - parseInt(_bottomRight.style.width)) + MokaPageSizeUnits;
				
		this.setBackgroundColor(this.color());
	}
	
	//Event handling
	/*void*/ this.mouseDown = function(theEvent){
		if( !is(theEvent,MokaEvent) ){ return; }
		
		this.activate(NO);
		
		_needsToBeginDraggingColor = YES;
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( !is(theEvent,MokaEvent) ){ return; }
		
		_needsToBeginDraggingColor = NO;
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( !is(theEvent,MokaEvent) ){ return; }
		
		if( _needsToBeginDraggingColor ){
			_needsToBeginDraggingColor = NO;
			
			var divToDrag = document.createElement("div");
			divToDrag.style.width = "18px";
			divToDrag.style.height = "18px";
			divToDrag.style.border = "1px solid black";
			divToDrag.style.backgroundColor = this.color();
			
			this.dragElementAtPointWithOffsetEventPasteboardSourceAndSlideBack(	divToDrag,
																				theEvent.mouseLocation(),
																				new MokaPoint(-10,-10),
																				theEvent,
																				MokaPasteboard.generalPasteboard(),
																				this,
																				YES );
		}
	}
	
	//Dragging destination operations
	/*bool*/ this.performDragOperation = function(sender){
		if( !is(sender,MokaObject) ){ return NO; }
		if( !sender.respondsToSelector($sel("draggingSource")) || !sender.draggingSource().respondsToSelector($sel("color")) ){ return NO; }
		
		this.takeColorFrom(sender.draggingSource());
			
		return YES;
	}
		
}