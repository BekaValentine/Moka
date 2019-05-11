function MokaControl(){
	this.extend( MokaView );

	/*	The control's value	*/
	var _numberValue = 0;
	var _objectValue = null;
	var _stringValue = $s("");
	
	/*	Target/Action mechanism	*/
	var _target = null;
	var _action = null;
	var _isContinuous = NO;
	var _sendActionOn = 0;
	var _ignoresMultiClick = NO;
	
	/*	Formatting text	*/
	var _alignment = MokaLeftTextAlignment;
	var _font = "sans-serif";
	var _formatter = null;
	var _baseWritingDirection = MokaWritingDirectionLeftToRight;
	
	/*	Control Size	*/
	var _controlSize = MokaRegularControlSize;
	

	
	
	//Setting the control's value
	/*number*/ this.numberValue = function(){
		return _numberValue;
	}	
	/*void*/ this.setNumberValue = function( aNumber ){
		if( typeof aNumber == undefined ){ return; }
		if( !MokaNumberIsFloat(aNumber) ){ return; }
		_numberValue = this.constrainNumberValue(aNumber);
		this.display();
	}
	/*id*/ this.objectValue = function(){
		return _objectValue;
	}	
	/*void*/ this.setObjectValue = function( anObject ){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_objectValue = this.constrainObjectValue(anObject);
		this.display();
	}
	/*MokaString*/ this.stringValue = function(){
		return _stringValue;
	}	
	/*void*/ this.setStringValue = function( aString ){
		if( !aString ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		
		_stringValue = this.constrainStringValue(aString);
		this.display();
	}
	/*float*/ this.constrainNumberValue = function(aNewNumberValue){
		if( typeof aNewNumberValue == undefined ){ return this.numberValue(); }
		if( !MokaNumberIsFloat(aNewNumberValue) ){ return this.numberValue(); }
		
		return aNewNumberValue;
	}
	/*id*/ this.constrainObjectValue = function(anObject){
		if( typeof anObject == undefined ){ return this.objectValue(); }
		if( typeof(anObject.isKindOfClass) != "function" ){ return this.objectValue(); }
		
		return anObject;
	}
	/*string*/ this.constrainStringValue = function(aString){
		if( typeof aString == undefined ){ return this.stringValue(); }
		if( typeof(aString.isKindOfClass) != "function" ){ return this.stringValue();}
		if( !aString.isKindOfClass(MokaString) ){ return this.stringValue(); }
		return aString;
	}
	
	
	//Interacting with other controls
	/*void*/ this.takeNumberValueFrom = function(sender){
		if( typeof sender == undefined ){ return; }
		if( typeof(sender.isKindOfClass) != "function" ){ return; }
		if( !sender.isKindOfClass(MokaControl) ){ return; }
		this.setNumberValue( sender.numberValue() );
	}
	/*void*/ this.takeObjectValueFrom = function(sender){
		if( typeof sender == undefined ){ return; }
		if( typeof(sender.isKindOfClass) != "function" ){ return; }
		if( !sender.isKindOfClass(MokaControl) ){ return; }
		this.setObjectValue( sender.objectValue() );
	}
	/*void*/ this.takeStringValueFrom = function(sender){
		if( typeof sender == undefined ){ return; }
		if( typeof(sender.isKindOfClass) != "function" ){ return; }
		if( !sender.isKindOfClass(MokaControl) ){ return; }
		this.setStringValue( sender.stringValue() );
	}
		
	//Setting the target/action
	/*id*/ this.target = function(){
		return _target;
	}	
	/*void*/ this.setTarget = function( anObject ){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		if( !anObject.isKindOfClass(MokaObject) ){ return; }
		_target = anObject;
	}
	/*MokaSelector*/ this.action = function(){
		return _action;
	}	
	/*void*/ this.setAction = function( anAction ){
		if( typeof(anAction.isKindOfClass) != "function" ){ return; }
		if( !anAction.isKindOfClass(MokaSelector) ){ return; }
		_action = anAction;
	}
	/*bool*/ this.isContinuous = function(){
		return _isContinuous;
	}	
	/*void*/ this.setIsContinuous = function( yn ){
		if( typeof yn == undefined ){ return; }
		_isContinuous = yn;
	}
	/*void*/ this.sendActionToTarget = function(aSelector,aTarget){
		if( typeof aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		if( typeof aTarget == undefined ){ return; }
		if( typeof(aTarget.isKindOfClass) != "function" ){ return; }
		if( !aTarget.isKindOfClass(MokaObject) ){ return; }
		
		if( aTarget[aSelector.selectorName()] && typeof(aTarget[aSelector.selectorName()]) == "function" ){
			aTarget[aSelector.selectorName()](this);
		}
	}
	/*MokaEventTypeMask*/ this.sendActionOn = function(){
		return _sendActionOn;
	}	
	/*void*/ this.setSendActionOn = function(eventTypeMask){
		if( typeof eventTypeMask == undefined ){ return; }
		if( !MokaNumberIsInt(eventTypeMask) ){ return; }
		if( eventTypeMask < 0 || eventTypeMask > (1 >> 16) ){ return; }
		_sendActionOn = eventTypeMask;
	}
	/*bool*/ this.ignoresMultiClick = function(){
		return _ignoresMultiClick;
	}	
	/*void*/ this.setIgnoresMultiClick = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		_ignoresMultiClick = yn;
	}
	
	//Formatting text
	/*MokaAlignment*/ this.alignment = function(){
		return _alignment;
	}	
	/*void*/ this.setAlignment = function(align){
		if( align != 0 && align != 1 && align != 2 && align != 3 ){ return; }
		_alignment = align;
		this.display();
	}
	/*string*/ this.font = function(){
		return _font;
	}	
	/*void*/ this.setFont = function(aJSString){
		if( typeof(aJSString) != "string" ){ return; }
		_font = aJSString;
		this.display();
	}
	/*id*/ this.formatter = function(){
		return _formatter;
	}	
	/*void*/ this.setFormatter = function(anObject){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		_formatter = anObject;
		this.display();
	}
	/*MokaWritingDirection*/ this.baseWritingDirection = function(){
		return _baseWritingDirection;
	}	
	/*void*/ this.setBaseWritingDirection = function(ltr){
		if( ltr != 0 && ltr != 1 ){ return; }
		_baseWritingDirection = ltr;
		this.display();
	}
	
	//Activating from keyboard
	/*void*/ this.performClick = function(sender){
		this.mouseDown(MokaEvent.mouseEvent(MokaMouseUp,this.convertPointToPage(this.frame().origin()),0,Date.now(),1))
	}
	
	//Setting the control size
	/*MokaControlSize*/ this.controlSize = function(){
		return _controlSize;
	}	
	/*void*/ this.setControlSize = function(aControlSize){
		if( aControlSize != 1 && aControlSize != 0 ){ return; }
		_controlSize = aControlSize;
		
		$replaceClassOfElement( /small|regular/, (aControlSize == MokaRegularControlSize ? "regular" : "small"), this.pageDisplay() );
		
		this.setFrameSize(this.frame().size());
	}
	
	
}

//MOVE TO TEXT??
MokaLeftTextAlignment		= 0;
MokaRightTextAlignment		= 1;
MokaCenterTextAlignment		= 2;
MokaJustifiedTextAlignment	= 3;

//MOVE TO TEXT?
MokaWritingDirectionLeftToRight	= 0;
MokaWritingDirectionRightToLeft	= 1;

//Control Size
MokaRegularControlSize	= 0;
MokaSmallControlSize	= 1;