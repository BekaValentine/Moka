function MokaCoder(){
	this.extend(MokaObject);
	
	/*	Encoded Items	*/
	var _encodedItems = new Array;
	var _encodingTarget = null;
	var _decodingOrdinal = 0;
	
	/*	Delegate	*/
	var _delegate = null;
	
	
	
	
	
	
	
	/*id*/ this.delegate = function(){
		return _delegate;
	}
	/*void*/ this.setDelegate = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_delegate = anObject;
	}
		
	//Accessing the encoded items
	/*JSArray*/ this._encodedItems = function(){
		return _encodedItems;
	}
	/*void*/ this._setEncodedItems = function(arr){
		if( arr == undefined ){ return; }
		if( typeof(arr) != "array" ){ return; }
		
		_encodedItems = arr;
	}
		
	//Testing the coder
	/*bool*/ this.containsValueForKey = function(aKey){
		if( aKey == undefined ){ return NO; }
		if( typeof(aKey.isKindOfClass) != "function" ){ return NO; }
		if( !aKey.isKindOfClass(MokaString) ){ return NO; }
		
		for( var i in _encodedItems ){
			if( _encodedItems[i].key.isEqualToString(aKey) ){
				return YES;
			}
		}
		return NO;
	}
	
	//Encoding data
	/*void*/ this.encodeJSArrayWithCountStartingAtIndexForKey = function(aJSArray,aCount,anIndex,key){
		if( aJSArray == undefined ){ return; }
		if( aCount == undefined ){ return; }
		if( !MokaNumberIsInt(aCount) ){ return; }
		if( aCount < 0 ){ return; }
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		if( anIndex < 0 ){ return; }
		if( key == undefined ){ return; }
		if( typeof(key.isKindOfClass) != "function" ){ return; }
		if( !key.isKindOfClass(class_name) ){ return; }
		
		if( _encodingTarget ){
		
			//test to see if it's already encoded
			for( var i in _encodedItems ){
				if( _encodedItems[i].original == aJSArray ){ return; }
			}
		
			if( aJSArray instanceof Array && typeof(anObject.encodeWithCoder) != "function" ){
				var oldEncodingTarget = _encodingTarget;
				var newEncodingTarget = {
					id: _encodedItems.length,
					original: aJSArray,
					type: "JSArray",
					className: null,
					isReferenced: YES,
					isConditional: NO,
					isRootItem: NO,
					subItems: new Array
				}
				_encodedItems.push(newEncodingTarget);
				_encodingTarget.subItems.push({
					key: key,
					type: "JSArray *",
					value: newEncodingTarget.id
				});
				_encodingTarget = newEncodingTarget;
				for( var i = anIndex; i < anIndex+aCount && i < aJSArray.length; i++ ){
					if( i in aJSArray ){
						this.encodeItemForKey(aJSArray[i],$s(i+""));
					}
				}
				_encodingTarget = oldEncodingTarget;
			}
		}
	}
	/*void*/ this.encodeJSObjectForKey = function(aJSObject,aKey){
		if( aJSObject == undefined ){ return; }
		if( aKey == undefined ){ return; }
		if( typeof(aKey.isKindOfClass) != "function" ){ return; }
		if( !aKey.isKindOfClass(MokaString) ){ return; }
		
		if( _encodingTarget ){
		
			//test to see if it's already encoded
			for( var i in _encodedItems ){
				if( _encodedItems[i].original == aJSObject ){ return; }
			}
		
			if( aJSOject instanceof Object && !(aJSObject instanceof Array) && typeof(anObject.encodeWithCoder) != "function" ){
				var oldEncodingTarget = _encodingTarget;
				var newEncodingTarget = {
					id: _encodedItems.length,
					original: aJSObject,
					type: "JSObject",
					className: null,
					isReferenced: YES,
					isConditional: NO,
					isRootItem: NO,
					subItems: new Array
				}
				_encodedItems.push(newEncodingTarget);
				_encodingTarget.subItems.push({
					key: aKey,
					type: "JSObject *",
					value: newEncodingTarget.id
				});
				_encodingTarget = newEncodingTarget;
				for( var i in aJSObject ){
					this.encodeItemForKey(aJSObject[i],$s(i+""));
				}
				_encodingTarget = oldEncodingTarget;
			}
		}
	}
	/*void*/ this.encodeStringForKey = function(aJSString,aKey){
		if( aJSString == undefined ){ return; }
		if( typeof(aJSString) != "string" ){ return; }
		if( aKey == undefined ){ return; }
		if( typeof(aKey.isKindOfClass) != "function" ){ return; }
		if( !aKey.isKindOfClass(MokaString) ){ return; }
		
		
		if( _encodingTarget ){
			_encodingTarget.subItems.push({
				key: aKey,
				type: "string",
				value: aJSString
			});
		}
	}	
	/*void*/ this.encodeBoolForKey = function(yn,key){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		if( key == undefined ){ return; }
		if( typeof(key.isKindOfClass) != "function" ){ return; }
		if( !key.isKindOfClass(MokaString) ){ return; }
		
		if(_encodingTarget ){
			_encodingTarget.subItems.push({
				key: key,
				type: "bool",
				value: yn
			});
		}
	}
	/*void*/ this.encodeObjectForKey = function(anObject,key){
		if( anObject ){
			if( typeof(anObject.isKindOfClass) != "function" ){ return; }
			if( typeof(anObject.encodeWithCoder) != "function" ){ return; }
		}
		if( key == undefined ){ return; }
		if( typeof(key.isKindOfClass) != "function" ){ return; }
		if( !key.isKindOfClass(MokaString) ){ return; }
		
		if(_encodingTarget ){
		
			//test to see if it's already encoded
			for( var i in _encodedItems ){
				if( anObject && _encodedItems[i].original == anObject ){
					_encodedItems[i].isReferenced = YES;
					_encodingTarget.subItems.push(_encodedItems[i]);
					return;
				}
			}
			
			if( anObject ){
			 	var className = anObject.constructor + "";
				className = className.substring(9,className.length);
				var indexOfSpace = className.indexOf(" ");
				className = className.substring(0,(indexOfSpace == -1 ? className.length : indexOfSpace));
			
			
				var oldEncodingTarget = _encodingTarget;
				var newEncodingTarget = {
					id: _encodedItems.length,
					original: anObject,
					type: ( anObject ? "Object" : "null" ),
					className: className,
					isReferenced: YES,
					isConditional: NO,
					isRootItem: NO,
					subItems: new Array
				}
				_encodedItems.push(newEncodingTarget);
				_encodingTarget.subItems.push({
					key: key,
					type: "Object *",
					value: newEncodingTarget.id
				});
				_encodingTarget = newEncodingTarget;
				anObject.encodeWithCoder(this);
				_encodingTarget = oldEncodingTarget;
			} else {
				_encodingTarget.subItems.push({
					key: key,
					type: "null",
					value: null
				});
			}
		}
	}
	/*void*/ this.encodeConditionalObjectForKey = function(anObject,key){
		if( anObject ){
			if( typeof(anObject.isKindOfClass) != "function" ){ return; }
			if( typeof(anObject.encodeWithCoder) != "function" ){ return; }
		}
		if( key == undefined ){ return; }
		if( typeof(key.isKindOfClass) != "function" ){ return; }
		if( !key.isKindOfClass(MokaString) ){ return; }
		
		if(_encodingTarget ){
			//test to see if it's already encoded
			for( var i in _encodedItems ){
				if( anObject && _encodedItems[i].original == anObject ){
					_encodingTarget.subItems.push(_encodedItems[i]);
					return;
				}
			}

			if( anObject ){
			 	var className = anObject.constructor + "";
				className = className.substring(9,className.length);
				var indexOfSpace = className.indexOf(" ");
				className = className.substring(0,(indexOfSpace == -1 ? className.length : indexOfSpace));
		

				var oldEncodingTarget = _encodingTarget;
				var newEncodingTarget = {
					id: _encodedItems.length,
					original: anObject,
					type: ( anObject ? "Object" : "null" ),
					className: className,
					isReferenced: NO,
					isConditional: YES,
					isRootItem: NO,
					subItems: new Array
				}
				_encodedItems.push(newEncodingTarget);
				_encodingTarget.subItems.push({
					key: key,
					type: "Object *",
					value: newEncodingTarget.id
				});
				_encodingTarget = newEncodingTarget;
				anObject.encodeWithCoder(this);
				_encodingTarget = oldEncodingTarget;
			} else {
				_encodingTarget.subItems.push({
					key: key,
					type: "null",
					value: null
				});
			}
		}
	}
	/*void*/ this.encodeNumberForKey = function(aNumber,aKey){
		if( aNumber == undefined ){ return; }
		if( !MokaNumberIsFloat(aNumber) ){ return; }
		
		if( key == undefined ){ return; }
		if( typeof(key.isKindOfClass) != "function" ){ return; }
		if( !key.isKindOfClass(MokaString) ){ return; }
				
		if(_encodingTarget ){
			_encodingTarget.subItems.push({
				key: key,
				type: "number",
				value: aNumber
			});
		}
	}
	/*void*/ this.encodeRootObject = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		if( typeof(anObject.encodeWithCoder) != "function" ){ return; }

		//test to see if it's already encoded
		for( var i in _encodedItems ){
			if( _encodedItems[i].isRootItem ){
				return;
			}
		}
		var className = anObject.constructor + "";
			className = className.substring(9,className.length);
			var indexOfSpace = className.indexOf(" ");
			className = className.substring(0,(indexOfSpace == -1 ? className.length : indexOfSpace));

		var newEncodingTarget = {
			id: _encodedItems.length,
			original: anObject,
			type: "Object",
			className: className,
			isReferenced: YES,
			isConditional: NO,
			isRootItem: YES,
			subItems: new Array
		}
		_encodedItems.push(newEncodingTarget);
		_encodingTarget = newEncodingTarget;
		anObject.encodeWithCoder(this);
	}
	
	//Decoding data
	/*array*/ this.decodeJSArrayForKey = function(key){
		if( key == undefined ){ return new Array; }
		if( typeof(key.isKindOfClass) != "function" ){ return new Array; }
		if( !key.isKindOfClass(MokaString) ){ return new Array; }
		
		if( !_encodingTarget ){ return null; }
		
		var newArray = new Array;
		
		var newEncodingLevel = null;
		for(var i in _encodingTarget.subItems){
			if( _encodingTarget.subItems[i].key.isEqualToString(aKey) && _encodingTarget.subItems[i].type == "JSArray *" ){
				for( var m in _encodedItems ){
					if( _encodedItems[m].id == _encodingTarget.subItems[i].id ){
						newEncodingLevel = _encodedItems[m];
						break;
					}
				}
				break;
			}
		}
		if( newEncodingLevel ){
			var oldEncodingLevel = _encodingLevel;
			_encodingLevel = newEncodingLevel;
			for( var i in newEncodingLevel.subItems ){
				newArray[newEncodingLevel.subItems[i].key.characters()] = this.decodeItemForKey(itemToDecode.subItems[i].key);
			}
			_encodingLevel = oldEncodingLevel;
		}
		
		return newArray;
	}
	/*object*/ this.decodeJSObjectForKey = function(aKey){
		if( aKey == undefined ){ return new Object; }
		if( typeof(aKey.isKindOfClass) != "function" ){ return new Object; }
		if( !aKey.isKindOfClass(MokaString) ){ return new Object; }
		
		if( !_encodingTarget ){ return null; }
		
		var newObject = new Object;
		
		var itemToDecode = null;
		for(var i in _encodingTarget.subItems){
			if( _encodingTarget.subItems[i].key.isEqualToString(aKey) && _encodingTarget.subItems[i].type == "JSObject *" ){
				for( var m in _encodedItems ){
					if( _encodedItems[m].id == _encodingTarget.subItems[i].id ){
						newEncodingLevel = _encodedItems[m];
						break;
					}
				}
				break;
			}
		}
		if( itemToDecode ){
			var oldEncodingTarget = _encodingTarget;
			_encodingTarget = itemToDecode;
			for( var i in itemToDecode.subItems ){
				newObject[itemToDecode.subItems[i].key.characters()] = this.decodeItemForKey(itemToDecode.subItems[i].key);
			}
			_encodingTarget = oldEncodingTarget;
		}
		return newObject;
	}
	/*string*/ this.decodeStringForKey = function(aKey){
		if( aKey == undefined ){ return ""; }
		if( typeof(aKey.isKindOfClass) != "function" ){ return ""; }
		if( !aKey.isKindOfClass(MokaString) ){ return ""; }
		
		if( !_encodingTarget ){ return ""; }
		
		for(var i in _encodingTarget.subItems){
			if( _encodingTarget.subItems[i].key.isEqualToString(aKey) && _encodingTarget.subItems[i].type == "string" ){
				return _encodingTarget.subItems[i].value + "";
			}
		}
		return "";
	}
	/*bool*/ this.decodeBoolForKey = function(key){
		if( key == undefined ){ return NO; }
		if( typeof(key.isKindOfClass) != "function" ){ return NO; }
		if( !key.isKindOfClass(MokaString) ){ return NO; }
		
		if( !_encodingTarget ){ return NO; }
		
		for(var i in _encodingTarget.subItems){
			if( _encodingTarget.subItems[i].key.isEqualToString(aKey) && _encodingTarget.subItems[i].type == "bool" ){
				return _encodingTarget.subItems[i].value == "true";
			}
		}
		return false;
	}
	/*id*/ this.decodeObjectForKey = function(key){
		if( key == undefined ){ return null; }
		if( typeof(key.isKindOfClass) != "function" ){ return null; }
		if( !key.isKindOfClass(MokaString) ){ return null; }
		
		var newEncodingTarget = null;
		for(var i in _encodingTarget.subItems){
			if( _encodingTarget.subItems[i].key.isEqualToString(aKey) ){
				if( _encodingTarget.subItems[i].type == "Object *" ){
					for( var m in _encodedItems ){
						if( _encodedItems[m].id == _encodingTarget.subItems[i].id ){
							newEncodingLevel = _encodedItems[m];
							break;
						}
					}
					break;
				} else {
					return null;
				}
			}
		}
		if( newEncodingTarget ){
			var theClass = eval(newEncodingTarget.className);
			if( theClass ){
				var oldEncodingTarget = _encodingTarget;
				_encodingTarget = newEncodingTarget;
				var theObject = theClass.make();
				if( theObject.respondsToSelector($sel("initWithCoder")) ){
					theObject.initWithCoder(this);
				}
				_encodingTarget = oldEncodingTarget;
				return theObject;
			}
		}
		return null;
	}
	/*number*/ this.decodeNumberForKey = function(aKey){
		if( aKey == undefined ){ return 0; }
		if( typeof(aKey.isKindOfClass) != "function" ){ return 0; }
		if( !aKey.isKindOfClass(MokaString) ){ return 0; }
		
		if( !_encodingTarget ){ return 0; }
		
		for(var i in _encodingTarget.subItems){
			if( _encodingTarget.subItems[i].key.isEqualToString(aKey) && _encodingTarget.subItems[i].type == "number" ){
				return _encodingTarget.subItems[i].value*1;
			}
		}
		return 0;
	}
	/*id*/ this.decodeRootObject = function(){
		for( var m in _encodedItems ){
			if( m.isRootObject ){
				return this.decodeObjectForKey(m.key);
			}
		}
	}
	
}