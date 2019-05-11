function MokaTimeZone(){
	this.extend(MokaObject);
	
	
	
	//Initialization
	/*id*/ this.initWithName = function(name){
		
	}
	
	//Getting information about the time zone
	/*MokaString*/ this.abbreviation = function(){
		
	}
	/*MokaString*/ this.abbreviationForDate = function(aDate){
		
	}
	/*MokaString*/ this.name = function(){
		
	}
	/*int*/ this.secondsFromGMT = function(){
		
	}
	/*int*/ this.secondsFromGMTForDate = function(aDate){
		
	}
	/*bool*/ this.isDaylightSavingTime = function(){
		
	}
	/*bool*/ this.isDaylightSavingTimeForDate = function(aDate){
		
	}
	
	//Comparing time zones
	/*bool*/ this.isEqualToTimeZone = function(aTimeZone){
		
	}
	
	//Description
	/*MokaString*/ this.description = function(){
		
	}
	
}
/*MokaTimeZone*/ MokaTimeZone.timeZoneWithAbbreviation = function(abbr){
	
}
/*MokaTimeZone*/ MokaTimeZone.timeZoneWithName = function(name){
	
}
/*MokaTimeZone*/ MokaTimeZone.defaultTimeZone = function(){
	
}
/*MokaTimeZone*/ MokaTimeZone.setDefaultTimeZone = function(){
	
}
/*MokaTimeZone*/ MokaTimeZone.systemTimeZone = function(){
	
}

MokaTimeZone.abbreviationDictionary = $dict();
MokaTimeZone.knownTimeZoneNames