function MokaToolbar(){
	this.extend(MokaObject);
	
	/*	Identifier	*/
	var _identifier = $s("");
	
	/*	Attributes	*/
	var _displayMode = MokaToolbarDisplayModeDefault;
	var _showsBaselineSeparator = YES;
	var _allowsUserCustomization = NO;
	var _items = MokaArray.make().init();
	var _visibleItems = MokaArray.make().init();
	var _sizeMode = MokaToolbarSizeModeRegular;
	
	/*	Delegate	*/
	var _delegate = null
	
	/*	Managing Items	*/
	var _selectedItemIdentifier = $s("");
	
	/*	Visibility	*/
	var _isVisible = YES;
	
	/*	Customization palette running	*/
	var _customizationPaletteIsRunning = NO;
	
	/*	Configuration autosave	*/
	var _autosavesConfiguration = NO;
	
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.initWithIdentifier = function(aString){
		this.supers().init();
		
		if( aString == undefined ){ return this; }
		if( typeof(aString.isKindOfClass) != "function" ){ return this; }
		if( !aString.isKindOfClass(MokaString) ){ return this; }
		
		_identifier = aString;
		
		return this;
	}
	
	//Attributes
	/*MokaToolbarDisplayMode*/ this.displayMode = function(){
		return _displayMode;
	}
	/*void*/ this.setDisplayMode = function(aDisplayMode){
		if( aDisplayMode == undefined ){ return; }
		if( !MokaNumberIsInt(aDisplayMode) ){ return; }
		if( aDisplayMode < MokaToolbarDisplayModeIconAndLabel || aDisplayMode > MokaToolbarDisplayModeLabelOnly ){ return; }
		
		_displayMode = aDisplayMode;
	}
	/*bool*/ this.showsBaselineSeparator = function(){
		return _showsBaselineSeparator;
	}
	/*void*/ this.setShowsBaselineSeparator = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_showsBaselineSeparator = yn;
	}
	/*bool*/ this.allowsUserCustomization = function(){
		return _allowsUserCuztomization;
	}
	/*void*/ this.setAllowsUserCustomization = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_allowsUserCustomization = yn;
	}
	/*MokaString*/ this.identifier = function(){
		return _identifier;
	}
	/*MokaArray*/ this.items = function(){
		return _items.copy();
	}
	/*MokaArray*/ this.visibleItems = function(){
		return _visibleItems.copy();
	}
	/*int*/ this.sizeMode = function(){
		return _sizeMode;
	}
	/*void*/ this.setSizeMode = function(aSizeMode){
		if( aSizeMode == undefined ){ return; }
		if( !MokaNumberIsInt(aSizeMode) ){ return; }
		if( aSizeMode < MokaToolbarSizeModeRegular || aSizeMode > MokaToolbarSizeModeSmall ){ return; }
		
		_sizeMode = aSizeMode;
	}
	
	//Managing the delegate
	/*id*/ this.delegate = function(){
		return _delegate;
	}
	/*void*/ this.setDelegate = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_delegate = anObject;
	}
	
	//Managing items
	/*void*/ this.insertItemWithItemIdentifierAtIndex = function(anIdentifier,anIndex){
		if( anIdentified == undefined ){ return; }
		if( typeof(anIdentified.isKindOfClass) != "function" ){ return; }
		if( !anIdentified.isKindOfClass(MokaString) ){ return; }
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		if( this.delegate() && this.delegate().respondsToSelector($sel("itemForIdentifierWillBeInsertedIntoToolbar")) ){
		
			var itemToAdd = this.delegate().itemForIdentifierWillBeInsertedIntoToolbar(anIdentifier,yn,this);
			this.items().insertObjectAtIndex(itemToAdd,anIndex);
		
			MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaToolbarWillAddItemNotification,
																							this,
																							$dict($s("item"), itemToAdd));
		}
	}
	/*void*/ this.removeItemAtIndex = function(anIndex){
		
		var item = this.items().objectAtIndex(anIndex);
		this.items().removeObjectAtIndex(anIndex);
		MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaToolbarDidRemoveItemNotification,
																						this,
																						$dict($s("item"), item));
	}
	/*MokaString*/ this.selectedItemIdentifier = function(){
		return _selectedItemIdentifier;
	}	
	/*void*/ this.setSelectedItemIdentifier = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_selectedItemIdentifier = aString;
	}
	
	//Visibility
	/*bool*/ this.isVisible = function(){
		return _isVisible;
	}
	/*void*/ this.setIsVisible = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isVisible = yn;
	}
	
	//Customization palette
	/*bool*/ this.customizationPaletteIsRunning = function(){
		return _customizationPaletteIsRunning;
	}
	/*void*/ this.runCustomizationPalette = function(sender){
		
	}
	
	//Configuration autosave
	/*bool*/ this.autosavesConfiguration = function(){
		return _autosavesConfiguration;
	}
	/*void*/ this.setAutosavesConfiguration = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_autosavesConfiguration = yn;
	}
	/*MokaDictionary*/ this.configurationDictionary = function(){
		
		return $dict(	$s("displayMode"), this.displayMode(),
						$s("isVisible"), this.isVisible(),
						$s("itemIdentifiers"), this.items().allValuesForMethod("itemIdentifier") );
	}
	/*void*/ this.setConfigurationFromDictionary = function(aDict){
		if( aDict == undefined ){ return; }
		if( typeof(aDict.isKindOfClass) != "function" ){ return; }
		if( !aDict.isKindOfClass(MokaDictionary) ){ return; }
		
		this.setDisplayMode( aDict.objectForKey($s("displayMode")) || this.displayMode() );
		this.setIsVisible( aDict.objectForKey($s("isVisible")) || this.isVisible() );
		if( aDict.objectForKey($s("itemIdentifiers")) ){
			this.items().removeAllObjects();
			var ii = aDict.objectForKey($s("itemIdentifiers"));
		 	if( typeof(ii.isKindOfClass) == "function" && ii.isKindOfClass(MokaArray) ){
				for( var i = 0; i < ii.count(); i++ ){
					var str = ii.objectAtIndex(i);
					if( typeof(ii.isKindOfClass) == "function" && ii.isKindOfClass(MokaString) ){
						this.insertItemWithItemIdentifierAtIndex(str,this.items().count());
					}
				}
			}
		}
	}
	
	//Validation
	/*void*/ this.validateVisibleItems = function(){
		for( var i = 0; i < this.visibleItems().count(); i++ ){
			this.visibleItems().objectAtIndex(i).validate();
		}
	}
	
	
}

//MokaToolbarDisplayMode
MokaToolbarDisplayModeIconAndLabel	= 0;
MokaToolbarDisplayModeIconOnly		= 1;
MokaToolbarDisplayModeLabelOnly		= 2;

//MokaToolbarSizeMode
MokaToolbarSizeModeRegular	= 0;
MokaToolbarSizeModeSmall	= 1;

//Notifications
MokaToolbarDidRemoveItemNotification = $s("MokaToolbarDidRemoveItemNotification");
MokaToolbarWillAddItemNotification = $s("MokaToolbarWillAddItemNotification");