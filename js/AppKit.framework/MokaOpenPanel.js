function MokaOpenPanel(){
	this.extend(MokaSavePanel);
	
	/*	User selection	*/
	var _filenames = MokaArray.make().init();
	var _URLs = MokaArray.make().init();
	
	/*	Allowed File Types	*/
	var _allowedFileTypes = null;
	
	/*	Browser selections	*/
	var _canChooseFiles = YES;
	var _canChooseDirectories = YES;
	var _resolvesAliases = YES;
	
	/*	Multiple selections	*/
	var _allowsMultipleSelection = YES;
	
	
	
	
	
	
	//Running the open panel
	/*void*/ this.beginDirectoryFileTypesModelessDelegateDidEndSelectorContextInfo = function(){
		
	}
	/*void*/ this.beginSheetForDirectoryFileTypesModalForWindowModalDelegateDidEndSelectorContextInfo = function(){
		
	}
	/*int*/ this.runModalForDirectoryFileAndTypes = function(dir,file,types){
		
	}
	/*int*/ this.runModalForTypes = function(types){
		
	}
	
	//Getting the user selection
	/*MokaArray*/ this.filenames = function(){
		return _filenames;
	}
	/*MokaArray*/ this.URLs = function(){
		return _URLs;
	}
	
	//Specifying the file types
	/*MokaArray*/ this.allowedFileTypes = function(){
		return _allowedFileTypes;
	}
	/*void*/ this.setAllowedFileTypes = function(filetypes){
		if( filetypes == null ){ _allowedFileTypes = null; return; }
		if( typeof(filetypes.isKindOfClass) != "function" ){ return; }
		if( !filetypes.isKindOfClass(MokaArray) ){ return; }
		
		_allowedFileTypes.removeAllObjects();
		
		for( var i = 0; i < filetypes.count(); i++ ){
			var obj = filetypes.objectAtIndex(i);
			
			if( obj == undefined ){ continue; }
			if( typeof(obj.isKindOfClass) != "function" ){ continue; }
			if( !obj.isKindOfClass(MokaString) ){ continue; }
			
			_allowedFileTypes.addObject(obj);
		}
	}
	
	//Allowing browser selections
	/*bool*/ this.canChooseFiles = function(){
		return _canChooseFiles;
	}
	/*void*/ this.setCanChooseFiles = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_canChooseFiles = yn;
	}
	/*bool*/ this.canChooseDirectories = function(){
		return _canChooseDirectories;
	}
	/*void*/ this.setCanChooseDirectories = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_canChooseDirectories = yn;
	}
	/*bool*/ this.resolvesAliases = function(){
		return _resolvesAliases;
	}
	/*void*/ this.setResolvesAliases = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_resolvesAliases = yn;
	}
	
	//Allowing multiple selections
	/*bool*/ this.allowsMultipleSelection = function(){
		return _allowsMultipleSelection;
	}
	/*void*/ this.setAllowsMultipleSelection = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_allowsMultipleSelection = yn;
	}
	
}
/*MokaOpenPanel*/ MokaOpenPanel.openPanel = function(){
	
}
