function MokaSavePanel(){
	this.extend(MokaPanel);
	
	/*	Customization	*/
	var _accessoryView = null;
	var _title = $s("Save");
	var _prompt = $s("Save");
	var _nameFieldLabel = $s("Save As:");
	var _message = $s("");
	
	/*	Working with extension hiding	*/
	var _canSelectHiddenExtension = YES;
	var _isExtensionHidden = NO;
	
	/*	Directory and File Type	*/
	var _allowedFileTypes = MokaArray.make().init();
	var _allowsOtherFileTypes = NO;
	var _treatsFilePackagesAsDirectories = NO;
	var _canCreateDirectories = YES;
	
	/*	User Selections	*/
	var _director = $s("");
	var _filename = $s("");
	var _URL = $s("");
	var _isExpanded = NO;
	
	/*	Delegate	*/
	var _delegate = null;
	
	
	
	
	


	//Customizing the save panel
	/*MokaView*/ this.accessoryView = function(){
		return _accessoryView;
	}
	/*void*/ this.setAccessoryView = function(aView){
		if( aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		_accessoryView = aView;
	}
	/*MokaString*/ this.title = function(){
		return _title;
	}
	/*void*/ this.setTitle = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_title = aString;
	}
	/*MokaString*/ this.prompt = function(){
		return _prompt;
	}
	/*void*/ this.setPrompt = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_prompt = aString;
	}
	/*MokaString*/ this.nameFieldLabel = function(){
		return _nameFieldLabel;
	}
	/*void*/ this.setNameFieldLabel = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_nameFieldLabel = aString;
	}
	/*MokaString*/ this.message = function(){
		return _message;
	}
	/*void*/ this.setMessage = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_message = aString;
	}
	
	//Working with extension hiding
	/*bool*/ this.canSelectHiddenExtension = function(){
		return _canSelectHiddenExtension;
	}
	/*void*/ this.setCanSelectHiddenExtension = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_canSelectHiddenExtension = yn;
	}
	/*bool*/ this.isExtensionHidden = function(){
		return _isExtensionHidden;
	}
	/*void*/ this.setIsExtensionHidden = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_isExtensionHidden = yn;
	}
	
	//Setting directory and file type
	/*void*/ this.setDirectory = function(){
		
	}
	/*MokaString*/ this.requiredFileType = function(){
		return this.allowedFileTypes().objectAtIndex(0);
	}
	/*void*/ this.setRequiredFileType = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		return this.allowedFileTypes().insertObjectAtIndex( aString, 0 );
	}
	/*MokaArray*/ this.allowedFileTypes = function(){
		return _allowedFileTypes;
	}
	/*void*/ this.setAllowedFileTypes = function(anArrayOfStrings){
		if( anArrayOfStrings == undefined ){ return; }
		if( typeof(anArrayOfStrings.isKindOfClass) != "function" ){ return; }
		if( !anArrayOfStrings.isKindOfClass(MokaArray) ){ return; }
		
		_allowedFileTypes.removeAllObjects();
		
		for( var i = 0; i < anArrayOfStrings.count(); i++ ){
			var obj = anArrayOfStrings.objectAtIndex(i);
			
			if( obj == undefined ){ continue; }
			if( typeof(obj.isKindOfClass) != "function" ){ continue; }
			if( !obj.isKindOfClass(MokaString) ){ continue; }
			
			_allowedFileTypes.addObject(obj);
		}
		
	}
	/*bool*/ this.allowsOtherFileTypes = function(){
		return _allowsOtherFileTypes;
	}
	/*void*/ this.setAllowsOtherFileTypes = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_allowsOtherFileTypes = yn;
	}
	/*bool*/ this.treatsFilePackagesAsDirectories = function(){
		return _treatsFilePackagesAsDirectories;
	}
	/*void*/ this.setTreatsFilePackagesAsDirectories = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_treatsFilePackagesAsDirectories = yn;
	}
	/*void*/ this.validateVisibleColumns = function(){
		
	}
	/*bool*/ this.canCreateDirectories = function(){
		return _canCreateDirectories;
	}
	/*void*/ this.setCanCreateDirectories = function(yn){
		if( yn == undefined ){ return; }
		if( typeof(yn.isKindOfClass) != "function" ){ return; }
		if( !yn.isKindOfClass(class_name) ){ return; }
		
		_canCreateDirectories = yn;
	}
	
	//Running the MokaSavePanel
	/*void*/ this.beginSheetForDirectoryFileModalForWindowModalDelegateDidEndSelectorAndContextInfo = function(){
		
	}
	/*int*/ this.runModal = function(){
		
	}
	/*int*/ this.runModalForDirectoryAndFile = function(dir,file){
		
	}
	
	//Getting user selections
	/*MokaString*/ this.directory = function(){
		return _directory;
	}
	/*MokaString*/ this.filename = function(){
		return _filename;
	}
	/*MokaString*/ this.URL = function(){
		return _URL;
	}
	/*bool*/ this.isExpanded = function(){
		return _isExpanded;
	}
	
	//Action methods
	/*void*/ this.ok = function(sender){
		if( sender == undefined ){ return; }
		if( typeof(sender.isKindOfClass) != "function" ){ return; }
		
	}
	/*void*/ this.cancel = function(sender){
		if( sender == undefined ){ return; }
		if( typeof(sender.isKindOfClass) != "function" ){ return; }
		
	}
	
	//Delegate
	/*id*/ this.delegate = function(){
		return _delegate;
	}
	/*void*/ this.setDelegate = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_delegate = anObject;
	}
	
	//Working with filenames
	/*MokaComparisonResult*/ this.compareFilenameWithFilenameCaseSensitiveForPanel = function(filename1,filename2,yn,sender){
		
	}
	/*bool*/ this.isValidFilenameForPanel = function(filename,sender){
		
	}
	/*bool*/ this.shouldShowFilenameForPanel = function(filename,sender){
		
	}
	/*bool*/ this.userEnteredFilenameConfirmedForPanel = function(filename,yn,sender){
		
	}
	
	//Expanding the panel
	/*void*/ this.willExpandForPanel = function(yn,sender){
		
	}
	
	//Managing panel changes
	/*void*/ this.directoryDidChangeForPanel = function(path,sender){
		
	}
	/*void*/ this.panelSelectionDidChange = function(sender){
		
	}
	
}

/*MokaSavePanel*/ MokaSavePanel.savePanel = function(){
	
}