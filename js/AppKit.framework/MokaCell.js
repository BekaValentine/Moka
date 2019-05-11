function MokaCell(){
	this.extend( MokaObject );
		
	/*	Cell values	*/
	var _objectValue = null;
	var _numberValue = 0;
	var _stringValue = null;
	
	/*	State	*/
	var _allowsMixedState = NO;
	var _nextState = MokaOnState;
	var _state = MokaOffState;
	
	/*	Cell Attributes	*/
	var _type = MokaNullCellType;
	var _isEnabled = YES;
	var _isHidden = YES;
	var _isBordered = NO;
	var _isOpaque = NO;
	
	/*	Frame	*/
	var _frame = new MokaRect;
	
	/*	Display Attributes	*/
	var _backgroundColor = "none";
	var _borderSize = 0;
	var _borderStyle = "solid";
	var _borderColor = "black";
	var _zIndex = 0;
	var _opacity = 1;
	var _padding = 0;
	
	/*	Focus Ring	*/
	var _hasFocusRing = NO;
	
	/*	Textual attributes	*/
	var _textAlign = MokaLeftTextAlignment;
	var _fontColor = "black";
	var _fontFamily = "sans-serif";
	var _baseWritingDirection = MokaWritingDirectionLeftToRight;
	var _fontStyle = "normal";
	var _fontVariant = "normal";
	var _fontWeight = "normal";
	var _fontSize = 12;
	var _textDecoration = "none";
	var _letterSpacing = "normal";
	var _wordSpacing = "normal";
	var _textTransform = "none";
	var _title = null;
	
	/*	Targets and Actions	*/
	var _target = null;
	var _action = null;
	
	/*	Image	*/
	var _image = null;
	var _imageRepeat = "repeat";
	
	/*	Tag	*/
	var _tag = 0;
	
	/*	Menus	*/
	var _menu = null;
	
	/*	Representing an object	*/
	var _representedObject = null;
	
	/*	View Init	*/
	var _pageDisplay = document.createElement('div');
	_pageDisplay.style.position = "absolute";
	_pageDisplay.style.left = "0";
	_pageDisplay.style.top = "0";
	_pageDisplay.style.width = "0";
	_pageDisplay.style.height = "0";
	_pageDisplay.style.overflow = "hidden";
	_pageDisplay.style.textAlign = "left";
	_pageDisplay.style.fontColor = "black";
	_pageDisplay.style.fontFamily = "sans-serif";
	_pageDisplay.style.baseWritingDirection = MokaWritingDirectionLeftToRight;
	_pageDisplay.style.fontStyle = "normal";
	_pageDisplay.style.fontVariant = "normal";
	_pageDisplay.style.fontWeight = "normal";
	_pageDisplay.style.fontSize = "12px";
	_pageDisplay.style.textDecoration = "none";
	_pageDisplay.style.letterSpacing = "normal";
	_pageDisplay.style.wordSpacing = "normal";
	_pageDisplay.style.textTransform = "none";
	
	
	
	
	
	//Initialization
	/*id*/ this.initTextCell = function(aString){
		this.supers().init();
		
		this.setType(MokaTextCellType);
		this.setTitle(aString);
		return this;
	}
	/*id*/ this.initImageCell = function(anImage){
		this.supers().init();
		
		_stringValue.init();
		_frame.init();
		_title.init();
		_image.init();
		
		this.setType(MokaImageCellType);
		this.setImage(anImage);
		return this;
	}	
	
	//Setting cell values
	/*id*/ this.objectValue = function(){
		return _objectValue;
	}	
	/*void*/ this.setObjectValue = function(anObject){
		if( typeof(anObject.isKindOfClass) != "function" ){
			return;
		}

		if( !anObject.isKindOfClass(MokaObject) ){
			return;
		}
		
		_objectValue = anObject;
	}
	/*void*/ this.setNumberValue = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		

		_numberValue = aFloat;
	}
	/*void*/ this.setStringValue = function(aString){
		if( typeof(aString.isKindOfClass) != "function" ){
			return;
		}

		if( !aString.isKindOfClass(MokaString) ){
			return;
		}

		_stringValue = aString;
	}
	
	//Setting cell attributes
	/*MokaCellType*/ this.type = function(){
		return _type;
	}	
	/*void*/ this.setType = function(aCellType){
		switch(aCellType){
			case MokaNullCellType:
				while(0 < _pageDisplay.childNodes.length){
					_pageDisplay.removeChild(_pageDisplay.childNodes[0]);
				}
				_type = aCellType;
				break;
			case MokaTextCellType:
				_type = aCellType;
				this.setTitle(this.title());
				break;
			case MokaImageCellType:
				_type = aCellType;
				this.setImage(this.image());
				break;
			default:
				return;
		}
	}
	/*bool*/ this.isEnabled = function(){
		return _isEnabled;
	}
	/*void*/ this.setIsEnabled = function( yn ){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
				
		_isEnabled = yn;
	}
	/*bool*/ this.isHidden = function(){
		return _isHidden;
	}
	/*void*/ this.setIsHidden = function( yn ){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isHidden = yn;
		
		_pageDisplay.style.visibility = ( yn ? "hidden" : "visible" );
		
	}
	/*bool*/ this.isBordered = function(){
		return _isBordered;
	}	
	/*void*/ this.setIsBordered = function( yn ){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isBordered = yn;
		
		_pageDisplay.style.border = ( yn ? this.borderSize()+"pz "+this.borderStyle()+" "+this.borderColor() : "none" );
		
	}
	/*bool*/ this.isOpaque = function(){
		return _isOpaque;
	}	
	/*void*/ this.setIsOpaque = function( yn ){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isOpaque = yn;
		
		_pageDisplay.style.backgroundColor = ( yn ? this.backgroundColor() : "transparent" );
		
	}
	
	//Set the state
	/*bool*/ this.allowsMixedState = function(){
		return _allowsMixedState;
	}	
	/*void*/ this.setAllowsMixedState = function(yn){
		if( typeof(yn) != "bool" ){
			return;
		}
		_allowsMixedState = yn;
	}
	/*MokaState*/ this.nextState = function(){
		return _nextState;
	}
	
	/*void*/ this.setNextState = function(){
		if( this.allowsMixedState() ){

			if( this.state() == MokaOnState ){ _nextState = MokaOffState;	}
			else if( this.state() == MokaOffState ){ _nextState = MokaMixedState;	}
			else { _nextState = MokaOnState; }

		} else {
			_nextState = ( this.state() == MokaOnState ? MokaOffState : MokaOnState );
		}
	}
	/*MokaState*/ this.state = function(){
		return _state;
	}	
	/*void*/ this.setState = function(aState){
		if( aState != MokaOnState && aState != MokaOffState && aState != MokaMixedState ){
			return;
		}
		_state = aState;
	}
	
	//Set the frame, frame origin, and frame size
	/*MokaRect*/ this.frame = function(){
		return _frame;
	}
	/*void*/ this.setFrame = function( aRect ){
		if( typeof aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		

		_frame = aRect.copy();
		
		_pageDisplay.style.left = _frame.origin().x()+MokaPageSizeUnits;
		_pageDisplay.style.top = _frame.origin().y()+MokaPageSizeUnits;
		
		_pageDisplay.style.width = _frame.size().width()-2*this.padding()+MokaPageSizeUnits;
		_pageDisplay.style.height = _frame.size().height()-2*this.padding()+MokaPageSizeUnits;
		
	}
	/*void*/ this.setFrameOrigin = function( aPoint ){
		if( typeof aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		//alert("!");
		_frame.setOrigin( aPoint.copy() );
		
		_pageDisplay.style.left = this.frame().origin().x()+MokaPageSizeUnits;
		_pageDisplay.style.top = this.frame().origin().y()+MokaPageSizeUnits;
		
	}
	/*void*/ this.setFrameSize = function( aSize ){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_frame.setSize( aSize.copy() );
		
		_pageDisplay.style.width = this.frame().size().width()-2*this.padding()+MokaPageSizeUnits;
		_pageDisplay.style.height = this.frame().size().height()-2*this.padding()+MokaPageSizeUnits;
		
	}
	
	//Size of the cell
	/*MokaSize*/ this.cellSize = function(){
		if( this.type() == MokaTextCellType ){
			return new MokaSize( 2*this.borderSize() + 2*this.padding() + this.title().length()*this.fontSize(), 2*this.borderSize() + ( this.title().length() ? 1 : 0 )*this.fontSize() );
		} else if( this.type() == MokaImageCellType ){
			if( this.image() ){
				return new MokaSize( 2*this.borderSize() + 2*this.padding() + this.image().size().width(), 2*this.borderSize() + this.image().size().width(), 2 );
			} else {
				return new MokaSize(2*this.borderSize() + 2*this.padding(),2*this.borderSize() + 2*this.padding());
			}
		} else {
			return new MokaSize(10000,10000);
		}
	}

	//Getting the page display
	/*div*/ this.pageDisplay = function(){
		return _pageDisplay.cloneNode(YES);
	}
	
	//Set the display attributes
	/*string*/ this.backgroundColor = function(){
		return _backgroundColor;
	}	
	/*void*/ this.setBackgroundColor = function( aColor ){
		if( typeof(aColor) != "string" ){
			return;
		}
		
		_backgroundColor = aColor;
		
		_pageDisplay.style.backgroundColor = ( this.isOpaque() ? "transparent" : aColor );
		
	}
	/*float*/ this.borderSize = function(){
		return _borderSize;
	}
	/*void*/this.setBorderSize = function( aFloat ){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_borderSize = aFloat;
		
		_pageDisplay.style.border = ( yn ? _borderSize+MokaPageSizeUnits + " "+this.borderStyle()+" "+this.borderColor() : "none" );
	}
	/*string*/ this.borderStyle = function(){
		return _borderStyle;
	}	
	/*void*/ this.setBorderStyleToSolid = function(){
		_borderStyle = "solid";
		
		_pageDisplay.style.border = ( yn ? this.borderSize()+MokaPageSizeUnits + " "+_borderStyle+" "+this.borderColor() : "none" );
	}
	/*void*/ this.setBorderStyleToDotted = function(){
		_borderStyle = "dotted";
		
		_pageDisplay.style.border = ( yn ? this.borderSize()+MokaPageSizeUnits + " "+_borderStyle+" "+this.borderColor() : "none" );
	}
	/*void*/ this.setBorderStyleToDashed = function(){
		_borderStyle = "dashed";
		
		_pageDisplay.style.border = ( yn ? this.borderSize()+MokaPageSizeUnits + " "+_borderStyle+" "+this.borderColor() : "none" );
	}
	/*string*/ this.borderColor = function(){
		return _borderColor;
	}	
	/*void*/ this.setBorderColor = function( aColor ){
		if( typeof aColor == undefined ){ return; }
		if( typeof(aColor) != "string" ){ return; }
		
		_borderColor = aColor;
		
		_pageDisplay.style.border = ( yn ? this.borderSize()+MokaPageSizeUnits + " "+this.borderStyle()+" "+_borderColor : "none" );
		
	}
	/*int*/ this.zIndex = function(){
		return _zIndex;
	}	
	/*void*/ this.setZIndex = function(anInt){
		if( typeof anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		_zIndex = anInt;
		_pageDisplay.style.zIndex = anInt;
	}
	/*float*/ this.opacity = function(){
		return _opacity;
	}	
	/*void*/ this.setOpacity = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		if( aFloat < 0 ){ aFloat = 0; }
		if( aFloat > 1 ){ aFloat = 1; }
		
		_opacity = aFloat;
		
		_pageDisplay.style.opacity = aFloat;
	}
	/*float*/ this.padding = function(){
		return _padding;
	}	
	/*void*/ this.setPadding = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_padding = ( aFloat > 0 ? aFloat : 0 );
		_pageDisplay.style.padding = _padding+MokaPageSizeUnits;
	}
	
	//Focus Ring
	/*bool*/ this.hasFocusRing = function(){
		return _hasFocusRing;
	}	
	/*void*/ this.setHasFocusRing = function( yn ){
		if( typeof(yn) != "boolean" ){ return; }
		_hasFocusRing = yn;
		if( !yn ){ this.hideFocusRing(); }
	}
	/*void*/ this.showFocusRing = function(){
		if( this.hasFocusRing() ){
			this.padeDisplay().style.outline = "2" + MokaPageSizeUnits + " solid lightgrey";
		}
	}
	/*void*/ this.hideFocusRing = function(){
		_pageDisplay.style.outline = "none";
	}
	
	//Set the textual attributes
	/*MokaTextAlign*/ this.textAlign = function(){
		return _textAlign;
	}	
	/*void*/ this.setTextAlign = function(align){
		if( align != 0 && align != 1 && align != 2 && align != 3 ){ return; }
		_textAlign = align;
		switch( _textAlign ){
			case MokaLeftTextAlignment:
				_pageDisplay.style.textAlign = "left";
				break;
			case MokaRightTextAlignment:
				_pageDisplay.style.textAlign = "right";
				break;
			case MokaCenterTextAlignment:
				_pageDisplay.style.textAlign = "center";
				break;
			case MokaJustifiedTextAlignment:
				_pageDisplay.style.textAlign = "justify";
				break;
		}
	}
	/*string*/ this.fontColor = function(){
		return _fontColor;
	}	
	/*void*/ this.setFontColor = function( aColor ){
		if( typeof aColor == undefined ){ return; }
		if( typeof(aColor) != "string" ){ return; }
		
		
		_fontColor = aColor;
		
		_pageDisplay.style.color = aColor;
	}
	/*string*/ this.fontFamily = function(){
		return _fontFamily;
	}	
	/*void*/ this.setFontFamily = function( aFontFamily ){
		if( typeof(aFontFamily) != "string" ){
			return;
		}
		_fontFamily = aFontFamily;
		_pageDisplay.style.fontFamily = aFontFamily;
	}
	/*MokaWritingDirection*/ this.baseWritingDirection = function(){
		return _baseWritingDirection;
	}	
	/*void*/ this.setBaseWritingDirection = function(ltr){
		if( typeof ltr == undefined ){ return; }
		if( ltr != 0 && ltr != 1 ){ return; }
		_baseWritingDirection = ltr;
		
		_pageDisplay.style.direction = ( _baseWritingDirection == MokaWritingDirectionLeftToRight ? "ltr" : "rtl" );
	}
	/*string*/ this.fontStyle = function(){
		return _fontStyle;
	}
	/*void*/ this.setRegularFontStyle = function(){
		_fontStyle = "regular";
		this.pageDisplay().style.fontStyle = "regular";
	}
	/*void*/ this.setItalicFontStyle = function(){
		_fontStyle = "italic";
		this.pageDisplay().style.fontStyle = "italic";
	}
	/*string*/ this.fontVariant = function(){
		return _fontVariant;
	}
	/*void*/ this.setNormalFontVariant = function(){
		_fontVariant = "normal";
		this.pageDisplay().style.fontVariant = "normal";
	}
	/*void*/ this.setSmallCapsFontVariant = function(){
		_fontVariant = "small-caps";
		this.pageDisplay().style.fontVariant = "small-caps";
	}	
	/*string*/ this.fontWeight = function(){
		return _fontWeight;
	}
	/*void*/ this.setNormalFontWeight = function(){
		_fontWeight = "normal";
		this.pageDisplay().style.fontWeight = "normal";
	}
	/*void*/ this.setLighterFontWeight = function(){
		_fontWeight = "lighter";
		this.pageDisplay().style.fontWeight = "lighter";
	}
	/*void*/ this.setBoldFontWeight = function(){
		_fontWeight = "bold";
		this.pageDisplay().style.fontWeight = "bold";
	}
	/*float*/ this.fontSize = function(){
		return _fontSize;
	}	
	/*void*/ this.setFontSize = function( aFloat ){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
				
		_fontSize = aFloat;
		_pageDisplay.style.fontSize = aFloat+MokaPageSizeUnits;
	}
	/*string*/ this.textDecoration = function(){
		return _textDecoration;
	}
	/*void*/ this.setTextDecoration = function(decoration){
		if( decoration == undefined ){ return; }
		if( !MokaNumberIsInt(decoration) ){ return; }
		
		var dec = "";
		if( decoration & MokaTextDecorationUnderline ){ dec += "underline"; }
		if( decoration & MokaTextDecorationOverline ){ dec += ( dec.length == 0 ? "" : " " ) + "overline"; }
		if( decoration & MokaTextDecorationLineThrough ){ dec += ( dec.length == 0 ? "" : " " ) + "line-through"; }
		
		_textDecoration = dec;
		this.pageDisplay().style.textDecoration = dec;
	}
	/*string*/ this.letterSpacing = function(){
		return _letterSpacing;
	}
	/*void*/ this.setNormalLetterSpacing = function(){
		_letterSpacing = "normal";
		this.pageDisplay().style.letterSpacing = "normal";
	}
	/*void*/ this.setAdditionalLetterSpacing = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_letterSpacing = aFloat+"";
		this.pageDisplay().style.letterSpacing = aFloat+"em";
	}
	/*string*/ this.wordSpacing = function(){
		return _wordSpacing;
	}
	/*void*/ this.setNormalwordSpacing = function(){
		_wordSpacing = "normal";
		this.pageDisplay().style.wordSpacing = "normal";
	}
	/*void*/ this.setAdditionalwordSpacing = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_wordSpacing = aFloat+"";
		this.pageDisplay().style.wordSpacing = aFloat+"em";
	}
	/*string*/ this.textTransform = function(){
		return _textTransform;
	}
	/*void*/ this.setTextTransform = function(aTextTransform){
		if( aTextTransform == undefined ){ return; }
		if( !MokaNumberIsInt(aTextTransform) ){ return; }
		
		switch(aTextTransform){
			case MokaTextTransformCapitalize:
				_textTransform = "capitalize";
				this.pageDisplay().style.textTransform = "capitalize";
				break;
			case MokaTextTransformUppercase:
				_textTransform = "uppercase";
				this.pageDisplay().style.textTransform = "uppercase";
				break;
			case MokaTextTransformLowercase:
				_textTransform = "lowercase";
				this.pageDisplay().style.textTransform = "lowercase";
				break;
			default:
				_textTransform = "none";
				this.pageDisplay().style.textTransform = "none";
				break;
		}
	}	
	/*MokaString*/ this.title = function(){
		return _title;
	}	
	/*void*/ this.setTitle = function( aString ){
		if( typeof aString == undefined ){ return; }
		if( aString != null && typeof(aString.isKindOfClass) != "function" ){ return; }
		if( aString != null && !aString.isKindOfClass(MokaString) ){ return; }
		
		_title = aString;
		if( this.type() == MokaTextCellType ){
			while(0 < _pageDisplay.childNodes.length){
				_pageDisplay.removeChild(_pageDisplay.childNodes[0]);
			}
			if( aString != null ){
				_pageDisplay.appendChild( document.createTextNode(this.title().characters()) );
			}
		}
	}

	//Set the target and action
	/*id*/ this.target = function(){
		return _target;
	}	
	/*void*/ this.setTarget = function(anObject){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_target = anObject;
	}
	/*MokaSelect*/ this.action = function(){
		return _action;
	}	
	/*void*/ this.setAction = function(aSelector){
		if( typeof aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		
		_action = aSelector;
	}
	
	//Set the image
	/*MokaImage*/ this.image = function(){
		return _image;
	}	
	/*void*/ this.setImage = function(anImage){
		if( anImage === null ){
			_image = null;
			_pageDisplay.style.backgroundImage = null;
		} else if( !is(anImage,MokaImage) ){ return; }
		
		_image = anImage;
		if( this.type() == MokaImageCellType ){
			_pageDisplay.style.backgroundImage = anImage.location();
		}
	}
	/*MokaImageRepeat*/ this.imageRepeat = function(){
		return _imageRepeat;
	}
	/*void*/ this.setImageRepeat = function(repeat){
		if( !is(repeat,"int") && repeat < MokaImageRepeatNone && repeat > MokaImageRepeatBoth ){ return; }
		_imageRepeat = repeat;
		_pageDisplay.style.backgroundRepeat = ["no-repeat","repeat-x","repeat-y","repeat"][repeat];
	}
	
	//Set the tag
	/*int*/ this.tag = function(){
		return _tag;
	}	
	/*void*/ this.setTag = function( anInt ){
		if( typeof anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		

		_tag = anInt;
	}

	//Set the menu
	/*MokaMenu*/ this.menu = function(){
		return _menu;
	}	
	/*void*/ this.setMenu = function(aMenu){
		if( typeof aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }
		
		_menu = aMenu;
	}
	
	//Set the represented object
	/*id*/ this.representedObject = function(){
		return _representedObject;
	}	
	/*void*/ this.setRepresentedObject = function(anObject){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_representedObject = anObject;
	}
	

}

//States
MokaMixedState	= -1;
MokaOffState	= 0;
MokaOnState		= 1;

//Cell types
MokaNullCellType	= 0;
MokaTextCellType	= 1;
MokaImageCellType	= 2;

//MokaTextDecoration
MokaTextDecorationNone			= 0;
MokaTextDecorationUnderline		= 1 << 0;
MokaTextDecorationOverline		= 1 << 1;
MokaTextDecorationLineThrough	= 1 << 2;

//MokaTextTransform
MokaTextTransformNone			= 0;
MokaTextTransformCapitalize		= 1;
MokaTextTransformUppercase		= 2;
MokaTextTransformLowercase		= 3;

//MokaImageRepeat
MokaImageRepeatNone	= 0;
MokaImageRepeatX	= 1;
MokaImageRepeatY	= 2;
MokaImageRepeatBoth	= 3;