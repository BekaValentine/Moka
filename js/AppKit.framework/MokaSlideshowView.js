function MokaSlideshowView(){
	this.extend(MokaView);
	
	/*	Control Attributes	*/
	var _controlType = MokaSlideshowControlArrows;
	var _controlPosition = MokaSlideshowControlInsideImageBorder;
	var _autohidesControl = YES;
	
	/*	Transitions and slide properties	*/
	var _slideDuration = 2;
	var _transitionType = MokaSlideshowNoTransition;
	
	/*	Progress	*/
	var _isPlaying = NO;
	var _currentSlide = 0;
	
	/*	Slides	*/
	var _slides;
	
	
	
	
	
	
	
	
	//Control Attributes
	/*MokaSlideshowControlType*/ this.controlType = function(){
		return _controlType;
	}
	/*void*/ this.setControlType = function(aControlType){
		if( aControlType != MokaSlideshowControlArrows && aControlType != MokaSlideshowControlCircles && aControlType != MokaSlideshowControlPreviews ){ return; }
		_controlType = aControlType;
		this.display();
	}
	/*MokaSlideshowControlPosition*/ this.controlPosition = function(){
		return _controlPosition;
	}
	/*void*/ this.setControlPosition = function(aControlPosition){
		if( aControlPosition != MokaSlideshowControlInsideImageBorder && aControlPosition != MokaSlideshowControlOutsideImageBorder ){ return; }
		_controlPosition = aControlPosition;
		this.display();
	}
	/*bool*/ this.autohidesControl = function(){
		return _autohidesControl;
	}
	/*void*/ this.setAutohidesControl = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_autohidesControl = yn;
		this.display();
	}
		
	//Transition and slide properties
	/*float*/ this.slideDuration = function(){
		return _slideDuration;
	}
	/*void*/ this.setSlideDuration = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_slideDuration = aFloat;
	}
	/*MokaSlideshowTransitionType*/ this.transitionType = function(){
		return _transitionType;
	}
	/*void*/ this.setTransitionType = function(aTransitionType){
		if( aTransitionType == undefined ){ return; }
		if( !MokaNumberIsInt(aTransitionType) ){ return; }
		if( aTransitionType < MokaSlideshowNoTransition || aTransitionType > MokaSlideshowTransitionGrowOut ){ return; }
		
		_transitionType = aTransitionType;
	}
	
	//Controlling the slideshow
	/*void*/ this.play = function(){
		_isPlaying = YES;
		//activate the timer that triggers nextSlide
	}
	/*void*/ this.pause = function(){
		_isPlaying = NO;
		//deactivate the timer that triggers nextSlide
	}
	/*bool*/ this.isPlaying = function(){
		return _isPlaying;
	}	
	/*void*/ this.nextSlide = function(){
		var currentSlide = this.currentSlide();
		var nextSlide = ( currentSlide == this.slideCount() - 1 ? 0 : currentSlide + 1 );
		
		//animate the transition to the next slide
	}
	/*void*/ this.previousSlide = function(){
		var currentSlide = this.currentSlide();
		var previousSlide = ( currentSlide == 0 ? this.slideCount() - 1 : currentSlide - 1 );
		
		//animate the transition to the previous slide
	}
	/*int*/ this.currentSlide = function(){
		return _currentSlide;
	}
	/*void*/ this.setCurrentSlide = function(anInt){
		if( anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		if( anInt >= this.slideCount() ){ anInt = this.slideCount() - 1; }
		if( anInt < 0 ){ anInt = 0; }
		
		_currentSlide = anInt;
		this.display();
	}
	/*void*/ this.setCurrentSlideByImageName = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		
	}
	
	//Slides
	/*MokaArray*/ this.slides = function(){
		return _slides;
	}
	/*void*/ this.setSlides = function(anArrayOfImages){
		if( anArrayOfImages == undefined ){ return; }
		if( typeof(anArrayOfImages.isKindOfClass) != "function" ){ return; }
		if( !anArrayOfImages.isKindOfClass(MokaArray) ){ return; }
		
		var newArrayOfImages = MokaArray.make().init();
		
		var enumerator = anArrayOfImages.enumerator();
		var image;
		while( image = enumerator.nextObject() ){
			if( image == undefined ){ continue; }
			if( typeof(image.isKindOfClass) != "function" ){ continue; }
			if( !image.isKindOfClass(MokaImage) ){ continue; }
			
			newArrayOfImages.addObject(image);
		}
		
		_slides = newArrayOfImages;
	}
	/*int*/ this.slideCount = function(){
		return this.slides().count();
	}
	/*MokaImage*/ this.slideAtIndex = function(anIndex){
		return this.slides().objectAtIndex(anIndex);
	}
	/*void*/ this.insertSlideAtIndex = function(anImage,anIndex){
		if( anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		this.slides().insertObjectAtIndex(anImage,anIndex);
	}
	/*void*/ this.replaceSlideAtIndexWithSlide = function(anIndex, anImage){
		if( anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		this.slides().replaceObjectAtIndexWithObject(anIndex,anImage);
	}
	/*void*/ this.removeSlideAtIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		this.slides().removeObjectAtIndex(anIndex);
	}
	
	/*void*/ this.draw = function(){
		
	}
	
}

//MokaSlideshowControlType
MokaSlideshowControlArrows		= 0;
MokaSlideshowControlCircles		= 1;
MokaSlideshowControlPreviews	= 2;

//MokaSlideshowControlPosition
MokaSlideshowControlInsideImageBorder	= 0;
MokaSlideshowControlOutsideImageBorder	= 1;

//MokaSlideshowTransitionType
MokaSlideshowNoTransition			= 0;
MokaSlideshowTransitionFade			= 1;
MokaSlideshowTransitionFadeToBlack	= 2;
MokaSlideshowTransitionSlideLeft	= 3;
MokaSlideshowTransitionSlideUp		= 4;
MokaSlideshowTransitionShrinkIn		= 5;
MokaSlideshowTransitionGrowIn		= 6;
MokaSlideshowTransitionShrinkOut	= 7;
MokaSlideshowTransitionGrowOut		= 8;