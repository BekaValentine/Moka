function MokaMenuView(){
	this.extend( MokaView );
	
	/*	Menu view attributes	*/
	var _menu = null;
	var _supermenu = null;
	var _supermenuView;
	var _isHorizontal = NO;
	var _font = "sans-serif";
	var _highlightedItemIndex = -1;
	var _attachedMenuView = null;
	var _attachedMenu = null;
	var _horizontalEdgePadding = 5;
	var _menuItemCell = new MokaCell;
	var _highlightedMenuItemCell = new MokaCell;
	var _separatorItemCell = new MokaCell;
	
	/*	Tracking during move	*/
	var _mouseLocationDuringTracking = null;
	
	
	
	
	
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_highlightedMenuItemCell.initTextCell($s(""));
		_menuItemCell.initTextCell($s(""));
		_separatorItemCell.initTextCell($s(""));
		
		_menuItemCell.setFontFamily(this.font());
		_menuItemCell.setFontSize(14);
		_menuItemCell.setPadding(4);
		
		_highlightedMenuItemCell.setFontFamily(this.font());
		_highlightedMenuItemCell.setFontSize(14)
		_highlightedMenuItemCell.setPadding(4);
		_highlightedMenuItemCell.setBackgroundColor("grey");
		_highlightedMenuItemCell.setFontColor("white");
		
		_separatorItemCell.initTextCell($s("---"));
		_separatorItemCell.setFontFamily(this.font());
		_separatorItemCell.setFontSize(14)
		_separatorItemCell.setPadding(4);
		
		this.pageDisplay().style.border = "1" + MokaPageSizeUnits + " solid grey";
		
		this.display();
		
		return this;
	}
	/*id*/ this.initWithFrame = function(aFrame){
		if( typeof aFrame == undefined ){ return; }
		if( typeof(aFrame.isKindOfClass) != "function" ){ return; }
		if( !aFrame.isKindOfClass(MokaRect) ){ return; }
		
		_frame = aFrame;
		
		this.init();
		return this;
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		this.pageDisplay().style.backgroundColor = "lightgrey";
		this.pageDisplay().style.width = this.frame().size().width()-2 +MokaPageSizeUnits;
		this.pageDisplay().style.height = this.frame().size().height()-2 +MokaPageSizeUnits;
		
		if( this.menu() ){
			var list = document.createElement("ul");
			list.style.listStyleType = "none";
			list.style.padding = "5" + MokaPageSizeUnits + " 0 0 0";
			list.style.margin = 0;
			
			//var runningPosition = 5;
			for( var i = 0; i < this.menu().items().count(); i++ ){
				
				var li = document.createElement("li");
				li.setAttribute("id",i);
				
				var tempCell = ( i == this.highlightedItemIndex() ? _highlightedMenuItemCell : _menuItemCell );
				if( this.menu().itemAtIndex(i).isSeparatorItem() ){
					tempCell = _separatorItemCell;
					tempCell.setAttribute("class","separatoritem");
				}
				else { li.appendChild(document.createTextNode(this.menu().itemAtIndex(i).title().characters())); }
				//alert(tempCell.padding());
				li.style.height = (18 - 2*tempCell.padding() - 2*tempCell.borderSize())+MokaPageSizeUnits;
				li.style.margin = 0;
				li.style.backgroundColor = tempCell.backgroundColor();
				li.style.borderWidth = tempCell.borderSize()+MokaPageSizeUnits;
				li.style.borderStyle = tempCell.borderStyle();
				li.style.borderColor = tempCell.borderColor();
				li.style.padding = tempCell.padding()+MokaPageSizeUnits;
				li.style.textAlign = tempCell.textAlign;
				li.style.color = tempCell.fontColor();
				li.style.fontFamily = tempCell.fontFamily();
				li.style.baseWritingDirection = tempCell.baseWritingDirection();
				li.style.fontWeight = tempCell.fontWeight();
				li.style.fontSize = tempCell.fontSize();
				li.style.backgroundColor = tempCell.backgroundColor();
				list.appendChild(li);
			}
			
			this.drawingCanvas().appendChild(list);
		}
		
	}
	
	//Attached and nested
	/*bool*/ this.isAttached = function(){
		return !!this.supermenuView();
	}
	/*bool*/ this.isNested = function(){
		return this.supermenu() && this.supermenu() != MokaApp.mainMenu()
	}
	/*void*/ this.unnest = function(){
		var newItem = MokaMenuItem.make().init();
		newItem.setTitle( this.menu().title() );
		newItem.setHasSubmenu( YES );
		newItem.setSubmenu( this.menu() );
		newItem.setIsEnabled( YES );
		
		MokaApp.mainMenu().addItem( newItem );
	}	
	
	//Setting the attributes
	/*bool*/ this.isHorizontal = function(){
		return _isHorizontal;
	}	
	/*void*/ this.setIsHorizontal = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isHorizontal = yn;
		this.sizeToFit();
	}
	/*string*/ this.font = function(){
		return _font;
	}	
	/*void*/ this.setFont = function(aFont){
		if( typeof(aFont) != "string" ){ return; }
		
		_font = aFont;
		this.sizeToFit();
	}
	/*int*/ this.highlightedItemIndex = function(){
		return _highlightedItemIndex;
	}	
	/*void*/ this.setHighlightedItemIndex = function(anIndex){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		if( this.highlightedItemIndex() != -1 && this.drawingCanvas().childNodes[0] ){
			if( this.drawingCanvas().childNodes[0].childNodes[this.highlightedItemIndex()] ){
				var tempCell = _menuItemCell;
				var li = this.drawingCanvas().childNodes[0].childNodes[this.highlightedItemIndex()];
				li.style.height = (18 - 2*tempCell.padding() - 2*tempCell.borderSize())+MokaPageSizeUnits;
				li.style.margin = 0;
				li.style.backgroundColor = ( tempCell.backgroundColor() == "none" ? "" : tempCell.backgroundColor() );
				li.style.borderWidth = tempCell.borderSize()+MokaPageSizeUnits;
				li.style.borderStyle = tempCell.borderStyle();
				li.style.borderColor = tempCell.borderColor();
				li.style.padding = tempCell.padding()+MokaPageSizeUnits;
				li.style.textAlign = tempCell.textAlign;
				li.style.color = tempCell.fontColor();
				li.style.fontFamily = tempCell.fontFamily();
				li.style.baseWritingDirection = tempCell.baseWritingDirection();
				li.style.fontWeight = tempCell.fontWeight();
				li.style.fontSize = tempCell.fontSize();
				li.style.backgroundColor = tempCell.backgroundColor();
			}
		}
		
		if( anIndex != -1 && this.drawingCanvas().childNodes[0] ){
			if( this.drawingCanvas().childNodes[0].childNodes[anIndex] ){
				var tempCell = _highlightedMenuItemCell;
				var li = this.drawingCanvas().childNodes[0].childNodes[anIndex];
				li.style.height = (18 - 2*tempCell.padding() - 2*tempCell.borderSize())+MokaPageSizeUnits;
				li.style.margin = 0;
				li.style.backgroundColor = tempCell.backgroundColor();
				li.style.borderWidth = tempCell.borderSize()+MokaPageSizeUnits;
				li.style.borderStyle = tempCell.borderStyle();
				li.style.borderColor = tempCell.borderColor();
				li.style.padding = tempCell.padding()+MokaPageSizeUnits;
				li.style.textAlign = tempCell.textAlign;
				li.style.color = tempCell.fontColor();
				li.style.fontFamily = tempCell.fontFamily();
				li.style.baseWritingDirection = tempCell.baseWritingDirection();
				li.style.fontWeight = tempCell.fontWeight();
				li.style.fontSize = tempCell.fontSize();
				li.style.backgroundColor = tempCell.backgroundColor();
			}
		}
		
		_highlightedItemIndex = anIndex;
	}
	/*float*/ this.horizontalEdgePadding = function(){
		return _horizontalEdgePadding;
	}	
	/*void*/ this.setHorizontalEdgePadding = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_horizontalEdgePadding = aFloat;
		this.sizeToFit();
	}
	
	//Notification of menu items changing
	/*void*/ this.itemChanged = function(){
		this.sizeToFit()
	}
	/*void*/ this.itemAdded = function(){
		this.sizeToFit();
	}
	/*void*/ this.itemRemoved = function(){
		this.sizeToFit();
	}
	
	//Working with menus
	//NOTE: some of these might not be necessary with notifications
	/*MokaMenu*/ this.menu = function(){
		return _menu;
	}
	/*void*/ this.setMenu = function(aMenu){
		if( aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }
		
		if( this.menu() ){
			MokaNotificationCenter.removeObserverWithNameAndObject(	this,
																	MokaMenuDidChangeItemNotification,
																	this.menu() );

			MokaNotificationCenter.removeObserverWithNameAndObject(	this,
																	MokaMenuDidAddItemNotification,
																	this.menu() );
			
			MokaNotificationCenter.removeObserverWithNameAndObject(	this,
																	MokaMenuDidRemoveItemNotification,
																	this.menu() );
		}
		
		MokaNotificationCenter.defaultCenter().addObserverWithSelectorNotificationNameAndObject(	this,
																								$sel("itemChanged"),
																								MokaMenuDidChangeItemNotification,
																								aMenu );
		
		MokaNotificationCenter.defaultCenter().addObserverWithSelectorNotificationNameAndObject(	this,
																								$sel("itemAdded"),
																								MokaMenuDidAddItemNotification,
																								aMenu );
		
		MokaNotificationCenter.defaultCenter().addObserverWithSelectorNotificationNameAndObject(	this,
																								$sel("itemRemoved"),
																								MokaMenuDidRemoveItemNotification,
																								aMenu );
		_menu = aMenu;
	}
	/*MokaMenu*/ this.supermenu = function(){
		return _supermenu;
	}	
	/*MokaMenu*/ this.attachedMenu = function(){
		return _attachedMenu;
	}
	/*MokaMenuView*/ this.attachedMenuView = function(){
		return _attachedMenuView;
	}		
	/*void*/ this.detachSubmenu = function(){
		if(_attachedMenuView){
			MokaApp.responderIsCapturingPagewideMouseEvents(_attachedMenuView,NO);
			_attachedMenuView.detachSubmenu();
			_attachedMenuView.panel().close();
			_attachedMenuView = null;
		}
	}
	/*void*/ this.attachSubmenuForItemAtIndex = function(anIndex){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		if( this.menu() ){
			if( anIndex >= 0 && anIndex < this.menu().items().count() ){
				if( this.menu().itemAtIndex(anIndex).submenu() && !this.menu().itemAtIndex(anIndex).isSeparatorItem() ){
					
					var newMenuView = new MokaMenuView;
					newMenuView.init();
					newMenuView.setMenu(this.menu().itemAtIndex(anIndex).submenu());
					
					var newMenuPanel = new MokaPanel;
					newMenuPanel.initWithFrame( MokaRect.rectWithOriginAndSize(	this.locationForSubmenuOfItemAtIndex(anIndex),
																				newMenuView.frame().size() ) );
					newMenuPanel.setStyleMask(MokaBorderlessPanelMask);
					newMenuPanel.contentView().addSubview(newMenuView);
			
					newMenuView.setSupermenuView(this);
					newMenuView.setPanelFrame();
					MokaApp.responderIsCapturingPagewideMouseEvents(newMenuView,YES);
					
					_attachedMenuView = newMenuView;
					_attachedMenu = newMenuView.menu();
				}
			}
		}
	}
	/*MokaMenuView*/ this.supermenuView = function(){
		return _supermenuView;
	}
	/*void*/ this.setSupermenuView = function(aMenuView){
		if( typeof aMenuView == undefined ){ return; }
		if( typeof(aMenuView.isKindOfClass) != "function" ){ return; }
		if( !aMenuView.isKindOfClass(MokaMenuView) ){ return; }
		
		_supermenuView = aMenuView;
	}
		
	//Menu geometry
	/*void*/ this.update = function(){
		if( this.menu() ){
			this.menu().update();
		}
		this.sizeToFit();
	}
	/*void*/ this.sizeToFit = function(){
		var newSize = new MokaSize(100,10);
		
		if( this.menu() ){
			if( this.menu().items().count() != 0 ){
				newSize.setHeight( 18*this.menu().items().count() || 10 );
				newSize.setWidth( 2*this.horizontalEdgePadding() + this.stateImageOffset() + this.stateImageWidth() + this.imageAndTitleOffset() + this.imageAndTitleWidth() + this.keyEquivalentOffset() + this.keyEquivalentWidth() );
			}
		}
		this.setFrameSize(newSize);
	}
	/*float*/ this.stateImageOffset = function(){
		return 5;
	}
	/*float*/ this.stateImageWidth = function(){
		var width = 0;
		for( var i = 0; i < this.menu().numberOfItems(); i++ ){
			var item = this.menu().itemAtIndex(i);
			if( item.onStateImage() && item.onStateImage().width() > width ){
				width = item.onStateImage().width()
			}
			if( item.offStateImage() && item.offStateImage().width() > width ){
				width = item.offStateImage().width()
			}
			if( item.mixedStateImage() && item.mixedStateImage().width() > width ){
				width = item.mixedStateImage().width()
			}
		}
		return width;
	}
	/*float*/ this.imageAndTitleOffset =function(){
		return 5;
	}
	/*float*/ this.imageAndTitleWidth = function(){
		var length = 0;
		var width = 0;
		for( var i = 0; i < this.menu().numberOfItems(); i++ ){
			var item = this.menu().itemAtIndex(i);
			if( item.title() && item.title().length() > length ){
				length = item.title().length()
			}
			if( item.hasImage() && item.image().width() > width ){
				width = item.image().width();
			}
		}
		return length*_menuItemCell.fontSize() + width;
	}
	/*float*/ this.keyEquivalentOffset = function(){
		return 5;
	}
	/*float*/ this.keyEquivalentWidth = function(){
		var length = 0;
		for( var i = 0; i < this.menu().numberOfItems(); i++ ){
			var item = this.menu().itemAtIndex(i);
			if( item.keyEquivalent() && item.keyEquivalent().length() > length ){
				length = item.keyEquivalent().length()
			}
		}
		return length*_menuItemCell.fontSize();
	}
	/*MokaRect*/ this.rectOfItemAtIndex = function(anIndex){
		if( !is(anIndex,"int") ){ return new MokaRect; }
		
		return new MokaRect(0,(anIndex - 1)*18,this.frame().size().width(),18);
	}
	/*int*/ this.indexOfItemAtPoint = function(aPoint){
		if( typeof aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		if(aPoint.y() < 5 ){ return -1; }
		
		return ((aPoint.y() - 5) - (aPoint.y() - 5)%18)/18;
	}
	/*MokaPoint*/ this.locationForSubmenuOfItemAtIndex = function(anIndex){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		if( !this.menu() || this.menu().count() <= anIndex ){ return; }
		
		return new MokaPoint(this.panel().frame().origin().x()+this.panel().frame().size().width(),this.panel().frame().origin().y()+anIndex*18);
	}
	/*MokaPoint*/ this.locationForSubmenu = function(aSubmenu){
		if( submenu == undefined ){ return; }
		if( typeof(submenu.isKindOfClass) != "function" ){ return; }
		if( !submenu.isKindOfClass(MokaMenu) ){ return; }
		if( !this.menu() || this.menu().count() <= anIndex ){ return; }
		
		return this.locationForSubmenuOfItemAtIndex(this.menu().items().indexOfObject(this.itemWithSubmenu(aSubmenu)));
	}	
	/*void*/ this.setPanelFrame = function(){
		if( this.panel() ){
			this.sizeToFit();
			this.panel().setContentSize(this.frame().size());	
			
			var currentPosition = this.panel().frame().origin().copy();
			
			var windowSize = MokaSize.windowSize();
			
			if( windowSize.width() - currentPosition.x() < this.frame().size().width() && currentPosition.x() > windowSize.width() - currentPosition.x() ){
				currentPosition.setX( currentPosition.x() - this.frame().size().width() );
			}
			
			if( windowSize.height() - currentPosition.y() < this.frame().size().height() && currentPosition.y() > windowSize.height() - currentPosition.y() ){
				currentPosition.setY( currentPosition.y() - this.frame().size().height() );
			}
			
			this.panel().setFrameOrigin(currentPosition);
		}
	}
	
	//Event handling
	/*void*/ this.mouseDown = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( !this.frame().containsPoint(this.convertPointFromPage(theEvent.mouseLocation())) && !this.attachedMenuView() ){
			
			var top = this;
			while( true ){
				if( !top.supermenuView() ){ break; }
				top = top.supermenuView();
			}
			MokaApp.responderIsCapturingPagewideMouseEvents(top,NO);
			top.detachSubmenu();
			top.panel().close();
			
		}
		
		
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var point = this.convertPointFromPage(theEvent.mouseLocation());
		if( this.frame().containsPoint(point)){
			//Perform action then close hierarchy
			if( this.menu() ){
				var itemIndex = this.indexOfItemAtPoint(point);
				if( itemIndex != this.highlightedItemIndex() ){ return; }
				var hitItem = this.menu().itemAtIndex(itemIndex);
				
				if( hitItem && !hitItem.isSeparatorItem() && hitItem.target() && hitItem.action() && hitItem.target().respondsToSelector(hitItem.action()) ){
					alert("Call!");
				}
				
				var top = this;
				while( true ){
					if( !top.supermenuView() ){ break; }
					top = top.supermenuView();
				}
				MokaApp.responderIsCapturingPagewideMouseEvents(top,NO);
				top.detachSubmenu();
				top.panel().close();
				
			}
		} else {
			//if there's a subview, do nothing, otherwise close the hierarchy
			
			if( !this.attachedMenuView() ){
				
				var top = this;
				while( true ){
					if( !top.supermenuView() ){ break; }
					top = top.supermenuView();
				}
				MokaApp.responderIsCapturingPagewideMouseEvents(top,NO);
				top.detachSubmenu();
				top.panel().close();
				
			}
			
		}
	}
	/*void*/ this.mouseMoved = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var point = this.convertPointFromPage(theEvent.mouseLocation());
		
		if( this.frame().containsPoint(point) ){
			if( !_mouseLocationDuringTracking ){ _mouseLocationDuringTracking = point; }
			
			var ratio = (point.y() - _mouseLocationDuringTracking.y())/(point.x() - _mouseLocationDuringTracking.x());
			
			var itemIndex = this.indexOfItemAtPoint(point);
			if( _attachedMenuView && itemIndex != this.highlightedItemIndex() ){
				if( point.x() - _mouseLocationDuringTracking.x() > 0 && point.y() - _mouseLocationDuringTracking.y() >= 0 && ratio >= 0 && ratio <= 1){
				} else {
					this.detachSubmenu();
					this.attachSubmenuForItemAtIndex(itemIndex);
					this.setHighlightedItemIndex(itemIndex);
				}
			} else if( itemIndex != this.highlightedItemIndex() ){
				this.detachSubmenu();
				this.attachSubmenuForItemAtIndex(itemIndex);
				this.setHighlightedItemIndex(itemIndex)			
			}
			_mouseLocationDuringTracking = point;
			
		} else {
			if( !_attachedMenuView && this.highlightedItemIndex() != -1 ){
				this.setHighlightedItemIndex(-1);
			}			
		}
		
		theEvent.setPreventsDefault(NO);
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var point = this.convertPointFromPage(theEvent.mouseLocation());
		
		if( this.frame().containsPoint(point) ){
			if( !_mouseLocationDuringTracking ){ _mouseLocationDuringTracking = point; }
			
			var ratio = (point.y() - _mouseLocationDuringTracking.y())/(point.x() - _mouseLocationDuringTracking.x());
			
			var itemIndex = this.indexOfItemAtPoint(point);
			if( _attachedMenuView && itemIndex != this.highlightedItemIndex() ){
				if( point.x() - _mouseLocationDuringTracking.x() > 0 && point.y() - _mouseLocationDuringTracking.y() >= 0 && ratio >= 0 && ratio <= 1){
				} else {
					this.detachSubmenu();
					this.attachSubmenuForItemAtIndex(itemIndex);
					this.setHighlightedItemIndex(itemIndex);
				}
			} else if( itemIndex != this.highlightedItemIndex() ){
				this.detachSubmenu();
				this.attachSubmenuForItemAtIndex(itemIndex);
				this.setHighlightedItemIndex(itemIndex)			
			}
			_mouseLocationDuringTracking = point;
			
		} else {
			if( !_attachedMenuView && this.highlightedItemIndex() != -1 ){
				this.setHighlightedItemIndex(-1);
			}	
		}
		
		theEvent.setPreventsDefault(NO);
	}
	/*void*/ this.performActionWithHighlightingForItemAtIndex = function(anIndex){
		if( !is(anIndex,"int") ){ return; }
		
		var nearestVisibleParentMenuView = this;
		var nearestVisibleParentMenuItemIndex = anIndex;
		
		while( true ){
			if( nearestVisibleParentMenuView.panel().isVisible() ){ break; }
			nearestVisibleParentMenuView = this.supermenuView();
			nearestVisibleParentMenuItemIndex = nearestVisibleParentMenuView.menu().indexOfItemWithSubMenu(this.menu());
		}
		
		nearestVisibleParentMenuView.setHighlightedItemIndex(nearestVisibleParentMenuItemIndex);
		
		var item = this.menu().itemAtIndex(anIndex);
		if( item.target() && item.action() && item.target().respondsToSelector(item.action()) ){
			item.target()[item.action().selectorName()](this);
		}
		
		nearestVisibleParentMenuView.setHighlightedItemIndex(-1);
		
	}
	/*void*/ this.rightMouseDown = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
				
		if( !this.frame().containsPoint(this.convertPointFromPage(theEvent.mouseLocation())) && !this.attachedMenuView() ){
			
			var top = this;
			while( true ){
				if( !top.supermenuView() ){ break; }
				top = top.supermenuView();
			}
			MokaApp.responderIsCapturingPagewideMouseEvents(top,NO);
			top.detachSubmenu();
			top.panel().close();
			
		}
	}
	
	
	
}