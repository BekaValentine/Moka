function MokaPoint(x,y){
	this.extend( MokaObject );
	
	var _x = 0;
	var _y = 0;
	
	if( typeof(x) == "number" && typeof(y) == "number" ){
		_x = x;
		_y = y;
	}
	
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else { copy = this.constructor.makeAndInit(); }
		
		copy.setX(this.x());
		copy.setY(this.y());
		
		return copy;
	}
	
	//Accessing the coordinates
	/*float*/ this.x = function(){
		return _x;
	}
	/*void*/ this.setX = function(anX){
		if( anX == undefined ){ return; }
		if( !MokaNumberIsFloat(anX) ){ return; }
		
		_x = anX;
	}
	/*float*/ this.y = function(){
		return _y;
	}
	/*void*/ this.setY = function(aY){
		if( aY == undefined ){ return; }
		if( !MokaNumberIsFloat(aY) ){ return; }
		
		_y = aY;
	}
	
	/*float*/ this.vectorMagnitude = function(){
		return Math.sqrt(this.x()*this.x() + this.y()*this.y());
	}
	/*float*/ this.vectorDirection = function(){
		if( this.x() == 0 && this.y() == 0 ){ return 0; }
		else {
			var angle = Math.atan(this.y()/this.x());
			if( this.x() < 0 ){
				if( this.y() >= 0 ){ angle = Math.PI - angle; }
				else { angle = Math.PI + angle; }
			} else if( this.y() < 0 ){
				angle = 2*Math.PI - angle;
			}
			return angle;
		}
	}
	
	//comparing and creating new points
	/*-1,0,1*/ this["<=>"] = function(o){
		if( is(o,MokaPoint) ){
			if( this.x() == o.x() && this.y() == o.y() ){ return 0; }
			var mag = (this.vectorMagnitude())["<=>"](o.vectorMagnitude());
			if( mag = 0 ){
				return (this.vectorDirection())["<=>"](o.vectorDirection());
			}
			return mag;
		}
		return (this.supers())["<=>"](o);
	}
	/*bool*/ this.isEqualTo = function(aPoint){
		if( !is(a,MokaPoint) ){ return NO; }
		return this["=="](aPoint);
	}
	/*MokaPoint*/ this.add = function(aPoint){
		if( aPoint == undefined ){ return; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		

		return new MokaPoint( this.x()+aPoint.x(), this.y()+aPoint.y() );
	}
	/*MokaPoint*/ this.subtract = function(aPoint){
		if( typeof(aPoint.isKindOfClass) != "function" ){
			return;
		}

		if( !aPoint.isKindOfClass(MokaPoint) ){
			return;
		}

		return MokaPoint.pointWithCoordinates( this.x()-aPoint.x(), this.y()-aPoint.y() );
	}
	
	/*string*/ this.toString = function(){
		return "(" + this.x() + "," + this.y() + ")"
	}
	
}
/*MokaPoint*/ MokaPoint.pointWithCoordinates = function(anX,aY){
	if( anX == undefined ){ return this.makeAndInit(); }
	if( !MokaNumberIsFloat(anX) ){ return this.makeAndInit(); }
	if( aY == undefined ){ return this.makeAndInit(); }
	if( !MokaNumberIsFloat(aY) ){ return this.makeAndInit(); }

	var newPoint = this.makeAndInit();
	newPoint.setX( anX );
	newPoint.setY( aY );
	return newPoint;
}
/*MokaPoint*/ MokaPoint.origin = function(){
	return MokaPoint.pointWithCoordinates(0,0);
}
/*MokaPoint*/ MokaPoint.vectorWithMagnitudeAndDirection = function(aMagnitude,aDirection){
	if( aMagnitude == undefined ){ return new MokaPoint; }
	if( !MokaNumberIsFloat(aMagnitude) ){ return new MokaPoint; }
	if( aDirection == undefined ){ return new MokaPoint; }
	if( !MokaNumberIsFloat(aDirection) ){ return new MokaPoint; }
	
	return new MokaPoint(aMagnitude*Math.cos(aDirection),aMagnitude*Math.sin(aDirection));
}
