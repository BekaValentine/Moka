function MokaEnumerator(){
	this.extend(MokaObject);
	
	//Reference array
	var _refArray = null;
	
	//Current index
	var _next = 0;
	
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.initWithArray(this.allObjects());
		
		return copy;
	}
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		return this;
	}
	/*id*/ this.initWithArray = function(anArray){
		this.supers().init();
		
		if( anArray == undefined ){ return this; }
		if( typeof(anArray.isKindOfClass) != "function" ){ return this; }
		if( !anArray.isKindOfClass(MokaArray) ){ return this; }
		
		_refArray = anArray;
		
		return this;
	}
		
	//Getting objects
	/*MokaArray*/ this.allObjects = function(){
		if( !_refArray ){ return null; }
		return _refArray.objectsFromIndexToIndex(_next,_refArray.count()-1)
	}
	/*id*/ this.nextObject = function(){
		if( !_refArray ){ return null; }
		var n = _next;
		_next++;
		return _refArray.objectAtIndex(n);
	}
		
}
/*MokaEnumerator*/ MokaEnumerator.enumeratorWithArray = function(anArray){
	var e = new this;
	return e.initWithArray(anArray);	
}
