function MokaNotification(){
	this.extend(MokaObject);
	
	/*	Information about the notification	*/
	var _name = null;
	var _object = null;
	var _userInfo = null;
	
	
	
	
	
	
	
	
	//Obtaining information
	/*MokaString*/ this.name = function(){
		return _name;
	}
	/*void*/ this.setName = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		if( !_name ){ _name = aString; }
	}
	/*id*/ this.object = function(){
		return _object;
	}
	/*void*/ this.setObject = function(anObject){
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		if( !_object ){ _object = anObject; }
	}
	/*MokaDictionary*/ this.userInfo = function(){
		return _userInfo;
	}
	/*void*/ this.setUserInfo = function(aDict){
		if( aDict == undefined ){ return; }
		if( typeof(aDict.isKindOfClass) != "function" ){ return; }
		if( !aDict.isKindOfClass(MokaDictionary) ){ return; }
		
		if( !_userInfo ){ _userInfo = aDict; }
	}
	
}
/*MokaNotification*/ MokaNotification.notificationWithNameAndObject = function(aName,anObject){
	if( aName == undefined ){ return new this; }
	if( typeof(aName.isKindOfClass) != "function" ){ return new this; }
	if( !aName.isKindOfClass(MokaString) ){ return new this; }
	if( anObject == undefined ){ return new this; }
	if( typeof(anObject.isKindOfClass) != "function" ){ return new this; }
	
	var theNote = new this;
	theNote.setName(aName);
	theNote.setObject(anObject);
	return theNote;
}
/*MokaNotification*/ MokaNotification.notificationWithNameObjectAndUserInfo = function(aName,anObject,userInfo){
	if( aName == undefined ){ return new this; }
	if( typeof(aName.isKindOfClass) != "function" ){ return new this; }
	if( !aName.isKindOfClass(MokaString) ){ return new this; }
	if( anObject == undefined ){ return new this; }
	if( typeof(anObject.isKindOfClass) != "function" ){ return new this; }
	if( userInfo == undefined ){ return new this; }
	if( typeof(userInfo.isKindOfClass) != "function" ){ return new this; }
	if( !userInfo.isKindOfClass(MokaDictionary) ){ return new this; }
	
	
	var theNote = new this;
	theNote.setName(aName);
	theNote.setObject(anObject);
	theNote.setUserInfo(aDict);
	return theNote;
}

