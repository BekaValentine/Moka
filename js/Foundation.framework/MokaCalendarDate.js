function MokaCalendarDate(){
	this.extend(MokaDate);
	
	/*	Format string	*/
	var _formatString = $s("%Y-%m-%d %H:%M:%S %z");
	
	/*	Time zone	*/
	var _timeZone = MokaTimeZone.defaultTimeZone();
	
	
	
	
	//Initialization
	/*id*/ this.initWithString = function(dateString){
		
	}	
	/*id*/ this.initWithStringAndCalendarFormat = function(dateString,format){
		
	}
	/*id*/ this.initWithElements = function(year,month,day,hour,minute,second,timeZone){
		
	}
	
	//Retrieving date elements
	/*int*/ this.dayOfMonth = function(){
		return (new Date(this.timeIntervalSince1970())).getUTCDate();
	}
	/*int*/ this.dayOfWeek = function(){
		return (new Date(this.timeIntervalSince1970())).getUTCDay();
	}
	/*int*/ this.dayOfYear = function(){
		var theDate = new Date(this.timeIntervalSince1970());
		var daysUpTillMonth = [	0,
								31,
								31+28,
								31+28+31,
								31+28+31+30,
								31+28+31+30+31,
								31+28+31+30+31+30,
								31+28+31+30+31+30+31,
								31+28+31+30+31+30+31+31,
								31+28+31+30+31+30+31+31+30,
								31+28+31+30+31+30+31+31+30+31,
								31+28+31+30+31+30+31+31+30+31+30];
		
		return (daysUpTillMonth[theDate.getUTCMonth()-1] + theDate.getUTCDay())
	}
	/*int*/ this.hourOfDay = function(){
		return (new Date(this.timeIntervalSince1970())).getUTCHours();
	}
	/*int*/ this.minuteOfHour = function(){
		return (new Date(this.timeIntervalSince1970())).getUTCMinutes();
	}
	/*int*/ this.monthOfYear = function(){
		return (new Date(this.timeIntervalSince1970())).getUTCMonth();
	}
	/*int*/ this.secondOfMinute = function(){
		return (new Date(this.timeIntervalSince1970())).getUTCSeconds();
	}
	/*int*/ this.yearOfCommonEra = function(){
		return (new Date(this.timeIntervalSince1970())).getUTCFullYear();
	}
	
	//Adjusting a date
	/*MokaCalendarDate*/ this.dateByAddingComponents = function(years,months,days,hours,minutes,seconds){
		if( years == undefined ){ return; }
		if( !MokaNumberIsInt(years) ){ return; }
		if( months == undefined ){ return; }
		if( !MokaNumberIsInt(months) ){ return; }
		if( days == undefined ){ return; }
		if( !MokaNumberIsInt(days) ){ return; }
		if( hours == undefined ){ return; }
		if( !MokaNumberIsInt(hours) ){ return; }
		if( minutes == undefined ){ return; }
		if( !MokaNumberIsInt(minutes) ){ return; }
		if( seconds == undefined ){ return; }
		if( !MokaNumberIsInt(seconds) ){ return; }
		
		return this.addTimeInterval( MokaCalendarDate.dateWithElements(years,months,days,hours,minutes,seconds).timeIntervalSince1970() );
	}
	
	//Computing date intervals
	/*Object*/ this.componentsSinceDate = function(aCalendarDate){
		if( aCalendarDate == undefined ){ return; }
		if( typeof(aCalendarDate.isKindOfClass) != "function" ){ return; }
		if( !aCalendarDate.isKindOfClass(MokaCalendarDate) ){ return; }
		
		var d = this.timeIntervalSinceDate(aCalendarDate);
		
		return	{	years: 		d.yearOfCommonEra(),
					months: 	d.monthOfYear(),
					days: 		d.dayOfMonth(),
					hours: 		d.hourOfDay(),
					minutes:	d.minuteOfHour(),
					seconds: 	d.secondOfMinute() };
	}
	
	//Descriptions
	/*MokaString*/ this.description = function(){
		return this.descriptionWithCalendarFormatAndTimeZone(this.calendarFormat(),this.timeZone())
	}
	/*MokaString*/ this.descriptionWithCalendarFormatAndTimeZone = function(format,timezone){
		if( format == undefined ){ return this.description(); }
		if( typeof(format.isKindOfClass) != "function" ){ return this.description(); }
		if( !format.isKindOfClass(MokaString) ){ return this.description(); }
		if( timeZone == undefined ){ return; }
		if( typeof(timeZone.isKindOfClass) != "function" ){ return; }
		if( !timeZone.isKindOfClass(MokaTimeZone) ){ return; }
	
		
		var theDate = new Date(this.timeIntervalSince1970()*1000);
		var dateString = format.copy();
		
		var abbrWeekdays = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
		var fullWeekdays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
		var abbrMonths = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
		var fullMonths = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		var daysUpTillMonth = [	0,
								31,
								31+28,
								31+28+31,
								31+28+31+30,
								31+28+31+30+31,
								31+28+31+30+31+30,
								31+28+31+30+31+30+31,
								31+28+31+30+31+30+31+31,
								31+28+31+30+31+30+31+31+30,
								31+28+31+30+31+30+31+31+30+31,
								31+28+31+30+31+30+31+31+30+31+30];
		
		var shortYear = $s(""+theDate.getUTCFullYear());
		var secondsFromGMT = timeZone.secondsFromGMTForDate(this);
		var hoursFromGMT = (secondsFromGMT - secondsFromGMT%60)/60;
		secondsFromGMT -= secondsFromGMT - secondsFromGMT%60;
		dateString.replaceAllMatchingStrings($dict(	$s("%a"),	$s(abbrWeekdays[theDate.getUTCDay()]),
													$s("%A"),	$s(fullWeekdays[theDate.getUTCDay()]),
													$s("%b"),	$s(abbrMonths[theDate.getUTCMonth()]),
													$s("%B"),	$s(fullMonths[theDate.getUTCMonth()]),
													$s("%d"),	$s( (theDate.getUTCDay() < 10 ? "0" : "") + theDate.getUTCDate() ),
													$s("%e"),	$s(""+theDate.getUTCDay()),
													$s("%F"),	$s(""+theDate.getUTCMilliseconds()),
													$s("%H"),	$s((theDate.getUTCHours() < 10 ? "0" : "")+theDate.getUTCHours()),
													$s("%I"),	$s((theDate.getUTCHours() < 10 ? "0" : "")+(theDate.getUTCHours() > 12 ? theDate.getUTCHours()/2 : theDate.getUTCHours())),
													$s("%j"),	$s(""+(daysUpTillMonth[theDate.getUTCMonth()-1] + theDate.getUTCDay())),
													$s("%m"),	$s((theDate.getUTCMonth() < 10 ? "0" : "")+theDate.getUTCMonth()),
													$s("%M"),	$s((theDate.getUTCMinutes() < 10 ? "0" : "")+theDate.getUTCMinutes()),
													$s("%p"),	$s((theDate.getUTCHours() < 12 ? "AM" : "PM")),
													$s("%S"),	$s((theDate.getUTCSeconds() < 10 ? "0" : "")+theDate.getUTCSeconds()),
													$s("%w"),	$s(""+theDate.getUTCDay()),
													$s("%y"),	shortYear.substringWithRange(shortYear.length()-2,2),
													$s("%Y"),	$s(""+theDate.getUTCFullYear()),
													$s("%Z"),	timeZone.abbreviationForDate(this),
													$s("%Z"),	$s( (hoursFromGMT < 10 ? "0" : "")+hoursFromGMT + (secondsFromGMT < 10 ? "0" : "")+secondsFromGMT ),
													$s("%%"),	$s("%")	));
		
		return dateString;
	}
	
	//Calendar formats
	/*MokaString*/ this.calendarFormat = function(){
		return _calendarFormat;
	}
	/*void*/ this.setCalendarFormat = function(formatString){
		if( formatString == undefined ){ return; }
		if( typeof(formatString.isKindOfClass) != "function" ){ return; }
		if( !formatString.isKindOfClass(MokaString) ){ return; }
		
		_calendarFormat = formatString;
	}
	
	//Time zone
	/*MokaTimeZone*/ this.timeZone = function(){
		return _timeZone;
	}
	/*void*/ this.setTimeZone = function(aTimeZone){
		if( aTimeZone == undefined ){ return; }
		if( typeof(aTimeZone.isKindOfClass) != "function" ){ return; }
		if( !aTimeZone.isKindOfClass(MokaTimeZone) ){ return; }
		
		_timeZone = aTimeZone;
	}
	
}
/*MokaCalendarDate*/ MokaCalendarDate.calendarDate = function(){
	return this.make().init();
}
/*MokaCalendarDate*/ MokaCalendarDate.dateWithStringAndCalendarFormat = function(dateString,format){
	return this.make().initWithStringAndCalendarFormat(dateString,format);
}
/*MokaCalendarDate*/ MokaCalendarDate.dateWithElements = function(year,month,day,hour,minute,second,timeZone){
	return this.make().initWithElements(year,month,day,hour,minute,second,timeZone);
	
}
