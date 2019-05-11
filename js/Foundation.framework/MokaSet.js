function MokaSet(){
	this.extend(MokaObject);
	
	//Items
	var _items = new Array;
	
	
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.addSet(this);
		
		return copy;
	}
	
	//Initialization methods
	/*id*/ this.initWithArray = function(anArray){
		this.supers().init();
		
		if( anArray == undefined ){ return this; }
		if( typeof(anArray.isKindOfClass) != "function" ){ return this; }
		if( !anArray.isKindOfClass(MokaArray) ){ return this; }
		
		this.addObjectsFromArray(anArray);
		
		return this;
	}
	/*id*/ this.initWithObject = function(anObject){
		this.supers().init();
		
		if( anObject == undefined ){ return this; }
		
		this.addObject(anObject);
		
		return this;
	}
	/*id*/ this.initWithObjects = function(){
		this.supers().init();
		
		this.addObjects(arguments);
		
		return this;
	}
	/*id*/ this.initWithSet = function(aSet){
		this.supers().init();
		
		if( aSet == undefined ){ return this; }
		if( typeof(aSet.isKindOfClass) != "function" ){ return this; }
		if( !aSet.isKindOfClass(MokaSet) ){ return this; }
		
		this.addSet(aSet);
		
		return this;
	}
	
	//Count
	/*int*/ this.count = function(){
		return _items.length;
	}
	
	//Accessing members
	/*MokaArray*/ this.allObjects = function(){
		var objects = new MokaArray;
		for( var m in _items ){
			objects.addObject(_items[m]);
		}
		return objects;
	}
	/*id*/ this.anyObject = function(){
		for( var m in _items ){
			return _items[m];
		}
	}
	/*bool*/ this.containsObject = function(anObject){
		if( anObject == undefined ){ return NO; }
		
		for( var m in _items ){
			if( anObject == _items[m] ){
				return YES;
			}
		}
		
		return NO
	}
	/*void*/ this.makeObjectsPerformSelector = function(aSelector){
		if( aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		
		for( var m in _items ){
			var o = _items[m];
			if( typeof(o.isKindOfClass) == "function" ){
				o.performSelector(aSelector);
			}			
		}
	}
	/*void*/ this.makeObjectsPerformSelectorWithObject = function(aSelector,anObject){
		if( aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		if( anObject == undefined ){ return; }
		
		for( var m in _items ){
			var o = _items[m];
			if( typeof(o.isKindOfClass) == "function" ){
				if( o.respondsToSelector(aSelector) ){
					o[aSelector.selectorName()](anObject);
				}
			}			
		}
	}
	/*id*/ this.member = function(anObject){
		if( anObject == undefined ){ return null; }
		
		if( this.containsObject(anObject) ){ return anObject; }
		
		return null;
	}
	/*MokaEnumerator*/ this.objectEnumerator = function(){
		return MokaEnumerator.enumeratorWithArray(this.allObjects());
	}
	
	//Comparing sets
	/*bool*/ this.isSubsetOfSet = function(aSet){
		if( aSet == undefined ){ return NO; }
		if( typeof(aSet.isKindOfClass) != "function" ){ return NO; }
		if( !aSet.isKindOfClass(MokaSet) ){ return NO; }
		
		if( this.count() > aSet.count() ){ return NO; }
		
		for( var m in _items ){
			if( !aSet.contains(_items[m]) ){ return NO }
		}
		return YES;
	}
	/*bool*/ this.intersectsSet = function(aSet){
		if( aSet == undefined ){ return NO; }
		if( typeof(aSet.isKindOfClass) != "function" ){ return NO; }
		if( !aSet.isKindOfClass(MokaSet) ){ return NO; }
		
		if( this.count() == 0 && aSet.count() == 0 ){ return YES; }
		
		for( var m in _items ){
			if( aSet.contains(_items[m]) ){ return YES }
		}
		
		return NO;
	}
	/*bool*/ this.isEqualToSet = function(aSet){
		if( aSet == undefined ){ return NO; }
		if( typeof(aSet.isKindOfClass) != "function" ){ return NO; }
		if( !aSet.isKindOfClass(MokaSet) ){ return NO; }
		
		return this.isSubsetOfSet(aSet) && (this.count() == aSet.count());
	}
	
	//Adding and removing entries
	/*void*/ this.addObject = function(anObject){
		if( anObject == undefined ){ return; }
		
		if( this.containsObject(anObject) ){ return; }
		
		_items.push(anObject);
	}
	/*void*/ this.addObjects = function(){
		if( arguments.length == 0 ){ return; }
		
		for( var m in arguments ){
			this.addObject( arguments[m] );
		}
	}
	/*void*/ this.removeObject = function(anObject){
		if( anObject == undefined ){ return; }
		
		for( var m in _items ){
			if( _items[m] == anObject ){
				delete(_items[m]);
				break;
			}
		}
	}
	/*void*/ this.removeObjects = function(){
		if( arguments.length == 0 ){ return; }
		
		for( var m in arguments ){
			this.removeObject( arguments[m] );
		}
	}
	/*void*/ this.removeAllObjects = function(){
		if( anObject == undefined ){ return; }
		
		var allObjects = this.allObjects();
		for( var i = 0; i < allObjects.count(); i++ ){
			this.removeObject(allObjects.objectAtIndex(i));
		}
	}
	/*void*/ this.addObjectsFromArray = function(anArray){
		if( anArray == undefined ){ return; }
		if( typeof(anArray.isKindOfClass) != "function" ){ return; }
		if( !anArray.isKindOfClass(MokaArray) ){ return; }
		
		for( var i = 0; i < anArray.count(); i++ ){
			this.addObject(anArray.objectAtIndex(i));
		}
	}
	/*void*/ this.removeObjectsFromArray = function(anArray){
		if( anArray == undefined ){ return; }
		if( typeof(anArray.isKindOfClass) != "function" ){ return; }
		if( !anArray.isKindOfClass(MokaArray) ){ return; }
		
		for( var i = 0; i < anArray.count(); i++ ){
			this.removeObject(anArray.objectAtIndex(i));
		}
	}
	
	//Combining and recombining sets
	/*void*/ this.addSet = function(aSet){
		if( aSet == undefined ){ return; }
		if( typeof(aSet.isKindOfClass) != "function" ){ return; }
		if( !aSet.isKindOfClass(MokaSet) ){ return; }
		
		this.addObjectsFromArray(aSet.allObjects());
	}
	/*void*/ this.subtractSet = function(aSet){
		if( aSet == undefined ){ return; }
		if( typeof(aSet.isKindOfClass) != "function" ){ return; }
		if( !aSet.isKindOfClass(MokaSet) ){ return; }
		
		this.removeObjectsFromArray(aSet.allObjects());
	}
	/*void*/ this.intersectSet = function(aSet){
		if( aSet == undefined ){ return; }
		if( typeof(aSet.isKindOfClass) != "function" ){ return; }
		if( !aSet.isKindOfClass(MokaSet) ){ return; }
		
		var otherItems = aSet.allObjects();
		var theseObjects = this.allObjects();
		this.removeAllObjects();
		
		for( var i = 0; i < theseObjects.count(); i++ ){
			var o = theseObjects.objectAtIndex(i);
			if( otherItems.containsObject(o) ){
				this.addObject(o);
			}
		}
	}
	/*void*/ this.setSet = function(aSet){
		if( aSet == undefined ){ return; }
		if( typeof(aSet.isKindOfClass) != "function" ){ return; }
		if( !aSet.isKindOfClass(MokaSet) ){ return; }
		
		this.removeAllObjects();
		this.addSet(aSet);
	}
	
	//Deriving new sets
	/*MokaSet*/ this.unionWith = function(aSet){
		return MokaSet.setWithSet(this).addSet(aSet);
	}
	/*MokaSet*/ this.complimentOf = function(aSet){
		return MokaSet.setWithSet(this).subtractSet(aSet);
	}
	/*MokaSet*/ this.intersectionWith = function(aSet){
		return MokaSet.setWithSet(this).intersectSet(aSet);
	}
	
	//Flattening
	/*MokaSet*/ this.flatten = function(){
		var newObjects = new MokaSet;
		var allObjects = this.allObjects();
		for( var i = 0; i < this.count(); i++ ){
			var o = allObjects.objectAtIndex(i);
			if( typeof(o.isKindOfClass) == undefined ){
				newObjects.addObject(o);
			} else {
				if( o.isKindOfClass(MokaArray) ){
					newObjects.addObjectsFromArray( o.flatten() );
				} else if( o.isKindOfClass(MokaDictionary) || o.isKindOfClass(MokaSet)){
					newObjects.addObjectsFromArray( o.flatten().allObjects() );
				} else {
					newObjects.addObject(o);
				}
			}
		}
		return newObjects;
	}
	
	/*string*/ this.toString = function(){
		var s = this.description()+"[";
		
		for( var i = 0; i < this.allObjects().count(); i++ ){
			s += ( i == 0 ? " " : ", " ) + this.allObjects().objectAtIndex(i);
		}
		
		return s + " ]"
	}
	
}
/*MokaSet*/ MokaSet.setWithArray = function(anArray){
	var s = this.makeAndInit.addObjectsFromArray(anArray);
	return s;
}
/*MokaSet*/ MokaSet.setWithObject = function(anObject){
	var s = this.makeAndInit.addObject(anObject);
	return s;
}
/*MokaSet*/ MokaSet.setWithObjects = function(){
	var s = this.makeAndInit.addObjects(arguments);
	return s;
}
/*MokaSet*/ MokaSet.setWithSet = function(aSet){
	var s = this.makeAndInit.setSet(aSet);
	return s;
}