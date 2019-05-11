function MokaInvocation(){
	this.extend(MokaObject);
		
	var _argumentArray = new Array;
	var _returnValue;
	var _selector = null;
	var _target = null;
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		for( var i = 0; i < _argumentArray.length; i++ ){
			if( i in _argumentArray ){
				copy.setArgumentAtIndex(_argumentArray[i],i);
			}
		}
		copy.setReturnValue(this.returnValue());
		copy.setSelector(this.selector());
		copy.setTarget(this.target());
		
		return copy;
	}
	
	
	//Accessing message elements
	/*void*/ this.setArgumentAtIndex = function( anArgument, anIndex ){
		if( !MokaNumberIsInt(anIndex) ){ return; }

		_argumentArray[anIndex] = anArgument;
	}
	/*all*/ this.argumentAtIndex = function( anIndex ){
		if( !MokaNumberIsInt(anIndex) ){ return; }

		return _argumentArray[anIndex];
	}
	/*void*/ this.setReturnValue = function(aValue){
		_returnValue = aValue;
	}
	/*all*/ this.returnValue = function(){
		return _returnValue;
	}
	/*MokaSelector*/ this.selector = function(){
		return _selector;
	}
	/*void*/ this.setSelector = function(aSelector){
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		
		_selector = aSelector
	}
	/*id*/ this.target = function(){
		return _target;
	}	
	/*void*/ this.setTarget = function(anObject){
		if( typeof(anObject.isKindOfClass) != "function" && typeof(anObject) != "function" ){ return; }
		
		_target = anObject;
	}
	
	//Dispatching an invocation
	/*void*/ this.invoke = function(){
		this.invokeWithTarget( _target );
	}
	/*void*/ this.invokeWithTarget = function( aTarget ){
		if( !is(aTarget,MokaObject) ){ return; }
		if( !this.selector() ){ return; }
		
		if( aTarget.respondsToSelector(this.selector()) ){
			this.setReturnValue( aTarget[this.selector().selectorName()].apply(aTarget,_argumentArray) );
		}
	}
}