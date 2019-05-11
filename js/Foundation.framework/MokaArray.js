function MokaArray(){
	this.extend( MokaObject );
	
	var _items = [];
	var _allowedTypes = [];
	

	
	
	
	
	
	//Comparison
	/*-1,0,1*/ this["<=>"] = function(arr){
		if( is(arr,MokaArray) ){
			for( var i = 0; i < this.count() && i < arr.count(); i++ ){
				
				if( !is(this.objectAtIndex(i)) && !is(arr.objectAtIndex(i)) ){
					continue;
				} else if( !is(this.objectAtIndex(i)) ){
					return -1;
				} else if( !is(arr.objectAtIndex(i)) ){
					return 1;
				}
				
				var t = (this.objectAtIndex(i))["<=>"](arr.objectAtIndex(i));
				if( t != 0 ){ return t; }
			}
			
			if( this.count() != arr.count() ){ return (this.count())["<=>"](arr.count()); }
			
			return 0;
		} else {
			return (this.supers())["<=>"](arr);
		}
	}
	/*id*/ this.firstObjectCommonWithArray = function(anArray){
		if( !is(anArray,MokaArray) ){ return; }
		
		for( var i = 0; i < this.count() && i < anArray.count(); i++ ){
			var a = this.objectAtIndex(i);
			var b = anArray.objectAtIndex(i);
			
			if( is(a,MokaObject) && is(b,MokaObject) && a.isEqual(b) ){ return a; }
			else if( !is(a,MokaObject) && !is(b,MokaObject) && (a)["=="](b) ){ return a; }
		}
		return null;
	}
	/*bool*/ this.isEqualToArray = function(anArray){
		if( !is(anArray,MokaArray) ){ return NO; }
		for( var i = 0; i < this.count() && i < anArray.count(); i++ ){
			var a = this.objectAtIndex(i);
			var b = anArray.objectAtIndex(i);
			
			if( is(a,MokaObject) && is(b,MokaObject) ){
				if( !a.isEqual(b) ){ return NO; }
			} else if( (a)["!="](b) ){ return NO; }
		}
		return YES;
	}
		
	//Copying
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.addObjectsFromArray(this);
		
		return copy;
	}
	
	//Querying the array
	/*bool*/ this.containsObject = function( anObject ){
		for( var index = 0; index < this.count(); index++ ){
			if( this.objectAtIndex(index) == anObject ){
				return true;
			}
		}
		return false;
	}
	/*bool*/ this.containsObjectEqualTo = function(anObject){
		for( var index = 0; index < this.count(); index++ ){
			var o = this.objectAtIndex(index);
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
	/*int*/ this.count = function(){
		return _items.length;
	}
	/*id*/ this.objectAtIndex = function( anIndex ){
		
		if( !MokaNumberIsInt(anIndex) ){
			return;
		}
		
		if( anIndex >= 0 && anIndex < this.count() && _items[anIndex] ){ return _items[anIndex]; }

		return null;
	}
	/*int*/ this.indexOfObject = function( anObject ){
		for( var index = 0; index < this.count(); index++ ){
			if( this.objectAtIndex(index) == anObject ){
				return index;
				break;
			}
		}
	}
	/*id*/ this.lastObject = function(){
		return this.objectAtIndex( this.count()-1 );
	}
	/*MokaEnumerator*/ this.objectEnumerator = function(){
		return MokaEnumerator.enumeratorWithArray(this);
	}
	/*MokaEnumerator*/ this.reverseObjectEnumerator = function(){
		return MokaEnumerator.enumeratorWithArray(this.reverse());
	}
		
	//Setting, Adding, and replacing objects
	/*void*/ this.setObject = function( anObject ){
		this.removeAllObjects();
		this.addObject(anObject);
		
	}
	/*void*/ this.setObjects = function( anArrayOfObjects ){
		if( typeof(anArrayOfObjects.isKindOfClass) != "function" ){
			return;
		}

		if( !anArrayOfObjects.isKindOfClass(MokaArray) ){
			return;
		}

		this.removeAllObjects();
		this.addObjectsFromArray( anArrayOfObjects );
	}
	/*void*/ this.addObject = function( anObject ){
		
		var t = this.allowedTypes();
		var invalidType = ( t.count() ? YES : NO );
		for( var i = 0; i < t.count(); i++ ){
			if( (typeof(t.objectAtIndex(i)) == "string" && t.objectAtIndex(i) == typeof(anObject))
			||	(typeof(t.objectAtIndex(i)) == "function" && (	(typeof(anObject.isKindOfClass) == "function" && anObject.isKindOfClass(t.objectAtIndex(i)))
			 													||	anObject instanceof t.objectAtIndex(i) ) )){
				invalidType = NO;
				break;
			}
		}
		if( invalidType ){ return; }
		
		_items.push( anObject );
	}
	/*void*/ this.addObjectsFromArray = function( anArrayOfObjects ){
		if( !is(anArrayOfObjects,MokaArray) ){ return; }
		
		for( var index = 0; index < anArrayOfObjects.count(); index++ ){
			this.addObject( anArrayOfObjects.objectAtIndex(index) );
		}
	}
	/*void*/ this.insertObjectAtIndex = function( anObject, anIndex ){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		if( anIndex < 0 ){ anIndex = 0; }
		if( anIndex >= this.count() ){ anIndex = this.count(); }
		
		var t = this.allowedTypes();
		var invalidType = ( t.count() ? YES : NO );
		for( var i = 0; i < t.count(); i++ ){
			if( (typeof(t.objectAtIndex(i)) == "string" && t.objectAtIndex(i) == typeof(anObject))
			||	(typeof(t.objectAtIndex(i)) == "function" && (	(typeof(anObject.isKindOfClass) == "function" && anObject.isKindOfClass(t.objectAtIndex(i)))
			 													||	anObject instanceof t.objectAtIndex(i) ) )){
				invalidType = NO;
				break;
			}
		}
		if( invalidType ){ return; }
		
		for( var i = this.count(); i > anIndex; i-- ){
			_items[i] = _items[i-1];
		}
		_items[anIndex] = anObject;
		
		/*if( anIndex < 0 ){ anIndex = 0; }
		if( anIndex > this.count() ){ anIndex = this.count(); }
		
	
		var newItems = new MokaArray;
		if( anIndex > 0 ){
			newItems.addObjectsFromArray( this.objectsFromIndexToIndex(0, anIndex-1) );
		}
		newItems.addObject( anObject );
		if( anIndex < this.count() ){
			newItems.addObjectsFromArray( this.objectsFromIndexToIndex(anIndex,this.count()-1) );
		}
	
		this.removeAllObjects();
		this.addObjectsFromArray( newItems );
		delete( newItems );*/

	}
	/*void*/ this.insertObjectsAtIndexes = function( anArrayOfObjects, anArrayOfIndexes ){
		
		if( typeof(anArrayOfObjects.isKindOfClass) != "function" ){
			return;
		}
		
		if( !anArrayOfObjects.isKindOfClass(MokaArray) ){
			return;
		}
		
		if( typeof(anArrayOfIndexes.isKindOfClass) != "function" ){
			return;
		}
		
		if( !anArrayOfIndexes.isKindOfClass(MokaArray) ){
			return;
		}
		
		var newObjects = new MokaArray;
		
		if( anArrayOfObjects.count() == anArrayOfIndexes.count() ){
			for( var index = 0; index < this.count(); index++ ){
				if( anArrayOfIndexes.containsObject(index) ){
					newObjects.addObject( anArrayOfObjects.objectAtIndex( anArrayOfIndexes.objectAtIndex(index) ) );
				}
				newObjects.addObject( this.objectAtIndex(index) );
			}
		}
		
		this.setObjects( newObjects );
	}
	/*void*/ this.replaceObjectAtIndexWithObject = function( anIndex, anObject ){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		var t = this.allowedTypes();
		var invalidType = ( t.count() ? YES : NO );
		for( var i = 0; i < t.count(); i++ ){
			if( (typeof(t.objectAtIndex(i)) == "string" && t.objectAtIndex(i) == typeof(anObject))
			||	(typeof(t.objectAtIndex(i)) == "function" && (	(typeof(anObject.isKindOfClass) == "function" && anObject.isKindOfClass(t.objectAtIndex(i)))
			 													||	anObject instanceof t.objectAtIndex(i) ) )){
				invalidType = NO;
				break;
			}
		}
		if( invalidType ){ return; }
		
		if( this.count() > anIndex ){
			_items[anIndex] = anObject;
		}
	}
	
	//Deleting objects
	/*void*/ this.removeObject = function( anObject ){
		this.removeObjectAtIndex( this.indexOfObject(anObject) );			
	}
	/*void*/ this.removeObjectAtIndex = function( anIndex ){
		
		if( !MokaNumberIsInt(anIndex) ){
			return;
		}
		
		
		for( var i = anIndex; i < this.count() - 1; i++ ){
			_items[i] = _items[i+1];
		}
		_items.pop();
		
		/*
		if( this.count() > anIndex && anIndex >= 0 ){
			
			var newObjects = new MokaArray;
			
			if( anIndex > 0 ){
				newObjects.addObjectsFromArray( this.objectsFromIndexToIndex( 0, anIndex-1 ) );
			}
			if( anIndex < this.count()-1 ){
				newObjects.addObjectsFromArray( this.objectsFromIndexToIndex( anIndex+1, this.count()-1 ) );
			}
			
			this.removeAllObjects();
			this.addObjectsFromArray( newObjects );
			
		}
		*/
	}
	/*void*/ this.removeObjectsAtIndexes = function( anArrayOfNumbers ){
		
		if( typeof(anArrayOfNumbers.isKindOfClass) != "function" ){
			return;
		}
		
		if( !anArrayOfNumbers.isKindOfClass(MokaArray) ){
			return;
		}
		
		var newObjects = new MokaArray;
		
		for( var index = 0; index < this.count(); index++ ){
			if( !anIndex.containsObject(index) ){
				newObjects.addObject( this.objectAtIndex(index) );
			}
		}
		
		this.removeAllObjects();
		this.addObjectsFromArray( newObjects );
	}
	/*void*/ this.removeObjectsAtIndexesBetween = function( firstIndex, lastIndex ){
		
		if( !MokaNumberIsInt(firstIndex) || !MokaNumberIsInt(lastIndex) ){
			return;
		}
		
		if( firstIndex >= 0 && firstIndex < this.count() && lastIndex >= 0 && lastIndex < this.count() ){
			
			if( firstIndex > lastIndex ){
				var copyOfLastIndex = lastIndex;
				lastIndex = firstIndex;
				firstIndex = copyOfLastIndex;
			}
			
			var newObjects = new MokaArray;
			
			if( firstIndex > 0 ){
				newObjects.addObjectsFromArray( this.objectsFromIndexToIndex( 0, firstIndex-1 ) );
			}
			if( lastIndex < this.count()-1 ){
				newObjects.addObjectsFromArray( this.objectsFromIndexToIndex( lastIndex+1, this.count()-1 ) );
			}
			
			this.removeAllObjects();
			this.addObjectsFromArray( newObjects );
		}
	}
	/*void*/ this.removeObjectsInArray = function( anArrayOfObjects ){
		
		if( typeof(anArrayOfObjects.isKindOfClass) != "function" ){
			return;
		}
		
		if( !anArrayOfObjects.isKindOfClass(MokaArray) ){
			return;
		}
		
		var newObjects = new MokaArray;
		
		for( var index = 0; index < this.count(); index++ ){
			if( !anArrayOfObjects.containsObject(index) ){ newObjects.addObject( this.objectAtIndex(index) ); }
		}
		
		this.removeAllObjects();
		this.addObjectsFromArray( newObjects );
	}
	/*void*/ this.removeLastObject = function(){
		_items.pop();
	}
	/*void*/ this.removeAllObjects = function(){
		_items = new Array();
	}
	
	//Rearranging objects
	/*void*/ this.exchangeObjectAtIndexWithObjectAtIndex = function( firstIndex, secondIndex ){
		
		if( !MokaNumberIsInt(firstIndex) || !MokaNumberIsInt(secondIndex) ){
			return;
		}
		
		if( firstIndex < this.count() && secondIndex < this.count() ){
			
			var newFirst = this.objectAtIndex(secondIndex);
			var newSecond = this.objectAtIndex(firstIndex);
			
			this.replaceObjectAtIndexWithObject( firstIndex, newFirst );
			this.replaceObjectAtIndexWithObject( secondIndex, newSecond );
			
		}
	}
	
	//Deriving new arrays
	/*MokaArray*/ this.arrayByAddingObject = function(o){
		var a = this.copy();
		a.addObject(o);
		return a;
	}
	/*MokaArray*/ this.arrayByAddingObjectsFromArray = function(arr){
		var a = this.copy();
		return a.addObjectsFromArray(arr);
	}
	/*MokaArray*/ this.filteredArrayUsingPredicate = function(predicate){
		//currently unimplemented
	}
	/*MokaArray*/ this.filteredArrayUsingFunction = function(fun){
		if( !is(fun,Function) ){ return this.copy(); }
		
		var results = MokaArray.make().init();
		
		for( var i = 0; i < this.count(); i++ ){
			var o = this.objectAtIndex(i);
			if( fun(o) ){ results.addObject(o); }
		}
		
		return results;
	}
	/*MokaArray*/ this.filteredArrayUsingSelectorAndCompareValue = function(sel,comp){
		if( !is(sel,MokaSelector) || !is(comp) ){ return this.copy(); }
		
		var results = MokaArray.make().init();
		
		for( var i = 0; i < this.count(); i++ ){
			var o = this.objectAtIndex(i);
			if( typeof(o[sel.selectorName()]) == "function" && (o)[selectorName()](comp) ){ results.addObject(o); }
		}
		
		return results;
	}
	/*MokaArray*/ this.subarrayWithRange = function(aRange){
		if( !is(aRange,MokaRange) ){ return this.copy(); }
		
		var a = MokaArray.make().init();
		for( var i = aRange.location(); i < aRange.location() + aRange.length(); i++ ){
			a.addObject(this.objectAtIndex(i));
		}
		return a;
	}
	/*MokaArray*/ this.objectsAtIndexes = function( anArrayOfNumbers ){
		var returnObjects = new MokaArray;
		for( var index = 0; index < anArrayOfNumbers.count(); index++ ){
			if( this.objectAtIndex( anArrayOfNumbers.objectAtIndex(index) ) ){
				returnObjects.addObject( this.objectAtIndex( anArrayOfNumbers.objectAtIndex(index) ) );
			}
		}
		return returnObjects;
	}
	/*MokaArray*/ this.objectsFromIndexToIndex = function( fromIndex, toIndex ){
		return this.subarrayWithRange($r(fromIndex,toIndex));
	}
	/*MokaArray*/ this.allValuesForProperty = function(aPropertyName){
		if( aPropertyName == undefined ){ return MokaArray.make().init(); }
		if( typeof(aPropertyName) != "string" ){ return MokaArray.make().init(); }
		
		var values = MokaArray.make().init();
		for( var i = 0; i < this.count(); i++ ){
			var o = this.objectAtIndex(i);
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
			var o = this.objectAtIndex(i);
			if( typeof(o.respondsToSelector) == "function" && o.respondsToSelector($sel(aMethodName)) ){
				values.addObject(o[aMethodName]());
			}
		}
		return values;
	}
	/*MokaArray*/ this.allIndexesOfObject = function( anObject ){
		var indexes = new MokaArray;
		for( var index = 0; index < this.count(); index++ ){
			if( this.objectAtIndex(index) == anObject ){
				indexes.addObject( index );
			}
		}
		return indexes;
	}
	
	//Sorting
	/*MokaArray*/ this.sortedArrayUsingFunctionWithContext = function(comparatorFunction,context){
		if( !is(comparatorFunction,Function) ){ return this.copy(); }
		
		if( this.count() <= 1 ){ return this.copy(); }		
		
		var less = MokaArray.make().init();
		var greater = MokaArray.make().init();
		var pivotList = MokaArray.make().init();
		var pivot = this.objectAtIndex(0);
		
		for( var i = 1; i < this.count(); i++ ){
			var o = this.objectAtIndex(i);
			var compare = comparatorFunction(o,pivot,context);
			if( compare == MokaOrderedAscending ){ less.addObject(o); }
			else if( compare == MokaOrderedSame ){ pivotList.addObject(o); }
			else { greater.addObject(o); }
		}
		
		less = less.sortedArrayUsingFunctionWithContext(comparatorFunction,context);
		greater = greater.sortedArrayUsingFunctionWithContext(comparatorFunction,context);
		return less.arrayByAddingObjectsFromArray(pivotList).arrayByAddingObjectsFromArray(greater);
	}
	/*MokaArray*/ this.sortedArrayUsingDescriptors = function(descriptors){
		if( !is(descriptors,MokaArray) ){ return this; }
		
		
	}
	/*MokaArray*/ this.sortedArrayUsingSelector = function(sel){
		//sel works if the item is a jade class a responds to selector, or otherwise if not a jade class and has a corresponding method
		if( !is(sel,MokaSelector) ){ return this.copy(); }
		
		if( this.count() <= 1 ){ return this.copy(); }		
		
		var less = MokaArray.make().init();
		var greater = MokaArray.make().init();
		var pivotList = MokaArray.make().init();
		var pivot = this.objectAtIndex(0);
		
		for( var i = 1; i < this.count(); i++ ){
			var o = this.objectAtIndex(i);
			var compare = ( is(o[sel.selectorName()],Function) ? o[sel.selectorName()](pivot) : -1 );
			if( compare == MokaOrderedAscending ){ less.addObject(o); }
			else if( compare == MokaOrderedSame ){ pivotList.addObject(o); }
			else { greater.addObject(o); }
		}
		
		less = less.sortedArrayUsingSelector(sel);
		greater = greater.sortedArrayUsingSelector(sel);
		return less.arrayByAddingObjectsFromArray(pivotList).arrayByAddingObjectsFromArray(greater);
	}
		
	//Flattening, uniques, and reversing
	/*MokaArray*/ this.flatten = function(){
		var newObjects = new MokaArray;
		for( var i = 0; i < this.count(); i++ ){
			var o = this.objectAtIndex(i);
			if( typeof(o.isKindOfClass) == undefined ){
				newObjects.addObject(o);
			} else {
				if( o.isKindOfClass(MokaArray) ){
					newObjects.addObjectsFromArray( o.flatten() );
				} else if( o.isKindOfClass(MokaDictionary) || o.isKindOfClass(MokaSet) ){
					newObjects.addObjectsFromArray( o.flatten().allObjects() );
				} else {
					newObjects.addObject(o);
				}
			}
		}
		return newObjects;
	}
	/*MokaArray*/ this.unique = function(){
		var uniqueObjects = new MokaArray;
		for( var i = 0; i < this.count(); i++ ){
			var o = this.objectAtIndex(o);
			if( !uniqueObjects.containsObject(o) ){ uniqueObjects.addObject(o); }
		}
		return uniqueObjects;
	}
	/*MokaArray*/ this.reverse = function(){
		var reverseArray = new MokaArray;
		for( var i = this.count() - 1, o = this.objectAtIndex(i); i >= 0; i++ ){
			reverseArray.addObject(o);
		}
		return reverseArray;
	}
	
	//Restricting types
	/*MokaArray*/ this.allowedTypes = function(){
		return MokaArray.arrayWithObjects(_allowedTypes);
	}
	/*void*/ this.setAllowedTypes = function(){
		_allowedTypes = [];
		
		var types = arguments;
		
		if( arguments.length == 1 && arguments[0] instanceof Array ){ types = arguments[0]; }
		
		for( var i = 0; i < types.length; i++ ){
			if( typeof(types[i]) != "function" && typeof(types[i]) != "string" ){ continue; }
			_allowedTypes.push(types[i]);
		}
	}
	/*void*/ this.addAllowedType = function(aType){
		if( typeof(aType) != "function" && typeof(aType) != "string" ){ return; }
		for( var i = 0; i < _allowedTypes.length; i++ ){
			if( _allowedTypes[i] == aType ){ return; }
		}
		_allowedTypes.push(aType);
	}
	/*void*/ this.removeAllowedType = function(aType){
		if( typeof(aType) != "function" && typeof(aType) != "string" ){ return; }
		var removeTheseIndexes = [];
		for( var i = 0; i < _allowedTypes.length; i++ ){
			if( _allowedTypes[i] == aType ){ removeTheseIndexes.push(i); }
		}
		for( var i = 0; i < removeTheseIndexes.length; i++ ){
			delete _allowedTypes[ removeTheseIndexes[i] ];
		}
	}
	
	//Iterate over each element in the array
	/*void*/ this.each = function( aFunction ){
		if( typeof(aFunction) != "function" ){
			return;
		}
		
		var thisCount = this.count()
		for( var i = 0; i < thisCount; i++ ){
			var value = this.objectAtIndex(i);
			aFunction( value );
		}
		
		return;
	}
	/*MokaArray*/ this.map = function(aFunction){
		if( typeof(aFunction) != "function" ){
			return;
		}
		
		var newArray = new MokaArray;
		
		this.each(function(x){
			
			newArray.addObject( aFunction( x ) );
			
		});
		
		return newArray;
		
	}
	/*MokaArray*/ this.mapOver = function(aFunction){
		if( typeof(aFunction) != "function" ){
			return;
		}
		
		this.setObjects( this.map(aFunction) );
		
		return this;
		
	}
	/*number or string*/ this.inject = function(){
		var aggregate = 0;
		if( arguments.length == 1 ){
			if( typeof(arguments[0]) != "function" ){ return; }
			for( var i = 0; i < this.length; i++ ){
				if( typeof(this.objectAtIndex(i)) != "number"){ aggregate = ""; }
			}
			for( var i = 0; i < this.length; i++ ){
				aggregate = arguments[0](aggregate,this.objectAtIndex(i));
			}
		} else {
			if( typeof(arguments[1]) != "function" ){ return; }
			aggregate = arguments[0];
			for( var i = 0; i < this.length; i++ ){
				aggregate = arguments[1](aggregate,this.objectAtIndex(i));
			}
		}
		return aggregate;
	}
	
	//Joining an array of strings into a string
	/*MokaString*/ this.joinComponentsWithString = function(aString){
		if( aString == undefined ){ return $s(""); }
		if( typeof(aString.isKindOfClass) != "function" ){ return $s(""); }
		if( !aString.isKindOfClass(MokaString) ){ return $s(""); }
		

		var newString = $s("");

		for( var i = 0; i < this.count(); i++ ){
			var value = this.objectAtIndex(i);
			
			if( value == undefined ){ return $s(""); }
			if( typeof(value.isKindOfClass) != "function" ){ return $s(""); }
			if( !value.isKindOfClass(MokaString) ){ return $s(""); }
			
			newString.appendString( aString );
			newString.appendString( value );
			
		}
		
		return newString;
		
	}
	/*string*/ this.join = function(joinString){
		joinString = joinString || "";
		
		var s = "";
		for( var i = 0; i < this.count(); i++ ){
			s += ( i == 0 ? "" : joinString ) + this.objectAtIndex(i);
		}
		return s;
	}
	
	/*string*/ this.toString = function(){
		var s = this.description() + "[";
		
		for( var i = 0; i < this.count(); i++ ){
			s += ( i == 0 ? " " : ", " ) + this.objectAtIndex(i);
		}
		
		return s + " ]";
	}
	
	//Rest
	/*id*/ this.rest = function(){
		return this.objectsFromIndexToIndex(1,this.count()-1);
	}
	
		
	//Key-value coding: getting values
	/*MokaArray*/ this.valueForKey = function(aKeyString){
		if( aKeyString == undefined ){ return; }
		if( typeof(aKeyString.isKindOfClass) != "function" ){ return; }
		if( !aKeyString.isKindOfClass(MokaString) ){ return; }
		
		var valueArray = new MokaArray;
		for( var i = 0; i < this.count(); i++ ){
			var o = this.objectAtIndex(i);
			if( is(o,MokaObject) ){
				valueArray.addObject( o.valueForKey(aKeyString) );
			}
		}
		return valueArray;
	}
	/*id*/ this.valueForKeyPath = function(aKeyPath){
		if( aKeyPath == undefined ){ return; }
		if( typeof(aKeyPath.isKindOfClass) != "function" ){ return; }
		if( !aKeyPath.isKindOfClass(MokaString) ){ return; }
		
		var valueArray = new MokaArray;
		for( var i = 0; i < this.count(); i++ ){
			var o = this.objectAtIndex(i);
			if( is(o,MokaObject) ){
				valueArray.addObject( o.valueForKeyPath(aKeyPath) );
			}
		}
		return valueArray;
	}
	/*MokaDictionary*/ this.dictionaryWithValuesForKeys = function(anArrayOfKeys){
		if( anArrayOfKeys == undefined ){ return; }
		if( typeof(anArrayOfKeys.isKindOfClass) != "function" ){ return; }
		if( !anArrayOfKeys.isKindOfClass(MokaArray) ){ return; }
		
		var dict = new MokaDictionary;
		for( var i = 0; i < anArrayOfKeys.count(); i++ ){
			if( anArrayOfKeys.objectAtIndex(i).isKindOfClass(MokaString) ){
				for( var m = 0; m < this.count(); m++ ){
					dict.setObjectForKey( this.objectAtIndex(m).valueForKey(anArrayOfKeys.objectAtIndex(i)), anArrayOfKeys.objectAtIndex(i) );
				}
			}
		}
		return dict;
	}
	
	//Key-value coding: setting values
	/*void*/ this.setValueForKey = function(aValue,aKeyString){
		if( aValue == undefined ){ return; }
		
		if( aKeyString == undefined ){ return; }
		if( typeof(aKeyString.isKindOfClass) != "function" ){ return; }
		if( !aKeyString.isKindOfClass(MokaString) ){ return; }
		
		for( var i = 0; i < this.count(); i++ ){
			this.objectAtIndex(i).setValueForKey(aValue,aKeyString);
		}
	}
	/*void*/ this.setValueForKeyPath = function(aValue,aKeyPath){
		if( aValue == undefined ){ return; }
		
		if( aKeyPath == undefined ){ return; }
		if( typeof(aKeyPath.isKindOfClass) != "function" ){ return; }
		if( !aKeyPath.isKindOfClass(MokaString) ){ return; }
		
		for( var i = 0; i < this.count(); i++ ){
			this.objectAtIndex(i).valueForKeyPath(aValue,aKeyPath);
		}
	}
	/*void*/ this.setValuesForKeysWithDictionary = function(aDictionary){
		if( aDictionary == undefined ){ return; }
		if( typeof(aDictionary.isKindOfClass) != "function" ){ return; }
		if( !aDictionary.isKindOfClass(MokaDictionary) ){ return; }
		
		for( var i = 0; i < this.count(); i++ ){
			this.objectAtIndex(i).setValueForKeysWithDictionary(aDictionary);
		}
	}
	
}

//Creating arrays
/*MokaArray*/ MokaArray.arrayWithArray = function(anArrayOfObjects){
	if( anArrayOfObjects == undefined ){ return; }
	if( typeof(anArrayOfObjects.isKindOfClass) != "function" ){ return; }
	if( !anArrayOfObjects.isKindOfClass(MokaArray) ){ return; }
	
	
	var newArray = this.make().init();
	newArray.addObjectsFromArray( anArrayOfObjects );
	return newArray;
}
/*MokaArray*/ MokaArray.arrayWithObject = function(anObject){
	var newArray = this.make().init();
	newArray.addObject(anObject);
	return newArray;
}
/*MokaArray*/ MokaArray.arrayWithObjects = function(){
	
	var newArray = this.make().init();
	
	var items = arguments;
	
	if( arguments.length == 1 && arguments[0] instanceof Array ){
		items = arguments[0]
	}
	
	for( var i = 0; i < items.length; i++ ){
		newArray.addObject(items[i]);
	}

	
	return newArray;
}
/*MokaArray*/ MokaArray.of = function(){
	var arr = this.make().init();
	
	if( arguments.length == 0 ){ return arr; }
	
	arr.setAllowedTypes(arguments);
	
	return arr;
}


//Convenience methods
function $arr(){
	return MokaArray.arrayWithObjects(arguments);
}