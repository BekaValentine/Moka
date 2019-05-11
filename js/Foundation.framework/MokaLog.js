/*void*/ function MokaLog( ls ){
	if( ls == undefined ){
		ls = "Unable to log undefined from " + arguments.caller.className() + ". Expected an object or string.";
		return;
	}
	if( !is(MokaLog._logRecord,String) ){
		MokaLog._logRecord = "";
	}
	
	MokaLog._logRecord += MokaDate.now()+"\n"+ls+"\n\n";
}