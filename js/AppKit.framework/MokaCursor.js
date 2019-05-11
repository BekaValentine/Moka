function MokaCursor(){
	this.extend(MokaObject);
	
	/*	Images	*/
	var _images = MokaArray.make().init();
	
	/*	Type	*/
	var _type = MokaAutoCursor;
		
	/*	Behavior	*/
	var _onMouseEntered = NO;
	var _onMouseExited = NO;
	
	
	
	
	//Initialization
	/*id*/ this.initWithType = function(aType){
		if( aType == undefined ){ aType = MokaAutoCursor; }
		if( !MokaNumberIsInt(aType) ){ aType = MokaAutoCursor; }
		if( aType < MokaDefaultCursor || aType > MokaAutoCursor ){ aType = MokaAutoCursor; }
		
		_type = aType;
		
		return this;
	}
	/*id*/ this.initWithImagesAndDefault = function(){
		/*
			arguments = { cursor1: imageOrImageURL, cursor2: imageOrImageURL, ..., default: MokaCursorType }
		*/
		var imageURLsToAdd = MokaArray.make().init();
		var typeToSet = MokaAutoCursor;
		
		for( var i = 0; i < arguments.length; i++ ){
			if( i in arguments ){
				if( i != arguments.length-1 ){
					if( arguments[i] == undefined ){ return; }
					if( typeof(arguments[i].isKindOfClass) != "function" ){ return; }
					if( arguments[i].isKindOfClass(MokaImage) ){
						imageURLsToAdd.addObject(arguments[i].location());
					} else if( arguments[i].isKindOfClass(MokaURL) ){
						imageURLsToAdd.addObject(arguments[i]);
					} else { return; }
				} else {
					if( arguments[i] == undefined ){ return; }
					
					if( typeof(arguments[i].isKindOfClass) == "function" ){
						if( arguments[i].isKindOfClass(MokaImage) ){
							imageURLsToAdd.addObject(arguments[i].location());
						} else if( arguments[i].isKindOfClass(MokaURL) ){
							imageURLsToAdd.addObject(arguments[i]);
						} else { return; }
					} else if( MokaNumberIsInt(arguments[i]) && arguments[i] >= MokaDefaultCursor && arguments[i] <= MokaAutoCursor ){
						typeToSet = arguments[i]
					}else {
						return;
					}
				}
			}
		}
		
		_type = typeToSet;
		_images.addObjectsFromArray(imageURLsToAdd);
		
		return this;
	}
	
	//Controlling current
	/*void*/ this.pop = function(){
		MokaCursor.pop();
	}
	/*void*/ this.push = function(){
		if( !MokaCursor._stack ){
			MokaCursor._stack = MokaArray.make().init();
			MokaCursor.auto().push();
		}
		MokaCursor._stack.addObject(this);
		this.set();
	}
	/*void*/ this.set = function(){
		var cssCursor = "";
		
		for( var i = 0; i < _images.count(); i++ ){
			cssCursor += _images.objectAtIndex(i) + ", ";
		}
		
		var t = "";
		switch( _type ){
			case 0: t = "default"; break;
			case 1: t = "crosshair"; break;
			case 2: t = "pointer"; break;
			case 3: t = "move"; break;
			case 4: t = "n-resize"; break;
			case 5: t = "ne-resize"; break;
			case 6: t = "e-resize"; break;
			case 7: t = "se-resize"; break;
			case 8: t = "s-resize"; break;
			case 9: t = "sw-resize"; break;
			case 10: t = "w-resize"; break;
			case 11: t = "nw-resize"; break;
			case 12: t = "text"; break;
			case 13: t = "help"; break;
			default: t = "auto";
		}
		
		cssCursor += t;
		
		document.body.style.cursor = cssCursor;
	}
	/*void*/ this.mouseEntered = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( this.onMouseEntered() ){
			this.set();
		}
	}	
	/*bool*/ this.onMouseEntered = function(){
		return _onMouseEntered;
	}
	/*void*/ this.setOnMouseEntered = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_onMouseEntered = yn;
	}
	/*void*/ this.mouseExited = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( this.onMouseExited() ){
			this.set();
		}
	}
	/*bool*/ this.onMouseExited = function(){
		return _onMouseExited;
	}
	/*void*/ this.setOnMouseExited = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_onMouseExited = yn;
	}
	
}
/*MokaCursor*/ MokaCursor.currentCursor = function(){
	if( !MokaCursor._stack ){
		MokaCursor._stack = MokaArray.make().init();
		MokaCursor.auto().push();
	}
	return MokaCursor._stack.lastObject();
}
/*MokaCursor*/ MokaCursor.def = function(){
	return MokaCursor.make().initWithType(MokaDefaultCursor);
}
/*MokaCursor*/ MokaCursor.pointer = function(){
	return MokaCursor.make().initWithType(MokaPointerCursor);
}
/*MokaCursor*/ MokaCursor.crosshair = function(){
	return MokaCursor.make().initWithType(MokaCrosshairCursor);
}
/*MokaCursor*/ MokaCursor.move = function(){
	return MokaCursor.make().initWithType(MokaMoveCursor);
}
/*MokaCursor*/ MokaCursor.nResize = function(){
	return MokaCursor.make().initWithType(MokaNResizeCursor);
}
/*MokaCursor*/ MokaCursor.neResize = function(){
	return MokaCursor.make().initWithType(MokaNEResizeCursor);
}
/*MokaCursor*/ MokaCursor.eResize = function(){
	return MokaCursor.make().initWithType(MokaEResizeCursor);
}
/*MokaCursor*/ MokaCursor.seResize = function(){
	return MokaCursor.make().initWithType(MokaSEResizeCursor);
}
/*MokaCursor*/ MokaCursor.sResize = function(){
	return MokaCursor.make().initWithType(MokaSResizeCursor);
}
/*MokaCursor*/ MokaCursor.swResize = function(){
	return MokaCursor.make().initWithType(MokaSWResizeCursor);
}
/*MokaCursor*/ MokaCursor.wResize = function(){
	return MokaCursor.make().initWithType(MokaWResizeCursor);
}
/*MokaCursor*/ MokaCursor.nwResize = function(){
	return MokaCursor.make().initWithType(MokaNWResizeCursor);
}
/*MokaCursor*/ MokaCursor.text = function(){
	return MokaCursor.make().initWithType(MokaTextCursor);
}
/*MokaCursor*/ MokaCursor.wait = function(){
	return MokaCursor.make().initWithType(MokaWaitCursor);
}
/*MokaCursor*/ MokaCursor.help = function(){
	return MokaCursor.make().initWithType(MokaHelpCursor);
}
/*MokaCursor*/ MokaCursor.auto = function(){
	return MokaCursor.make().initWithType(MokaAutoCursor);
}
/*MokaCursor*/ MokaCursor.withImagesAndDefault = function(){
	var c = MokaCursor.make();
	c.initWithImagesAndDefault.apply(c,arguments);
	return c;
}

//Cursor stack
/*void*/ MokaCursor.pop = function(){
	if( MokaCursor._stack ){
		if( MokaCursor._stack.count() > 1 ){
			MokaCursor._stack.removeLastObject();
			MokaCursor._stack.lastObject().set();
		}
	} else {
		MokaCursor._stack = MokaArray.make().init();
		MokaCursor.auto().push();
	}
}


//Moka Cursor types
MokaDefaultCursor	=	0;
MokaCrosshairCursor	=	1;
MokaPointerCursor	=	2;
MokaMoveCursor		=	3;
MokaNResizeCursor	=	4;
MokaNEResizeCursor	=	5;
MokaEResizeCursor	=	6;
MokaSEResizeCursor	=	7;
MokaSResizeCursor	=	8;
MokaSWResizeCursor	=	9;
MokaWResizeCursor	=	10;
MokaNWResizeCursor	=	11;
MokaTextCursor		=	12;
MokaWaitCursor		=	13;
MokaAutoCursor		=	14;