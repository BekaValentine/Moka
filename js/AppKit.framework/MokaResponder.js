function MokaResponder(){
	this.extend( MokaObject );

	/*	The next responder	*/
	var _nextResponder = null;

	/*	Tag	*/
	var _tag = null;

	/*	Enabled	*/
	var _isEnabled = YES;

	/*	Acceptance of mouse moves	*/
	var _acceptsMouseMoves = NO;

	/*	Event record	*/
	var _mostRecentEvent = null;

	/*	Menu	*/
	var _menu = null;

	/*	Pagewide event tracking	*/
	var _isCapturingPagewideMouseEvents = NO;
	var _isCapturingPagewideKeyEvents = NO;





	//Set the tag
	/*int*/ this.tag = function(){
		return _tag;
	}
	/*void*/ this.setTag = function( aTag ){
		if( typeof aTag == undefined ){ return; }
		if( !MokaNumberIsInt(aTag) ){ return; }


		_tag = aTag;

	}

	//Set enabled
	/*bool*/ this.isEnabled = function(){
		return _isEnabled;
	}
	/*void*/ this.setIsEnabled = function(yn){
		if( !is(yn,Boolean) ){ return; }

		_isEnabled = yn;

		if( is(this,MokaView) ){
			console.log(1);
			$replaceClassOfElement(/enabled|disabled/, (yn?"enabled":"disabled"), this.pageDisplay() );
			console.log(2);
			this.display();
		}
	}

	//Most recent event
	/*MokaEvent*/ this.mostRecentEvent = function(){
		return _mostRecentEvent
	}

	//Changing the first responder
	/*bool*/ this.acceptsFirstResponder = function(){
		return YES;
	}
	/*void*/ this.becomeFirstResponder = function(){

	}
	/*bool*/ this.resignFirstResponder = function(){
		return YES;
	}

	//Set the next responder
	/*MokaResponder*/ this.nextResponder = function(){
		return _nextResponder;
	}
	/*void*/ this.setNextResponder = function( aResponder ){
		if( typeof aResponder == undefined ){ return; }
		if( typeof(aResponder.isKindOfClass) != "function" ){ return; }
		if( !aResponder.isKindOfClass(MokaResponder) ){ return; }

		_nextResponder = aResponder;
	}

	//Handing events
	/*void*/ this.mouseDown = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		if( this.nextResponder() ){ this.nextResponder().mouseDown(theEvent); }
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		if( this.nextResponder() ){ this.nextResponder().mouseUp(theEvent); }
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().mouseDragged(theEvent); }
	}
	/*void*/ this.mouseMoved = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().mouseMoved(theEvent); }
	}
	/*void*/ this.mouseEntered = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().mouseEntered(theEvent); }
	}
	/*void*/ this.mouseExited = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().mouseExited(theEvent); }
	}
	/*void*/ this.rightMouseDown = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().rightMouseDown(theEvent); }
	}
	/*void*/ this.rightMouseUp = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().rightMouseUp(theEvent); }
	}
	/*void*/ this.rightMouseDragged = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().rightMouseDragged(theEvent); }
	}
	/*void*/ this.otherMouseDown = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().otherMouseDown(theEvent); }
	}
	/*void*/ this.otherMouseUp = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().otherMouseUp(theEvent); }
	}
	/*void*/ this.otherMouseDragged = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().otherMouseDragged(theEvent); }
	}
	/*void*/ this.scrollWheel = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().scrollWheel(theEvent); }
	}
	/*void*/ this.keyDown = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().keyDown(theEvent); }
	}
	/*void*/ this.keyUp = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().keyUp(theEvent); }
	}
	/*void*/ this.flagsChanged = function(theEvent){
		if( !theEvent ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }

		if( this.nextResponder() ){ this.nextResponder().flagsChanged(theEvent); }
	}

	//Pagewide event capturing
	/*bool*/ this.isCapturingPagewideMouseEvents = function(){
		return _isCapturingPagewideMouseEvents;
	}
	/*void*/ this.setIsCapturingPagewideMouseEvents = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }

		_isCapturingPagewideMouseEvents = yn;
		MokaApp.responderIsCapturingPagewideMouseEvents(this,yn);
	}
	/*void*/ this.capturePagewideMouseEvent = function(anEvent){
		if( anEvent == undefined ){ return; }
		if( typeof(anEvent.isKindOfClass) != "function" ){ return; }
		if( !anEvent.isKindOfClass(MokaEvent) ){ return; }

		if( anEvent.type() == MokaMouseDown ){ this.mouseDown(anEvent); }
		else if( anEvent.type() == MokaMouseUp ){ this.mouseUp(anEvent); }
		else if( anEvent.type() == MokaRightMouseDown ){ this.rightMouseDown(anEvent); }
		else if( anEvent.type() == MokaRightMouseUp ){ this.rightMouseUp(anEvent); }
		else if( anEvent.type() == MokaOtherMouseDown ){ this.otherMouseDown(anEvent); }
		else if( anEvent.type() == MokaOtherMouseUp ){ this.otherMouseUp(anEvent); }
		else if( anEvent.type() == MokaMouseEntered ){ this.mouseEntered(anEvent); }
		else if( anEvent.type() == MokaMouseExited ){ this.mouseExited(anEvent); }
		else if( anEvent.type() == MokaMouseMoved ){ this.mouseMoved(anEvent); }
		else if( anEvent.type() == MokaMouseDragged ){ this.mouseDragged(anEvent); }
		else if( anEvent.type() == MokaRightMouseDragged ){ this.rightMouseDragged(anEvent); }
		else if( anEvent.type() == MokaOtherMouseDragged ){ this.otherMouseDragged(anEvent); }
		else if( anEvent.type() == MokaFlagsChanged ){ this.flagsChanged(anEvent); }
		else if( anEvent.type() == MokaScrollWheel ){ this.scrollWheel(anEvent); }
	}
	/*bool*/ this.isCapturingPagewideKeyEvents = function(){
		return _isCapturingPagewideKeyEvents;
	}
	/*void*/ this.setIsCapturingPagewideKeyEvents = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }

		_isCapturingPagewideKeyEvents = yn;
		MokaApp.responderIsCapturingPagewideKeyEvents(this,yn);
	}
	/*void*/ this.capturePagewideKeyEvent = function(anEvent){
		if( anEvent == undefined ){ return; }
		if( typeof(anEvent.isKindOfClass) != "function" ){ return; }
		if( !anEvent.isKindOfClass(MokaEvent) ){ return; }

		if( anEvent.type() == MokaKeyDown ){ this.keyDown(anEvent); }
		else if( anEvent.type() == MokaKeyUp ){ this.keyUp(anEvent); }
	}

	//Set acceptance of mouse moves
	/*bool*/ this.acceptsMouseMoves = function(){
		return _acceptsMouseMoves;
	}
	/*void*/ this.setAcceptsMouseMoves = function( yn ){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }

		_acceptsMouseMoves = yn;
	}

	//Setting the menu
	/*MokaMenu*/ this.menu = function(){
		return _menu;
	}
	/*void*/ this.setMenu = function(aMenu){
		if( typeof aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }

		_menu = aMenu;
	}

	//Dispatch methods
	/*void*/ this.doCommandBySelector = function(aSelector){
		if( anAction == undefined ){ return NO; }
		if( typeof(anAction.isKindOfClass) != "function" ){ return NO; }
		if( !anAction.isKindOfClass(MokaSelector) ){ return NO; }

		if( this.respondsToSelector(anAction) ){
			this[anAction.selectorName()](null);
		} else {
			if( this.nextResponder() ){
				this.nextResponder().doCommandBySelector(anAction);
			} else {
				this.noResponderFor(anAction);
			}
		}
	}
	/*bool*/ this.tryToPerformWith = function(anAction,anObject){
		if( anAction == undefined ){ return NO; }
		if( typeof(anAction.isKindOfClass) != "function" ){ return NO; }
		if( !anAction.isKindOfClass(MokaSelector) ){ return NO; }
		if( anObject == undefined ){ return NO; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return NO; }

		if( this.respondsToSelector(anAction) ){
			this[anAction.selectorName()](anObject);
			return YES;
		} else {
			if( this.nextResponder() ){
				return this.nextResponder().tryToPerformWith(anAction,anObject);
			} else {
				this.noResponderFor(anAction);
				return NO;
			}
		}
	}

	//Terminating the responder change
	/*void*/ this.noResponderFor = function(aSelector){
		if( aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }

		$l("No responder for " + aSelector.selectorName() + " (" + this.description() + ")")

		if(aSelector.selectorName() == "keyDown"){

		}
	}

	//Action methods
	/*void*/ this.cancelOperation = function(){

	}
	/*void*/ this.capitalizeWord = function(){

	}
	/*void*/ this.centerSelectionInVisibleArea = function(){

	}
	/*void*/ this.changeCaseOfLetter = function(){

	}
	/*void*/ this.complete = function(){

	}
	/*void*/ this.deleteBackward = function(){

	}
	/*void*/ this.deleteBackwardByDecomposingPreviousCharacter = function(){

	}
	/*void*/ this.deleteForward = function(){

	}
	/*void*/ this.deleteToBeginningOfLine = function(){

	}
	/*void*/ this.deleteToBeginningOfParagraph = function(){

	}
	/*void*/ this.deleteToEndOfLine = function(){

	}
	/*void*/ this.deleteToEndOfParagraph = function(){

	}
	/*void*/ this.deleteToMark = function(){

	}
	/*void*/ this.deleteWordBackward = function(){

	}
	/*void*/ this.deleteWordForward = function(){

	}
	/*void*/ this.indent = function(){

	}
	/*void*/ this.insertBacktab = function(){

	}
	/*void*/ this.insertContainerBreak = function(){

	}
	/*void*/ this.insertLineBreak = function(){

	}
	/*void*/ this.insertNewline = function(){

	}
	/*void*/ this.insertNewlineIgnoringfieldEditor = function(){

	}
	/*void*/ this.insertParagraphSeparator = function(){

	}
	/*void*/ this.insertTab = function(){

	}
	/*void*/ this.insertTabIgnoringFieldEditor = function(){

	}
	/*void*/ this.insertText = function(){

	}
	/*void*/ this.lowercaseWord = function(){

	}
	/*void*/ this.moveBackward = function(){

	}
	/*void*/ this.moveBackwardAndModifySelection = function(){

	}
	/*void*/ this.moveDown = function(){

	}
	/*void*/ this.moveDownAndModifySelection = function(){

	}
	/*void*/ this.moveForward = function(){

	}
	/*void*/ this.moveForwardAndModifySelection = function(){

	}
	/*void*/ this.moveLeft = function(){

	}
	/*void*/ this.moveLeftAndModifySelection = function(){

	}
	/*void*/ this.moveRight = function(){

	}
	/*void*/ this.moveRightAndModifySelection = function(){

	}
	/*void*/ this.moveToBeginningOfLine = function(){

	}
	/*void*/ this.moveToBeginningOfParagraph = function(){

	}
	/*void*/ this.moveToBeginningOfDocument = function(){

	}
	/*void*/ this.moveToEndOfLine = function(){

	}
	/*void*/ this.moveToEndOfParagraph = function(){

	}
	/*void*/ this.moveToEndOfDocument = function(){

	}
	/*void*/ this.moveUp = function(){

	}
	/*void*/ this.moveUpAndModifySelection = function(){

	}
	/*void*/ this.moveWordBackward = function(){

	}
	/*void*/ this.moveWordBackwardAndModifySelection = function(){

	}
	/*void*/ this.moveWordForward = function(){

	}
	/*void*/ this.moveWordForwardAndModifySelection = function(){

	}
	/*void*/ this.moveWordLeft = function(){

	}
	/*void*/ this.moveWordLeftAndModifySelection = function(){

	}
	/*void*/ this.moveWordRight = function(){

	}
	/*void*/ this.moveWordRightAndModifySelection = function(){

	}
	/*void*/ this.pageDown = function(){

	}
	/*void*/ this.pageUp = function(){

	}
	/*void*/ this.scrollLineDown = function(){

	}
	/*void*/ this.scrollLineUp = function(){

	}
	/*void*/ this.scrollPageDown = function(){

	}
	/*void*/ this.scrollPageUp = function(){

	}
	/*void*/ this.selectAll = function(){

	}
	/*void*/ this.selectLine = function(){

	}
	/*void*/ this.selectParagraph = function(){

	}
	/*void*/ this.selectToMark = function(){

	}
	/*void*/ this.selectWord = function(){

	}
	/*void*/ this.setMark = function(){

	}
	/*void*/ this.showContextHelp = function(){

	}
	/*void*/ this.swapWithMark = function(){

	}
	/*void*/ this.transpose = function(){

	}
	/*void*/ this.transposeWords = function(){

	}
	/*void*/ this.uppercaseWord = function(){

	}

}
