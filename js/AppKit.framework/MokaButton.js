function MokaButton(){
	this.extend( MokaControl );
	
	/*	Button Type	*/
	var _buttonType = MokaMomentaryPushInButton;
	
	/*	State	*/
	var _allowsMixedState = NO;
	var _state = MokaOffState;
	var _tempState = MokaOffState;
	
	/*	Titles	*/
	var _title = $s("Button");
	var _alternateTitle = $s("AltButton");
	
	/*	Images	*/
	var _image = new MokaImage;
	var _alternateImage = new MokaImage;
	var _imagePosition = MokaNoImage;
	
	/*	Graphics Attributes	*/
	var _bezelStyle = MokaRoundJewelBezelStyle;
	var _isBordered = YES;
	var _isTransparent = NO;
	var _showsBorderOnlyWhileMouseIn = NO;
	var _customBezelName = null;
	
	/*	Key Equivalents	*/
	var _keyEquivalent = $s("");
	var _keyEquivalentModifierMask = 0;
	
	/*	Repeat Timer	*/
	var _periodicDelay = 0.4;	// in seconds
	var _repeatInterval = 0.080;	// in seconds
	var _repeatTimer = null;
	
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_image.init();
		_alternateImage.init();
		
		return this;
	}	
	
	//Size constraints
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		var newSize = aSize.copy();
		
		switch( this.bezelStyle() ){
			case MokaDisclosureBezelStyle:
				newSize.setWidth( 20 );
				newSize.setHeight( 20 );
				break;
			case MokaRoundJewelBezelStyle:
			case MokaSquareJewelBezelStyle:
				newSize.setHeight( (this.controlSize() == MokaRegularControlSize ? 20 : 15 ) );
				break;
			case MokaCircularJewelBezelStyle:
			case MokaHelpButtonBezelStyle:
				newSize.setWidth( 25 );
				newSize.setHeight( 25 );
				break;
		}
		
		if( this.buttonType() == MokaSwitchButton || this.buttonType() == MokaRadioButton ){
			newSize.setHeight( ( this.controlSize() == MokaRegularControlSize ? 10 : 8 ) + 10 );
		}
		return newSize;
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		if( this.buttonType() != MokaSwitchButton && this.buttonType() != MokaRadioButton ){
			
			if( this.bezelStyle() == MokaRoundJewelBezelStyle || this.bezelStyle() == MokaSquareJewelBezelStyle ){
			
			} else if( this.bezelStyle() == MokaSquarePlasticBezelStyle ){
			
			} else if( this.bezelStyle() == MokaSquareBezelStyle ){
			
			} else if( this.bezelStyle() == MokaCircularJewelBezelStyle ){
			
			} else if( this.bezelStyle() == MokaHelpButtonBezelStyle ){
			
			} else if( this.bezelStyle() == MokaDisclosureBezelStyle ){
			
			}
		
			this.pageDisplay().style.backgroundColor = "lightgrey";
			
			var lightBlock = new MokaCell;
			lightBlock.setBackgroundColor( "grey" );
			
			var opacityToUse = 0;
			if( this.buttonType() == MokaMomentaryPushInButton && _tempState ){ opacityToUse = 0.75; }
			else if( (this.buttonType() == MokaOnOffButton || this.buttonType() == MokaToggleButton) && this.state() != MokaOffState && _tempState == MokaOffState ){ opacityToUse = 0.75; }
			else if( (this.buttonType() == MokaOnOffButton || this.buttonType() == MokaToggleButton) && _tempState == MokaOnState ){ opacityToUse = 1; }
			lightBlock.setOpacity(opacityToUse);
			this.drawCellInRect(	lightBlock,
									MokaRect.rectWithOriginAndSize(MokaPoint.origin(), new MokaSize(this.frame().size().width(),this.frame().size().height())));
		
			var drawImage = NO;
			//text and images
			if( this.bezelStyle() != MokaCircularJewelBezelStyle && this.bezelStyle() != MokaHelpButtonBezelStyle && this.bezelStyle() != MokaDisclosureBezelStyle ){
				if( this.bezelStyle() != MokaRoundJewelBezelStyle && this.bezelStyle() != MokaSquareJewelBezelStyle && this.imagePosition() != MokaNoImage ){
					drawImage = YES;
				}
			}
		
			var titleToUse = this.title();
			var imageToUse = this.image();
			if( (this.buttonType() == MokaToggleButton && ((this.state() == MokaOffState && _tempState == MokaOnState)||(this.state() != MokaOffState && _tempState == MokaOffState)) ) || (this.buttonType() == MokaMomentaryChangeButton && _tempState == MokaOnState ) ){
				titleToUse = this.alternateTitle();
				imageToUse = this.alternateImage();
			}
		
			if( drawImage ){
				
				var imageCell = new MokaCell;
				imageCell.initImageCell(imageToUse);
				imageCell.setBackgroundColor("blue");
				
				var titleCell = new MokaCell;
				titleCell.initTextCell( titleToUse );
				titleCell.setFontFamily( this.font() );
				titleCell.setFontSize( (this.controlSize() == MokaRegularControlSize ? 12 : 10) );
				titleCell.setBaseWritingDirection( this.baseWritingDirection() );
				
				var titlePosition = MokaPoint.origin();
				var imagePosition = MokaPoint.origin();
				
				if( this.imagePosition() == MokaImageAbove || this.imagePosition() == MokaImageBelow ){
					var position = (this.frame().size().height() - imageToUse.size().height() - (this.controlSize() == MokaRegularControlSize ? 12 : 10) - 5)/2;
					titlePosition = new MokaPoint((this.frame().size().width()-this.frame().size().width())/2,(this.imagePosition() == MokaImageAbove ? imageToUse.size().height() + 5: 0 ) + position );
					imagePosition = new MokaPoint((this.frame().size().width()-imageToUse.size().width())/2,(this.imagePosition() == MokaImageAbove ? 0 : (this.controlSize() == MokaRegularControlSize ? 12 : 10) + 5 ) + position );
					titleCell.setTextAlign( MokaCenterTextAlignment );
				} else {
					titlePosition = new MokaPoint((this.imagePosition() == MokaImageLeft ? imageToUse.size().width() + 10 : this.frame().size().width() - imageToUse.size().width() - this.frame().size().width() - 10),(this.frame().size().height() - (this.controlSize() == MokaRegularControlSize ? 12 : 10))/2);
					imagePosition = new MokaPoint((this.imagePosition() == MokaImageLeft ? 5 : this.frame().size().width() - imageToUse.size().width() - 5),(this.frame().size().height() - imageToUse.size().height())/2);
					titleCell.setTextAlign( (this.imagePosition() == MokaImageLeft ? MokaLeftTextAlignment : MokaRightTextAlignment) );
				}
				
				this.drawCellInRect(	imageCell,
										MokaRect.rectWithOriginAndSize(imagePosition, imageToUse.size()));
				this.drawCellInRect(	titleCell,
										MokaRect.rectWithOriginAndSize(titlePosition, new MokaSize(this.frame().size().width(),(this.controlSize() == MokaRegularControlSize ? 12 : 10))));
				
			} else {
				var titleCell = new MokaCell;
				titleCell.initTextCell( titleToUse );
				titleCell.setFontFamily( this.font() );
				titleCell.setFontSize( (this.controlSize() == MokaRegularControlSize ? 12 : 10) );
				titleCell.setBaseWritingDirection( this.baseWritingDirection() );
				titleCell.setTextAlign( MokaCenterTextAlignment );
				
				this.drawCellInRect(	titleCell,
										MokaRect.rectWithOriginAndSize(	new MokaPoint(0,(this.frame().size().height()-(this.controlSize() == MokaRegularControlSize ? 12 : 10))/2),
																		new MokaSize(this.frame().size().width(),(this.controlSize() == MokaRegularControlSize ? 12 : 10)) ));
			}
		} else {
			
			this.pageDisplay().style.backgroundColor = "";
			this.pageDisplay().style.border = 0;
			
			var lightBlock = new MokaCell;
			lightBlock.setBackgroundColor( "grey" );
			lightBlock.setOpacity( (this.state() ? 0.5 : 0 ) );
			if( _tempState ){ lightBlock.setOpacity(0.75); }
			this.drawCellInRect(	lightBlock,
									MokaRect.rectWithOriginAndSize(	new MokaPoint(5,this.frame().size().height()/2),
																	new MokaSize((this.controlSize() == MokaRegularControlSize ? 12 : 10),(this.controlSize() == MokaRegularControlSize ? 12 : 10))));
			
			var titleCell = new MokaCell;
			titleCell.initTextCell( _title );
			titleCell.setFontFamily( this.font() );
			titleCell.setFontSize( (this.controlSize() == MokaRegularControlSize ? 12 : 10) );
			titleCell.setBaseWritingDirection( this.baseWritingDirection() );
			titleCell.setTextAlign( MokaLeftTextAlignment );
			
			this.drawCellInRect(	titleCell,
									MokaRect.rectWithOriginAndSize(	new MokaPoint(10,(this.frame().size().height()-(this.controlSize() == MokaRegularControlSize ? 12 : 10))/2),
																	new MokaSize(_title.length()*(this.controlSize() == MokaRegularControlSize ? 12 : 10),(this.controlSize() == MokaRegularControlSize ? 12 : 10))));
			
		}
	}
		
	//Button type
	/*int*/ this.buttonType = function(){
		return _buttonType;
	}
	/*void*/ this.setButtonType = function(anInt){
		if( typeof anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		if( anInt < 0 || anInt > 5 ){ return; }
		
		_buttonType = anInt;
		this.setFrameSize(this.frame().size().copy());
	}
	
	//Setting the state
	/*bool*/ this.allowsMixedState = function(){
		return _allowsMixedState;
	}
	/*void*/ this.setAllowsMixedState = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_allowsMixedState = yn;
	}
	/*void*/ this.setNextState = function(){
		if( this.state() == MokaOffState ){
			if( this.allowsMixedState() ){ this.setState((this.buttonType() == MokaRadioButton ? MokaOnState : MokaMixedState)); }
			else { this.setState(MokaOnState); }
		} else if( this.state() == MokaMixedState ){
			this.setState(MokaOnState);
		} else if( this.state() == MokaOnState ){
			this.setState( (this.buttonType() == MokaRadioButton ? MokaOnState : MokaOffState) );
		}
	}
	/*void*/ this.setState = function(aButtonState){
		if( aButtonState != -1 && aButtonState != 0 && aButtonState != 1 ){ return; }
		
		_state = aButtonState;
		this.display();
	}
	/*int*/ this.state = function(){
		return _state;
	}
	
	//Repeat interval
	/*array*/ this.periodicDelayAndInterval = function(){
		return [ _periodicDelay, _repeatInterval ];
	}	
	/*void*/ this.setPeriodicDelayAndInterval = function(aDelay,anInterval){
		if( typeof aDelay == undefined ){ return; }
		if( !MokaNumberIsFloat(aDelay) ){ return; }
		if( typeof anInterval == undefined ){ return; }
		if( !MokaNumberIsFloat(anInterval) ){ return; }
		
		_periodicDelay = aDelay;
		_repeatInterval = anInterval;
	}
	
	//Title
	/*MokaString*/ this.title = function(){
		return _title;
	}
	/*MokaString*/ this.alternateTitle = function(){
		return _alternateTitle;
	}
	/*void*/ this.setTitle = function(aTitle){
		if( typeof aTitle == undefined ){ return; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
		if( !aTitle.isKindOfClass(MokaString) ){ return; }
		
		_title = aTitle;
		this.display();
	}
	/*void*/ this.setAlternateTitle = function(aTitle){
		if( typeof aTitle == undefined ){ return; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
		if( !aTitle.isKindOfClass(MokaString) ){ return; }
		
		_alternateTitle = aTitle;
		this.display();
	}
	
	//Images
	/*string*/ this.image = function(){
		return _image;
	}
	/*string*/ this.alternateImage = function(){
		return _alternateImage;
	}
	/*MokaImagePosition*/ this.imagePosition = function(){
		return _imagePosition;
	}
	/*void*/ this.setImage = function(anImage){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_image = anImage;
		this.display();
	}
	/*void*/ this.setAlternateImage = function(anImage){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_alternateImage = anImage;
		
		this.display();
	}
	/*void*/ this.setImagePosition = function(anImagePosition){
		if( typeof anImagePosition == undefined ){ return; }
		if( !MokaNumberIsInt(anImagePosition) ){ return; }
		if( anImagePosition < 0 || anImagePosition > 5 ){ return; }
		
		_imagePosition = anImagePosition;
		this.display();
	}
		
	//Modifying graphics attributes
	/*MokaBezelStyle*/ this.bezelStyle = function(){
		return _bezelStyle;
	}
	/*bool*/ this.isBordered = function(){
		return _isBordered;
	}
	/*bool*/ this.isTransparent = function(){
		return _isTransparent;
	}
	/*bool*/ this.showsBorderOnlyWhileMouseInside = function(){
		return _showsBorderOnlyWhileMouseInside;
	}
	/*void*/ this.setBezelStyle = function(aBezelStyle){
		if( typeof aBezelStyle == undefined ){ return; }
		if( !MokaNumberIsInt(aBezelStyle) ){ return; }
		if( aBezelStyle < MokaRoundJewelBezelStyle || aBezelStyle > MokaCustomFixedSizeBezelStyle ){ return; }
		
		_bezelStyle = aBezelStyle;
		
		this.setFrameSize(this.frame().size());
	}
	/*void*/ this.setIsBordered = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isBordered = yn;
		this.display();
	}
	/*void*/ this.setIsTransparent = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isTransparent = yn;
		this.display();
	}
	/*void*/ this.setShowsBorderOnlyWhileMouseInside = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_showsBorderOnlyWhileMouseInside = yn;
		this.display();
	}
	/*MokaString*/ this.customBezelName = function(){
		return _customBezelName;
	}	
	/*void*/ this.setCustomBezelName = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_customBezelName = aString;
	}
		
	//Key equivalents
	/*MokaString*/ this.keyEquivalent = function(){
		return _keyEquivalent;
	}
	/*int*/ this.keyEquivalentModifierMask = function(){
		return _keyEquivalentModifierMask;
	}
	/*void*/ this.setKeyEquivalent = function(aString){
		if( typeof aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_keyEquivalent = aString;
	}
	/*void*/ this.setKeyEquivalentModifierMask = function(aModifierMask){
		if( typeof aModifierMask == undefined ){ return; }
		if( !MokaNumberIsInt(aModifierMask) ){ return; }
		if( aModifierMask < 0 || aModifierMask > 7 ){ return; }
		
		_keyEquivalentModifierMask = aModifierMask;
	}
	
	//Event handling
	/*bool*/ this.performKeyEquivalent = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( theEvent.characters() == _keyEquivalent.characters() ){
			this.setNextState();
			if( this.target() && this.action() ){
				if( this.target()[this.action().selectorName()] ){
					this.target()[this.action().selectorName()](this);
				}
			}
			return YES;
		}
		return NO;
	}
	/*void*/ this.mouseDown = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		_tempState = MokaOnState;
		
		if( this.isContinuous() ){
			
		}
		
		this.display();
		
		MokaApp.responderIsCapturingPagewideMouseEvents(this,YES);
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var newTempState;
		if( this.frame().containsPoint(this.convertPointFromPage(theEvent.mouseLocation()).add(this.frame().origin().copy())) ){
			newTempState = MokaOnState;
		} else {
			newTempState = MokaOffState;
		}
		if( newTempState != _tempState ){
			_tempState = newTempState;
			this.display();
		}
	}	
	/*void*/ this.mouseUp = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		_tempState = MokaOffState;
		
		if( this.frame().containsPoint(this.convertPointFromPage(theEvent.mouseLocation()).add(this.frame().origin().copy())) ){
			this.setNextState();
			if( this.target() && this.action() ){
				if( this.target()[this.action().selectorName()] ){
					this.target()[this.action().selectorName()](this);
				}
			}
		} else {
			this.display();
		}
		
		MokaApp.responderIsCapturingPagewideMouseEvents(this,NO);
	}
	
	
	
}

//Button Types
MokaMomentaryPushInButton	= 0;	//Momentarilly looks pushed in or highlighted, does not change state
MokaOnOffButton				= 1;	//Changes to look pushed in or highlighted
MokaToggleButton			= 2;	//Changes title and image
MokaMomentaryChangeButton	= 3;	//Momentarilly changes title and image
MokaSwitchButton			= 4;	//Check box button
MokaRadioButton				= 5;

//Image positions
MokaNoImage		= 0;
MokaImageOnly	= 1;
MokaImageLeft	= 2;
MokaImageRight	= 3;
MokaImageAbove	= 4;
MokaImageBelow	= 5;

//Bezel Styles
MokaRoundJewelBezelStyle		= 0;
MokaSquareJewelBezelStyle		= 1;
MokaSquarePlasticBezelStyle		= 2;
MokaSquareBezelStyle			= 3;
MokaCircularJewelBezelStyle		= 4;
MokaHelpButtonBezelStyle		= 5;
MokaDisclosureBezelStyle		= 6;
MokaCustomBezelStyle			= 7;
MokaCustomFixedSizeBezelStyle	= 8;