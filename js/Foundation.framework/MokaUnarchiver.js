function MokaUnarchiver(){
	this.extend(MokaCoder);
	
	/*	Class and Object Substitution	*/
	var _classNameMap = MokaDictionary.make().init();
	var _replacementObjects = MokaDictionary.make().init()





	//Unarchiving
	/*void*/ this.unarchiveFromFile = function(aFile){
		if( aFile == undefined ){ return; }
		if( typeof(aFile.isKindOfClass) != "function" ){ return; }
		if( !aFile.isKindOfClass(MokaString) ){ return; }
		
		var contents = aFile.toURL().loadResourceAsynchronously(YES);
				
		if( aFile.hasSuffix($s(".xmlarchive")) ){
			
		} else if( aFile.hasSuffix($s(".jsonarchive")) ){
			
		}
	}

	//Class and Object Substitution
	/*MokaString*/ this.classNameEncodedForTrueClassName = function(trueName){
		if( trueName == undefined ){ return trueName; }
		if( typeof(trueName.isKindOfClass) != "function" ){ return trueName; }
		if( !trueName.isKindOfClass(MokaString) ){ return trueName; }
		
		return _classNameMap.objectForKey(trueName) || this.constructor.classNameEncodedForTrueClassName(trueName) || trueName;
	}
	/*void*/ this.encodeClassNameIntoClassName = function(trueName,archiveName){
		if( trueName == undefined ){ return; }
		if( typeof(trueName.isKindOfClass) != "function" ){ return; }
		if( !trueName.isKindOfClass(MokaString) ){ return; }
		if( archiveName == undefined ){ return; }
		if( typeof(archiveName.isKindOfClass) != "function" ){ return; }
		if( !archiveName.isKindOfClass(MokaString) ){ return; }
		
		_classNameMap.setObjectForKey(archiveName,trueName);
	}
	/*void*/ this.replaceObjectWithObject = function(object,newObject){
		if( object == undefined ){ return; }
		if( typeof(object.isKindOfClass) != "function" ){ return; }
		if( newObject == undefined ){ return; }
		if( typeof(newObject.isKindOfClass) != "function" ){ return; }
		
		_replacementObjects.setObjectForKey(object,newObject);
	}
	
	//Decoding
	/*id*/ this.decodeObjectForKey = function(key){
		if( key == undefined ){ return null; }
		if( typeof(key.isKindOfClass) != "function" ){ return null; }
		if( !key.isKindOfClass(MokaString) ){ return null; }
		
		var decodedObject = this.supers().decodeObjectForKey(key);
		if( _replacementObjects.containsKey(decodedObject) ){
			decodedObject = _replacementObjects.objectForKey(decodedObject);
		}
		return decodedObject;
	}
}
/*id*/ MokaUnarchiver.unarchiveObjectWithFile = function(aFile){
	if( aFile == undefined ){ return null; }
	if( typeof(aFile.isKindOfClass) != "function" ){ return null; }
	if( !aFile.isKindOfClass(MokaString) ){ return null; }
	
	var unarch = this.make().init();
	unarch.unarchiveFromFile(aFile);
	return unarch.rootObject();
}
/*id*/ MokaUnarchiver.unarchiveObjectWithString = function(aString){
	if( aString == undefined ){ return null; }
	if( typeof(aString.isKindOfClass) != "function" ){ return null; }
	if( !aString.isKindOfClass(MokaString) ){ return null; }
	
	var unarch = this.make().init();
	unarch.unarchiveFromString(aString);
	return unarch.rootObject();
}
/*MokaString*/ MokaUnarchiver.classNameEncodedForTrueClassName = function(trueName){
	if( trueName == undefined ){ return trueName; }
	if( typeof(trueName.isKindOfClass) != "function" ){ return trueName; }
	if( !trueName.isKindOfClass(MokaString) ){ return trueName; }
	
	return this.classNameEncodedForTrueClassName(trueName) || trueName;
}
/*void*/ MokaUnarchiver.encodeClassNameIntoClassName = function(trueName,archiveName){
	if( trueName == undefined ){ return; }
	if( typeof(trueName.isKindOfClass) != "function" ){ return; }
	if( !trueName.isKindOfClass(MokaString) ){ return; }
	if( archiveName == undefined ){ return; }
	if( typeof(archiveName.isKindOfClass) != "function" ){ return; }
	if( !archiveName.isKindOfClass(MokaString) ){ return; }
	
	this.classNameMap().setObjectForKey(archiveName,trueName);
}

//Encoded class names
MokaUnarchiver.classNameMap = function(){
	if( !is(this._classNameMap,MokaDictionary) ){
		this._classNameMap = $dict();
	}
	return this._classNameMap;
}