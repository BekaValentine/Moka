function MokaScrollView(){
	this.extend(MokaView);
	
	/*	Graphics attributes	*/
	var _backgroundColor = "lightblue";
	var _drawsBackground = YES;
	var _borderType = MokaNoBorder;
	var _documentCursor = null;
	
	/*	Content view	*/
	var _contentView = MokaClipView.make().init();
	
	/*	Scrollers	*/
	var _verticalScroller = MokaScroller.make().init();
	var _horizontalScroller = MokaScroller.make().init();
	
	/*	Managing scrollers	*/
	var _hasHorizontalScroller = YES;
	var _hasVerticalScroller = YES;
	var _autohidesScrollers = YES;
	
	/*	Rulers	*/
	var _verticalRuler = MokaRulerView.make().init();
	var _horizontalRuler = MokaRulerView.make().init();
	
	/*	Managing rulers	*/
	var _hasHorizontalRuler = YES;
	var _hasVerticalRuler = YES;
	var _rulersVisible = YES;
	
	/*	Scrolling behavior	*/
	var _scrollsDynamically = YES;
	var _lineScroll = 16;
	var _horizontalLineScroll = 16;
	var _verticalLineScroll = 16;
	var _pageScroll = 0;
	var _horizontalPageScroll = 0;
	var _verticalPageScroll = 0;
	
	/*	Table Header View	*/
	var _tableHeaderView = null;
	
	
	
	
	
	
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		//this.addSubview( this.contentView() ); // content view
		//this.addSubview( this.verticalScroller() ); // v scroller
		//this.addSubview( this.horizontalScroller() ); // h scroller
		this.horizontalScroller().setIsVertical(NO);
		//this.addSubview( this.verticalRuler() ); // v scroller
		//this.addSubview( this.horizontalRuler() ); // h scroller
		this.horizontalRuler().setOrientation(MokaHorizontalRuler);
		
		
		
		this.display();
		
		return this;
	}
	
	//Determining component sizes
	/*MokaSize*/ this.contentSize = function(){
		var size = this.frame().size().copy();
		size.setHeight( size.height() - ( this.horizontalRuler() ? 1 : 0 )*this.horizontalRuler().frame().size().height() + ( this.hasHorizontalScroller() ? 1 : 0 )*( this.horizontalScroller().isHidden() ? 0 : 1 )*this.horizontalScroller().frame().size().height() );
		size.setWidth( size.width() - ( this.verticalRuler() ? 1 : 0 )*this.horizontalRuler().frame().size().width() + ( this.hasVerticalalScroller() ? 1 : 0 )*( this.verticalScroller().isHidden() ? 0 : 1 )*this.verticalScroller().frame().size().width() );
		return size;
	}
	/*MokaRect*/ this.documentVisibleRect = function(){
		var vRulerSize = (this.hasVerticalRuler()?1:0)*(this.rulersVisible()?1:0)*this.verticalRuler().frame().size().width()
		var hRulerSize = (this.hasHorizontalRuler()?1:0)*(this.rulersVisible()?1:0)*this.horizontalRuler().frame().size().height();
		
		var tableHeaderHeight = 0;
		if( this.documentView() && this.documentView().isKindOfClass(MokaTableView) ){
			if( this.documentView().headerView() ){
				tableHeaderHeight = this.documentView().headerView().frame().size().height();
			}
		}
		
		var proposedContentWidth = this.frame().size().width() - vRulerSize;
		var proposedContentHeight = this.frame().size().height() - hRulerSize - tableHeaderHeight;
		
		var needsHorizontalScroller =  this.hasHorizontalScroller() && (!this.autohidesScrollers() || proposedContentWidth < (this.documentView()?this.documentView().frame().size().width():proposedContentWidth));
		var needsVerticalScroller = this.hasVerticalScroller() && (!this.autohidesScrollers() || proposedContentHeight < (this.documentView()?this.documentView().frame().size().height():proposedContentHeight));
		
		if( needsVerticalScroller ){
			needsHorizontalScroller = needsHorizontalScroller || proposedContentWidth - this.verticalScroller().frame().size().width() < (this.documentView()?this.documentView().frame().size().width():proposedContentWidth);
		}
		if( needsHorizontalScroller ){
			needsVerticalScroller = needsVerticalScroller || proposedContentHeight - this.horizontalScroller().frame().size().height() < (this.documentView()?this.documentView().frame().size().height():proposedContentHeight);
		}
		
		var clipViewRect = MokaRect.rectWithOriginAndSize(	new MokaPoint(vRulerSize,hRulerSize+tableHeaderHeight),
															new MokaSize(	this.frame().size().width() - vRulerSize - (needsVerticalScroller?1:0)*this.verticalScroller().frame().size().width(),
																			this.frame().size().height() - hRulerSize - (needsHorizontalScroller?1:0)*this.horizontalScroller().frame().size().height()) );
		
		clipViewRect.setOrigin( this.convertPointToView(clipViewRect.origin(),this.documentView()) );
		return clipViewRect.intersectWith(this.documentView().frame());
	}
	
	//Managing graphics attributes
	/*string*/ this.backgroundColor = function(){
		return _backgroundColor;
	}	
	/*void*/ this.setBackgroundColor = function(aColor){
		if( typeof aColor == undefined ){ return; }
		if( typeof(aColor) != "string" ){ return; }
		_backgroundColor = aColor;
		this.pageDisplay().style.backgroundColor = ( this.drawsBackground() ? _backgroundColor : "none" );
	}
	/*bool*/ this.drawsBackground = function(){
		return _drawsBackground;
	}	
	/*void*/ this.setDrawsBackground = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		_drawsBackground = yn;
		this.pageDisplay().style.backgroundColor = ( _drawsBackground ? this.backgroundColor() : "none" );
	}
	/*MokaScrollViewBorderType*/ this.borderType = function(){
		return _borderType;
	}
	
	/*void*/ this.setBorderType = function(aBorderType){
		if( aBorderType == undefined ){ return; }
		if( !MokaNumberIsInt(aBorderType) ){ return; }
		
		if( aBorderType < MokaNoBorder || aBorderType > MokaGrooveBorder ){ return; }
		
		_borderType = aBorderType;
		this.display();
	}
	/*MokaCursor*/ this.documentCursor = function(){
		return _documentCursor;
	}	
	/*void*/ this.setDocumentCursor = function(aCursor){
		
	}
	
	//Managing scrolled views
	/*MokaClipView*/ this.contentView = function(){
		return _contentView;
	}	
	/*void*/ this.setContentView = function(aClipView){
		if( typeof aClipView == undefined ){ return; }
		if( typeof(aClipView.isKindOfClass) != "function" ){ return; }
		if( !aClipView.isKindOfClass(MokaClipView) ){ return; }
		
		this.removeSubview(this.subviews().objectAtIndex(0));
		
		aClipView.viewWillMoveToPanel(this.panel());
		aClipView.viewWillMoveToSuperview(this);
		this.subviews().insertObjectAtIndex(aClipView, 0);
		aClipView.viewDidMoveToSuperview();
		aClipView.viewDidMoveToPanel();
		aClipView.setNextResponder(this);
		
		this.display();
	}
	/*MokaView*/ this.documentView = function(){
		return this.contentView().documentView();
	}	
	/*void*/ this.setDocumentView = function(aView){
		if( typeof aView == undefined ){ return; }
		if( typeof(aView.isKindOfClass) != "function" ){ return; }
		if( !aView.isKindOfClass(MokaView) ){ return; }
		
		this.contentView().setDocumentView(aView);
		this.display();
	}
	
	//Managing scrollers
	/*bool*/ this.hasHorizontalScroller = function(){
		return _hasHorizontalScroller;
	}	
	/*void*/ this.setHasHorizontalScroller = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_hasHorizontalScroller = yn;
		this.horizontalScroller().setIsHidden( !yn );
		this.display();
	}
	/*bool*/ this.hasVerticalScroller = function(){
		return _hasVerticalScroller;
	}	
	/*void*/ this.setHasVerticalScroller = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_hasVerticalScroller = yn;
		this.verticalScroller().setIsHidden( !yn );
		this.display();
	}
	/*bool*/ this.autohidesScrollers = function(){
		return _autohidesScrollers;
	}	
	/*void*/ this.setAutohidesScrollers = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_autohidesScrollers = yn;
		this.display();
	}
	/*MokaScroller*/ this.horizontalScroller = function(){
		return _horizontalScroller;
	}	
	/*void*/ this.setHorizontalScroller = function(aScroller){
		if( typeof aScroller == undefined ){ return; }
		if( typeof(aScroller.isKindOfClass) != "function" ){ return; }
		if( !aScroller.isKindOfClass(MokaScroller) ){ return; }
		
		this.removeSubview( this.subviews().objectAtIndex(2) );
		aScroller.viewWillMoveToPanel(this.panel());
		aScroller.viewWillMoveToSuperview(this);
		this.subviews().insertObjectAtIndex(aScroller, 2);
		aScroller.viewDidMoveToSuperview();
		aScroller.viewDidMoveToPanel();
		aScroller.setNextResponder(this);		
		
		aScroller.setIsHidden( !this.hasHorizontalScroller() );
		this.display();
	}
	/*MokaScroller*/ this.verticalScroller = function(){
		return _verticalScroller;
	}
	/*void*/ this.setVerticalScroller = function(aScroller){
		if( typeof aScroller == undefined ){ return; }
		if( typeof(aScroller.isKindOfClass) != "function" ){ return; }
		if( !aScroller.isKindOfClass(MokaScroller) ){ return; }
		
		this.removeSubview( this.subviews().objectAtIndex(1) );
		aScroller.viewWillMoveToPanel(this.panel());
		aScroller.viewWillMoveToSuperview(this);
		this.subviews().insertObjectAtIndex(aScroller, 1);
		aScroller.viewDidMoveToSuperview();
		aScroller.viewDidMoveToPanel();
		aScroller.setNextResponder(this);
		
		aScroller.setIsHidden( !this.hasVerticalScroller() );
		this.display();
	}
	
	//Managing rulers
	/*bool*/ this.hasHorizontalRuler = function(){
		return _hasHorizontalRuler;
	}	
	/*void*/ this.setHasHorizontalRuler = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_hasHorizontalRuler = yn;
		this.horizontalRuler().setIsHidden( !this.hasHorizontalRuler() );
		this.display();
	}
	/*bool*/ this.hasVerticalRuler = function(){
		return _hasVerticalRuler;
	}	
	/*void*/ this.setHasVerticalRuler = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_hasVerticalRuler = yn;
		this.verticalRuler().setIsHidden( !this.hasVerticalRuler() );
		this.display();
	}
	/*bool*/ this.rulersVisible = function(){
		return _rulersVisible;
	}	
	/*void*/ this.setRulersVisible = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_rulersVisible = yn;
		this.horizontalRuler().setIsHidden( !this.rulersVisible() );
		this.verticalRuler().setIsHidden( !this.rulersVisible() );
		this.display();
	}
	/*MokaRuler*/ this.horizontalRuler = function(){
		return _horizontalRuler;
	}	
	/*void*/ this.setHorizontalRuler = function(aRuler){
		if( typeof aRuler == undefined ){ return; }
		if( typeof(aRuler.isKindOfClass) != "function" ){ return; }
		if( !aRuler.isKindOfClass(MokaRuler) ){ return; }
		
		this.removeSubview( this.subviews().objectAtIndex(4) );
		aRuler.viewWillMoveToPanel(this.panel());
		aRuler.viewWillMoveToSuperview(this);
		this.subviews().insertObjectAtIndex(aRuler, 4);
		aRuler.viewDidMoveToSuperview();
		aRuler.viewDidMoveToPanel();
		aRuler.setNextResponder(this);
		
		aRuler.setIsHidden( !this.hasHorizontalRuler() && !this.rulersVisible() );
		this.display();
	}
	/*MokaRuler*/ this.verticalRuler = function(){
		return _verticalRuler;
	}
	/*void*/ this.setVerticalRuler = function(aRuler){
		if( typeof aRuler == undefined ){ return; }
		if( typeof(aRuler.isKindOfClass) != "function" ){ return; }
		if( !aRuler.isKindOfClass(MokaRuler) ){ return; }
		
		this.removeSubview( this.subviews().objectAtIndex(3) );
		aRuler.viewWillMoveToPanel(this.panel());
		aRuler.viewWillMoveToSuperview(this);
		this.subviews().insertObjectAtIndex(aRuler, 3);
		aRuler.viewDidMoveToSuperview();
		aRuler.viewDidMoveToPanel();
		aRuler.setNextResponder(this);
		
		aRuler.setIsHidden( !this.hasHorizontalRuler() && !this.rulersVisible() );
		
		this.display();
	}
	
	//Setting scrolling behavior
	/*bool*/ this.scrollsDynamically = function(){
		return _scrollsDynamically;
	}	
	/*void*/ this.setScrollsDynamically = function(yn){
		if( typeof yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		_scrollsDynamically = yn;
		this.horizontalScroller().setIsContinuous( this.scrollsDynamically() );
		this.verticalScroller().setIsContinuous( this.scrollsDynamically() );
	}
	/*float*/ this.lineScroll = function(){
		return _lineScroll;
	}
	/*void*/ this.setLineScroll = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_lineScroll = aFloat;
		this.horizontalScroller().setLineScroll(aFloat);
		this.verticalScroller().setLineScroll(aFloat);
	}
	/*float*/ this.horizontalLineScroll = function(){
		return _horizontalLineScroll;
	}
	/*void*/ this.setHorizontalLineScroll = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_horizontalLineScroll = aFloat;
		this.horizontalScroller().setLineScroll(aFloat);
	}
	/*float*/ this.verticalLineScroll = function(){
		return _verticalLineScroll;
	}
	/*void*/ this.setVerticalLineScroll = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_verticalLineScroll = aFloat;
		this.verticalScroller().setLineScroll(aFloat);
	}
	/*float*/ this.pageScroll = function(){
		return _pageScroll;
	}
	/*void*/ this.setPageScroll = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_pageScroll = aFloat;
		this.horizontalScroller().setPageScroll(aFloat);
		this.verticalScroller().setPageScroll(aFloat);
	}
	/*float*/ this.horizontalPageScroll = function(){
		return _horizontalPageScroll;
	}
	/*void*/ this.setHorizontalPageScroll = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_horizontalPageScroll = aFloat;
		this.horizontalScroller().setPageScroll(aFloat);
	}
	/*float*/ this.verticalPageScroll = function(){
		return _verticalPageScroll;
	}
	/*void*/ this.setVerticalPageScroll = function(aFloat){
		if( aFloat == undefined ){ return; }
		if( !MokaNumberIsFloat(aFloat) ){ return; }
		
		_verticalPageScroll = aFloat;
		this.verticalScroller().setPageScroll(aFloat);
	}
	
	//Updating
	/*void*/ this.reflectScrolledClipView = function(aClipView){
		if( typeof aClipView == undefined ){ return; }
		if( typeof(aClipView.isKindOfClass) != "function" ){ return; }
		if( !aClipView.isKindOfClass(MokaClipView) ){ return; }
		
		if( aClipView != this.contentView() ){ return; }
		
		this.horizontalRuler().setOriginOffset( (this.documentView()?this.documentView().frame().origin().x():0) );
		this.verticalRuler().setOriginOffset( (this.documentView()?this.documentView().frame().origin().y():0) );
		
		var documentViewY = (this.documentView()?this.documentView().frame().origin().y():0);
		var documentViewHeight = (this.documentView()?this.documentView().frame().size().height():this.contentView().frame().size().height());
		documentViewHeight = (documentViewHeight > 0 ? documentViewHeight : this.contentView().frame().size().height());
		var scrollableHeight = (this.documentView() ? this.documentView().frame().size().height() - this.contentView().frame().size().height() : 1 );
		scrollableHeight = (scrollableHeight > 0 ? scrollableHeight : 1 );
		this.verticalScroller().setNumberValueAndKnobProportion( -documentViewY/scrollableHeight, this.contentView().frame().size().height()/documentViewHeight);
		
		var documentViewX = (this.documentView()?this.documentView().frame().origin().x():0);
		var documentViewWidth = (this.documentView()?this.documentView().frame().size().width():this.contentView().frame().size().width());
		documentViewWidth = (documentViewWidth > 0 ? documentViewWidth : this.contentView().frame().size().width() );
		var scrollableWidth = (this.documentView() ? this.documentView().frame().size().width() - this.contentView().frame().size().width() : 1 );
		scrollableWidth = (scrollableWidth > 0 ? scrollableWidth : 1 );
		this.horizontalScroller().setNumberValueAndKnobProportion( -documentViewX/scrollableWidth, this.contentView().frame().size().width()/documentViewWidth);
		
	}
	/*void*/ this.scrollersUpdated = function(sender){
		if( this.documentView() ){
			var newX = 0;
			var newY = 0;
			if( this.documentView().frame().size().width() > this.contentView().frame().size().width()){
				newX = this.horizontalScroller().numberValue()*(this.documentView().frame().size().width()-this.contentView().frame().size().width());
			}
			if( this.documentView().frame().size().height() > this.contentView().frame().size().height() ){
				newY = this.verticalScroller().numberValue()*(this.documentView().frame().size().height()-this.contentView().frame().size().height());
			}
			this.contentView().scrollToPoint( new MokaPoint(newX,newY) );
		}
	}
	
	//Tiling
	/*void*/ this.tile = function(){
		
		//consider table view header and corner views
		
		var vRulerSize = (this.hasVerticalRuler()?1:0)*(this.rulersVisible()?1:0)*this.verticalRuler().frame().size().width()
		var hRulerSize = (this.hasHorizontalRuler()?1:0)*(this.rulersVisible()?1:0)*this.horizontalRuler().frame().size().height();
		
		var cornerViewHeight = 0;
		var tableHeaderHeight = 0;
		if( this.documentView() && this.documentView().isKindOfClass(MokaTableView) ){
			if( this.documentView().headerView() ){
				this.documentView().headerView().setFrameSize(new MokaSize(this.frame().size().width() - this.documentView().cornerView().frame().size().width(),this.documentView().headerView().frame().size().height()));
				this.documentView().headerView().setFrameOrigin(new MokaPoint);
				this.documentView().cornerView().setFrameOrigin(new MokaPoint(this.documentView().frame().size().width(),0));
				tableHeaderHeight = this.documentView().headerView().frame().size().height();
			}
		}
		
		var proposedContentWidth = this.frame().size().width() - vRulerSize;
		var proposedContentHeight = this.frame().size().height() - hRulerSize - tableHeaderHeight;
		
		var needsHorizontalScroller =  this.hasHorizontalScroller() && (!this.autohidesScrollers() || proposedContentWidth < (this.documentView()?this.documentView().frame().size().width():proposedContentWidth));
		var needsVerticalScroller = this.hasVerticalScroller() && (!this.autohidesScrollers() || proposedContentHeight < (this.documentView()?this.documentView().frame().size().height():proposedContentHeight));
		
		if( needsVerticalScroller ){
			needsHorizontalScroller = needsHorizontalScroller || proposedContentWidth - this.verticalScroller().frame().size().width() < (this.documentView()?this.documentView().frame().size().width():proposedContentWidth);
		}
		if( needsHorizontalScroller ){
			needsVerticalScroller = needsVerticalScroller || proposedContentHeight - this.horizontalScroller().frame().size().height() < (this.documentView()?this.documentView().frame().size().height():proposedContentHeight);
		}
		
		this.contentView().setFrameSize( new MokaSize(this.frame().size().width() - vRulerSize - (needsVerticalScroller?1:0)*this.verticalScroller().frame().size().width(),this.frame().size().height() - hRulerSize - (needsHorizontalScroller?1:0)*this.horizontalScroller().frame().size().height()) );
		this.contentView().setFrameOrigin( new MokaPoint(vRulerSize,hRulerSize+tableHeaderHeight) );
		
		this.horizontalRuler().setFrameSize( new MokaSize(this.frame().size().width()-vRulerSize,50) );
		this.horizontalRuler().setFrameOrigin( new MokaPoint(vRulerSize,tableHeaderHeight) );
		this.horizontalRuler().setIsHidden( !this.rulersVisible() || !this.hasHorizontalRuler() );
		
		this.verticalRuler().setFrameSize( new MokaSize(50,this.frame().size().height()-hRulerSize) );
		this.verticalRuler().setFrameOrigin( new MokaPoint(0,hRulerSize+tableHeaderHeight) );
		this.verticalRuler().setIsHidden( !this.rulersVisible() || !this.hasVerticalRuler() );
		
		this.verticalScroller().setFrameSize( new MokaSize(50,this.contentView().frame().size().height()) );
		this.verticalScroller().setFrameOrigin( new MokaPoint(this.frame().size().width()-this.verticalScroller().frame().size().width(),this.contentView().frame().origin().y()+tableHeaderHeight) );
		this.verticalScroller().setIsHidden(!needsVerticalScroller);
		
		this.horizontalScroller().setFrameSize( new MokaSize(this.contentView().frame().size().width(),50) );
		this.horizontalScroller().setFrameOrigin( new MokaPoint(this.contentView().frame().origin().x(),this.frame().size().height()-this.horizontalScroller().frame().size().height()+tableHeaderHeight) );
		this.horizontalScroller().setIsHidden(!needsHorizontalScroller);
		
		//set the appropriate line and page scrolls
	}
	
	//Drawing
	/*void*/ this.draw = function(){
		this.eraseAll();	
		
		this.drawSubview( this.contentView() );
		this.drawSubview( this.verticalScroller() );
		this.drawSubview( this.horizontalScroller() );
		this.drawSubview( this.verticalRuler() );
		this.drawSubview( this.horizontalRuler() );
		
		if( this.documentView() && this.documentView().isKindOfClass(MokaTableView) && this.documentView().headerView() ){
			
			this.removeSubview( this.subviews().objectAtIndex(5) );
			this.documentView().headerView().viewWillMoveToPanel(this.panel());
			this.documentView().headerView().viewWillMoveToSuperview(this);
			this.subviews().insertObjectAtIndex(this.documentView().headerView(), 5);
			this.documentView().headerView().viewDidMoveToSuperview();
			this.documentView().headerView().viewDidMoveToPanel();
			this.documentView().headerView().setNextResponder(this);
			
			this.drawSubview( this.documentView().headerView() );
			
			if( this.documentView().cornerView() ){
				this.removeSubview( this.subviews().objectAtIndex(6) );
				this.documentView().cornerView().viewWillMoveToPanel(this.panel());
				this.documentView().cornerView().viewWillMoveToSuperview(this);
				this.subviews().insertObjectAtIndex(this.documentView().cornerView(), 6);
				this.documentView().cornerView().viewDidMoveToSuperview();
				this.documentView().cornerView().viewDidMoveToPanel();
				this.documentView().cornerView().setNextResponder(this);
				
				this.drawSubview( this.documentView().cornerView() );
			}
			
		}
		
		
		this.pageDisplay().style.backgroundColor = ( this.drawsBackground() ? this.backgroundColor() : "none" );
		
		this.tile();
		
		this.reflectScrolledClipView(this.contentView())
		
	}
	
	//Events
	/*void*/ this.scrollWheel = function(theEvent){
		if( theEvent == undefined ){ return; }
		if( typeof(theEvent.isKindOfClass) != "function" ){ return; }
		if( !theEvent.isKindOfClass(MokaEvent) ){ return; }
		
		if( this.documentView() ){
			var newX = 0;
			var newY = 0;
			if( this.documentView().frame().size().width() > this.contentView().frame().size().width()){
				newX = this.horizontalScroller().numberValue()*(this.documentView().frame().size().width()-this.contentView().frame().size().width());
			}
			if( this.documentView().frame().size().height() > this.contentView().frame().size().height() ){
				newY = this.verticalScroller().numberValue()*(this.documentView().frame().size().height()-this.contentView().frame().size().height()) + theEvent.deltaY()*16;
			}
			this.contentView().scrollToPoint( new MokaPoint(newX,newY) );
		}
	}
	
	//Hit test
	/*MokaView*/ this.hitTest = function(aPoint){
		if( aPoint == undefined ){ return this; }
		if( typeof(aPoint.isKindOfClass) != "function" ){ return this; }
		if( !aPoint.isKindOfClass(MokaPoint) ){ return this; }
		
		var convertedPoint = this.convertPointFromPage(aPoint);
		if( !MokaRect.rectWithOriginAndSize( MokaPoint.origin(), this.frame().size() ).containsPoint(convertedPoint) ){ return null; }
		else{
			var hitView = this;
			
			if( this.verticalScroller().frame().containsPoint(convertedPoint) ){ hitView = this.verticalScroller(); }
			else if( this.horizontalScroller().frame().containsPoint(convertedPoint) ){ hitView = this.horizontalScroller(); }
			else if( this.verticalRuler().frame().containsPoint(convertedPoint) ){ hitView = this.verticalRuler(); }
			else if( this.horizontalRuler().frame().containsPoint(convertedPoint) ){ hitView = this.horizontalRuler(); }
			else if( this.contentView().frame().containsPoint(convertedPoint) ){ hitView = this.contentview(); }
			return hitView;
		}
	}
}