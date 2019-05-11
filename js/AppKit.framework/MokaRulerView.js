function MokaRulerView(){
	this.extend(MokaView);
	
	/*	Properties	*/
	var _measurementUnits = "points";
	var _originOffset = 0; //in pixels
	var _orientation = MokaHorizontalRuler;
	var _ruleThickness = 16;
	
	/*	Client View	*/
	var _clientView = null;
	
	/*	Accessory View	*/
	var _accessoryView = null;
	
	/*	Owning scroll view	*/
	var _scrollView = null;
	
	/*	Markers	*/
	var _markers = new MokaArray;
	
	
	
	
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_markers.init();
		
		this.pageDisplay().style.backgroundColor = "lightgrey";
		this.display();
		return this;
	}
	
	//constrain the size
	/*MokaSize*/ this.constrainSize = function(aSize){
		if( typeof aSize == undefined ){ return this.frame().size(); }
		if( typeof(aSize.isKindOfClass) != "function" ){ return this.frame().size(); }
		if( !aSize.isKindOfClass(MokaSize) ){ return this.frame().size(); }
		
		var newSize = aSize.copy();
		if( newSize.width() < 0 ){ newSize.setWidth( 0 ); }
		if( this.orientation() == MokaHorizontalRuler ){ newSize.setHeight( this.ruleThickness() ); }
		else{ newSize.setWidth( this.ruleThickness() ); }
		
		return newSize;
	}
	
	//Draw
	/*void*/ this.draw = function(){
		this.pageDisplay().style.backgroundColor = "white";
		this.eraseAll();
		
	}
	
	//Managing the properties
	/*string*/ this.measurementUnits = function(){
		return _measurementUnits;
	}	
	/*void*/ this.setMeasurementUnits = function(aString){
		if( !MokaRulerView.units[aString] ){ return; }
		
		_measurementUnits = aString;
		this.display();
	}
	/*float*/ this.originOffset = function(){
		return _originOffset;
	}	
	/*void*/ this.setOriginOffset = function(aNumber){
		if( !MokaNumberIsFloat(aNumber) ){ return; }
		_originOffset = aNumber;
		this.display();
	}
	/*MokaRulerOrientation*/ this.orientation = function(){
		return _orientation;
	}	
	/*void*/ this.setOrientation = function(anOrientation){
		if( anOrientation != MokaHorizontalRuler && anOrientation != MokaVerticalRuler ){ return; }
		_orientation = anOrientation;
		this.display();
	}
	/*float*/ this.ruleThickness = function(){
		return _ruleThickness;
	}	
	/*void*/ this.setRuleThickness = function(aFloat){
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		_ruleThickness = aFloat;
		this.display();
	}

	//Setting the client view
	/*MokaView*/ this.clientView = function(){
		return _clientView;
	}	
	/*void*/ this.setClientView = function(aView){
		if( aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		
		if( this.clientView().respondsToSelector($sel("rulerViewWillSetClientView")) ){
			this.clientView().rulerViewWillSetClientView(this,aView);
		}
		
		this.markers().removeAllObjects();
		
		_clientView = aView;
		
		this.display();
	}
	
	//Setting the accessory view
	/*MokaView*/ this.accessoryView = function(){
		return _accessoryView;
	}
	/*void*/ this.setAccessoryView = function(aView){
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		_accessoryView = aView;
		this.display();
	}
	
	//Setting the scroll view
	/*MokaScrollView*/ this.scrollView = function(){
		return _scrollView;
	}	
	/*void*/ this.setScrollView = function(aScrollView){
		if( typeof(aScrollView.isKindOfClass) != "function" ){ return; }
		if( !aScrollView.isKindOfClass(MokaScrollView) ){ return; }
		_scrollView = aScrollView;
	}
	
	//Managing markers
	/*MokaArray*/ this.markers = function(){
		return _markers;
	}	
	/*void*/ this.setMarkers = function(anArrayOfMarkers){
		if( typeof(anArrayOfMarkers.isKindOfClass) != "function" ){ return; }
		if( !anArrayOfMarkers.isKindOfClass(MokaArray) ){ return; }
		_markers = anArrayOfMarkers;
		this.display();
	}
	/*void*/ this.addMarker = function(aMarker){
		if( typeof(aMarker.isKindOfClass) != "function" ){ return; }
		if( !aMarker.isKindOfClass(MokaRulerMarker) ){ return; }
		_markers.addObject(aMarker);
		this.display();
	}
	/*void*/ this.removeMarker = function(aMarker){
		if( typeof(aMarker.isKindOfClass) != "function" ){ return; }
		if( !aMarker.isKindOfClass(MokaRulerMarker) ){ return; }
		if( !_markers.containsObject(aMarker) ){ return; }
		
		_markers.removeObject(aMarker);
		this.display();
	}
	
}

//Default units
MokaRulerView.units = function(){
	if( !is(this._units,MokaDictionary) ){
		this._units = $dict(
			"pixel"			["pixels", "px", 1.0],
			"point",		[ "points", "pt", 1.0 ],
			"pica",			[ "pica", "pica", 12.0 ],
			"inch",			[ "inch", "in", 72.0 ],
			"millimeter",	[ "millimeter", "mm", 2.835 ],
			"centimeter",	[ "centimeter", "cm", 28.35 ]
		);
	}
	
	return this._units;
}

/*void*/ MokaRulerView.registerUnitWithNameAbbreviationAndScaleToPoints = function(aName,abbr,scale	){
	if( typeof(aName) != "string" ){ return; }
	if( typeof(abbr) != "string" ){ return; }
	if( !MokaNumberIsFloat(scale) ){ return; }
	
	MokaRulerView.units().setObjectForKey( [ aName, abbr, scale ], aName );
}

MokaHorizontalRuler	= 0;
MokaVerticalRuler	= 1;