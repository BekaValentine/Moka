function MokaScroller(){
	this.extend( MokaControl );
	
	/*	Arrows Position	*/
	var _arrowsPosition = MokaScrollerArrowsMaxEnd;
	
	/*	knob proportion	*/
	var _knobProportion = 1;
	
	/*	hit part	*/
	var _hitPart = MokaScrollerNoPart;
	
	/*	Verticality	*/
	var _isVertical = YES;
	
	/*	Screen elements	*/
	var _cap = $makeElement( "div", { into: this.pageDisplay(), id: "cap" } );
	var _knob = $makeElement( "div", { into: this.pageDisplay(), id: "knob" } );
	var _knobUpEnd = $makeElement( "div", { into: _knob, id: "upend" } );
	var _knobMiddle = $makeElement( "div", { into: _knob, id: "middle" } );
	var _knobDownEnd = $makeElement( "div", { into: _knob, id: "downend" } );
	var _lineUp = $makeElement( "div", { into: this.pageDisplay(), id: "lineup" } );
	var _lineDown = $makeElement( "div", { into: this.pageDisplay(), id: "linedown" } );
	
	/*	Downpoint	*/
	var _downPoint = null;
	
	/*	Repeat timer	*/
	var _repeatTimer = null;
	
	/*	Scroll amounts	*/
	var _lineScroll = 14;
	var _pageScroll = 100;
	
	
	
	
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		this.setFrameOrigin( new MokaPoint(0,0) );
		this.setFrameSize( new MokaSize(200,200) );
		this.pageDisplay().style.backgroundColor = "red";
		
		this.display();
		this.setIsContinuous(YES);
		
		_knob.style.zIndex = 2;
		
		$addClassToElement( "enabled primary vertical regular noparts", this.pageDisplay() );
		
		return this;
	}
	
	//Size constraints
	/*void*/ this.constrainSize = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		var newSize = aSize.copy();
		if( this.isVertical() ){ newSize.setWidth( ( this.controlSize() == MokaRegularControlSize ? 14 : 12 ) ); }
		else { newSize.setHeight( ( this.controlSize() == MokaRegularControlSize ? 14 : 12 ) ); }
		return newSize;
	}
	
	//Setting the arrows position
	/*MokaArrowsPosition*/ this.arrowsPosition = function(){
		return _arrowsPosition;
	}	
	/*void*/ this.setArrowsPosition = function(aPosition){
		if( aPosition != 0 && aPosition != 1 ){ return; }
		_arrowsPosition = aPosition;
		$replaceClassOfElement(	/primary|secondary/,
								(aPosition == MokaScrollerArrowsMaxEnd ? "primary" : "secondary"),
								this.pageDisplay() );
		this.display();
	}
	
	//Setting the knob proportion and constraining the value
	/*void*/ this.constrainNumberValue = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		if( aFloat < 0 ){ return 0; }
		else if( aFloat > 1 ){ return 1; }
		else { return aFloat; }
	}
	/*float*/ this.knobProportion = function(){
		return _knobProportion;
	}	
	/*void*/ this.setNumberValueAndKnobProportion = function(aFloat,aProportion){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		if( typeof aProportion == undefined ){ return; }
		if( !MokaNumberIsFloat(aProportion) ){ return; }
		
		if( aProportion < 1 ){
			_knobProportion = aProportion;
			this.setNumberValue(aFloat);
			this.setIsEnabled(YES);
			$removeClassFromElement( /noparts/, this.pageDisplay() );
		} else {
			_knobProportion = 1;
			this.setNumberValue(0);
			this.setIsEnabled(NO);
			$addClassToElement( "noparts", this.pageDisplay() );
		}
		
		
	}
	
	//For autorepeats
	/*void*/ this._decrementLine = function(){
		var newNumberValue = this.numberValue() - this.knobProportion()*(_pageScroll)/( this.isVertical() ? this.frame().size().height() : this.frame().size().width() );
		_repeatTimer.setTimeInterval( 50 );
		if( this.isContinuous() && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
	}
	/*void*/ this._incrementLine = function(){
		var newNumberValue = this.numberValue() + this.knobProportion()*(_pageScroll)/( this.isVertical() ? this.frame().size().height() : this.frame().size().width() );
		_repeatTimer.setTimeInterval( 50 );
		if( this.isContinuous() && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
	}
	/*void*/ this._decrementPage = function(){
		var newNumberValue = this.numberValue() - this.knobProportion()*(_lineScroll)/( this.isVertical() ? this.frame().size().height() : this.frame().size().width() );
		_repeatTimer.setTimeInterval( 50 );
		if( this.isContinuous() && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
	}
	/*void*/ this._incrementPage = function(){
		var newNumberValue = this.numberValue() + this.knobProportion()*(_lineScroll)/( this.isVertical() ? this.frame().size().height() : this.frame().size().width() );
		_repeatTimer.setTimeInterval( 50 );
		if( this.isContinuous() && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
	}
		
	//testing for hit part
	/*MokaScrollerPart*/ this.testPart = function(aPoint){
		if( typeof aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		if( !this.frame().containsPoint(aPoint.add(this.frame().origin())) ){ return MokaScrollerNoPart; }
		
		var knobWidth = ( this.isVertical() ? (this.controlSize() == MokaRegularControlSize ? 14 : 12 ) : (this.frame().size().width() - 3*this.frame().size().height())*this.knobProportion() );
		var knobHeight = ( this.isVertical() ? (this.frame().size().height() - 3*this.frame().size().width())*this.knobProportion() : (this.controlSize() == MokaRegularControlSize ? 14 : 12 ) );
		var knobX = ( this.isVertical() ? 0 : (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 0.5 : 1.5 )*this.frame().size().height() + (this.frame().size().width() - 3*this.frame().size().height() - knobWidth)*this.numberValue() );
		var knobY = ( this.isVertical() ? (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 0.5 : 1.5 )*this.frame().size().width() + (this.frame().size().height() - 3*this.frame().size().width() - knobHeight)*this.numberValue() : 0 );
		
		var testVal = ( this.isVertical() ? aPoint.y() : aPoint.x() );
		
		if( this.arrowsPosition() == MokaScrollerArrowsMaxEnd ){
			if( testVal < ( this.controlSize() == MokaRegularControlSize ? 7 : 6 ) ){ return MokaScrollerNoPart; }
			else if( testVal < ( this.isVertical() ? knobY : knobX ) ){ return MokaScrollerDecrementPage; }
			else if( testVal < ( this.isVertical() ? knobY + knobHeight : knobX + knobWidth ) ){ return MokaScrollerKnob; }
			else if( testVal < ( this.isVertical() ? this.frame().size().height() : this.frame().size().width() ) - 2*( this.controlSize() == MokaRegularControlSize ? 14 : 12 ) ){ return MokaScrollerIncrementPage; }
			else if( testVal < ( this.isVertical() ? this.frame().size().height() : this.frame().size().width() ) - ( this.controlSize() == MokaRegularControlSize ? 14 : 12 ) ){ return MokaScrollerDecrementLine; }
			else { return MokaScrollerIncrementLine; }
		} else {
			if( testVal < ( this.controlSize() == MokaRegularControlSize ? 14 : 12 ) ){ return MokaScrollerDecrementLine; }
			else if( testVal < ( this.isVertical() ? knobY : knobX ) ){ return MokaScrollerDecrementPage; }
			else if( testVal < ( this.isVertical() ? knobY + knobHeight : knobX + knobWidth ) ){ return MokaScrollerKnob; }
			else if( testVal < ( this.isVertical() ? this.frame().size().height() : this.frame().size().width() ) - ( this.controlSize() == MokaRegularControlSize ? 14 : 12 ) ){ return MokaScrollerIncrementPage; }
			else { return MokaScrollerIncrementLine; }
		}
				
	}
	
	//Set verticality
	/*bool*/ this.isVertical = function(){
		return _isVertical;
	}	
	/*void*/ this.setIsVertical = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		if( this.isVertical() != yn ){
			_isVertical = yn;
			this.setFrameSize(new MokaSize(200,200));
			
			$replaceClassOfElement(	/vertical|horizontal/,
									( yn ? "vertical" : "horizontal"),
									this.pageDisplay() );
			
		}
		
	}
	
	//Setting the scroll distances
	/*void*/ this._setLineScroll = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_lineScroll = aFloat;
	}
	/*void*/ this._setPageScroll = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_pageScroll = aFloat;
	}
		
	//Drawing
	/*void*/ this.draw = function(){
		if( (this.isVertical() && this.frame().size().height() < 58) || (!this.isVertical() && this.frame().size().width() < 58) ){ this.setIsEnabled( NO ); }
		
		var newKnobOrigin;
		var newKnobSize;
		
		var knobWidth = ( this.isVertical() ? (this.controlSize() == MokaRegularControlSize ? 14 : 12 ) : (this.frame().size().width() - 3*this.frame().size().height())*this.knobProportion() );
		var knobHeight = ( this.isVertical() ? (this.frame().size().height() - 3*this.frame().size().width())*this.knobProportion() : (this.controlSize() == MokaRegularControlSize ? 14 : 12 ) );
		
		if( this.isVertical() ){
			var knobHeight = this.knobProportion()*(this.frame().size().height() - (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 2.5 : 2.0)*this.frame().size().width());
			newKnobSize = new MokaSize(this.frame().size().width(), (knobHeight<this.frame().size().width()?this.frame().size().width():knobHeight));
			newKnobOrigin = new MokaPoint(0,(this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 0.5 : 1)*this.frame().size().width() + (this.frame().size().height() - (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 2.5 : 2 )*this.frame().size().width() - knobHeight)*this.numberValue() );
		} else {
			var knobWidth = this.knobProportion()*(this.frame().size().width() - (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 2.5 : 2.0)*this.frame().size().height());
			newKnobSize = new MokaSize( (knobWidth<this.frame().size().height()?this.frame().size().height():knobWidth),this.frame().size().height());
			newKnobOrigin = new MokaPoint((this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 0.5 : 1)*this.frame().size().height() + (this.frame().size().width() - (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 2.5 : 2 )*this.frame().size().height() - knobWidth)*this.numberValue(), 0);
		}
	 
		_knob.style.left = newKnobOrigin.x() + MokaPageSizeUnits;
		_knob.style.top = newKnobOrigin.y() + MokaPageSizeUnits;
		_knob.style.height = newKnobSize.height() + MokaPageSizeUnits;
		_knob.style.width = newKnobSize.width() + MokaPageSizeUnits;
		
		if( this.isVertical() ){
			_knobMiddle.style.width = "100%";
			_knobMiddle.style.height = (newKnobSize.height() - 10) + MokaPageSizeUnits;
		} else {
			_knobMiddle.style.height = "100%";
			_knobMiddle.style.width = (newKnobSize.width() - 10) + MokaPageSizeUnits;
		}
		
	}
	
	//Mouse events
	/*MokaScrollerHitPart*/ this.hitPart = function(){
		return _hitPart;
	}	
	/*void*/ this.mouseDown = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( !this.isEnabled() ){ return; }
		
		_downPoint = this.convertPointFromPage(theEvent.mouseLocation());
		
		_hitPart = this.testPart(_downPoint);
		
		var knobWidth = ( this.isVertical() ? (this.controlSize() == MokaRegularControlSize ? 14 : 12 ) : (this.frame().size().width() - 3*this.frame().size().height())*this.knobProportion() );
		var knobHeight = ( this.isVertical() ? (this.frame().size().height() - 3*this.frame().size().width())*this.knobProportion() : (this.controlSize() == MokaRegularControlSize ? 14 : 12 ) );
		var knobX = ( this.isVertical() ? 0 : (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 0.5 : 1.5 )*this.frame().size().height() + (this.frame().size().width() - 3*this.frame().size().height() - knobWidth)*this.numberValue() );
		var knobY = ( this.isVertical() ? (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 0.5 : 1.5 )*this.frame().size().width() + (this.frame().size().height() - 3*this.frame().size().width() - knobHeight)*this.numberValue() : 0 );
		
		if( this.hitPart() == MokaScrollerKnob ){
			_downPoint = _downPoint.subtract(new MokaPoint(knobX,knobY));
		} else {
		
			var selectorName;
			var pageContribution = 0;
			var lineContribution = 0;
			switch(this.hitPart()){
				case MokaScrollerDecrementPage:
					selectorName = "_decrementPage";
					pageContribution = -1;
					lineContribution = 1;
					break;
				case MokaScrollerIncrementPage:
					selectorName = "_incrementPage";
					pageContribution = 1;
					lineContribution = -1;
					break;
				case MokaScrollerDecrementLine:
					selectorName = "_decrementLine";
					lineContribution = -1;
					$addClassToElement( "down", _lineUp );
					break;
				case MokaScrollerIncrementLine:
					selectorName = "_incrementLine";
					lineContribution = 1;
					$addClassToElement( "down", _lineDown );
					break;
			}
			
			var newNumberValue = this.numberValue() + this.knobProportion()*(pageContribution*_pageScroll + lineContribution*_lineScroll)/( this.isVertical() ? this.frame().size().height() : this.frame().size().width() );
			
			this.setNumberValue( newNumberValue );
		
			_repeatTimer = MokaTimer.scheduledTimerWithTimeIntervalTargetSelectorAndRepeat(500,this,new MokaSelector(selectorName),NO);
		
		}
		
		if( this.isContinuous() && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
		
		MokaApp.responderIsCapturingPagewideMouseEvents(this,YES);
		
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( !this.isEnabled() ){ return; }
		if( this.hitPart() != MokaScrollerKnob ){ return; }
		
		var newValue;
		var scrollableRegion;
		var point = this.convertPointFromPage(theEvent.mouseLocation());
		
		var knobWidth = ( this.isVertical() ? (this.controlSize() == MokaRegularControlSize ? 14 : 12 ) : (this.frame().size().width() - 3*this.frame().size().height())*this.knobProportion() );
		var knobHeight = ( this.isVertical() ? (this.frame().size().height() - 3*this.frame().size().width())*this.knobProportion() : (this.controlSize() == MokaRegularControlSize ? 14 : 12 ) );
		
		if( this.isVertical() ){
			scrollableRegion = this.frame().size().height() - (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 2.5 : 2 )*this.frame().size().width() - knobHeight;
			newValue = (point.y() - _downPoint.y() - (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 0.5 : 1)*this.frame().size().width())/scrollableRegion;
		} else {
			scrollableRegion = this.frame().size().width() - (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 2.5 : 2 )*this.frame().size().height() - knobWidth;
			newValue = (point.x() - _downPoint.x() - (this.arrowsPosition() == MokaScrollerArrowsMaxEnd ? 0.5 : 1)*this.frame().size().height())/scrollableRegion;
		}
		
		this.setNumberValue( newValue );
		if( this.isContinuous() && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
		
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		$removeClassFromElement( /down/, _lineUp );
		$removeClassFromElement( /down/, _lineDown );
		
		if( !this.isContinuous() && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}		
		
		if( _repeatTimer ){ _repeatTimer.invalidate(); }
		MokaApp.responderIsCapturingPagewideMouseEvents(this,NO);
	}
	
	
}

//Scroller Arrow Positions
MokaScrollerArrowsMinEnd	= 0;
MokaScrollerArrowsMaxEnd	= 1;

//Scroller parts
MokaScrollerNoPart			= 0;
MokaScrollerDecrementPage	= 1;
MokaScrollerKnob			= 2;
MokaScrollerIncrementPage	= 3;
MokaScrollerDecrementLine	= 4;
MokaScrollerIncrementLine	= 5;