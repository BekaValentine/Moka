function MokaFont(){
	this.extend(MokaObject);
	
	/*	Font Properties	*/
	var _fontStyle = "";
	var _fontVariant = "";
	var _fontWeight = "";
	var _fontSize = "12px";
	var _lineHeight = "";
	var _fontFamily = "sans-serif";
	
	
	
	
	
	
	//Properties
	/*string*/ this.fontStyle = function(){
		return _fontStyle;
	}
	/*void*/ this.setFontStyle = function(aStyle){
		if( !(/()|normal|italic|oblique/.test(aStyle)) ){ return; }
		_fontStyle = aStyle;
	}
	/*string*/ this.fontVariant = function(){
		return _fontVariant;
	}
	/*void*/ this.setFontVariant = function(aVariant){
		if( !(/()|normal|small-caps/.test(aVariant)) ){ return; }
		_fontVariant = aVariant;
	}
	/*string*/ this.fontWeight = function(){
		return _fontWeight;
	}
	/*void*/ this.setFontWeight = function(aWeight){
		if( !(/()|normal|bold(er)?|lighter|[1-9]00/.test(aWeight)) ){ return; }
		_fontWeight = aWeight;
	}
	/*string*/ this.fontSize = function(){
		return _fontSize;
	}
	/*void*/ this.setFontSize = function(aFontSize){
		if( !(/()|\d(.\d+)?(em|ex|px|in|cm|mm|pt|pc|%)/.test(aFontSize)) ){ return; }
		_fontSize = aFontSize;
	}
	/*string*/ this.lineHeight = function(){
		return _lineHeight;
	}
	/*void*/ this.setLineHeight = function(aLineHeight){
		if(	!(/()|\d(.\d+)?(em|ex|px|in|cm|mm|pt|pc|%)?/.test(aLineHeight)) ){ return; }
		_lineHeight = aLineHeight;
	}
	/*string*/ this.fontFamily = function(){
		return _fontFamily;
	}
	/*void*/ this.setFontFamily = function(aFontFamily){
		if( aFontFamily == undefined ){ return; }
		if( typeof(aFontFamily) != "string" ){ return; }
		
		_fontFamily = aFontFamily;
	}
	/*string*/ this.font = function(){
		var font = this.fontStyle();
		font += (font == "" ? "" : " " ) + this.fontVariant();
		font += (font == "" ? "" : " " ) + this.fontWeight();
		font += (font == "" ? "" : " " ) + this.fontSize();
		font += (font == "" ? "" : " " ) + (this.lineHeight() == "" ? "" : "/"+this.lineHeight());
		font += (font == "" ? "" : " " ) + this.fontFamily();
		
	}
	
	//String value
	/*string*/ this.toString = function(){
		return this.fontStyle() +" "+ this.fontVariant() +" "+ this.fontWeight() +" "+ this.fontSize() +" "+ ( this.lineHeight() ? "/" + this.lineHeight() : "" ) +" "+ this.fontFamily();
	}
	
}
/*MokaFont*/ MokaFont.fontFromCSS = function(aFontString){
	var f = new MokaFont;
	if( aFontString == undefined ){ return f; }
	if( typeof(aFontString) != "string" ){ return f; }
	
		var parts = aFontString.split(/\s+/);
	for( var i = 0; i < parts.length; i++ ){
		if( i in parts ){
			if( /normal|italic|oblique/.test(parts[i]) ){ f.setFontStyle(parts[i]); continue; }
			else if( /normal|small-caps/.test(parts[i]) ){ f.setFontVariant(parts[i]); continue; }
			else if( /normal|bold(er)?|lighter|[1-9]00/.test(parts[i]) ){ f.setFontWeight(parts[i]); continue; }
			else if( /\d(.\d+)?(em|ex|px|in|cm|mm|pt|pc|%)(\/\d(.\d+)?(em|ex|px|in|cm|mm|pt|pc|%)?)?/ ){
				var sizeAndHeight = parts[i].split("/");
				f.setFontSize(sizeAndHeight[0]);
				f.setFontSize( sizeAndHeight[1] || "" );
				continue;
			} else { f.setFontFamily(parts[i]); continue; }
		}
	}	
}
