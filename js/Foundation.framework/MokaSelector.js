function MokaSelector(name){
	this.extend(MokaObject);
	
	var _selectorName = "";
	if( name != undefined ){
		if( typeof(name) == "string" ){ _selectorName = name; }
	}
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.setSelectorName(this.selectorName());
		
		return copy;
	}
	
	//Accessing the selector name
	/*string*/ this.selectorName = function(){
		return _selectorName;
	}
	/*void*/ this.setSelectorName = function( aJSString ){
		
		if( typeof(aJSString) != "string" ){
			return;
		}
		
		_selectorName = aJSString;
		
	}
	
	/*string*/ this.toString = function(){
		return this.selectorName();
	}
	
}

//Creating selectors
/*MokaSelector*/ MokaSelector.selectorWithName = function(aSelectorName){
	if( typeof(aSelectorName) != "string" ){
		return;
	}

	var newSelector = this.makeAndInit();
	newSelector.setSelectorName( aSelectorName );
	return newSelector;
}

//Convenience function
function $sel( aName ){
	return MokaSelector.selectorWithName(aName);
}