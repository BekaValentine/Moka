function MokaTabView(){
	this.extend(MokaView);
	
	/*	Tab View Items	*/
	var _tabViewItems = new MokaArray;
	
	/*	Appearance	*/
	var _tabs = new MokaSegmentedControl;
	var _tabCount = 2;
	var _tabPosition = MokaTabsCenter;
	var _borderType = MokaNoBorder;
	
	
	
	
	
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_tabs.init();
		_tabs.setTarget(this);
		_tabs.setAction( $sel("selectedTabChanged") );
		_tabs.viewWillMoveToSuperview(this);
		_tabs.viewDidMoveToSuperview();
		_tabs.setSelectedSegment(0);
		_tabs.setLabelForSegment($s("Tab"),0);
		_tabs.setLabelForSegment($s("View"),1);
		_tabs.setSelectionMode(MokaSingleSelectionMode);

		_tabViewItems.init();

		var t = new MokaTabViewItem;
		t.init();
		t.contentView().viewWillMoveToSuperview(this);
		t.contentView().viewDidMoveToSuperview();
		_tabViewItems.addObject( t );
		
		t = new MokaTabViewItem;
		t.contentView().viewWillMoveToSuperview(this);
		t.contentView().viewDidMoveToSuperview();
		_tabViewItems.addObject( t );
		
		this.setTabPosition( MokaTabsCenter );
		this.setBorderType(MokaBezelBorder);
		this.setFrameSize( new MokaSize(500,500) );
		this.pageDisplay().style.backgroundColor = "red";
		this.selectFirstTabViewItem();
		this.drawingCanvas().appendChild( _tabs.pageDisplay() );
		this.display();
		return this;
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();
				
		if( this.tabPosition() != MokaNoTabs ){
			this.drawingCanvas().appendChild(_tabs.pageDisplay());
		}
		
		if( this.tabPosition() == MokaTabsLeft ){
			_tabs.setFrameOrigin( new MokaPoint(0,0) );
		} else if( this.tabPosition() == MokaTabsCenter ){
			_tabs.setFrameOrigin( new MokaPoint((this.frame().size().width()-_tabs.frame().size().width())/2,0) );
		} else if( this.tabPosition() == MokaTabsRight ){
			_tabs.setFrameOrigin( new MokaPoint(this().frame().size().width()-_tabs.frame().size().width(),0) );
		}
		
		_tabs.setZIndex(1);
		var tvic = this.tabViewItems().objectAtIndex(_tabs.selectedSegment()).contentView();
		tvic.setZIndex(0);
		if( this.tabPosition() == MokaNoTabs ){
			tvic.setFrameSize( this.frame().size().copy() );
			tvic.setFrameOrigin( MokaPoint.origin() );
		} else {
			tvic.setFrameSize( new MokaSize(this.frame().size().width(),this.frame().size().height()-10) );
			tvic.setFrameOrigin( new MokaPoint(0,10) );
		}
		this.drawingCanvas().appendChild( tvic.pageDisplay() );
	}
	
	//Adding and removing tabs
	/*void*/ this.addTabViewItem = function(aTabViewItem){
		if( typeof aTabViewItem == undefined ){ return; }
		if( typeof(aTabViewItem.isKindOfClass) != "function" ){ return; }
		if( !aTabViewItem.isKindOfClass(MokaTabViewItem) ){ return; }
		
		_tabCount++;
		_tabs.setSegmentCount( _tabs.segmentCount()+1 );
		_tabs.setLabelForSegment( aTabViewItem.title(), _tabs.segmentCount()-1 );
		this.tabViewItems().addObject( aTabViewItem );
		aTabViewItem.contentView().viewWillMoveToSuperview(this);
		aTabViewItem.contentView().viewDidMoveToSuperview();
		this.display();
	}
	/*void*/ this.insertTabViewItemAtIndex = function(aTabViewItem,anIndex){
		if( typeof aTabViewItem == undefined ){ return; }
		if( typeof(aTabViewItem.isKindOfClass) != "function" ){ return; }
		if( !aTabViewItem.isKindOfClass(MokaTabViewItem) ){ return; }
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }

		if( anIndex < 0 ){ anIndex = 0; }
		if( anIndex > _tabCount ){ anIndex = _tabCount; }

		_tabCount++;
		_tabs.setSegmentCount( _tabCount );
		for( var i = _tabCount-1; i > anIndex; i-- ){
			_tabs.setLabelForSegment( _tabs.labelForSegment(i-1) ,i);
		}
		_tabs.setLabelForSegment(aTabViewItem.title(),anIndex);
		this.tabViewItems().insertObjectAtIndex(aTabViewItem,anIndex);
		this.display();
	}
	/*void*/ this.removeTabViewItem = function(aTabViewItem){
		if( typeof aTabViewItem == undefined ){ return; }
		if( typeof(aTabViewItem.isKindOfClass) != "function" ){ return; }
		if( !aTabViewItem.isKindOfClass(MokaTabViewItem) ){ return; }
		
		if( !this.tabViewItems().containsObject(aTabViewItem) ){ return; }
		
		this.removeTabViewItemAtIndex( this.tabViewItems().indexOfObject(aTabViewItem) );
	}
	/*void*/ this.removeTabViewItemAtIndex = function(anIndex){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		if( anIndex < 0 ){ anIndex = 0; }
		if( anIndex > _tabCount - 1 ){ anIndex = _tabCount - 1; }
		
		_tabCount--;
		for( var i = anIndex; i < _tabCount; i++ ){
			_tabs.setLabelForSegment( _tabs.labelForSegment(i+1) ,i);
		}
		_tabs.setSegmentCount( _tabCount );
		this.tabViewItems().removeObjectAtIndex(anIndex);
		this.display();		
	}
	/*void*/ this.setTabCount = function(anInt){
		if( typeof anInt == undefined ){ return; }
		if( !MokaNumberIsInt(anInt) ){ return; }
		
		if( anInt < 1 ){ anInt = 1; }
		
		//_tabCount = anInt;
		
		var beforeTabsRenumber = _tabs.segmentCount();
		
		while( this.tabViewItems().count() < anInt ){
			var t = new MokaTabViewItem;
			t.setTitle( $s("Tab") );
			//this.tabViewItems().addObject( t );
			this.addTabViewItem(t);
		}
		while( this.tabViewItems().count() > anInt ){
			this.removeTabViewItemAtIndex( _tabCount-1 );
		}
		this.display();
	}
	
	//Accessing tabs
	/*MokaArray*/ this.tabViewItems = function(){
		return _tabViewItems;
	}	
	/*int*/ this.indexOfTabViewItem = function(aTabViewItem){
		if( typeof aTabViewItem == undefined ){ return; }
		if( typeof(aTabViewItem.isKindOfClass) != "function" ){ return; }
		if( !aTabViewItem.isKindOfClass(MokaTabViewItem) ){ return; }
		return this.tabViewItems().indexOfObject(aTabViewItem);
	}
	/*int*/ this.indexOfTabViewItemWithIdentifier = function(anIdentifier){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		for( var i = 0; i < this.tabViewItems().count(); i++ ){
			var o = this.tabViewItems().objectAtIndex(i);
			if( o.identifier() == anIdentifier ){
				return i;
			}
		}
		
		return -1;
		
	}
	/*int*/ this.numberOfTabViewItems = function(){
		return _tabCount;
	}
	/*MokaTabViewItem*/ this.tabViewItemAtIndex = function(anIndex){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		return this.tabViewItems().objectAtIndex(anIndex);
	}
	
	//Selecting a tab
	/*void*/ this.selectFirstTabViewItem = function(sender){
		this.selectTabViewItemAtIndex(0);
	}
	/*void*/ this.selectLastTabViewItem = function(sender){
		this.selectTabViewItemAtIndex(_tabCount-1);
	}
	/*void*/ this.selectNextTabViewItem = function(sender){
		this.selectTabViewItemAtIndex( _tabs.selectedSegment()+1 );
	}
	/*void*/ this.selectPreviousTabViewItem = function(sender){
		this.selectTabViewItemAtIndex( _tabs.selectedSegment()-1 );
	}
	/*void*/ this.selectTabViewItem = function(aTabViewItem){
		if( typeof aTabViewItem == undefined ){ return; }
		if( typeof(aTabViewItem.isKindOfClass) != "function" ){ return; }
		if( !aTabViewItem.isKindOfClass(MokaTabViewItem) ){ return; }
		
		if( !this.tabViewItems().containsObject(aTabViewItem) ){ return; }
		
		this.selectTabViewItemAtIndex( this.indexOfTabViewItem(aTabViewItem) );
	}
	/*void*/ this.selectTabViewItemAtIndex = function(anIndex){
		if( typeof anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		_tabs.setSelectedSegment(anIndex);
		this.display();
	}
	/*void*/ this.selectTabViewItemWithIdentifier = function(anIdentifier){
		
		for( var i = 0; i < this.tabViewItems().count(); i++ ){
			if( this.tabViewItems().objectAtIndex(i).identifier() == anIdentifier ){
				this.selectTabViewItem(i);
			}
		}
		
	}
	/*MokaTabViewItem*/ this.selectedTabViewItem = function(){
		return this.tabViewItems().objectAtIndex( _tabs.selectedSegment() );
	}
	/*void*/ this.takeSelectedTabViewItemFromSender = function(sender){
		if( typeof sender == undefined ){ return; }
		if( typeof(sender.isKindOfClass) != "function" ){ return; }
		if( !sender.isKindOfClass(MokaTabView) ){ return; }
		this.selectTabViewItemAtIndex( sender.indexOfTabViewItem(sender.selectedTabViewItem) );
	}
	
	//Controlling Appearance
	/*MokaTabPosition*/ this.tabPosition = function(){
		return _tabPosition;
	}	
	/*void*/ this.setTabPosition = function(aTabPosition){
		if( aTabPosition != MokaNoTabs && aTabPosition != MokaTabsLeft && aTabPosition != MokaTabsCenter && aTabPosition != MokaTabsRight ){ return; }
		_tabPosition = aTabPosition;
		this.display();
	}
	/*MokaBorderType*/ this.borderType = function(){
		return _borderType;
	}	
	/*void*/ this.setBorderType = function(aBorderType){
		if( aBorderType != MokaNoBorder && aBorderType != MokaLineBorder && aBorderType != MokaGrooveBorder && aBorderType != MokaBezelBorder ){ return; }
		_borderType = aBorderType;
		this.display();
	}
	
	//Interacting with the tabs
	/*void*/ this.selectedTabChanged = function(sender){
		if( sender != _tabs ){ return; }
		this.display();
	}
	
	
	//Hit test
	/*MokaView*/ this.hitTest = function(aPoint){
		if( !MokaRect.rectWithOriginAndSize( MokaPoint.origin(), this.frame().size() ).containsPoint(this.convertPointFromPage(aPoint)) ){ return null; }
		else{
			var hitView = this;
			this.tabViewItems().each(function(aTabViewItem){
				var capturedHit = aTabViewItem.contentView().hitTest(aPoint);
				if( capturedHit ){ hitView = capturedHit; }
			});
			if( _tabs.frame().containsPoint(this.convertPointFromPage(aPoint)) ){ hitView = _tabs; }
			return hitView;
		}
	}
	
}

//tab position
MokaNoTabs		= 0;
MokaTabsLeft	= 1;
MokaTabsCenter	= 2;
MokaTabsRight	= 3;