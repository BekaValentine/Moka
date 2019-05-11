function MokaEvent(){
	this.extend( MokaObject );
	
	var _type = 0;
	var _timestamp = 0;

	var _modifierFlags = null;
	var _characters = null;
	var _charactersIgnoringModifiers = null;
	//var _characters = new MokaString;
	//var _charactersIgnoringModifiers = new MokaString;
	var _keyCode = null;

	var _mouseLocation = null;
	var _buttonNumber = null;
	
	/*	Scrollwheel Event Information	*/
	var _deltaX = 0;
	var _deltaY = 0;
	var _deltaX = 0;
	
	/*	Preventing default HTML behaviour	*/
	var _preventsDefault = YES;
	
	
	
	
	
	//Accessing and setting properties
	/*MokaEventType*/ this.type = function(){
		return _type;
	}
	/*void*/ this._setType = function(anEventType){
		if( typeof anEventType == undefined ){ return; }
		if( !MokaNumberIsInt(anEventType) ){ return; }
		
		if(	anEventType < MokaMouseDown || anEventType > MokaScrollWheel ){ return; }
		
		if( _type ){ return; }
		_type = anEventType;
	}
	/*float*/ this.timestamp = function(){
		return _timestamp;
	}
	/*void*/ this._setTimestamp = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		if( _timestamp ){ return; }
		
		_timestamp = aFloat;
	}
	/*MokaModifierFlags*/ this.modifierFlags = function(){
		return _modifierFlags;
	}
	/*void*/ this._setModifierFlags = function( flags ){
		if( typeof flags == undefined ){ return; }
		if( !MokaNumberIsInt(flags) ){ return; }
		
		if( flags < 0 || flags > 7 ){ return; }
		if( _modifierFlags ){ return; }
		
		_modifierFlags = flags;
	}
	/*string*/ this.characters = function(){
		return _characters;
	}
	/*void*/ this._setCharacters = function(aJSString){
		if( typeof aJSString == undefined ){ return; }
		if( typeof(aJSString) != "string" ){ return; }
		
		if( _characters ){ return; }
		
		_characters = aJSString;
	}
	/*string*/ this.charactersIgnoringModifiers = function(){
		return _charactersIgnoringModifiers;
	}
	/*void*/ this._setCharactersIgnoringModifiers = function(aJSString){
		if( typeof aJSString == undefined ){ return; }
		if( typeof(aJSString) != "string" ){ return; }
		
		if( _charactersIgnoringModifiers ){ return; }
		
		_charactersIgnoringModifiers = aJSString;
	}
	/*int*/ this.keyCode = function(){
		return _keyCode;
	}
	/*void*/ this._setKeyCode = function(anInt){
		if( typeof anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		if( anInt < 0 || anInt > 1114112 ){ return; }
		
		_keyCode = anInt;
	}
	/*MokaPoint*/ this.mouseLocation = function(){
		return _mouseLocation;
	}
	/*void*/ this._setMouseLocation = function(aPoint){
		if( typeof aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		if( _mouseLocation ){ return; }
		
		_mouseLocation = aPoint;
	}
	/*int*/ this.buttonNumber = function(){
		return _buttonNumber;
	}
	/*void*/ this._setButtonNumber = function( anInt ){
		if( typeof anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		_buttonNumber = anInt;
	}
	
	//Scroll wheel information
	/*float*/ this.deltaY = function(){
		return _deltaY;
	}
	/*void*/ this._setDeltaY = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_deltaY = aFloat;
	}
	
	//Preventing default HTML behavior
	/*bool*/ this.preventsDefault = function(){
		return _preventsDefault;
	}
	/*void*/ this.setPreventsDefault = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_preventsDefault = yn;
	}
	
}
/*MokaEvent*/ MokaEvent.keyEvent = function( type, mouseLocation, modifierFlags, timeStamp, characters, charactersIgnoringModifiers, keyCode ) {

	var anEvent = this.makeAndInit();
	
	anEvent._setType( type );
	anEvent._setMouseLocation( mouseLocation );
	anEvent._setModifierFlags( modifierFlags );
	anEvent._setTimestamp( timeStamp );
	anEvent._setCharacters( characters );
	anEvent._setCharactersIgnoringModifiers( charactersIgnoringModifiers );
	anEvent._setKeyCode( keyCode );

	return anEvent;
}
/*MokaEvent*/ MokaEvent.mouseEvent = function( type, mouseLocation, flags, timeStamp, buttonNumber ){
	
	var anEvent = this.makeAndInit();
		
	anEvent._setType( type );
	anEvent._setMouseLocation( mouseLocation );
	anEvent._setModifierFlags( flags );
	anEvent._setTimestamp( timeStamp );
	anEvent._setButtonNumber( buttonNumber );

	return anEvent;

}
/*MokaEvent*/ MokaEvent.scrollEvent = function( mouseLocation, flags, timeStamp, deltaY ){
	
	var anEvent = this.makeAndInit();
	
	anEvent._setType( MokaScrollWheel );
	anEvent._setMouseLocation( mouseLocation );
	anEvent._setModifierFlags( flags );
	anEvent._setTimestamp( timeStamp );
	anEvent._setDeltaY( deltaY );
	
	return anEvent;
	
}
/*MokaEvent*/ MokaEvent.mouseEventFromDOMEvent = function(theEvent){
	var eventType = 0;
	
	// mouse buttons can be determined with the userAgent navigator property. if it contains "Firefox" vs "Safari"
	if( theEvent.type == "mousedown" ){ eventType = MokaMouseDown; }
	else if( theEvent.type == "mouseup" ){ eventType = MokaMouseUp; }
	else if( theEvent.type == "contextmenu" ){ eventType = MokaRightMouseDown; }
	else if( theEvent.type == "mousemove" ){ 
		if( MokaApp.mouseIsDown() ){ eventType = MokaMouseDragged; }
		else { eventType = MokaMouseMoved; }
	}
	
	var flags = 0;
	if( theEvent.altKey ){ flags |= MokaAlternateKey; }
	if( theEvent.ctrlKey ){ flags |= MokaControlKey; }
	if( theEvent.shiftKey ){ flags |= MokaShiftKey; }
	
	return MokaEvent.mouseEvent( eventType, new MokaPoint( theEvent.pageX, theEvent.pageY ), flags, 0, theEvent.button );
}

//Event Types
MokaMouseDown			= 1;
MokaMouseUp				= 2;
MokaMouseDragged		= 3;
MokaRightMouseDown		= 4;
MokaRightMouseUp		= 5;
MokaRightMouseDragged	= 6;
MokaOtherMouseDown		= 7;
MokaOtherMouseUp		= 8;
MokaOtherMouseDragged	= 9;
MokaMouseEntered		= 10;
MokaMouseExited			= 11;
MokaMouseMoved			= 12;
MokaKeyDown				= 13;
MokaKeyUp				= 14;
MokaFlagsChanged		= 15;
MokaScrollWheel			= 16;

MokaMouseDownMask			= 1 << MokaMouseDown;
MokaMouseUpMask				= 1 << MokaMouseUp;
MokaMouseDraggedMask		= 1 << MokaMouseDragged;
MokaRightMouseDownMask		= 1 << MokaRightMouseDown;
MokaRightMouseUpMask		= 1 << MokaRightMouseUp;
MokaRightMouseDraggedMask	= 1 << MokaRightMouseDragged;
MokaOtherMouseDownMask		= 1 << MokaOtherMouseDown;
MokaOtherMouseUpMask		= 1 << MokaOtherMouseUp;
MokaOtherMouseDraggedMask	= 1 << MokaOtherMouseDragged;
MokaMouseEnteredMask		= 1 << MokaMouseEntered;
MokaMouseExitedMask			= 1 << MokaMouseExited;
MokaMouseMovedMask			= 1 << MokaMouseMoved;
MokaKeyDownMask				= 1 << MokaKeyDown;
MokaKeyUpMask				= 1 << MokaKeyUp;
MokaFlagsChangedMask		= 1 << MokaFlagsChanged;
MokaScrollWheelMask			= 1 << MokaScrollWheel;

//Modifier Flags
MokaShiftKey		= 1 << 0;
MokaControlKey		= 1 << 1;
MokaAlternateKey	= 1 << 2;