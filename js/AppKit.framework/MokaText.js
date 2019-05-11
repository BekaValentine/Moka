function MokaText(){
	this.extend(MokaView);
	
	/*	Characters	*/
	var _paragraphs = MokaArray.make().init();
	
	/*	Graphics attributes	*/
	var _backgroundColor = MokaColor.clearColor();
	var _drawsBackground = NO;
	
	/*	Behavioral Attributes	*/
	var _isEditable = YES;
	var _isSelectable = YES;
	var _isFieldEditor = NO;
	var _isRichText = NO;
	var _importsGraphics = NO;
	
	/*	Using the font panel and menu	*/
	var _usesFontPanel = YES;
	
	/*	Selection	*/
	var _selectedRange = $r(0,0);
	
	/*	Font	*/
	var _font = MokaFont.make().init();
	
	/*	Base Writing Direction	*/
	var _baseWritingDirection = MokaWritingDirectionLeftToRight;
	
	/*	Size constraints	*/
	var _minSize = null;
	var _maxSize = null;
	var _isVerticallyResizable = YES;
	var _isHorizontallyResizable = NO;
	
	/*	Delegate	*/
	var _delegate = null;
	
	
	
	
	
	
	//Getting the characters
	/*MokaString*/ this.string = function(){
		return _paragraphs.joinComponentsWithString($s("\n"));
	}
	/*void*/ this.setString = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_paragraphs = aString.componentsSeparatedByString($s("\n"));
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Graphics attributes
	/*MokaColor*/ this.backgroundColor = function(){
		return _backgroundColor;
	}
	/*void*/ this.setBackgroundColor = function(aColor){
		if( aColor == undefined ){ return; }
		if( typeof(aColor.isKindOfClass) != "function" ){ return; }
		if( !aColor.isKindOfClass(MokaColor) ){ return; }
		
		_backgroundColor = aColor;
		
	}
	/*bool*/ this.drawsBackground = function(){
		return _drawsBackground;
	}
	/*void*/ this.setDrawsBackground = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_drawsBackground = yn;
		
	}
	
	//Behavioral attributes
	/*bool*/ this.isEditable = function(){
		return _isEditable;
	}
	/*void*/ this.setIsEditable = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isEditable = yn;
		this.setIsSelectable( ys ? YES : this.isSelectable() );
	}
	/*bool*/ this.isSelectable = function(){
		return _isSelectable;
	}
	/*void*/ this.setIsSelectable = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isSelectable = yn;
	}
	/*bool*/ this.isFieldEditor = function(){
		return _isFieldEditor;
	}
	/*void*/ this.setIsFieldEditor = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isFieldEditor = yn;
	}
	/*bool*/ this.isRichText = function(){
		return _isRichText;
	}
	/*void*/ this.setIsRichText = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isRichText = yn;
		this.setImportsGraphics( !yn ? NO : this.importsGraphics() );
	}
	/*bool*/ this.importsGraphics = function(){
		return _importsGraphics;
	}
	/*void*/ this.setImportsGraphics = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_importsGraphics = yn;
		this.setIsRichText( yn ? YES : this.isRichText() );
	}
	
	//Using the font panel and menu
	/*bool*/ this.usesFontPanel = function(){
		return _usesFontPanel;
	}
	/*void*/ this.setUsesFontPanel = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_usesFontPanel = yn;
	}
	
	//Using the ruler
	/*void*/ this.toggleRuler = function(){
		var sv = this.enclosingScrollView();
		if( sv && sv.documentView() == this ){
			sv.setRulersVisible( !sv.rulersVisible() );
		}
	}
	/*bool*/ this.isRulerVisible = function(){
		var sv = this.enclosingScrollView();
		if( sv && sv.documentView() == this ){
			return sv.rulersVisible();
		}
		return NO;
	}
	
	//Selected range
	/*MokaRange*/ this.selectedRange = function(){
		return _selectedRange;
	}
	/*void*/ this.setSelectedRange = function(aRange){
		if( aRange == undefined ){ return; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return; }
		if( !aRange.isKindOfClass(MokaRange) ){ return; }
		
		_selectedRange = aRange;
	}
	
	//Replacing text
	/*void*/ this.replaceCharactersInRangeWithRTF = function(aRange, rtf){
		
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.replaceCharactersInRangeWithRTFD = function(aRange, rtfd){
		
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.replaceCharactersInRangeWithString = function(aRange,aString){
		if( aRange == undefined ){ return; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return; }
		if( !aRange.isKindOfClass(MokaRange) ){ return; }
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Action methods for editing
	/*void*/ this.selectAll = function(sender){
		
	}
	/*void*/ this.copy = function(sender){
		
	}
	/*void*/ this.cut = function(sender){
		
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.paste = function(sender){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.copyFont = function(sender){
		
	}
	/*void*/ this.pasteFont = function(sender){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.copyRuler = function(sender){
		
	}
	/*void*/ this.pasteRuler = function(sender){
		
	}
	/*void*/ this.del = function(sender){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																					this );
	}
	
	//Changing the font
	/*MokaFont*/ this.font = function(){
		
	}
	/*void*/ this.setFont = function(aFont){
		if( aFont == undefined ){ return; }
		if( typeof(aFont.isKindOfClass) != "function" ){ return; }
		if( !aFont.isKindOfClass(MokaFont) ){ return; }
		
		
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																					this );
	}
	/*void*/ this.setFontInRange = function(aFont,aRange){
		
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.changeFont = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Text alignment
	/*MokaTextAlignment*/ this.alignment = function(){
		
	}
	/*void*/ this.setAlignment = function(aTextAlignment){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.alignLeft = function(sender){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.alignCenter = function(sender){
		
		draw
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.alignRight = function(sender){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Changing the text color
	/*MokaColor*/ this.textColor = function(){
		
	}
	/*void*/ this.setTextColor = function(aColor){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.setTextColorInRange = function(aColor,aRange){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Setting the writing direction
	/*MokaWritingDirection*/ this.baseWritingDirection = function(){
		return _baseWritingDirection;
	}
	/*void*/ this.setBaseWritingDirection = function(wd){
		if( wd != MokaWritingDirectionNatural && wd != MokaWritingDirectionLeftToRight && wd != MokaWritingDirectionRightToLeft ){ return; }
		
		_baseWritingDirection = wd;
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Super- and subscripting
	/*void*/ this.superscript = function(sender){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.subscript = function(sender){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.unscript = function(sender){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Lining text
	/*void*/ this.addUnderline = function(){
		
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.removeUnderline = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.addStrike = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.removeStrike = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.addOverline = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.removeOverline = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Paragraph indenting
	/*float*/ this.indentation = function(){
		
		
		
	}
	/*void*/ this.setIndentation = function(aFloat){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																					this );
	}
	
	//Letter spacing and word spacing
	/*??*/ this.letterSpacing = function(){
		return this.tracking();
	}
	/*??*/ this.tracking = function(){
		
	}
	/*void*/ this.setLetterSpacing = function(letterSpacing){
		if( typeof(letterSpacing) != "string" && typeof(letterSpacing) != "number" ){ return; }
		this.setTracking(letterSpacing);
	}
	/*void*/ this.setTracking = function(tracking){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*??*/ this.wordSpacing = function(){
		
	}
	/*void*/ this.setWordSpacing = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*??*/ this.kerning = function(){
		
	}
	/*void*/ this.setKerning = function(normalOrFloat){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Text transforms
	/*void*/ this.capitalize = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.uppercase = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.lowercase = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	/*void*/ this.removeTextTransforms = function(){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Leading
	/*??*/ this.lineHeight = function(){
		return this.leading();
	}
	/*??*/ this.leading = function(){
		
	}
	/*void*/ this.setLineHeight = function(lineHeight){
		if( typeof(lineHeight) != "string" && typeof(lineHeight) != "number" ){ return; }
		this.setLeading(lineHeight);
	}
	/*void*/ this.setLeading = function(leading){
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTextDidChangeNotification,
																				this );
	}
	
	//Size
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( typeof aSize == undefined ){ return this.frame().size(); }
		if( typeof(aSize.isKindOfClass) != "function" ){ return this.frame().size(); }
		if( !aSize.isKindOfClass(MokaSize) ){ return this.frame().size(); }
		
		var newSize = aSize.copy();
		
		if( newSize.height() < 0 ){ newSize.setHeight( 0 ); }
		if( newSize.width() < 0 ){ newSize.setWidth( 0 ); }
		if( this.minSize() && newSize.width() < this.minSize().width() ){ newSize.setWidth(this.minSize().width()); }
		if( this.minSize() && newSize.height() < this.minSize().height() ){ newSize.setHeight(this.minSize().height()); }
		if( this.maxSize() && newSize.width() < this.maxSize().width() ){ newSize.setWidth(this.maxSize().width()); }
		if( this.maxSize() && newSize.height() < this.maxSize().height() ){ newSize.setHeight(this.maxSize().height()); }
		
		return newSize;
	}
	
	//Reading HTML
	/*bool*/ this.readHTMLFromURL = function(aURL){
		
	}
	/*MokaString*/ this.HTMLFromRange = function(aRange){
		
	}
	
	//Scrolling
	/*void*/ this.scrollRangeToVisible = function(aRange){
		
	}
	
	//Delegate
	/*id*/ this.delegate = function(){
		return _delegate;
	}
	/*void*/ this.setDelegate = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_delegate = anObject;
	}
	
	//Paragraphs in selected text
	/*MokaArray*/ this._paragraphsInSelection = function(){
		
	}
	
	
	/*MokaSize*/ this.minSize = function(){
		return _minSize;
	}
	/*void*/ this.setMinSize = function(aSize){
		if( aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		aSize = aSize.copy();
		
		if( this.maxSize() && aSize.width() > this.maxSize().width() ){
			aSize.setWidth(this.maxSize().width() );
		}
		if( this.maxSize() && aSize.height() > this.maxSize().height() ){
			aSize.setHeight(this.maxSize().height());
		}
		
		_minSize = aSize;
		
		if( this.frame().size().width() < aSize.width() || this.frame().size().height() < aSize.height() ){
			this.setFrameSize(aSize);
		}
	}
	/*MokaSize*/ this.maxSize = function(){
		return _maxSize;
	}
	/*void*/ this.setMaxSize = function(aSize){
		if( aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		aSize = aSize.copy();
		
		if( this.minSize() && aSize.width() < this.minSize().width() ){
			aSize.setWidth(this.minSize().width() );
		}
		if( this.minSize() && aSize.height() < this.minSize().height() ){
			aSize.setHeight(this.minSize().height());
		}
		
		_maxSize = aSize;
		
		if( this.frame().size().width() > aSize.width() || this.frame().size().height() > aSize.height() ){
			this.setFrameSize(aSize);
		}
	}
	/*bool*/ this.isVerticallyResizable = function(){
		return _isVerticallyResizable;
	}
	/*void*/ this.setIsVerticallyResizable = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isVerticallyResizable = yn;
		this.sizeToFit();
	}
	/*bool*/ this.isHorizontallyResizable = function(){
		return _isHorizontallyResizable;
	}
	/*void*/ this.setIsHorizontallyResizable = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isHorizontallyResizable = yn;
		this.sizeToFit();
	}
	/*void*/ this.sizeToFit = function(){
		
	}
	
}

//MokaWritingDirection
MokaWritingDirectionNatural		= -1;
MokaWritingDirectionLeftToRight	= 0;
MokaWritingDirectionRightToLeft	= 1;

//Notifications
MokaTextDidChangeNotification = $s("MokaTextDidChangeNotification");
