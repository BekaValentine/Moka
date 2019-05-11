function MokaSlider(){
	this.extend( MokaControl );
	
	/*	Sliders Appearance	*/
	var _altIncrementValue = -1;
	var _sliderType = MokaVerticalSlider;
	
	/*	Value range	*/
	var _maxValue = 100;
	var _minValue = 0;
	
	/*	Tick Marks	*/
	var _allowsTickMarkValuesOnly = NO;
	var _numberOfTickMarks = 0;
	var _tickMarkPosition = MokaTickMarksRight;
	var _tickMarkContainer = new MokaCell;
	
	/*	Downpoint	*/
	var _downPoint = null;
	
	/*	Screen elements	*/
	var _tickmarks = $makeElement( "div", { into: this.skin(), id: "tickmarks" } );
	var _topLeft = $makeElement( "div", { into: this.skin(), id: "topleft" } );
	var _middle = $makeElement( "div", { into: this.skin(), id: "middle" } );
	var _bottomRight = $makeElement( "div", { into: this.skin(), id: "bottomright" } );
	var _knob = $makeElement( "div", { into: this.skin(), id: "knob" } );
	
	
	
	
	
	
	
	
	
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		//_tickMarkContainer.init();
		//_tickMarkContainer.setBackgroundColor("green");
		
		this.setFrameSize( new MokaSize(200,200) );
		//this.pageDisplay().style.backgroundColor = "red";
		
		$addClassToElement( "notickmarks tickmarksleft enabled vertical regular", this.pageDisplay() );
				
		this.display();
		this.setIsContinuous(YES);
		return this;
	}
	
	//Draw
	/*void*/ this.draw = function(){ 
		this.eraseAll();
		
		_middle.style.width = "";
		_middle.style.height = "";
		if( this.sliderType() == MokaVerticalSlider ){
			_middle.style.height = (this.frame().size().height() - 2*(this.controlSize() == MokaRegularControlSize ? 15 : 11)) + "px";
		} else if( this.sliderType() == MokaHorizontalSlider ){
			_middle.style.width = (this.frame().size().width() - 2*(this.controlSize() == MokaRegularControlSize ? 15 : 11)) + "px";
		}
		
		var tickMarkWidth = (this.numberOfTickMarks() != 0 ? 1 : 0 )*(this.sliderType() == MokaCircularSlider ? 3 : (this.controlSize() == MokaRegularControlSize ? 8 : 6) );
		
		var newKnobSize = new MokaSize;
		if( this.sliderType() != MokaCircularSlider ){
			var lowest = ( this.frame().size().height() < this.frame().size().width() ? this.frame().size().height() : this.frame().size().width() ) - tickMarkWidth;
			newKnobSize = new MokaSize(lowest + (this.sliderType() == MokaVerticalSlider && this.numberOfTickMarks() > 0 ? 2 : 0),lowest + (this.sliderType() == MokaHorizontalSlider && this.numberOfTickMarks() > 0 ? 2 : 0));
		} else {
			newKnobSize = new MokaSize(4,4);
		}
		
		var newKnobOrigin;
		var knobWidth = 0;
		var knobHeight = 0;
		var proportion = this.numberValue()/(this.maxValue() - this.minValue());
		var offset = 0;
		if( this.sliderType() == MokaHorizontalSlider ){
			
			knobWidth = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 );
			knobHeight = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 ) + ( this.numberOfTickMarks() > 0 ? 3 : 0 );
			
			offset += (this.tickMarkPosition() == MokaTickMarksAbove ? 1 : 0 )*tickMarkWidth;
			newKnobOrigin = new MokaPoint( (this.frame().size().width()-knobWidth)*proportion, offset - (this.sliderType() == MokaHorizontalSlider && this.numberOfTickMarks() > 0 && this.tickMarkPosition() == MokaTickMarksAbove ? 2 : 0));
			
			if( this.numberOfTickMarks() > 0 ){
				while( _tickmarks.childNodes.length != 0 ){
					_tickmarks.removeChild(_tickmarks.childNodes[0]);
				}
				var spanBetweenTickMarks = (this.frame().size().width() - 2*(this.controlSize() == MokaRegularControlSize ? 7 : 5))/(this.numberOfTickMarks() - 1);
				var positionOfTickMark = 0;
				for( var i = 0; i < this.numberOfTickMarks(); i++ ){
					var tickMark = document.createElement("div");
					tickMark.style.width = "1px";
					tickMark.style.height = "100%";
					tickMark.style.position = "absolute";
					tickMark.style.top = 0;
					tickMark.style.left = (this.controlSize() == MokaRegularControlSize ? 7 : 5) + positionOfTickMark + "px";
					tickMark.style.backgroundColor = ( this.isEnabled() ? "#999" : "#CCC" );
					_tickmarks.appendChild(tickMark);
					positionOfTickMark += spanBetweenTickMarks;
				}
			}
						
		} else if( this.sliderType() == MokaVerticalSlider ){
			
			knobHeight = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 );
			knobWidth = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 ) + ( this.numberOfTickMarks() > 0 ? 3 : 0 );
			
			offset += (this.tickMarkPosition() == MokaTickMarksLeft ? 1 : 0 )*tickMarkWidth;
			newKnobOrigin = new MokaPoint( offset - (this.sliderType() == MokaVerticalSlider && this.numberOfTickMarks() > 0 && this.tickMarkPosition() == MokaTickMarksLeft ? 2 : 0), this.frame().size().height() - (this.frame().size().height()-knobHeight)*proportion - knobHeight);
			
			if( this.numberOfTickMarks() > 0 ){
				while( _tickmarks.childNodes.length != 0 ){
					_tickmarks.removeChild(_tickmarks.childNodes[0]);
				}
				var spanBetweenTickMarks = (this.frame().size().height() - 2*(this.controlSize() == MokaRegularControlSize ? 7 : 5))/(this.numberOfTickMarks() - 1);
				var positionOfTickMark = 0;
				for( var i = 0; i < this.numberOfTickMarks(); i++ ){
					var tickMark = document.createElement("div");
					tickMark.style.height = "1px";
					tickMark.style.width = "100%";
					tickMark.style.position = "absolute";
					tickMark.style.left = 0;
					tickMark.style.top = (this.controlSize() == MokaRegularControlSize ? 7 : 5) + positionOfTickMark + "px";
					tickMark.style.backgroundColor = ( this.isEnabled() ? "#999" : "#CCC" );
					_tickmarks.appendChild(tickMark);
					positionOfTickMark += spanBetweenTickMarks;
				}
			}
			
		} else {
			
			var radius = this.frame().size().width()/2 - 6 - tickMarkWidth;
			newKnobOrigin = new MokaPoint( radius*Math.cos(2*Math.PI*this.numberValue()/(this.maxValue() - this.minValue())), radius*Math.sin(2*Math.PI*this.numberValue()/(this.maxValue() - this.minValue())) );
			var swap = newKnobOrigin.x();
			newKnobOrigin.setX( newKnobOrigin.y() );
			newKnobOrigin.setY( -swap );
			newKnobOrigin = newKnobOrigin.add( new MokaPoint(this.frame().size().width()/2 - 1,this.frame().size().height()/2 - 1) );
			
			if( this.numberOfTickMarks() > 0 ){
				while( _tickmarks.childNodes.length != 0 ){
					_tickmarks.removeChild(_tickmarks.childNodes[0]);
				}
				var tickMarkRadius = this.frame().size().width()/2 - 1;
				var spanBetweenTickMarks = 2*Math.PI/this.numberOfTickMarks();
				var positionOfTickMark = 0;
				for( var i = 0; i < this.numberOfTickMarks(); i++ ){
					var tickMark = document.createElement("div");
					tickMark.style.height = "2px";
					tickMark.style.width = "2px";
					tickMark.style.position = "absolute";
					tickMark.style.left = this.frame().size().width()/2 - 1/2 + tickMarkRadius*Math.cos(positionOfTickMark - Math.PI/2);
					tickMark.style.top = this.frame().size().height()/2 - 1/2 + tickMarkRadius*Math.sin(positionOfTickMark - Math.PI/2);
					tickMark.style.backgroundColor = ( this.isEnabled() ? "#999" : "#CCC" );
					_tickmarks.appendChild(tickMark);
					positionOfTickMark += spanBetweenTickMarks;
				}
			}
			
		}
		
		_knob.style.left = newKnobOrigin.x() + "px";
		_knob.style.top = newKnobOrigin.y() + "px";
		
		if( this.sliderType() == MokaHorizontalSlider ){ _knob.style.top = ""; }
		else if( this.sliderType() == MokaVerticalSlider ){ _knob.style.left = ""; }
		
	}
	
	//Constrain size
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( typeof aSize == undefined ){ return this.frame().size(); }
		if( typeof(aSize.isKindOfClass) != "function" ){ return this.frame().size(); }
		if( !aSize.isKindOfClass(MokaSize) ){ return this.frame().size(); }
		
		if( aSize.width() < 0 ){ aSize.setWidth( 0 ); }
		if( aSize.height() < 0 ){ aSize.setHeight( 0 ); }
		
		if( this.sliderType() == MokaHorizontalSlider ){
			aSize.setHeight( ( this.controlSize() == MokaRegularControlSize ? 15 : 11 ) + ( this.numberOfTickMarks() == 0 ? 0 : ( this.controlSize() == MokaRegularControlSize ? 8 : 6 ) ) );
		} else if( this.sliderType() == MokaVerticalSlider ){
			aSize.setWidth( ( this.controlSize() == MokaRegularControlSize ? 15 : 11 ) + ( this.numberOfTickMarks() == 0 ? 0 : ( this.controlSize() == MokaRegularControlSize ? 8 : 6 ) ) );
		} else {
			aSize.setWidth( ( this.controlSize() == MokaRegularControlSize ? 30 : 20 ) + 2*( this.numberOfTickMarks() == 0 ? 0 : 3 ) );
			
			aSize.setHeight( ( this.controlSize() == MokaRegularControlSize ? 30 : 20 ) + 2*( this.numberOfTickMarks() == 0 ? 0 : 3 ) );
		}
		
		return aSize;
		
	}
	
	//Modifying the sliders appearance
	/*float*/ this.altIncrementValue = function(){
		return _altIncrementValue;
	}	
	/*void*/ this.setAltIncrementValue = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		_altIncrementValue = aFloat;
	}
	/*MokaSliderType*/ this.sliderType = function(){
		return _sliderType;
	}	
	/*void*/ this.setSliderType = function(aSliderType){
		if( aSliderType != 0 && aSliderType != 1 && aSliderType != 2 ){ return; }
		if( aSliderType == this.sliderType() ){ return; }
		
		_sliderType = aSliderType;
				
		var type = "";
		var newTickMarkPosition = this.tickMarkPosition();
		if( aSliderType == MokaVerticalSlider ){
			type = "vertical";
			newTickMarkPosition = MokaTickMarksLeft;
		} else if( aSliderType == MokaHorizontalSlider ){
			type = "horizontal";
			newTickMarkPosition = MokaTickMarksAbove;
		} else if( aSliderType == MokaCircularSlider ){
			type = "circular";
		}
		
		$replaceClassOfElement( /horizontal|vertical|circular/, type, this.pageDisplay() );
		this.setFrameSize(new MokaSize(200,200));
		this.setTickMarkPosition(newTickMarkPosition);
	}
	
	//Setting the value range
	/*float*/ this.maxValue = function(){
		return _maxValue;
	}	
	/*void*/ this.setMaxValue = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		_maxValue = aFloat;
		this.setNumberValue( this.numberValue() );
	}
	/*float*/ this.minValue = function(){
		return _minValue;
	}	
	/*void*/ this.setMinValue = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		_minValue = aFloat;
		this.setNumberValue( this.numberValue() );
	}
	/*float*/ this.constrainNumberValue = function(aFloat){
		if( typeof aFloat == undefined ){ return this.numberValue(); }
		if( !MokaNumberIsFloat(aFloat) ){ return this.numberValue(); }
		
		if( aFloat > this.maxValue() ){ aFloat = this.maxValue(); }
		if( aFloat < this.minValue() ){ aFloat = this.minValue(); }
		
		return ( this.allowsTickMarkValuesOnly() ? this.closestTickMarkValueToValue(aFloat) : aFloat );
	}
	
	//Managing tick marks
	/*bool*/ this.allowsTickMarkValuesOnly = function(){
		return _allowsTickMarkValuesOnly;
	}	
	/*void*/ this.setAllowsTickMarkValuesOnly = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		_allowsTickMarkValuesOnly = yn;
		this.setNumberValue( this.numberValue() );
	}
	/*int*/ this.numberOfTickMarks = function(){
		return _numberOfTickMarks;
	}	
	/*void*/ this.setNumberOfTickMarks = function(anInt){
		if( !is(anInt,"int") ){ return; }
		_numberOfTickMarks = anInt;
		this.setFrameSize(this.frame().size());
		this.setNumberValue( this.numberValue() );
		
		$replaceClassOfElement( /hastickmarks|notickmarks/, ( anInt == 0 ? "notickmarks" : "hastickmarks" ), this.pageDisplay() );
		
	}
	/*MokaTickMarkPosition*/ this.tickMarkPosition = function(){
		return _tickMarkPosition;
	}	
	/*void*/ this.setTickMarkPosition = function(aTickMarkPosition){
		if( typeof aTickMarkPosition == undefined ){ return; }
		if( !MokaNumberIsInt(aTickMarkPosition) ){ return; }
		if( aTickMarkPosition < 0 || aTickMarkPosition > 4 ){ return; }
		_tickMarkPosition = aTickMarkPosition;
		
		var pos = "";
		switch(aTickMarkPosition){
			case MokaTickMarksLeft: pos = "tickmarksleft"; break;
			case MokaTickMarksRight: pos = "tickmarksright"; break;
			case MokaTickMarksAbove: pos = "tickmarksabove"; break;
			case MokaTickMarksBelow: pos = "tickmarksbelow"; break;
		}
		
		$replaceClassOfElement( /tickmarksleft|tickmarksright|tickmarksabove|tickmarksbelow/, pos, this.pageDisplay() );
		
		this.display();
		
	}
	/*float*/ this.closestTickMarkValueToValue = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		if( this.numberOfTickMarks() == 0 ){ return aFloat; }
		else if( this.numberOfTickMarks() == 1 ){ return (this.maxValue() - this.minValue())/2; }
		
		if( aFloat < this.minValue() ){ aFloat = this.minValue(); }
		else if( aFloat > this.maxValue() ){ aFloat = this.maxValue(); }
		
		var tms = (this.maxValue() - this.minValue())/(this.numberOfTickMarks() - 1*(this.sliderType() == MokaCircularSlider ? 0 : 1 ));
		var partial = aFloat%tms;
		var newVal = aFloat - partial + tms*Math.round( partial/tms );
		return ( newVal == this.maxValue() && this.sliderType() == MokaCircularSlider ? this.minValue() : newVal );
	}
	/*int*/ this.indexOfTickMarkAtPoint = function(aPoint){
		if( typeof aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		if( this.numberOfTickMarks() < 2 ){ return 0; }
		
		var knobWidth = (this.controlSize() == MokaRegularControlSize ? 15 : 11 ) + ( this.numberOfTickMarks() == 0 ? 0 :(this.controlSize() == MokaRegularControlSize ? 8 : 6 ));
		var knobHeight = (this.controlSize() == MokaRegularControlSize ? 15 : 11 )  + ( this.numberOfTickMarks() == 0 ? 0 :(this.controlSize() == MokaRegularControlSize ? 8 : 6 ));
		
		var proportion;
		if( this.sliderType() == MokaHorizontalSlider ){
			proportion = aPoint.x()/(this.frame().size().width() - knobWidth);
		} else if( this.sliderType() == MokaVerticalSlider ){
			proportion = (this.frame().size().height() - aPoint.y() - knobHeight)/(this.frame().size().height() - knobHeight);
		} else {
			var point = aPoint.subtract( new MokaPoint(this.frame().size().width()/2,this.frame().size().height()/2) );
			proportion = ((point.x() < 0 ? 3 : 1)*Math.PI/2 + Math.atan(point.y()/point.x()))/(2*Math.PI);
		}
		
		var value = this.minValue() + proportion*(this.maxValue() - this.minValue());
		
		if( value < this.minValue() ){ return 0; }
		else if( value > this.maxValue() ){ return this.numberOfTickMarks() - 1; }
		else {
			var tms = (this.maxValue() - this.minValue())/(this.numberOfTickMarks() - 1*(this.sliderType() == MokaCircularSlider ? 0 : 1 ));
			var partial = value%tms;
			var newVal = value - partial + tms*Math.round( partial/tms );
			newVal = ( newVal == this.maxValue() && this.sliderType() == MokaCircularSlider ? this.minValue() : newVal );
			return newVal/tms;
		}
	}
	/*float*/ this.tickMarkValueAtIndex = function(anInt){
		if( typeof anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		if( this.numberOfTickMarks() == 0 ){ return this.minValue(); }
		else if( this.numberOfTickMarks() == 1 ){ return (this.maxValue() - this.minValue())/2; }
		else if( anInt < 0 ){ return this.minValue(); }
		else if( anInt > this.numberOfTickMarks() ){ return this.maxValue(); }
		else { return this.minValue() + anInt*(this.maxValue() - this.minValue())/this.numberOfTickMarks(); }
	}

	//Mouse event overrides
	/*void*/ this.mouseDown = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( !this.isEnabled() ){ return; }
		
		var currentPoint = this.convertPointFromPage(theEvent.mouseLocation());
		
		var knobWidth = 0;
		var knobHeight = 0;
		
		if( this.sliderType() == MokaHorizontalSlider ){
			
			knobWidth = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 );
			knobHeight = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 ) + ( this.numberOfTickMarks() > 0 ? 3 : 0 );
						
		} else if( this.sliderType() == MokaVerticalSlider ){
			
			knobHeight = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 );
			knobWidth = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 ) + ( this.numberOfTickMarks() > 0 ? 3 : 0 );
			
		} else {
			
			knobWidth = 4;
			knobHeight = 4;
			
		}
		
		var knobX = ( this.sliderType() == MokaVerticalSlider ? 0 : this.numberValue()*(this.frame().size().width() - knobWidth)/(this.maxValue() - this.minValue()) );
		var knobY = ( this.sliderType() == MokaVerticalSlider ? (this.frame().size().height() - knobHeight)*(1 - this.numberValue()/(this.maxValue() - this.minValue())) : 0 );
		var knobRect = new MokaRect( knobX, knobY, knobWidth, knobHeight );
		
		if( knobRect.containsPoint(currentPoint) ){
			_downPoint = currentPoint.subtract(knobRect.origin());
		} else {
			_downPoint = new MokaPoint(knobWidth/2,knobHeight/2);
		}
		
		var currentProportion;
		if( this.sliderType() == MokaHorizontalSlider ){
			currentProportion = (currentPoint.x() - _downPoint.x())/(this.frame().size().width() - knobWidth);
		} else if( this.sliderType() == MokaVerticalSlider ){
			currentProportion = (this.frame().size().height() - currentPoint.y() - knobHeight + _downPoint.y())/(this.frame().size().height() - knobHeight);
		} else {
			var point = currentPoint.subtract( new MokaPoint(this.frame().size().width()/2,this.frame().size().height()/2) );
			currentProportion = ((point.x() < 0 ? 3 : 1)*Math.PI/2 + Math.atan(point.y()/point.x()))/(2*Math.PI);
		}
		
		this.setNumberValue(this.minValue() + currentProportion*(this.maxValue() - this.minValue()));
		if( this.isContinuous() && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
		MokaApp.responderIsCapturingPagewideMouseEvents(this,YES);
		
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( !this.isEnabled() ){ return; }
		
		if( !this.isContinuous() && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
		
		MokaApp.responderIsCapturingPagewideMouseEvents(this,NO);
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( !this.isEnabled() ){ return; }
		
		var currentPoint = this.convertPointFromPage(theEvent.mouseLocation());
		
		var knobWidth = 0;
		var knobHeight = 0;
		
		if( this.sliderType() == MokaHorizontalSlider ){
			
			knobWidth = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 );
			knobHeight = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 ) + ( this.numberOfTickMarks() > 0 ? 3 : 0 );
						
		} else if( this.sliderType() == MokaVerticalSlider ){
			
			knobHeight = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 );
			knobWidth = ( this.controlSize() == MokaRegularControlSize ? 15 : 11 ) + ( this.numberOfTickMarks() > 0 ? 3 : 0 );
			
		} else {
			
			knobWidth = 4;
			knobHeight = 4;
			
		}
		
		var currentProportion;
		if( this.sliderType() == MokaHorizontalSlider ){
			currentProportion = (currentPoint.x() - _downPoint.x())/(this.frame().size().width() - knobWidth);
		} else if( this.sliderType() == MokaVerticalSlider ){
			currentProportion = (this.frame().size().height() - currentPoint.y() - knobHeight + _downPoint.y())/(this.frame().size().height() - knobHeight);
		} else {
			var point = currentPoint.subtract( new MokaPoint(this.frame().size().width()/2,this.frame().size().height()/2) );
			currentProportion = ((point.x() < 0 ? 3 : 1)*Math.PI/2 + Math.atan(point.y()/point.x()))/(2*Math.PI);
		}
		
		if( theEvent.modifierFlags() & MokaAlternateKey ){
			this.setNumberValue(this.closestTickMarkValueToValue(this.minValue() + currentProportion*(this.maxValue() - this.minValue())));
		} else {
			this.setNumberValue(this.minValue() + currentProportion*(this.maxValue() - this.minValue()));
		}
		
		if( this.isContinuous() && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
	}
	
	
	
}

//Slider Types
MokaHorizontalSlider	= 0;
MokaVerticalSlider		= 1;
MokaCircularSlider		= 2;

//Slider Sizes
MokaRegularSliderSize	= 0;
MokaSmallSliderSize		= 1;

//Slider Tick Mark Positions
MokaNoTickMarks		= 0;
MokaTickMarksBelow	= 1;
MokaTickMarksAbove	= 2;
MokaTickMarksLeft	= 3;
MokaTickMarksRight	= 4;