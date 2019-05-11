function MokaMenu(){
	this.extend( MokaObject );
	
	/*	Delegate	*/
	var _delegate = null;
	
	/*	Menu Items	*/
	var _items = new MokaArray;
	
	/*	Attached Menu	*/
	var _attachedMenu = null;
	var _supermenu = null;
	
	/*	Autoenable Items	*/
	var _autoenablesItems = YES;
	
	/*	Title	*/
	var _title = $s("");
	
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_items.init();
		
		return this;
	}
	
	//Setting the delegate
	/*id*/ this.delegate = function(){
		return _delegate
	}	
	/*void*/ this.setDelegate = function( anObject ){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_delegate = anObject;
		
	}
	
	//Setting up menu commands
	/*MokaArray*/ this.items = function(){
		return _items;
	}	
	/*void*/ this.insertItemAtIndex = function( aMenuItem, anIndex ){
		if( typeof aMenuItem == undefined ){ return; }
		if( typeof(aMenuItem.isKindOfClass) != "function" ){ return; }
		if( !aMenuItem.isKindOfClass(MokaMenuItem) ){ return; }
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		
		this.items().insertObjectAtIndex( aMenuItem, anIndex );
		MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaMenuDidAddItemNotification,
																						this,
																						$dict($s("MokaMenuItemIndex"), anIndex));
		
		if( aMenuItem.submenu() && !anItem.submenu().supermenu() ){
			aMenuItem.submenu().setSupermenu(this);
		}
		if( aMenuItem.hasSubMenu() ){
			aMenuItem.setTarget(this);
			aMenuItem.setAction(this.submenuAction());
		}
	}
	/*void*/ this.insertItemWithTitleTargetActionAndKeyEquivalentAtIndex = function( aTitle, aTarget, anAction, aKeyEquivalent, anIndex ){
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
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		
		
		var newItem = MokaMenuItem.menuItemWithTitleTargetActionAndKeyEquivalent( aTitle, aTarget, anAction, aKeyEquivalent );
		newItem.setMenu( this );
		this.items().insertObjectAtIndex( newItem, anIndex );
		MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaMenuDidAddItemNotification,
																						this,
																						$dict($s("MokaMenuItemIndex"), anIndex));
	}
	/*void*/ this.addItem = function( anItem ){
		
		if( typeof(anItem.isKindOfClass) != "function" ){
			return;
		}
		
		if( !anItem.isKindOfClass(MokaMenuItem) ){
			return;
		}
		
		this.items().addObject( anItem );
		MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaMenuDidAddItemNotification,
																						this,
																						$dict($s("MokaMenuItemIndex"), this.items().count()-1));
																						
		if( anItem.submenu() && !anItem.submenu().supermenu() ){
			anItem.submenu().setSupermenu(this);
		}
		if( aMenuItem.hasSubMenu() ){
			aMenuItem.setTarget(this);
			aMenuItem.setAction(this.submenuAction());
		}
	}
	/*void*/ this.addItemWithTitleTargetActionAndKeyEquivalent = function( aTitle, aTarget, anAction, aKeyEquivalent ){
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
				
		
		var newItem = MokaMenuItem.menuItemWithTitleTargetActionAndKeyEquivalent( aTitle, aTarget, anAction, aKeyEquivalent );
		this.items().addObject( newItem );
		MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaMenuDidAddItemNotification,
																						this,
																						$dict($s("MokaMenuItemIndex"), this.items().count()-1));
	}
	/*void*/ this.removeItem = function( anItem ){
		if( typeof anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		if( !anItem.isKindOfClass(MokaMenuItem) ){ return; }
		
		
		var index = this.items().indexOfObject(anItem);
		this.items().removeObject( anItem );
		MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaMenuDidRemoveItemNotification,
																						this,
																						$dict($s("MokaMenuItemIndex"), index));
	}
	/*void*/ this.removeItemAtIndex = function( anIndex ){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		
		this.items().removeObjectAtIndex( anIndex );
		MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaMenuDidRemoveItemNotification,
																						this,
																						$dict($s("MokaMenuItemIndex"), anIndex));
	}
	/*void*/ this.itemChanged = function(anItem){
		MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaMenuDidChangeItemNotification,
																						this,
																						MokaDictionary.dictionaryWithObjectForKey(	anItem,
																																	$s("MokaMenuItemIndex")));
		if( anItem.hasSubmenu() ){
			aMenuItem.setTarget(this);
			aMenuItem.setAction(this.submenuAction());
		}
	}
		
	//Finding menu items
	/*id*/ this.itemWithTag = function( aTag ){
		if( typeof aTag == undefined ){ return; }
		if( !MokaNumberIsInt(aTag) ){ return; }
		
		for( var i = 0; i < this.items().count(); i++ ){
			var o = this.items().objectAtIndex(i);
			if( o.tag() == aTag ){
				return o;
			}
		}
		return null;
	}
	/*id*/ this.itemWithTitle = function( aTitle ){
		if( typeof aTitle == undefined ){ return; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
		if( !aTitle.isKindOfClass(MokaTitle) ){ return; }
		
		for( var i = 0; i < this.items().count(); i++ ){
			var o = this.items().objectAtIndex(i);
			if( o.title().isEqualToString(aTitle) ){
				return o;
			}
		}
		return null;
	}
	/*id*/ this.itemWithTargetAndAction = function( aTarget, anAction ){
		if( typeof aTarget == undefined ){ return; }
		if( typeof(aTarget.isKindOfClass) != "function" ){ return; }
		if( typeof anAction == undefined ){ return; }
		if( typeof(anAction.isKindOfClass) != "function" ){ return; }
		if( !anAction.isKindOfClass(MokaSelector) ){ return; }
		
		for( var i = 0; i < this.items().count(); i++ ){
			var o = this.items().objectAtIndex(i);
			if( o.target() == aTarget && o.action().isEqualTo( anAction ) ){
				return o;
			}
		}
		return null;
	}
	/*id*/ this.itemWithSubmenu = function( aMenu ){
		if( typeof aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }
		
		for( var i = 0; i < this.items().count(); i++ ){
			var o = this.items().objectAtIndex(i);
			if( o.submenu() == aMenu ){
				return o;
			}
		}
		return null;
	}
	/*id*/ this.itemWithKeyEquivalent = function( aKeyEquivalent ){
		if( typeof aKeyEquivalent == undefined ){ return; }
		if( typeof(aKeyEquivalent.isKindOfClass) != "function" ){ return; }
		if( !aKeyEquivalent.isKindOfClass(MokaString) ){ return; }
		
		for( var i = 0; i < this.items().count(); i++ ){
			var o = this.items().objectAtIndex(i);
			if( o.keyEquivalent().isEqualToString(aKeyEquivalent) ){
				return o;
			}
		}
		return null;
	}
	/*id*/ this.itemAtIndex = function( anIndex ){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
				
		return this.items().objectAtIndex( anIndex );
	}
	/*int*/ this.numberOfItems = function(){ return this.items().count(); }
	
	//Finding indexes of menu items
	/*int*/ this.indexOfItem = function( anItem ){
		if( typeof anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		if( !anItem.isKindOfClass(MokaMenuItem) ){ return; }
		
		
		return this.items().indexOfObject( anItem );
	}
	/*int*/ this.indexOfItemWithTag = function( aTag ){
		if( typeof aTag == undefined ){ return; }
		if( !MokaNumberIsInt(aTag) ){ return; }
		
		
		return this.items().indexOfObject( this.itemWithTag(aTag) );
		
	}
	/*int*/ this.indexOfItemWithTitle = function( aTitle ){
		if( typeof aTitle == undefined ){ return; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
		if( !aTitle.isKindOfClass(MokaString) ){ return; }
		
		
		return this.items().indexOfObject( this.itemWithTitle(aTitle) );
	}
	/*int*/ this.indexOfItemWithTargetAndAction = function( aTarget, anAction ){
		if( typeof aTarget == undefined ){ return; }
		if( typeof(aTarget.isKindOfClass) != "function" ){ return; }
		if( typeof anAction == undefined ){ return; }
		if( typeof(anAction.isKindOfClass) != "function" ){ return; }
		if( !anAction.isKindOfClass(MokaSelector) ){ return; }		
		
		return this.items().indexOfObject( this.itemWithTargetAndAction(aTarget, anAction) );
		
	}
	/*int*/ this.indexOfItemWithSubMenu = function( aMenu ){
		if( typeof aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }
		
		
		return this.items().indexOfObject( this.itemWithSubmenu(aMenu) );
	}
	
	//Managing submenus
	/*MokaMenu*/ this.attachedMenu = function(){
		return _attachedMenu
	}
	/*MokaMenu*/ this.supermenu = function(){
		return _supermenu;
	}	
	/*bool*/ this.isAttached = function(){
		return ( !this.supermenu() ? NO : this.supermenu().attachedMenu() == this || MokaApp.mainMenu().attachedMenu() == this );
	}
	/*bool*/ this.isNested = function(){
		return (MokaApp.itemWithTitle(this.title()) == null && MokaApp.itemWithSubmenu(this) == null);
	}	
	/*void*/ this.unnest = function(){
		var newItem = MokaMenuItem.make().init();
		newItem.setTitle(this.title());
		newItem.setSubmenu();
		newItem.setHasSubmenu(YES);
		MokaApp.mainMenu().addItem(newItem);
	}
	/*void*/ this.setSubmenuForItem = function( aMenu, anItem ){
		if( typeof aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }
		if( typeof anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		if( !anItem.isKindOfClass(MokaMenuItem) ){ return; }
		
		if( !this.items().containsObject(anItem) ){ return; }
		
		anItem.setSubmenu(aMenu);
		aMenu.setSupermenu(this);
	}
	/*void*/ this.setSupermenu = function( aMenu ){
		if( typeof aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }
		
		
		_supermenu = aMenu;
	}
	/*void*/ this.submenuAction = function(sender){
		return null;
	}
	/*bool*/ this.autoenablesItems = function(){
		return _autoenablesItems;
	}	
	/*void*/ this.setAutoenablesItems = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		
		_autoenablesItems = yn;
		if( yn ){ this.update(); }
	}
	/*void*/ this.update = function(){
		for( var i = 0; i < this.items().count(); i++ ){
			var item = this.items().objectAtIndex(i);
			if( item.target() ){
				if( item.target().respondsToSelector($sel("validateMenuItem")) ){
					item.setIsEnabled(item.target().validateMenuItem(item));
				} else if( item.target().respondsToSelector($sel("validateUserInterfaceItem")) ){
					item.setIsEnabled(item.target().validateUserInterfaceItem(item));
				}
			}
		}
	}
	
	//Handling keyboard events
	/*void*/ this.performKeyEquivalent = function( anEvent ){
		if( typeof anEvent == undefined ){ return; }
		if( typeof(anEvent.isKindOfClass) != "function" ){ return; }
		if( !anEvent.isKindOfClass(MokaString) ){ return; }
		
		
		var item = this.itemWithKeyEquivalent( anEvent.characters() );
		if( item ){
			if( item.target() && item.action() ){
				if( item.target()[item.action().selectorName()] ){ item.target()[item.action().selectorName()]( this ); }
			}
		}
	}
	
	//Simulating mouse clicks
	/*void*/ this.performActionForItemAtIndex = function( anIndex ){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		
		var item = this.itemWithKeyEquivalent( anEvent.characters() );
		if( item ){
			if( item.target() && item.action() ){
				if( item.target()[item.action().selectorName()] ){
					MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaMenuWillSendActionNotification,
																									this,
																									$dict($s("MokaMenuItem"),item));
					item.target()[item.action().selectorName()]( this );
					MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaMenuDidSendActionNotification,
																									this,
																									$dict($s("MokaMenuItem"),item));
				}
			}
		}
	}
	
	//Set title
	/*MokaString*/ this.title = function(){
		return _title;
	}	
	/*void*/ this.setTitle = function(aString){
		if( typeof aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		
		_title = aString;
	}
	
}

/*float*/ MokaMenu.mainMenuHeight = function(){
	if( !is(this._mainMenuHeight,Number) ){
		this._mainMenuHeight = 20;
	}
	return this._mainMenuHeight;
}
/*void*/ MokaMenu.setMainMenuHeight = function(aFloat){
	if( typeof aFloat == undefined ){ return; }
	if( !MokaNumberIsFloat(aFloat) ){ return; }
	
}
/*bool*/ MokaMenu.mainMenuVisible = function(){
	if( !is(this._mainMenuVisible,Boolean) ){
		this._mainMenuVisible = YES;
	}
	
	return this._mainMenuVisible;
}
/*bool*/ MokaMenu.setMainMenuVisible = function(yn){
	if( typeof yn == undefined ){ return; }
	if( typeof(yn) != "boolean" ){ return; }
	
}

/*void*/ MokaMenu.popUpContextMenuWithEventForView = function(menu,theEvent,aView){
	if( typeof menu == undefined ){ return; }
	if( typeof(menu.isKindOfClass) != "function" ){ return; }
	if( !menu.isKindOfClass(MokaMenu) ){ return; }
	if( typeof theEvent == undefined ){ return; }
	if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
	if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
	if( typeof aView == undefined ){ return; }
	if( typeof(aView.isKindOfClass) != "function" ){ return; }
	if( !aView.isKindOfClass(MokaView) ){ return; }
	
	if( aView.menu() != menu ){ return; }
	
	var menuView = MokaMenuView.makeAndInit();
	menuView.setMenu(menu);
	MokaApp.responderIsCapturingPagewideMouseEvents(menuView,YES);
	
	var menuPanel = MokaPanel.makeAndInit();
	menuPanel.setStyleMask(MokaBorderlessPanelMask);
	menuPanel.contentView().addSubview(menuView);
	menuPanel.setFrameOrigin(theEvent.mouseLocation());
	
	menuView.setPanelFrame();
	
}
/*void*/ MokaMenu.popContextUpMenuWithEventForViewWithFont = function(menu,theEvent,aView,font){
	
	if( typeof menu == undefined ){ return; }
	if( typeof(menu.isKindOfClass) != "function" ){ return; }
	if( !menu.isKindOfClass(MokaMenu) ){ return; }
	if( typeof theEvent == undefined ){ return; }
	if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
	if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
	if( typeof aView == undefined ){ return; }
	if( typeof(aView.isKindOfClass) != "function" ){ return; }
	if( !aView.isKindOfClass(MokaView) ){ return; }
	if( typeof font == undefined ){ return; }
	if( typeof(font) != "string" ){ return; }
	
	if( aView.menu() != menu ){ return; }
	
	var menuView = MokaMenuView.makeAndInit();
	menuView.setMenu(menu);
	menuView.setFont(font);
	MokaApp.responderIsCapturingPagewideMouseEvents(menuView,YES);
	
	var menuPanel = MokaPanel.makeAndInit();
	menuPanel.setStyleMask(MokaBorderlessPanelMask);
	menuPanel.contentView().addSubview(menuView);
	menuPanel.setFrameOrigin(theEvent.mouseLocation());
	
	menuView.setPanelFrame();
}




//Notifications
MokaMenuDidAddItemNotification = $s("MokaMenuDidAddItemNotification");
MokaMenuDidChangeItemNotification = $s("MokaMenuDidChangeItemNotification");
MokaMenuDidRemoveItemNotification = $s("MokaMenuDidRemoveItemNotification");
MokaMenuDidSendActionNotification = $s("MokaMenuDidSendActionNotification");
MokaMenuWillSendActionNotification = $s("MokaMenuWillSendActionNotification");