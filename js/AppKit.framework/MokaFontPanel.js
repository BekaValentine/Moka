function MokaFontPanel(){
	this.extend(MokaPanel);
	
	/*	Enabled	*/
	var _isEnabled = YES;
	
	/*	Accessory View	*/
	var _accessoryView = null;
	
	
	
	
	
	
	//Enabling font changes
	/*bool*/ this.isEnabled = function(){
		return _isEnabled;
	}
	/*void*/ this.setIsEnabled = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isEnabled = yn;
	}
	/*void*/ this.reloadDefaultFontFamilies = function(){
		
	}
	
	//Updating the font panel
	/*void*/ this.setPanelFontIsMultiple = function(font,yn){
		
	}
	
	//Converting fonts
	/*MokaFont*/ this.panelConvertFont = function(font){
		
	}
	
	//Working in modal loops
	/*bool*/ this.worksWhenModal = function(){
		return YES;
	}
	
	//Setting the accesory view
	/*MokaView*/ this.accessoryView = function(){
		return _accessoryView;
	}
	/*void*/ this.setAccessoryView = function(aView){
		if( aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		_accessoryView = aView;
	}
	
}
/*MokaFontPanel*/ MokaFontPanel.sharedFontPanel = function(){
	
}
/*bool*/ MokaFontPanel.sharedFontPanelExists = function(){
	
}
