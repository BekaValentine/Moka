function MokaColorPicker(){
	this.extend(MokaObject);
	
	/*	Color Panel	*/
	var _colorPanel = null;
	
	
	
	
	
	
	//Initialization
	/*id*/ this.initWithColorPanel = function(panel){
		this.supers().init();
		
		if( !is(panel,MokaColorPanel) ){ return this; }
		
		_colorPanel = panel;
		
		return this;
	}
	
	//Getting the color panel
	/*MokacColorPanel*/ this.colorPanel = function(){
		return _colorPanel;
	}
	
	//Setting and getting the button's image
	/*void*/ this.insertNewButtonImageInButton = function(image,button){
		if( !is(image,MokaImage) || !is(button,MokaButton) ){ return; }
		
		button.setImage(image);
		button.setAlternateImage(image);
		
	}
	/*MokaImage*/ this.provideNewButtonImage = function(){
		var className = this.constructor.className();
		var jpgImageURL = $url( "../resources/ColorPickers/" + className + "/" + className + ".jpg" );
		var jpegImageURL = $url( "../resources/ColorPickers/" + className + "/" + className + ".jpeg" );
		var pngImageURL = $url( "../resources/ColorPickers/" + className + "/" + className + ".png" );
		
		//use the first available image
		
	}
	
	//Color lists
	/*void*/ this.attachColorList = function(colorList){
		
	}
	/*void*/ this.detachColorList = function(colorList){
		
	}
	
	//View size changes
	/*void*/ this.viewSizeChanged = function(sender){
		
	}
	
}