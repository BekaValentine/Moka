function MokaColorPanel(){
	this.extend(MokaPanel);
	
	/*	Configuration	*/
	var _color = MokaColor.blackColor();
	var _accessoryView = null;
	var _isContinuous = YES;
	var _action = null
	var _target = null;
	var _showsAlpha = YES;
	
	/*	Color Pickers	*/
	var _colorPickers = MokaArray.make().init();
	
		
		
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		//set up the various color pickers
	}
	
	//Configuring the panel
	/*MokaView*/ this.accessoryView = function(){
		return _accessoryView;
	}
	/*void*/ this.setAccessoryView = function(aView){
		if( aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		_accessoryView = aView;
	}
	/*bool*/ this.isContinuous = function(){
		return _isContinuous;
	}
	/*void*/ this.setIsContinuous = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isContinuous = yn;
	}
	/*int*/ this.mode = function(){
		return _mode;
	}
	/*void*/ this.setAction = function(aSelector){
		if( aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		
		_action = aSelector;
	}
	/*void*/ this.setTarget = function(aTarget){
		if( aTarget == undefined ){ return; }
		if( typeof(aTarget.isKindOfClass) != "function" ){ return; }
		
		_target = aTarget;
	}
	/*bool*/ this.setShowsAlpha = function(){
		return _setShowsAlpha;
	}
	/*void*/ this.setSetShowsAlpha = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_setShowsAlpha = yn;
	}
	
	//Attaching color lists
	/*void*/ this.attachColorList = function(aColorList){
		
	}
	/*void*/ this.detachColorList = function(aColorList){
		
	}
	
	//Accessing color
	/*MokaColor*/ this.color = function(){
		return _color;
	}
	/*void*/ this.setColor = function(aColor){
		if( aColor == undefined ){ return; }
		if( typeof(aColor.isKindOfClass) != "function" ){ return; }
		if( !aColor.isKindOfClass(MokaColor) ){ return; }
		
		_color = aColor;
		
		//if color pickers are not synchronized, make them so
		for( var i = 0; i < _colorPickers.count(); i++ ){
			var p = _colorPickers.objectAtIndex(i);
			if( p.respondsToSelector($sel("setColor")) ){
				p.setColor(aColor);
			}
		}
		
		//post notification of color change
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	$s("MokaColorPanelUpdatedColorNotification"),
																					this );
	}
	/*float*/ this.alpha = function(){
		return this.color().alphaComponent();
	}
	
}
/*MokaColorPanel*/ MokaColorPanel.sharedColorPanel = function(){
	if( !is(MokaColorPanel._sharedColorPanel,MokaColorPanel) ){
		MokaColorPanel._sharedColorPanel = MokaColorPanel.make().init();
	}
	return MokaColorPanel._sharedColorPanel;
}
/*bool*/ MokaColorPanel.dragColorWithEventFromView = function(aColor,anEvent,aView){
	
}
