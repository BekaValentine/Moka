function MokaRulerMarker(){
	this.extend(MokaObject);
	
	/*	Ruler	*/
	var _ruler = null;
	
	/* Image	*/
	var _image = new MokaImage;
	var _imageOrigin = new MokaPoint;
	
	/*	Movability	*/
	var _isMovable = YES;
	var _isRemovable = YES;
	
	/*	Location	*/
	var _markerLocation = 0;
	
	/*	Represented Object	*/
	var _representedObject = null;
	
	/*	Dragging?	*/
	var _isDragging = NO;
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_image.init();
		
		return this;
	}
	
	//Setting the ruler
	/*MokaRuler*/ this.ruler = function(){
		return _ruler;
	}	
	/*void*/ this.setRuler = function(aRuler){
		if( typeof aRuler == undefined ){ return; }
		if( typeof(aRuler.isKindOfClass) != "function" ){ return; }
		if( !aRuler.isKindOfClass(MokaRuler) ){ return; }
		
		_ruler = aRuler;
	}
	
	//Setting the image
	/*MokaImage*/ this.image = function(){
		return _image;
	}	
	/*void*/ this.setImage = function(anImage){
		if( typeof anImage == undefined ){ return; }
		if( typeof(anImage.isKindOfClass) != "function" ){ return; }
		if( !anImage.isKindOfClass(MokaImage) ){ return; }
		
		_image = anImage;
	}
	/*MokaPoint*/ this.imageOrigin = function(){
		return _imageOrigin;
	}	
	/*void*/ this.setImageOrigin = function(aPoint){
		if( typeof aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		_imageOrigin = aPoint;
	}
	/*float*/ this.thicknessRequiredInRuler = function(){
		if( !this.ruler() ){ return 0; }
		
		return ( this.ruler().orientation() == MokaHorizontalRuler ? this.image().size().height() : this.image().size().width() )
	}	
	/*MokaRect*/ this.imageRectInRuler = function(){
		if( !this.ruler() ){ return new MokaRect; }
		
		if( this.ruler().orientation() == MokaVerticalRuler ){
			return new MokaRect(	this.ruler().frame().size().width() - this.image().size().width(),
									this.markerLocation() - this.image().size().height()/2,
									this.image().size().width(),
									this.image().size().height());
		}
		
		return new MokaRect(	this.markerLocation() - this.image().size().width()/2,
								this.ruler().frame().size().height() - this.image().size().height(),
								this.image().size().width(),
								this.image().size().height());
	}
	
	//Set movability
	/*bool*/ this.isMovable = function(){
		return _isMovable;
	}
	
	/*void*/ this.setIsMovable = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isMovable = yn;
	}
	/*bool*/ this.isRemovable = function(){
		return _isRemovable;
	}	
	/*void*/ this.setIsRemovable = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isRemovable = yn;
	}
	
	//Set the marker location
	/*float*/ this.markerLocation = function(){
		return _markerLocation;
	}
	/*void*/ this.setMarkerLocation = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_markerLocation = aFloat;
	}
	/*id*/ this.representedObject = function(){
		return _representedObject;
	}	
	/*void*/ this.setRepresentedObject = function(anObject){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_representedObject = anObject;		
	}
	
}