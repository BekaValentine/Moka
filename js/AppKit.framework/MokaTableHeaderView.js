function MokaTableHeaderView(){
	this.extend(MokaView);
	
	/*	The owning table view	*/
	var _tableView = null;
	
	/*	Altered Columns	*/
	var _draggedColumn = -1;
	var _draggedDistance = 0;
	var _resizedColumn = -1;
	
	/*	Drag	*/
	var _needsToBeginDrag = NO;
	var _isDragging = NO;
	var _clickedColumn = -1;
	var _columnToDropOver = -1;
	
	
	
	
	
	
	
	//Size constraints
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		return new MokaSize(aSize.x(),16);
		
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		if( !this.tableView() ){ return; }
		
		if( _isDragging ){
			
		} else {
			var cols = this.tableView().columns();
		
			for( var i = 0; i < cols.count(); i++){
				this.drawCellInRect(	cols.objectAtIndex(i).headerCell(),
										this.headerRectOfColumn(i) );
			}
		}
	}
	
	//Setting and getting the table view
	/*MokaTableView*/ this.tableView = function(){
		return _tableView;
	}
	/*void*/ this.setTableView = function(aTableView){
		if( typeof aTableView == undefined ){ return; }
		if( typeof(aTableView.isKindOfClass) != "function" ){ return; }
		if( !aTableView.isKindOfClass(MokaTableView) ){ return; }
		
		_tableView = aTableView;
		this.display();
	}
	
	//Getting altered columns
	/*int*/ this.draggedColumn = function(){
		return _draggedColumn
	}
	/*int*/ this.draggedDistance = function(){
		return _draggedDistance;
	}
	/*int*/ this.resizedColumn = function(){
		return _resizedColumn;
	}
	
	//Utility methods
	/*int*/ this.columnAtPoint = function(aPoint){
		if( typeof aPoint == undefined ){ return -1; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return -1; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return -1; }
		
		if( !this.tableView() ){ return -1; }
		
		var cols = this.tableView().columns();
		var runningWidth = 0;
		for( var i = 0; i < cols.count(); i++ ){
			if( aPoint.x() >= runningWidth && aPoint.x() < runningWidth + cols.objectAtIndex(i).width() ){
				return i;
			}
			runningWidth += cols.objectAtIndex(i).width();
		}
		return -1;
		
	}
	/*MokaRect*/ this.headerRectOfColumn = function(colIndex){
		if( typeof colIndex == undefined ){ return new MokaRect; }
		if( !MokaNumberIsInt(colIndex) ){ return new MokaRect; }
		
		if( !this.tableView() ){ return new MokaRect; }
		
		var cols = this.tableView().columns();
		var runningWidth = 0;
		for( var i = 0; i < cols.count(); i++ ){
			if( i == anIndex ){
				return new MokaRect(runningWidth,0,cols.objectAtIndex(anIndex).width(),this.frame().size().height());
			}
			runningWidth += cols.objectAtIndex(i).width();
		}
		return new MokaRect;
	}
		
	//Event handling
	/*void*/ this.mouseDown = function(theEvent){
		if( !is(theEvent,MokaEvent) ){ return; }

		_needsToBeginDrag = YES;
		_clickedColumn = this.columnAtPoint(this.convertPointFromPage(theEvent.mouseLocation()));
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( !is(theEvent,MokaEvent) ){ return; }
		
		if( _needsToBeginDrag ){
			_needsToBeginDrag = NO;
			
			var descriptor = this.columns().objectAtIndex(_clickedColumn).sortDescriptorPrototype();
			if( descriptor && this.tableView() ){
				this.tableView().setSortDescriptors( $arr(descriptor) );
			}
		} else {
			if( this.tableView() ){
				this.tableView().moveColumnToColumn(	_clicksColumn,
														this.columnAtPoint(this.convertPointFromPage(theEvent.mouseLocation())) );
			}
		}
		
		this.display();
	}
	/*void*/ this.mouseDrag = function(theEvent){
		if( !is(theEvent,MokaEvent) ){ return; }
		
		_needsToBeginDrag = NO;
		_isDragging = YES;
		_columnToDropOver = this.columnAtPoint(this.convertPointFromPage(theEvent.mouseLocation()));
		if( this.tableView() ){
			this.tableView()._willMoveColumnToColumn(_clickedColumn,_columnToDropOver);
		}
	}
	
}