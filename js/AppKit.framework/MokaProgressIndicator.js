function MokaProgressIndicator(){
	this.extend( MokaView );
	
	/*	Progress Indicator Appearance */
	var _style = MokaProgressIndicatorBarStyle;
	var _indeterminate = NO;
	
	/*	Progress	*/
	var _minValue = 0;
	var _maxValue = 100;
	var _value = 0;
	
	/*	Indicating Region	*/
	var _indicator = document.createElement("div");
	_indicator.setAttribute("id","progressbar");
		
	/*	Skin	*/
	var _bgLeft = document.createElement("div");
	_bgLeft.setAttribute("id","left");
	this.skin().appendChild(_bgLeft);
	
	var _bgCenter = document.createElement("div");
	_bgCenter.setAttribute("id","center");
	this.skin().appendChild(_bgCenter);
	
	var _bgRight = document.createElement("div");
	_bgRight.setAttribute("id","right");
	this.skin().appendChild(_bgRight);
	
	var _pbarLeft = document.createElement("div");
	_pbarLeft.setAttribute("id","left");
	_indicator.appendChild(_pbarLeft);
	
	var _pbarCenter = document.createElement("div");
	_pbarCenter.setAttribute("id","center");
	_indicator.appendChild(_pbarCenter);
	
	var _pbarRight = document.createElement("div");
	_pbarRight.setAttribute("id","right");
	_indicator.appendChild(_pbarRight);
	
	
	
	
	
	
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_display.init();
		_display.setBackgroundColor( "lightblue" );
		this.drawCellInRect(	_display,
								MokaRect.rectWithOriginAndSize(MokaPoint.origin(), new MokaSize(0,this.frame().size().height())));
		
		this.setFrameSize( new MokaSize(200,200) );
		this.display();
		return this;
	}
	
	//Constrain the size of the frame
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( typeof aSize == undefined ){ return this.frame().size(); }
		if( typeof(aSize.isKindOfClass) != "function" ){ return this.frame().size(); }
		if( !aSize.isKindOfClass(MokaSize) ){ return this.frame().size(); }
		
		var newSize = aSize.copy();
		
		if( this.style() == MokaProgressIndicatorBarStyle ){
			newSize.setHeight( 17 );
		} else {
			newSize.setHeight( 30 );
			newSize.setWidth( 30 );
		}
		
		return newSize;
	}
		
	//Drawing the Indicator
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		this.drawingCanvas().appendChild(indicator)
		
		if( this.style() == MokaProgressIndicatorSpinningStyle ){
			_indicator.style.width = "100%";
			this.pageDisplay().setAttribute("class","spinning");
		} else if( this.indeterminate() ){
			_indicator.style.width = "100%";
			this.pageDisplay().setAttribute("class","indeterminate");
		} else {
			_indicator.style.width = this.frame().size().width()*(this.value() - this.minValue())/(this.maxValue() - this.minValue()) + MokaPageSizeUnits;
			_center.style.width = (parseInt(_indicator.style.width) - parseInt(_left.style.width) - parseInt(_right.style.width)) + MokaPageSizeUnits;
			this.pageDisplay().setAttribute("class","determinate");
		}
		
		this.drawCellInRect(	_display,
								MokaRect,rectWithOriginAndSize(MokaPoint.origin(),newDisplaySize));
	}
	
	//Setting the Appearance
	/*MokaProgressIndicatorStyle*/ this.style = function(){
		return _style;
	}	
	/*void*/ this.setStyle = function( aStyle ){
		_style = aStyle;
		if( aStyle == MokaProgressIndicatorSpinningStyle ){
			this.frame().size().setHeight( 30 );
			this.frame().size().setWidth( 30 );
		} else {
			this.frame().size().setHeight( 17 );
			this.frame().size().setWidth( 200 );
		}
	}
	/*bool*/ this.indeterminate = function(){
		if( this.style() == MokaProgressIndicatorBarStyle ){ return _indeterminate; }
		else{ return YES; }
	}	
	/*void*/ this.setIndeterminate = function( yn ){
		if( typeof(yn) != "boolean" ){ return; }
		_indeterminate = yn;
		this.display();
	}
	
	//Controlling the Progress
	/*float*/ this.minValue = function(){
		return _minValue;
	}	
	/*void*/ this.setMinValue = function( aValue ){
		if( aValue < this.maxValue() ){ _minValue = aValue; }
		else{ _minValue = this.maxValue()-1; }
		this.setValue( this.value() );
	}
	/*float*/ this.maxValue = function(){
		return _maxValue;
	}	
	/*void*/ this.setMaxValue = function( aValue ){
		if( aValue > this.minValue() ){ _maxValue = aValue; }
		else{ _maxValue = this.minValue()+1; }
		this.setValue( this.value() );
	}
	/*float*/ this.value = function(){
		return _value;
	}	
	/*void*/ this.setValue = function( aValue ){
		if( aValue < this.minValue() ){ _value = this.minValue(); }
		else if( aValue > this.maxValue() ){ _value = this.maxValue(); }
		else{ _value = aValue; }
		this.display();
	}
	/*void*/ this.incrementBy = function( aValue ){
		this.setValue( this.value() + aValue );
	}
	
}

//Progress Indicator Styles
MokaProgressIndicatorBarStyle		= 0;
MokaProgressIndicatorSpinningStyle	= 1;