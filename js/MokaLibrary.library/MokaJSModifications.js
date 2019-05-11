//Importing
/*void*/ function importFile( aFileName ){
	if( typeof(aFileName) != "string" ){ return; }
	
	if( !is(importFile.imports,Array) ){ importFile.imports = []; }
	
	if( !importFile.imports[aFileName] ){
		importFile.imports[aFileName] = true;
		document.write( "<script type=\"text/javascript\" src=\"./js/"+aFileName+"\"></script>" );
	}
}

//OO inheritance
/*id*/ Function.prototype.make = function(){
	return new this;
}
/*id*/ Function.prototype.makeAndInit = function(){
	var o = this.make();
	if( typeof(o.init) == "function" ){ o.init(); }
	return o;
}
/*void*/ Function.prototype.extend = function(Class){
	if( typeof(Class) != "function" ){ return; }
	if( Function.extendedClasses == undefined ){ Function.extendedClasses = new Array; }
	
	for( var m in Function.extendedClasses ){
		if( this == Function.extendedClasses[m] ){ return; }
	}
	
	Function.extendedClasses.push(this);
	
	for( var m in Class ){
		if( m != "load" && m != "prototype" ){
			this[m] = Class[m];
		}
	}
	if( this.load == undefined ){
		this.load = function(){};
	}
	
	/*this.superclass = Class;

	var supers = {};
	for( var m in this ){
		supers[m] = this[m];
	}
	this.supers = function(){
		var dupe = {};
		for( var m in supers ){
			dupe[m] = supers[m];
		}
		return dupe;
	}*/
}
/*void*/ Function.prototype.className = function(){
	var className = this.toString();
	className = className.substring(9,className.length);
	var indexOfSpace = className.indexOf(" ");
	className = className.substring(0,(indexOfSpace == -1 ? className.length : indexOfSpace)-2);
	return $s(className);
}
Object.superclass = null;
Object.prototype.superclass = null;
/*void*/ Object.prototype.extend = function(Class){
	if( typeof(Class) != "function" ){ return; }
	
	Class.apply(this);
	this.constructor.extend(Class);
	this.superclass = Class;
	
	var supers = {};
	supers.constructor = this.constructor;
	for( var m in this ){
		supers[m] = this[m];
	}
	this.supers = function(){
		var dupe = {};
		for( var m in supers ){
			dupe[m] = supers[m];
		}
		return dupe;
	}
}

//Number type checking
/*bool*/ function MokaNumberIsInt( aNumber ){
	if( !MokaNumberIsFloat(aNumber) ){ return NO; }
	return (aNumber%1 == 0);
}
/*bool*/ function MokaNumberIsFloat( aNumber ){
	return (typeof(aNumber) == "number");
}

//YES/NO
YES	= true;
NO	= false;

//Simple DOM operations
/*element*/ function $e(aName){
	if( !is(aName,String) ){ return; }
	return document.getElementById(aName);
}
/*element*/ function $ce(parent,name){
	if( !is(parent.childNodes,Array) || !is(name,String) ){ return; }
	for( var i = 0; i < parent.childNodes.length; i++ ){
		if( i in parent.childNodes && parent.childNodes[i].getAttribute("id") == name ){
			return parent.childNodes[i];
		}
	}
}
/*void*/ function $removeClassFromElement(aClass,anElement){
	if( (!is(aClass,String) && !is(aClass,RegExp)) || !is(anElement.getAttribute,Function) || !anElement.getAttribute("class") ){ return; }
	
	var re = ( is(aClass,String) ? new RegExp("\\s+("+aClass+")(\\b)") : aClass );
	while( anElement.getAttribute("class").toString().match(re) ){
		anElement.setAttribute("class",anElement.getAttribute("class").toString().replace(re,""));
	}
}
/*void*/ function $addClassToElement(aClass,anElement){
	if( !is(aClass,String) || !is(anElement.getAttribute,Function) ){ return; }
	$removeClassFromElement(aClass,anElement);
	
	var currentClass = anElement.getAttribute("class") || "";
	
	anElement.setAttribute( "class", currentClass.toString()+" "+aClass );
}
/*void*/ function $replaceClassOfElement(match,replace,anElement){
	$removeClassFromElement( match, anElement );
	$addClassToElement( replace, anElement );
}
/*CSSRules*/ function $CSSDefinition(selector){
	var rules;
	if(document.all){
		rules = 'rules';
	} else if(document.getElementById){
		rules = 'cssRules';
	}
	if( rules ){
		for(var i = 0; i < document.styleSheets.length; i++){
			for(var j = 0; j < document.styleSheets[i][rules].length; j++){
				if(document.styleSheets[i][rules][j].selectorText == selector){
					return document.styleSheets[i][rules][j];
				}
			}
		}
	}
}
/*element*/ function $makeElement(elementType,properties){
	if( !is(elementType) || (properties && !is(properties,Object) ) ){ return null; }
	var d = document.createElement(elementType);
	if( properties ){
		for( var key in properties ){
			if( key == "before" ){
				properties[key].parentNode.insertBefore(d,properties[key]);
			} else if( key == "after" ){
				properties[key].parentNode.insertBefore(d,properties[key].nextSibling);
			} else if( key == "into" ){
				properties[key].appendChild(d);
			} else if( key == "style" ){
				var styles = properties[key];
				if( styles ){
					for( var i in styles ){
						d.style[i] = styles[i];
					}
				}
			} else {
				try {
					d.setAttribute(key,properties[key]);
				} catch(e){}
			}
		}
	}
	return d;
}
/*void*/ function $write(str,target){
	if( !target ){ target = document.body; }
	try {
		target.appendChild(document.createTextNode(str));
	} catch(e){}
}


//Number utility functions
/*number*/ function $n(num){
	// this is necessary because JS interpreters suck and won't do 5.times(...) or even (5).times(...) but WILL do $n(5).times(...)
	return num;
}
/*void*/ Number.prototype.times = function(f){
	if( typeof(f) != "function" ){ return; }
	
	for( var i = 0; i < this; i++ ){
		f(i);
	}
}
/*void*/ Number.prototype.upto = function(n,f){
	if( typeof(n) != "number" || typeof(f) != "function" ){ return; }
	for( var i = this; i <= n; i++){
		f(i);
	}
}
/*void*/ Number.prototype.downto = function(n,f){
	if( typeof(n) != "number" || typeof(f) != "function" ){ return; }
	for( var i = this; i >= n; i--){
		f(i);
	}
}
/*void*/ Number.prototype.step = function(m,n,f){
	if( typeof(m) != "number" || typeof(n) != "number" || typeof(f) != "function" ){ return; }
	if( m > this && n > 0 ){
		for( var i = this; i <= m; i += n){
			f(i);
		}
	} else if( m < this && n < 0 ){
		for( var i = this; i >= m; i += n){
			f(i);
		}
	}
}
/*number*/ Number.prototype.squared = function(){
	return this*this;
}
/*number*/ Number.prototype.cubed = function(){
	return this*this*this;
}
/*number*/ Number.prototype.toPower = function(n){
	if( !is(n,Number) ){ return 0; }
	return Math.pow(this,n)
}
/*number*/ Number.prototype.squareRoot = function(){
	return Math.sqrt(this);
}
/*number*/ Number.prototype.cubeRoot = function(){
	return this.toPower(1/3);
}
/*number*/ Number.prototype.nthRoot = function(n){
	return this.toPower(n);
}
//Conversions need to handle fractional values as well
/*string*/ Number.prototype.toBin = function(){
	
}
/*string*/ Number.prototype.toOct = function(){
	
}
/*string*/ Number.prototype.toHex = function(){
	var r = this%16;
	var result = "";
	if( this - r != 0 ){
		result = Math.floor( (d-r)/16 ).toHex() 
	}
	return result + "0123456789ABCDEF".charAt(r);
}
/*number*/ String.prototype.hexToDec = function(){
	var dec = 0;
	var map = { A:10, a:10, B:11, b:11, C:12, c:12, D:13, d:13, E:14, e:14, F:15, f:15 };
	
	for( var i = 0; i < this.length; i++ ){
		if( this.charAt(i) in map ){ dec = 16*dec + map[this.charAt(i)]*1; }
		else { dec = 16*dec + this.charAt(i)*1; }
	}
	
	return dec;
}
/*number*/ String.prototype.octToDec = function(){
	var dec = 0;
	
	for( var i = 0; i < this.length ; i++ ){
		dec = 8*dec + this.charAt(i)*1;
	}
	
	return dec;
}
/*number*/ String.prototype.binToDec = function(){
	var dec = 0;
	
	for( var i = 0; i < this.length; i++ ){
		dec = 2*dec + (this.charAt(i) ? 1 : 0);
	}
	
	return dec
}

//Array utility functions
/*number or string*/ Array.prototype.inject = function(){
	var aggregate = 0;
	if( arguments.length == 1 ){
		if( typeof(arguments[0]) != "function" ){ return; }
		for( var i = 0; i < this.length; i++ ){
			if( i in this && typeof(this[i]) != "number"){ aggregate = ""; }
		}
		for( var i = 0; i < this.length; i++ ){
			if( i in this ){ aggregate = arguments[0](aggregate,this[i]); }
		}
	} else {
		if( typeof(arguments[1]) != "function" ){ return; }
		aggregate = arguments[0];
		for( var i = 0; i < this.length; i++ ){
			if( i in this ){ aggregate = arguments[1](aggregate,this[i]); }
		}
	}
	return aggregate;
}
/*id*/ Array.prototype.first = function(){
	return this[0];
}
/*Array*/ Array.prototype.rest = function(){
	return this.slice(1,this.length);
}
/*Array*/ Array.prototype.flatten = function(){
	var arr = [];
	for( var i = 0; i < this.length; i++ ){
		if(i in this){
			if( this[i] instanceof Array ){ arr.push(this[i].flatten()); }
			else{ arr.push(this[i]); }
		}
	}
	return arr;
}
/*Array*/ Array.prototype.uniq = function(){
	var arr = [];
	for( var i = 0; i < this.length; i++ ){
		if( !arr.contains(this[i]) ){ arr.push(this[i]); }
	}
	return arr;
}
/*Array*/ Array.prototype.contains = function(o){
	for( var i = 0; i < this.length; i++ ){
		if( this[i] == o ){ return YES; }
	}
	return NO;
}
/*Array*/ function filter( match, compare, set ){
	if( !is(match) || !is(compare,String) || is(set,Array) ){ return []; }
	var matches = [];
	for( var i = 0; i < set.length; i++ ){
		if( (match)[compare](set[i]) ){
			matches.push(set[i]);
		}
	}
	return matches;
}
/*Array*/ Array.prototype.quicksort = function(){
	return filter( "<", this.first(), this.rest() ).quicksort().concat( this.first() ).concat(filter( ">=", this.first(), this.rest() ).quicksort());
}
//String utility functions
/*string*/ String.prototype.times = function(n){
	if( !MokaNumberIsFloat(n) ){ return this; }
	
	var s = "";
	n.times(function(){
		s += this;
	});
	
	return s;
}
/*string*/ String.prototype.reverse = function(){
	var s = "";
	
	for( var i = this.length - 1; i >= 0; i-- ){
		s += this.charAt(i);
	}
	
	return s;
}
/*string*/ String.prototype.replaceMatches = function(){
	var returnString = this;
	for( var i = 0; i < arguments.length; i++ ){
		if( i in arguments ){
			var match = arguments[i][0];
			var replacement = arguments[i][1];
			if( typeof(match) == "string" ){
				while( -1 != returnString.indexOf(match) ){
					returnString = returnString.replace(match,replacement);
				}
			} else if( match instanceof RegExp ){
				while( -1 != returnString.indexOf(returnString.match(match)) ){
					returnString = returnString.replace(match,replacement);
				}
			}
		}
	}
	return returnString;
}
/*bool*/ Object.prototype[">"] = function(o){
	if( !this["<=>"] ){ return NO; }
	return this["<=>"] == 1;
}
/*bool*/ Object.prototype["<"] = function(o){
	if( !this["<=>"] ){ return YES; }
	return this["<=>"] == -1;
}
/*bool*/ Object.prototype["=="] = function(o){
	if( !this["<=>"] ){ return NO; }
	return this["<=>"] == 0;
}
/*bool*/ Object.prototype[">="] = function(o){
	if( !this["<=>"] ){ return NO; }
	return this["<=>"] != -1;
}
/*bool*/ Object.prototype["<="] = function(o){
	if( !this["<=>"] ){ return NO; }
	return this["<=>"] != 1;
}
/*bool*/ Object.prototype["!="] = function(o){
	if( !this["<=>"] ){ return YES; }
	return this["<=>"] != 0;
}

/*-1,0,1*/ Object.prototype["<=>"] = function(o){
	if( !is(o) ){ return -1; }
	else if( is(o,Array) ){ return 1; }
	else if( is(o,Date) || is(o,Number) || is(o,String) ){ return -1; }
	else {
		if( is(o,MokaObject) ){ return -1; }
		return (this.length)["<=>"](o.length);
	}
}
/*-1,0,1*/ Number.prototype["<=>"] = function(o){
	if( !is(o) ){ return -1; }
	else if( is(o,String) ){ return -1; }
	else if( !is(o,Number) ){ return 1; }
	else {
		if( this > o ){ return 1; }
		else if( this < o ){ return -1; }
		else { return 0; }
	}
}
/*-1,0,1*/ Array.prototype["<=>"] = function(o){
	if( !is(o) ){ return -1; }
	else if( is(o,Array) ){
		for( var i = 0; i < this.length; i++ ){
			if( i in this && i in o ){
				
				if( !is(this[i]) && !is(o[i]) ){
					continue;
				} else if( !is(this[i]) ){
					return -1;
				} else if( !is(o[i]) ){
					return 1;
				}
				
								
				var c = (this[i])["<=>"](o[i]);
				if( c != 0 ){
					return c;
				}
			} else {
				if( i in this ){ return 1; }
				else { return -1; }
			}
		}
		
		if( this.length > o.length ){ return 1; }
		else if( this.length < o.length ){ return -1; }
		else { return 0; }
		
	} else { return -1; }
	
}
/*-1,0,1*/ Date.prototype["<=>"] = function(o){
	if( !is(o) ){ return -1; }
	else if( is(o,Date) ){
		return (this.valueOf())["<=>"](o);		
	} else if( is(o,Number) || is(o,String) ){ return -1; }
	else { return 1; }
}
/*-1,0,1*/ String.prototype["<=>"] = function(o){
	if( !is(o) ){ return -1; }
	else if( is(o,String)  ){
		if( this > o ){ return 1; }
		else if( this < o ){ return -1; }
		return 0;
	} else {
		return 1;
	}
}

//Type testing
/*bool*/ function is(obj,type){

	if( type == undefined ){ return obj != undefined; }
	else {
		
		if( obj == undefined ){ return NO; }
		else if( type == undefined || type == "undefined" ){
			return is(obj);
		} else if( type == "int" ){
			return ( obj.constructor == Number || obj instanceof Number || typeof(obj) == "number" ) && obj%1 == 0;
		} else if( type == "float" || type == "number" || type == Number ){
			return obj.constructor == Number || obj instanceof Number || typeof(obj) == "number";
		} else if( type == "bool" || type == "boolean" || type == Boolean ){
			return obj.constructor == Boolean || obj instanceof Boolean || typeof(obj) == "boolean";
		} else if( type == "date" || type == Date ){
			return obj.constructor == Date || obj instanceof Date || typeof(obj) == "date";
		} else if( type == "function" || type == Function ){
			return obj.constructor == Function || obj instanceof Function || typeof(obj) == "function";
		} else if( type == "array" || type == Array ){
			return obj.constructor == Array || obj instanceof Array || typeof(obj) == "array";
		} else if( type == "object" || type == Object ){
			return obj.constructor == Object || obj instanceof Object || typeof(obj) == "object";
		} else if ( type == "regex" || type == "regexp" || type == RegExp ){
			return obj.constructor == RegExp || obj instanceof RegExp;
		} else if( is(type,Function) ){
			return obj.constructor == type || obj instanceof type || (is(obj.isKindOfClass,Function) && obj.isKindOfClass(type));
		}
		
	}
}

//Enumerator functions
/*Array*/ function enumerate(){
	var values = [];
	values.asType = function(typename){
		if( typeof(typename) != "string" ){ return; }

		if( !window.types ){ window.types = []; }

		if( window.types[typename] ){
			window.types[typename] = window.types[typename].concat(this);
			return;
		}

		window.types[typename] = this;
		window[typename] = typename;
	}
	
	for( var i in arguments ){
		if( typeof(arguments[i]) != "string" ){ continue; }
		if( window[arguments[i]] == undefined ){ window[arguments[i]] = values[i] = i*1; }
	}
	
	return values;
}
/*Array*/ function bitmaskEnumerate(){
	var values = [];
	values.asType = function(typename){
		if( typeof(typename) != "string" ){ return; }

		if( !window.types ){ window.types = []; }

		if( window.types[typename] ){
			window.types[typename] = window.types[typename].concat(this);
			return;
		}

		window.types[typename] = this;
		window[typename] = typename;
	}
	
	for( var i in arguments ){
		if( typeof(arguments[i]) != "string" ){ continue; }
		if( window[arguments[i]] == undefined ){ window[arguments[i]] = values[i] = ( i == 0 ? 0 : 1 << i-1 )*1; }
	}
	
	return values;
}
function istype(a,b){
	if( typeof(a.isKindOfClass) == "function" ){
		return a.isKindOfClass(b);
	}
	if( typeof(a) == "number" && window.types && window.types[b] ){
		for( var m in window.types[b] ){
			if( a == window.types[b][m] ){ return YES; }
		}
	}
	return typeof(a) == b;
}