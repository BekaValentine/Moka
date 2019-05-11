function MokaDate(){
	this.extend(MokaObject);
	
	//Time in seconds
	var _secondsSince1970 = MokaDate.timeIntervalSince1970();
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.initWithTimeIntervalSince1970( this.timeIntervalSince1970() )
		
		return copy;
	}
	
	//initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		return this;
	}
	/*id*/ this.initWithString = function(aString){
		this.supers().init();
		
		if( aString == undefined ){ return this; }
		if( typeof(aString.isKindOfClass) != "function" ){ return this; }
		if( !aString.isKindOfClass(MokaString) ){ return this; }
		
		var parts = aString.componentsSeparatedByString($s(" "));
		var ymd = parts.objectAtIndex(0).componentsSeparatedByString($s("-"));
		var hms = parts.objectAtIndex(1).componentsSeparatedByString($s(":"));
		var offset = parts.objectAtIndex(2);
		
		var d = new Date;
		d.setUTCFullYear(ymd.obectAtIndex(0)*1);
		d.setUTCMonth(ymd.objectAtIndex(1)*1);
		d.setUTCDate(ymd.objectAtIndex(2)*1);
		d.setUTCHours(hms.objectAtIndex(0)*1);
		d.setUTCMinutes(hms.objectAtIndex(1)*1);
		d.setUTCSeconds(hms.objectAtIndex(2)*1);
		
		var seconds = d.valueOf();
		seconds += ( offset.charAt(0) == "-" ? 1 : -1 )*3600*((offset.charAt(1) + offset.charAt(2))*60 + (offset.charAt(3) + offset.charAt(4))*1);
		
		/*var year = ymd.objectAtIndex(0).characters()*1;
		var month = ymd.objectAtIndex(1).characters()*1;
		var seconds = ymd.objectAtIndex(2).characters()*86400 + hms.objectAtIndex(0).characters()*3600 + hms.objectAtIndex(1).characters()*60 + hms.objectAtIndex(2).characters()*1;
		seconds += ( offset.charAt(0) == "-" ? 1 : -1 )*3600*((offset.charAt(1) + offset.charAt(2))*60 + (offset.charAt(3) + offset.charAt(4))*1);
		
		if( month == 2 ){
			seconds += (28 + ((year%4 == 0 && year%100 != 0) || year%400 == 0 ) ? 1 : 0))*86400;
		} else {
			seconds += (month == 4 || month == 6 || month == 9 || month == 11 ? 30 : 31)*86400;
		}
		
		//seconds == seconds to date, excluding years
		
		var yearsSince1970 = year - 1970;
		if( yearsSince1970 >= 0 && yearsSince1970 <= 3 ){
			if( yearsSince1970 == 1 || yearsSince1970 == 2 ){
				seconds += yearsSince1970*365*86400;
			} else {
				seconds += (yearsSince1970*365 + 366)*86400;
			}
		} else if( yearsSince1970 > 3 ){
			seconds += (2*365 + 366)*86400;
			var yearsAfter1972Ended = (yearsSince1970 - 3);
			var numberOfLeapYearBlocks = yearsAfter1972Ended - yearsAfter1972Ended%4;
			seconds += numberOfLeapYearBlocks*(3*365 + 366)*86400;
			var yearsBeyondLeapYearBlocks = yearsAfter1972Ended - numberOfLeapYearBlocks*4;
			seconds += yearsBeyondLeapYearBlocks*365*86400;
		} else if( yearsSince1970 < -1 ){
			seconds += -365*86400;
			var yearsBefore1969Started = yearsSince1970 + 1;
			var numberOfLeapYearBlocks = yearsBefore1969Started + (-yearsBefore1969Started)%4;
			seconds -= numberOfLeapYearBlocks*(3*365 + 366)*86400;
			var yearsBeyondLeapYearBlocks = yearsBefore1969Started + numberOfLeapYearBlocks*4;
			seconds += -365*yearsBeyondLeapYearBlocks;
		}
		// if -1 <= yearsSince1970 <= 0 then the year is 1969 and there are no seconds contributed by the year
			
		*/
		return this.initWithTimeIntervalSince1970(seconds);
	}
	/*id*/ this.initWithTimeIntervalSinceNow = function(seconds){
		this.supers().init();
		
		if( seconds == undefined ){ return this; }
		if( !MokaNumberIsFloat(seconds) ){ return this; }
		
		_secondsSince1970 = MokaDate.timeIntervalSince1970() + seconds;
		
		return this;
	}
	/*id*/ this.initWithTimeIntervalSince1970 = function(seconds){
		this.supers().init();
		
		if( seconds == undefined ){ return this; }
		if( !MokaNumberIsFloat(seconds) ){ return this; }
		
		_secondsSince1970 = seconds;
		
		return this;
	}
	
	//Getting modified dates
	/*id*/ this.addTimeInterval = function(seconds){
		if( seconds == undefined ){ return new MokaDate; }
		if( !MokaNumberIsInt(seconds) ){ return new MokaDate; }
		
		return MokaDate.dateWithTimeIntervalSince1970(_secondsSince1970 + seconds);
	}
	
	//Comparing dates
	/*bool*/ this.isEqualToDate = function(aDate){
		if( aDate == undefined ){ return this; }
		if( typeof(aDate.isKindOfClass) != "function" ){ return this; }
		if( !aDate.isKindOfClass(MokaDate) ){ return this; }
		
		return this.timeIntervalSince1970() == aDate.timeIntervalSince1970();
	}
	/*MokaDate*/ this.earlierDate = function(aDate){
		if( aDate == undefined ){ return this; }
		if( typeof(aDate.isKindOfClass) != "function" ){ return this; }
		if( !aDate.isKindOfClass(MokaDate) ){ return this; }
		
		if( this.timeIntervalSinceDate(aDate) <= 0 ){ return this; }
		return aDate;
	}
	/*MokaDate*/ this.laterDate = function(aDate){
		if( aDate == undefined ){ return this; }
		if( typeof(aDate.isKindOfClass) != "function" ){ return this; }
		if( !aDate.isKindOfClass(MokaDate) ){ return this; }
		
		if( this.timeIntervalSinceDate(aDate) >= 0 ){ return this; }
		return aDate;
	}
	/*MokaCompareResult*/ this.compare = function(aDate){
		if( aDate == undefined ){ return null; }
		if( typeof(aDate.isKindOfClass) != "function" ){ return null; }
		if( !aDate.isKindOfClass(MokaDate) ){ return null; }
		
		if( this.timeIntervalSince1970() == aDate.timeIntervalSince1970() ){ return MokaOrderedSame; }
		else if( this.timeIntervalSince1970() > aDate.timeIntervalSince1970() ){ return MokaOrderedDescending; }
		return MokaOrderedAscending;
	}
	
	//Getting time intervals
	/*float*/ this.timeIntervalSinceDate = function(aDate){
		if( aDate == undefined ){ return 0; }
		if( typeof(aDate.isKindOfClass) != "function" ){ return 0; }
		if( !aDate.isKindOfClass(MokaDate) ){ return 0; }
		
		return this.timeIntervalSince1970() - aDate.timeIntervalSince1970();
	}
	/*float*/ this.timeIntervalSinceNow = function(){
		return this.timeIntervalSince1970() - MokaDate.timeIntervalSince1970();
	}
	/*float*/ this.timeIntervalSince1970 = function(){
		return _secondsSince1970;
	}
	
	//Descriptions
	/*MokaString*/ this.description = function(){
		return MokaCalendarDate.dateWithTimeIntervalSince1970(this.timeIntervalSince1970).description();
	}
	/*MokaString*/ this.descriptionWithCalendarFormatAndTimeZone = function(format,timezone){
		if( format == undefined ){ return; }
		if( typeof(format.isKindOfClass) != "function" ){ return; }
		if( !format.isKindOfClass(MokaString) ){ return; }
		if( timezone == undefined ){ return; }
		if( typeof(timezone.isKindOfClass) != "function" ){ return; }
		if( !timezone.isKindOfClass(MokaTimeZone) ){ return; }
		
		return MokaCalendarDate.dateWithTimeIntervalSince1970(this.timeIntervalSince1970).descriptionWithCalendarFormatAndTimeZone(format,timezone);
	}
	
	/*string*/ this.toString = function(){
		return this.description() + "";
	}
		
	//Calendar dates
	/*MokaCalendarDate*/ this.dateWithCalendarFormatAndTimeZone = function(format,timezone){
		if( format == undefined ){ return MokaCalendarDate.dateWithString(this.description()); }
		if( typeof(format.isKindOfClass) != "function" ){ return MokaCalendarDate.dateWithString(this.description()); }
		if( !format.isKindOfClass(MokaString) ){ return MokaCalendarDate.dateWithString(this.description()); }
		if( timezone == undefined ){ return MokaCalendarDate.dateWithString(this.description()); }
		if( typeof(timezone.isKindOfClass) != "function" ){ return MokaCalendarDate.dateWithString(this.description()); }
		if( !timezone.isKindOfClass(MokaTimeZone) ){ return MokaCalendarDate.dateWithString(this.description()); }
		
		var d = MokaCalendarDate.dateWithStringAndCalendarFormat(this.description(),format);
		d.setTimeZome(timeZone);
		
		return d;
	}
	
}
/*MokaDate*/ MokaDate.now = function(){
	return this.make().init();
}
/*MokaDate*/ MokaDate.dateWithString = function(aString){
	var d = new this;
	return d.initWithString(aString);
}
/*MokaDate*/ MokaDate.dateWithTimeIntervalSinceNow = function(seconds){
	var d = new this;
	return d.initWithTimeIntervalSinceNow(seconds);
}
/*MokaDate*/ MokaDate.dateWithTimeIntervalSince1970 = function(seconds){
	var d = new this;
	return d.initWithTimeIntervalSince1970(seconds);
}
/*MokaDate*/ MokaDate.distantFuture = function(){
	var d = new this;
	d.initWithTimeIntervalSince1970(Number.POSITIVE_INFINITY);
	return d;
}
/*MokaDate*/ MokaDate.distantPast = function(){
	var d = new this;
	d.initWithTimeIntervalSince1970(Number.NEGATIVE_INFINITY);
	return d;
}
/*float*/ MokaDate.timeIntervalSince1970 = function(){
	return Date.now()/1000;
}
