function MokaDatePicker(){
	this.extend(MokaControl);
	
	/*	Appearance	*/
	var _isBezeled = YES;
	var _isBordered = YES;
	var _backgroundColor = MokaColor.whiteColor();
	var _drawsBackground = YES;
	var _textColor = MokaColor.blackColor();
	var _datePickerStyle = MokaTextFieldAndStepperDatePickerStyle;
	
	/*	Range mode control	*/
	var _calendar = MokaCalendar.currentCalendar();
	var _datePickerMode = MokaSingleDateMode;
	var _timeZone = MokaTimeZone.localTimeZone();
	
	/*	Object value	*/
	var _dateValue = null;
	var _timeInterval = 0;
	var _datePickerElement = MokaHourMinuteSecondDatePickerElementFlag | MokaYearMonthDayDatePickerElementFlag;
	
	/*	Contraints on range	*/
	var _minDate = null;
	var _maxDate = null;
	
	/*	Delegate	*/
	var _delegate = null;
	
	
	
	
	
	//Setting appearance
	/*bool*/ this.isBezeled = function(){
		return _isBezeled;
	}
	/*void*/ this.setIsBezeled = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_isBezeled = yn;
		this.display();
	}
	/*bool*/ this.isBordered = function(){
		return _isBordered;
	}
	/*void*/ this.setIsBordered = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_isBordered = yn;
		this.display();
	}
	/*MokaColor*/ this.backgroundColor = function(){
		return _backgroundColor;
	}
	/*void*/ this.setBackgroundColor = function(color){
		if( !is(color,MokaColor) ){ return; }
		_backgroundColor = color;
		this.display();
	}
	/*bool*/ this.drawsBackground = function(){
		return _drawsBackground;
	}
	/*void*/ this.setDrawsBackground = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_drawsBackground = yn;
		this.display();
	}
	/*MokaColor*/ this.textColor = function(){
		return _textColor;
	}
	/*void*/ this.setTextColor = function(color){
		if( !is(color,MokaColor) ){ return; }
		_textColor = color;
		this.display();
	}
	/*MokaDatePickerStyle*/ this.datePickerStyle = function(){
		return _datePickerStyle;
	}
	/*void*/ this.setDatePickerStyle = function(style){
		if( !is(style,"int") || style < MokaTextFieldAndStepperDatePickerStyle || style > MokaClockAndCalendarDatePickerStyle ){ return; }
		_datePickerStyle = style;
		this.display();
	}
	
	//Range mode control
	/*MokaCalendar*/ this.calendar = function(){
		return _calendar;
	}
	/*void*/ this.setCalendar = function(cal){
		if( !is(cal,MokaCalendar) ){ return; }
		_calendar = cal;
		this.display();
	}
	/*MokaDatePickerMode*/ this.datePickerMode = function(){
		return _datePickerMode;
	}
	/*void*/ this.setDatePickerMode = function(mode){
		if( !is(mode,"int") || mode < MokaSingleDateMode || mode > MokaRangeDateMode ){ return; }
		_datePickerMode = mode;
		this.display();
	}
	/*MokaTimeZone*/ this.timeZone = function(){
		return _timeZone;
	}
	/*void*/ this.setTimeZone = function(tz){
		if( !is(tz,MokaTimeZone) ){ return; }
		_timeZone = tz;
		this.display();
	}
	
	//Object value
	/*MokaDate*/ this.dateValue = function(){
		return _dateValue;
	}
	/*void*/ this.setDateValue = function(date){
		if( !is(date,MokaDate) ){ return; }
		_dateValue = date;
		this.display();
	}
	/*int*/ this.timeInterval = function(){
		return 0;
	}
	/*void*/ this.setTimeInterval = function(interval){
		
	}
	/*MokaDatePickerElementsFlag*/ this.datePickerElements = function(){
		return _datePickerElements;
	}
	/*void*/ this.setDatePickerElements = function(flags){
		if( !is(flags,"int") || flags < MokaHourMinuteDatePickerElementFlag || flags > MokaEraDatePickerElementFlag ){ return; }
		_datePickerElements = flags;
		this.display();
	}
	
	//Constraints
	/*MokaDate*/ this.minDate = function(){
		return _minDate;
	}
	/*void*/ this.setMinDate = function(date){
		if( !is(date,MokaDate) ){ return; }
		_minDate = date;
		this.display();
	}
	/*MokaDate*/ this.maxDate = function(){
		return _maxDate;
	}
	/*void*/ this.setMaxDate = function(date){
		if( !is(date,MokaDate) ){ return; }
		_maxDate = date;
		this.display();
	}
	
	//Delegate
	/*id*/ this.delegate = function(){
		return _delegate;
	}
	/*void*/ this.setDelegate = function(obj){
		if( !is(obj,MokaObject) ){ return; }
		_delegate = obj;
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		
	}
	
	//Event handling
	
}

//MokaDatePickerStyle
MokaTextFieldAndStepperDatePickerStyle	= 0;
MokaClockAndCalendarDatePickerStyle		= 1;

//MokaDatePickerModa
MokaSingleDateMode	= 0;
MokaRangeDateMode	= 1; //Unimplemented

//MokaDatePickerElementFlags
MokaHourMinuteDatePickerElementFlag			= 1 << 0;
MokaHourMinuteSecondDatePickerElementFlag	= 1 << 1;
MokaTimeZoneDatePickerElementFlag			= 1 << 2; //Unimplemented
MokaYearMonthDatePickerElementFlag			= 1 << 3;
MokaYearMonthDayDatePickerElementFlag		= 1 << 4;
MokaEraDatePickerElementFlag				= 1 << 5; //Unimplemented