function MokaSearchField(){
	this.extend(MokaTextField);
	
	/*	EditableBox	*/
	var _editableBox = document.createElement("textarea");
	
	/*	Recent Searches	*/
	var _recentSearches = MokaArray.make().init();
	var _searchesMenu = MokaMenu.make().init();
	var _menuPanel = null;
	var _menuView = MokaMenuView.make().init();
	
	/*	Recents Autosave Name	*/
	var _recentsAutosaveName
	
	/*	Visual attributes	*/
	var _mouseDownOverCancelButton = NO;
	var _mouseDownOverRecentSearchesButton = NO;
	
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
	
	
	
	
	
	
	
	
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_menuView.setMenu(_searchesMenu);
		
		return this;
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		_right.style.width = (this.controlSize() == MokaRegularControlSize ? 22 : 15 ) + MokaPageSizeUnit;
		_left.style.width = (this.controlSize() == MokaRegularControlSize ? 22 : 15 ) + MokaPageSizeUnit;
		_center.style.width = (this.frame().size().width() - parseInt(_left.style.width) - parseInt(_right.style.width));
				
		this.pageDisplay().style.backgroundColor = "green";//(this.drawsBackground() ? this.backgroundColor() : "none" );
		
		editableBox = document.createElement("textarea");
		editableBox.value = this.stringValue().characters();
		editableBox.style.width = this.frame().size().width()-2*(this.controlSize() == MokaRegularControlSize ? 18 : 11 )+MokaPageSizeUnits;
		editableBox.style.height = this.frame().size().height()+MokaPageSizeUnits;
		editableBox.style.margin = "1" + MokaPageSizeUnits + " 0 0 0";
		editableBox.style.position = "absolute";
		if( document.createElement("div").contentEditable != undefined ){
			editableBox.style.width = this.frame().size().width()+7-2*(this.controlSize() == MokaRegularControlSize ? 18 : 11 )+MokaPageSizeUnits;
			editableBox.style.height = this.frame().size().height()+2+MokaPageSizeUnits;
			editableBox.style.top = 0;
			editableBox.style.margin = "-1" + MokaPageSizeUnits + " 0 0 -6" + MokaPageSizeUnits;
		}
		editableBox.style.backgroundColor = "none";
		editableBox.style.padding = 0;
		editableBox.style.border = 0;
		editableBox.style.color = this.textColor();
		editableBox.style.fontFamily = this.font();
		editableBox.style.fontSize = (this.controlSize() == MokaRegularControlSize ? 14 : 12);
		editableBox.style.direction = this.baseWritingDirection();
		editableBox.style.align = this.alignment();
		editableBox.style.overflow = "hidden";
		
		var containingDiv = document.createElement("div");
		containingDiv.style.overflow = "hidden";
		containingDiv.style.position = "absolute";
		containingDiv.style.left = (this.controlSize() == MokaRegularControlSize ? 18 : 11 )+MokaPageSizeUnits;
		containingDiv.style.top = 0;
		containingDiv.style.height = this.frame().size().height()+MokaPageSizeUnits;
		containingDiv.style.width = this.frame().size().width()-2*(this.controlSize() == MokaRegularControlSize ? 18 : 11 )+MokaPageSizeUnits;
		containingDiv.appendChild(editableBox);
		this.drawingCanvas().appendChild(containingDiv);
		
		this.setDrawingColor((_mouseDownOverCancelButton ? MokaColor.darkGreyColor() : MokaColor.greyColor() ));
		this.fillRect(new MokaRect(	this.frame().size().width() - (this.controlSize() == MokaRegularControlSize ? 18 : 11 ),
									0,
									(this.controlSize() == MokaRegularControlSize ? 18 : 11 ),
									this.frame().size().height()));
									
		this.setDrawingColor((_mouseDownOverRecentSearchesButton ? MokaColor.darkGreyColor() : MokaColor.greyColor() ));
		this.fillRect(new MokaRect(	0,
									0,
									(this.controlSize() == MokaRegularControlSize ? 18 : 11 ),
									this.frame().size().height()));
		
	}
	
	//Constraining the size
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		return new MokaSize(aSize.width(),(this.controlSize() == MokaRegularControlSize ? 22 : 15));
	}
		
	//Recent Searches
	/*MokaArray*/ this.recentSearches = function(){
		return _recentSearches;
	}
	/*void*/ this.setRecentSearches = function(anArray){
		if( anArray == undefined ){ return; }
		if( typeof(anArray.isKindOfClass) != "function" ){ return; }
		if( !anArray.isKindOfClass(MokaArray) ){ return; }
		
		_recentSearches.removeAllObjects();
		for(var i = 0; i < anArray.count(); i++ ){
			if( anArray.objectAtIndex(i) == undefined ){ continue; }
			if( typeof(anArray.objectAtIndex(i).isKindOfClass) != "function" ){ continue; }
			if( !anArray.objectAtIndex(i).isKindOfClass(MokaString) ){ continue; }
			
			_recentSearches.addObject(anArray.objectAtIndex(i));
			_searchesMenu.items().removeAllObjects();
			_searchesMenu.items().addObjectsFromArray(_recentSearches);
		}
	}
	
	//Recent autosaves name
	/*MokaString*/ this.recentsAutosaveName = function(){
		return _recentsAutosavesName;
	}
	/*void*/ this.setRecentsAutosaveName = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_recentsAutosavesName = aString;
	}
	
	//Search menu support
	/*void*/ this.searchForTitleOfItem = function(aMenuItem){
		if( aMenuItem == undefined ){ return; }
		if( typeof(aMenuItem.isKindOfClass) != "function" ){ return; }
		if( !aMenuItem.isKindOfClass(MokaMenuItem) ){ return; }
		
		if( _searchesMenu.items().containsObject(aMenuItem) ){
			this.setStringValue(aMenuItem.title());
			if( this.target() && this.action() ){
				if(this.target().respondsTo(this.action())){
					this.target()[this.action().selectorName()](this);
				}
			}
		}
	}
	
	
	//Event handling
	/*void*/ this.keyDown = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		theEvent.setPreventsDefault(NO);
		
		if( (theEvent.keyCode() == 13 || theEvent.keyCode() == 3) ){ //13 == return, 3 == enter
			
			this.setStringValue($s(_editableBox.value));
			if( this.target() && this.action() ){
				if(this.target().respondsTo(this.action())){
					this.target()[this.action().selectorName()](this);
				}
			}
			
			_searchesMenu.addItemWithTitleTargetActionAndKeyEquivalent(	$s(_editableBox.value),
																		this,
																		$sel("searchForTitleOfItem"),
																		$s(""));
			_recentSearches.addObject($s(_editableBox.value));
		} else if(theEvent.keyCode() == 27 ){ //27 = escape
			this.display();
		} else if(theEvent.keyCode() == 0 ){ //REPLACE 0 WITH KEYCODE FOR DOWN KEY
			
		}
	}
	/*void*/ this.mouseDown = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var thePoint = this.convertPointFromPage(theEvent.mouseLocation());
		if( thePoint.x() >= this.frame().size().width() - (this.controlSize() == MokaRegularControlSize ? 18 : 11 ) ){
			_mouseDownOverCancelButton = YES;
			
			_editableBox.setAttribute("value","");
			
		} else if( thePoint.x() < (this.controlSize() == MokaRegularControlSize ? 18 : 11 ) ){
			_mouseDownOverRecentSearchesButton = YES;
			
			_menuPanel = MokaPanel.make().initWithFrame(MokaRect.rectWithOriginAndSize(	this.superview().convertPointToPage(this.frame().origin()).add(new MokaPoint(0,this.frame().size().height())),
																							new MokaSize(100,100)));
			_menuPanel.setStyleMask(MokaBorderlessPanelMask);
			_menuPanel.contentView().addSubview(_menuView);
			_menuPanel.contentView().pageDisplay().style.backgroundColor = "lightgrey";
			//_menuPanel.setFrameOrigin();

			//_menuView.setPanelFrame();
			
		}
		
		this.display();
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		_mouseDownOverCancelButton = NO;
		_mouseDownOverRecentSearchesButton = NO;
		
		if( _menuPanel ){
			_menuPanel.close();
			_menuPanel = null;
		}
		
		this.display();
	}
	
}