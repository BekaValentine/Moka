function MokaAffineTransform(){
	this.extend(MokaObject);
	
	/*	The Transform Matrix	*/
	var _transformMatrix = {	"m11": 1, "m12": 0, "m13": 0,
								"m21": 0, "m22": 1, "m23": 0,
								"tx": 0, "ty": 0, "tz": 1 };
	
	
	
	
	
	//Copying
	/*MokaAffineTransform*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		var matrix = this.transformMatrix();
		copy.setTransformMatrix( matrix.m11, matrix.m12, matrix.m21, matrix.m22, matrix.tx, matrix.ty );
		
		return copy;
	}
	
	//Accumulating transforms
	/*void*/ this.rotateByDegrees = function(degs){
		if( !MokaNumberIsFloat(degs) ){ return; }
		
		this.rotateByRadians( degs*Math.PI/180 );
	}
	/*void*/ this.rotateByRadians = function(rads){
		if( !MokaNumberIsFloat(rads) ){ return; }
				
		_transformMatrix.m11 = _transformMatrix.m11*Math.cos(rads) + _transformMatrix.m21*Math.sin(rads);
		_transformMatrix.m12 = _transformMatrix.m12*Math.cos(rads) + _transformMatrix.m22*Math.sin(rads);
		_transformMatrix.m21 = -_transformMatrix.m11*Math.sin(rads) + _transformMatrix.m12*Math.cos(rads);
		_transformMatrix.m22 = -_transformMatrix.m21*Math.sin(rads) + _transformMatrix.m22*Math.cos(rads);
	}
	/*void*/ this.scaleBy = function(scalingFactor){
		if( !MokaNumberIsFloat(scalingFactor) ){ return; }
		
		this.scaleXByYBy(scalingFactor,scalingFactor);
	}
	/*void*/ this.scaleXByYBy = function(xScale,yScale){
		if( !MokaNumberIsFloat(xScale) ){ return; }
		if( !MokaNumberIsFloat(yScale) ){ return; }
		
		_transformMatrix.m11 *= xScale;
		_transformMatrix.m12 *= xScale;
		_transformMatrix.m21 *= yScale;
		_transformMatrix.m22 *= yScale;
	}
	/*void*/ this.translateXByYBy = function(xTranslate,yTranslate){
		if( !MokaNumberIsFloat(xTranslate) ){ return; }
		if( !MokaNumberIsFloat(yTranslate) ){ return; }
		
		_transformMatrix.tx += _transformMatrix.m11*xTranslate + _transformMatrix.m21*yTranslate;
		_transformMatrix.ty += _transformMatrix.m12*xTranslate + _transformMatrix.m22*yTranslate;
	}
	/*void*/ this.appendTransform = function(aTransform){
		_transformMatrix.m11 = aTransform.m11*_transformMatrix.m11 + aTransform.m12*_transformMatrix.m21;
		_transformMatrix.m12 = aTransform.m11*_transformMatrix.m12 + aTransform.m12*_transformMatrix.m22;
		_transformMatrix.m21 = aTransform.m21*_transformMatrix.m11 + aTransform.m22*_transformMatrix.m21;
		_transformMatrix.m22 = aTransform.m21*_transformMatrix.m12 + aTransform.m22*_transformMatrix.m22;
		_transformMatrix.tx = aTransform.tx*_transformMatrix.m11 + aTransform.ty*_transformMatrix.m21 + _transformMatrix.tx;
		_transformMatrix.ty = aTransform.tx*_transformMatrix.m12 + aTransform.ty*_transformMatrix.m22 + _transformMatrix.ty;
	}
	/*void*/ this.prependTransform = function(aTransform){
		_transformMatrix.m11 = _transformMatrix.m11*aTransform.m11 + _transformMatrix.m12*aTransform.m21;
		_transformMatrix.m12 = _transformMatrix.m11*aTransform.m12 + _transformMatrix.m12*aTransform.m22;
		_transformMatrix.m21 = _transformMatrix.m21*aTransform.m11 + _transformMatrix.m22*aTransform.m21;
		_transformMatrix.m22 = _transformMatrix.m21*aTransform.m12 + _transformMatrix.m22*aTransform.m22;
		_transformMatrix.tx = _transformMatrix.tx*aTransform.m11 + _transformMatrix.ty*aTransform.m21 + aTransform.tx;
		_transformMatrix.ty = _transformMatrix.tx*aTransform.m12 + _transformMatrix.ty*aTransform.m22 + aTransform.ty;
	}
	/*void*/ this.invert = function(){
		var a = _transformMatrix.m11;
		var b = _transformMatrix.m12;
		var c = _transformMatrix.m21;
		var d = _transformMatrix.m22;
		var e = _transformMatrix.tx;
		var f = _transformMatrix.ty;
		_transformMatrix.m11 = (a*d - 2*b*c)/(a*a*d - a*b*c);
		_transformMatrix.m12 = -b/(a*d - b*c);
		_transformMatrix.m21 = -c/(a*d - b*c);
		_transformMatrix.m22 = a/(a*d - b*c);
		_transformMatrix.tx = (-e*(a*d - b*c) + c*(a*e - b*f))/((a*e - b*f)(a*d - b*c));
		_transformMatrix.ty = -(a*f - b*e)/(a*d*e - b*c*f);
		_transformMatrix.tz = 1/e;
	}
	
	//Accessing the transform matrix
	/*array*/ this.transformMatrix = function(){
		return {	"m11": _transformMatrix.m11, "m12": _transformMatrix.m12, "m13": _transformMatrix.m13,
					"m21": _transformMatrix.m21, "m22": _transformMatrix.m22, "m23": _transformMatrix.m23,
					"tx": _transformMatrix.tx, "ty": _transformMatrix.ty, "tz": _transformMatrix.tz };
	}	
	/*void*/ this.setTransformMatrix = function( m11, m12, m21, m22, tx, ty ){
		_transformMatrix.m11 = m11;
		_transformMatrix.m12 = m12;
		_transformMatrix.m21 = m21;
		_transformMatrix.m22 = m22;
		_transformMatrix.tx = tx;
		_transformMatrix.ty = ty;
	}
	
	//Transforming data objects
	/*MokaPoint*/ this.transformPoint = function(aPoint){
		return new MokaPoint( aPoint.x()*_transformMatrix.m11 + aPoint.y()*_transformMatrix.m21 + _transformMatrix.tx,
			aPoint.x()*_transformMatrix.m12 + aPoint.y()*_transformMatrix.m22 + _transformMatrix.ty );
	}
	/*MokaSize*/ this.transformSize = function(aSize){
		return new MokaSize( aSize.width()*_transformMatrix.m11 + aSize.height()*_transformMatrix.m21 + _transformMatrix.tx,
			aSize.width()*_transformMatrix.m12 + aSize.height()*_transformMatrix.m22 + _transformMatrix.ty );
	}
	/*MokaBezierPath*/ this.transformBezierPath = function(aBezierPath){
		var newPath = aBezierPath.copy();
		newPath.transformUsingAffineTransform(this);
		return newPath;
	}
	
	
}