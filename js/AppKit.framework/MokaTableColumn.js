function MokaTableColumn(){
	this.extend( MokaObject );
	
	/*	Identifier	*/
	var _identifier = null;
	
	/*	Table view	*/
	var _tableView = null;
	
	/*	Width	*/
	var _width = 100;
	var _minWidth = 25;
	var _maxWidth = 400;
	
	/*	Editability	*/
	var _isEditable = NO;
	
	/*	Component cell data	*/
	var _headerCell = new MokaCell;
	var _dataCell = new MokaCell;
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_headerCell.init();
		_dataCell.init();
		
		return this;
	}
	
	//Set the identifier
	/*id*/ this.identifier = function(){
		return _identifier;
	}
	/*void*/ this.setIdentifier = function( anIdentifier ){
		if( typeof anIdentifier == undefined ){ return; }
				
		_identifier = anIdentifier;
	}
	
	//Set the table view
	/*MokaTableView*/ this.tableView = function(){
		return _tableView;
	}	
	/*void*/ this.setTableView = function( aTableView ){
		
		if( typeof(aTableView.isKindOfClass) != "function" ){
			return;
		}
		
		if( !aTableView.isKindOfClass(MokaTableView) ){
			return;
		}
		
		_tableView = aTableView;
	}
	
	//Controlling width
	/*float*/ this.width = function(){
		return _width;
	}	
	/*void*/ this.setWidth = function( aWidth ){
		if( aWidth == undefined ){ return; }
		if( !MokaNumberIsFloat(aWidth) ){ return; }
		
		if( aWidth < this.minWidth() ){ aWidth = this.minWidth(); }
		if( aWidth > this.maxWidth() ){ aWidth = this.maxWidth(); }
		
		var oldWidth = this.width();
		
		_width = aWidth;
		
		MokaNotificationCenter.defaultCenter().postNotificationWithNameObjectAndUserInfo(	MokaTableViewColumnDidResizeNotification,
																						this.tableView(),
																						$dict(	$s("MokaTableColumn"), this,
																								$s("MokaOldWidth"), oldWidth));
	}
	/*float*/ this.minWidth = function(){
		return _minWidth;
	}	
	/*void*/ this.setMinWidth = function( aWidth ){
		if( aWidth == undefined ){ return; }
		if( !MokaNumberIsFloat(aWidth) ){ return; }
		
		if( aWidth > this.maxWidth() ){ return; }
		
		_minWidth = aWidth;
		
		if( this.width() < aWidth ){ this.setWidth(aWidth); }
	}
	/*float*/ this.maxWidth = function(){
		return _maxWidth;
	}	
	/*void*/ this.setMaxWidth = function( aWidth ){
		if( aWidth == undefined ){ return; }
		if( !MokaNumberIsFloat(aWidth) ){ return; }
		
		if( aWidth < this.minWidth() ){ return; }
		
		_maxWidth = aWidth;
		
		if( this.width() > aWidth ){ this.setWidth(aWidth); }
	}
	
	//Controlling editability
	/*bool*/ this.isEditable = function(){
		return _isEditable;
	}	
	/*void*/ this.setIsEditable = function( yn ){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		
		_isEditable = yn;
	}
	
	//Setting component cells
	/*MokaCell*/ this.headerCell = function(){
		return _headerCell;
	}	
	/*void*/ this.setHeaderCell = function( aCell ){
		if( aCell == undefined ){ return; }
		if( typeof(aCell.isKindOfClass) != "function" ){ return; }
		if( !aCell.isKindOfClass(MokaCell) ){ return; }
		
		
		_headerCell = aCell;
	}
	/*MokaCell*/ this.dataCell = function(){
		return _dataCell;
	}	
	/*void*/ this.setDataCell = function( aCell ){
		if( aCell == undefined ){ return; }
		if( typeof(aCell.isKindOfClass) != "function" ){ return; }
		if( !aCell.isKindOfClass(MokaCell) ){ return; }
		
		
		_dataCell = aCell;
	}


}