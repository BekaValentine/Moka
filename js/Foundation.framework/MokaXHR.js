function MokaXHR(){
	this.extend(MokaObject);
	
	var _connection;
	
	if( typeof(XMLHttpRequest) != undefined ){
		_connection = new XMLHttpRequest();
	} else if( window.ActiveXObject ){

		var versions = [ "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp" ];
		
		for( var i = 0; i < versions.length; i++ ){
			try {
				_connection = new ActiveXObject(versions[i]);
			} catch( err ){}
		}

	}
	
}