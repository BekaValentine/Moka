function MokaSegmentedControl(){
	this.extend( MokaControl );
	
	/*	Segments	*/
	var _segmentCount = 2;
	var _selectedSegment = -1;
	var _segmentCells = new MokaArray;
	var _segmentWidths = new MokaArray;
	
	/*	Behavior	*/
	var _selectionMode = MokaSingleSelectionMode;
	var _downSegment = -1;
	var _segmentToSelect = -1;
	
	
	
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_segmentCells.init();
		
		var cell1 = new MokaCell;
		cell1.setTitle($s("Segmented"));
		_segmentCells.addObject(cell1);
		
		var cell2 = new MokaCell;
		cell2.setTitle( $s("Control") );
		_segmentCells.addObject(cell2);
		
		this.setFrameSize( new MokaSize(200,20) );
		this.pageDisplay().style.backgroundColor = "lightblue";
		this.display();
		return this;
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		var totalSegmentWidth = 0;
		for( var i = 0; i < this.segmentCount(); i++ ){
			totalSegmentWidth += this.widthForSegment(i);
		}
		var proportion = this.frame().size().width()/totalSegmentWidth;
		
		var runningWidth = 0;
		for( var i = 0; i < this.segmentCount(); i++ ){
			var seg = _segmentCells.objectAtIndex(i);
			newSize.setWidth( this.widthForSegment(i)*proportion );
			
			this.drawCellInRect(seg, MokaRect.rectWithOriginAndSize(new MokaPoint(runningWidth,0),newSize));
			
			runningWidth += this.widthForSegment(i);
		}
	}	
	
	//Size constrains
	/*void*/ this.constrainSize = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		var newSize = aSize.copy();
		newSize.setHeight( this.controlSize() == MokaRegularControlSize ? 20 : 17 );
		if( newSize.width() < 0 ){ newSize.setWidth( 0 ); }
		return newSize;
	}
	
	//Specifying number of segments
	/*int*/ this.segmentCount = function(){
		return _segmentCount;
	}	
	/*void*/ this.setSegmentCount = function(anInt){
		if( typeof anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		if( anInt < 1 ){ return; }
		
		_segmentCount = anInt;
		
		var newFrameSize = this.frame().size().copy();
		while( this.segmentCount() < _segmentCells.count() ){
			var cell = _segmentCells.lastObject();
			newFrameSize.setWidth( newFrameSize.width() - this.widthForSegment(i) );
			_segmentCells.removeObject(cell);
		}
		while( this.segmentCount() > _segmentCells.count() ){
			var newCell = _segmentCells.lastObject().copy();
			newCell.setTitle($s("New"));
			newCell.setTag( _segmentCells.count() );
			newFrameSize.setWidth( newFrameSize.width() + this.widthForSegment(i) );
			_segmentCells.addObject(newCell);
		}
		
		this.setFrameSize(newFrameSize);
	}
	
	//Specifying selected segment
	/*int*/ this.selectedSegment = function(){
		return _selectedSegment;
	}	
	/*void*/ this.setSelectedSegment = function(anInt){
		if( typeof anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		if( anInt >= this.segmentCount() || anInt < -1 ){ return; }
		
		if( this.selectionMode() != MokaMultipleSelectionMode ){
			for( var i = 0; i < this.segmentCount(); i++ ){
				_segmentCells.objectAtIndex(i).setState(MokaOffState);
				_segmentCells.objectAtIndex(i).setBackgroundColor("lightBlue");
			}
		}
		if( anInt >= 0 ){
			_segmentCells.objectAtIndex(anInt).setState(MokaOnState);
			_segmentCells.objectAtIndex(anInt).setBackgroundColor("blue");
			_selectedSegment = anInt;
		} else if(anInt == -1) {
			_selectedSegment = -1;
		}
	}
	/*void*/ this.selectSegmentWithTag = function(tag){
		if( typeof aTag == undefined ){ return; }
		if( !MokaNumberIsInt(aTag) ){ return; }
		
		for( var i = 0; i < _segmentCells.count(); i++ ){
			var o = _segmentCells.objectAtIndex(i);
			if( o.tag() == tag ){
				this.setSelectedSegment(i)
			}
		}
	}
	
	//Controlling behavior
	/*MokaSelectionMode*/ this.selectionMode = function(){
		return _selectionMode;
	}
	
	/*void*/ this.setSelectionMode = function(aSelectionMode){
		if( aSelectionMode != 0 && aSelectionMode != 1 && aSelectionMode != 2 ){ return; }
		_selectionMode = aSelectionMode;
		if( aSelectionMode == MokaNoSelectionMode ){ this.setSelectedSegment(-1); }
		this.setSelectedSegment(this.selectedSegment());
	}
		
	//Working with individual segments
	/*void*/ this.setWidthForSegment = function(aWidth,aSegment){
		if( typeof aWidth == undefined ){ return; }
		if( !MokaNumberIsFloat(aWidth) ){ return; }
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }
		
		if( aSegment < 0 || aSegment > this.segmentCount() - 1 ){ return; }
		
		var oldSize = _segmentWidths.objectAtIndex(aSegment);
		_segmentWidths.replaceObjectAtIndexWithObject(aSegment,aWidth);
		var newSize = this.frame().size().copy();
		newSize.setWidth( newSize.width() + aWidth - oldSize);
		segment.setFrameSize(newSegSize);
		this.setFrameSize(newSize);
	}
	/*JageImage*/ this.widthForSegment = function(aSegment){
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }
		
		if( aSegment < 0 || aSegment > this.segmentCount() - 1 ){ return; }
		
		return _segmentWidths.objectAtIndex(aSegment);
	}
	/*void*/ this.setImageForSegment = function(anImage,aSegment){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }
		
		if( aSegment < 0 || aSegment > this.segmentCount() - 1 ){ return; }
		
		_segmentCells.objectAtIndex(aSegment).setImage(anImage);
	}
	/*MokaImage*/ this.imageForSegment = function(aSegment){
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }

		if( aSegment < 0 || aSegment > this.segmentCount() - 1 ){ return; }

		return _segmentCells.objectAtIndex(aSegment).image;
	}
	/*void*/ this.setLabelForSegment = function(aString,aSegment){
		if( typeof aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }

		if( aSegment < 0 || aSegment > this.segmentCount() - 1 ){ return; }

		_segmentCells.objectAtIndex(aSegment).setTitle(aString);
	}
	/*MokaString*/ this.labelForSegment = function(aSegment){
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }

		if( aSegment < 0 || aSegment > this.segmentCount() - 1 ){ return; }

		return _segmentCells.objectAtIndex(aSegment).title();
	}
	/*void*/ this.setMenuForSegment = function(aMenu,aSegment){
		if( typeof aMenu == undefined ){ return; }
		if( typeof(aMenu.isKindOfClass) != "function" ){ return; }
		if( !aMenu.isKindOfClass(MokaMenu) ){ return; }
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }

		if( aSegment < 0 || aSegment > this.segmentCount() - 1 ){ return; }

		_segmentCells.objectAtIndex(aSegment).setMenu(aMenu);
	}
	/*MokaMenu*/ this.menuForSegment = function(aSegment){
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }

		if( aSegment < 0 || aSegment > this.segmentCount() - 1 ){ return; }

		return _segmentCells.objectAtIndex(aSegment).menu();
	}
	/*bool*/ this.isSelectedForSegment = function(aSegment){
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }
		
		return _segmentCells.objectAtIndex(aSegment).state();
	}
	/*void*/ this.setIsEnabledForSegment = function(yn,aSegment){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }
		
		_segmentCells.objectAtIndex(aSegment).setIsEnabled( yn );
	}
	/*bool*/ this.isEnabledForSegment = function(aSegment){
		if( typeof aSegment == undefined ){ return; }
		if( !MokaNumberIsInt(aSegment) ){ return; }
		
		return _segmentCells.objectAtIndex(aSegment).isEnabled();
	}
	
	//Mouse events
	/*void*/ this.mouseDown = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var runningWidth = 0;
		for( var i = 0; i < this.segmentCount(); i++ ){
			runningWidth += this.widthForSegment(i);
			//alert( theEvent.mouseLocation().x() );
			if( this.convertPointFromPage(theEvent.mouseLocation()).x() < runningWidth ){
				_downSegment = i;
				_segmentToSelect = i;
				break;
			}
		}
		
		if( this.selectionMode() == MokaNoSelectionMode && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
		
		if( this.selectionMode() == MokaNoSelectionMode ){
			this.setSelectedSegment(_segmentToSelect);
		} else {
			var isSelected = _segmentCells.objectAtIndex(_downSegment).state();
			_segmentCells.objectAtIndex(_downSegment).setBackgroundColor((isSelected ? "grey" : "lightgrey"));
		}
		MokaApp.responderIsCapturingPagewideMouseEvents(this,YES);
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		var isSelected = _segmentCells.objectAtIndex(_downSegment).state();
		var runningPosition = 0;
		for( var i = 0; i < _downSegment; i++ ){
			runningPosition += this.widthForSegment(i);
		}
		var point = this.convertPointFromPage(theEvent.mouseLocation());
		if( point.x() >= runningPosition && point.x() < runningPosition + this.widthForSegment(_downSegment) ){
			_segmentToSelect = _downSegment;
			if( this.selectionMode() != MokaNoSelectionMode ){
				_segmentCells.objectAtIndex(_downSegment).setBackgroundColor( (isSelected ? "grey" : "lightgrey") );
			} else {
				_segmentCells.objectAtIndex(_downSegment).setBackgroundColor("blue");
			}
		} else {
			_segmentToSelect = -1;
			if( this.selectionMode() != MokaNoSelectionMode ){
				_segmentCells.objectAtIndex(_downSegment).setBackgroundColor( (isSelected ? "blue" : "lightblue") );
			} else {
				_segmentCells.objectAtIndex(_downSegment).setBackgroundColor("lightblue");
			}
		}
	}
	
	/*void*/ this.mouseUp = function(theEvent){
		if( typeof theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( _segmentToSelect < 0 || _segmentToSelect >= this.segmentCount() ){
			MokaApp.responderIsCapturingPagewideMouseEvents(this,NO);
			return;
		}
		
		
		var seg = _segmentCells.objectAtIndex(_downSegment);
		if( this.selectionMode() == MokaMultipleSelectionMode){
			if( seg.state() == MokaOnState ){
				seg.setState(MokaOffState);
				seg.setBackgroundColor("lightblue");
			} else {
				this.setSelectedSegment(_segmentToSelect);
			}
		} else {
			if( this.selectionMode() == MokaNoSelectionMode ){
				seg.setState(MokaOffState);
				seg.setBackgroundColor("lightblue");
				this.setSelectedSegment(-1);
			} else {
				this.setSelectedSegment(_segmentToSelect);
			}
		}
		
		if( this.selectionMode() != MokaNoSelectionMode && this.target() && this.action() ){
			if( typeof( this.target()[this.action().selectorName()] ) == "function" ){
				this.target()[this.action().selectorName()](this);
			}
		}
		
		MokaApp.responderIsCapturingPagewideMouseEvents(this,NO);
		
	}
	
	
}

//Segmented Control Modes
MokaNoSelectionMode			= 0
MokaSingleSelectionMode		= 1;
MokaMultipleSelectionMode	= 2;