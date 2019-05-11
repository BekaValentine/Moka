function MokaStepper(){
	this.extend( MokaControl );

	/*	Values and ranges	*/
	var _maxValue = 100;
	var _minValue = 0;
	var _increment = 1;
	
	/*	Stepper behavior	*/
	var _autorepeat = YES;
	var _valueWraps = YES;
	var _repeatInvocation = new MokaInvocation;
	var _repeatTimer = null;
	
	/*	Cells	*/
	var _incrementCell = new MokaCell;
	var _decrementCell = new MokaCell;
	
	
	
	
	
	// Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_repeatInvocation.init();
		
		
		_incrementCell.init();
		_incrementCell.setBackgroundColor( "red" );
		this.drawCellInRect( _incrementCell, MokaRect.rectWithOriginAndSize( new MokaPoint(0,0), new MokaSize(13,11) ) );
		
		_decrementCell.init();
		_decrementCell.setBackgroundColor( "blue" );
		this.drawCellInRect( _decrementCell, MokaRect.rectWithOriginAndSize( new MokaPoint(0,11), new MokaSize(13,11) ) );
					
		this.pageDisplay().style.backgroundColor = "white";
		this.setFrameSize(new MokaSize(13,22));
		this.setNumberValue(0);
		_repeatInvocation.setTarget( this );
		return this;
	}
	
	//Draw
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		this.setDrawingColor(MokaColor.colorWithWA(0,0.5));
		this.fillRectangle(new MokaRectangle(0,(_downPoint.x() >= 13 ? 13 : 0),13,11))
	}
	
	
	//Modifying the values and ranges
	/*float*/ this.maxValue = function(){
		return _maxValue;
	}	
	/*void*/ this.setMaxValue = function(newMax){
		if( !newMax ){ return; }
		if( !MokaNumberIsFloat(newMax) ){ return; }
		_maxValue = newMax;
	}
	/*float*/ this.minValue = function(){
		return _minValue;
	}	
	/*void*/ this.setMinValue = function(newMin){
		if( !newMin ){ return; }
		if( !MokaNumberIsFloat(newMin) ){ return; }
		_minValue = newMin;
	}
	/*float*/ this.increment = function(){
		return _increment;
	}
	
	/*void*/ this.setIncrement = function(newIncrement){
		if( !newIncrement ){ return; }
		if( !MokaNumberIsFloat(newIncrement) ){ return; }
		_increment = newIncrement;
	}
	
	//Controlling behavior
	/*bool*/ this.autorepeat = function(){
		return _autorepeat;
	}	
	/*void*/ this.setAutorepeat = function(yn){
		if( !yn ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		_autorepeat = yn;
	}
	/*bool*/ this.valueWraps = function(){
		return _valueWraps;
	}	
	/*void*/ this.setValueWraps = function(yn){
		if( !yn ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		_valueWraps = yn;
	}
	
	//Constrain the size
	/*MokaRect*/ this.constrainSize = function(aSize){
		if( typeof aSize == undefined ){ return this.size(); }
		if( typeof(aSize.isKindOfClass) != "function" ){ return this.frame().size(); }
		if( !aSize.isKindOfClass(MokaSize) ){ return this.frame().size(); }
		
		return new MokaSize(13,22);
	}
	
	//Overriding the value setter
	/*void*/ this.constrainNumberValue = function( aNumber ){
		if( typeof aNumber == undefined ){ return; }
		if( !MokaNumberIsFloat(aNumber) ){ return; }
		
		if( aNumber > this.maxValue() ){ aNumber = ( this.valueWraps() ? this.minValue() : this.maxValue() ); }
		if( aNumber < this.minValue() ){ aNumber = ( this.valueWraps() ? this.maxValue() : this.minValue() ); }
		
		return aNumber;
		
	}
	/*void*/ this.incrementValue = function(){
		if( _repeatTimer.isValid() ){
			_repeatTimer.setTimeInterval( 100 );
			this.setNumberValue( this.numberValue() + this.increment() );
		}
	}
	/*void*/ this.decrementValue = function(){
		if( _repeatTimer.isValid() ){
			_repeatTimer.setTimeInterval( 100 );
			this.setNumberValue( this.numberValue() - this.increment() );
		}
	}
		
	//mouse override
	/*void*/ this.mouseDown = function(anEvent){
		if( !anEvent ){ return; }
		if( typeof(anEvent.isKindOfClass) != "function" ){ return; }
		if( !anEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var newValue;
			
		if( this.convertPointFromPage(anEvent.mouseLocation()).y() < 11 ){
			newValue = this.numberValue() + this.increment();
			_repeatInvocation.setSelector( new MokaSelector("incrementValue") );
		} else {
			newValue = this.numberValue() - this.increment();
			_repeatInvocation.setSelector( new MokaSelector("decrementValue") );
		}
		
		this.setNumberValue( newValue );
		if( this.autorepeat() ){
			_repeatTimer = MokaTimer.scheduledTimerWithTimeIntervalInvocationAndRepeat( 500, _repeatInvocation, YES );
		}
		
	}
	/*void*/ this.mouseUp = function(anEvent){
		if( !anEvent ){ return; }
		if( typeof(anEvent.isKindOfClass) != "function" ){ return; }
		if( !anEvent.isKindOfClass(MokaEvent) ){ return; }
		_repeatTimer.invalidate();
	}
	
	
}