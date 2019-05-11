function MokaDateFormatter(){
	this.extend(MokaFormatter);
	
	/*	Behavior	*/
	var _generatesCalendarDates = NO;
	var _isLenient = NO;
	var _twoDigitStartDate = MokaDate.dateWithNaturalLanguageString($s("1-1-1970"));
	
	/*	Attributes	*/
	var _AMSymbol = $s("");
	var _PMSymbol = $s("")
	var _calendar = MokaCalendar.currentCalendar();
	var _defaultDate = MokaDate.make().init();
	var _eraSymbols = $arr();
	var _monthSymbols = $arr();
	var _shortMonthSymbols = $arr();
	var _weekdaySymbols = $arr();
	var _shortWeekdaySymbols = $arr();
	var _dateStyle = MokaDateFormatterNoStyle;
	var _timeZone = MokaTimeZone.defaultTimeZone();
	
	
	
	
	
	
	
	//initialization
	/*id*/ this.init = function(){
		
	}
	
	//Behavior
	/*bool*/ this.generatesCalendarDates = function(){
		return _generatesCalendarDates;
	}
	/*void*/ this.setGeneratesCalendarDates = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_generatesCalendarDates = yn;
	}
	/*bool*/ this.isLenient = function(){
		return _isLenient;
	}
	/*void*/ this.setIsLenient = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_isLenient = yn;
	}
	/*MokeDate*/ this.twoDigitStartDate = function(){
		return _twoDigitStartDate;
	}
	/*void*/ this.setTwoDigitStartDate = function(aDate){
		if( !is(aDate,MokaDate) ){ return; }
		_twoDigitStartDate = aDate;
	}
	
	//Attributes
	/*MokaString*/ this.AMString = function(){
		return _AMString;
	}
	/*void*/ this.setAMString = function(aString){
		if( !is(aString,MokaString) ){ return; }
		_AMString = aString;
	}	
	/*MokaString*/ this.PMString = function(){
		return _PMString;
	}
	/*void*/ this.setPMString = function(aString){
		if( !is(aString,MokaString) ){ return; }
		_PMString = aString;
	}
	/*MokaCalendar*/ this.calendar = function(){
		return _calendar;
	}
	/*void*/ this.setCalendar = function(aCal){
		if( !is(aCal,MokaCalendar) ){ return; }
		_calendar = aCal;
	}
	/*MokaDate*/ this.dateFromString = function(aString){
		if( !is(aString,MokaString) ){ return this.generatesCalendarDates() ? MokaCalendarDate.make().init() : MokaDate.make().init(); }
		
	}
	/*MokaString*/ this.stringFromDate = function(aDate){
		if( !is(aDate,MokaDate) ){ return MokaDate.make().init().description(); }
		
	}
	/*bool*/ this.getObjectValueForStringWithRangeAndErrorDescription = function(jsarr, string, range, errorDescription){
		
		
	}
	/*MokaDate*/ this.defaultDate = function(){
		return _defaultDate;
	}
	/*void*/ this.setDefaultDate = function(aDate){
		if( !is(aDate,MokaDate) ){ return; }
		_defaultDate = aDate;
	}
	/*MokaArray*/ this.eraSymbols = function(){
		return _eraSymbols;
	}
	/*void*/ this.setEraSymbols = function(anArray){
		if( !is(anArray,MokaArray) ){ return; }
		_eraSymbols = anArray;
	}
	/*MokaArray*/ this.monthSymbols = function(){
		return _monthSymbols;
	}
	/*void*/ this.setMonthSymbols = function(arr){
		if( !is(arr,MokaArray) ){ return; }
		_monthSymbols = arr;
	}
	/*MokaArray*/ this.shortMonthSymbols = function(){
		return _shortMonthSymbols;
	}
	/*void*/ this.setShortMonthSymbols = function(arr){
		if( !is(arr,MokaArray) ){ return; }
		_shortMonthSymbols = arr;
	}
	/*MokaArray*/ this.weekdaySymbols = function(){
		return _weekdaySymbols;
	}
	/*void*/ this.setWeekdaySymbols = function(arr){
		if( !is(arr,MokaArray) ){ return; }
		_weekdaySymbols = arr;
	}
	/*MokaArray*/ this.shortWeekdaySymbols = function(){
		return _shortWeekdaySymbols;
	}
	/*void*/ this.setShortWeekdaySymbols = function(arr){
		if( !is(arr,MokaArray) ){ return; }
		_shortWeekdaySymbols = arr;
	}
	/*MokaDateStyle*/ this.dateStyle = function(){
		return _dateStyle;
	}
	/*void*/ this.setDateStyle = function(style){
		if( !is(style,"int") || style < MokaDateFormatterNoStyle || style > MokaDateFormatterFullStyle){ return; }
		_dateStyle = style;
	}
	/*MokaTimeZone*/ this.timeZone = function(){
		return _timeZone;
	}
	/*void*/ this.setTimeZone = function(tz){
		if( !is(tz,MokaTimeZone) ){ return; }
		_timeZone = tz;
	}
	
	
}

//Date styles
MokaDateFormatterNoStyle		= 0;
MokaDateFormatterShortStyle		= 1;
MokaDateFormatterMediumStyle	= 2;
MokaDateFormatterLongStyle		= 3;
MokaDateFormatterFullStyle		= 4;