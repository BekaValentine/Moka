function MokaBezierPath(){
	this.extend(MokaObject);
	
	/*	Attributes	*/
	var _windingRule = MokaBezierPath.defaultWindingRule();
	var _lineCapStyle = MokaBezierPath.defaultLineCapStyle();
	var _lineJoinStyle = MokaBezierPath.defaultLineJoinStyle();
	var _lineWidth = MokaBezierPath.defaultLineWidthStyle();
	var _miterLimit = MokaBezierPath.defaultMiterLimit();
	var _flatness = MokaBezierPath.defaultFlatness();
	var _lineDash = [1];
	var _phase = 0;
	
	/*	Elements	*/
	var _elements = MokaArray.make().init()
	
	/*	Current Point	*/
	var _currentPoint = null;
	
	
	
	
	
	
	//Deriving new paths
	/*MokaBezierPath*/ this.bezierPathByReversingPath = function(){
		var newPath = MokaBezierPath.bezierPath();
		
		var newElements = _elements.copy();
		
		var lastOpen;
		for( var i = 0; i < newElements.count(); i++ ){
			var e = newElements.objectAtIndex(i);
			if( e.type == MokaMoveToBezierPathElement ){
				lastOpen = i;
			} else if( e.type == MokaClosePathBezierPathElement ){
				newElements.removeObjectAtIndex(i);
				newElements.insertObjectAtIndex(e,lastOpen);
			}
		}
		
		newElements = newElements.reverse()
		
		for( var i = newElements.count() - 1; i >= 0; i-- ){
			var e = newElements.objectAtIndex(i);
			
			if( e.type == MokaClosePathBezierPathElement ){	newPath.closePath(); }
			else if( e.type == MokaMoveToBezierPathElement ){ newPath.moveToPoint(e.points[0]); }
			else if( e.type == MokaLineToBezierPathElement ){ newPath.lineToPoint(e.points[0]); }
			else if( e.type == MokaCurveToBezierPathElement ){ newPath.curveToPointWithControlOutAndIn(e.points[0],e.points[1],e.points[2]); }
			
		}
		
		return newPath;
	}
	
	//Constructing paths
	/*void*/ this.moveToPoint = function(point){
		if( !is(point,MokaPoint) ){ return; }
		
		_elements.addObject({ type:MokaMoveToBezierPathElement, points:[point] });
		_currentPoint = point;
	}
	/*void*/ this.lineToPoint = function(point){
		if( !is(point,MokaPoint) ){ return; }
		if( _elements.count() == 0 || _elements.lastObject().type == MokaClosePathBezierPathElement ){ return; }
		
		_elements.addObject({ type:MokaLineToBezierPathElement, points:[point] });
		_currentPoint = point;
	}
	/*void*/ this.curveToPointWithControlOutAndIn = function(point,cout,cin){
		if( !is(point,MokaPoint) || !is(cin,MokaPoint) || !is(cout,MokaPoint) ){ return; }
		
		_elements.addObject({ type:MokaCurveToBezierPathElement, points:[point,cout,cin] });
		_currentPoint = point;
	}
	/*void*/ this.closePath = function(){
		_elements.addObject({ type:MokaClosePathBezierPathElement, points:[] });
		for( var i = _elements.count() - 1; i < 0; i-- ){
			var e = _elements.objectAtIndex(i);
			if( e.type == MokaMoveToBezierPathElement ){
				_currentPoint = e.points[0];
				break;
			}
		}
	}
	/*void*/ this.relativeMoveToPoint = function(point){
		if( !is(point,MokaPoint) ){ return; }
		
		this.moveToPoint(this.currentPoint().add(point));
	}
	/*void*/ this.relativeLineToPoint = function(point){
		if( !is(point,MokaPoint) ){ return; }
		
		this.lineToPoint(this.currentPoint().add(point));
	}
	/*void*/ this.relativeCurveToPointWithControlOutAndIn = function(point,cout,cin){
		if( !is(point,MokaPoint) || !is(cin,MokaPoint) || !is(cout,MokaPoint) ){ return; }
		
		this.curveToPointWithControlOutAndIn(this.currentPoint().add(point),this.currentPoint().add(cout),this.currentPoint().add(cin));
	}
	
	//Appending paths
	/*void*/ this.appendBezierPath = function(path){
		if( !is(path,MokaBezierPath) ){ return; }
		
		for( var i = 0; i < path.elementCount(); i++ ){
			var points = [];
			var type = path.elementAtIndexAndAssociatedPoints(i,[]);
			
			_elements.addObject({type: type, points: points});
		}
	}
	/*void*/ this.appendBezierPathWithPointsAndCount = function(points,count){
		if( !is(points,Array) || !is(count,"int") ){ return; }
		
		var moveToPoint = YES;
		if( !this.isEmpty() ){
			moveToPoint = NO;
			if( _elements.lastObject().type == MokaClosePathBezierPathElement ){
				_elements.removeLastObject();
			}
		}
		
		var onTheFirstPoint = YES;
		for( var i = 0; i < count; i++ ){
			if( i in points && is(points[i],MokaPoint) ){
				if( onTheFirstPoint && moveToPoint ){
					this.moveToPoint(points[i]);
					onTheFirstPoint = NO;
				} else {
					this.lineToPoint(points[i]);
				}
			}
		}
	}
	/*void*/ this.appendBezierPathWithOvalInRect = function(rect){
		if( !is(rect,MokaRect) ){ return; }
		this.appendBezierPath(MokaBezierPath.bezierPathWithOvalInRect(rect));
	}
	/*void*/ this.appendBezierPathWithArcFromPointToPointAndRadius = function(p1,p2,r){
		if( !is(p1,MokaPoint) || !is(p2,MokaPoint) || !is(r,"float") ){ return; }
		
		this.appendBezierPath(MokaBezierPath.bezierPathWithArcWithCenterRadiusStartAngleAndEndAngle(	this.currentPoint(),
																										r,
																										p1.subtract(this.currentPoint()).vectorDirection(),
																										p2.subtract(this.currentPoint()).vectorDirection() ));
	}
	/*void*/ this.appendBezierPathWithArcWithCenterRadiusStartAngleAndEndAngle = function(c,r,start,end){
		if( !is(c,MokaPoint) || !is(r,"float") || !is(start,"float") || !is(end,"float") || !is(cw,Boolean) ){ return; }
		this.appendBezierPath(MokaBezierPath.bezierPathWithArcWithCenterRadiusStartAngleEndAngleAndClockwise(c,r,start,end,YES));
	}
	/*void*/ this.appendBezierPathWithArcWithCenterRadiusStartAngleEndAngleAndClockwise = function(c,r,start,end,cw){
		if( !is(c,MokaPoint) || !is(r,"float") || !is(start,"float") || !is(end,"float") || !is(cw,Boolean) ){ return; }
		this.appendBezierPath(MokaBezierPath.bezierPathWithArcWithCenterRadiusStartAngleEndAngleAndClockwise(c,r,start,end,cw));
	}
	/*void*/ this.appendBezierPathWithRect = function(rect){
		if( !is(rect,MokaRect) ){ return; }
		this.appendBezierPath(MokaBezierPath.bezierPathWithRect(rect));
	}
	
	//Accessing attributes
	/*MokaWindingRule*/ this.windingRule = function(){
		return _windingRule;
	}
	/*void*/ this.setWindingRule = function(rule){
		if( rule != MokaNonZeroWindingRule && rule != MokaEvenOddWindingRule ){ return; }
		_windingRule = rule;
	}
	/*MokaLineCapStyle*/ this.lineCapStyle = function(){
		return _lineCapStyle;
	}
	/*void*/ this.setLineCapStyle = function(style){
		if( style != MokaNoLineCapStyle && style != MokaRoundLineCapStyle && style != MokaSquareLineCapStyle ){ return; }
		_lineCapStyle = style;
	}
	/*MokaLineJoinStyle*/ this.lineJoinStyle = function(){
		return _lineJoinStyle;
	}
	/*void*/ this.setLineJoinStyle = function(style){
		if( style != MokaMiterLineJoinStyle && style != MokaRoundLineJoinStyle && style != MokaBevelLineJoinStyle ){ return; }
		_lineJoinStyle = style;
	}
	/*float*/ this.lineWidth = function(){
		return _lineWidth;
	}
	/*void*/ this.setLineWidth = function(aFloat){
		if( !is(aFloat,"float") ){ return; }
		_lineWidth = aFloat;
	}
	/*float*/ this.miterLimit = function(){
		return _miterLimit;
	}
	/*void*/ this.setMiterLimit = function(aFloat){
		if( !is(aFloat,"float") ){ return; }
		_miterLimit = aFloat;
	}
	/*float*/ this.flatness = function(){
		return _flatness;
	}
	/*void*/ this.setFlatness = function(aFloat){
		if( !is(aFloat,"float") ){ return; }
		_flatness = aFloat;
	}
	/*void*/ this.getLineDashAndPhase = function(lineDash,phase){
		if( is(lineDash,Array) && lineDash.length == 0 ){
			lineDash.concat(_lineDash);
		}
		if( is(phase,Array) && phase.length == 0 ){
			phase[0] = _phase;
		}
	}
	/*void*/ this.setLineDashAndPhase = function(lineDash,phase){
		if( !is(lineDash,Array) || !is(phase,"int") || phase < 0 || phase >= lineDash.length ){ return; }
		_lineDash = lineDash;
		_phase = phase;
	}
	
	//Querying the path
	/*MokaRect*/ this.bounds = function(){
		var x = 0;
		var y = 0;
		var w = 0;
		var h = 0;
		for( var i = 0; i < _elements.count(); i++ ){
			var p = _elements.objectAtIndex();
			if( p.type != MokaClosePathBezierPathElement ){
				if( p.points[0].x() < x ){ x = p.points[0].x(); }
				if( p.points[0].x() > w ){ w = p.points[0].x(); }
				if( p.points[0].y() < y ){ y = p.points[0].y(); }
				if( p.points[0].y() > h ){ h = p.points[0].y(); }
			}
		}
		
		return new MokaRect(x,y,w,h);
	}
	/*MokaRect*/ this.controlPointBounds = function(){
		var x = 0;
		var y = 0;
		var w = 0;
		var h = 0;
		for( var i = 0; i < _elements.count(); i++ ){
			var p = _elements.objectAtIndex();
			if( p.type != MokaClosePathBezierPathElement ){
				if( p.points[0].x() < x ){ x = p.points[0].x(); }
				if( p.points[0].x() > w ){ w = p.points[0].x(); }
				if( p.points[0].y() < y ){ y = p.points[0].y(); }
				if( p.points[0].y() > h ){ h = p.points[0].y(); }
				
				if( p.type == MokaCurveToBezierPathElement ){
					if( p.points[1].x() < x ){ x = p.points[1].x(); }
					if( p.points[1].x() > w ){ w = p.points[1].x(); }
					if( p.points[1].y() < y ){ y = p.points[1].y(); }
					if( p.points[1].y() > h ){ h = p.points[1].y(); }
				
					if( p.points[2].x() < x ){ x = p.points[2].x(); }
					if( p.points[2].x() > w ){ w = p.points[2].x(); }
					if( p.points[2].y() < y ){ y = p.points[2].y(); }
					if( p.points[2].y() > h ){ h = p.points[2].y(); }
				}
			}
		}
		
		return new MokaRect(x,y,w,h);
	}
	/*MokaPoint*/ this.currentPoint = function(){
		return _currentPoint;
	}
	/*bool*/ this.isEmpty = function(){
		return this.elementCount() == 0;
	}
		
	//Applying transformations
	/*void*/ this.transformUsingAffineTransform = function(affine){
		if( !is(affine,MokaAffineTransform) ){ return; }
		
		for( var i = 0; i < _elements.count(); i++ ){
			var p = _elements.objectAtIndex();
			if( p.type != MokaClosePathBezierPathElement ){
				p.points[0] = affine.transformPoint(p.points[0])
				
				if( p.type == MokaCurveToBezierPathElement ){
					p.points[1] = affine.transformPoint(p.points[1])
					p.points[2] = affine.transformPoint(p.points[2])
				}
			}
		}
	}
	
	//Accessing elements
	/*int*/ this.elementCount = function(){
		return _elements.count();
	}
	/*MokaBezierPathElement*/ this.elementAtIndex = function(index){
		if( !is(index,"int") || index < 0 || index >= this.elementCount() ){ return; }
		return _elements.objectAtIndex(index).type;
	}
	/*MokaBezierPathElement*/ this.elementAtIndexAndAssociatedPoints = function(index,points){
		if( !is(index,"int") || index < 0 || index >= this.elementCount() ){ return; }
		
		var el = _elements.objectAtIndex(index);
		
		if( is(points,Array) && points.length == 0 ){
			points.concat(el.associatedPoints)
		}
		
		return el.type;
	}
	/*void*/ this.removeAllPoints = function(){
		_elements.removeAllObjects();
	}
	/*void*/ this.setAssociatedPointsAtIndex = function(points,index){
		if( !is(points,Array) || points.length < 1 || points.length > 3 ){ return; }
		if( !is(index,"int") || index < 0 || index >= this.elementCount() ){ return; }
		
		for( var i = 0; i < points.length; i++ ){
			if( i in points ){
				if( !is(points[i],MokaPoint) ){ return; }
			}
		}
		
		_elements.objectAtIndex(index).associatedPoints = points;
	}
	
}
/*MokaWindingRule*/ MokaBezierPath.defaultWindingRule = function(){
	if( MokaBezierPath._defaultWindingRule != MokaNonZeroWindingRule
	&&	MokaBezierPath._defaultWindingRule != MokaEvenOddWindingRule ){
		MokaBezierPath._defaultWindingRule = MokaNonZeroWindingRule;
	}
	return MokaBezierPath._defaultWindingRule;
}
/*void*/ MokaBezierPath.setDefaultWindingRule = function(rule){
	if( rule != MokaNonZeroWindingRule && rule != MokaEvenOddWindingRule ){ return; }
	MokaBezierPath._defaultWindingRule = rule;
}
/*MokaLineEndStyle*/ MokaBezierPath.defaultLineCapStyle = function(){
	if( MokaBezierPath._defaultLineCapStyle != MokaNoLineCapStyle
	&&	MokaBezierPath._defaultLineCapStyle != MokaRoundLineCapStyle
	&&	MokaBezierPath._defaultLineCapStyle != MokaSquareLineCapStyle ){
		MokaBezierPath._defaultLineCapStyle = MokaNoLineCapStyle;
	}
	return MokaBezierPath._defaultLineCapStyle;
}
/*void*/ MokaBezierPath.setDefaultLineCapStyle = function(style){
	if( style != MokaNoLineCapStyle && style != MokaRoundLineCapStyle && style != MokaSquareLineCapStyle ){ return; }
	MokaBezierPath._defaultLineCapStyle = style;
}
/*MokaWindingRule*/ MokaBezierPath.defaultLineJoinStyle = function(){
	if( MokaBezierPath._defaultLineJoinStyle != MokaMiterLineJoinStyle
	&&	MokaBezierPath._defaultLineJoinStyle != MokaRoundLineJoinStyle
	&&	MokaBezierPath._defaultLineJoinStyle != MokaBevelLineJoinStyle ){
		MokaBezierPath._defaultLineJoinStyle = MokaMiterLineJoinStyle;
	}
	return MokaBezierPath._defaultLineJoinStyle;
}
/*void*/ MokaBezierPath.setDefaultLineJoinStyle = function(style){
	if( style != MokaMiterLineJoinStyle && style != MokaRoundLineJoinStyle && style != MokaBevelLineJoinStyle ){ return; }
	MokaBezierPath._defaultLineJoinStyle = rule;
}
/*float*/ MokaBezierPath.defaultLineWidth = function(){
	if( !is(MokaBezierPath._defaultLineWidth,"float") ){
		MokaBezierPath._defaultLineWidth = 1;
	}
	return MokaBezierPath._defaultLineWidth;
}
/*void*/ MokaBezierPath.setDefaultLineWidth = function(aFloat){
	if( !is(aFloat,"float") ){ return; }
	MokaBezierPath._defaultLineWidth = aFloat;
}
/*float*/ this.defaultMiterLimit = function(){
	if( !is(MokaBezierPath._defaultMiterLimit,"float") ){
		MokaBezierPath._defaultMiterLimit = 10;
	}
	return MokaBezierPath._defaultMiterLimit;
}
/*void*/ this.setDefaultMiterLimit = function(aFloat){
	if( !is(aFloat,"float") ){ return; }
	MokaBezierPath._defaultMiterLimit = aFloat;
}
/*float*/ this.defaultFlatness = function(){
	if( !is(MokaBezierPath._defaultFlatness,"float") ){
		MokaBezierPath._defaultFlatness = 0.6;
	}
	return MokaBezierPath._defaultFlatness;
}
/*void*/ this.setDefaultFlatness = function(aFloat){
	if( !is(aFloat,"float") ){ return; }
	MokaBezierPath._defaultFlatness = aFloat;
}

/*MokaBezierPath*/ MokaBezierPath.bezierPath = function(){
	return MokaBezierPath.make().init();
}
/*MokaBezierPath*/ MokaBezierPath.bezierPathWithOvalInRect = function(rect){
	var p = MokaBezierPath.bezierPath();
	
	if( !is(rect,MokaRect) ){ return p; }
	
	var m = 0.5888; //control points are m/2 and -m/2 from the points the centers of each side of the rect
	
	var point1 = new MokaPoint(rect.origin().x() + rect.size().width(), rect.origin().y() + rect.size().height()/2);
	var point2 = new MokaPoint(rect.origin().x() + rect.size().width()/2, rect.origin().y());
	var point3 = new MokaPoint(rect.origin().x(), rect.origin().y() + rect.size().height()/2 );
	var point4 = new MokaPoint(rect.origin().x() + rect.size().width()/2, rect.origin().y() + rect.size().height() );
	
	var mh = m*rect.size().height()/2;
	var mw = m.rect.size().width()/2;
	
	p.moveToPoint(point1);
	p.curveToPointWithControlOutAndIn(	point2,
										point1.add(new MokaPoint(0,-mh)),
										point2.add(new MokaPoint(mw,0)) );
	p.curveToPointWithControlOutAndIn(	point3,
										point2.add(new MokaPoint(-mw,0)),
										point3.add(new MokaPoint(0,-mh)) );
	p.curveToPointWithControlOutAndIn(	point4,
										point3.add(new MokaPoint(0,mh)),
										point4.add(new MokaPoint(-mw,0)) );
	p.curveToPointWithControlOutAndIn(	point1,
										point4.add(new MokaPoint(mw,0)),
										point1.add(new MokaPoint(0,mh)) );
	p.closePath();
	
	return p;
}
/*MokaBezierPath*/ MokaBezierPath.bezierPathWithArcWithCenterRadiusStartAngleAndEndAngle = function(c,r,start,end){
	return MokaBezierPath.bezierPathWithArcWithCenterRadiusStartAngleEndAngleAndClockwise(c,r,start,end,YES);
}
/*MokaBezierPath*/ MokaBezierPath.bezierPathWithArcWithCenterRadiusStartAngleEndAngleAndClockwise = function(c,r,start,end,cw){
	var p = MokaBezierPath.bezierPath();
	
	if( !is(c,MokaPoint) || !is(r,"float") || !is(start,"float") || !is(end,"float") || !is(cw,Boolean) ){ return p; }
	
	
	var under = start - start%(Math.PI/2) + Math.PI;
	var over = end - end&(Math.PI/2);
	
	p.moveToPoint(MokaPoint.vectorWithMagnitudeAndDirection(r,start));
	
	p.curveToPointWithControlOutAndInt( MokaPoint.vectorWithMagnitudeAndDirection(r,under),
										MokaPoint.vectorWithMagnitudeAndDirection(0.5888*r,start+Math.PI/2),
										MokaPoint.vectorWithMagnitudeAndDirection(0.5888*r,under-Math.PI/2) );
	
	for( var angle = under; angle < over; angle += Math.PI ){
		var point = MokaPoint.vectorWithMagnitudeAndDirection(r,angle);
		p.curveToPointWithControlOutAndInt( point,
											MokaPoint.vectorWithMagnitudeAndDirection(0.5888*r,angle+Math.PI/2),
											MokaPoint.vectorWithMagnitudeAndDirection(0.5888*r,angle+1-Math.PI/2) );
	}
	
	p.curveToPointWithControlOutAndInt( MokaPoint.vectorWithMagnitudeAndDirection(r,over),
										MokaPoint.vectorWithMagnitudeAndDirection(0.5888*r,over+Math.PI/2),
										MokaPoint.vectorWithMagnitudeAndDirection(0.5888*r,end-Math.PI/2) );
	
	return p;
}
/*MokaBezierPath*/ MokaBezierPath.bezierPathWithRect = function(rect){
	var p = MokaBezierPath.bezierPath();
	
	if( !is(rect,MokaRect) ){ return p; }
	
	var x = rect.origin().x();
	var y = rect.origin().y();
	var w = rect.size().width();
	var h = rect.size().height();
	
	p.moveToPoint(new MokaPoint(x,y));
	p.lineToPoint(new MokaPoint(x+w,y));
	p.lineToPoint(new MokaPoint(x+w,y+h));
	p.lineToPoint(new MokaPoint(x,y+h));
	p.closePath();
	
	return p;
}

//MokaWindingRule
MokaNonZeroWindingRule	= 0;
MokaEvenOddWingingRule	= 1;

//MokaLineCapStyle
MokaNoLineCapStyle		= 0;
MokaRoundLineCapStyle	= 1;
MokaSquareLineCapStyle	= 2;

//MokaLineJoinStyle
MokaMiterLineJoinStyle	= 0;
MokaRoundLineJoinStyle	= 1;
MokaBevelLineJoinStyle	= 2;

//MokaBezierPathElement
MokaMoveToBezierPathElement		= 0;
MokaLineToBezierPathElement		= 1;
MokaCurveToBezierPathElement	= 2;
MokaClosePathBezierPathElement	= 3;