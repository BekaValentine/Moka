function MokaRect(x,y,w,h){
	this.extend( MokaObject );
	
	var _origin = new MokaPoint;
	var _size = new MokaSize;
	
	if( typeof(x) == "number" && typeof(y) == "number" && typeof(w) == "number" && typeof(h) == "number" ){
		_origin.setX( x );
		_origin.setY( y );
		_size.setWidth( w );
		_size.setHeight( h );
	}
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.setOrigin(this.origin().copy());
		copy.setSize(this.size().copy());
		
		return copy;
	}
	
	//initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_origin.init();
		_size.init();
		
		return this;
	}
	
	//Accessing origin and size
	/*MokaPoint*/ this.origin = function(){
		return _origin;
	}
	/*void*/ this.setOrigin = function(aPoint){
		if( aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		
		_origin = aPoint;
	}
	/*MokaSize*/ this.size = function(){
		return _size;
	}
	/*void*/ this.setSize = function(aSize){
		if( aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_size = aSize;
	}
		
	//Info about the rect
	/*bool*/ this.containsPoint = function( aPoint ){
		if( !aPoint ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }

		if( aPoint.x() < this.origin().x() ){ return false; }
		if( aPoint.x() >= this.origin().x()+this.size().width() ){ return false; }
		if( aPoint.y() < this.origin().y() ){ return false; }
		if( aPoint.y() >= this.origin().y()+this.size().height() ){ return false; }

		return true;

	}
	/*bool*/ this.isEqualTo = function(aRect){
		if( typeof(aRect.isKindOfClass) != "function" ){
			return;
		}

		if( !aRect.isKindOfClass(MokaRect) ){
			return;
		}

		return ( this.size().isEqualTo(aRect.size()) && this.origin().isEqualTo(aRect.origin()) );
		
	}
	/*bool*/ this.containsRect = function(aRect){
		if( typeof(aRect.isKindOfClass) != "function" ){
			return;
		}

		if( !aRect.isKindOfClass(MokaRect) ){
			return;
		}

		return (	(this.origin().x() <= aRect.origin().x())
				&&	(this.origin().x() + this.size().width() > aRect.origin().x())
				&&	(this.origin().y() <= aRect.origin().y())
				&&	(this.origin().y() + this.size().height() > aRect.origin().y())
				&&	(this.size().width() >= aRect.size().width())
				&&	(this.size().height() >= aRect.size().height())	);
		
	}
	/*MokaRect*/ this.insetBy = function(aNumber){
		if( !MokaNumberIsFloat(aNumber) ){
			return;
		}
		
		return MokaRect.rectWithOriginAndSize(	MokaPoint.pointWithCoordinates( this.origin().x()+aNumber, this.origin().y()+aNumber ),
												MokaSize.sizeWithDimensions( this.size().width()-(2*aNumber), this.size().height()-(2*aNumber) ));
		
	}
	/*MokaRect*/ this.intersectWith = function(aRect){
		if( typeof(aRect.isKindOfClass) != "function" ){
			return;
		}

		if( !aRect.isKindOfClass(MokaRect) ){
			return;
		}
		
		if( !this.containsPoint(aRect.origin()) && !aRect.containsPoint(this.origin()) ){
			return;
		}

		var leftEdge = (this.origin().x() >= aRect.origin().x() ? this.origin().x() : aRect.origin().x() );
		var topEdge = (this.origin().y() >= aRect.origin().y() ? this.origin().y() : aRect.origin().y() );
		var rightEdge = (this.origin().x()+this.size().width() <= aRect.origin().x()+aRect.size().width() ?
							this.origin().x()+this.size().width() : aRect.origin().x()+aRect.size().width() );
		var bottomEdge = (this.origin().y()+this.size().height() <= aRect.origin().y()+aRect.size().height() ?
							this.origin().y()+this.size().height() : aRect.origin().y()+aRect.size().height() );
							
							
							
		return MokaRect.rectWithOriginAndSize(	MokaPoint.pointWithCoordinates(leftEdge,topEdge),
												MokaSize.sizeWithDimensions(rightEdge-leftEdge,bottomEdge-topEdge) );
		
	}
	/*MokaRect*/ this.unionWith = function(aRect){
		if( typeof(aRect.isKindOfClass) != "function" ){
			return;
		}

		if( !aRect.isKindOfClass(MokaRect) ){
			return;
		}
		
		var leftEdge = (this.origin().x() <= aRect.origin().x() ? this.origin().x() : aRect.origin().x() );
		var topEdge = (this.origin().y() <= aRect.origin().y() ? this.origin().y() : aRect.origin().y() );
		var rightEdge = (this.origin().x()+this.size().width() >= aRect.origin().x()+aRect.size().width() ?
							this.origin().x()+this.size().width() : aRect.origin().x()+aRect.size().width() );
		var bottomEdge = (this.origin().y()+this.size().height() >= aRect.origin().y()+aRect.size().height() ?
							this.origin().y()+this.size().height() : aRect.origin().y()+aRect.size().height() );
							
							
							
		return MokaRect.rectWithOriginAndSize(	MokaPoint.pointWithCoordinates(leftEdge,topEdge),
												MokaSize.sizeWithDimensions(rightEdge-leftEdge,bottomEdge-topEdge) );
	}
	
	/*string*/ this.toString = function(){
		return this.origin() + " " + this.size();
	}
	
}
/*MokaRect*/ MokaRect.rectWithOriginAndSize = function(aPoint,aSize){
	if( typeof(aPoint.isKindOfClass) != "function" ){
		return;
	}

	if( !aPoint.isKindOfClass(MokaPoint) ){
		return;
	}

	if( typeof(aSize.isKindOfClass) != "function" ){
		return;
	}

	if( !aSize.isKindOfClass(MokaSize) ){
		return;
	}

	var newRect = this.makeAndInit();
	newRect.setOrigin(aPoint);
	newRect.setSize(aSize);
	return newRect;
}
/*MokaRect*/ MokaRect.rectWithCoordinatesAndDimensions = function(x,y,w,h){
	return MokaRect.rectWithOriginAndSize( MokaPoint.pointWithCoordinates(x,y), MokaSize.sizeWithDimensions(w,h) );
}

//Rect edges
MokaRectTop		= 0;
MokaRectBottom	= 1;
MokaRectLeft	= 2;
MokaRectRight	= 3;