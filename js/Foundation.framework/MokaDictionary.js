function MokaDictionary(){
	this.extend( MokaObject );
	
	var _keys = new MokaArray;
	var _items = new MokaArray;
	
	
	




	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.setDictionary(this);
		
		return copy;
	}
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_keys.init();
		_items.init();
		
		return this;
	}

	//Counting entries
	/*int*/ this.count = function(){
		return _items.count(); 
	}
	
	//Comparison
	/*-1,0,1*/ this["<=>"] = function(o){
		if( is(o,MokaDictionary) ){
			if( this.count() == o.count() ){
				return this.allKeys().isEqual(o.allKeys()) && this.allObjects().isEqual(o.allObjects());
			}
			return (this.count())["<=>"](o.count());
		} else { return (this.supers())["<=>"](o); }
	}
	/*bool*/ this.isEqual = function(o){
		return this["=="](o);
	}
	
	//Accessing keys and values
	/*bool*/ this.containsObject = function(anObject){
		if( anObject == undefined ){ return NO; }
		
		return this.allObjects().containsObject(anObject);
	}
	/*bool*/ this.containsKey = function(aKey){
		if( aKey == undefined ){ return NO; }
		
		return this.allKeys().containsObject(aKey);
	}
	/*bool*/ this.containsObjectEqualTo = function(anObject){
		for( var index = 0; index < this.count(); index++ ){
			var o = this.allObjects().objectAtIndex(index);
			if( is(o,MokaObject) ){
				if( o.isEqualTo(anObject) ){
					return true;
				}
			} else {
				if( o == anObject ){
					return true;
				}
			}
		}
		return false;
	}
	/*bool*/ this.containsKeyEqualTo = function(aKey){
		for( var index = 0; index < this.count(); index++ ){
			var o = this.allKeys().objectAtIndex(index);
			if( is(o,MokaObject) ){
				if( o.isEqualTo(anObject) ){
					return true;
				}
			} else {
				if( o == anObject ){
					return true;
				}
			}
		}
		return false;
	}
	/*MokaArray*/ this.allKeys = function(){
		return _keys.copy();
	}
	/*MokaArray*/ this.allKeysForObject = function(anObject){
		
		var allKeys = new MokaArray;
		var allIndexes = _items.allIndexesOfObject( anObject );
		for( var index = 0; index < allIndexes.count(); index++ ){
			allKeys.addObject( _items.objectAtIndex( allIndexes.objectAtIndex( index ) ) );
		}
		return allKeys;
	}
	/*MokaArray*/ this.allObjects = function(){
		return _items.copy();
	}
	/*id*/ this.objectForKey = function(aKey){
		if( aKey == undefined ){ return; }
		
		var theObject = null;
		for( var index = 0; index < this.count(); index++ ){
			if( aKey == _keys.objectAtIndex(index) ){
				theObject = _items.objectAtIndex(index);
			}
		}
		return theObject;
	}
	/*id*/ this.objectForKeyEqualTo = function(aKey){
		if( !is(aKey) ){ return; }
		
		for( var index = 0; index < this.count(); index++ ){
			var k = this.allKeys().objectAtIndex(i);
			if( is(k,MokaObject) ){
				if( k.isEqualTo(aKey) ){
					return this.objectForKey(k);
				}
			} else if( k == aKey ){
				return this.objectForKey(k);
			}
		}
		return null;
	}
	/*MokaArray*/ this.objectsForKeys = function(aKeyArray){
		if( aKeyArray == undefined ){ return; }
		if( typeof(aKeyArray.isKindOfClass) != "function" ){ return; }
		if( !aKeyArray.isKindOfClass(MokaArray) ){ return; }
		
		var returnObjects = new MokaArray;
		for( var index = 0; index < aKeyArray.count(); index++ ){
			returnObjects.addObject( this.objectForKey( aKeyArray.objectAtIndex(index) ) );
		}
		return returnObjects;
	}
	/*MokaArray*/ this.objectsForKeysEqualTo = function(aKeyArray){
		if( aKeyArray == undefined ){ return; }
		if( typeof(aKeyArray.isKindOfClass) != "function" ){ return; }
		if( !aKeyArray.isKindOfClass(MokaArray) ){ return; }
		
		var returnObjects = new MokaArray;
		for( var index = 0; index < aKeyArray.count(); index++ ){
			returnObjects.addObject( this.objectForKeyEqualTo( aKeyArray.objectAtIndex(index) ) );
		}
		return returnObjects;
	}
	/*MokaArray*/ this.allValuesForProperty = function(aPropertyName){
		if( aPropertyName == undefined ){ return MokaArray.make().init(); }
		if( typeof(aPropertyName) != "string" ){ return MokaArray.make().init(); }
		
		var values = MokaArray.make().init();
		for( var i = 0; i < this.count(); i++ ){
			var o = this.allObjects().objectAtIndex(i);
			if( o[aPropertyName] ){
				values.addObject(o[aPropertyName]);
			}
		}
		return values;
	}
	/*MokaArray*/ this.allValuesForMethod = function(aMethodName){
		if( aMethodName == undefined ){ return MokaArray.make().init(); }
		if( typeof(aMethodName) != "string" ){ return MokaArray.make().init(); }
		
		var values = MokaArray.make().init();
		for( var i = 0; i < this.count(); i++ ){
			var o = this.allObjects().objectAtIndex(i);
			if( typeof(o.respondsToSelector) == "function" && o.respondsToSelector($sel(aMethodName)) ){
				values.addObject(o[aMethodName]());
			}
		}
		return values;
	}
	/*MokaEnumerator*/ this.objectEnumerator = function(){
		return MokaEnumerator.enumeratorWithArray(_items);
	}
	/*MokaEnumerator*/ this.keyEnumerator = function(){
		return MokaEnumerator.enumeratorWithArray(_keys);
	}
	
	//Setting, Adding, and removing entries
	/*void*/ this.setDictionary = function(aDictionary){
		if( typeof(aDictionary.isKindOfClass) != "function" ){
			return;
		}

		if( !aDictionary.isKindOfClass(MokaDictionary) ){
			return;
		}

		this.removeAllObjects();
		this.addEntriesFromDictionary(aDictionary);
	}
	/*void*/ this.addEntriesFromDictionary = function( aDictionary ){
		
		if( typeof(aDictionary.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aDictionary.isKindOfClass(MokaDictionary) ){
			return;
		}
		
		for( var index = 0; index < aDictionary.count(); index++ ){
			this.setObjectForKey( aDictionary.allObjects().objectAtIndex(index), aDictionary.allKeys().objectAtIndex(index) );
		}
	}
	/*void*/ this.removeObject = function(anObject){
		this.removeObjectsForKeys(this.allKeysForObject(anObject));
	}
	/*void*/ this.removeAllObjects = function(){
		_keys.removeAllObjects();
		_items.removeAllObjects();
	}
	/*void*/ this.removeObjectForKey = function( aKey ){
		if( aKey == undefined ){ return; }
		
		
		var index = _keys.indexOfObject( aKey );
		_keys.removeObjectAtIndex( index );
		_items.removeObjectAtIndex( index );
	}
	/*void*/ this.removeObjectsForKeys = function( anArrayOfKeys ){
		
		if( typeof(anArrayOfKeys.isKindOfClass) != "function" ){
			return;
		}
		
		if( !anArrayOfKeys.isKindOfClass(MokaArray) ){
			return;
		}
		
		for( var index = 0; index < anArrayOfKeys.count(); index++ ){
			this.removeObjectForKey( anArrayOfKeys.objectAtIndex(index) );
		}
	}
	/*void*/ this.setObjectForKey = function( anObject, aKey ){
		if( anObject == undefined ){ return; }
		if( aKey == undefined ){ return; }
		
		if( _keys.containsObject(aKey) ){
			_items.replaceObjectAtIndexWithObject( _keys.indexOfObject(aKey), anObject );
		} else {
			_keys.addObject( aKey );
			_items.addObject( anObject );
		}
	}
	/*void*/ this.setObjectsForKeys = function( anArrayOfObjects, anArrayOfKeys ){
		if( anArrayOfObjects == undefined ){ return; }
		if( typeof(anArrayOfObjects.isKindOfClass) != "function" ){ return; }
		if( !anArrayOfObjects.isKindOfClass(MokaArray) ){ return; }
		if( anArrayOfKeys == undefined ){ return; }
		if( typeof(anArrayOfKeys.isKindOfClass) != "function" ){ return; }
		if( !anArrayOfKeys.isKindOfClass(MokaArray) ){ return; }
				
		if( anArrayOfObjects.count() != anArrayOfKeys.count() ){
			return;
		}
		
		for( var index = 0; index < anArrayOfObjects.count(); index++ ){
			this.setObjectForKey( anArrayOfObjects.objectAtIndex(index), anArrayOfKeys.objectAtIndex(index) );
		}
	}

	//Iterate over each element in the dictionary
	/*void*/ this.each = function(aFunction){
		if( typeof(aFunction) != "function" ){
			return;
		}
		
		var thisCount = this.count()
		for( var i = 0; i < thisCount; i++ ){
			var key = _keys.objectAtIndex(i);
			var value = _items.objectAtIndex(i);
			
			aFunction( key, value );
			
		}
		
		return;
	}
	/*MokaDictionary*/ this.map = function(aFunction){
		if( typeof(aFunction) != "function" ){
			return;
		}
		
		var newDictionary = new MokaDictionary;
		
		this.each(function(key,value){
			
			newDictionary.setObjectForKey( aFunction(key,value), key );
			
		});
		
		return newDictionary;
		
	}
	/*MokaDictionary*/ this.mapOver = function(aFunction){
		if( typeof(aFunction) != "function" ){
			return;
		}
		
		this.setDictionary( this.map(aFunction) );
		
		return this;
	}
	
	//Flattening and uniques
	/*MokaDictionary*/ this.flatten = function(){
		var newObjects = new MokaDictionary;
		for( var i = 0; i < this.count(); i++ ){
			var k = _keys.objectAtIndex(i);
			var o = _items.objectAtIndex(i);
			if( typeof(o.isKindOfClass) == undefined ){
				newObjects.setObjectForKey(o,k);
			} else {
				if( o.isKindOfClass(MokaDictionary) ){
					newObjects.addEntriesFromDictionary( o );
				} else {
					newObjects.setObjectForKey(o,k);
				}
			}
		}
		return newObjects;	
	}
	/*MokaDictionary*/ this.unique = function(){
		return this.allObjects().unique();
	}
	
	/*string*/ this.toString = function(){
		var s = this.description()+"[";
		
		for( var i = 0; i < this.count(); i++ ){
			s += ( i == 0 ? " " : ", " ) + this.allKeys().objectAtIndex(i) + " => " + this.allObjects().objectAtIndex(i);
		}
		
		return s + " ]";
	}
	
}

//Creating dictionaries
/*MokaDictionary*/ MokaDictionary.dictionaryWithDictionary = function(aDictionary){
	if( aDictionary == undefined ){ return; }
	if( typeof(aDictionary.isKindOfClass) != "function" ){ return new MokaDictionary; }
	if( !aDictionary.isKindOfClass(MokaDictionary) ){ return new MokaDictionary; }

	var newDict = new this;
	newDict.setDictionary(aDictionary);
	return newDict;
}
/*MokaDictionary*/ MokaDictionary.dictionaryWithObjectForKey = function(anObject,aKey){
	if( anObject == undefined ){ return; }
	if( aKey == undefined ){ return; }
	
	
	var newDict = new this;
	newDict.setObjectForKey(anObject,aKey);
	return newDict;
}
/*MokaDictionary*/ MokaDictionary.dictionaryWithObjectsForKeys = function(anArrayOfObjects,anArrayOfKeys){
	if( anArrayOfObjects == undefined ){ return; }
	if( typeof(anArrayOfObjects.isKindOfClass) != "function" ){ return; }
	if( !anArrayOfObjects.isKindOfClass(MokaArray) ){ return; }
	if( anArrayOfKeys == undefined ){ return; }
	if( typeof(anArrayOfKeys.isKindOfClass) != "function" ){ return; }
	if( !anArrayOfKeys.isKindOfClass(MokaArray) ){ return; }
	
	
	var newDict = new this;
	newDict.setObjectsForKeys(anArrayOfObjects,anArrayOfKeys);
	return newDict;
}

function $dict(){
	var d = MokaDictionary.make().init();
	
	for( var i = 0; i < arguments.length; i += 2 ){
		if( arguments[i+1] ){
			d.setObjectForKey(arguments[i+1],arguments[i]);
		}
	}
	
	return d;
}