function MokaPopUpButton(){
	this.extend(MokaButton);
	
	/*	Type of Menu	*/
	var _pullsDown = NO;
	var _autoenablesItems = YES;
	
	/*	Selected Item	*/
	var _selectedItem = null;
	
	/*	Number Value	*/
	var _numberValue = -1;
	
	/*	Menu items	*/
	var _menu = MokaMenu.make().init();
	
	/*	Preferred edge	*/
	var _preferredEdge = MokaRectBottom;
	
	/*	Title	*/
	var _title = $s("");
	
	/*	Utility	*/
	var _menuPanel = null;
	var _mouseDownForExtendedPeriod = NO;
	var _downTimer = MokaTimer.timerWithTimeIntervalTargetSelectorAndRepeat(	1000,
																				this,
																				$sel("_mouseDownForExtendedPeriod"),
																				NO );
	
	/*	Positioning the title	*/
	var _titleLeftMargin = 5;
	
	/*	Skin	*/
	var _left = document.createElement('div');
	_left.setAttribute("id","left");
	this.skin().appendChild(_left);
	
	var _center = document.createElement('div');
	_center.setAttribute("id","center");
	this.skin().appendChild(_center);
	
	var _right = document.createElement('div');
	_right.setAttribute("id","right");
	this.skin().appendChild(_right);
	
	
	
	
	
	
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		_right.style.width = ( this.controlSize() == MokaSmallControlSize ? 15 : 21) + MokaPageSizeUnits;
		_center.style.width = (this.frame().size().width() - parseInt(_left.style.width) - parseInt(_right.style.width));
		
		this.drawTextWithFontSizeAtPoint(	this.selectedItem().title().substringToIndex( (this.frame().size().width() - _titleLeftMargin - parseInt(_right.style.width))%(this.controlSize() == MokaSmallControlSize ? 10 : 12 )),
											(this.controlSize() == MokaSmallControlSize ? 10 : 12 ),
											(this.frame().size().height() - (this.controlSize() == MokaSmallControlSize ? 10 : 12 ))/2);
	}
		
	//Constraining size
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( !is(aSize,MokaSize) ){ return new MokaSize(100,(this.controlSize() == MokaSmallControlSize ? 15 : 20)); }
		
		return new MokaSize( (aSize.width() > 100 ? aSize.width() : 100),(100,(this.controlSize() == MokaSmallControlSize ? 15 : 20)));
	}
		
	//Setting the type of menu
	/*bool*/ this.pullsDown = function(){
		return _pullsDown;
	}
	/*void*/ this.setPullsDown = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_pullsDown = yn;
	}
	/*bool*/ this.autoenablesItems = function(){
		return _autoenablesItems;
	}
	/*void*/ this.setAutoenablesItems = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_autoenablesItems = yn;
	}
	
	//Inserting and deleting items
	/*void*/ this.addItemWithTitle = function(aTitle){
		if( aTitle == undefined ){ return; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
		if( !aTitle.isKindOfClass(MokaString) ){ return; }
		
		this.menu().addItemWithTitleTargetActionAndKeyEquivalent(	aTitle,
																	this,
																	$sel("_itemWasClicked"),
																	$s("") );
	}
	/*void*/ this.addItemsWithTitles = function(anArrayOfTitles){
		if( anArrayOfTitles == undefined ){ return; }
		if( typeof(anArrayOfTitles.isKindOfClass) != "function" ){ return; }
		if( !anArrayOfTitles.isKindOfClass(MokaArray) ){ return; }
		
		for( var i = 0; i < anArrayOfTitles.count(); i++ ){
			this.addItemWithTitle(anArrayOfTitles.objectAtIndex(i));
		}
	}
	/*void*/ this.insertItemWithTitleAtIndex = function(aTitle,anIndex){
		if( aTitle == undefined ){ return; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
		if( !aTitle.isKindOfClass(MokaString) ){ return; }
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		this.menu().insertItemWithTitleTargetActionAndKeyEquivalentAtIndex(	aTitle,
																			this,
																			$sel("_itemWasClicked"),
																			$s(""),
																			anIndex );
		
	}
	/*void*/ this.removeAllItems = function(){
		this.menu().items().removeAllObjects();
	}
	/*void*/ this.removeItemWithTitle = function(aTitle){
		if( aTitle == undefined ){ return; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
		if( !aTitle.isKindOfClass(MokaString) ){ return; }
		
		this.menu().removeItem(this.menu().itemWithTitle(aTitle));
	}
	/*void*/ this.removeItemAtIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		if( anIndex < 0 || anIndex >= this.numberOfItems() ){ return; }
		
		this.menu().removeItemAtIndex(anIndex);
	}
	
	//Getting the user's selection
	/*MokaMenuItem*/ this.selectedItem = function(){
		return _selectedItem;
	}
	/*MokaString*/ this.titleOfSelectedItem = function(){
		return this.selectedItem().title();
	}
	/*int*/ this.indexOfSelectedItem = function(){
		return this.indexOfItem(this.selectedItem());
	}
	/*int*/ this.numberValue = function(){
		return _numberValue;
	}
	/*void*/ this.setNumberValue = function(anInt){
		if( anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		if( anInt < -1 || anInt >= this.menu().items().count() ){ return; }
		
		_numberValue = anInt;
		_selectedItem = this.menu().items().objectAtIndex(anInt);
		this.display();
	}
	
	//Setting the current selection
	/*void*/ this.selectItem = function(aMenuItem){
		if( aMenuItem == undefined ){ return; }
		if( typeof(aMenuItem.isKindOfClass) != "function" ){ return; }
		if( !aMenuItem.isKindOfClass(MokaMenuItem) ){ return; }
		
		if( !this.menu().items().containsObject(aMenuItem) ){ return; }
		
		_selectedItem = aMenuItem;
		_numberValue = this.indexOfItem(aMenuItem);
		this.display();
	}
	/*void*/ this.selectItemAtIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		if( anIndex < 0 || anIndex >= this.numberOfItems() ){ return; }
		
		_selectedItem = this.itemAtIndex(anIndex);
		_numberValue = anIndex;
		this.display();
	}
	/*void*/ this.selectItemWithTag = function(aTag){
		if( aTag == undefined ){ return; }
		if( !MokaNumberIsInt(aTag) ){ return; }
		
		_selectedItem = this.menu().itemWithTag(aTag);
		_numberValue = this.indexOfItemWithTag(aTag);
		this.display();
	}
	/*void*/ this.selectItemWithTitle = function(aTitle){
		if( aTitle == undefined ){ return; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
		if( !aTitle.isKindOfClass(MokaString) ){ return; }
		
		_selectedItem = this.menu().itemWithTitle(aTitle);
		_numberValue = this.indexOfItemWithTitle(aTitle);
		this.display();
	}
	/*void*/ this.setNumberValue = function(anInt){
		this.selectedItemAtIndex(anInt);
	}
	
	//Menu
	/*MokaMenu*/ this.menu = function(){
		return _menu;
	}
	/*void*/ this.setMenu = function(aMenu){
		if( aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }
		
		_menu = aMenu;
	}
	/*int*/ this.numberOfItems = function(){
		return this.menu().numberOfItems();
	}
	/*MokaArray*/ this.itemArray = function(){
		return this.menu().items();
	}
	/*MokaMenuItem*/ this.itemAtIndex = function(anIndex){
		if( anIndex == undefined ){ return null; }
		if( !MokaNumberIsInt(anIndex) ){ return null; }
		
		if( anIndex < 0 || anIndex >= this.numberOfItems() ){ return null; }
		
		return this.menu().itemAtIndex(anIndex);
	}
	/*MokaString*/ this.itemTitleAtIndex = function(anIndex){
		if( anIndex == undefined ){ return null; }
		if( !MokaNumberIsInt(anIndex) ){ return null; }
		
		if( anIndex < 0 || anIndex >= this.numberOfItems() ){ return null; }
		
		return this.itemAtIndex(anIndex).title();
	}
	/*MokaArray*/ this.itemTitles = function(){
		var titles = MokaArray.make().init();
		
		for( var i = 0; i < this.numberOfItems(); i++ ){
			titles.addObject( this.itemAtIndex(i) );
		}
		
		return titles;
	}
	/*MokaMenuItem*/ this.itemWithTitle = function(aTitle){
		if( aTitle == undefined ){ return null; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return null; }
		if( !aTitle.isKindOfClass(MokaString) ){ return null; }
		
		return this.menu().itemWithTitle(aTitle);
	}
	/*MokaMenuItem*/ this.lastItem = function(){
		return this.menu().lastObject();
	}
	
	//Getting the indices of menu items
	/*int*/ this.indexOfItem = function(aMenuItem){
		if( aMenuItem == undefined ){ return -1; }
		if( typeof(aMenuItem.isKindOfClass) != "function" ){ return -1; }
		if( !aMenuItem.isKindOfClass(MokaMenuItem) ){ return -1; }
		
		return this.menu().indexOfItem(aMenuItem);
	}
	/*int*/ this.indexOfItemWithTag = function(anInt){
		if( anInt == undefined ){ return -1; }
		if( !MokaNumberIsInt(anInt) ){ return -1; }
		
		return this.menu().indexOfItemWithTag(anInt);
	}
	/*int*/ this.indexOfItemWithTitle = function(aTitle){
		if( aTitle == undefined ){ return -1; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return -1; }
		if( !aTitle.isKindOfClass(MokaString) ){ return -1; }
		
		return this.menu().indexOfItemWithTitle(aTitle);
	}
	/*int*/ this.indexOfItemWithRepresentedObject = function(anObject){
		if( anObject == undefined ){ return -1; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return -1; }
		
		for( var i = 0; i < this.items().count(); i++ ){
			var o = this.items().objectAtIndex(i);
			if( o.representedObject() == anObject ){
				return i;
			}
		}
		return -1;
	}
	/*int*/ this.indexOfItemWithTargetAndAction = function(aTarget,anAction){
		if( aTarget == undefined ){ return -1; }
		if( typeof(aTarget.isKindOfClass) != "function" ){ return -1; }
		if( anAction == undefined ){ return -1; }
		if( typeof(anAction.isKindOfClass) != "function" ){ return -1; }
		if( !anAction.isKindOfClass(MokaSelector) ){ return -1; }
		
		return this.menu().indexOfItemWithTargetAndAction(aTarget,anAction);
	}
	
	//Preferred edge
	/*MokaRectEdge*/ this.preferredEdge = function(){
		return _preferredEdge;
	}
	/*void*/ this.setPreferredEdge = function(aRectEdge){
		if(	aRectEdge != MokaRectTop && aRectEdge != MokaRectBottom
		&&	aRectEdge != MokaRectLeft && aRectEdge != MokaRectRight ){ return; }
		
		_preferredEdge = value;
	}
	
	//Setting the title
	/*void*/ this.setTitle = function(aTitle){
		if( aTitle == undefined ){ return; }
		if( typeof(aTitle.isKindOfClass) != "function" ){ return; }
		if( !aTitle.isKindOfClass(MokaString) ){ return; }
		
		_title = aTitle;
		if( !this.pullsDown() && !this.itemWithTitle(aString) ){
			this.addItemWithTitle(aTitle);
			_selectedItem = this.itemWithTitle(aString);
			_numberValue = this.indexOfItemWithTitle(aString);
		}
		this.display();
	}
	
	//Setting the state
	/*void*/ this.synchronizeTitleAndSelectedItem = function(){
		if( this.menu().items().count() > 0 ){
			this.setNumberValue(( this.numberValue() == -1 ? 0 : this.numberValue() ));
			this.setTitle( this.menu().items().objectAtIndex(( this.pullsDown() ? 0 : this.numberValue())).title() );
		}
		this.display();
	}
	
	//Event handling
	/*void*/ this.mouseDown = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		//if the menu is not open, pop up the menu in the appropriate place
		//otherwise close it
		if( _menuPanel ){
			_menuPanel.close();
		} else {
			var _mouseDownForExtendedPeriod = NO;
			_downTimer.schedule();
			
			MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaPopUpButtonWillPopUpNotification,
																					this );
			
			var menuView = MokaMenuView.makeAndInit();
			menuView.setMenu(menu);
			MokaApp.responderIsCapturingPagewideMouseEvents(menuView,YES);

			_menuPanel = MokaPanel.makeAndInit();
			_menuPanel.setStyleMask(MokaBorderlessPanelMask);
			_menuPanel.contentView().addSubview(menuView);
			_menuPanel.setFrameSize(menuView.frame().size().copy());
			
			//figure out where the thing is supposed to go
			if( this.pullsDown() ){
				_menuPanel.setFrameOrigin( this.convertPointToPage(this.frame().origin()).add(new MokaPoint(_titleLeftMargin,this.frame().size().height())) );
			} else {
				_menuPanel.setFrameOrigin( this.convertPointToPage(this.frame().origin()).subtract(new MokaPoint(-_titleLeftMargin,menuView.rectOfItemAtIndex(this.numberValue()).origin().y())) );
			}
			
		}
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		//if the menu is open, close it, but only if it's been a small delay since the mouse clicked down
		if( _menuPanel && _mouseDownForExtendedPeriod ){
			_menuPanel.close();
		}
		
	}
	
	//Handling clicks in the menu
	/*void*/ this._itemWasClicked = function(anItem){
		if( anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		if( !anItem.isKindOfClass(MokaMenuItem) ){ return; }
		if( !this.menu().items().containsObject(anItem) ){ return; }
		
		this.setNumberValue(this.menu().items().indexOfObject(anItem));
	}
	
	//Timeout for alternative mouse up behavior
	/*void*/ this._mouseDownForExtendedPeriod = function(){
		_mouseDownForExtendedPeriod = YES;
	}
	
}



//Notifications
MokaPopUpButtonWillPopUpNotification = $s("MokaPopUpButtonWillPopUpNotification");