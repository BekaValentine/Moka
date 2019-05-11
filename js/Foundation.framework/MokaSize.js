function MokaSize(w,h){
	this.extend( MokaObject );
	
	var _width = 0;
	var _height = 0;
	
	if( typeof(w) == "number" && typeof(h) == "number" ){
		_width = w;
		_height = h;
	}
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.setWidth(this.width());
		copy.setHeight(this.height());
		
		return copy;
	}
	
	//Accessing properties
	/*float*/ this.width = function(){
		return _width;
	}
	/*void*/ this.setWidth = function(aWidth){
		if( aWidth == undefined ){ return; }
		if( !MokaNumberIsFloat(aWidth) ){ return; }
		
		_width = aWidth;
	}
	/*float*/ this.height = function(){
		return _height;
	}
	/*void*/ this.setHeight = function(aHeight){
		if( aHeight == undefined ){ return; }
		if( !MokaNumberIsFloat(aHeight) ){ return; }
		
		_height = aHeight;
	}
	
	//comparing and creating new
	/*-1,0,1*/ this["<=>"] = function(s){
		if( is(s,MokaSize) ){
			if( this.width() == s.width() && this.height() == s.height() ){
				return 0;
			}
			var area = (this.width()*this.height())["<=>"](s.width()*s.height());
			
			if( area == 0 ){
				return (this.width() > s.width() ? 1 : -1 );
			}
			return area;
		}
		return (this.supers())["<=>"](s);
	}
	/*bool*/ this.isEqualTo = function( aSize ){
		return (this)["=="](aSize);
	}
	/*MokaSize*/ this.add = function( aSize ){
		if( typeof(aSize.isKindOfClass) != "function" ){
			return;
		}

		if( !aSize.isKindOfClass(MokaSize) ){
			return;
		}

		return MokaSize.sizeWithDimensions( this.width()+aSize.width(), this.height()+aSize.height() );
	}
	/*MokaSize*/ this.subtract = function( aSize ){
		if( typeof(aSize.isKindOfClass) != "function" ){
			return;
		}

		if( !aSize.isKindOfClass(MokaSize) ){
			return;
		}

		return MokaSize.sizeWithDimensions( this.width()-aSize.width(), this.height()-aSize.height() );
	}
	
	/*string*/ this.toString = function(){
		return this.width() + "x" + this.height();
	}
	
}
/*MokaSize*/ MokaSize.sizeWithDimensions = function(w,h){
	if( w == undefined ){ return this.makeAndInit(); }
	if( !MokaNumberIsFloat(w) ){ return this.makeAndInit(); }
	if( h == undefined ){ return this.makeAndInit(); }
	if( !MokaNumberIsFloat(h) ){ return this.makeAndInit(); }
	

	var newSize = this.makeAndInit();
	newSize.setWidth( w );
	newSize.setHeight( h );
	return newSize;
}
/*MokaSize*/ MokaSize.windowSize = function(){
	return new MokaSize(window.innerWidth,window.innerHeight);
}