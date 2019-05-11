function MokaBox(){
	this.extend( MokaView );

	/*	Border and title	*/
	var _borderType = MokaBezelBorder;
	var _boxType = MokaBoxPrimary;
	var _title = $s("");
	var _titlePosition = MokaNoTitle;
	var _titleCell = new MokaCell;
	var _titleFont = "sans-serif";
	
	/*	 Content margins	*/
	var _contentMargins = 0;
	
	/*	Skin	*/
	var _topLeft = document.createElement('div');
	_topLeft.setAttribute("id","topleft");
	this.skin().appendChild(_topLeft);
	
	var _top = document.createElement('div');
	_top.setAttribute("id","top");
	this.skin().appendChild(_top);
	
	var _topRight = document.createElement('div');
	_topRight.setAttribute("id","topright");
	this.skin().appendChild(_topRight);
	
	var _left = document.createElement('div');
	_left.setAttribute("id","left");
	this.skin().appendChild(_left);
	
	var _center = document.createElement('div');
	_center.setAttribute("id","center");
	this.skin().appendChild(_center);
	
	var _right = document.createElement('div');
	_right.setAttribute("id","right");
	this.skin().appendChild(_right);
	
	var _bottomLeft = document.createElement('div');
	_bottomLeft.setAttribute("id","bottomleft");
	this.skin().appendChild(_bottomLeft);
	
	var _bottom = document.createElement('div');
	_bottom.setAttribute("id","bottom");
	this.skin().appendChild(_bottom);
	
	var _bottomRight = document.createElement('div');
	_bottomRight.setAttribute("id","bottomRight");
	this.skin().appendChild(_bottomRight);
	
	
	
	
	
	
	
	
	//Initializing
	/*id*/ this.init = function(){
		this.supers().init();
		
		_title.init();
		_titleCell.initTextCell($s(""));
		_titleCell.setFontSize(14);
		
		$addClassToElement( "bezelborder", this.pageDisplay() );
		
		return this;
	}
		
	/*void*/ this.draw = function(){
		this.eraseAll();
		
		_top.style.width = (this.frame().size().width() - 20) + MokaPageSizeUnits;
		_left.style.height = (this.frame().size().height() - 20) + MokaPageSizeUnits;
		_center.style.width = (this.frame().size().width() - 20) + MokaPageSizeUnits;
		_center.style.height = (this.frame().size().height() - 20) + MokaPageSizeUnits;
		_right.style.height = (this.frame().size().height() - 20) + MokaPageSizeUnits;
		_bottom.style.width = (this.frame().size().width() - 20) + MokaPageSizeUnits;
		
		
		
		var containingDiv = document.createElement("div");
		containingDiv.style.width = this.frame().size().width() - 2*this.contentMargins() + "px";
		containingDiv.style.height = this.frame().size().height() - 2*this.contentMargins() - (this.titlePosition() == MokaTitleAboveTop ? 16 : (this.titlePosition() == MokaTitleAtTop ? 8 : 0 )) + "px";
		containingDiv.style.position = "absolute";
		containingDiv.style.left = this.contentMargins() + "px";
		containingDiv.style.top = this.contentMargins() + (this.titlePosition() == MokaTitleAboveTop ? 16 : (this.titlePosition() == MokaTitleAtTop ? 8 : 0 )) + "px";
		this.drawingCanvas().appendChild(containingDiv);
		
		for( var i = 0; i < this.subviews().count(); i++ ){
			containingDiv.appendChild( this.subviews().objectAtIndex(i).pageDisplay() );
		}
		
		//Draw the title
		if( this.titlePosition() != MokaNoTitle ){ this.drawCelInRectl(_titleCell,this.titleRect()); }
	}
	
	//modifying the border and title
	/*MokaBorderType*/ this.borderType = function(){
		return _borderType;
	}	
	/*void*/ this.setBorderType = function(aBorderType){
		if( !is(aBorderType,"int") || aBorderType < MokaNoBorder || aBorderType > MokaBezelBorder ){ return; }
		
		_borderType = aBorderType;
		
		var btype = "";
		switch(aBorderType){
			case MokaNoBorder: btype = "noborder"; break;
			case MokaLineBorder: btype = "lineborder"; break;
			case MokaGrooveBorder: btype = "grooveborder"; break;
			case MokaBezelBorder: btype = "bezelborder"; break;
		}
		
		$replaceClassOfElement( /noborder|lineborder|grooveborder|bezelborder/, btype, this.pageDisplay() );
		
		this.display();
	}
	/*MokaBoxType*/ this.boxType = function(){
		return _boxType
	}	
	/*void*/ this.setBoxType = function(aBoxType){
		if( aBoxType != 0 && aBoxType != 1 && aBoxType != 2 ){ return; }
		
		_boxType = aBoxType;
		this.display();
	}
	/*MokaString*/ this.title = function(){
		return _title;
	}	
	/*void*/ this.setTitle = function(aString){
		if( typeof aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		_title = aString;
		_titleCell.setTitle(_title);
		this.display();
	}
	/*string*/ this.titleFont = function(){
		return _titleFont;
	}
	/*void*/ this.setTitleFont = function(aFontFamily){
		if( typeof(aFontFamily) != "string" ){ return; }
		
		_titleFont = aFontFamily
		_titleCell.setFontFamily(aFontFamily);
		this.display();
	}
	/*MokaTitlePosition*/ this.titlePosition = function(){
		return _titlePosition;
	}
	/*void*/ this.setTitlePosition = function(aTitlePosition){
		if( aTitlePosition != 0 && aTitlePosition != 1 && aTitlePosition != 2 && aTitlePosition != 3 ){ return; }
		
		_titlePosition = aTitlePosition;
		this.display();
	}
	/*MokaRect*/ this.titleRect = function(){
		return MokaRect.rectWithOriginAndSize(new MokaPoint(10,2), new MokaSize(this.frame().size().width() - 10,16));
	}
	
	//Setting the content frame and margins
	/*void*/ this.setFrameFromContentFrame = function(aFrame){
		if( typeof(aFrame.isKindOfClass) != "function" ){ return; }
		if( !aFrame.isKindOfClass(MokaRect) ){ return; }
		
		var newFrame = aFrame.copy();
		
		newFrame.size().setWidth(newFrame.size().width() - 2*this.contentMargins());
		newFrame.size().setHeight(newFrame.size().height() - 2*this.contentMargins() - (this.titlePosition() == MokaTitleAboveTop ? 16 : (this.titlePosition() == MokaTitleAtTop ? 8 : 0 )) );
		newFrame.origin().setX(newFrame.origin().x() - this.contentMargins());
		newFrame.origin().setY(newFrame.origin().y() - this.contentMargins() - (this.titlePosition() == MokaTitleAboveTop ? 16 : (this.titlePosition() == MokaTitleAtTop ? 8 : 0 )));
		
		this.setFrame(newFrame);
	}
	/*float*/ this.contentMargins = function(){
		return _contentMargins;
	}
	/*void*/ this.setContentMargins = function(aFloat){
		if( typeof aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		_contentMargins = aFloat;
		this.display();
	}
	/*void*/ this.sizeToFit = function(){
		var lowestX = 0;
		var highestX = 0;
		var lowestY = 0;
		var highestY = 0;
		
		var enumerator = this.subviews().enumerator();
		var subview;
		while( subview = enumerator.nextObject() ){
			if( subview.frame().origin().x() < lowestX ){ lowestX = subview.frame().origin().x(); }
			if( subview.frame().origin().x() + subview.frame().size().width() > highestX ){ highestX = subview.frame().origin().x() + subview.frame().size().width(); }
			if( subview.frame().origin().y() < lowestY ){ lowestY = subview.frame().origin().y(); }
			if( subview.frame().origin().y() + subview.frame().size().height() > highestY ){ highestY = subview.frame().origin().y() + subview.frame().size().height(); }
		}
		
		var newOrigin = MokaPoint.origin();
		if( this.superview() ){
			newOrigin = new MokaPoint( this.frame().origin().x() + lowestX, this.frame().origin().y() + lowestY );
		}
		var newSize = new MokaSize( highestX - lowestX, highestY - lowestY );
		this.setFrame(newOrigin,newSize);
		
		enumerator = this.subviews().enumerator();
		while( subview = enumerator.nextObject() ){
			subview.setFrameOrigin( new MokaSize(subview.frame().origin().x() - lowestX, subview.frame().origin().y() - lowestY) );
		}
	}
	
}

//Title positions
MokaNoTitle				= 0;
MokaTitleAboveTop		= 1;
MokaTitleAtTop			= 2;
MokaTitleBelowTop		= 3;

//Border types
MokaNoBorder		= 0;
MokaLineBorder		= 1;
MokaGrooveBorder	= 2;
MokaBezelBorder		= 3;

//Box types
MokaBoxPrimary		= 0;	// no background darkening
MokaBoxSecondary	= 1;	// background darkening
MokaBoxSeparator	= 2;	// box simply displays a solid line along its longest axis