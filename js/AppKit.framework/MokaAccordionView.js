function MokaAccordionView(){
	this.extent(MokaView);
	
	/*	Titles	*/
	var _titles = MokaDictionary.make().init();
	
	/*	Subview Sizes	*/
	var _subviewSizes = MokaDictionary.make().init();
	
	/*	Utility Views	*/
	var _utilityViews = MokaDictionary.make().init();
	
	/* Appearance	*/
	var _isVertical = NO;
	
	/*	Behavior	*/
	var _allowsMultipleOpenSubviews = YES;
	var _animates = NO;
	var _focusesOnOpenedSubview = NO;
	var _addsSubviewsAsOpen = YES;
	var _allowsReordering = NO;
	
	
	
	
	
	
	
	
	//Initialization
	/*id*/ this.initWithSubviews = function(subviews){
		this.supers().init();
		
		if( !is(subviews,MokaDictionary) ){ return this; }
		
		for( var i = 0; i < subviews.count(); i++ ){
			var title = subviews.allKeys().objectAtIndex(i);
			if( !is(title,MokaString) ){
				title = $s("Subview " + i);
			}
			var v = subviews.allObjects().objectAtIndex(i);
			if( is(v,MokaView) ){
				this.addSubviewWithTitle(v,title);
			}
		}
		
		return this;
	}
	
	//Managing titles
	/*MokaString*/ this.titleOfSubview = function(aView){
		if( !is(aView,MokaView) || this.subviews().containsObject(aView) ){ return; }
		return _titles.objectForKey(aView) || $s("Subview " + this.subviews().indexOfObject(aView));
	}
	/*void*/ this.setTitleOfSubview = function(aTitle,aView){
		if( !is(aTitle,MokaString) || !is(aView,MokaView) ){ return; }
		_titles.setObjectForKey(aTitle,aView);
	}
	/*MokaString*/ this.titleOfSubviewAtIndex = function(anIndex){
		if( !is(anIndex,"int") || anIndex < 0 || anIndex >= this.subviews().count() ){ return; }
		return this.titleOfSubview(this.subviews().objectAtIndex(anIndex));
	}
	/*void*/ this.setTitleOfSubviewAtIndex = function(aTitle,anIndex){
		if( !is(aTitle,MokaString) || !is(anIndex,"int") || anIndex < 0 || anIndex >= this.subviews().count() ){ return; }
		this.setTitleOfSubview(aTitle,this.subviews().objectAtIndex(anIndex));
	}
	/*void*/ this.addSubviewWithTitle = function(aView,aTitle){
		if( !is(aView,MokaView) || !is(aTitle,MokaString) ){ return; }
		this.addSubview(aView);
		_titles.setObjectForKey(aTitle,aView);
		
		if( this.isVertical() ){
			_subviewSizes.setObjectForKey( new MokaSize(this.frame().size().height(),aView.frame().size().width() ));
		} else {
			_subviewSizes.setObjectForKey( new MokaSize(aView.frame().size().height(),this.frame().size().width() ));
		}
	}
	/*MokaView*/ this.subviewsWithTitle = function(aTitle){
		if( !is(aTitle,MokaString) ){ return; }
		return _titles.objectsForKeys(_titles.allKeysForObject(aTitle));
	}
	/*MokaView*/ this.indexesOfSubviewsWithTitle = function(aTitle){
		var subviews = this.subviewsWithTitle(aTitle);
		var indexes = $arr();
		for( var i = 0; i < subviews.count(); i++ ){
			indexes.addObject(this.subviews().indexOfObject(subviews.objectAtIndex(i)));
		}
		return indexes;
	}
	
	//Appearance
	/*bool*/ this.isVertical = function(){
		return _isVertical;
	}
	/*void*/ this.setIsVertical = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_isVertical = yn;
	}
	
	//Utility views
	/*MokaView*/ this.utilityViewForSubview = function(aView){
		if( !is(aView,MokaView) || !this.subviews().containsObject(aView) ){ return; }
		
		return _utilityViews.objectForKey(aView);
	}
	/*void*/ this.setUtilityViewForSubview = function(utility,aView){
		if( !is(utility,MokaView) || !is(aView,MokaView) || !this.subviews().containsObject(aView) ){ return; }
		
		_utilityViews.setObjectForKey(utility,aView)
	}
	/*MokaView*/ this.utilityViewForSubviewAtIndex = function(index){
		if( !is(index,"int") || index < 0 || index >= this.subviews().count() ){ return; }
		
		return this.utilityViewForSubview(this.subviews().objectAtIndex(i));
	}
	/*void*/ this.setUtilityViewForSubviewAtIndex = function(utility,index){
		if( !is(utility,MokaView) || !is(index,"int") || index < 0 || index >= this.subviews().count() ){ return; }
		
		return this.setUtilityViewForSubview(utility,this.subviews().objectAtIndex(i));
	}
	
	//Behavior
	/*bool*/ this.allowsMultipleOpenSubviews = function(){
		return _allowsMultipleOpenSubviews;
	}
	/*void*/ this.setAllowsMultipleOpenSubviews = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_allowsMultipleOpenSubviews = yn;
	}
	/*bool*/ this.animates = function(){
		return _animates;
	}
	/*void*/ this.setAnimates = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_animates = yn;
	}
	/*bool*/ this.focusesOnOpenedSubview = function(){
		return _focusesOnOpenedSubview;
	}
	/*void*/ this.setFocusesOnOpenedSubview = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_focusesOnOpenedSubview = yn;
	}
	/*bool*/ this.addsSubviewsAsOpen = function(){
		return _addsSubviewsAsOpen;
	}
	/*void*/ this.setAddsSubviewsAsOpen = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_addsSubviewsAsOpen = yn;
	}
	/*bool*/ this.allowsReordering = function(){
		return _allowsReordering;
	}
	/*void*/ this.setAllowsReordering = function(yn){
		if( !is(yn,Boolean) ){ return; }
		_allowsReordering = yn;
	}
	
	//Changing display
	/*void*/ this.openSubview = function(aView){
		if( !is(aView,MokaView) || !this.subviews().containsObject(aView) ){ return; }
		
		if( !_subviewSizes.containsKey(aView) ){
			_subviewSizes.setObjectForKey(aView,aView.frame().size());
			return;
		}
		aView.setFrameSize(_subviewSizes.objectForKey(aView));
		this.display();
	}
	/*void*/ this.closeSubview = function(aView){
		if( !is(aView,MokaView) || this.subviews().containsObject(aView) ){ return; }
		
		if( this.isVertical() ){
			aView.setFrameSize(new MokaSize(0,aView.frame().size().height() ));
		} else {
			aView.setFrameSize(new MokaSize(aView.frame().size().width(),0));
		}
		this.display();
	}
	/*void*/ this.openSubviewAtIndex = function(anIndex){
		if( !is(anIndex,"int") || anIndex < 0 || anIndex >= this.subviews().count() ){ return; }
		
		this.openSubview(this.subviews().objectAtIndex(anIndex));
	}
	/*void*/ this.closeSubviewAtIndex = function(anIndex){
		if( !is(anIndex,"int") || anIndex < 0 || anIndex >= this.subviews().count() ){ return; }
		
		this.closeSubview(this.subviews().objectAtIndex(anIndex));
	}
	
	//Getting information about the subviews
	/*bool*/ this.subviewIsOpen = function(aView){
		if( !is(aView,MokaView) || !this.subviews().containsObject(aView) ){ return NO; }
		
		return ( this.isVertical() ? aView.frame().size().width() == 0 : aView.frame().size().height() == 0 );
	}
	/*bool*/ this.subviewAtIndexIsOpen = function(anIndex){
		if( !is(anIndex,"int") || anIndex < 0 || anIndex >= this.subviews().count() ){ return NO; }
		
		return this.subviewIsOpen(this.subviews().objectAtIndex(anIndex));
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		
	}
	
	//Event handling
	/*void*/ this.mouseDown = function(theEvent){
		
	}
	/*void*/ this.mouseUp = function(theEvent){
		
	}
	/*void*/ this.mouseDrag = function(theEvent){
		
	}
	/*MokaView*/ this.hitTest = function(aPoint){
		
	}
	
}