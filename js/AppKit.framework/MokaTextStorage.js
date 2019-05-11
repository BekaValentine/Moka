function MokaTextStorage(){
	this.extend(MokaAttributedString);
	
	/*	Delegate	*/
	var _delegate = null;
	
	/*	Properties	*/
	var _font = MokaFont.make().init();
	var _forgroundColor = MokaColor.blackColor();
	
	//Handling edit messages
	/*void*/ this.editedWithRangeAndLengthChange = function(editMask,range,length){
		
	}
	/*void*/ this.ensureAttributesAreFixedInRange = function(aRange){
		
	}
	/*bool*/ this.fixesAttributesLazily = function(){
		return NO;
	}
	/*void*/ this.invalidateAttributesInRange = function(aRange){
		
	}
	/*void*/ this.processEditing = function(){
		
	}
	
	//Determing the nature of changes
	/*int*/ this.editedMask = function(){
		
	}
	
	//Determing the extent of changes
	/*MokaRange*/ this.editedRange = function(){
		
	}
	/*int*/ this.lengthChange = function(){
		
	}
	
	//Delegate
	/*id*/ this.delegate = function(){
		return _delegate;
	}
	/*void*/ this.setDelegate = function(obj){
		if( !is(obj,MokaObject) ){ return; }
		_delegate = obj;
	}
	
	//Properties
	/*MokaArray*/ this.attributeRuns = function(){
		
	}
	/*void*/ this.setAttributeRuns = function(anArray){
		
	}
	/*MokaArray*/ this.characters = function(){
		
	}
	/*void*/ this.setCharacters = function(anArray){
		
	}
	/*MokaFont*/ this.font = function(){
		return _font;
	}
	/*void*/ this.setFont = function(aFont){
		if( !is(aFont,MokaFont) ){ return; }
		_font = aFont;
	}
	/*MokaColor*/ this.foregroundColor = function(){
		return _foregroundColor;
	}
	/*void*/ this.setForegroundColor = function(aColor){
		if( !is(aColor,MokaColor) ){ return; }
		_foregroundColor = aColor;
	}
	/*MokaArray*/ this.paragraphs = function(){
		
	}
	/*void*/ this.setParagraphs = function(){
		
	}
	/*MokaArray*/ this.words = function(){
		
	}
	/*void*/ this.setWords = function(){
		
	}
	
	//Generating data
	/*MokaString*/ this.HTMLFromRangeWithDocumentAttributes = function(aRange,documentAttributeString){
		
	}
	
}