function MokaImage(aLocation){
	this.extend(MokaObject);
	
	/*	The location	*/
	var _location = "";
	
	/*	Representation	*/
	var _representation = document.createElement("img");
		_representation.style.position = "absolute";
		_representation.style.left = "0";
		_representation.style.top = "0";
	
	/*	Creation init	*/
	if( is(aLocation,MokaString) ){
		_location = aLocation.copy();
		_representation.setAttribute("src",_location);
	}
	
	/*	Size	*/
	var _size = new MokaSize;
	
	/*	Name	*/
	var _name = null;

	
	
	
	
		
	
	//Initialization
	/*id*/ this.initWithContentsOfLocation = function(aLocation){
		this.supers().init();
		
		this.setLocation(aLocation);
		
		return this;
	}
	/*id*/ this.initWithSize = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		this.supers().init();
		
		this.setSize(aSize);
		return this;
	}
	
	//location and size
	/*string*/ this.location = function(){
		return _location;
	}
	/*void*/ this.setLocation = function(aLocation){
		if( !is(aLocation,MokaString) ){ return; }
		
		_location = aLocation.copy();
		_representation.setAttribute("src",_location);
	}
	
	//representation
	/*img*/ this.representation = function(){
		var newRep = _representation.cloneNode(YES);
		newRep.style.width = this.size().width();
		newRep.style.height = this.size().height();
		return newRep;
	}
	
	//Size
	/*MokaSize*/ this.size = function(){
		return _size;
	}
	/*void*/ this.setSize = function(aSize){
		if( typeof aSize == undefined ){ return; }
		if( typeof(aSize.isKindOfClass) != "function" ){ return; }
		if( !aSize.isKindOfClass(MokaSize) ){ return; }
		
		_size = aSize;
		_representation.style.width = aSize.width()+MokaPageSizeUnits;
		_representation.style.height = aSize.height()+MokaPageSizeUnits;
	}
	
	//Name
	/*MokaString*/ this.name = function(){
		return _name;
	}
	/*bool*/ this.setName = function(aName){
		if( typeof aName == undefined ){ return; }
		if( typeof(aName.isKindOfClass) != "function" ){ return; }
		if( !aName.isKindOfClass(MokaString) ){ return; }
		
		if( MokaImage._imagesByName.allKeys().containsObject(aName) ){ return NO; }
		
		MokaImages._imagesByName.removeObject(this);
		
		MokaImage._imagesByName.setObjectForKey(this,aName);
		return YES;
	}
		
}
/*MokaImage*/ MokaImage.imageWithLocation = function(aLocation){
	return this.make().initWithContentsOfLocation(aLocation);
}

//Images by name
MokaImage._imagesByName = MokaDictionary.makeAndInit();
/*MokaImage*/ MokaImage.imageNamed = function(aName){
	if( typeof aName == undefined ){ return; }
	if( typeof(aName.isKindOfClass) != "function" ){ return; }
	if( !aName.isKindOfClass(MokaString) ){ return; }
	
	if( !is(this._imagesByName,MokaDictionary) ){
		this._imagesByName = $dict();
		return null;
	}
	
	return MokaImages._imagesByName.objectForKey(aName);
	
}

//Pboard type
MokaImagePboardType = $s("MokaImagePboardType")