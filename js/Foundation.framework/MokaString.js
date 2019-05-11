function MokaString(chars){
	this.extend(MokaObject);
	
	/*	Characters	*/
	var _characters = "";
	if( typeof(chars) == "string" ){ _characters = chars; }
	
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.initWithCharacters(this.characters());
		
		return copy;
	}
	
	//Initializing
	/*id*/ this.initWithCharacters = function(chars){
		this.supers().init();
		
		if( chars == undefined ){ return this; }
		if( typeof(chars) != "string" ){ return this; }
		
		_characters = chars;
		
		return this;
	}
	
	
	//Getting the strings length
	/*int*/ this.length = function(){
		return _characters.length;
	}
	
	//Accessing characters
	/*string*/ this.characters = function(){
		return _characters;
	}	
	/*string*/ this.characterAtIndex = function( anIndex ){
		
		if( !MokaNumberIsInt(anIndex) ){
			return;
		}
		
		return _characters.charAt(anIndex);
	}
	/*string*/ this.toString = function(){
		return this.characters();
	}
	
	//Combining strings
	/*MokaString*/ this.stringByAppendingString = function( aString ){
		
		var newString = this.copy();
		newString.appendString(aString);
		return newString;
		
	}
	/*MokaString*/ this.stringByReplacingAllMatches = function(aDict){
		var newString = this.copy();
		newString.replaceAllMatches(aDict);
		return newString;
	}
	
	//Dividing strings
	/*MokaArray*/ this.componentsSeparatedByString = function( aString ){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
				
		var substrings = new MokaArray;
		var substrs = this.characters().split( aString.characters() );
		
		if( substrs.constructor == Array ){
			for( var i = 0; i < substrs.length; i++ ){
				substrings.addObject( $s(substrs[i]) );
			}
		} else {
			substrings.addObject( $s(substrs) );
		}
		
		return substrings;
		
	}
	/*MokaArray*/ this.split = function(regex){
		if( !(regex instanceof RegExp) ){ return MokaArray.make().init(); }
		var items = this.characters().split(regex);
		
		var parts = MokaArray.make().init();
		for( var i = 0; i < items.length; i++ ){
			parts.addObject($s(items[i]));
		}
		return parts;
	}	
	/*MokaString*/ this.stringByTrimmingCharactersInSet = function( aCharacterSet ){
		if( !is(aCharacterSet,MokaCharacterSet) ){ return this; }
			
		//from both ends, test successive characters to see if they're in the char set.
		//if so, set the the beginning and ending indexes for the substring without them
		
		var first = 0;
		for( var i = 0; i < this.length(); i++ ){
			if( !aCharacterSet.characterIsMember(this.characterAtIndex(i)) ){ break; }
			first++;
		}
		
		var last = this.length() - 1;
		for( var i = this.length() - 1; i >= 0; i-- ){
			if( !aCharacterSet.characterIsMember(this.characterAtIndex(i)) ){ break; }
			last--;
		}
		
		return this.substringWithRange($r(first,last));
		
	}
	/*MokaString*/ this.substringFromIndex = function( anIndex ){
		
		if( !MokaNumberIsInt(anIndex) ){
			return;
		}
		
		var range = new MokaRange( anIndex, this.length() - range.location() );
		
		return this.substringWithRange(range);
		
	}
	/*MokaString*/ this.substringToIndex = function( anIndex ){
		
		if( !MokaNumberIsInt(anIndex) ){
			return;
		}
		
		var range = new MokaRange( 0, anIndex );
		
		return this.substringWithRange(range);
		
	}
	/*MokaString*/ this.substringWithRange = function( aRange ){
		
		if( typeof(aRange.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aRange.isKindOfClass(MokaRange) ){
			return;
		}
		
		if( aRange.first() < 0 ){
			aRange.setFirst(0);
		}
		if( aRange.last() > this.length() - 1 ){
			aRange.setLast(this.length() - 1);
		}
		
		return MokaString.stringWithCharacters( this.characters().substr(aRange.location(), aRange.length()) );
		
	}
	
	//Finding characters and substrings
	/*MokaRange*/ this.rangeOfCharacterFromSet = function( aCharacterSet ){
		return this.rangeOfCharacterFromSetWithOptions(aCharacterSet,0);
	}
	/*MokaRange*/ this.rangeOfCharacterFromSetWithOptions = function( aCharacterSet, options ){
		return this.rangeOfCharacterFromSetWithOptionsInRange( aCharacterSet, options, new MokaRange(0,this.length()) );
	}
	/*MokaRange*/ this.rangeOfCharacterFromSetWithOptionsInRange = function( aCharacterSet, options, aRange ){
		
	}
	/*MokaRange*/ this.rangeOfString = function( aString ){
		return this.rangeOfStringWithOptions(aString,0);		
	}
	/*MokaRange*/ this.rangeOfStringWithOptions = function( aString, options ){
		return this.rangeOfStringWithOptionsInRange( aString, options, new MokaRange(0,this.length()) );
	}
	/*MokaRange*/ this.rangeOfStringWithOptionsInRange = function(aString, options, aRange){
		
	}
	
	//Determining Line and Paragraph ranges
	/*
		Line characters: \n, \r, \r\n, \u2028
		Paragraph characters: \n, \r, \r\n, \u2029 
	*/
	/*{}*/ this.getLineStartEndContentsEndForRange = function(start,end,contentsEnd,range){
		var r = {};
		
		if( !is(range,MokaRange) ){ return r; }
		
		if( is(start,Boolean) ){
			
			r.lineStart = start;
		}
		
		if( is(end,Boolean) ){
			
			r.lineEnd = end;
		}
		
		if( is(contentsEnd,Boolean) ){
			
			r.contentsEnd = contentsEnd;
		}
		
		return r;
	}
	/*MokaRange*/ this.lineRangeForRange = function(aRange){
		if( !is(aRange,MokaRange) ){ return $r(0,0); }
		
	}
	/*{}*/ this.getParagraphStartEndContentsEndForRange = function(start,end,contentsEnd,range){
		var r = {};
		
		if( !is(range,MokaRange) ){ return r; }
		
		if( is(start,Boolean) ){
			
			r.lineStart = start;
		}
		
		if( is(end,Boolean) ){
			
			r.lineEnd = end;
		}
		
		if( is(contentsEnd,Boolean) ){
			
			r.contentsEnd = contentsEnd;
		}
		
		return r;
	}
	/*MokaRange*/ this.paragraphRangeForRange = function(aRange){
		if( !is(aRange,MokaRange) ){ return $r(0,0); }
		
	}
		
	//Identifying and comparing string
	/*-1,0,1*/ this["<=>"] = function(o){
		if( is(o,MokaString) ){
			return this.compareWithOptions(o,MokaLiteralSearch);
		}
		return (this.supers())["<=>"](o);
	}	
	/*MokaComparisonResult*/ this.caseInsensitiveCompare = function( aString ){
	
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		
		
	}
	/*MokaComparisonResult*/ this.compare = function( aString ){
	
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		
		
	}
	/*MokaComparisonResult*/ this.compareWithOptions = function( aString, comparisonOptions ){
		
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		
		
	}
	/*MokaComparisonResult*/ this.compareWithOptionsInRange = function( aString, comparisonOptions, aRange ){
		
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		if( typeof(aRange.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aRange.isKindOfClass(MokaRange) ){
			return;
		}
		
		
		
	}
	/*bool*/ this.hasPrefix = function( aString ){
		if( !is(aString,MokaString) ){ return NO; }
		
		var realPrefix = this.substringToIndex( aString.length() );
		
		return aString.isEqualToString(realPrefix);
	}
	/*bool*/ this.hasSuffix = function( aString ){
		if( !is(aString,MokaString) ){ return NO; }
		
		var realSuffix = this.substringFromIndex( this.length() - aString.length() );
		
		return aString.isEqualToString(realSuffix);
	}
	/*bool*/ this.isEqualTo = function(anObject){
		if( !is(anObject,MokaString) ){ return NO; }
		return this.isEqualToString(anObject);
	}
	/*bool*/ this.isEqualToString = function( aString ){
		
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		return (this.characters() == aString.characters());
		
	}
	
	//Getting a shared prefix
	/*MokaString*/ this.commonPrefixWithStringWithOptions = function( aString, comparisonOptions ){
		
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		
		
	}
	
	//Changing case
	/*MokaString*/ this.capitalizedString = function(){
		var newJSString = this.characterAtIndex(0).toUpperCase();
		
		for( var i = 1; i < this.length(); i++ ){
			if( MokaCharacterSet.whitespaceAndNewLineCharacterSet().characterIsMember(this.characterAtIndex(i-1)) ){
				newJSString += this.characterAtIndex(i).toUpperCase();
			} else {
				newJSString += this.characterAtIndex(i);
			}
		}
		
		return $s(newJSString);	
	}
	/*MokaString*/ this.lowercaseString = function(){
		return $s( this.characters().toLowerCase() );
	}
	/*MokaString*/ this.uppercaseString = function(){
		return MokaString.stringWithCharacters( this.characters().toUpperCase() );
	}
	
	//Getting numeric values
	/*number*/ this.numberValue = function(){
		return parseInt(this.characters());
	}
	
	//Working with paths
	/*MokaArray*/ this.pathComponents = function(){
		var components = this.componentsSeparatedByString( MokaString.stringWithCharacters("/") );
		components.removeObjectAtIndex(0);
		return components;
	}
	/*bool*/ this.isAbsolutePath = function(){
		return this.characterAtIndex(0) == "/" || this.characterAtIndex(0) == "~";
	}
	/*MokaString*/ this.lastPathComponent = function(){
		var components = this.pathComponents();
		return components.objectAtIndex( components.count()-1 );
	}
	/*MokaString*/ this.pathExtension = function(){
		var lastComponent = this.lastPathComponent();
		var lastComponentParts = lastComponent.componentsSeparatedByString( MokaString.stringWithCharacters(".") );
		return lastComponentParts.objectAtIndex(lastComponentParts.count()-1);
	}
	/*MokaString*/ this.stringByAppendingPathComponent = function( aString ){
	
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		return MokaString.stringWithCharacters(this.characters()+"/"+aString.characters());
		
	}
	/*MokaString*/ this.stringByAppendingPathExtension = function( aString ){
		
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		return MokaString.stringWithCharacters(this.characters()+"."+aString.characters());
		
	}
	/*MokaString*/ this.stringByDeletingLastPathComponent = function(){
		var components = this.pathComponents();
		components.removeLastObject();
		
		var newPath = new MokaString;
		return newPath.stringByAppendingPaths(components);
	}
	/*MokaString*/ this.stringByDeletingPathExtension = function(){
		var components = this.pathComponents();
		var lastComponent = components.objectAtIndex( components.count()-1 );
		
		var lastComponentParts = lastComponent.componentsSeparatedByString( MokaString.stringWithCharacters(".") );
		
		components.removeLastObject();
		lastComponentParts.removeLastObject();
		
		var newLastComponent = MokaString.stringByJoiningComponentsWithString( lastComponentParts, MokaString.stringWithCharacters(".") );

		components.addObject( newLastComponent );
		
		var newString = MokaString.stringWithCharacters("/");
		newString.appendString( MokaString.stringByJoiningComponentsWithString( components, MokaString.stringWithCharacters("/") ) );
		return newString;
		
	}
	/*MokaString*/ this.stringByStandardizingPath = function(){
		
	}
	/*MokaString*/ this.stringByAppendingPaths = function( anArrayOfPaths ){
		
		if( typeof(anArrayOfPaths.isKindOfClass) != "function" ){
			return;
		}
		
		if( !anArrayOfPaths.isKindOfClass(MokaArray) ){
			return;
		}
		
		var newPath = MokaString.stringWithString( this );
		newPath.appendPaths(anArrayOfPaths);
		return newPath;

		
	}
		
	//Reversing
	/*MokaString*/ this.reverse = function(){
		return $s( this.characters().reverse() );
	}
	
	
	//Modifying a string
	/*void*/ this.appendString = function( aString ){
		
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		_characters += aString.characters();
		
	}
	/*void*/ this.deleteCharacterAtIndex = function( anIndex ){
		
		if( !MokaNumberIsInt(anIndex) ){
			return;
		}
			
		var holdingString = new MokaString;
		holdingString.appendString( this.substringToIndex(anIndex) );
		holdingString.appendString( this.substringFromIndex(anIndex+1) );
		this.setString( holdingString );
		
		
	}
	/*void*/ this.deleteCharactersInRange = function( aRange ){
		
		if( typeof(aRange.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aRange.isKindOfClass(MokaRange) ){
			return;
		}
		
		var holdingString = new MokaString;
		holdingString.appendString( this.substringToIndex(aRange.location()) );
		holdingString.appendString( this.substringFromIndex(aRange.location()+aRange.length()+1) );
		this.setString(holdingString);
		
	}
	/*void*/ this.insertStringAtIndex = function( aString, anIndex ){
		
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		if( !MokaNumberIsInt(anIndex) ){
			return;
		}
		
		var holdingString = new MokaString;
		holdingString.appendString( this.substringToIndex(anIndex) );
		holdingString.appendString( aString );
		holdingString.appendString( this.substringFromIndex(anIndex+1) );
		this.setString(holdingString);
		
	}
	/*void*/ this.replaceCharactersInRangeWithString = function( aRange, aString ){
		
		if( typeof(aRange.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aRange.isKindOfClass(MokaRange) ){
			return;
		}
		
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		if( aRange.first() < 0 ){ aRange.setFirst(0); }
		if( aRange.last() > this.length() - 1){ aRange.setLast(this.length() - 1); }
		
		var holdingString = $s("");
		
		holdingString.appendString( this.substringToIndex(aRange.first()) );
		holdingString.appendString( aString );
		holdingString.appendString( this.substringFromIndex(aRange.last()+1) );
		
		this.setString(holdingString);
		
	}
	/*void*/ this.replaceOccurancesOfStringWithStringWithOptionsInRange = function( searchString, replaceString, options, aRange ){
		
		if( typeof(searchString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !searchString.isKindOfClass(MokaString) ){
			return;
		}
		
		if( typeof(replaceString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !replaceString.isKindOfClass(MokaString) ){
			return;
		}
		
		if( typeof(aRange.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aRange.isKindOfClass(MokaRange) ){
			return;
		}	
		
		
		
	}
	/*void*/ this.replaceAllMatchingStrings = function(aDict){
		if( aDict == undefined ){ return; }
		if( typeof(aDict.isKindOfClass) != "function" ){ return; }
		if( !aDict.isKindOfClass(MokaDictionary) ){ return; }
		
		var replaceStrings = aDict.allKeys();
		var sr = new MokaRange(0,this.length());
		for( var i = 0; i < replaceStrings.count(); i++ ){
			this.replaceOccurancesOfStringWithStringWithOptionsInRange(	replaceStrings.objectAtIndex(i),
																		aDict.objectForKey(replaceStrings.objectAtIndex(i)),
																		0,
																		sr);
		}
	}
	/*void*/ this.replaceAllMatches = function(aDict){
		if( !is(aDict,MokaDictionary) ){ return; }
		
		var replaceString = this.characters();
		
		for( var i = 0; i < aDict.count; i++ ){
			var match = aDict.allKeys().objectAtIndex(i);
			var replacement = aDict.objectForKey(match);
			if( is(replacement,MokaString) ){ replacement = replacement.characters(); }
			if( !is(replacement,String) ){ continue; }
			if( typeof(match) == "string" ){
				while( -1 != returnString.indexOf(match) ){
					replaceString = returnString.replace(match,replacement);
				}
			} else if( match instanceof RegExp ){
				while( -1 != returnString.indexOf(returnString.match(match)) ){
					replaceString = returnString.replace(match,replacement);
				}
			}
		}
		
		this.setString($s(replaceString));
	}
	
	/*void*/ this.setString = function( aString ){
		
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		_characters = aString.characters();
		
	}
	/*void*/ this.appendPathComponent = function( aString ){
		
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aString.isKindOfClass(MokaString) ){
			return;
		}
		
		_characters += "/"+aString.characters();
	}
	/*void*/ this.appendPaths = function( anArrayOfPaths ){
		
		if( typeof(anArrayOfPaths.isKindOfClass) != "function" ){
			return;
		}
		
		if( !anArrayOfPaths.isKindOfClass(MokaArray) ){
			return;
		}
		
		for( var i = 0; i < anArrayOfPaths.count(); i++ ){
			this.appendPathComponent(anArrayOfPaths.objectAtIndex(i));
		}
		
	}
	
	//Converting a string to a URL
	/*MokaURL*/ this.toURL = function(){
		return $url(this.characeters());
	}
	/*MokaURL*/ this.toURLAsDataForURLWithString = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		var theURL = aString.toURL();
		theURL.setResourceData(this);
		return theURL;
	}
	
}

//Creating strings
/*MokaString*/ MokaString.stringWithCharacters = function(characters){
	if( typeof(chars) != "string" ){
		chars = "";
	}
	
	var s = new MokaString(characters);
	s.init();
	return s;
	
}
/*MokaString*/ MokaString.stringWithString = function(aString){
	if( typeof(aString.isKindOfClass) != "function" ){
		return;
	}

	if( !aString.isKindOfClass(MokaString) ){
		return;
	}

	var newString = this.makeAndInit();
	newString.setString(aString);
	return newString;
}
/*MokaString*/ MokaString.stringByJoiningComponentsWithString = function(anArrayOfStrings,aString){

	if( typeof(anArrayOfStrings.isKindOfClass) != "function" ){
		return;
	}
	
	if( !anArrayOfStrings.isKindOfClass(MokaArray) ){
		return;
	}
	
	if( typeof(aString.isKindOfClass) != "function" ){
		return;
	}
	
	if( !aString.isKindOfClass(MokaString) ){
		return;
	}
	
	var newString = this.makeAndInit();
	
	for( var i = 0; i < anArrayOfStrings.count(); i++ ){
		var appendString = anArrayOfStrings.objectAtIndex(i);
		
		if( typeof(appendString.isKindOfClass) != "function" ){
			return;
		}

		if( !appendString.isKindOfClass(MokaString) ){
			return;
		}
		
		newString.appendString( appendString );
		if( i != anArrayOfStrings.count()-1 ){
			newString.appendString( aString );
		}
	}
	
	return newString;
}
/*MokaString*/ MokaString.applicationPath = function(){
	return $s(window.location.substr(0,window.location.lastIndexOf("/")+1));
}

function $s(chars){
	if( typeof(chars) != "string" ){ return; }
	return new MokaString(chars);
}

//Comparison results
MokaOrderedAscending	= -1;
MokaOrderedSame			= 0;
MokaOrderedDescending	= 1;

//Search and comparison options
MokaCaseInsensitiveSearch	= 1 << 0;
MokaLiteralSearch			= 1 << 1;
MokaBackwardsSearch			= 1 << 2;
MokaAnchoredSearch			= 1 << 3;
MokaNumericSearch			= 1 << 6;