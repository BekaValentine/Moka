function MokaRange(x,l){
	this.extend( MokaObject );
	
	var _location = 0;
	var _length = 0;
	
	if( is(x,"int") && is(l,"int") ){
		_location = x;
		_length = l;
	}
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.setLocation(this.location());
		copy.setLength(this.length());
		
		return copy;
	}
	
	//Comparison
	/*-1,0,1*/ this["<=>"] = function(o){
		if( is(o,MokaRange) ){
			return (this.location())["<=>"](o.location());
		}
		return (this.supers())["<=>"](o);
	}
	
	//Accessing location and length
	/*int*/ this.location = function(){
		return _location;
	}
	/*void*/ this.setLocation = function(anInt){
		if( anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		_location = anInt;
	}
	/*int*/ this.length = function(){
		return _length;
	}
	/*void*/ this.setLength = function(anInt){
		if( anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		_length = anInt;
	}
	
	//Accessing first and last index in the range
	/*int*/ this.first = function(){
		return this.location();
	}
	/*void*/ this.setFirst = function(anInt){
		if( !is(anInt,"int") ){ return; }
		var last = this.last();
		this.setLocation( anInt );
		this.setLength( last - this.first() );
	}	
	/*int*/ this.last = function(){
		return this.location() + this.length();
	}
	/*void*/ this.setLast = function(anInt){
		if( !is(anInt,"int") ){ return; }
		this.setLength( anInt - this.location() );
	}
	
	
	//Collecting values in a range into an array
	/*MokaArray*/ this.collect = function(aMappingFunction){
		if( typeof( aMappingFunction ) != "function" ){ aMappingFunction = function(x){ return x; }; }
		
		var vals = MokaArray.make().init();
		for( var i = this.location(); i < this.location() + this.length(); i++ ){
			vals.addObject(aMappingFunction(i));
		}
		return vals;
	}
	/*string*/ this.toString = function(){
		return "(" + this.location() + ".." + (this.location()+this.length()) + ")"
	}
	
	//Finding out if ranges contain an index
	/*bool*/ this.contains = function(anInt){
		if( !is(anInt,"int") ){ return NO; }
		
		return anInt >= this.first() && this.last() > anInt;
	}
	
}
/*MokaRange*/ MokaRange.rangeWithLocationAndLength = function(x,l){
	return MokaRange(x,l);
}

function $r(first,last){
	if( first == undefined ){ return new MokaRange; }
	if( !MokaNumberIsInt(first) ){ return new MokaRange; }
	if( last == undefined ){ return new MokaRange; }
	if( !MokaNumberIsInt(last) ){ return new MokaRange; }
	
	return new MokaRange( first, last-first );	
}