function MokaArchiver(){
	this.extend(MokaCoder);

	/*	Class and Object Substitution	*/
	var _classNameMap = MokaDictionary.make().init();
	var _replacementObjects = MokaDictionary.make().init();

	/*	Archiving Data	*/
	var _outputFormat = MokaArchivingJSONFormat;



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

		_replacementObjects.setObjectForKey(newObject,object);
	}

	//Encoding
	/*void*/ this.encodeObjectForKey = function(anObject,key){
		if( anObject ){
			if( typeof(anObject.isKindOfClass) != "function" ){ return; }
			if( typeof(anObject.encodeWithCoder) != "function" ){ return; }
		}
		if( key == undefined ){ return; }
		if( typeof(key.isKindOfClass) != "function" ){ return; }
		if( !key.isKindOfClass(MokaString) ){ return; }


		var objectToEncode = newObject;
		if( _replacementObjects.containsKey(objectToEncode) ){
			objectToEncode = _replacementObjects.objectForKey(objectToEncode);
		}

		this.supers().encodeObjectForKey(objectToEncode,key);
	}
	/*void*/ this.encodeConditionalObjectForKey = function(anObject,key){
		if( anObject ){
			if( typeof(anObject.isKindOfClass) != "function" ){ return; }
			if( typeof(anObject.encodeWithCoder) != "function" ){ return; }
		}
		if( key == undefined ){ return; }
		if( typeof(key.isKindOfClass) != "function" ){ return; }
		if( !key.isKindOfClass(MokaString) ){ return; }

		var objectToEncode = newObject;
		if( _replacementObjects.containsKey(objectToEncode) ){
			objectToEncode = _replacementObjects.objectForKey(objectToEncode);
		}

		this.supers().encodeConditionalObjectForKey(objectToEncode,key);
	}

	//Archiving data
	/*bool*/ this.archiveToFile = function(aFile){
		if( aFile == undefined ){ return NO; }
		if( typeof(aFile.isKindOfClass) != "function" ){ return NO; }
		if( !aFile.isKindOfClass(MokaString) ){ return NO; }

		aFile.toURL().setResourceData( this.archiveToString() );
		return aFile.createResourceAsynchronously(NO);
	}
	/*MokaString*/ this.archiveToString = function(){
		var rootItem = null;
		var encodedItems = this._encodedItems(this);
		for( var i in encodedItems ){
			if(encodedItems[i].isRootItem){
				rootItem = encodedItems[i];
				break;
			}
		}

		var archiveString = $s("");

		if( this.outputFormat() == MokaArchivingJSONFormat ){
			for( var i in encodedItems ){
				var item = encodedItems[i];
				archiveString.appendString(
					$s( ( i == 0 ? "" : "\n" ) + "{\tid:"+item.id+",\n\ttype:"+item.type+",\n\tclassName:"+this.classNameEncodedForTrueClassName($s(item.className))+",\n\tisReferenced:"+item.isReferenced+",\n\tisConditional:"+item.isConditional+",\n\tisRootItem:"+item.isRootItem+",\n\tsubItems:{")
				);
				for( var m in encodedItems.subItems ){
					item = encodedItems.subItems[m];
					archiveString.appendString(
						$s( ( m == 0 ? "" : ",\n" ) + "\t\t{id:"+item.id+",type:"+item.type+",value:"+item.value+"}")
					);
				}
				archiveString.appendString($s("\t}\n}"));
			}
		} else if(  this.outputFormat() == MokaArchivingJSONFormat ){
			for( var i in encodedItems ){
				var item = encodedItems[i];
				archiveString.appendString(
					$s( ( i == 0 ? "" : "\n" ) + "<item id='"+item.id+"' type='"+item.type+"' className='"+this.classNameEncodedForTrueClassName($s(item.className))+"' isReferenced='"+item.isReferenced+"' isConditional='"+item.isConditional+"' isRootItem='"+item.isRootItem+"' >")
				);
				for( var m in encodedItems.subItems ){
					item = encodedItems.subItems[m];
					archiveString.appendString(
						$s( ( m == 0 ? "" : "\n" ) + "\t<item id='"+item.id+"' type='"+item.type+"' value='"+item.value+"' />")
					);
				}
				archiveString.appendString($s("<item>"));
			}
		}

		return archiveString;
	}
	/*MokaArchivingFormat*/ this.outputFormat = function(){
		return _outputFormat;
	}
	/*void*/ this.setOutputFormat = function(aFormat){
		if( aFormat != MokaArchivingJSONFormat && aFormat != MokaArchivingXMLFormat ){ return; }

		_outputFormat = aFormat;
	}

}
/*MokaString*/ MokaArchiver.archiveRootObjectToString = function(anObject){
	if( anObject == undefined ){ return $s(""); }
	if( typeof(anObject.isKindOfClass) != "function" ){ return $s(""); }

	var arch = this.make().init();
	arch.encodeRootObject(anObject);
	return arch.archiveToString();
}
/*bool*/ MokaArchiver.archiveRootObjectToFile = function(anObject,aFile){
	if( anObject == undefined ){ return NO; }
	if( typeof(anObject.isKindOfClass) != "function" ){ return NO; }
	if( aFile == undefined ){ return NO; }
	if( typeof(aFile.isKindOfClass) != "function" ){ return NO; }
	if( !aFile.isKindOfClass(MokaString) ){ return NO; }


	var arch = this.make().init();
	arch.encodeRootObject(anObject);
	return arch.archiveToFile(aFile);
}
/*MokaString*/ MokaArchiver.classNameEncodedForTrueClassName = function(trueName){
	if( trueName == undefined ){ return trueName; }
	if( typeof(trueName.isKindOfClass) != "function" ){ return trueName; }
	if( !trueName.isKindOfClass(MokaString) ){ return trueName; }

	return this.classNameEncodedForTrueClassName(trueName) || trueName;
}
/*void*/ MokaArchiver.encodeClassNameIntoClassName = function(trueName,archiveName){
	if( trueName == undefined ){ return; }
	if( typeof(trueName.isKindOfClass) != "function" ){ return; }
	if( !trueName.isKindOfClass(MokaString) ){ return; }
	if( archiveName == undefined ){ return; }
	if( typeof(archiveName.isKindOfClass) != "function" ){ return; }
	if( !archiveName.isKindOfClass(MokaString) ){ return; }

	this.classNameMap().setObjectForKey(archiveName,trueName);
}

//Encoded class names
MokaArchiver.classNameMap = function(){
	if( !is(this._classNameMap, MokaDictionary) ){
		this._classNameMap = $dict();
	}

	return this._classNameMap;
}


//MokaArchivingFormats
MokaArchivingJSONFormat = 0;
MokaArchivingXMLFormat = 1;
