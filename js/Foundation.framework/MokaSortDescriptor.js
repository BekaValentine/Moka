function MokaSortDescriptor(){
	this.extend(MokaObject);
	
	/*	Info	*/
	var _ascending = NO;
	var _key = null;
	var _selector = $sel("compare");
	
	
	
	
	
	
	
	//Initialization
	/*id*/ this.initWithKeyAndAscending = function(key,yn){
		this.supers().init();
		
		if( is(key,MokaString) && is(yn,Boolean) ){
			_key = key;
			_ascending = yn;
		}
		
		return this;
	}
	/*id*/ this.initWithKeyAscendingAndSelector = function(key,yn,selector){
		this.supers().init();
		
		if( is(key,MokaString) && is(yn,Boolean) && is(selector,MokaSelector) ){
			_key = key;
			_ascending = yn;
			_selector = selector;
		}
		
		return this;
	}
	
	//Getting info
	/*bool*/ this.ascending = function(){
		return _ascending;
	}
	/*MokaString*/ this.key = function(){
		return _key;
	}
	/*MokaSelector*/ this.selector = function(){
		return _selector;
	}
	
	//Using sort descriptors
	/*MokaComparisonResult*/ this.compareObjectToObject = function(obj1,obj2){
		if( !is(obj1,MokaObject) || !is(obj2,MokaObject) ){ return; }
		
		var value1 = obj1.valueForKeyPath( this.key() );
		var value2 = obj2.valueForKeyPath( this.key() );
		
		if( this.selector() && is(value1,MokaObject) && value1.respondsToSelector(this.selector()) ){
			return value1[this.selector().selectorName()](value2);
		} else {
			return ( value1 )["<=>"]( value2 );
		}
	}
	/*MokaSortDescriptor*/ this.reversedSortDescriptor = function(){
		return MokaSortDescriptor.make().initWithKeyAscendingAndSelector( this.key(), !this.ascending(), this.selector() );
	}
	
	
}