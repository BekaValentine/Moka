function MokaAnimationCurve(){
	this.extend(MokaObject);
	
	var _type = MokaAnimationFlat;
	var _keys = MokaDictionary.make().init();
	_keys.setObjectForKey( MokaAnimationKey.keyWithValueControlInControlOut( 0, new MokaPoint(0,0), new MokaPoint(0,0) ), 0 );
	_keys.setObjectForKey( MokaAnimationKey.keyWithValueControlInControlOut( 0, new MokaPoint(0,0), new MokaPoint(0,0) ), 1 );
	
	
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.initWithType = function(aType){
		this.supers().init();
		
		if( aType != undefined && MokaNumberIsInt(aType) && aType >= MokaAnimationLinear && aType <= MokaAnimationJumpInOut ){
			_type = aType;
		}		
		
		return this;
	}
	/*MokaAnimationType*/ this.type = function(){
		return _type;
	}
	
	//Adding and Removing keys
	/*void*/ this.addKeyForProgress = function( aKey, progress ){
		if( typeof(aKey.isKindOfClass) != "function" ){ return; }
		if( !aKey.isKindOfClass(MokaAnimationKey) ){ return; }
		if( !MokaNumberIsFloat(progress) ){ return; }
		
		_type = MokaAnimationCustom;
		
		//check to see if the key's in and out controls have x values larger than the next or previous progress
		// and if so scale to that progress
		var newKey = aKey.copy();
		
		var highestBefore = 0;
		var lowestAfter = 1;
		
		_keys.allKeys().each( function(key){
			if( key > highestBefore && key < progress ){ highestBefore = key; }
			else if( key < lowestAfter && key > progress ){ lowestAfter = key; }
		});
		
		if( newKey.controlIn().x() < (highestBefore - progress) ){ newKey.controlIn().setX( highestBefore - progress ); }
		if( newKey.controlIn().x() > (lowestAfter - progress) ){ newKey.controlIn().setX( lowestAfter - progress ); }
		if( newKey.controlOut().x() < (highestBefore - progress) ){ newKey.controlOut().setX( highestBefore - progress ); }
		if( newKey.controlOut().x() > (lowestAfter - progress) ){ newKey.controlOut().setX( lowestAfter - progress ); }
		
		_keys.setObjectForKey( newKey, progress );
	}
	/*void*/ this.addKeyWithValueControlInControlOutForProgress = function( aValue, controlIn, controlOut, progress ){
		if( !MokaNumberIsFloat(aValue) ){ return; }
		if( typeof(controlIn.isKindOfClass) != "function" ){ return; }
		if( !controlIn.isKindOfClass(MokaPoint) ){ return; }
		if( typeof(controlOut.isKindOfClass) != "function" ){ return; }
		if( !controlOut.isKindOfClass(MokaPoint) ){ return; }
		if( !MokaNumberIsFloat(progress) ){ return; }
		
		_type = MokaAnimationCustom;
		
		var newControlIn = controlIn.copy();
		var newControlOut = controlOut.copy();
		
		var highestBefore = 0;
		var lowestAfter = 1;
		
		_keys.allKeys().each( function(key){
			if( key == progress ){ highestBefore = lowestAfter = key; }
			else if( highestBefore == key ){ highestBefore = key; }
			else if( lowestAfter  == key ){ lowestAfter = key; }
			else if( key > highestBefore && key < progress ){ highestBefore = key; }
			else if( key < lowestAfter && key > progress ){ lowestAfter = key; }
		});
		
		/*if( highestBefore != progress ){
			if( newControlIn.x() < (_keys.objectForKey(highestBefore).value() - progress) ){ newControlIn.setX( _keys.objectForKey(highestBefore).value() - progress ); }
			if( newControlOut.x() > (_keys.objectForKey(lowestAfter).value() - progress) ){ newControlOut.setX( _keys.objectForKey(lowestAfter).value() - progress ); }
		}*/
		
		_keys.setObjectForKey(	MokaAnimationKey.keyWithValueControlInControlOut( aValue, newControlIn, newControlOut ),
								progress );
		
	}
		
	//Getting key values
	/*MokaArray*/ this.allKeyProgresses = function(){
		return _keys.allKeys().copy();
	}
	/*MokaAnimationKey*/ this.keyNearestProgress = function(aProgress){
		if( !MokaNumberIsFloat(aProgress) ){ return; }
		if( aProgress < 0 ){ aProgress = 0; }
		if( aProgress > 1 ){ aProgress = 1; }
		
		var allProgresses = this.allKeyProgresses();
		var highestBelow = 0;
		var lowestAbove = 1;
		allProgresses.each( function(p){
			if( p == aProgress ){ highestBelow = lowestAbove = p; }
			if( highestBelow == p ){ highestBelow = p; }
			if( lowestAbove == p ){ lowestAbove = p; }
			if( p > highestBelow && aProgress > p ){ highestBelow = p; }
			if( p < lowestAbove && aProgress < p ){ lowestAbove = p; }
		});
		
		if( aProgress - highestBelow < lowestAbove - aProgress ){
			return _keys.objectForKey(lowestAbove);
		} else{
			return _keys.objectForKey(highestBelow);
		}
	}

	//Getting curve values	
	/*float*/ this.valueForProgress = function(progress){
		if( !MokaNumberIsFloat(progress) ){ return; }
		if( progress < 0 ){ progress = 0; }
		if( progress > 1 ){ progress = 1; }
		
		if( this.type() == MokaAnimationLinear ){ return progress; }
		else if( this.type() == MokaAnimationFlat ){ return 0; }
		
		var highestBefore = 0;
		var lowestAfter = 1;
		
		_keys.allKeys().each( function(key){
			if( key == progress ){ highestBefore = lowestAfter = key; }
			else if( highestBefore == key ){ highestBefore = key; }
			else if( lowestAfter  == key ){ lowestAfter = key; }
			else if( key > highestBefore && key < progress ){ highestBefore = key; }
			else if( key < lowestAfter && key > progress ){ lowestAfter = key; }
		});
		
		//alert( progress +":  "+ highestBefore +" , "+ lowestAfter );
		
		if( highestBefore == lowestAfter ){
			return _keys.objectForKey( highestBefore ).value();
		} else {

			var p0 = {};
			p0.setX( highestBefore );
			p0.setY( _keys.objectForKey(highestBefore).value() );
			var p1 = {};
			p1.setX( _keys.objectForKey(highestBefore).controlOut().x() + p0.x() );
			p1.setY( _keys.objectForKey(highestBefore).controlOut().y() + p0.y() );
			var p3 = {};
			p3.setX( lowestAfter );
			p3.setY( _keys.objectForKey(lowestAfter).value() );
			var p2 = {};
			p2.setX( _keys.objectForKey(lowestAfter).controlIn().x() + p3.x() );
			p2.setY( _keys.objectForKey(lowestAfter).controlIn().y() + p3.y() );
			
			//myDiv.innerHTML = ( p0.x()+","+p0.y()+"; "+p1.x()+","+p1.y()+"; "+p2.x()+","+p2.y()+"; "+p3.x()+","+p3.y() );
			
			function b(t){
				var tsquared = t*t;
				var tcubed = t*tsquared;
				omtsquared = (1-t)*(1-t);
				omtcubed = (1-t)*omtsquared
				var bt = {	"x": p0.x()*omtcubed + 3*p1.x()*t*omtsquared + 3*p2.x()*tsquared*(1-t) + p3.x()*tcubed,
							"y": p0.y()*omtcubed + 3*p1.y()*t*omtsquared + 3*p2.y()*tsquared*(1-t) + p3.y()*tcubed };
				
				return bt;
			}
			
			var testTime = 0;
			var iteration = 0;
			while( Math.abs((b(testTime).x() - progress)/progress) > 0.00001 ){
				iteration++;
				if( progress > b(testTime).x() ){
					testTime += Math.pow(0.5,iteration);
				} else if( progress < b(testTime).x()){
					testTime -= Math.pow(0.5,iteration);
				}

			}
		
			//myDiv.innerHTML += "; " + iteration;
			return b(testTime).y();
			
		}
	}
	
}
/*MokaAnimationCurve*/ MokaAnimationCurve.flat = function(){
	return this.make().init()
}
/*MokaAnimationCurve*/ MokaAnimationCurve.linear = function(){
	var curve = this.makeAndInit();
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(0,0), MokaPoint.pointWithCoordinates(0,0), 1 );
	return curve;
}
/*MokaAnimationCurve*/ MokaAnimationCurve.easeIn = function(){
	var curve = this.linear();
	curve.addKeyWithValueControlInControlOutForProgress( 0.5, MokaPoint.pointWithCoordinates(-1/3,-1/2), MokaPoint.pointWithCoordinates(1/3,1/2), 0.5 );
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(-1/6,0), MokaPoint.pointWithCoordinates(0,0), 1 );
	return curve;
}
/*MokaAnimationCurve*/ MokaAnimationCurve.easeOut = function(){
	var curve = this.linear();
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,0), MokaPoint.pointWithCoordinates(1/6,0), 0 );
	curve.addKeyWithValueControlInControlOutForProgress( 0.5, MokaPoint.pointWithCoordinates(-1/3,-1/2), MokaPoint.pointWithCoordinates(1/3,1/2), 0.5 );

	return curve;
}
/*MokaAnimationCurve*/ MokaAnimationCurve.easeInOut = function(){
	var curve = this.linear();
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,0), MokaPoint.pointWithCoordinates(1/6,0), 0 );
	curve.addKeyWithValueControlInControlOutForProgress( 0.5, MokaPoint.pointWithCoordinates(-1/3,-1/2), MokaPoint.pointWithCoordinates(1/3,1/2), 0.5 );
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(-1/6,0), MokaPoint.pointWithCoordinates(0,0), 1 );
	return curve;
}
/*MokaAnimationCurve*/ MokaAnimationCurve.jumpIn = function(){
	var curve = this.makeAndInit();
	curve.addKeyWithValueControlInControlOutForProgress( 0.5, MokaPoint.pointWithCoordinates(-1/3,-1/2), MokaPoint.pointWithCoordinates(1/3,1/2), 0.5 );
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(-1/16,1/8), MokaPoint.pointWithCoordinates(0,0), 1 );	return curve;
}
/*MokaAnimationCurve*/ MokaAnimationCurve.jumpOut = function(){
	var curve = this.linear();
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,0), MokaPoint.pointWithCoordinates(1/16,-1/8), 0 );
	curve.addKeyWithValueControlInControlOutForProgress( 0.5, MokaPoint.pointWithCoordinates(-1/3,-1/2), MokaPoint.pointWithCoordinates(1/3,1/2), 0.5 );
	return curve;
}
/*MokaAnimationCurve*/ MokaAnimationCurve.jumpInOut = function(){
	var curve = this.linear();
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,0), MokaPoint.pointWithCoordinates(1/16,-1/8), 0 );
	curve.addKeyWithValueControlInControlOutForProgress( 0.5, MokaPoint.pointWithCoordinates(-1/3,-1/2), MokaPoint.pointWithCoordinates(1/3,1/2), 0.5 );
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(-1/16,1/8), MokaPoint.pointWithCoordinates(0,0), 1 );
	return curve;
}
/*MokaAnimationCurve*/ MokaAnimationCurve.bounceIn = function(){
	var curve = this.linear();
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,0), MokaPoint.pointWithCoordinates(1/2,1/2), 0 );
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(0,-1/4), MokaPoint.pointWithCoordinates(0,-1/8), 0.8);
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(0,-1/16), MokaPoint.pointWithCoordinates(0,-1/32), 0.95);
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(0,-1/64), MokaPoint.pointWithCoordinates(0,0), 1 );
	return curve;
}
/*MokaAnimationCurve*/ MokaAnimationCurve.bounceOut = function(){
	var curve = this.linear();
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,0), MokaPoint.pointWithCoordinates(0,1/64), 0 );
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,1/32), MokaPoint.pointWithCoordinates(0,1/16), 0.05);
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,1/8), MokaPoint.pointWithCoordinates(0,1/4), 0.2);
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(-1/2,-1/2), MokaPoint.pointWithCoordinates(0,0), 1 );
	return curve;
}
/*MokaAnimationCurve*/ MokaAnimationCurve.bounceInOut = function(){
	var curve = this.linear();
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,0), MokaPoint.pointWithCoordinates(0,1/64), 0 );
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,1/32), MokaPoint.pointWithCoordinates(0,1/16), 0.05);
	curve.addKeyWithValueControlInControlOutForProgress( 0, MokaPoint.pointWithCoordinates(0,1/8), MokaPoint.pointWithCoordinates(0,5/16), 0.2);
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(0,-5/16), MokaPoint.pointWithCoordinates(0,-1/8), 0.8);
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(0,-1/16), MokaPoint.pointWithCoordinates(0,-1/32), 0.95);
	curve.addKeyWithValueControlInControlOutForProgress( 1, MokaPoint.pointWithCoordinates(0,-1/64), MokaPoint.pointWithCoordinates(0,0), 1 );
	return curve;
}

//Animation curves types
MokaAnimationLinear			= 0;
MokaAnimationFlat			= 1;
MokaAnimationEaseIn			= 2;
MokaAnimationEaseOut		= 3;
MokaAnimationEaseInOut		= 4;
MokaAnimationBounceIn		= 5;
MokaAnimationBounceOut		= 6;
MokaAnimationBounceInOut	= 7;
MokaAnimationCustom			= 8;
MokaAnimationJumpIn			= 9;
MokaAnimationJumpOut		= 10;
MokaAnimationJumpInOut		= 11;