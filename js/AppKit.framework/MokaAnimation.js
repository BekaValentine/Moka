function MokaAnimation(){
	this.extend(MokaObject);
	
	/*	Configuring an animation	*/
	var _animationCurveType = MokaAnimationLinear;
	var _animationCurve = MokaAnimationCurve.linear();
	var _delegate = null;
	var _duration = null;
	var _frameRate = 25;
	
	/*	Controlling and monitoring the animation	*/
	var _isAnimating = NO;
	var _currentProgress = 0;
	
	/*	Managing progress marks	*/
	var _progressMarks = MokaArray.make().init();
	
	/*	Timer	*/
	var _timer = MokaTimer.timerWithTimeIntervalTargetSelectorAndRepeat(	1000/this.frameRate(),
																			this,
																			MokaSelector.selectorWithName("nextFrame"),
																			YES );
	
	
	
	
	
	
	
	//initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_progressMarks.init();
		
		return this;
	}
	
	
	//Configuring an animation
	/*MokaAnimationCurveType*/ this.animationCurveType = function(){
		return _animationCurveType;
	}	
	/*void*/ this.setAnimationCurveType = function(aCurveType){
		if( this.isAnimating() ){ return; }
		if( !MokaNumberIsInt(aCurveType) ){ return; }
		if( aCurveType < MokaAnimationLinear || aCurveType > MokaAnimationJumpInOut ){ return; }
		
		_animationCurveType = aCurveType;
		switch( aCurveType ){
			case MokaAnimationLinear:
				_animationCurve = MokaAnimationCurve.linear();
				break;
			case MokaAnimationFlat:
				_animationCurve = MokaAnimationCurve.flat();
				break;
			case MokaAnimationEaseIn:
				_animationCurve = MokaAnimationCurve.easeIn();
				break;
			case MokaAnimationEaseOut:
				_animationCurve = MokaAnimationCurve.easeOut();
				break;
			case MokaAnimationEaseInOut:
				_animationCurve = MokaAnimationCurve.easeInOut();
				break;
			case MokaAnimationJumpIn:
				_animationCurve = MokaAnimationCurve.jumpIn();
				break;
			case MokaAnimationJumpOut:
				_animationCurve = MokaAnimationCurve.jumpOut();
				break;
			case MokaAnimationJumpInOut:
				_animationCurve = MokaAnimationCurve.jumpInOut();
				break;
			case MokaAnimationBounceIn:
				_animationCurve = MokaAnimationCurve.bounceIn();
				break;
			case MokaAnimationBounceOut:
				_animationCurve = MokaAnimationCurve.bounceOut();
				break;
			case MokaAnimationBounceInOut:
				_animationCurve = MokaAnimationCurve.bounceInOut();
				break;
			default:
				break;
		} 
	}
	/*MokaAnimationCurve*/ this.animationCurve = function(){
		return _animationCurve;
	}	
	/*void*/ this.setCustomCurve = function(aCurve){
		if( this.isAnimating() ){ return; }
		if( typeof(aCurve.isKindOfClass) != "function" ){ return; }
		if( !aCurve.isKindOfClass(MokaAnimationCurve) ){ return; }
		_animationCurve = aCurve;
		this.setAnimationCurveType( aCurve.type() );
	}
	/*id*/ this.delegate = function(){
		return _delegate;
	}	
	/*void*/ this.setDelegate = function(anObject){
		if( this.isAnimating() ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		_delegate = anObject;
	}
	/*float*/ this.duration = function(){
		return _duration;
	}	
	/*void*/ this.setDuration = function(aDuration){
		if( this.isAnimating() ){ return; }
		if( !MokaNumberIsInt(aDuration) ){ return; }
		_duration = aDuration;
	}
	/*float*/ this.frameRate = function(){
		return _frameRate;
	}
	/*void*/ this.setFrameRate = function(aFrameRate){
		if( this.isAnimating() ){ return; }
		if( !MokaNumberIsInt(aFrameRate) ){ return; }
		_frameRate = aFrameRate;
		_timer.setTimeInterval( 1000/this.frameRate() );
	}
	
	//Controlling and monitoring the animation
	/*bool*/ this.isAnimating = function(){
		return _isAnimating;
	}	
	/*void*/ this.startAnimation = function(){
		if( this.isAnimating() ){ return; }
		if( this.duration() ){
			MokaTimer.addTimer(_timer);
			_isAnimating = YES;
		}
	}
	/*void*/ this.stopAnimation = function(){
		_timer.invalidate();
		_isAnimating = NO;
	}
	/*float*/ this.currentProgress = function(){
		return _currentProgress;
	}	
	/*void*/ this.setCurrentProgress = function(aFloat){
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		_currentProgress = aFloat;
		
		this.renderFrame();
		
		if( this.delegate() ){
			if( typeof(this.delegate().animationDidReachProgressMark) == "function"){
				for( var i = 0; i < this.progressMarks().count(); i++ ){
					if( this.progressMarks().objectAtIndex(i) < aFloat ){
						this.delegate().animationDidReachProgressMark(this,this.progressMarks().objectAtIndex(i));
						MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaAnimationProgressMarkNotification,
																										this,
																										$dict( $s("MokaAnimationProgressMark"), this.progressMarks().objectAtIndex(i)));
						this.progressMarks().removeObjectAtIndex(i);
					}
				}
			}
		}
	}
	/*float*/ this.currentValue = function(){
		if( this.delegate() ){
			if( typeof(this.delegate().valueForAnimationAndProgress) == "function" ){
				this.delegate().valueForAnimationAndProgress( this, this.currentProgress() );
			} else {
				return _animationCurve.valueForProgress( this.currentProgress() );
			}
		} else {
			return _animationCurve.valueForProgress( this.currentProgress() );
		}
	}
	/*void*/ this.nextFrame = function(){
		if( this.currentProgress() < 1 ){
			this.setCurrentProgress( Math.round(100*this.duration()*(this.currentProgress() + 1/(this.duration()*this.frameRate())))/(100*this.duration()) );
		} else {
			this.stopAnimation();
		}
	}
	/*void*/ this.previousFrame = function(){
		this.setCurrentProgress( this.currentProgress() - 1/(this.duration()*this.frameRate()) )
	}
	
	//Animating something
	/*void*/ this.renderFrame = function(){
		
	}
	
	//Managing progress marks
	/*void*/ this.addProgressMark = function(aNumber){
		if( this.isAnimating() ){ return; }
		if( !MokaNumberIsFloat(aNumber) ){ return; }
		this.progressMarks().addObject( aNumber );
	}
	/*void*/ this.removeProgressMark = function(aNumber){
		if( this.isAnimating() ){ return; }
		if( !MokaNumberIsFloat(aNumber) ){ return; }
		
		var marksToRemove = [];
		for( var i = 0; i < this.progressMarks().count(); i++ ){
			if( this.progressMarks().objectAtIndex(i) == aNumber ){
				marksToRemove.push(this.progressMarks().objectAtIndex(i));
			}
		}
		for( var i = 0; i < marksToRemove.length; i++ ){
			this.progressMarks().removeObject(marksToRemove[i]);
		}
		
	}
	/*MokaArray*/ this.progressMarks = function(){
		return _progressMarks;
	}	
	/*void*/ this.setProgressMarks = function(anArrayOfProgressMarks){
		if( this.isAnimating() ){ return; }
		if( typeof(anArrayOfProgressMarks.isKindOfClass) != "function" ){ return; }
		if( !anArrayOfProgressMarks.isKindOfClass(MokaArray) ){ return; }
		
		var newMarks = anArrayOfProgressMarks.copy();
		newMarks.each( function(n){
			if( n < 0 || n > 1 ){ newMarks.removeObject(n); }
		});
		
		_progressMarks = newMarks;
		
	}
	
	
}




//Notifications
MokaAnimationProgressMarkNotification = $s("MokaAnimationProgressMarkNotification");