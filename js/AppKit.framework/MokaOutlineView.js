function MokaOutlineView(){
	this.extend(MokaTableView);
	
	/*	DataSource	*/
	var _dataSource = null;
	
	/*	Outline Column	*/
	var _outlineTableColumn = MokaTableColumn.make().init();
	var _autoresizesOutlineColumn = YES;
	
	/*	Indentation	*/
	var _indentationPerLevel = 16;
	var _indentationMarkerFollowsCell = YES;
	
	/*	Persistence	*/
	var _autosaveExpandedItems = NO;
	
	
	
	
	
	
	
	//Setting the dataSource
	/*id*/ this.dataSource = function(){
		return _dataSource;
	}
	/*void*/ this.setDataSource = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
				
		_dataSource = anObject;
		this.display();
	}
	
	//Expanding and collapsing the outline
	/*bool*/ this.isExpandable = function(anItem){
		if( anItem == undefined ){ return NO; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return NO; }
		
	}
	/*void*/ this.expandItem = function(anItem){
		if( anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		
	}
	/*void*/ this.expandItemAndExpandChildren = function(anItem,yn){
		if( anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
	}
	/*void*/ this.collapseItem = function(anItem){
		if( anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		
	}
	/*void*/ this.collapseItemAndCollapseChildren = function(anItem,yn){
		if( anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
	}
	/*bool*/ this.isItemExpanded = function(anItem){
		if( anItem == undefined ){ return NO; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return NO; }
		
	}
	
	//Redisplaying information
	/*void*/ this.reloadItem = function(anItem){
		if( anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		
	}
	/*void*/ this.reloadItemAndReloadChildren = function(anItem,yn){
		if( anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
	}
	
	//Converting between items and rows
	/*id*/ this.itemAtRow = function(anIndex){
		if( anIndex == undefined ){ return null; }
		if( !MokaNumberIsInt(anIndex) ){ return null; }
		
	}
	/*int*/ this.rowForItem = function(anItem){
		if( anItem == undefined ){ return -1; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return -1; }
		
	}
	
	//Seting the outline column
	/*MokaTableColumn*/ this.outlineTableColumn = function(){
		return _outlineTableColumn;
	}
	/*void*/ this.setOutlineTableColumn = function(aTableColumn){
		if( aTableColumn == undefined ){ return; }
		if( typeof(aTableColumn.isKindOfClass) != "function" ){ return; }
		if( !aTableColumn.isKindOfClass(MokaTableColumn) ){ return; }
		
		_outlineTableColumn = aTableColumn;
		this.display();
	}
	/*bool*/ this.autoresizesOutlineColumn = function(){
		return _autoresizesOutlineColumn;
	}
	/*void*/ this.setAutoresizesOutlineColumn = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_autoresizesOutlineColumn = yn;
		if( yn ){ this.display(); }
	}
	
	//Setting the indentation
	/*int*/ this.levelForItem = function(anItem){
		if( anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		
	}
	/*int*/ this.levelForRow = function(anInt){
		if( anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
	}
	/*float*/ this.indentationPerLevel = function(){
		return _indentationPerLevel;
	}
	/*void*/ this.setIndentationPerLevel = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_indentationPerLevel = aFloat;
		this.display();
	}
	/*bool*/ this.indentationMarkerFollowsCell = function(){
		return _indentationMarkerFollowsCell;
	}
	/*void*/ this.setIndentationMarkerFollowsCell = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_indentationMarkerFollowsCell = yn;
		this.display();
	}
	
	//Persistence
	/*bool*/ this.autosaveExpandedItems = function(){
		return _autosaveExpandedItems;
	}
	/*void*/ this.setAutosaveExpandedItems = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_autosaveExpandedItems = yn;
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		
	}
	
	
	//Drag and drop
	/*void*/ this.setDropItemWithDropChildIndex = function(anItem,anIndex){
		if( anItem == undefined ){ return; }
		if( typeof(anItem.isKindOfClass) != "function" ){ return; }
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
	}
	/*bool*/ this.shouldCollapseAutoExpandedItemsForDeposited = function(yn){
		if( yn == undefined ){ return NO; }
		if( typeof(yn) != "boolean" ){ return NO; }
		
	}
	
	/*void*/ this.mouseDown = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var hitRow = this.rowAtPoint(this.convertPointFromPage(theEvent.mouseLocation()));
		
		var extendSelection = NO;
		if( theEvent.modifierFlags() & MokaShiftKey ){
			extendSelection = YES;
		}
		
		this.selectColumnIndexesByExtendingSelection(MokaIndexSet.make().initWithIndex(hitRow),extendSelection);
		_needsToBeginDragging = YES;
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		//end dragging
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( _needsToBeginDragging ){
			_needsToBeginDragging = NO;
			//begin dragging 
		}
	}
	/*void*/ this.rightMouseDown = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var hitRow = this.rowAtPoint(this.convertPointFromPage(theEvent.mouseLocation()));
		
		
	}
	
}