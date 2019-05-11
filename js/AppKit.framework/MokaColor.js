function MokaColor(r,g,b,a){
	this.extend(MokaObject);
	
	//RGB components
	var _red = 0;
	var _green = 0;
	var _blue = 0;
	
	//Alpha component
	var _alpha = 0;
	
	//CMYK components
	var _cyan = 0;
	var _magenta = 0;
	var _yellow = 0;
	var _black = 0;
	
	//HSB components
	var _hue = 0;
	var _saturation = 0;
	var _brightness = 0;
	
	//White component
	var _white = 0;
	
	
	
	
	
	
	if( r != undefined && g != undefined && b != undefined ){
		
		//Set rgb
		if( r > 1 ){ _red = 1; }
		else if( r > 0 ){ _red = r; }
		if( g > 1 ){ _greeb = 1; }
		else if( g > 0 ){ _green = g; }
		if( b > 1 ){ _blue = 1; }
		else if( b > 0 ){ _blue = b; }
		
		var max = Math.max(r,g,b);
		var min = Math.min(r,g,b);
		
		//set cmyk
		
		
		//set hsb
		
		if( max == min ){ _hue = 0; }
		else if( max == r && g >= b ){
			_hue = ( 60*(g-b)/(max-min) )/360;
		} else if( max == r){
			_hue = ( 60*(g-b)/(max-min) + 360 )/360;
		} else if (max == g ){
			_hue = ( 60*(b-r)/(max-min) + 120 )/360;
		} else if( max == b ){
			_hue = ( 60*(r-g)/(max-min) + 240 )/360;
		}
		
		_saturation = ( max == 0 ? 0 : 1 - min/max );
		_brightness = max;
		
		//set w
		_white = ( r == g == b ? r : 0 );
	}
	
	if( a != undefined ){
		if( a > 1 ){ _alpha = 1; }
		else if( a > 0 ){ _alpha = a; }
	}
	
	
	
	
	//Getting a set components
	/*object*/ this.getHueSaturationBrightnessAndAlpha = function(){
		return this.getHSBA();
	}
	/*object*/ this.getHSBA = function(){
		return { hue:_hue, saturation:_saturation, brightness:_brightness, alpha:_alpha };
	}
	/*object*/ this.getRedGreenBlueAndAlpha = function(){
		return this.getRGBA();
	}
	/*object*/ this.getRGBA = function(){
		return { red:_red, green:_green, blue:_blue, alpha:_alpha };
	}
	/*object*/ this.getCyanMagentaYellowBlackAndAlpha = function(){
		return this.getCMYKA();
	}
	/*object*/ this.getCMYKA = function(){
		return { cyan:_cyan, magenta:_magenta, yellow:_yellow, black:_black, alpha:_alpha };
	}
	/*object*/ this.getWhiteAndAlpha = function(){
		return this.getWA();
	}
	/*object*/ this.getWA = function(){
		return { white:_white, alpha:_alpha };
	}
	/*string*/ this.getCSSRGBColor = function(){
		return "rgb("+100*_red+"%,"+100*_green+"%,"+100*_blue+"%)";
	}
	
	//Retrieving individual components
	/*float*/ this.alphaComponent = function(){
		return _alpha;
	}
	/*float*/ this.blackComponent = function(){
		return _black;
	}
	/*float*/ this.blueComponent = function(){
		return _blue;
	}
	/*float*/ this.brightnessComponent = function(){
		return _brightness;
	}
	/*float*/ this.cyanComponent = function(){
		return _cyan;
	}
	/*float*/ this.greenComponent = function(){
		return _green;
	}
	/*float*/ this.hueComponent = function(){
		return _hue;
	}
	/*float*/ this.magentaComponent = function(){
		return _magenta;
	}
	/*float*/ this.redComponent = function(){
		return _red;
	}
	/*float*/ this.saturationComponent = function(){
		return _saturation;
	}
	/*float*/ this.whiteComponent = function(){
		return _white;
	}
	/*float*/ this.yellowComponent = function(){
		return _yellow;
	}
	
	//Deriving new colors
	/*MokaColor*/ this.blendedColorWithFractionOfColor = function(fraction,otherColor){
		var newRed = fraction*otherColor.redComponent() + (1-fraction)*_red;
		var newGreen = fraction*otherColor.greenComponent() + (1-fraction)*_green;
		var newBlue = fraction*otherColor.blueComponent() + (1-fraction)*_blue;
		var newAlpha = fraction*otherColor.alphaComponent() + (1-fraction)*_alpha;
		
		return new MokaColor(newRed,newGreen,newBlue,newAlpha);
	}
	/*MokaColor*/ this.colorWithAlphaComponent = function(alpha){
		return new MokaColor(_red,_green,_blue,alpha);
	}
	
	//To string
	/*string*/ this.toString = function(){
		return this.getCSSRGBColor();
	}
	
}

/*MokaColor*/ MokaColor.colorWithHueSaturationBrightnessAndAlpha = function(h,s,b,a){
	return this.colorWithHSBA(h,s,b,a);
}
/*MokaColor*/ MokaColor.colorWithHSBA = function(h,s,b,a){
	if( typeof h == undefined ){ return new MokaColor; }
	if( !MokaNumberIsFloat(h) ){ return new MokaColor; }
	if( typeof s == undefined ){ return new MokaColor; }
	if( !MokaNumberIsFloat(s) ){ return new MokaColor; }
	if( typeof b == undefined ){ return new MokaColor; }
	if( !MokaNumberIsFloat(b) ){ return new MokaColor; }
	
	if( s == 0 ){
		return new MokaColor(b,b,b,a);
	} else {		
		var h_i = Math.floor(h)%6;
		var f = h/60 - h_i;
		var p = v(1-s);
		var q = v(1-f*s);
		var t = v(1-(1-f)*s);
		
		switch(h_i){
			case 0:
				return new MokaColor(v,t,p,a)
			case 1:
				return new MokaColor(q,b,p,a)
			case 2:
				return new MokaColor(p,v,t,a);
			case 3:
				return new MokaColor(p,q,v,a);
			case 4:
				return new MokaColor(t,p,v,a);
			case 5:
				return new MokaColor(v,p,q,a);
		}
	}
}
/*MokaColor*/ MokaColor.colorWithRedGreenBlueAndAlpha = function(r,g,b,a){
	return new this(r,g,b,a);
}
/*MokaColor*/ MokaColor.colorWithRGBA = function(r,g,b,a){
	return new this(r,g,b,a);
}
/*MokaColor*/ MokaColor.colorWithCyanMagentaYellowBlackAndAlpha = function(c,m,y,k,a){
	return this.colorWithCMYKA(c,m,y,k,a);
}
/*MokaColor*/ MokaColor.colorWithCMYKA = function(c,m,y,k,a){
	return new this( (1-c)*(1-k), (1-m)*(1-k), (1-y)*(1-k), a);
}
/*MokaColor*/ MokaColor.colorWithWhiteAndAlpha = function(w,a){
	return new this(w,w,w,a);
}
/*MokaColor*/ MokaColor.colorWithWA = function(w,a){
	return new this(w,w,w,a);
}
/*MokaColor*/ MokaColor.colorWithCatalogNameAndColorName = function(catalogName, colorName){
	var d = new this;
	
	if( typeof catalogName == undefined ){ return d; }
	if( typeof(catalogName.isKindOfClass) != "function" ){ return d; }
	if( !catalogName.isKindOfClass(MokaString) ){ return d; }
	if( typeof colorName == undefined ){ return d; }
	if( typeof(colorName.isKindOfClass) != "function" ){ return d; }
	if( !colorName.isKindOfClass(MokaString) ){ return d; }
	
	if( !MokaColor.colorCatalogs().containsKey(catalogName) ){ return d; }
	if( !MokaColor.colorCatalogs().objectForKey(catalogName).containsKey(colorName) ){ return d; }
	return MokaColor.colorCatalogs().objectForKey(catalogName).objectForKey(colorName);
}

/*MokaColor*/ MokaColor.blackColor = function(){
	return new this(0,0,0,1);
}
/*MokaColor*/ MokaColor.blueColor = function(){
	return new this(0,0,1,1);
}
/*MokaColor*/ MokaColor.brownColor = function(){
	return new this(0.6,0.4,0.2,1);
}
/*MokaColor*/ MokaColor.clearColor = function(){
	return new this;
}
/*MokaColor*/ MokaColor.cyanColor = function(){
	return new this(0,1,1,1);
}
/*MokaColor*/ MokaColor.darkGrayColor = function(){
	return new this(1/3,1/3,1/3,1);
}
/*MokaColor*/ MokaColor.darkGreyColor = function(){
	return new this(1/3,1/3,1/3,1);
}
/*MokaColor*/ MokaColor.grayColor = function(){
	return new this(0.5,0.5,0.5,1);
}
/*MokaColor*/ MokaColor.greyColor = function(){
	return new this(0.5,0.5,0.5,1)
}
/*MokaColor*/ MokaColor.greenColor = function(){
	return new this(0,1,0,1);
}
/*MokaColor*/ MokaColor.lightGrayColor = function(){
	return new this(2/3,2/3,2/3,1);
}
/*MokaColor*/ MokaColor.lightGreyColor = function(){
	return new this(2/3,2/3,2/3,1);
}
/*MokaColor*/ MokaColor.magentaColor = function(){
	return new this(1,0,1,1);
}
/*MokaColor*/ MokaColor.orangeColor = function(){
	return new this(1,0.5,0,1);
}
/*MokaColor*/ MokaColor.purpleColor = function(){
	return new this(0.5,0,0.5,1);
}
/*MokaColor*/ MokaColor.redColor = function(){
	return new this(1,0,0,1);
}
/*MokaColor*/ MokaColor.whiteColor = function(){
	return new this(1,1,1,1);
}
/*MokaColor*/ MokaColor.yellowColor = function(){
	return new this(1,1,0,1);
}

MokaColor.colorCatalogs = function(){
	if( !is(this._colorCatalogs,MokaDictionary) ){
		this._colorCatalogs = MokaDictionary.makeAndInit();
	}
	return this._colorCatalogs;
}
/*void*/ MokaColor.createCatalog = function(catalogName){
	if( typeof catalogName == undefined ){ return; }
	if( typeof(catalogName.isKindOfClass) != "function" ){ return; }
	if( !catalogName.isKindOfClass(MokaString) ){ return; }
	
	if( MokaColor.colorCatalogs().containsKey(catalogName) ){ return; }
	
	MokaColor.colorCatalogs().setObjectForKey(MokaArray.makeAndInit,catalogName);
}
