function MokaToolbarItem(){
	this.extend(MokaObject);
	
	/*	Attributes	*/
	var _itemIdentifier = $s("");
	var _toolbar = null;
	var _label = $s("Toolbar Item");
	var _paletteLabel = $s("Toolbar Item");
	var _toolTip = $s("A toolbar item.");
	var _menuFormRepresentation = MokaMenuItem.make().init();
	var _tag = 0;
	var _target = null;
	var _action = null;
	var _isEnabled = YES;
	var _image = null;
	var _view = null;
	var _minSize = new MokaSize;
	var _maxSize = new MokaSize;
	
	/*	Visibility Priority	*/
	var _visibilityPriority = MokaToolbarItemVisibilityPriorityStandard;
	
	/*	Validation	*/
	var _autovalidates = YES;
	
	
	
	
	
	
	
	//Initialization
	/*void*/ this.initWithItemIdentifier = function(aString){
		this.supers().init();
		_menuFormRepresentation.setTitle(this.label());
		
		if( aString == undefined ){ return this; }
		if( typeof(aString.isKindOfClass) != "function" ){ return this; }
		if( !aString.isKindOfClass(MokaString) ){ return this; }
		
		_itemIdentifier = aString;
		
		return this;
	}
	
	//Managing attributes
	/*MokaString*/ this.itemIdentifier = function(){
		return _itemIdentifier;
	}
	/*MokaToolbar*/ this.toolbar = function(){
		return _toolbar;
	}
	/*void*/ this.setToolbar = function(aToolbar){
		if( aToolbar == undefined ){ return; }
		if( typeof(aToolbar.isKindOfClass) != "function" ){ return; }
		if( !aToolbar.isKindOfClass(MokaToolbar) ){ return; }
		
		_toolbar = aToolbar;
	}
	/*MokaString*/ this.label = function(){
		return _label;
	}
	/*void*/ this.setLabel = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_label = aString;
	}
	/*MokaString*/ this.paletteLabel = function(){
		return _paletteLabel;
	}
	/*void*/ this.setPaletteLabel = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_paletteLabel = aString;
	}
	/*MokaString*/ this.toolTip = function(){
		return _toolTip;
	}
	/*void*/ this.setToolTip = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_toolTip = aString;
	}
	/*MokaMenuItem*/ this.menuFormRepresentation = function(){
		return _menuFormRepresentation;
	}
	/*void*/ this.setMenuFormRepresentation = function(aMenuItem){
		if( aMenuItem == undefined ){ return; }
		if( typeof(aMenuItem.isKindOfClass) != "function" ){ return; }
		if( !aMenuItem.isKindOfClass(MokaMenuItem) ){ return; }
		
		_menuFormRepresentation = aMenuItem;
	}
	/*int*/ this.tag = function(){
		return _tag;
	}
	/*void*/ this.setTag = function(anInt){
		if( anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		_tag = anInt;
	}
	/*id*/ this.target = function(){
		return _target;
	}
	/*void*/ this.setTarget = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		
		_target = anObject;
	}
	/*MokaSelector*/ this.action = function(){
		return _action;
	}
	/*void*/ this.setAction = function(aSelector){
		if( aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		
		_action = aSelector;
	}
	/*bool*/ this.isEnabled = function(){
		if( this.view() ){
			return this.view().isEnabled();
		}
		return _isEnabled;
	}
	/*void*/ this.setIsEnabled = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		if( this.view() ){
			this.view().setIsEnabled(yn);
		}
		_isEnabled = yn;
	}
	/*MokaImage*/ this.image = function(){
		return _image;
	}
	/*void*/ this.setImage = function(anImage){
		if( anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_image = anImage;
	}
	/*MokaView*/ this.view = function(){
		return _view;
	}
	/*void*/ this.setView = function(aView){
		if( aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		_view = aView;
	}
	/*MokaSize*/ this.minSize = function(){
		return _minSize;
	}
	/*void*/ this.setMinSize = function(aSize){
		if( aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_minSize = aSize;
	}
	/*MokaSize*/ this.maxSize = function(){
		return _maxSize;
	}
	/*void*/ this.setMaxSize = function(aSize){
		if( aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_maxSize = aSize;
	}
	
	//Visibility priority
	/*int*/ this.visibilityPriority = function(){
		return _visibilityPriority;
	}
	/*void*/ this.setVisibilityPriority = function(anInt){
		if( anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		if( anInt < MokaToolbarItemVisibilityPriorityStandard || anInt > MokaToolbarItemVisibilityPriorityUser ){ return; }
		
		_visibilityPriority = anInt;
	}
	
	//Validation
	/*void*/ this.validate = function(){
		if( this.image() && !this.view() && this.target() && this.action() ){
			if(this.target().respondsToSelector(this.action()) && this.target().respondsToSelector($sel("validateToolbarItem"))){
				this.target().validateToolbarItem(this);
			}
		}
	}
	/*bool*/ this.autovalidates = function(){
		return _autovalidates;
	}
	/*void*/ this.setAutovalidates = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
				
		_autovalidates = yn;
	}
	
	//Toolbar duplicates
	/*bool*/ this.allowsDuplicatesInToolbar = function(){
		return NO;
	}
	
}

//Visibility Priorities
MokaToolbarItemVisibilityPriorityStandard	= 0;
MokaToolbarItemVisibilityPriorityLow		= -1;
MokaToolbarItemVisibilityPriorityHigh		= 1;
MokaToolbarItemVisibilityPriorityUser		= 2;