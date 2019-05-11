function MokaTextField(){
	this.extend( MokaControl );
	
	/*	Editability and Selectability	*/
	var _isEditable = NO;
	var _isSelectable = NO;
	var _editableBox = document.createElement("textarea");
	
	/*	Visual Attributes	*/
	var _textColor = "black";
	var _backgroundColor = "white";
	var _drawsBackground = YES;
	var _isBezeled = NO;
	var _bezelStyle = MokaTextFieldRoundedBezel;
	var _isBordered = NO;
	
	/*	Delegate	*/
	var _delegate = null;
	
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
	
	
	
	
	
	

	// Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		_top.style.width = (this.frame().size().width() - parseInt(_topLeft.style.width) - parseInt(_topRight.style.width)) + MokaPageSizeUnits;
		_left.style.height = (this.frame().size().height() - parseInt(_topLeft.style.height) - parseInt(_bottomLeft.style.width)) + MokaPageSizeUnits;
		_center.style.width = (this.frame().size().width() - parseInt(_left.style.width) - parseInt(_right.style.width)) + MokaPageSizeUnits;
		_center.style.height = (this.frame().size().height() - parseInt(_top.style.height) - parseInt(_bottom.style.width)) + MokaPageSizeUnits;
		_right.style.height = (this.frame().size().height() - parseInt(_topRight.style.height) - parseInt(_bottomRight.style.width)) + MokaPageSizeUnits;
		_bottom.style.width = (this.frame().size().width() - parseInt(_bottomLeft.style.width) - parseInt(_bottomRight.style.width)) + MokaPageSizeUnits;
				
		this.pageDisplay().style.backgroundColor = "green";//(this.drawsBackground() ? this.backgroundColor() : "none" );
		
		if( !this.isEditable() ){
			this.pageDisplay().style.border = (this.isBordered() ? "1" + MokaPageSizeUnits + " solid grey" : "none" );
			var cell = new MokaCell;
			cell.initTextCell(this.stringValue());
			cell.setFontColor( this.textColor() );
			cell.setFontFamily( this.font() );
			cell.setFontSize( (this.controlSize() == MokaRegularControlSize ? 12 : 10) );
			cell.setBaseWritingDirection( this.baseWritingDirection() );
			cell.setTextAlign( this.alignment() );

			this.drawCellInRect(cell,MokaRect.rectWithOriginAndSize(MokaPoint.origin(),this.frame().size()));
		} else {
			
			_editableBox.value = this.stringValue().characters();
			_editableBox.style.width = this.frame().size().width()+MokaPageSizeUnits;
			_editableBox.style.height = this.frame().size().height()+MokaPageSizeUnits;
			_editableBox.style.margin = "1" + MokaPageSizeUnits + " 0 0 0";
			_editableBox.style.position = "absolute";
			if( document.createElement("div").contentEditable != undefined ){
				_editableBox.style.width = this.frame().size().width()+7+MokaPageSizeUnits;
				_editableBox.style.height = this.frame().size().height()+2+MokaPageSizeUnits;
				_editableBox.style.top = 0;
				_editableBox.style.margin = "-1" + MokaPageSizeUnits + " 0 0 -6" + MokaPageSizeUnits;
			}
			_editableBox.style.backgroundColor = "none";
			_editableBox.style.padding = 0;
			_editableBox.style.border = 0;
			_editableBox.style.color = this.textColor();
			_editableBox.style.fontFamily = this.font();
			_editableBox.style.fontSize = (this.controlSize() == MokaRegularControlSize ? 12 : 10);
			_editableBox.style.direction = this.baseWritingDirection();
			_editableBox.style.align = this.alignment();
			_editableBox.style.overflow = "hidden";
			//_editableBox.value = this.stringValue().characters();
			//_editableBox.setAttribute("onblur","focus();");
			this.drawingCanvas().appendChild(_editableBox);
		}
	}
		
	// Controlling editability and selectability
	/*bool*/ this.isEditable = function(){
		return _isEditable;
	}	
	/*void*/ this.setIsEditable = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isEditable = yn;
		this.display();
	}
	/*bool*/ this.isSelectable = function(){
		return _isSelectable;
	}	
	/*void*/ this.setIsSelectable = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isSelectable = yn;
		this.display();
	}
	
	// Controlling the visual attributes
	/*string*/ this.textColor = function(){
		return _textColor;
	}	
	/*void*/ this.setTextColor = function(aColor){
		if( typeof aColor == undefined ){ return; }
		if( typeof(aColor) != "string" ){ return; }
		
		_textColor = aColor;
		this.display();
	}
	/*string*/ this.backgroundColor = function(){
		return _backgroundColor;
	}	
	/*void*/ this.setBackgroundColor = function(aColor){
		if( typeof aColor == undefined ){ return; }
		if( typeof(aColor) != "string" ){ return; }
		
		_backgroundColor = aColor;
		this.display();
	}
	/*bool*/ this.drawsBackground = function(){
		return _drawsBackground;
	}	
	/*void*/ this.setDrawsBackground = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_drawsBackground = yn;
		this.display();
	}
	/*bool*/ this.isBezeled = function(){
		return _isBezeled;
	}	
	/*void*/ this.setIsBezeled = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isBezeled = yn;
		this.display();
	}
	/*MokaTextFieldBezelStyle*/ this.bezelStyle = function(){
		return _bezelStyle;
	}	
	/*void*/ this.setBezelStyle = function(aBezelStyle){
		if(aBezelStyle != MokaTextFieldSquareBezel && aBezelStyle != MokaTextFieldRoundBezel ){ return; }
		
		_bezelStyle = aBezelStyle;
		this.display();
	}
	/*bool*/ this.isBordered = function(){
		return _isBordered;
	}	
	/*void*/ this.setIsBordered = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isBordered = yn;
		this.display();
	}
	
	// Setting the delegate
	/*id*/ this.delegate = function(){
		return _delegate;
	}	
	/*void*/ this.setDelegate = function(anObject){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_delegate = anObject;		
	}
	
	// Delegate methods
	// ??
	
	//Becoming first responder
	/*void*/ this.becomeFirstResponder = function(){
		if( this.isEditable() ){
			_editableBox.focus();
		}
	}
	/*bool*/ this.resignFirstResponder = function(){
		if( this.isEditable() ){
			_editableBox.blur();
		}
		
		return YES;
	}
	
	// Event handling
	/*void*/ this.keyDown = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		MokaApp.setPreventsDefaultKeyEventBehavior(NO);
		if( this.isEditable() && (theEvent.keyCode() == 13 || theEvent.keyCode() == 3) ){ //13 == return, 3 == enter
			
			this.setStringValue($s(value));
			if( this.target() && this.action() ){
				if(this.target().respondsTo(this.action())){
					this.target()[this.action().selectorName()](this);
				}
			}
		} else if(theEvent.keyCode() == 27 ){ //27 = escape
			this.display();
		}
	}
	/*void*/ this.mouseDown = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var point = this.convertPointFromPage(theEvent.mouseLocation());
		if( this.isEditable() || this.isSelectable() ){ theEvent.setPreventsDefault(NO); }
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( this.isEditable() || this.isSelectable() ){ theEvent.setPreventsDefault(NO); }
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( this.isEditable() || this.isSelectable() ){ theEvent.setPreventsDefault(NO); }
	}
	
}

//Bezel styles
MokaTextFieldSquareBezel	= 0;
MokaTextFieldRoundedBezel	= 1;