function MokaTimedProgressIndicator(timeToComplete){
	this.extend(MokaProgressIndicator);
	
	/*	Progress Timer	*/
	var _progressTimer = MokaTimer.timerWithTimeIntervalTargetSelectorAndRepeat(	25,
																					this,
																					$sel("_increment"),
																					YES );
	
	/*	Time to Complete	*/
	var _timeToComplete = timeToComplete || 0;
	
	
	
	
	
	
	//Setting the time to complete
	/*float*/ this.timeToComplete = function(){
		return _timeToComplete;
	}
	/*void*/ this.setTimeToComplete = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_timeToComplete = aFloat;
		var interval = aFloat/this.frame().size().width();
		if( interval < 25 ){ interval = 25; }
		_progressTimer.setTimeInterval( interval );
	}
	
	//Incrementing
	/*void*/ this._increment = function(){
		var interval = this.timeToComplete()/this.frame().size().width();
		if( interval < 25 ){ interval = 25; }
		
		var incrementAmount = (this.maxValue() - this.minValue())*interval/this.timeToComplete()
		
		this.incrementBy(incrementAmount);
	}	
	/*void*/ this.incrementBy = function( aValue ){
		this.setValue( this.value() + aValue );
		if( this.value() >= this.maxValue() ){
			_progressTime.invalidate();
		}
	}	
}