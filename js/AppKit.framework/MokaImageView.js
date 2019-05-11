function MokaImageView(){
	this.extend( MokaView );

	/*	Image	*/
	var _image = new MokaImage;
	
	/*	Image Frame Style	*/
	var _imageFrameStyle = MokaImageFrameNone;
	
	/*	Image Alignment	*/
	var _imageAlignment = MokaImageAlignCenter;
	
	/*	Image Scaling	*/
	var _imageScaling = MokaScaleProportionally
	
	/*	Editability	*/
	var _isEditable = YES;
	
	/*	Dragging	*/
	var _needsToBeginDragging = NO;
	var _isDragging = NO;
	var _draggingInsideFrame = NO;
	
	/*	Skin	*/
	var _topLeft = document.createElement('div');
	_topLeft.setAttribute("id","topleft");
	this.skin().appendChild(_topLeft);
	
	var _top = document.createElement('div');
	_top.setAttribute("id","top");
	this.skin().appendChild(_top);
	
	var _topRight = document.createElement('div');
	_topRight.setAttribute("id","topright");
	this.skin().appendChild(_topRight);
	
	var _left = document.createElement('div');
	_left.setAttribute("id","left");
	this.skin().appendChild(_left);
	
	var _center = document.createElement('div');
	_center.setAttribute("id","center");
	this.skin().appendChild(_center);
	
	var _right = document.createElement('div');
	_right.setAttribute("id","right");
	this.skin().appendChild(_right);
	
	var _bottomLeft = document.createElement('div');
	_bottomLeft.setAttribute("id","bottomleft");
	this.skin().appendChild(_bottomLeft);
	
	var _bottom = document.createElement('div');
	_bottom.setAttribute("id","bottom");
	this.skin().appendChild(_bottom);
	
	var _bottomRight = document.createElement('div');
	_bottomRight.setAttribute("id","bottomRight");
	this.skin().appendChild(_bottomRight);
	
	
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_image.init();
		
		return this;
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		_top.style.width = (this.frame().size().width() - parseInt(_topLeft.style.width) - parseInt(_topRight.style.width)) + MokaPageSizeUnits;
		_left.style.height = (this.frame().size().height() - parseInt(_topLeft.style.height) - parseInt(_bottomLeft.style.width)) + MokaPageSizeUnits;
		_center.style.width = (this.frame().size().width() - parseInt(_left.style.width) - parseInt(_right.style.width)) + MokaPageSizeUnits;
		_center.style.height = (this.frame().size().height() - parseInt(_top.style.height) - parseInt(_bottom.style.width)) + MokaPageSizeUnits;
		_right.style.height = (this.frame().size().height() - parseInt(_topRight.style.height) - parseInt(_bottomRight.style.width)) + MokaPageSizeUnits;
		_bottom.style.width = (this.frame().size().width() - parseInt(_bottomLeft.style.width) - parseInt(_bottomRight.style.width)) + MokaPageSizeUnits;
		
		if( this.imageFrameStyle() == MokaImageFrameGroove || this.imageFrameStyle() == MokaImageFrameButton ){
			this.pageDisplay().style.width = (this.frame().size().width() - 4 )+MokaPageSizeUnits;
			this.pageDisplay().style.height = (this.frame().size().height() - 4)+MokaPageSizeUnits;
			if( this.imageFrameStyle() == MokaImageFrameGroove ){
				this.pageDisplay().style.border = "2" + MokaPageSizeUnits + " groove grey";
			} else if( this.imageFrameStyle() == MokaImageFrameButton ){
				this.pageDisplay().style.border = "2" + MokaPageSizeUnits + " outset grey";
			}
		} else {
			this.pageDisplay().style.border = "0";
		}
		
		var imageCell = new MokaCell;
		imageCell.initImageCell(this.image());
		
		var imagePosition = MokaPoint.origin();
		
		if( this.imageFrameStyle() != MokaImageFrameNone ){
			//draw the frame style
			//resize the image cell size for the specific frame style
		}
		this.drawCellInRect(	imageCell,
								MokaRect.rectWithOriginAndSize(imagePosition,this.image().size()) );
	}
		
	//Accessing and setting the image
	/*MokaImage*/ this.image = function(){
		return _image;
	}
	/*void*/ this.setImage = function(anImage){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_image = anImage;
		this.display();
	}
	
	//Accessing and setting the image frame style
	/*MokaImageFrameStyle*/ this.imageFrameStyle = function(){
		return _imageFrameStyle;
	}
	/*void*/ this.setImageFrameStyle = function(anImageFrameStyle){
		if( typeof anImageFrameStyle == undefined ){ return; }
		if( !MokaNumberIsInt(anImageFrameStyle) ){ return; }
		if( anImageFrameStyle < MokaImageFrameNone || anImageFrameStyle > MokaImageFrameButton ){ return; }
		
		_imageFrameStyle = anImageFrameStyle;
		this.display();
	}
	
	//Accessing and setting the image alignment
	/*MokaImageAlign*/ this.imageAlignment = function(){
		return _imageAlignment;
	}
	/*void*/ this.setImageAlignment = function(anImageAlign){
		if( typeof anImageAlign == undefined ){ return; }
		if( !MokaNumberIsInt(anImageAlign) ){ return; }
		if( anImageAlign < MokaImageAlignCenter || anImageAlign > MokaImageAlignBottomRight ){ return; }
		
		_imageAlignment = anImageAlign;
		this.display();
	}
	
	//Accessing and setting the image scaling
	/*MokaScaling*/ this.imageScaling = function(){
		return _imageScaling;
	}
	/*void*/ this.setImageScaling = function(aScaling){
		if( aScaling != MokaScaleProportionally && aScaling != MokaScaleToFit && aScaling != MokaScaleNone ){ return; }
		
		_imageScaling = aScaling;
		this.display();
	}
	
	//Accessing and setting editability
	/*bool*/ this.isEditable = function(){
		return _isEditable;
	}
	/*void*/ this.setIsEditable = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isEditable = yn;
	}
	
	//Event handling
	/*void*/ this.mouseDown = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		_needsToBeginDragging = YES;
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		_isDragging = NO;
		_needsToBeginDragging = NO;
	}
	/*void*/ this.mouseDragged = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( _needsToBeginDragging ){
			_isDragging = YES;
			
			var imageToDrag = this.image().copy();
			
			this.dragImageAtPointWithOffsetEventPasteboardSourceAndSlideBack(	imageToDrag,
																				this.convertPointFromPage(theEvent.mouseLocation()),
																				new MokaPoint(-imageToDrag.size().width()/2,-imageToDrag.size().height()/2),
																				theEvent,
																				MokaPasteboard.generalPasteboard(),
																				this,
																				NO);
		}
		_needsToBeginDragging = NO;
	}
	
	//Dragging source operations
	/*int*/ this.draggingSourceOperationMaskForLocal = function(isLocal){
		return ( isLocal ? MokaDragOperationNone : MokaDragOperationGeneric );
	}	
	
	//Dragging destination operations
	//methods need to respond to the dragging info's data type for the dragged item
	//to accept only images
	//and to respond to the editability of the receiver
	/*MokaDragOperation*/ this.draggingEntered = function(sender){
		if( sender == undefined ){ return MokaDragOperationNone; }
		if( typeof(sender.isKindOfClass) != "function" ){ return MokaDragOperationNone; }
		
		_draggingInsideFrame = YES;
		
		return MokaDragOperationCopy;
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
		
		return YES;
	}
	/*bool*/ this.performDragOperation = function(sender){
		if( sender == undefined ){ return NO; }
		if( typeof(sender.isKindOfClass) != "function" ){ return NO; }
		
		if( !sender.respondsToSelector($sel("draggingPasteboard")) ){ return NO; }
		if( !sender.respondsToSelector($sel("draggingSequenceNumber")) ){ return NO; }
		
		var image = sender.draggingPasteboard().objectForType(MokaImagePboardType);
		if( !image ){ return NO; }
		
		this.setImage(image);
		
		return YES;
	}
	/*bool*/ this.concludeDragOperation = function(sender){
		if( sender == undefined ){ return NO; }
		if( typeof(sender.isKindOfClass) != "function" ){ return NO; }
		
		return YES;
	}
	
}

//Image Frame Styles
MokaImageFrameNone		= 0;
MokaImageFramePhoto		= 1;
MokaImageFrameBezel		= 2;
MokaImageFrameGroove	= 3;
MokaImageFrameButton	= 4;

//Image alignment
MokaImageAlignCenter		= 0;
MokaImageAlignTop			= 1;
MokaImageAlignTopLeft		= 2;
MokaImageAlignTopRight		= 3;
MokaImageAlignLeft			= 4;
MokaImageAlignRight			= 5;
MokaImageAlignBottom		= 6;
MokaImageAlignBottomLeft	= 7;
MokaImagealignBottomRight	= 8;

//Image scaling
MokaScaleProportionally	= 0;
MokaScaleToFit			= 1;
MokaScaleNone			= 2;