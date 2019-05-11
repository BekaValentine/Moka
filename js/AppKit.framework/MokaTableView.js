function MokaTableView(){
	this.extend(MokaControl);
	
	/*	Data source	*/
	var _dataSource = null;
	
	/*	Delegate	*/
	var _delegate = null;
	
	/*	Target/Action	*/
	var _doubleAction = null;
	var _clickedColumn = -1;
	var _clickedRow = -1;
	
	/*	Behavior	*/
	var _allowsColumnReordering = YES;
	var _allowsColumnResizing = YES;
	var _allowsMultipleSelections = NO;
	var _allowsEmptySelection = YES;
	var _allowsColumnSelection = YES;
	var _columnAutoresizingStyle = MokaTableViewUniformColumnAutoresizingStyle;
	
	/*	Display Attributes	*/
	var _intercellSpacing = new MokaSize(1,0);
	var _rowHeight = 16;
	var _backgroundColor = "white";
	var _alternateBackgroundColor = "#eee";
	var _usesAlternatingRowBackgroundColors = NO;
	var _gridColor = "#ccc";
	var _selectedRowColor = "#cef";
	var _gridStyleMask = MokaHorizontalGridLines | MokaVerticalGridLines;
	
	/*	Columns	*/
	var _columns = new MokaArray;
	
	/*	Selected columns and rows	*/
	var _selectedColumnIndexes = new MokaIndexSet;
	var _selectedRowIndexes = new MokaIndexSet;
	var _selectedColumn = -1;
	var _selectedRow = -1;
	
	/*	Editing	*/
	var _editedColumn = -1;
	var _editedRow = -1;
	var _openEdittingTextField = null;
	var _editTextField = MokaTextField.make().init();
	
	/*	Auxiliary views	*/
	var _headerView = null;
	var _cornerView = _MokaCornerView.make().init();
	
	/*	Persistence	*/
	var _autosaveName = null;
	var _autosaveTableColumns = NO;
	
	/*	Highlighted Column Headers	*/
	var _highlightedTableColumn = null;
	
	/*	Column Indicator Images	*/
	var _columnIndicatorImages = new MokaDictionary;
	
	/*	Sort Descriptors	*/
	var _sortDescriptors = new MokaArray;
	
	/*	Dragging	*/
	var _verticalMotionCanBeginDrag = YES;
	var _dragOperationForLocal = MokaDragOperationCopy;
	var _dragOperationForNonLocal = MokaDragOperationCopy;
	var _needsToBeginDragging = NO;
	var _isDragging = NO;
	var _columnBeingDragged = -1;
	var _dropColumn = -1;
	var _currentPointForDraggedColumn = null;
	var _rowBeingDragged = -1;
	var _downPoint = null;
	var _draggingInsideFrame = NO;
	var _dropRow = -1;
	var _dropOperation = MokaDragOperationNone;
	
	
	
	
	//init
	/*id*/ this.init = function(){
		this.supers().init();
		
		_columns.init();
		_selectedColumnIndexes.init();
		_selectedRowIndexes.init();
		_columnIndicatorImages.init();
		_sortDescriptors.init();
		
		_editTextField.setIsEditable(YES);
		
		return this;
	}
	
	//Accessing the data source
	/*MokaObject*/ this.dataSource = function(){
		return _dataSource;
	}
	/*void*/ this.setDataSource = function(anObject){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_dataSource = anObject;
		
		this.reloadData();
	}
	
	/*id*/ this.delegate = function(){
		return _delegate;
	}
	/*void*/ this.setDelegate = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_delegate = anObject;
	}
		
	//Loading data
	/*void*/ this.reloadData = function(){
		this.display();
	}
	
	//Target/Action
	/*sel*/ this.doubleAction = function(){
		return _doubleAction;
	}
	/*void*/ this.setDoubleAction = function(aSelector){
		if( typeof aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		
		_doubleAction = aSelector;
	}
	/*int*/ this.clickedColumn = function(){
		return _clickedColumn;
	}
	/*int*/ this.clickedRow = function(){
		return _clickedRow;
	}
	
	//Behavior
	/*bool*/ this.allowsColumnReordering = function(){
		return _allowsColumnReordering;
	}
	/*void*/ this.setAllowsColumnReordering = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_allowsColumnReordering = yn;
	}
	/*bool*/ this.allowsColumnResizing = function(){
		return _allowsColumnResizing;
	}
	/*void*/ this.setAllowsColumnResizing = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_allowsColumnResizing = yn;
	}
	/*bool*/ this.allowsMultipleSelections = function(){
		return _allowsMultipleSelections;
	}
	/*void*/ this.setAllowsMultipleSelections = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_allowsMultipleSelections = yn;
	}
	/*bool*/ this.allowsEmptySelection = function(){
		return _allowsEmptySelection;
	}
	/*void*/ this.setAllowsEmptySelection = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_allowsEmptySelection = yn;
	}
	/*bool*/ this.allowsColumnSelection = function(){
		return _allowsColumnSelection;
	}
	/*void*/ this.setAllowsColumnSelection = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_allowsColumnSelection = yn;
	}
	
	//Display attributes
	/*MokaSize*/ this.intercellSpacing = function(){
		return _intercellSpacing;
	}
	/*void*/ this.setIntercellSpacing = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		if( aSize.width() < 0 ){ aSize.setWidth( 0 ); }
		if( aSize.height() < 0 ){ aSize.setHeight( 0 ); }
		
		_intercellSpacing = aSize;
		this.display();
	}
	/*float*/ this.rowHeight = function(){
		return _rowHeight;
	}
	/*void*/ this.setRowHeight = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_rowHeight = aFloat;
		this.display();
	}
	/*string*/ this.backgroundColor = function(){
		return _backgroundColor;
	}
	/*void*/ this.setBackgroundColor = function(aColor){
		if( typeof aColor == undefined ){ return; }
		if( typeof(aColor) != "string" ){ return; }
		
		_backgroundColor = aColor;
		this.display();
	}
	/*string*/ this.alternateBackgroundColor = function(){
		return _alternateBackgroundColor;
	}
	/*void*/ this.setAlternateBackgroundColor = function(aColor){
		if( typeof aColor == undefined ){ return; }
		if( typeof(aColor) != "string" ){ return; }
		
		_alternateBackgroundColor = aColor;
		this.display();
	}
	/*bool*/ this.usesAlternatingRowBackgroundColors = function(){
		return _usesAlternatingRowBackgroundColors;
	}
	/*void*/ this.setUsesAlternatingRowBackgroundColors = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_usesAlternatingRowBackgroundColors = yn;
		this.display();
	}
	/*string*/ this.gridColor = function(){
		return _gridColor;
	}
	/*void*/ this.setGridColor = function(aColor){
		if( typeof aColor == undefined ){ return; }
		if( typeof(aColor) != "string" ){ return; }
		
		_gridColor = aColor;
		this.display();
	}
	/*string*/ this.selectedRowColor = function(){
		return _selectedRowColor;
	}
	/*void*/ this.setSelectedRowColor = function(aColor){
		if( typeof aColor == undefined ){ return; }
		if( typeof(aColor) != "string" ){ return; }
		
		_selectedRowColor = aColor;
		this.display();
	}
	/*MokaGridStyle*/ this.gridStyleMask = function(){
		return _gridStyleMask
	}
	/*void*/ this.setGridStyleMask = function(aGridStyle){
		if( typeof aGridStyle == undefined ){ return; }
		if( !MokaNumberIsInt(aGridStyle) ){ return; }
		if( aGridStyle < MokaNoGridLines || aGridStyle > MokaHorizontalGridLines + MokaVerticalGridLines ){ return; }
		
		_gridStyleMask = aGridStyle;
		this.display();
	}
	
	//Manipulating columns
	/*void*/ this.addTableColumn = function(aTableColumn){
		if( typeof aTableColumn == undefined ){ return; }
		if( typeof(aTableColumn.isKindOfClass) != "function" ){ return; }
		if( !aTableColumn.isKindOfClass(MokaTableColumn) ){ return; }
		
		if( !this.columns().containsObject(aTableColumn) ){
			this.columns().addObject(aTableColumn);
			this.reloadData();
		}
	}
	/*void*/ this.removeTableColumn = function(aTableColumn){
		if( typeof aTableColumn == undefined ){ return; }
		if( typeof(aTableColumn.isKindOfClass) != "function" ){ return; }
		if( !aTableColumn.isKindOfClass(MokaTableColumn) ){ return; }
		
		if( this.columns().containsObject(aTableColumn) ){
			this.columns().removeObject(aTableColumn);
			this.display();
		}
	}
	/*void*/ this.moveColumnToColumn = function(start,finish){
		if( typeof start == undefined ){ return; }
		if( !MokaNumberIsInt(start) ){ return; }
		if( typeof finish == undefined ){ return; }
		if( !MokaNumberIsInt(finish) ){ return; }
		
		if( start < 0 || start >= this.columns().count() || finish < 0 || finish >= this.columns().count() ){ return; }
		var theColumn = this.columns().objectAtIndex(start);
		this.columns().removeObjectAtIndex(start);
		this.columns().insertObjectAtIndex(theColumn,finish);
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaTableViewColumnDidMoveNotification,
																						this,
																						$dict(	$s("MokaOldColumn"), finish,
																								$s("MokaNewColumn"), start));
	}
	/*MokaArray*/ this.columns = function(){
		return _columns;
	}
	/*int*/ this.columnWithIdentifier = function(anObject){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		for( var i = 0; i < this.columns().count(); i++ ){
			var o = this.columns().objectAtIndex(i);
			if( o.identifier() == anObject ){
				return i;
			}
		}
		
		return -1;
	}
	/*MokaTableColumn*/ this.tableColumnWithIdentifier = function(anObject){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		return this.columns().objectAtIndex(this.columnWithIdentifier(anObject));
	}
		
	//Selecting columns and rows
	/*void*/ this.selectColumnIndexesByExtendingSelection = function(anIndexSet,yn){
		if( typeof anIndexSet == undefined ){ return; }
		if( typeof(anIndexSet.isKindOfClass) != "function" ){ return; }
		if( !anIndexSet.isKindOfClass(MokaIndexSet) ){ return; }
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionIsChangingNotification,
																				this );
		
		if( !yn ){
			_selectedColumnIndexes.addIndexes(anIndexSet);
		} else {
			var startIndex = ( _selectedColumnIndexes.first() < anIndexSet.first() ? _selectedColumnIndexes.first() : anIndexSet.first() );
			var finishIndex = ( _selectedColumnIndexes.first() > anIndexSet.last() ? _selectedColumnIndexes.first() : anIndexSet.last() );
			_selectedColumnIndexes.addIndexesInRange(new MokaRange(startIndex,finishIndex-startIndex+1));
		}
		
		_selectedColumn = _selectedColumnIndexes.lastIndex();
		_selectedRow = -1;
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionDidChangeNotification,
																				this );
	}
	/*void*/ this.selectRowIndexesByExtendingSelection = function(anIndexSet,yn){
		if( typeof anIndexSet == undefined ){ return; }
		if( typeof(anIndexSet.isKindOfClass) != "function" ){ return; }
		if( !anIndexSet.isKindOfClass(MokaIndexSet) ){ return; }
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionIsChangingNotification,
																				this );
		
		if( !yn ){
			_selectedColumnIndexes.addIndexes(anIndexSet);
		} else {
			var startIndex = ( _selectedRowIndexes.first() < anIndexSet.first() ? _selectedRowIndexes.first() : anIndexSet.first() );
			var finishIndex = ( _selectedRowIndexes.first() > anIndexSet.last() ? _selectedRowIndexes.first() : anIndexSet.last() );
			_selectedRowIndexes.addIndexesInRange(new MokaRange(startIndex,finishIndex-startIndex+1));
		}
		
		_selectedRow = _selectedRowIndexes.lastIndex();
		_selectedColumn = -1;
		
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionDidChangeNotification,
																				this );
	}
	/*MokaIndexSet*/ this.selectedColumnIndexes = function(){
		return _selectedColumnIndexes;
	}
	/*MokaIndexSet*/ this.selectedRowIndexes = function(){
		return _selectedRowIndexes;
	}
	/*void*/ this.deselectColumn = function(anIndex){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionIsChangingNotification,
																				this );
		
		_selectedColumnIndexes.removeIndex(anIndex);
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionDidChangeNotification,
																				this );
	}
	/*void*/ this.deselectRow = function(anIndex){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionIsChangingNotification,
																				this );
		
		_selectedRowIndexes.removeIndex(anIndex);
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionDidChangeNotification,
																				this );
	}
	/*int*/ this.numberOfSelectedColumns = function(){
		return _selectedColumnIndexes.count();
	}
	/*int*/ this.numberOfSelectedRows = function(){
		return _selectedRowIndexes.count();
	}
	/*int*/ this.selectedColumn = function(){
		return _selectedColumn;
	}
	/*int*/ this.selectedRow = function(){
		return _selectedRow;
	}
	/*bool*/ this.isColumnSelected = function(anIndex){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		return _selectedColumnIndexes.containsIndex(anIndex);
	}
	/*bool*/ this.isRowSelected = function(anIndex){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		return _selectedRowIndexes.containsIndex(anIndex);
	}
	/*void*/ this.selectAll = function(sender){
		if( typeof sender == undefined ){ return; }
		if( typeof(sender.isKindOfClass) != "function" ){ return; }
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionIsChangingNotification,
																				this );
		
		if( this.selectedColumn() != -1 ){
			_selectedColumnsIndex.addIndexesInRange(new MokaRange(0,this.numberOfColumns()));
			_selectedColumn = this.numberOfColumns() - 1;
			_selectedRow = -1;
		} else if( this.selectedRow() != -1 ) {
			if( this.numberOfRows() != 0 ){
				_selectedRowsIndex.addIndexesInRange(new MokaRange(0,this.numberOfRows()));
				_selectedRow = this.numberOfRows() - 1;
			}
			_selectedColumn = -1;
		}
		this.display();
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionDidChangeNotification,
																				this );
	}
	/*void*/ this.deselectAll = function(sender){
		if( typeof sender == undefined ){ return; }
		if( typeof(sender.isKindOfClass) != "function" ){ return; }
		
		if( this.allowsEmptySelection() ){
			
			MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionIsChangingNotification,
																					this );
			
			_selectedColumnIndexes.removeAllIndexes();
			_selectedRowIndexes.removeAllIndexes();
			this.display();
			
			MokaNotificationCenter.defaultCenter().postNotificationWithNameAndObject(	MokaTableViewSelectionDidChangeNotification,
																					this );
		}
	}
	
	//Accessing dimensions
	/*int*/ this.numberOfColumns = function(){
		return this.columns().count();
	}
	/*int*/ this.numberOfRows = function(){
		if( !this.dataSource() ){ return 0; }
		if( !this.dataSource().respondsToSelector($sel("numberOfRowsInTableView"))){ return 0; }
		return this.dataSource().numberOfRowsInTableView(this);
	}
	
	//Editing
	/*void*/ this.editColumnAndRowWithEventWithSelect = function(colIndex,rowIndex,theEvent,yn){
		if( colIndex == undefined ){ return; }
		if( !MokaNumberIsInt(colIndex) ){ return; }
		if( rowIndex == undefined ){ return; }
		if( !MokaNumberIsInt(rowIndex) ){ return; }
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		//add an editable text field over the cell with target = this, action = _columnAndRowFinishedEditing
		_editTextField.setFrame(this.frameOfCellAtColumnAndRow(colIndex,rowIndex));
		
		if( yn && this.panel() ){ this.panel().makeFirstResponder(_editTextField); }
		
		this.drawingCanvas().appendChild(_editTextField.pageDisplay());
		_editedColumn = colIndex;
		_editedRow = rowIndex;
	}
	/*void*/ this._columnAndRowFinishedEditing = function(){
		//remove the text field and update the datasource
		this.drawingCanvas().removeChild(_editTextField.pageDisplay());
		
		if( this.dataSource() && this.dataSource().respondsToSelector($sel("setObjectValueForTableColumnAndRowForTable"))){
			this.dataSource().setObjectValueForTableColumnAndRowForTable(	_editTextField.stringValue(),
																			this.columns().objectAtIndex(_editedColumn),
																			_editedRow,
																			this);
		}
		
		if( this.panel() ){ this.panel().makeFirstResponder(this); }
		
		_editedColumn = -1;
		_editedRow = -1;
	}
	
	/*int*/ this.editedColumn = function(){
		return _editedColumn;
	}
	/*int*/ this.editedRow = function(){
		return _editedRow;
	}
	
	//Auxiliary views
	/*MokaTableHeaderView*/ this.headerView = function(){
		return _headerView;
	}
	/*void*/ this.setHeaderView = function(aTableHeaderView){
		if( typeof aTableHeaderView == undefined ){ return; }
		if( typeof(aTableHeaderView.isKindOfClass) != "function" ){ return; }
		if( !aTableHeaderView.isKindOfClass(MokaTableHeaderView) ){ return; }
		
		_headerView = aTableHeaderView;
		if( this.enclosingScrollView() && this.enclosingScrollView().documentView() == this ){ this.enclosingScrollView().display(); }
	}
	/*MokaView*/ this.cornerView = function(){
		return _cornerView;
	}
	/*void*/ this.setCornerView = function(aView){
		if( typeof aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		_cornerView = aView;
		if( this.enclosingScrollView() && this.enclosingScrollView().documentView() == this ){ this.enclosingScrollView().display(); }
	}
	
	//Layout support
	/*MokaRect*/ this.rectOfColumn = function(anIndex){
		if( anIndex == undefined ){ return new MokaRect; }
		if( !MokaNumberIsInt(anIndex) ){ return new MokaRect; }
		if( anIndex < 0 || anIndex >= this.numberOfColumns() ){ return new MokaRect; }
		
		var colX = 0;
		for( var i = 0; i < anIndex; i++ ){
			colX += this.columns().objectAtIndex(i).width();
		}
		colX += (anIndex - 1)*this.intercellSpacing().width();
		return MokaRect.rectWithOriginAndSize(	new MokaPoint(colX,0),
												new MokaSize(	this.columns().objectAtIndex(anIndex).width(),
																this.numberOfRows()*this.rowHeight() + this.intercellSpacing().height()*(this.numberOfRows()-1) ));
	}
	/*MokaRect*/ this.rectOfRow = function(anIndex){
		if( typeof anIndex == undefined ){ return new MokaRect; }
		if( !MokaNumberIsInt(anIndex) ){ return new MokaRect; }
		if( anIndex < 0 || anIndex >= this.numberOfRows() ){ return new MokaRect; }
		
		var rowHeight = this.rowHeight();
		var yPosition = this.rowHeight()*anIndex + this.intercellSpacing().height()*(anIndex - 1);
		if( this.delegate() ){
			if( this.delegate().respondsToSelector($sel("heightOfRowForTableView"))){
				var theYPosition = 0;
				for( var i = 0; i < anIndex; i++ ){
					theYPosition += this.delegate().heightOfRowForTableView(i,this);
				}
				yPosition = theYPosition;
				rowHeight = this.delegate().heightOfRowForTableView(anIndex,this);
			}
		}
		return MokaRect.rectWithOriginAndSize(	new MokaPoint(0, yPosition),
												new MokaSize(this.frame().size().width(), rowHeight));
	}
	/*MokaRange*/ this.columnsInRect = function(aRect){
		if( aRect == undefined ){ return new MokaRange; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return new MokaRange; }
		if( !aRect.isKindOfClass(MokaRect) ){ return new MokaRange; }
		
		var intersectedRect = aRect.intersectWith(MokaRect.rectWithOriginAndSize(new MokaPoint, this.frame().size()));
		if( intersectedRect.width() <= 0 || intersectedRect.height() <= 0 ){ return new MokaRange; }
		
		var firstIn;
		var lastIn;
		var colX = 0;
		for( var i = 0; i < this.numberOfColumns(); i++ ){
			var col = this.columns().objectAtIndex(i);
			
			if( colX >= intersectedRect.origin().x() && colX < intersectedRect.origin().x() + intersectedRect.size().width()
			&&	colX + column.width() >= intersectedRect.origin().x() && colX + column.width() < intersectedRect.origin().x() + intersectedRect.size().width() ){
				if( firstIn == undefined ){ firstIn = i; }
				if( lastIn == undefined || i > lastIn ){ lastIn = i; }
			}
		}
		
		return new MokaRange(firstIn,lastIn-firstIn);
		
	}
	/*MokaRange*/ this.rowsInRect = function(aRect){
		if( typeof aRect == undefined ){ return; }
		if( typeof(aRect.isKindOfClass) != "function" ){ return; }
		if( !aRect.isKindOfClass(MokaRect) ){ return; }
		
		if( this.delegate() ){
			if( this.delegate().respondsToSelector($sel("heightOfRowForTableView"))){
				var lowest = 0;
				var highest = 0;
				var runningPosition = 0;
				for( var i = 0; i < this.numberOfRows(); i++ ){
					if( runningPosition <= aRect.origin().y() && runningPosition + this.delegate().heightOfRowForTableView(i,this) > aRect.origin().y()
					&&	runningPosition + this.delegate().heightOfRowForTableView(i,this) + this.delegate().heightOfRowForTableView(i+1,this) < aRect.origin().y() + aRect.size().height() ){
						lowest = i+1;
					}
					if( runningPosition <= aRect.origin().y() + aRect.size().height() && runningPosition + this.delegate().heightOfRowForTableView(i,this) > aRect.origin().y() + aRect.size().height()
					&&	runningPosition - this.delegate().heightOfRowForTableView(i-1,this) >= aRect.origin().y() ){
						highest = i-1;
					}
				}
				return new MokaRange(lowest,highest-lowest);
			}
		}
		
		var intersectedRect = aRect.intersectWith(MokaRect.rectWithOriginAndSize(new MokaPoint, this.frame().size()));
		if( intersectedRect.width() <= 0 || intersectedRect.height() <= 0 ){ return new MokaRange; }
		
		var first = Math.ceil(intersectedRect.origin().y()/this.rowHeight());
		var last = Math.floor((intersectedRect.origin().y()+intersectedRect.size().height())/this.rowHeight())
		
		return new MokaRange(first, last-first);
	}
	/*anIndex*/ this.columnAtPoint = function(aPoint){
		if( aPoint == undefined ){ return -1; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return -1; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return -1; }
		if( aPoint.x() < 0 || aPoint.x() > this.frame().size().width() ){ return -1; }
		
		var runningPosition = 0;
		for(var i = 0; i < this.numberOfColumns(); i++){
			var col = this.columns().objectAtIndex(i);
			if( aPoint.x() >= runningPosition && aPoint.x() < runningPosition + col.width() + this.intercellSpacing().width() ){
				return i;
			}
			runningPosition += col.width() + this.intercellSpacing().width();
		}
		return -1;
	}
	/*anIndex*/ this.rowAtPoint = function(aPoint){
		if( typeof aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		if( this.delegate() ){
			if( this.delegate().respondsToSelector($sel("heightOfRowForTableView"))){
				var runningPosition = 0;
				for( var i = 0; i < this.numberOfRows(); i++ ){
					if(runningPosition <= aPoint.y() && runningPosition + this.delegate().heightOfRowForTableView(i,this) > aPoint.y() ){
						return i;
					}
				}
			}
		}
		var apparentRow = Math.floor( aPoint.y()/(this.rowHeight() + this.intercellSpacing().height()) );
		return (apparentRow >= this.numberOfRows() || apparentRow < 0 ? -1 : apparentRow );
	}
	/*MokaRect*/ this.frameOfCellAtColumnAndRow = function(aColumn,aRow){
		if( aColumn == undefined ){ return new MokaRect; }
		if( !MokaNumberIsInt(aColumn) ){ return new MokaRect; }
		if( aRow == undefined ){ return new MokaRect; }
		if( !MokaNumberIsInt(aRow) ){ return new MokaRect; }
		
		return this.rectOfColumn(aColumn).intersectWith(this.rectOfRow(aRow));
	}
	/*MokaTableViewColumnAutoresizingStyle*/ this.columnAutoresizingStyle = function(){
		return _columnAutoresizingStyle;
	}
	/*void*/ this.setColumnAutoresizingStyle = function(anAutoresizingStyle){
		if( anAutoresizingStyle == undefined ){ return; }
		if( !MokaNumberIsInt(anAutoresizingStyle) ){ return; }
		if( anAutoresizingStyle < MokaTableViewNoColumnAutoresizing
			|| anAutoresizingStyle > MokaTableViewFirstColumnOnlyAutoresizingStyle ){ return; }
			
		_columnAutoresizingStyle = anAutoresizingStyle;
	}
	/*void*/ this.sizeLastColumnToFit = function(){
		var totalColumnWidth = 0;
		for( var i = 0; i < this.numberOfColumns(); i++ ){
			totalColumnWidth += this.columns().objectAtIndex(i).width();
		}
		
		var gap = this.frame().size().width() - totalColumnWidth;
		
		if( gap > 0 ){
			this.columns().lastObject().setWidth( this.columns().lastObject().width() + gap );
		}
		this.display();
	}
	/*void*/ this.noteNumberOfRowsChanged = function(){
		this.tile();
	}
	/*void*/ this.noteHeightOfRowsWithIndexesChanged = function(anIndexSet){
		if( this.delegate() ){
			if( this.delegate().respondsToSelector($sel("heightOfRowForTableView")) ){
				var heightOfRows = 0;
				var allIndexes = anIndexSet.allIndexes();
				for( var i = 0; i < allIndexes.count(); i++ ){
					heightOfRows += this.delegate().heightOfRowForTableView(allIndexes.objectAtIndex(i),this);
				}
				this.setFrameSize(new MokaSize(	this.frame().size().width(),
												this.frame().size().height() - allIndexes.count()*this.rowHeight() + heightOfRows ));
			}
		}
	}
	/*void*/ this.tile = function(){
		//size to fit the content
		
		var columnWidths = 0;
		for( var i = 0; i < this.numberOfColumns(); i++ ){
			columnWidths += this.columns().objectAtIndex(i).width();
		}
		columnWidths += (this.numberOfColumns()-1)*this.intercellSpacing().width();
		
		this.setFrameSize(new MokaSize(columnWidths,this.numberOfRows()*this.rowHeight()+(this.numberOfRows()-1)*this.intercellSpacing().height()));
		if( this.headerView() ){
			this.headerView().setFrameSize(new MokaSize(columnWidths,20));
		}
		
		if( this.enclosingScrollView() && this.enclosingScrollView().documentView() == this ){
			this.enclosingScrollView().setLineScroll(this.rowHeight());
		}
	}
	/*void*/ this.sizeToFit = function(){
		
		var maxWidth = 0;
		for( var i = 0; i < this.columns().count(); i++ ){
			var c = this.columns().objectAtIndex(i).headerCell();
			if( c.title().length()*c.fontSize() > maxWidth ){ maxChars = c.title().length()*c.fontSize(); }
		}
		
		for( var i = 0; i < this.columns().count(); i++ ){
			var c = this.columns.objectAtIndex(i);
			c.setWidth( ( maxWidth > c.maxWidth() ? c.maxWidth() : maxWidth )  );
		}		
		
		this.tile();		
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		//redraw everything
		var runningColumnPosition = 0;
		for( var c = 0; c < this.numberOfColumns(); c++ ){
			var column = this.columns().objectAtIndex(c);
			var runningRowPosition = 0;
			for( var row = 0; row < this.numberOfRows(); row++ ){
				
				var rowHeight = this.rowHeight();
				if( this.delegate() ){
					if( this.delegate().respondsToSelector($sel("heightOfRowForTableView")) ){
						rowHeight = this.delegate().heightOfRowForTableView(row,this);
					}
				}
				
				var cell = document.createElement("div");
				cell.style.margin = 0;
				cell.style.padding = "0 0 0 4"+MokaPageSizeUnits;
				cell.style.borderRight = this.intercellSpacing().width()+MokaPageSizeUnits+" solid "+this.gridColor();
				cell.style.borderBottom = this.intercellSpacing().height()+MokaPageSizeUnits+" solid "+this.gridColor();
				cell.style.width = column.width()-4+MokaPageSizeUnits;
				cell.style.height = rowHeight+MokaPageSizeUnits;
				cell.style.position = "absolute";
				cell.style.top = runningRowPosition + row*this.intercellSpacing().height()+MokaPageSizeUnits;
				cell.style.left = runningColumnPosition+MokaPageSizeUnits;
				cell.style.backgroundColor = ( (this.isRowSelected(row) || this.isColumnSelected(c)) ? this.selectedRowColor() : (row%2 == 0 || !_usesAlternatingRowBackgroundColors ? this.backgroundColor() : this.alternateBackgroundColor() ) );
				cell.style.fontFamily = "sans-serif";
				cell.style.fontSize = "12"+MokaPageSizeUnits;
				
				if( this.dataSource() ){
					if( this.dataSource().respondsToSelector($sel("objectValueForTableViewTableColumnAndRow")) ){
						var objectValue = this.dataSource().objectValueForTableViewTableColumnAndRow(this,column,row);
						
						if(objectValue.isKindOfClass(MokaString)){
							cell.appendChild(document.createTextNode(objectValue.characters()));
						}
					}
				}
				runningRowPosition += rowHeight;
				this.drawingCanvas().appendChild(cell);
			}
			runningColumnPosition += column.width() + this.intercellSpacing().width();
		}
	}
	
	//Scrolling
	/*void*/ this.scrollRowToVisible = function(rowIndex){
		if( rowIndex == undefined ){ return; }
		if( !MokaNumberIsInt(rowIndex) ){ return; }
		if( rowIndex < 0 || rowIndex >= this.numberOfRows() ){ return; }
		
		if( this.enclosingScrollView() && this.enclosingScrollView().documentView() == this ){
			this.scrollPoint(this.rectOfRow(rowIndex).origin());
		}
	}
	/*void*/ this.scrollColumnToVisible = function(columnIndex){
		if( columnIndex == undefined ){ return; }
		if( !MokaNumberIsInt(columnIndex) ){ return; }
		if( columnIndex < 0 || columnIndex >= this.numberOfRows() ){ return; }
		
		if( this.enclosingScrollView() && this.enclosingScrollView().documentView() == this ){
			this.scrollPoint(this.rectOfColumn(columnIndex).origin());
		}
	}
	
	//Persistence
	/*MokaString*/ this.autosaveName = function(){
		return _autosaveName;
	}
	/*void*/ this.setAutosaveName = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_autosaveName = aString;
	}
	/*bool*/ this.autosaveTableColumns = function(){
		return _autosaveTableColumns;
	}
	/*void*/ this.setAutosaveTableColumns = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_autosaveTableColumns = yn;
	}
	
	//Column Indicator Images
	/*MokaImage*/ this.indicatorImageInTableColumn = function(aTableColumn){
		if( typeof aTableColumn == undefined ){ return; }
		if( typeof(aTableColumn.isKindOfClass) != "function" ){ return; }
		if( !aTableColumn.isKindOfClass(MokaTableColumn) ){ return; }
		
		return _columnIndicatorImages.objectForKey(aTableColumn);
	}
	/*void*/ this.setIndicatorImageInTableColumn = function(anImage,aTableColumn){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		if( typeof aTableColumn == undefined ){ return; }
		if( typeof(aTableColumn.isKindOfClass) != "function" ){ return; }
		if( !aTableColumn.isKindOfClass(MokaTableColumn) ){ return; }
		
		if( !this.columns().containsObject(aTableColumn) ){ return; }
		
		_columnIndicatorImages.setObjectForKey(anImage,aTableColumn);
	}
		
	//Highlighted table columns
	/*MokaTableColumn*/ this.highlighedTableColumn = function(){
		return _highlightedTableColumn;
	}
	/*void*/ this.setHighlightedTableColumn = function(aTableColumn){
		if( typeof aTableColumn == undefined ){ return; }
		if( typeof(aTableColumn.isKindOfClass) != "function" ){ return; }
		if( !aTableColumn.isKindOfClass(MokaTableColumn) ){ return; }
		
		if( !this.columns().containsObject(aTableColumn) ){ return; }
		
		_highlightedTableColumn = aTableColumn;
	}
	
	//Dragging
	/*element*/ this.dragImageForRowsWithIndexesAndTableColumnsWithEventAndOffset = function( anIndexSet, arrayOfTableColumns, dragEvent, imageOffset ){
		if( anIndexSet == undefined ){ return; }
		if( typeof(anIndexSet.isKindOfClass) != "function" ){ return; }
		if( !anIndexSet.isKindOfClass(MokaIndexSet) ){ return; }
		if( arrayOfTableColumns == undefined ){ return; }
		if( typeof(arrayOfTableColumns.isKindOfClass) != "function" ){ return; }
		if( !arrayOfTableColumns.isKindOfClass(MokaArray) ){ return; }
		if( dragEvent == undefined ){ return; }
		if( typeof(dragEvent.isKindOfClass) != "function" ){ return; }
		if( !dragEvent.isKindOfClass(MokaEvent) ){ return; }
		if( imageOffset == undefined ){ return; }
		if( typeof(imageOffset.isKindOfClass) != "function" ){ return; }
		if( !imageOffset.isKindOfClass(MokaPoint) ){ return; }


		var runningColumnPosition = 0;
		var container = document.createElement("div");
		container.style.border = "1px solid lightgrey";
		var rowHeight = this.rowHeight();
		var indexes = anIndexSet.allIndexes();
		
		for( var i = 0; i < indexes.count(); i++ ){
			
			var row = indexes.objectAtIndex(i);
			
			for( var c = 0; c < this.numberOfColumns(); c++ ){
				var column = this.columns().objectAtIndex(c);
				
				
				if( this.delegate() ){
					if( this.delegate().respondsToSelector($sel("heightOfRowForTableView")) ){
						rowHeight = this.delegate().heightOfRowForTableView(row,this);
					}
				}

				var cell = document.createElement("div");
				cell.style.margin = 0;
				cell.style.padding = "0 0 0 4"+MokaPageSizeUnits;
				cell.style.borderRight = this.intercellSpacing().width()+MokaPageSizeUnits+" solid "+this.gridColor();
				cell.style.borderBottom = this.intercellSpacing().height()+MokaPageSizeUnits+" solid "+this.gridColor();
				cell.style.width = column.width()-4+MokaPageSizeUnits;
				cell.style.height = rowHeight+MokaPageSizeUnits;
				cell.style.position = "absolute";
				cell.style.top = (rowHeight*row) + MokaPageSizeUnits;
				cell.style.left = runningColumnPosition+MokaPageSizeUnits;
				cell.style.backgroundColor = (row%2 == 0 || !_usesAlternatingRowBackgroundColors ? this.backgroundColor() : this.alternateBackgroundColor() );
				cell.style.fontFamily = "sans-serif";
				cell.style.fontSize = "12"+MokaPageSizeUnits;
				
				if( this.dataSource() ){
					if( this.dataSource().respondsToSelector($sel("objectValueForTableViewTableColumnAndRow")) ){
						var objectValue = this.dataSource().objectValueForTableViewTableColumnAndRow(this,column,row);

						if(objectValue.isKindOfClass(MokaString)){
							cell.appendChild(document.createTextNode(objectValue.characters()));
						} else if( objectValue.isKindOfClass(MokaView) ){
							objectValue.viewWillMoveToPanel(this.panel());
							objectValue.viewWillMoveToSuperview(this);
							cell.appendChild(objectValue.pageDisplay());
							objectValue.viewDidMoveToSuperview();
							objectValue.viewDidMoveToPanel();
						}
					}
				}
				container.appendChild(cell);
				runningColumnPosition += column.width() + this.intercellSpacing().width();
			}
		}
		container.style.width = runningColumnPosition*anIndexSet.count() + MokaPageSizeUnits;
		container.style.height = rowHeight*anIndexSet.count();
		
		imageOffset.setX( this.convertPointFromPage(dragEvent.mouseLocation()).x() );
		imageOffset.setY( rowHeight*anIndexSet.count()/2 );
		
		return container;
	}
	/*bool*/ this.canDragRowsWithIndexesAtPoint = function(anIndexSet, aPoint){
		if( anIndexSet == undefined ){ return NO; }
		if( typeof(anIndexSet.isKindOfClass) != "function" ){ return NO; }
		if( !anIndexSet.isKindOfClass(MokaIndexSet) ){ return NO; }
		if( aPoint == undefined ){ return NO; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return NO; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return NO; }
		
		return anIndexSet.containsIndex(this.rowAtPoint(aPoint));
	}
	/*void*/ this.setDraggingSourceOperationMaskForLocal = function(mask,isLocal){
		if( mask == undefined ){ return; }
		if( !MokaNumberIsInt(mask) ){ return; }
		if( mask < MokaDragOperationNone || mask > MokaDragOperationEvery ){ return; }
		if( isLocal == undefined ){ return; }
		if( typeof(isLocal) != "boolean" ){ return; }
		
		if( isLocal ){
			_dragOperationForLocal = mask;
		} else {
			_dragOperationForNonLocal = mask;
		}
	}
	/*void*/ this.setDropRowAndDropOperation = function(aRow,dropOperation){
		if( aRow == undefined ){ return; }
		if( !MokaNumberIsInt(aRow) ){ return; }
		if( aRow < 0 ){ return; }
		if( dropOperation == undefined ){ return; }
		if( !MokaNumberIsInt(dropOperation) ){ return; }
		if( dropOperation < MokaDragOperationNone || dropOperation > MokaDragOperationEvery ){ return; }
		
		_dropRow = aRow;
		_dropOperation = dropOperation;
		
	}
	/*bool*/ this.verticalMotionCanBeginDrag = function(){
		return _verticalMotionCanBeginDrag;
	}
	/*void*/ this.setVerticalMotionCanBeginDrag = function(yn){
		_verticalMotionCanBeginDrag = yn;
	}
	/*void*/ this._draggingColumnToColumnCurrentlyAtPoint = function(start,finish,currentPoint){
		if( !is(start,"int") || !is(finish,"int") || !is(currentPoint,MokaPoint) ){ return; }
		
		_columnBeingDragged = start;
		_dropColumn = finish;
		_currentPointForDraggedColumn = currentPoint;
	}
	
	//Sort descriptors
	/*MokaArray*/ this.sortDescriptors = function(){
		return _sortDescriptors;
	}
	/*void*/ this.setSortDescriptors = function(anArray){
		if( typeof anArray == undefined ){ return; }
		if( typeof(anArray.isKindOfClass) != "function" ){ return; }
		if( !anArray.isKindOfClass(MokaArray) ){ return; }
		
		_sortDescriptors = anArray;
	}
	
	//Events	
	/*void*/ this.mouseDown = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		_downPoint = this.convertPointFromPage(theEvent.mouseLocation());
		
		_clickedRow = this.rowAtPoint(_downPoint);
		_clickedColumn = this.colAtPoint(_downPoint);
	
		if( !this.isRowSelected(this.clickedRow()) ){
			if( theEvent.modifierFlags() & MokaControlKey ){
				_selectedRowIndexes.addIndex(this.clickedRow());
			} else {
				this.selectColumnIndexesByExtendingSelection(MokaIndexSet.make().initWithIndex(this.clickedRow()),theEvent.modifierFlags() & MokaShiftKey);
			}
			_needsToBeginDragging = YES;
		} else {
			this.editColumnAndRowWithEventWithSelect(this.clickedColumn(),this.clickedRow(),theEvent,YES);
		}
		
		
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		_isDragging = NO;
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( _needsToBeginDragging && ( this.convertPointFromPage(theEvent.mouseLocation()).subtract(_downPoint).x() != 0 || this.verticalMotionCanBeginDrag() ) ){
			_isDragging = YES;
			
			var imageOffset = new MokaPoint;
			
			var imageToDrag = this.dragImageForRowsWithIndexesAndTableColumnsWithEventAndOffset(_selectedRowIndexes,
																								this.columns(),
																								theEvent,
																								imageOffset );
			
			
			
			this.dragImageAtPointWithOffsetEventPasteboardSourceAndSlideBack(	imageToDrag,
																				this.convertPointFromPage(theEvent.mouseLocation()),
																				imageOffset,
																				theEvent,
																				MokaPasteboard.generalPasteboard(),
																				this,
																				NO);
		}
		if( (this.clickedColumn() >= 0 && this.allowsColumnReordering()) || this.clickedRow() ){
			this.display();
		}
		_needsToBeginDragging = NO;
	}
	/*void*/ this.rightMouseDown = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		_downPoint = this.convertPointFromPage(theEvent.mouseLocation());
		
		_clickedRow = this.rowAtPoint(_downPoint);

		if( theEvent.modifierFlags() & MokaControlKey ){
			_selectedRowIndexes.addIndex(this.clickedRow());
		} else {
			this.selectColumnIndexesByExtendingSelection(MokaIndexSet.make().initWithIndex(this.clickedRow()),theEvent.modifierFlags() & MokaShiftKey);
		}
		
		if( !theEvent.modifierFlags() ){
			var contextMenu = this.menuForEvent(theEvent);
		
			if( contextMenu ){
				MokaMenu.popUpContextMenuWithEventForView(contextMenu,theEvent,this);
			}
		}
	}
	
	//Dragging source operations
	/*int*/ this.draggingSourceOperationMaskForLocal = function(isLocal){
		if( isLocal == undefined ){ return MokaDragOperationNone; }
		if( typeof(isLocal) != "boolean" ){ return MokaDragOperationNone ; }
		
		return ( isLocal ? _dragOperationForLocal : _dragOperationForNonLocal );
	}	
	
	//Dragging destination operations
	//methods need to respond to the dragging info's data type for the dragged item
	//to accept only appropriate types, if there are any
	//and to respond to the editability of the receiver
	/*MokaDragOperation*/ this.draggingEntered = function(sender){
		if( sender == undefined ){ return MokaDragOperationNone; }
		if( typeof(sender.isKindOfClass) != "function" ){ return MokaDragOperationNone; }
		
		_draggingInsideFrame = YES;
		
		if( this.dataSource() && this.dataSource().respondsToSelector($s("validateDropWithProposedRowAndProposedDropOperationForTableView")) ){
			return this.dataSource().validateDropWithProposedRowAndProposedDropOperationForTableView(	sender,
																										this.rowAtPoint(this.convertPointFromPage(sender.draggingLocation())),
																										MokaDragOperationCopy,
																										this );
			
		}
		
		return MokaDragOperationNone;
	}
	/*MokaDragOperation*/ this.draggingUpdated = function(sender){
		if( sender == undefined ){ return MokaDragOperationNone; }
		if( typeof(sender.isKindOfClass) != "function" ){ return MokaDragOperationNone; }
		
		return MokaDragOperationCopy;
	}
	/*void*/ this.draggingEnded = function(sender){
		if( sender == undefined ){ return; }
		if( typeof(sender.isKindOfClass) != "function" ){ return; }
		
		_draggingInsideFrame = NO;
	}
	/*void*/ this.draggingExited = function(sender){
		if( sender == undefined ){ return; }
		if( typeof(sender.isKindOfClass) != "function" ){ return; }
		
		_draggingInsideFrame = NO;
	}
	/*bool*/ this.prepareForDragOperation = function(sender){
		if( sender == undefined ){ return NO; }
		if( typeof(sender.isKindOfClass) != "function" ){ return NO; }
		
		_dropRow = this.rowAtPoint(this.convertPointFromPage(sender.draggingLocation()));
		_dropOperation = MokaDragOperationCopy;
		
		return YES;
	}
	/*bool*/ this.performDragOperation = function(sender){
		if( sender == undefined ){ return NO; }
		if( typeof(sender.isKindOfClass) != "function" ){ return NO; }
		
		if( this.dataSource() && this.dataSource().respondsToSelector($s("acceptDropWithRowAndDragOperationForTableView")) ){
			return this.dataSource().acceptDropWithRowAndDragOperationForTableView(	sender,
																					_dropRow,
																					_dropOperation,
																					this );
																				
		}
		
		return NO;
	}
	/*bool*/ this.concludeDragOperation = function(sender){
		if( sender == undefined ){ return NO; }
		if( typeof(sender.isKindOfClass) != "function" ){ return NO; }
		
		this.reloadData();
		
		return YES;
	}
	
}

//Grid style masks
MokaNoGridLines			= 0;
MokaHorizontalGridLines	= 1 << 0;
MokaVerticalGridLines	= 1 << 1;

//Column autoresizing style
MokaTableViewNoColumnAutoresizing						= 0;
MokaTableViewUniformColumnAutoresizingStyle				= 1;
MokaTableViewSequentialColumnAutoresizingStyle			= 2;
MokaTableViewReverseSequentialColumnAutoresizingStyle	= 3;
MokaTableViewLastColumnOnlyAutoresizingStyle			= 4;
MokaTableViewFirstColumnOnlyAutoresizingStyle			= 5;

//Notifications
MokaTableViewColumnDidMoveNotification = $s("MokaTableViewColumnDidMoveNotification");
MokaTableViewColumnDidResizeNotification = $s("MokaTableViewColumnDidResizeNotification");
MokaTableViewSelectionDidChangeNotification = $s("MokaTableViewSelectionDidChangeNotification");
MokaTableViewSelectionIsChangingNotification = $s("MokaTableViewSelectionIsChangingNotification");