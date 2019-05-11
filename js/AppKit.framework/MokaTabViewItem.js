function MokaTabViewItem(){
	this.extend(MokaObject);
	
	/*	Title and Content View	*/
	var _title = $s("");
	var _contentView = new MokaBox;
	
	/*	Identifier	*/
	var _identifier = null;
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_contentView.init();
		
		return this;
	}
	
	//Setting the title and content view
	/*MokaString*/ this.title = function(){
		return _title;
	}
	
	/*void*/ this.setTitle = function(aString){
		if( typeof aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		_title = aString;
	}
	/*MokaBox*/ this.contentView = function(){
		return _contentView;
	}	
	/*void*/ this.setContentView = function(aBox){
		if( typeof aBox == undefined ){ return; }
		if( typeof(aBox.isKindOfClass) != "function" ){ return; }
		if( !aBox.isKindOfClass(MokaBox) ){ return; }
		_contentView = aBox;
	}
	
	//Setting the identifier
	/*id*/ this.identifier = function(){
		return _identifier;
	}	
	/*void*/ this.setIdentifier = function(anObject){
		if( typeof anObject == undefined ){ return; }
		
		_identifier = anObject;
	}
			
}