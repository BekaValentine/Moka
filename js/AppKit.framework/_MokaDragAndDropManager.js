function _MokaDragAndDropManager(){
	this.extend(MokaResponder);
	
	/*	Dragging session information	*/
	var _draggingSource = null;
	var _draggingSourceOperationMask = 0;
	var _draggingDestinationPanel = null;
	var _draggingPasteboard = null;
	var _draggingSequenceNumber = 0;
	var _draggingLocation = null;
	
	/*	Image Information	*/
	var _draggedImage = null;
	var _draggedImageLocation = null;
	var _draggedElement = null;
	
	
	
	
	//Dragging-session information
	/*id*/ this.draggingSource = function(){
		return _draggingSource;
	}
	/*void*/ this._setDraggingSource = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_draggingSource = anObject;
	}
	/*int*/ this.draggingSourceOperationMask = function(){
		return _draggingSourceOperationMask;
	}
	/*void*/ this._setDraggingSourceOperationMask = function(aMask){
		if( aMask == undefined ){ return; }
		if( !MokaNumberIsInt(aMask) ){ return; }
		if( aMask < MokaDragOperationNone && aMask > MokaDragOperationEvery ){ return; }
		
		_draggingSourceOperationMask = aMask;
	}
	/*MokaPanel*/ this.draggingDestinationPanel = function(){
		return _draggingDestinationPanel;
	}
	/*void*/ this._setDraggingDestinationPanel = function(aPanel){
		if( aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		
		_draggingDestinationPanel = aPanel;
	}
	/*MokaPastboard*/ this.draggingPasteboard = function(){
		return _draggingPasteboard;
	}
	/*void*/ this._setDraggingPasteboard = function(aPasteboard){
		if( aPasteboard == undefined ){ return; }
		if( typeof(aPasteboard.isKindOfClass) != "function" ){ return; }
		if( !aPasteboard.isKindOfClass(MokaPastboard) ){ return; }
		
		_draggingPasteboard = aPasteboard;
	}
	/*int*/ this.draggingSequenceNumber = function(){
		return _draggingSequenceNumber;
	}
	/*void*/ this._setDraggingSequenceNumber = function(anInt){
		if( anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		_draggingSequenceNumber = anInt;
	}
	/*MokaPoint*/ this.draggingLocation = function(){
		return _draggingLocation;
	}
	/*void*/ this._setDraggingLocation = function(aPoint){
		if( aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		_draggingLocation = aPoint;
	}
	
	//Image information
	/*MokaImage*/ this.draggedImage = function(){
		return _draggedImage;
	}
	/*void*/ this._setDraggedImage = function(anImage){
		if( anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_draggedImage = anImage;
	}
	/*element*/ this.draggedElement = function(){
		return _draggedElement;
	}
	/*void*/ this._setDraggedElement = function(anElement){
		_draggedElement = anElement;
	}
	/*MokaPoint*/ this.draggedImageLocation = function(){
		return _draggedImageLocation;
	}
	/*void*/ this._setDraggedImageLocation = function(aPoint){
		if( aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		_draggedImageLocation = aPoint;
	}
	
	
	
}

//Dragging operations
MokaDragOperationNone		= 0;
MokaDragOperationCopy		= 1 << 0;
MokaDragOperationLink		= 1 << 1;
MokaDragOperationGeneric	= 1 << 2;
MokaDragOperationPrivate	= 1 << 3;
MokaDragOperationMove		= 1 << 4;
MokaDragOperationDelete		= 1 << 5;
MokaDragOperationEvery		= (1 << 6) - 1;