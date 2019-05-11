function MokaCountedSet(){
	this.extend(MokaSet);
	
	//Counts
	var _counts = new MokaDictionary;
	
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.addSet(this);
		
		return copy;
	}
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_counts.init();
		
		return this;
	}
	
	//Adding and removing objects
	/*void*/ this.addObject = function(anObject){
		if( anObject == undefined ){ return; }
		
		if( this.containsObject(anObject) ){ 
	 		_counts.setObjectForKey(this.countForObject(anObject)+1,anObject);
		} else {
			this.supers().addObject(anObject);
			_counts.setObjectForKey(anObject,1);
		}
	}
	/*void*/ this.removeObject = function(anObject){
		if( anObject == undefined ){ return; }
		
		for( var m in _items ){
			if( _items[m] == anObject ){
				if( this.countForObject(anObject) == 1 ){
					delete(_items[m]);
					_counts.removeObjectForKey(anObject);
					break;
				} else {
					_counts.setObjectForKey(this.countForObject(anObject)-1,anObject);
				}
			}
		}
	}
	
	//Examint a counted set
	/*int*/ this.countForObject = function(anObject){
		if( anObject == undefined ){ return 0; }
		if( !_counts.containsObject(anObject) ){ return 0; }
		
		return _counts.objectForKey(anObject);
	}
	
	/*string*/ this.toString = function(){
		var s = this.description()+"[";
		
		for( var i = 0; i < this.allObjects().count(); i++ ){
			var o = this.allObjects().objectAtIndex(i);
			s += ( i == 0 ? " " : ", " ) + o + "(" + this.countForObject(o) + ")";
		}
		
		return s + " ]";
	}
	
}