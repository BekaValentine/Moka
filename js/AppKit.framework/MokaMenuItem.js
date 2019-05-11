function MokaMenuItem(){
	this.extend(MokaObject);

	/*	Is separator	*/
	var _isSeparatorItem = NO;
	
	/*	Is enabled	*/
	var _isEnabled = YES;
	
	/*	Target and Action	*/
	var _target = null;
	var _action = null;
	
	/*	Submenu	*/
	var _hasSubmenu = NO;
	var _submenu = null;
	
	/*	Owning menu	*/
	var _menu = null;
	
	/*	Image	*/
	var _hasImage = NO;
	var _image = new MokaImage;
	var _onStateImage = new MokaImage;
	var _offStateImage = new MokaImage;
	var _mixedStateImage = new MokaImage;
	
	/*	Indentation	*/
	var _indentationLevel = 0;
	
	/*	Title	*/
	var _title = "Menu item";
	
	/*	State	*/
	var _state = MokaOffState;
	
	/*	Tag	*/
	var _tag = 0;
	
	/*	Tool tip	*/
	var _tooltip = "Menu item";
	
	/*	Key equivalent	*/
	var _keyEquivalent = null;
	
	/*	Alternate Menu Item	*/
	var _alternate = null;
	
	/*	Represented object	*/
	var _representedObject = null;
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_image.init();
		_onStateImage.init();
		_offStateImage.init();
		_mixedStateImage.init();
		
		return this;
	}
	
	//Making menu items
	/*bool*/ this.isSeparatorItem = function(){
		return _isSeparatorItem;
	}
	/*void*/ this.setIsSeparatorItem = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isSeparatorItem = yn;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	
	//Set enabled
	/*bool*/ this.isEnabled = function(){
		return _isEnabled;
	}	
	/*void*/ this.setIsEnabled = function( yn ){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isEnabled = yn;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	
	//Set target and action
	/*id*/ this.target = function(){
		return _target;
	}	
	/*void*/ this.setTarget = function( anObject ){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_target = anObject;
	}
	/*MokaSelector*/ this.action = function(){
		return _action;
	}	
	/*void*/ this.setAction = function( anAction ){
		if( typeof anAction == undefined ){ return; }
		if( typeof(anAction.isKindOfClass) != "function" ){ return; }
		if( !anAction.isKindOfClass(MokaSelector) ){ return; }
		
		_action = anAction;
	}
	
	//Set submenu
	/*bool*/ this.hasSubmenu = function(){
		return _submenu;
	}	
	/*void*/ this.setHasSubmenu = function( yn ){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_hasSubmenu = yn;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	/*MokaMenu*/ this.submenu = function(){
		return _submenu;
	}	
	/*void*/ this.setSubmenu = function( aMenu ){
		if( typeof aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }
		
		_submenu = aMenu;
		if( !this.submenu().title() ){ this.submenu().setTitle(this.title()); }
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	
	//Set the owning menu
	/*MokaMenu*/ this.menu = function(){
		return _menu;
	}	
	/*void*/ this.setMenu = function( aMenu ){
		if( typeof aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }
		
		
		_menu = aMenu;
	}
	
	//Set the image
	/*bool*/ this.hasImage = function(){
		return _hasImage;
	}	
	/*void*/ this.setHasImage = function( yn ){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		
		_hasImage = yn;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	/*MokaImage*/ this.image = function(){
		return _image;
	}	
	/*void*/ this.setImage = function( anImage ){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_image = anImage;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	/*MokaImage*/ this.onStateImage = function(){
		return _onStateImage;
	}	
	/*void*/ this.setOnStateImage = function( anImage ){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_onStateImage = anImage;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	/*MokaImage*/ this.offStateImage = function(){
		return _offStateImage;
	}	
	/*void*/ this.setOffStateImage = function( anImage ){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_offStateImage = anImage;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	/*MokaImage*/ this.mixedStateImage = function(){
		return _mixedStateImage;
	}	
	/*void*/ this.setMixedStateImage = function( anImage ){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_mixedStateImage = anImage;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	
	//Set the indentation level
	/*int*/ this.indentationLevel = function(){
		return _indentationLevel;
	}
	/*void*/ this.setIndentationLevel = function( anIndentationLevel ){
		if( typeof anIndentationLevel == undefined ){ return; }
		if( !MokaNumberIsInt(anIndentationLevel) ){ return; }
		
		
		_indentationLevel = anIndentationLevel;
		if( this.menu() ){ this.menu().itemChanged(this); }
	
	}

	//Set the title
	/*MokaString*/ this.title = function(){
		return _title;
	}	
	/*void*/ this.setTitle = function( aTitle ){
		if( typeof aTitle == undefined ){ return; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
		if( !aTitle.isKindOfClass(MokaString) ){ return; }
		
		
		_title = aTitle;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	
	//Set states and type
	/*MokaState*/ this.state = function(){
		return _state;
	}	
	/*void*/ this.setState = function( aState ){
		if( aState != 0 && aState != 1 && aState != -1 ){ return; }
		
		_state = aState;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	
	//Set tag
	/*int*/ this.tag = function(){
		return _tag;
	}	
	/*void*/ this.setTag = function( aTag ){
		if( typeof anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		
		_tag = aTag;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	
	//Set tool tip
	/*MokaString*/ this.toolTip = function(){
		return _toolTip;
	}	
	/*void*/ this.setToolTip = function( aToolTip ){
		if( typeof aToolTip == undefined ){ return; }
		if( typeof(aToolTip.isKindOfClass) != "function" ){ return; }
		if( !aToolTip.isKindOfClass(MokaString) ){ return; }
		
		
		_toolTip = aToolTip;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	
	//Set key equiv
	/*MokaString*/ this.keyEquivalent = function(){
		return _keyEquivalent;
	}	
	/*void*/ this.setKeyEquivalent = function( aKeyEquivalent ){
		if( typeof aKeyEquivalent == undefined ){ return; }
		if( typeof(aKeyEquivalent.isKindOfClass) != "function" ){ return; }
		if( !aKeyEquivalent.isKindOfClass(MokaString) ){ return; }
		
		
		_keyEquivalent = aKeyEquivalent;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	
	//Setting the alternate
	/*MokaMenuItem*/ this.alternate = function(){
		return _alternate;
	}	
	/*void*/ this.setAlternate = function(aMenuItem){
		if( typeof aMenuItem == undefined ){ return; }
		if( typeof(aMenuItem.isKindOfClass) != "function" ){ return; }
		if( !aMenuItem.isKindOfClass(MokaMenuItem) ){ return; }
		
		_alternate = aMenuItem;
		if( this.menu() ){ this.menu().itemChanged(this); }
	}
	
	//Represented object
	/*id*/ this.representedObject = function(){
		return _representedObject;
	}
	/*void*/ this.setRepresentedObject = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_representedObject = anObject;
	}
	
}

/*MokaMenuItem*/ MokaMenuItem.menuItemWithTitleTargetActionAndKeyEquivalent = function( aTitle, aTarget, anAction, aKeyEquivalent ){
	if( typeof aTitle == undefined ){ return; }
	if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
	if( !aTitle.isKindOfClass(MokaString) ){ return; }
	if( typeof aTarget == undefined ){ return; }
	if( typeof(aTarget.isKindOfClass) != "function" ){ return; }
	if( typeof anAction == undefined ){ return; }
	if( typeof(anAction.isKindOfClass) != "function" ){ return; }
	if( !anAction.isKindOfClass(MokaSelector) ){ return; }
	if( typeof aKeyEquivalent == undefined ){ return; }
	if( typeof(aKeyEquivalent.isKindOfClass) != "function" ){ return; }
	if( !aKeyEquivalent.isKindOfClass(MokaString) ){ return; }
	
	var newMenuItem = this.makeAndInit();
	newMenuItem.setTitle(aTitle);
	newMenuItem.setTarget(aTarget);
	newMenuItem.setAction(anAction);
	newMenuItem.setKeyEquivalent(aKeyEquivalent);
	return newMenuItem;
}
