function MokaViewAnimation(){
	this.extend(MokaAnimation);
	
	/*	View Animations	*/
	var _viewAnimations = new MokaArray;
	
	
	
	
	
	
	//Initializing
	/*id*/ this.initWithviewAnimations = function(anArray){
		this.supers().init();
		
		if( anArray == undefined ){ return this; }
		if( typeof(anArray.isKindOfClass) != "function" ){ return this; }
		if( !anArray.isKindOfClass(MokaArray) ){ return this; }
		
		this.setViewAnimations(anArray);
		
		return this;
	}
		
	//View animations
	/*MokaArray*/ this.viewAnimations = function(){
		return _viewAnimations;
	}
	/*void*/ this.setViewAnimations = function(anArray){
		if( anArray == undefined ){ return; }
		if( typeof(anArray.isKindOfClass) != "function" ){ return; }
		if( !anArray.isKindOfClass(MokaArray) ){ return; }
		
		for( var i = 0; i < anArray.count(); i++ ){
			var dict = anArray.objectAtIndex(i);
			
			var target = dict.objectForKey(MokaViewAnimationTargetKey);
			if( !is(target,MokaView) || !is(target,MokaPanel) ){ continue; }
			
			if( !dict.objectForKey(MokaViewAnimationStartFrameKey) ){ dict.setObjectForKey(dict.objectForKey(MokaViewAnimationTargetKey).frame().copy(),MokaViewAnimationStartFrameKey); }
			if( !dict.objectForKey(MokaViewAnimationEndFrameKey) ){ dict.setObjectForKey(dict.objectForKey(MokaViewAnimationTargetKey).frame().copy(),MokaViewAnimationEndFrameKey); }
			
			_viewAnimations.addObject(dict);
		}
	}
	
	//Rendering
	/*void*/ this.renderFrame = function(){
		var currentVal = this.currentValue();
		
		for( var i = 0; i < _viewAnimations.count(); i++ ){
			var animation = _viewAnimations.objectAtIndex(i);
			var target = animation.objectForKey(MokaViewAnimationTargetKey);
			var startFrame = animation.objectForKey(MokaViewAnimationStartFrameKey);
			var endFrame = animation.objectForKey(MokaViewAnimationEndFrameKey);
			var effect = animation.objectForKey(MokaViewAnimationEffectKey);
			
			var newFrame = target.frame().copy();
			if( startFrame.size().width() != endFrame.size().width() ){
				newFrame.size().setWidth( curentVal*(endFrame.size().width()-startFrame.size().width()) )
			}
			if( startFrame.size().height() != endFrame.size().height() ){
				newFrame.size().setHeight( curentVal*(endFrame.size().height()-startFrame.size().height()) )
			}
			if( startFrame.origin().x() != endFrame.origin().x() ){
				newFrame.origin().setX( currentVal*(endFrame.origin().x()-startFrame.origin().x()) );
			}
			if( startFrame.origin().y() != endFrame.origin().y() ){
				newFrame.origin.setY( currentVal*(endFrame.origin().y()-startFrame.origin().y()) );
			}
			
			target.setFrame(newFrame);
						
		}
		
	}
	
}

//View animation dictionary keys
MokaViewAnimationTargetKey		= $s("MokaViewAnimationTargetKey");
MokaViewAnimationStartFrameKey	= $s("MokaViewAnimationStartFrameKey");
MokaViewAnimationEndFrameKey	= $s("MokaViewAnimationEndFrameKey");