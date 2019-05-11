function MokaURL(){
	this.extend(MokaObject);
	
	/*	Location	*/
	var _location = $s("");
	
	/*	Callback stuff	*/
	var _invocation = MokaInvocation.make().init();
	
	/*	Resource data	*/
	var _resourceData = null;
	
	/*	XHR Object	*/
	var _xhr;
	if( typeof(XMLHttpRequest) != undefined ){
		_xhr = new XMLHttpRequest();
	} else if( window.ActiveXObject ){

		var versions = [ "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp" ];
		
		for( var i = 0; i < versions.length; i++ ){
			try {
				_xhr = new ActiveXObject(versions[i]);
			} catch( err ){}
		}

	}
	_xhr.onreadystatechange = function(){
		if( _xhr.readyState == 4 && _xhr.status == 200 ){
			_resourceData = _xhr.responseText;
			_invocation.invoke();
		}
	}
	
	
	
	
	
	
	
	//Initialization
	/*id*/ this.initWithString = function(aString){
		this.supers().init();
		
		if( !is(aString,MokaString) ){ return this; }
		
		_location = $s(aString);
		
		return this;
	}
	/*id*/ this.initWithStringRelativeToURL = function(aString,aURL){
		this.supers().init();
		
		if( !is(aString,MokaString) ){ aString = ""; }
		if( !is(aURL,MokaURL) ){ aURL = $url(); }
				
		_location = $s( aURL.location().toString() + aString.toString() );
		
		return this;
	}
	
	//Location
	/*MokaString*/ this.location = function(){
		return _location.copy();
	}
	
	//String converstion
	/*string*/ this.toString = function(){
		return "url("+_location.characters()+")";
	}
	
	//Opening the resource
	/*void*/ this.openInCurrentWindow = function(){
		window.location = this.location().characters();
	}
	/*window*/ this.openInWindowWithName = function(aWindowName){
		this.openInWindowWithNameAndFeatures(aWindowName,"");
	}
	/*window*/ this.openInWindowWithNameAndFeatures = function(aWindowName,features){
		if( aWindowName == undefined ){ return; }
		if( typeof(aWindowName) != "string" ){ return; }
		if( features == undefined ){ return; }
		if( typeof(features) != "string" ){ return; }
		
		
		var newWindow = window.open(	this.location().characters(),
										aWindowName,
										features );
	}
	
	//Resource data
	/*id*/ this.resourceData = function(){
		return _resourceData;
	}
	/*void*/ this.setResourceData = function(data){
		if( !is(data) ){ return; }
		
		_resourceData = data;
	}
	
	//Standard HTTP operations
	/*id*/ this.createResourceAsynchronously = function(yn){
		if( !is(yn,Boolean) ){ return; }
		
		this.open("POST",yn);
		this.send(this.resourceData());
	}
	/*id*/ this.loadResourceAsynchronously = function(yn){
		if( !is(yn,Boolean) ){ return; }
		
		this.open("GET",yn);
		this.send();
	}
	/*id*/ this.updateResourceAsynchronously = function(yn){
		if( !is(yn,Boolean) ){ return; }
		
		this.open("PUT",yn);
		this.send(this.resourceData());
	}
	/*id*/ this.deleteResourceAsynchronously = function(yn){
		if( !is(yn,Boolean) ){ return; }
		
		this.open("DELETE",yn);
		this.send(this.resourceData());
	}
	
	//Callback stuff
	/*id*/ this.target = function(){
		return this.invocation().target();
	}
	/*void*/ this.setTarget = function(anObject){
		this.invocation().setTarget(anObject);
	}
	/*MokaSelector*/ this.action = function(){
		this.invocation().action();
	}
	/*void*/ this.setAction = function(aSelector){
		this.invocation().setAction(aSelector);
	}
	/*MokaInvocation*/ this.invocation = function(){
		return _invocation;
	}
	/*void*/ this.setInvocation = function(anInvocation){
		if( anInvocation == undefined ){ return; }
		if( typeof(anInvocation.isKindOfClass) != "function" ){ return; }
		if( !anInvocation.isKindOfClass(MokaInvocation) ){ return; }
		
		_invocation = anInvocation;
	}
		
	//Standard XHR operations
	/*void*/ this.cancelRequest = function(){
		_xhr.abort()
	}
	/*MokaString*/ this.allResponseHeaders = function(){
		return $s(_xhr.getAllResponseHeaders());
	}
	/*MokaString*/ this.responseHeaderForName = function(aHeaderName){
		return $s(_xhr.getResponseHeader(aHeaderName));
	}
	/*void*/ this.open = function(requestType,asynch){
		if( !is(requestType,String) || !is(asynch,Boolean) ){ return; }
		
		_xhr.open(requestType,this.location().toString(),asynch);
	}
	/*void*/ this.send = function(resourceData){
		_xhr.send(resourceData);
	}
	/*void*/ this.setRequestHeaderValueForName = function(aValue,aHeaderName){
		_xhr.setRequestHeader( aHeaderName, aValue );
	}
	/*string*/ this.responseText = function(){
		return _xhr.responseText;
	}
	/*xml dom*/ this.responseXML = function(){
		return _xhr.responseXML;
	}
	/*string*/ this.status = function(){
		return _xhr.status;
	}
	/*string*/ this.statusText = function(){
		return _xhr.statusText;
	}
	
		
}
/*MokaURL*/ MokaURL.URLWithString = function(aString){
	return MokaURL.make().initWithString(aString);
}
/*MokaURL*/ MokaURL.URLWithStringRelativeToURL = function(aString,aURL){
	return MokaURL.make().initWithStringRelativeToURL(aString,aURL);
}
/*MokaURL*/ MokaURL.applicationURL = function(){
	return MokaURL.URLWithString($s(window.location.substr(0,window.location.lastIndexOf("/")+1)));
}

function $url(aJSString){
	return MokaURL.URLWithString($s(aJSString || ""));
}