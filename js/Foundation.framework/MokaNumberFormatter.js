function MokaNumberFormatter(){
	this.extend(MokaFormatter);
	
	/*	Formats	*/
	var _format = null;
	var _formatWidth = null;
	var _multiplier = 1;
	
	/*	Padding	*/
	var _paddingCharacter = $s("");
	var _paddingPosition = MokaNumberFormatterPadBeforePrefix;
	
	/*	Symbols	*/
	var _currencySymbol = $s("$");
	var _internationalCurrencySymbol = $s("\u00A4");
	var _percentSymbol = $s("%");
	var _perMillSymbol = $s("\u2030");
	var _minusSign = $s("\u2212");
	var _plusSign = $s("+");
	var _exponentSymbol = $("e");
	var _zeroSymbol = $s("0");
	var _nilSymbol = $s("\u2014")
	var _notANumberSymbol = $s("NaN");
	var _negativeInfinitySymbol = $s("\u2212\u221E")
	var _positiveInfinitySymbol = $s("+\u221E")
	
	/*	Prefixes	*/
	var _positivePrefix = null;
	var _negativePrefix = null;
	var _positiveSuffix = null;
	var _negativeSuffix = null;
	
	/*	Attributes	*/
	var _textAttributesForNegativeValues = null;
	var _textAttributesForPositiveValues = null;
	var _textAttributesForZero = null;
	var _textAttributesForNil = null;
	var _textAttributesForNotANumber = null;
	var _textAttributesForPositiveInfinity = null;
	var _textAttributesForNegativeInfinity = null;
	
	/*	Separators and Grouping Size	*/
	var _decimalSeparator = $s(".");
	var _alwaysShowsDecimalSeparator = NO;
	var _currencyDecimalSeparator = $s(".");
	var _usesGroupingSeparator = NO;
	var _groupingSeparator = $s(",");
	var _groupingSize = 3;
	var _secondaryGroupingSize = 3;
	
	/*	Localization	*/
	var _currencyCode = $s("USD");
	
	/*	Rounding Behavior	*/
	var _roundingIncrement = 0;
	var _roundingMode = MokaNumberFormatterRoundHalfEven
	
	/*	Limits	*/
	var _minimum = null
	var _maximum = null;
	var _minimumIntegerDigits = null
	var _minimumFractionDigits = null;
	var _maximumIntegerDigits = null;
	var _maximumFractionDigits = null;
	
	/*	Number style	*/
	var _numberStyle = MokaNumberFormatterNoStyle;
	
	
	
	
	
	
	
	
	//Formats
	/*int*/ this.multiplier = function(){
		return _multiplier;
	}
	/*void*/ this.setMultiplier = function(mult){
		if( !is(mult,"int") ){ return; }
		_multiplier = mult;
	}

	//Padding
	/*MokaString*/ this.paddingCharacter = function(){
		return _paddingCharacter;
	}
	/*void*/ this.setPaddingCharacter = function(str){
		if( !is(str,MokaString) ){ return; }
		_paddingCharacter = str;
	}
	/*MokaPaddingPosition*/ this.paddingPosition = function(){
		return _paddingPosition;
	}
	/*void*/ this.setPaddingPosition = function(paddingPosition){
		if( !is(paddingPosition,"int") || style < MokaNumberFormatterPadBeforePrefix || style > MokaNumberFormatterPadAfterSuffix ){ return; }
		_paddingPosition = paddingPosition;
	}
	
	//Symbols
	/*MokaString*/ this.currencySymbol = function(){
		return _currencySymbol;
	}
	/*void*/ this.setCurrencySymbol = function(s){
		if( !is(s,MokaString) ){ return; }
		_currencySymbol = s;
	}
	/*MokaString*/ this.internationalCurrencySymbol = function(){
		return _internationalCurrencySymbol;
	}
	/*void*/ this.setInternationalCurrencySymbol = function(s){
		if( !is(s,MokaString) ){ return; }
		_internationalCurrencySymbol = s;
	}
	/*MokaString*/ this.percentSymbol = function(){
		return _percentSymbol;
	}
	/*void*/ this.setPercentSymbol = function(s){
		if( !is(s,MokaString) ){ return; }
		_percentSymbol = s;
	}
	/*MokaString*/ this.permillSymbol = function(){
		return _permillSymbol;
	}
	/*void*/ this.setPermillSymbol = function(s){
		if( !is(s,MokaString) ){ return; }
		_permillSymbol = s;
	}
	/*MokaString*/ this.minusSign = function(){
		return _minusSign;
	}
	/*void*/ this.setMinusSign = function(s){
		if( !is(s,MokaString) ){ return; }
		_minusSign = s;
	}
	/*MokaString*/ this.plusSign = function(){
		return _plusSign;
	}
	/*void*/ this.setPlusSign = function(s){
		if( !is(s,MokaString) ){ return; }
		_plusSign = s;
	}
	/*MokaString*/ this.exponentSymbol = function(){
		return _exponentSymbol;
	}
	/*void*/ this.setExponentSymbol = function(s){
		if( !is(s,MokaString) ){ return; }
		_exponentSymbol = s;
	}
	/*MokaString*/ this.zeroSymbol = function(){
		return _zeroSymbol;
	}
	/*void*/ this.setZeroSymbol = function(s){
		if( !is(s,MokaString) ){ return; }
		_zeroSymbol = s;
	}
	/*MokaString*/ this.nilSymbol = function(){
		return _nilSymbol;
	}
	/*void*/ this.setNilSymbol = function(s){
		if( !is(s,MokaString) ){ return; }
		_nilSymbol = s;
	}
	/*MokaString*/ this.notANumberSymbol = function(){
		return _notANumberSymbol;
	}
	/*void*/ this.setNotANumberSymbol = function(s){
		if( !is(s,MokaString) ){ return; }
		_notANumberSymbol = s;
	}
	/*MokaString*/ this.negativeInfinitySymbol = function(){
		return _negativeInfinitySymbol;
	}
	/*void*/ this.setNegativeInfinitySymbol = function(s){
		if( !is(s,MokaString) ){ return; }
		_negativeInfinitySymbol = s;
	}
	/*MokaString*/ this.positiveInfinitySymbol = function(){
		return _positiveInfinitySymbol;
	}
	/*void*/ this.setPositiveInfinitySymbol = function(s){
		if( !is(s,MokaString) ){ return; }
		_positiveInfinitySymbol = s;
	}

	//Prefixes and suffixes
	/*MokaString*/ this.positivePrefix = function(){
		return _positivePrefix;
	}
	/*void*/ this.setPositivePrefix = function(s){
		if( !is(s,MokaString) ){ return; }
		_positivePrefix = s;
	}
	/*MokaString*/ this.negativePrefix = function(){
		return _negativePrefix;
	}
	/*void*/ this.setNegativePrefix = function(s){
		if( !is(s,MokaString) ){ return; }
		_negativePrefix = s;
	}
	/*MokaString*/ this.positiveSuffix = function(){
		return _positiveSuffix;
	}
	/*void*/ this.setPositiveSuffix = function(s){
		if( !is(s,MokaString) ){ return; }
		_positiveSuffix = s;
	}
	/*MokaString*/ this.negativeSuffix = function(){
		return _negativeSuffix;
	}
	/*void*/ this.setNegativeSuffix = function(s){
		if( !is(s,MokaString) ){ return; }
		_negativeSuffix = s;
	}
	
	//Test attributes
	/*MokaDictionary*/ this.textAttributesForNegativeValues = function(){
		return _textAttributesForNegativeValues;
	}
	/*void*/ this.setTextAttributesForNegativeValues = function(d){
		if( !is(d,MokaDictionary) ){ return; }
		_textAttributesForNegativeValues = d;
	}
	/*MokaDictionary*/ this.textAttributesForPositiveValues = function(){
		return _textAttributesForPositiveValues;
	}
	/*void*/ this.setTextAttributesForPositiveValues = function(d){
		if( !is(d,MokaDictionary) ){ return; }
		_textAttributesForPositiveValues = d;
	}
	/*MokaDictionary*/ this.textAttributesForZero = function(){
		return _textAttributesForZero;
	}
	/*void*/ this.setTextAttributesForZero = function(d){
		if( !is(d,MokaDictionary) ){ return; }
		_textAttributesForZero = d;
	}
	/*MokaDictionary*/ this.textAttributesForNil = function(){
		return _textAttributesForNil;
	}
	/*void*/ this.setTextAttributesForNil = function(d){
		if( !is(d,MokaDictionary) ){ return; }
		_textAttributesForNil = d;
	}
	/*MokaDictionary*/ this.textAttributesForNotANumber = function(){
		return _textAttributesForNotANumber;
	}
	/*void*/ this.setTextAttributesForNotANumber = function(d){
		if( !is(d,MokaDictionary) ){ return; }
		_textAttributesForNotANumber = d;
	}
	/*MokaDictionary*/ this.textAttributesForNegativeInfinity = function(){
		return _textAttributesForNegativeInfinity;
	}
	/*void*/ this.setTextAttributesForNegativeInfinity = function(d){
		if( !is(d,MokaDictionary) ){ return; }
		_textAttributesForNegativeInfinity = d;
	}
	/*MokaDictionary*/ this.textAttributesForPositiveInfinity = function(){
		return _textAttributesForPositiveInfinity;
	}
	/*void*/ this.setTextAttributesForPositiveInfinity = function(d){
		if( !is(d,MokaDictionary) ){ return; }
		_textAttributesForPositiveInfinity = d;
	}
	
	//Separators and groupings
	/*MokaString*/ this.decimalSeparator = function(){
		return _decimalSeparator;
	}
	/*void*/ this.setDecimalSeparator = function(s){
		if( !is(s,MokaString) ){ return; }
		_decimalSeparator = s;
	}
	/*bool*/ this.alwaysShowsDecimalSeparator = function(){
		return _alwaysShowsDecimalSeparator;
	}
	/*void*/ this.setAlwaysShowsDecimalSeparator = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_alwaysShowsDecimalSeparator = yn;
	}
	/*MokaString*/ this.currencyDecimalSeparator = function(){
		return _currencyDecimalSeparator;
	}
	/*void*/ this.setCurrencyDecimalSeparator = function(s){
		if( !is(s,MokaString) ){ return; }
		_currencyDecimalSeparator = s;
	}
	/*bool*/ this.usesGroupingSeparator = function(){
		return _usesGroupingSeparator;
	}
	/*void*/ this.setUsesGroupingSeparator = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_usesGroupingSeparator = yn;
	}
	/*MokaString*/ this.groupingSeparator = function(){
		return _groupingSeparator;
	}
	/*void*/ this.setGroupingSeparator = function(s){
		if( !is(s,MokaString) ){ return; }
		_groupingSeparator = s;
	}
	/*int*/ this.groupingSize = function(){
		return _groupingSize;
	}
	/*void*/ this.setGroupingSize = function(anInt){
		if( !is(anInt,"int",">= 0") ){ return; }
		_groupingSize = anInt;
	}
	/*int*/ this.secondaryGroupingSize = function(){
		return _secondaryGroupingSize;
	}
	/*void*/ this.setSecondaryGroupingSize = function(anInt){
		if( !is(anInt,"int",">= 0") ){ return; }
		_secondaryGroupingSize = anInt;
	}
	
	//Localization
	/*bool*/ this.localizesFormat = function(){
		 return _localizesFormat;
	}
	/*void*/ this.setLocalizesFormat = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_localizesFormat = yn;
	}
	/*MokaString*/ this.currencyCode = function(){
		return _currencyCode;
	}
	/*void*/ this.setCurrencyCode = function(s){
		if( !is(s,MokaString) ){ return; }
		_currencyCode = s;
	}
	
	//Rounding
	/*float*/ this.roundingIncrement = function(){
		return _roundingIncrement;
	}
	/*void*/ this.setRoundingIncrement = function(aFloat){
		if( !is(aFloat,"float") ){ return; }
		_roundingIncrement = aFloat;
	}
	/*MokaRoundingMode*/ this.roundingMode = function(){
		return _roundingMode;
	}
	/*void*/ this.setRoundingMode = function(mode){
		if( !is(mode,"int") || style < MokaNumberFormatterRoundCeiling || style > MokaNumberFormatterRoundHalfUp ){ return; }
		_roundingMode = mode;
	}
	
	//Limits
	/*float*/ this.minimum = function(){
		 return _minimum;
	}
	/*void*/ this.setMinimum = function(aFloat){
		if( (!is(aFloat,"float") && !is(aFloat,null)) || (this.maximum() && aFloat > this.maximum()) ){ return; }
		_minimum = aFloat;
	}
	/*float*/ this.maximum = function(){
		return _maximum;
	}
	/*void*/ this.setMaximum = function(aFloat){
		if( (!is(aFloat,"float") && !is(aFloat,null)) || (this.minimum() && aFloat < this.minimum()) ){ return; }
		_maximum = aFloat;
	}
	/*int*/ this.minimumIntegerDigits = function(){
		return _minumumIntegerDigits;
	}
	/*void*/ this.setMinimumIntegerDigits = function(anInt){
		if( (!is(anInt,"int") && !is(anInt,null)) || (this.maximumIntegerDigits() && anInt > this.maximumIntegerDigits()) ){ return; }
		_minimumIntegerDigits = anInt;
	}
	/*int*/ this.maximumIntegerDigits = function(){
		return _maximumIntegerDigits;
	}
	/*void*/ this.setMaximumIntegerDigits = function(anInt){
		if( (!is(anInt,"int") && !is(anInt,null)) || (this.minimumIntegerDigits() && anInt < this.minimumIntegerDigits()) ){ return; }
		_maximumIntegerDigits = anInt;
	}
	/*int*/ this.minimumFractionDigits = function(){
		return _minimumFractionDigits;
	}
	/*void*/ this.setMinimumFractionDigits = function(anInt){
		if( (!is(anInt,"int") && !is(anInt,null)) || (this.maximumFractionDigits() && anInt > this.maximumFractionDigits()) ){ return; }
		_minimumFractionDigits = anInt;
	}
	/*int*/ this.maximumFractionDigits = function(){
		return _maximumFractionDigits;
	}
	/*void*/ this.setMaximumFractionDigits = function(anInt){
		if( (!is(anInt,"int") && !is(anInt,null)) || (this.minimumFractionDigits() && anInt < this.minimumFractionDigits()) ){ return; }
		_maximumFractionDigits = anInt;
	}
	
	//Number style
	/*int*/ this.numberStyle = function(){
		return _numberStyle;
	}
	/*void*/ this.setNumberStyle = function(style){
		if( !is(style,"int") || style < MokaNumberFormatterNoStyle || style > MokaNumberFormatterSpellOutStyle ){ return; }
		_numberStyle = style;
	}
	
	//Converting between numbers and strings
	/*bool*/ this.getObjectValueForStringWithRangeAndErrorDescription = function(arr,string,range,errorString){
		
		
				
	}
	/*float*/ this.numberFromString = function(string){
		if( !is(string,MokaString) ){ return NaN; }
		
	}
	/*MokaString*/ this.stringFromNumber = function(aFloat){
		if( is(aFloat,"float") ){
			
		} else {
			//return appropriate NaN string
		}
	}
}
//Padding positions
MokaNumberFormatterPadBeforePrefix	= 0;
MokaNumberFormatterPadAfterPrefix	= 1;
MokaNumberFormatterPadBeforeSuffix	= 2;
MokaNumberFormatterPadAfterSuffix	= 3;

//Rounding modes
MokaNumberFormatterRoundCeiling		= 0;
MokaNumberFormatterRoundFloor		= 1;
MokaNumberFormatterRoundDown		= 2;
MokaNumberFormatterRoundUp			= 3;
MokaNumberFormatterRoundHalfEven	= 4;
MokaNumberFormatterRoundHalfDown	= 5;
MokaNumberFormatterRoundHalfUp		= 6;

//Styles
MokaNumberFormatterNoStyle			= 0;
MokaNumberFormatterDecimalStyle		= 1;
MokaNumberFormatterCurrencyStyle	= 2;
MokaNumberFormatterPercentStyle		= 3;
MokaNumberFormatterScientificStyle	= 4;
MokaNumberFormatterSpellOutStyle	= 5;