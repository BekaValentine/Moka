function _MokaColorWheel(){
	this.extend(MokaControl);
	
	/*	Color	*/
	var _color = MokaColor.blackColor();
	
	/*	Background Images	*/
	var _spectrum = new MokaImage();
	var _shade = new MokaImage();
	
	/*	Skin	*/
	var _loop = document.createElement("div");
	_loop.setAttribute("id","loop");
	this.skin().appendChild(_loop);
	
	
	
	
	
	//Color
	/*MokaColor*/ this.colorValue = function(){
		return _color;
	}
	/*void*/ this.setColorValue = function(aColor){
		if( !is(aColor,MokaColor) ){ return; }
		_color = aColor;
		this.display();
		if( this.target() && this.action() && this.target().respondsToSelector(this.action()) ){
			this.target()[this.action().selectorName()](this);
		}
	}
	/*MokaColor*/ this.colorAtPoint = function(aPoint){
		if( !is(aPoint,MokaPoint) ){ return MokaColor.clearColor(); }
		
		return MokaColor.colorWithHSBA(aPoint.vectorDirection(),aPoint.vectorMagnitude()/73,this.color().brightnessComponent(),1);
	}
	/*MokaPoint*/ this.pointForColor = function(aColor){
		if( !is(aColor,MokaColor) ){ return; }
		
		return MokaPoint.vectorWithMagnitudeAndDirection(73*aColor.saturationComponent(),aColor.hueComponent());
	}
		
	//Size constraints
	/*MokaSize*/ this.constrainSize = function(aSize){
		return new MokaSize(150,150)
	}
		
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		var loopPosition = this.pointForColor().subtract(new MokaPoint(6,6));
		_loop.style.left = loopPosition.x() + MokaPageSizeUnits;
		_loop.style.top = loopPosition.y() + MokaPageSizeUnits;
		
		this.drawingCanvas().appendChild( _spectrum.representation() );
		var shade = _shade.representation();
			shade.style.opacity = this.color().brightnessComponent();
		this.drawingCanvas().appendChild( shade );
		this.drawCellInRect( _indicatorCell, JadeRect.rectWithOriginAndSize(	this.pointForColor().subtract(new JadePoint(6,6)),
																				new JadeSize(13,13) ));
	}
	
	//Event handling
	/*void*/ this.mouseDown = function(theEvent){
		if( !is(theEvent,MokaEvent) ){ return; }
		
		this.setColorValue(this.colorAtPoint(this.convertPointFromPage(theEvent.mouseLocation())).subtract(new MokaPoint(73,73)));
	}
	/*void*/ this.mouseUp = function(theEvent){
		if( !is(theEvent,MokaEvent) ){ return; }
		
		this.setColorValue(this.colorAtPoint(this.convertPointFromPage(theEvent.mouseLocation()).subtract(new MokaPoint(73,73))));
	}
	/*void*/ this.mouseDrag = function(theEvent){
		if( !is(theEvent,MokaEvent) ){ return; }
		
		if( this.isContinuous() ){
			this.setColorValue(this.colorAtPoint(this.convertPointFromPage(theEvent.mouseLocation()).subtract(new MokaPoint(73,73))));
		}
	}
	
	
}