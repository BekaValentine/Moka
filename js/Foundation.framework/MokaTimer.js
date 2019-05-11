function MokaTimer(){
	this.extend(MokaObject);
	
	var _timeout = null;
	var _timeInterval = 0;
	var _invocation = null;
	var _repeat = NO;
	var _isValid = YES;
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.setTimeInterval(this.timeInterval());
		copy.setInvocation(this.invocation());
		copy.setRepeat(this.repeat());
		copy.setIsValid(this.isValid());
		
		return copy;
	}
	
	//Firing
	/*void*/ this.fire = function(){
		if( this.invocation() ){ this.invocation().invoke(); }
		if( !this.repeat() ){
			this.invalidate();
		}
		if( this.isValid() ){
			this.schedule();
		}
	}
	
	//Scheduling and Invalidating
	/*void*/ this.schedule = function(){
		var self = this;
		_timeout = setTimeout(function(){
			self.fire();
		}, _timeInterval);
	}
	/*void*/ this.invalidate = function(){
		_isValid = NO;
	}
	
	//Accessing properties
	/*float*/ this.timeInterval = function(){
		return _timeInterval;
	}
	/*void*/ this.setTimeInterval = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_timeInterval = aFloat;
	}
	/*MokaInvocation*/ this.invocation = function(){
		return _invocation;
	}
	/*void*/ this.setInvocation = function(anInvocation){
		if( anInvocation == undefined ){ return; }
		if( typeof(anInvocation.isKindOfClass) != "function" ){ return; }
		if( !anInvocation.isKindOfClass(MokaInvocation) ){ return; }
		
		_invocation = anInvocation;
	}
	/*bool*/ this.repeat = function(){
		return _repeat;
	}
	/*void*/ this.setRepeat = function(aBool){
		if( aBool == undefined ){ return; }
		if( typeof(aBool) != "boolean" ){ return; }
		
		_repeat = aBool;
	}
	/*bool*/ this.isValid = function(){
		return _isValid;
	}
	/*void*/ this.setIsValid = function(aBool){
		if( aBool == undefined ){ return; }
		if( typeof(aBool) != "boolean" ){ return; }
		
		_isValid = aBool;
	}

}
/*MokaTimer*/ MokaTimer.scheduledTimerWithTimeIntervalInvocationAndRepeat = function( aTimeInterval, anInvocation, repeats ){
	if( !MokaNumberIsFloat(aTimeInterval) ){ return; }
	if( typeof(anInvocation.isKindOfClass) != "function" ){ return; }
	if( !anInvocation.isKindOfClass(MokaInvocation) ){ return; }
	if( typeof(repeats) != "boolean" ){ return; }
	
	var newTimer = MokaTimer.timerWithTimeIntervalInvocationAndRepeat( aTimeInterval, anInvocation, repeats );
	newTimer.schedule();
	return newTimer;
}
/*MokaTimer*/ MokaTimer.scheduledTimerWithTimeIntervalTargetSelectorAndRepeat = function( aTimeInterval, aTarget, aSelector, repeats ){
	if( !MokaNumberIsInt(aTimeInterval) ){ return; }
	if( typeof(aTarget.isKindOfClass) != "function" ){ return; }
	if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
	if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
	if( typeof(repeats) != "boolean" ){ return; }
	
	var newTimer = MokaTimer.timerWithTimeIntervalTargetSelectorAndRepeat( aTimeInterval, aTarget, aSelector, repeats );
	newTimer.schedule()
	return newTimer;
}
/*MokaTimer*/ MokaTimer.timerWithTimeIntervalInvocationAndRepeat = function( aTimeInterval, anInvocation, repeats ){
	if( !MokaNumberIsFloat(aTimeInterval) ){ return; }
	if( typeof(anInvocation.isKindOfClass) != "function" ){ return; }
	if( !anInvocation.isKindOfClass(MokaInvocation) ){ return; }
	if( typeof(repeats) != "boolean" ){ return; }
	
	var newTimer = this.makeAndInit();
	newTimer.setTimeInterval( aTimeInterval );
	newTimer.setInvocation( anInvocation );
	newTimer.setRepeat( repeats );
	
	return newTimer;
}
/*MokaTimer*/ MokaTimer.timerWithTimeIntervalTargetSelectorAndRepeat = function( aTimeInterval, aTarget, aSelector, repeats ){
	if( !MokaNumberIsFloat(aTimeInterval) ){ return; }
	if( typeof(aTarget.isKindOfClass) != "function" ){ return; }
	if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
	if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
	if( typeof(repeats) != "boolean" ){ return; }
	
	var newTimer = this.makeAndInit();
	newTimer.timeInterval( aTimeInterval );
	var inv = MokaInvocation.makeAndInit();
	inv.setTarget( aTarget );
	inv.setSelector( aSelector );
	newTimer.setInvocation(inv)
	newTimer.repeat( repeats );
	
	return newTimer;
}

//REQUIRED TO MAKE TIMERS WORK
//DO NOT TOUCH
/*
MokaTimer.minimumTimeInterval = 40;
MokaTimer.setMinimumTimeInterval = function( aTimeInterval ){
	if( !MokaNumberIsInt(aTimeInterval) ){ return; }
	MokaTimer.minimumTimeInterval = aTimeInterval;
}
MokaTimer.timeline = new Array;
MokaTimer.timelineUnits = 0;
MokaTimer.currentTime = 0;
MokaTimer.addTimer = function( aTimer ){
	if( typeof(aTimer.isKindOfClass) != "function" ){ return; }
	if( !aTimer.isKindOfClass(MokaTimer) ){ return; }

	var time = aTimer.timeInterval() - aTimer.timeInterval()%MokaTimer.minimumTimeInterval;
	
	if( !MokaTimer.timeline[ MokaTimer.currentTime + time ] ){
		MokaTimer.timeline[ MokaTimer.currentTime + time ] = new Array;
		MokaTimer.timelineUnits++;
	}
	MokaTimer.timeline[ MokaTimer.currentTime + time ].push( aTimer );
	if( !window.timeout ){
		window.timeout = setTimeout( MokaTimer.updateTime, MokaTimer.minimumTimeInterval );
	}
}
MokaTimer.updateTime = function(){
	if( MokaTimer.timeline[ MokaTimer.currentTime ] != undefined ){
		var currentTimers = MokaTimer.timeline[ MokaTimer.currentTime ];
		for( var m = 0; m < currentTimers.length; m++ ){
			if( currentTimers[m].isValid() ){
				currentTimers[m].fire();
			}
		}
		delete( MokaTimer.timeline[ MokaTimer.currentTime ] );
		MokaTimer.timelineUnits--;
	}
	MokaTimer.currentTime += MokaTimer.minimumTimeInterval;
	if( MokaTimer.timelineUnits == 0 ){
		clearTimeout( window.timeout );
		delete( window.timeout );
	} else {
		window.timeout = setTimeout( MokaTimer.updateTime, MokaTimer.minimumTimeInterval );
	}
}
*/