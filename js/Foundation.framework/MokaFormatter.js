function MokaFormatter(){
	this.extend(MokaObject);
	
	//Textual representations
	/*MokaString*/ this.stringValueForObjectValue = function(anObject){
		return $s("");
	}
	/*MokaAttributedString*/ this.attributedStringForObjectValueWithDefaultAttributes = function(anObject,attributes){
		var s = MokaAttributedString.make();
		
		if( attributes == undefined ){ return s.init(); }
		if( typeof(attributes.isKindOfClass) != "function" ){ return s.init(); }
		if( !attributes.isKindOfClass(MokaDictionary) ){ return s.init(); }
		
		return s.initWithStringAndAttributes($s(""),attributes);
	}
	/*MokaString*/ this.editingStringForObjectValue = function(anObject){
		return this.stringValueForObjectValue(anObject);
	}
	
	//Object equivalent to textual representations
	/*bool*/ this.getObjectValueForStringWithErrorDescription = function(jsarr,aString,errorString){
		var errors = "";
		
		if( typeof(jsarr.constructor) != "array" ){ errors += "Needs a JS array as the first argument." }
		else if( jsarr.length ){ errors += "The JS array pased in must not contain any elements."}
		
		if( aString == undefined ){ errors += (errors.length ? " " : "" ) + "Needs a MokaString to convert from."; }
		if( typeof(aString.isKindOfClass) != "function" ){ errors += (errors.length ? " " : "" ) + "Needs a MokaString to convert from."; }
		if( !aString.isKindOfClass(MokaString) ){ errors += (errors.length ? " " : "" ) + "Needs a MokaString to convert from."; }
		
		if( errors.length ){
			if(	errorString != undefined
			&&	typeof(errorString.isKindOfClass) == "function"
			&&	errorString.isKindOfClass(MokaString) ){
				errorString.setCharacters(errors);
			}
			return NO;
		}
		
		jsarr.push(null);
		
		return YES
	}
	
	//Dynamic editing
	/*bool*/ this.isPartialStringValidWithNewEditingStringAndErrorDescription = function(partialString, newString, error){
		var errors = NO;
		
		if( partialString == undefined ){ errors = YES; }
		if( typeof(partialString.isKindOfClass) != "function" ){ errors = YES; }
		if( !partialString.isKindOfClass(MokaString) ){ errors = YES; }
		if( newString == undefined ){ errors = YES; }
		if( typeof(newString.isKindOfClass) != "function" ){ errors = YES; }
		if( !newString.isKindOfClass(MokaString) ){ errors = YES; }
		
		if( errors ){
			if(	error != undefined 
			&&	typeof(error.isKindOfClass) == "function"
			&&	error.isKindOfClass(MokaString)	){
				error.setCharacters("All arguments must be MokaStrings.")
			}
			return NO;
		}
				
		return YES;
		
	}
	/*bool*/ this.isPartialStringSelectedStringValid = function(partialString,proposedSelectedRange,originalString,originalSelectedRange,errorDescription){
		var errors = "";
		
		if( partialString == undefined ){ errors += "Needs a MokaString as the first argument."; }
		if( typeof(partialString.isKindOfClass) != "function" ){ errors += "Needs a MokaString as the first argument."; }
		if( !partialString.isKindOfClass(MokaString) ){ errors += "Needs a MokaString as the first argument."; }
		if( proposedSelectedRange == undefined ){ errors += (errors.length ? " " : "" ) + "Needs a MokaRange as the third argument."; }
		if( typeof(proposedSelectedRange.isKindOfClass) != "function" ){ errors += (errors.length ? " " : "" ) + "Needs a MokaRange as the third argument."; }
		if( !proposedSelectedRange.isKindOfClass(MokaRange) ){ errors += (errors.length ? " " : "" ) + "Needs a MokaRange as the third argument."; }
		if( originalString == undefined ){ errors += (errors.length ? " " : "" ) + "Needs a MokaString as the third argument."; }
		if( typeof(originalString.isKindOfClass) != "function" ){ errors += (errors.length ? " " : "" ) + "Needs a MokaString as the third argument."; }
		if( !originalString.isKindOfClass(MokaString) ){ errors += (errors.length ? " " : "" ) + "Needs a MokaString as the third argument."; }
		if( originalSelectedRange == undefined ){ errors += (errors.length ? " " : "" ) + "Needs a MokaRange as the third argument."; }
		if( typeof(originalSelectedRange.isKindOfClass) != "function" ){ errors += (errors.length ? " " : "" ) + "Needs a MokaRange as the third argument."; }
		if( !originalSelectedRange.isKindOfClass(MokaRange) ){ errors += (errors.length ? " " : "" ) + "Needs a MokaRange as the third argument."; }
		
		if( errors.length ){
			if( errorDescription != undefined
			&&	typeof(errorDescription.isKindOfClass) == "function"
			&&	errorDescription.isKindOfClass(MokaString) ){
				errorDescription.setCharacters(errors);
			}
			return NO;
		}
		
		return YES;
	}
	
	
}