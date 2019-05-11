function MokaPropertyListSerialization(){
	this.extend(MokaObject);
}
/*MokaString*/ MokaPropertyListSerialization.stringFromPropertyListWithFormatAndErrorDescription = function(plist,format,errorString){
	if( plist == undefined ){ return $s(""); }
	if( format != MokaPropertyListJSONFormat && format != MokaPropertyListXMLFormat ){ return $s(""); }
	if( errorString == undefined ){ return $s(""); }
	if( typeof(errorString.isKindOfClass) != "function" ){ return $s(""); }
	if( !errorString.isKindOfClass(MokaString) ){ return $s(""); }
	
	var stringContainer = [];
	var dateContainer = [];
	var arrayContainer = [];
	var dictContainer = [];
	if( format == MokaPropertyListJSONFormat ){
		stringContainer = ['$s("','")'];
		dateContainer = ['MokaDate.dateWithString($s("','"))'];
		arrayContainer = ["$arr(",")"];
		dictContainer = ["$dict(",")"];
	} else {
		stringContainer = ["<string>","</string>"];
		dateContainer = ["<date>","</date>"];
		arrayContainer = ["<array>","</array>"];
		dictContainer = ["<dictionary>","</dictionary>"];
	}
	
	if( typeof(plist) == "string" ){
		return $s('"'+plist+'"');
	} else if( MokaNumberIsFloat(plist) || typeof(plist) == "boolean" ){
		return $s(plist.toString());
	} else if( typeof(plist.isKindOfClass) == "function" ){
		if(plist.isKindOfClass(MokaString) ){
			return $s(stringContainer[0]+plist.characters()+stringContainer[1]);
		} else if( plist.isKindOfClass(MokaDate) ){
			return $s(dateContainer[0]+plist.toDescription().characters()+dateContainer[1]);
		} else if( plist.isKindOfClass(MokaArray) ){
			var serialization = arrayContainer[0]+"\n";
			for( var i = 0; i < plist.count(); i++ ){
				var s = MokaPropertyListSerialization.stringFromPropertyListWithFormatAndErrorDescription(	plist.objectAtIndex(i),
																											format,
																											errorString	);
				serialization += s.componentsSeparatedByString($s("\n")).map( function(component){
					return $s( "\t"+component.characters() );
				}).join("\n")+"\n";
			}
			serialization += arrayContainer[1];
			return $s(serialization);
		} else if( plist.isKindOfClass(MokaDictionary) ){
			var serialization = dictContainer[0]+"\n";
			var keys = plist.allKeys()
			for( var i = 0; i < keys.count(); i++ ){
				var key = keys.objectAtIndex(i);
				if( typeof(key.isKindOfClass) != "function" || !key.isKindOfClass(MokaString) ){ continue; }
				
				var s = MokaPropertyListSerialization.stringFromPropertyListWithFormatAndErrorDescription(	plist.objectForKey(key),
																											format,
																											errorString	);
				serialization += "\t"+stringContainer[0]+key.characters()+stringContainer[1]+"\n" + s.componentsSeparatedByString($s("\n")).map( function(component){
					return $s( "\t"+component.characters() );
				}).join("\n")+"\n";
			}
			return $s( serialization + dictContainer[1] );
		}
	} else {
		errorString.appendString($s(plist+" is not a valid propertylist."))
		return $s("");
	}
}
/*bool*/ MokaPropertyListSerialization.propertyListIsValidFormat = function(plist,format){
	
}
/*id*/ MokaPropertyListSerialization.propertyListFromStringWithFormatAndErrorDescription = function(plistString,format,errorString){
	if( plistString == undefined ){ return; }
	if( typeof(plistString.isKindOfClass) != "function" ){ return; }
	if( !plistString.isKindOfClass(MokaString) ){ return; }
	if( format != MokaPropertyListJSONFormat && format != MokaPropertyListXMLFormat ){ return; }
	if( errorString == undefined ){ return; }
	if( typeof(errorString.isKindOfClass) != "function" ){ return; }
	if( !errorString.isKindOfClass(MokaString) ){ return; }
	
	var plist;
	if( format == MokaPropertyListJSONFormat ){
		plist = eval(plistString.characters());
	} else {
		//...
	}
	
	if( plist == undefined ){ return; }
	if( typeof(plist) == "string" || typeof(plist) == "number" || typeof(plist) == "boolean" ){ return plist; }
	else if( typeof(plist.isKindOfClass) != "function" ){ return; }
	else if( !plist.isKindOfClass(MokaString) && !plist.isKindOfClass(MokaArray) && !plist.isKindOfClass(MokaDictionary) ){ return; }
	return plist;
}

MokaPropertyListJSONFormat	= 0;
MokaPropertyListXMLFormat	= 1;