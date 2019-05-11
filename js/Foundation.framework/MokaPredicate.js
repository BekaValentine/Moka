function MokaPredicate(){
	this.extend(MokaObject);
	
	/*	Format	*/
	var _predicateFormat = $s("");
	
	/*	Arguments	*/
	var _arguments = null;
	
	/*	value	*/
	var _value = null;
	
	
	
	
	
	//Initialization
	/*id*/ this.initWithFormatAndArgumentArray = function(format,args){
		this.supers().init();
		
		if( !is(format,MokaString) || !is(args,Array) ){ return this; }
		
		_predicateFormat = format;
		_arguments = args;
		
		return this;
	}
	/*id*/ this.initWithFormatAndArguments = function(){
		this.supers().init();

		if( !is(arguments[0],MokaString) ){ return this; }

		_predicateFormat = arguments[0];
		arguments.shift();

		_arguments = arguments;

		return this;		
	}
	
	//Evaluating
	/*bool*/ this.evaluateWithObject = function(obj){
		if( !is(obj,MokaObject) ){ return NO; }
		
		
	}
	
	//Format
	/*MokaString*/ this.predicateFormat = function(){
		return _predicateFormat;
	}
	
	
}
/*MokaPredicate*/ MokaPredicate.predicateWithFormatAndArgumentArray = function(format,args){
	if( !is(format,MokaString) || !is(args,Array) ){ return this.make().init(); }
	return MokaPredicate.make().initWithFormatAndArgumentArray(format,args);
}
/*MokaPredicate*/ MokaPredicate.predicateWithFormatAndArguments = function(){
	var p = MokaPredicate.make();
	return p.initWithFormatAndArguments.apply(p,arguments);
}
/*MokaPredicate*/ MokaPredicate.predicateWithValue = function(value){
	if( !is(value,Boolean) ){ return; }
	return MokaPredicate.make().initWithFormatAndArguments( $s( value ? "TRUEPREDICATE" : "FALSEPREDICATE" ) );
}

function $p(){
	return MokaPredicate.predicateWithFormatAndArguments.apply(arguments);
}