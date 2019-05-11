function MokaComboBox(){
	this.extend(MokaTextField);
	
	/*	Display Attributes	*/
	var _hasVerticalScroller = NO;
	var _isButtonBordered = YES;
	var _numberOfVisibleItems = 10;
	
	/*	DataSource	*/
	var _dataSource = null;
	var _usesDataSource = NO;
	
	/*	Working with Internal Lists	*/
	var _objectValues = MokaArray.make().init();
	var _menuPanel = null;
	var _menuScrollView = MokaScrollView.make().init();
	var _menuTableView = MokaTableView.make().init();
	
	/*	Selection	*/
	var _indexOfSelectedItem = -1;
	
	/*	Completing	*/
	var _completes = NO;
	
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
	
	
	
	
	
	
	
	
	/*id*/ this.init = function(){
		this.supers().init();
		
		_menuScrollView.setHasHorizontalScroller(NO);
		_menuScrollView.setContentView(_menuTableView);
		
		_menuTableView.setDataSource(this);
		
		return this;
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		_right.style.width = (this.controlSize() == MokaRegularControlSize ? 22 : 15 ) + MokaPageSizeUnits;
		_center.style.width = (this.frame().size().width() - parseInt(_left.style.width) - parseInt(_right.style.width));
				
		this.pageDisplay().style.backgroundColor = "green";//(this.drawsBackground() ? this.backgroundColor() : "none" );
		
		editableBox = document.createElement("textarea");
		editableBox.value = this.stringValue().characters();
		editableBox.style.width = this.frame().size().width()-(this.controlSize() == MokaRegularControlSize ? 20 : 13 )+MokaPageSizeUnits;
		editableBox.style.height = this.frame().size().height()+MokaPageSizeUnits;
		editableBox.style.margin = "1" + MokaPageSizeUnits + " 0 0 0";
		editableBox.style.position = "absolute";
		if( document.createElement("div").contentEditable != undefined ){
			editableBox.style.width = this.frame().size().width()+7-(this.controlSize() == MokaRegularControlSize ? 20 : 13 )+MokaPageSizeUnits;
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
		containingDiv.style.left = 0;
		containingDiv.style.top = 0;
		containingDiv.style.height = this.frame().size().height()+MokaPageSizeUnits;
		containingDiv.style.width = this.frame().size().width()-(this.controlSize() == MokaRegularControlSize ? 20 : 13 )+MokaPageSizeUnits;
		containingDiv.appendChild(editableBox);
		this.drawingCanvas().appendChild(containingDiv);
		
		this.setDrawingColor(MokaColor.orangeColor().blendedColorWithFractionOfColor((_menuPanel ? 0.2 : 0),MokaColor.blackColor()));
		this.fillRect(new MokaRect(	this.frame().size().width() - (this.controlSize() == MokaRegularControlSize ? 20 : 13 ), 0,
									(this.controlSize() == MokaRegularControlSize ? 20 : 13 ), this.frame().size().height()));
	}
	
	//Size constraint
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		return new MokaSize(aSize.width(),(this.controlSize() == MokaRegularControlSize ? 22 : 15 ));
	}
			
	//Setting display attributes
	/*bool*/ this.hasVerticalScroller = function(){
		return _hasVerticalScroller;
	}
	/*void*/ this.setHasVerticalScroller = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_hasVerticalScroller = yn;
	}
	/*MokaSize*/ this.intercellSpacing = function(){
		return _menuScrollView.intercellSpacing();
	}
	/*void*/ this.setIntercellSpacing = function(aSize){
		if( aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
				
		_menuScrollView.setIntercellSpacing(aSize);
	}
	/*bool*/ this.isButtonBordered = function(){
		return _isButtonBordered;
	}
	/*void*/ this.setIsButtonBordered = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
				
		_isButtonBordered = yn;
	}
	/*float*/ this.itemHeight = function(){
		return _menuScrollView.rowHeight();
	}
	/*void*/ this.setItemHeight = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_menuScrollView.setRowHeight(aFloat);
	}
	/*float*/ this.numberOfVisibleItems = function(){
		return _numberOfVisibleItems;
	}
	/*void*/ this.setNumberOfVisibleItems = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_numberOfVisibleItems = aFloat;
	}
	
	//DataSource
	/*id*/ this.dataSource = function(){
		return _dataSource;
	}
	/*void*/ this.setDataSource = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_dataSource = anObject;
	}
	/*bool*/ this.usesDataSource = function(){
		return _setUsesDataSource;
	}
	/*void*/ this.setUsesDataSource = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_setUsesDataSource = yn;
		
		this.reloadData();
	}
	
	//Acting as a DataSource for the tableview
	/*int*/ this.numberOfRowsInTableView = function(aTableView){
		if( aTableView != _menuTableView ){ return; }
		
		if( _usesDataSource && this.dataSource() && this.dataSource().respondsToSelector($sel("numberOfItemsInComboBox")) ){
			return this.dataSource().numberOfItemsInComboBox(this);
		} else {
			return this.numberOfItems();
		}
	}
	/*id*/ this.objectValueForTableColumnAndRowForTableView = function(aTableColumn,aRow,aTableView){
		if( aTableColumn == undefined ){ return null; }
		if( typeof(aTableColumn.isKindOfClass) != "function" ){ return null; }
		if( !aTableColumn.isKindOfClass(MokaTableColumn) ){ return null; }
		if( aRow == undefined ){ return null; }
		if( !MokaNumberIsInt(aRow) ){ return null; }
		if( aRow < 0 || aRow >= this.numberOfRowsInTableView(_menuTableView) ){ return null; }
		if( aTableView != _menuTableView ){ return; }
		
		if( _usesDataSource && this.dataSource()  && this.dataSource().respondsToSelector($sell("objectValueForItemAtIndexForComboBox")) ){
			return this.dataSource().objectValueForItemAtIndexForComboBox(aRow,this);
		} else {
			return this.objectValues().objectAtIndex(aRow);
		}
	}
		
	//Working with internal lists
	/*MokaArray*/ this.objectValues = function(){
		return _objectValues;
	}
	/*void*/ this.addItemsWithObjectValues = function(anArray){
		if( anArray == undefined ){ return; }
		if( typeof(anArray.isKindOfClass) != "function" ){ return; }
		if( !anArray.isKindOfClass(MokaArray) ){ return; }
		
		this.objectValues().addObjectsFromArray(anArray);
	}
	/*void*/ this.addItemWithObjectValue = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		this.objectValues().addObject(anObject);
	}
	/*void*/ this.insertItemWithObjectValueAtIndex = function(anObject,anIndex){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		this.objectValues().insertObjectAtIndex(anObject,anIndex);
	}
	/*void*/ this.removeAllItems = function(){
		this.objectValues().removeAllObjects();
		this.deselectItemAtIndex(this.indexOfSelectedItem());
	}
	/*void*/ this.removeItemAtIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		this.objectValues().removeObjectAtIndex(anIndex);
	}
	/*void*/ this.removeItemWithObjectValue = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		this.objectValues().removeObject(anObject);
	}
	/*int*/ this.numberOfItems = function(){
		return this.objectValues().count();
	}
	
	//Manipulating the displayed list
	/*int*/ this.indexOfItemWithObjectValue = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		return this.objectValues().indexOfObject(anObject);
	}
	/*id*/ this.itemObjectValueAtIndex = function(anIndex){
		if( anIndex == undefined ){ return null; }
		if( !MokaNumberIsInt(anIndex) ){ return null; }
		
		return this.objectValues().objectAtIndex(anIndex);
	}
	/*void*/ this.noteNumberOfItemsChanged = function(){
		_menuTableView.setFrameSize(new MokaSize(	_menuTableView.frame().size().width(),
													( this.usesDataSource() && this.dataSource() ? this.dataSource().numberOfItemsInComboBox(this) : this.numberOfItems() )*this.itemHeight()
													+ (( this.usesDataSource() && this.dataSource() ? this.dataSource().numberOfItemsInComboBox(this) : this.numberOfItems() ) - 1)*this.intercellSpacing().height() ));
	}
	/*void*/ this.reloadData = function(){
		if( this.usesDataSource() ){ _menuTableView.reloadData(); }
	}
	/*void*/ this.scrollItemAtIndexToTop = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		_menuTableView.scrollPoint(_menuTableView.rectOfRow(anIndex).origin());
	}
	/*void*/ this.scrollItemAtIndexToVisible = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		_menuTableView.scrollRowToVisible(anIndex);
	}
	
	//Manipulating the selection
	/*void*/ this.deselectItemAtIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		if( !this.indexOfSelectedItem() == anIndex ){ return; }
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaComboBoxSelectionIsChangingNotification, this );
		
		_indexOfSelectedItem = -1;
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaComboBoxSelectionDidChangeNotification, this );
		
		this.display();
	}
	/*int*/ this.indexOfSelectedItem = function(){
		return _indexOfSelectedItem;
	}
	/*id*/ this.objectValueOfSelectedItem = function(){
		return this.itemObjectValueAtIndex(this.indexOfSelectedItem());
	}
	/*void*/ this.selectItemAtIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		if( anIndex < 0 || anIndex >= this.numberOfItems() ){ return; }
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaComboBoxSelectionIsChangingNotification, this );
		
		_indexOfSelectedItem = anIndex;
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaComboBoxSelectionDidChangeNotification, this );
		
		this.display();
	}
	/*void*/ this.selectItemWithObjectValue = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		this.selectItemAtIndex(this.indexOfItemWithObjectValue(anObject));
	}
	
	//Completes
	/*bool*/ this.completes = function(){
		return _completes;
	}
	/*void*/ this.setCompletes = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_completes = yn;
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
		} else if(theEvent.keyCode() == 27 ){ //27 = escape
			this.display();
		} else if( this.completes() ){
			//prefix match the value in the text box
			//against available string values
			//and put the closest/shortest match in the text box
			//with the remaining part of the string selected
			
			var closestMatch = $s(_editableBox.value);
			var testPrefix = $s(_editableBox.value);
			
			if( this.usesDataSource() && this.dataSource() ){
				var totalItems = this.dataSource().numberOfItemsInComboBox(this);
				for( var i = 0; i < totalItems; i++ ){
					var theObject = this.dataSource().objectValueForItemAtIndexForComboBox(i,this);
					
					if( theObject == undefined ){ continue; }
					if( typeof(theObject.isKindOfClass) != "function" ){ continue; }
					if( !theObject.isKindOfClass(MokaString) ){ continue; }
					
					if( theObject.hasPrefix(testPrefix) ){
						closestMatch = theObject;
						break;
					}
				}
			} else {
				var objects = this.objectValues();
				for( var i = 0; i < objects.count(); i++ ){
					var theObject = objects.objectAtIndex(i);
					if( theObject == undefined ){ continue; }
					if( typeof(theObject.isKindOfClass) != "function" ){ continue; }
					if( !theObject.isKindOfClass(MokaString) ){ continue; }
					
					if( theObject.hasPrefix(testPrefix) ){
						closestMatch = theObject;
						break;
					}
				}
			}
			
			_editableBox.setAttribute("value",closestMatch.characters());
			_editableBox.setSelection(testPrefix.length(),closestMatch().length());
			
		}
	}
	/*void*/ this.mouseDown = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		this.panel().makeFirstResponder(this);
		
		var downPoint = this.convertPointFromPage(theEvent.mouseLocation());
		if( downPoint.x() >= this.frame().size().width() - (this.controlSize() == MokaRegularControlSize ? 20 : 13)){
			if( _menuPanel ){
				
				MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaComboBoxWillDismissNotification, this );
				
				_menuPanel.close();
				_menuPanel = null;
			} else {
				
				MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaComboBoxWillPopUpNotification, this );
				
				_menuPanel = MokaPanel.make().initWithFrame(	MokaRect.rectWithOriginAndSize(	this.superview().convertPointToPage(this.frame().origin()).add(new MokaPoint(0,this.frame().size().height())),
																								new MokaSize(150,200)));
				//the panel size should be determined by the number of items in the list
				//as well as the maximum number of items to display if there is one
				_menuPanel.contentView().pageDisplay().style.backgroundColor = "lightgrey";
				_menuPanel.setStyleMask(0);
				
				_menuPanel.contentView().addSubview(_menuScrollView);
				_menuPanel.setIgnoresMouseEvents(YES);
				
				MokaApp.responderIsCapturingPagewideMouseEvents(this,YES);

			}
			this.display();
		}
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( _menuPanel ){
			if( _menuPanel.frame().containsPoint(theEvent.mouseLocation()) ){
				this.selectItemAtIndex(_menuTableView.selectedRow());
			}
		}
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( _menuPanel ){
			if( _menuPanel.frame().containsPoint(theEvent.mouseLocation()) ){
				var pointToTableView = _menuTableView.convertPointFromPage(theEvent.mouseLocation());
				var rowToSelect = _menuTableView.rowAtPoint(pointToTableView);
				if( !_menuTableView.isRowSelected(rowToSelect) ){
					_menuTableView.selectRowIndexesByExtendingSelection(MokaIndexSet.make().initWithIndex(rowToSelect),NO);
				}
				return;
			}
		}
	}
	/*void*/ this.mouseMoved = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( _menuPanel ){
			if( _menuPanel.frame().containsPoint(theEvent.mouseLocation()) ){
				var pointToTableView = _menuTableView.convertPointFromPage(theEvent.mouseLocation());
				var rowToSelect = _menuTableView.rowAtPoint(pointToTableView);
				if( !_menuTableView.isRowSelected(rowToSelect) ){
					_menuTableView.selectRowIndexesByExtendingSelection(MokaIndexSet.make().initWithIndex(rowToSelect),NO);
				}
				return;
			}
		}
	}
	
}



//Notifications
MokaComboBoxSelectionDidChangeNotification = $s("MokaComboBoxSelectionDidChangeNotification");
MokaComboBoxSelectionIsChangingNotification = $s("MokaComboBoxSelectionIsChangingNotification");
MokaComboBoxWillDismissNotification = $s("MokaComboBoxWillDismissNotification");
MokaComboBoxWillPopUpNotification = $s("MokaComboBoxWillPopUpNotification");