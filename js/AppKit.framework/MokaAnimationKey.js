function MokaAnimationKey(){
	this.extend(MokaObject);
	
	/*	Control Points in and out, relative	*/
	var _controlIn = new MokaPoint;
	var _controlOut = new MokaPoint;
	
	/*	Key value	*/
	var _value = 0;
	
	
	
	
	//Setting and modifying the control points
	/*MokaPoint*/ this.controlIn = function(){
		return _controlIn;
	}	
	/*void*/ this.setControlIn = function(aPoint){
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		var newControlIn = aPoint.copy();
		if( newControlIn.x() > 0 ){ newControlIn.setX( 0 ); }
		_controlIn = newControlIn;
	}
	/*void*/ this.setNoControlIn = function(){
		this.setControlIn( MokaPoint.origin() );
	}
	/*MokaPoint*/ this.controlOut = function(){
		return _controlOut;
	}	
	/*void*/ this.setControlOut = function(aPoint){
		if( typeof(aPoint.isKindOfClass) != "function" ){ return; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return; }
		var newControlOut = aPoint.copy();
		if( newControlOut.x() < 0 ){ newControlOut.setX( 0 ); }
		_controlOut = newControlOut;
	}
	/*void*/ this.setNoControlOut = function(){
		this.setControlOut( MokaPoint.origin() );
	}
	/*void*/ this.makeControlsColinear = function(){
		var a = MokaPoint.vectorWithMagnitudeAndDirection(	1,
															this.controlIn().vectorDirection() );
			a = a.add(	MokaPoint.vectorWithMagnitudeAndDirection(	1,
																	this.controlOut().vectorDirection() ) );
		var averageAngle = a.vectorDirection();
		
		this.setControlIn(MokaPoint.vectorWithMagnitudeAndDirection(this.controlIn().vectorMagnitude(),averageAngle-Math.PI/2));
		this.setControlOut(MokaPoint.vectorWithMagnitudeAndDirection(this.controlOut().vectorMagnitude(),averageAngle+Math.PI/2));
	}
	/*void*/ this.makeControlsHorizontal = function(args){
		this.setControlIn( new MokaPoint( -Math.sqrt(this.controlIn().x()*this.controlIn().x() + this.controlIn().y()*this.controlIn().y()), 0 ) );
		this.setControlIn( new MokaPoint( Math.sqrt(this.controlOut().x()*this.controlOut().x() + this.controlOut().y()*this.controlOut().y()), 0 ) );
	}
	
	//Setting and value
	/*float*/ this.value = function(){
		return _value;
	}	
	/*void*/ this.setValue = function(aFloat){
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		_value = aFloat;
	}
		
}
/*MokaAnimationKey*/ MokaAnimationKey.keyWithValueControlInControlOut = function(value,controlIn,controlOut){
	if( !MokaNumberIsFloat(value) ){ return; }
	if( typeof(controlIn.isKindOfClass) != "function" ){ return; }
	if( !controlIn.isKindOfClass(MokaPoint) ){ return; }
	if( typeof(controlOut.isKindOfClass) != "function" ){ return; }
	if( !controlOut.isKindOfClass(MokaPoint) ){ return; }
	
	var newKey = this.makeAndInit();
	newKey.setValue(value);
	newKey.setControlIn(controlIn);
	newKey.setControlOut(controlOut);
	return newKey;
	
}
