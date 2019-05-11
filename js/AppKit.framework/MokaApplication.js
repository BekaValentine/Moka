function MokaApplication(){
	
	this.extend(MokaObject);
	
	/*	Main menu	*/
	var _mainMenu = null;
	
	/*	Delegate	*/
	var _delegate = null;
	
	/*	Key and Main Panel	*/
	var _keyPanel = null;
	var _mainPanel = null;
	
	/*	Recent Events	*/
	var _mostRecentEvent = null;
	var _mouseLocation = null;
	
	/*	Levels	*/
	var _documentPanelLevel = new MokaArray;
	var _normalPanelLevel = new MokaArray;
	var _floatingPanelLevel = new MokaArray;
	var _modalPanelLevel = new MokaArray;
	var _mainMenuPanelLevel = new MokaArray;
	var _popUpMenuPanelLevel = new MokaArray;
	
	/*	Drag target, tracking drags	*/
	var _respondersCapturingPagewideMouseEvents = MokaArray.make().init();
	var _respondersCapturingPagewideKeyEvents = MokaArray.make().init();
	var _mouseIsDown = NO;
	
	/*	Preventing default behaviour	*/
	var _preventsDefaultMouseEventBehavior = YES;
	var _preventsDefaultKeyEventBehavior = YES;
	

	
	
	
	
	
	
	//Initialization
	/*id*/ this.init = function(){
		
		this.supers().init();
		
		_documentPanelLevel.init()
		_normalPanelLevel.init()
		_floatingPanelLevel.init()
		_modalPanelLevel.init()
		_mainMenuPanelLevel.init()
		_popUpMenuPanelLevel.init()
		
		/*	Body init	*/
		document.body.setAttribute("onmousedown","return MokaApp.mouseEvent(event);");
		document.body.setAttribute("onmouseup","return MokaApp.mouseEvent(event);");
		document.body.setAttribute("onmousemove","return MokaApp.mouseEvent(event);");
		document.body.setAttribute("oncontextmenu","return MokaApp.mouseEvent(event);");
		document.body.setAttribute("onkeypress","return MokaApp.keyEvent(event);");
		document.body.setAttribute("onselectstart","return false;// MokaApp.mouseEvent(event);");
		//document.body.setAttribute("onkeydown","return false");
		document.body.setAttribute("onkeyup","return MokaApp.keyEvent(event);");
		if(window.addEventListener){
			window.addEventListener("DOMMouseScroll", function(event){
				return MokaApp.scrollEvent(event);
			}, false);
		}
		document.body.setAttribute("onmousewheel", "MokaApp.scrollEvent(event);");
		
		return this;
	}
	
	//Main menu
	/*MokaMenu*/ this.mainMenu = function(){
		return _mainMenu;
	}
	/*void*/ this.setMainMenu = function(aMenu){
		
		_mainMenu = aMenu;
	}
	
	//Most recent event
	/*MokaEvent*/ this.mostRecentEvent = function(){
		return _mostRecentEvent;
	}	
	
	//setting the delegate
	/*id*/ this.delegate = function(){
		return _delegate;
	}	
	/*void*/ this.setDelegate = function(anObject){
		if( typeof anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		_delegate = anObject;		
	}
		
	//Working with panels
	/*void*/ this.addPanel = function(aPanel){
		if( typeof aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		
		document.body.appendChild(aPanel.pageDisplay());
		this.movePanelToLevel(aPanel,MokaNormalPanelLevel);
	}
	/*int*/ this.globalNumberForPanel = function(aPanel){
		if( typeof aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
				
		var runningNumber = 0;
		
		if( _documentPanelLevel.containsObject(aPanel) ){ return _documentPanelLevel.indexOfObject(aPanel); }
		else{ runningNumber += _documentPanelLevel.count(); }
		
		if( _normalPanelLevel.containsObject(aPanel) ){ return runningNumber + _normalPanelLevel.indexOfObject(aPanel); }
		else{ runningNumber += _normalPanelLevel.count(); }
		
		if( _floatingPanelLevel.containsObject(aPanel) ){ return runningNumber + _floatingPanelLevel.indexOfObject(aPanel); }
		else{ runningNumber += _floatingPanelLevel.count(); }
		
		if( _modalPanelLevel.containsObject(aPanel) ){ return runningNumber + _modalPanelLevel.indexOfObject(aPanel); }
		else{ runningNumber += _modalPanelLevel.count(); }
		
		if( _mainMenuPanelLevel.containsObject(aPanel) ){ return runningNumber + _mainMenuPanelLevel.indexOfObject(aPanel); }
		else{ runningNumber += _mainMenuPanelLevel.count(); }
		
		if( _popUpMenuPanelLevel.containsObject(aPanel) ){ return runningNumber + _popUpMenuPanelLevel.indexOfObject(aPanel); }
		
		return -1;
		
	}
	/*int*/ this.localNumberForPanel = function(aPanel){
		if( typeof aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		
		if( _documentPanelLevel.containsObject(aPanel) ){ return _documentPanelLevel.indexOfObject(aPanel); }
		else if( _normalPanelLevel.containsObject(aPanel) ){ return _normalPanelLevel.indexOfObject(aPanel); }
		else if( _floatingPanelLevel.containsObject(aPanel) ){ return _floatingPanelLevel.indexOfObject(aPanel); }
		else if( _modalPanelLevel.containsObject(aPanel) ){ return _modalPanelLevel.indexOfObject(aPanel); }
		else if( _mainMenuPanelLevel.containsObject(aPanel) ){ return _mainMenuPanelLevel.indexOfObject(aPanel); }
		else if( _popUpMenuPanelLevel.containsObject(aPanel) ){ return _popUpMenuPanelLevel.indexOfObject(aPanel); }
		
		return -1;
	}	
	/*void*/ this.movePanelToLevel = function(aPanel,aLevel){
		if( typeof aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		if( typeof aLevel == undefined ){ return; }
		if( !MokaNumberIsInt(aLevel) ){ return; }
		
		var panelsInLevel = 0;
		var level;
		if( aLevel == MokaDocumentPanelLevel && !_documentPanelLevel.containsObject(aPanel) ){
			_documentPanelLevel.addObject(aPanel);
			panelsInLevel = _documentPanelLevel.count();
		} else if( aLevel == MokaNormalPanelLevel && !_normalPanelLevel.containsObject(aPanel) ){
			_normalPanelLevel.addObject(aPanel);
			panelsInLevel = _normalPanelLevel.count();
		} else if( aLevel == MokaFloatingPanelLevel && !_floatingPanelLevel.containsObject(aPanel) ){
			_floatingPanelLevel.addObject(aPanel);
			panelsInLevel = _floatingPanelLevel.count();
		} else if( aLevel == MokaModalPanelLevel && !_modalPanelLevel.containsObject(aPanel) ){
			_modalPanelLevel.addObject(aPanel);
			panelsInLevel = _modalPanelLevel.count();
		} else if( aLevel == MokaMainMenuPanelLevel && !_mainMenuPanelLevel.containsObject(aPanel) ){
			_mainMenuPanelLevel.addObject(aPanel);
			panelsInLevel = _mainMenuPanelLevel.addChild(aPanel);
		} else if( aLevel == MokaPopUpMenuPanelLevel && !_popUpMenuPanelLevel.containsObject(aPanel) ){
			_popUpMenuPanelLevel.addObject(aPanel);
			panelsInLevel = _popUpMenuPanelLevel.count();
		}
		
		this.orderPanelFront(aPanel);
	}
	/*void*/ this.orderPanelBack = function(aPanel){
		if( typeof aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		
		var level;
		if( aPanel.level() == MokaDocumentPanelLevel ){
			level = _documentPanelLevel;
		} else if( aPanel.level() == MokaNormalPanelLevel ){
			level = _normalPanelLevel;
		} else if( aPanel.level() == MokaFloatingPanelLevel ){
			level = _floatingPanelLevel;
		} else if( aPanel.level() == MokaModalPanelLevel ){
			level = _modalPanelLevel;
		} else if( aPanel.level() == MokaMainMenuPanelLevel ){
			level = _mainMenuPanelLevel;
		} else if( aPanel.level() == MokaPopUpMenuPanelLevel ){
			level = _popUpMenuPanelLevel;
		}
		
		level.removeObject(aPanel);
		level.insertObjectAtIndex(aPanel,0);
		
		var panelsInLevel = level.count();
		for( var i = 0; i < panelsInLevel; i++ ){
			level.objectAtIndex(i).pageDisplay().style.zIndex = 100*aPanel.level() + i;
		}
	}
	/*void*/ this.orderPanelFront = function(aPanel){
		if( typeof aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		
		var level;
		if( aPanel.level() == MokaDocumentPanelLevel ){
			level = _documentPanelLevel;
		} else if( aPanel.level() == MokaNormalPanelLevel ){
			level = _normalPanelLevel;
		} else if( aPanel.level() == MokaFloatingPanelLevel ){
			level = _floatingPanelLevel;
		} else if( aPanel.level() == MokaModalPanelLevel ){
			level = _modalPanelLevel;
		} else if( aPanel.level() == MokaMainMenuPanelLevel ){
			level = _mainMenuPanelLevel;
		} else if( aPanel.level() == MokaPopUpMenuPanelLevel ){
			level = _popUpMenuPanelLevel;
		}
		
		level.removeObject(aPanel);
		level.insertObjectAtIndex(aPanel,level.count());
		
		var panelsInLevel = level.count();
		for( var i = 0; i < panelsInLevel; i++ ){
			level.objectAtIndex(i).pageDisplay().style.zIndex = 100*aPanel.level() + i;
		}
	}
	/*void*/ this.orderPanelRelativeTo = function(aPanel,anOrder,otherPanel){
		if( typeof aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		if( anOrder != MokaPanelAbove && anOrder != MokaPanelBelow ){ return; }
		if( typeof otherPanel == undefined ){ return; }
		if( typeof(otherPanel.isKindOfClass) != "function" ){ return; }
		if( !otherPanel.isKindOfClass(MokaPanel) ){ return; }
		
		var level;
		if( aPanel.level() == MokaDocumentPanelLevel ){
			level = _documentPanelLevel;
		} else if( aPanel.level() == MokaNormalPanelLevel ){
			level = _normalPanelLevel;
		} else if( aPanel.level() == MokaFloatingPanelLevel ){
			level = _floatingPanelLevel;
		} else if( aPanel.level() == MokaModalPanelLevel ){
			level = _modalPanelLevel;
		} else if( aPanel.level() == MokaMainMenuPanelLevel ){
			level = _mainMenuPanelLevel;
		} else if( aPanel.level() == MokaPopUpMenuPanelLevel ){
			level = _popUpMenuPanelLevel;
		}
		
		level.removeObject(aPanel);
		level.insertObjectAtIndex(aPanel,level.indexOfObject(otherPanel)+1);
		
		var panelsInLevel = level.count();
		for( var i = 0; i < panelsInLevel; i++ ){
			level.objectAtIndex(i).pageDisplay().style.zIndex = 100*aPanel.level() + i;
		}
	}
	/*void*/ this.closePanel = function(aPanel){
		if( typeof aPanel == undefined ){ return; }
		if( typeof(aPanel.isKindOfClass) != "function" ){ return; }
		if( !aPanel.isKindOfClass(MokaPanel) ){ return; }
		
		var level;
		if( aPanel.level() == MokaDocumentPanelLevel ){
			level = _documentPanelLevel;
		} else if( aPanel.level() == MokaNormalPanelLevel ){
			level = _normalPanelLevel;
		} else if( aPanel.level() == MokaFloatingPanelLevel ){
			level = _floatingPanelLevel;
		} else if( aPanel.level() == MokaModalPanelLevel ){
			level = _modalPanelLevel;
		} else if( aPanel.level() == MokaMainMenuPanelLevel ){
			level = _mainMenuPanelLevel;
		} else if( aPanel.level() == MokaPopUpMenuPanelLevel ){
			level = _popUpMenuPanelLevel;
		}
		
		level.removeObject(aPanel);
		
		aPanel.pageDisplay().parentNode.removeChild(aPanel.pageDisplay());
		
	}
		
	//Setting key and main panel
	/*MokaPanel*/ this.keyPanel = function(){
		return _keyPanel;
	}	
	/*void*/ this.setKeyPanel = function(aPanel){
		if( typeof(aPanel.isKindOfClass) != "function" ){
			return;
		}

		if( !aPanel.isKindOfClass(MokaPanel) ){
			return;
		}

		var keyIsChangeable = YES;
		if( !this.keyPanel() ){ keyIsChangeable = YES; }
		else if( this.keyPanel().canResignKeyPanel() ){ keyIsChangeable = YES; }
 		if( aPanel.canBecomeKeyPanel() & keyIsChangeable ){
			if( this.keyPanel() ){ this.keyPanel().resignKeyPanel(); }
			_keyPanel = aPanel;
			this.keyPanel().becomeKeyPanel();
		}
		
	}
	/*void*/ this.setMainPanel = function(aPanel){
		if( typeof(aPanel.isKindOfClass) != "function" ){
			return;
		}

		if( !aPanel.isKindOfClass(MokaPanel) ){
			return;
		}

		var mainIsChangeable = YES;
		if( !this.mainPanel() ){ mainIsChangeable = YES; }
		else if( this.mainPanel().canResignMainPanel() ){ mainIsChangeable = YES; }

		if( aPanel.canBecomeMainPanel() & mainIsChangeable ){
			if( this.mainPanel() ){ this.keyPanel().resignMainPanel(); }
			_mainPanel = aPanel;
			this.mainPanel().becomeMainPanel();
		}
		
	}
	
	//Normal event handling
	/*bool*/ this.mouseEvent = function( theEvent ){
		var newEvent = MokaEvent.mouseEventFromDOMEvent(theEvent);
		
		//_mouseLocation = new MokaPoint( theEvent.pageX, theEvent.pageY );
		_mouseLocation = newEvent.mouseLocation();
		
		//var eventType = 0;
		
		// mouse buttons can be determined with the userAgent navigator property. if it contains "Firefox" vs "Safari"
		/*if( theEvent.type == "mousedown" ){
			eventType = MokaMouseDown;
			_mouseIsDown = YES;
		} else if( theEvent.type == "mouseup" ){
			eventType = MokaMouseUp;
			_mouseIsDown = NO;
		} else if( theEvent.type == "contextmenu" ){
			eventType = MokaRightMouseDown;
			_mouseIsDown = NO;
		} else {
			eventType = MokaMouseMoved;
			if( _mouseIsDown ){ eventType = MokaMouseDragged; }
		}*/
		
		if( newEvent.type() == MokaMouseDown ){ _mouseIsDown = YES; }
		else if( newEvent.type() == MokaMouseUp || newEvent.type() == MokaRightMouseDown ){ _mouseIsDown = NO; }
		
		
		
		/*var flags = 0;
		if( theEvent.altKey ){ flags |= MokaAlternateKey; }
		if( theEvent.ctrlKey ){ flags |= MokaControlKey; }
		if( theEvent.shiftKey ){ flags |= MokaShiftKey; }*/
		
		//var newEvent = MokaEvent.mouseEvent( eventType, _mouseLocation, flags, 0, theEvent.button );
		var needsToSendMoveOrDrag = ( !this.mostRecentEvent() ? NO : ( newEvent.mouseLocation().x() != this.mostRecentEvent().mouseLocation().x() || newEvent.mouseLocation().y() != this.mostRecentEvent().mouseLocation().y() ) );
		_mostRecentEvent = newEvent;
		
			/*for( var i = 0; i < _respondersCapturingPagewideMouseEvents.count(); i++ ){
				if( eventType == MokaMouseDown ){ _respondersCapturingPagewideMouseEvents.objectAtIndex(i).mouseDown(newEvent); }
				else if( eventType == MokaMouseUp ){ _respondersCapturingPagewideMouseEvents.objectAtIndex(i).mouseUp(newEvent); }
				else if( eventType == MokaMouseMoved && needsToSendMoveOrDrag){	_respondersCapturingPagewideMouseEvents.objectAtIndex(i).mouseMoved(newEvent);	}
				else if( eventType == MokaMouseDragged && needsToSendMoveOrDrag){ _respondersCapturingPagewideMouseEvents.objectAtIndex(i).mouseDragged(newEvent); }
				else if( eventType == MokaRightMouseDown ){ _respondersCapturingPagewideMouseEvents.objectAtIndex(i).rightMouseDown(newEvent); }
			}*/
			
			for( var i = 0; i < _respondersCapturingPagewideMouseEvents.count(); i++ ){
				if( newEvent.type() == MokaMouseDown ){ _respondersCapturingPagewideMouseEvents.objectAtIndex(i).mouseDown(newEvent); }
				else if( newEvent.type() == MokaMouseUp ){ _respondersCapturingPagewideMouseEvents.objectAtIndex(i).mouseUp(newEvent); }
				else if( newEvent.type() == MokaMouseMoved && needsToSendMoveOrDrag){	_respondersCapturingPagewideMouseEvents.objectAtIndex(i).mouseMoved(newEvent);	}
				else if( newEvent.type() == MokaMouseDragged && needsToSendMoveOrDrag){ _respondersCapturingPagewideMouseEvents.objectAtIndex(i).mouseDragged(newEvent); }
				else if( newEvent.type() == MokaRightMouseDown ){ _respondersCapturingPagewideMouseEvents.objectAtIndex(i).rightMouseDown(newEvent); }
			}
			
			/*var hitPanel = null;
			var count;
			if( (count = _documentPanelLevel.count()) != 0 ){
				for( var i = 0, p = _documentPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			if( (count = _normalPanelLevel.count()) != 0 && hitPanel == null ){
				for( var i = 0, p = _normalPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			if( (count = _floatingPanelLevel.count()) != 0 && hitPanel == null ){
				for( var i = 0, p = _floatingPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			if( (count = _modalPanelLevel.count()) != 0 && hitPanel == null ){
				for( var i = 0, p = _modalPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			if( (count = _mainMenuPanelLevel.count()) != 0 && hitPanel == null ){
				for( var i = 0, p = _mainMenuPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			if( (count = _popUpMenuPanelLevel.count()) != 0 && hitPanel == null ){
				for( var i = 0, p = _popUpMenuPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			
			if( hitPanel ){
				if( hitPanel.ignoresMouseEvents() ){ return; }
				if( eventType != MokaMouseMoved || hitPanel.acceptsMouseMoveEvents() ){
					//myDiv.innerHTML = _mouseLocation.y();
					hitPanel.sendEvent(newEvent);
				}
			}
		*/
		
		var testview = theEvent.target;
		while( !is(testview.view) ){
			if( !testview.parentNode ){ return; }
			else{ testview = testview.parentNode; }			
		}
		
		var hitResponder = testview.view();
		var hitPanel = hitResponder;
		
		if( !hitResponder.isKindOfClass(MokaPanel) ){
			hitPanel = hitResponder.panel();
			if( hitPanel && hitPanel.ignoresMouseEvents() ){ return; }
			if( newEvent.type() == MokaMouseMoved && hitPanel && !hitPanel.acceptsMouseMoveEvents() ){ return; }
		} else {
			if( hitPanel.ignoresMouseEvents() ){ return; }
			if( newEvent.type() == MokaMouseMoved && !hitPanel.acceptsMouseMoveEvents() ){ return; }
		}
		
		if( hitPanel && hitPanel.willSendEventToResponder(newEvent,hitResponder) ){
		
			if( newEvent.type() == MokaMouseDown ){ hitResponder.mouseDown(newEvent); }
			else if( newEvent.type() == MokaMouseUp ){ hitResponder.mouseUp(newEvent); }
			else if( newEvent.type() == MokaRightMouseDown ){ hitResponder.rightMouseDown(newEvent); }
			else if( newEvent.type() == MokaRightMouseUp ){ hitResponder.rightMouseUp(newEvent); }
			else if( newEvent.type() == MokaOtherMouseDown ){ hitResponder.otherMouseDown(newEvent); }
			else if( newEvent.type() == MokaOtherMouseUp ){ hitResponder.otherMouseUp(newEvent); }
			else if( newEvent.type() == MokaMouseEntered ){ hitResponder.mouseEntered(newEvent); }
			else if( newEvent.type() == MokaMouseExited ){ hitResponder.mouseExited(newEvent); }
			else if( newEvent.type() == MokaMouseMoved ){ hitResponder.mouseMoved(newEvent); }
			else if( newEvent.type() == MokaMouseDragged ){ hitResponder.mouseDragged(newEvent); }
			else if( newEvent.type() == MokaRightMouseDragged ){ hitResponder.rightMouseDragged(newEvent); }
			else if( newEvent.type() == MokaOtherMouseDragged ){ hitResponder.otherMouseDragged(newEvent); }
			else if( newEvent.type() == MokaFlagsChanged ){ hitResponder.flagsChanged(newEvent); }
			else if( newEvent.type() == MokaScrollWheel ){ hitResponder.scrollWheel(newEvent); }
		
			hitPanel.didSendEvent(newEvent);
		}
		
		//myDiv.innerHTML += ".";
		
		return !newEvent.preventsDefault();
	}
	/*bool*/ this.keyEvent = function( theEvent ){
		
		//if( theEvent.keyCode == 17 || theEvent.keyCode == 18 || theEvent.keyCode == 224 ){ return; }
		
		_mouseLocation = new MokaPoint( theEvent.pageX, theEvent.pageY );
		
		var eventType = 0;		
		if( theEvent.type == "keypress" ){
			eventType = MokaKeyDown;
		} else if( theEvent.type == "keyup" ){
			eventType = MokaKeyUp;
		}
		
		var flags = 0;
		if( theEvent.altKey ){ flags |= MokaAlternateKey; }
		if( theEvent.ctrlKey ){ flags |= MokaControlKey; }
		if( theEvent.shiftKey ){ flags |= MokaShiftKey; }
		
		var charsNoMods = $s(String.fromCharCode(theEvent.keyCode)).lowercaseString();
		characters = charsNoMods.copy();
		if( theEvent.shiftKey ){ characters = characters.uppercaseString(); }
		
		var newEvent = MokaEvent.keyEvent( eventType, _mouseLocation, flags, 0, characters, charsNoMods, theEvent.keyCode );
		
		_mostRecentEvent = newEvent;
		
		for( var i = 0; i < _respondersCapturingPagewideKeyEvents.count(); i++ ){
			if( eventType == MokaKeyDown ){
				_respondersCapturingPagewideKeyEvents.objectAtIndex(i).keyDown(newEvent);
			} else {
				_respondersCapturingPagewideKeyEvents.objectAtIndex(i).keyUp(newEvent);
			}
		}
		
		if( this.keyPanel() ){
			this.keyPanel().sendEvent(newEvent);
		}
		
		return !newEvent.preventsDefault(); //return true or false depending on whether key event default behavior should be allowed for this event type
	}
	/*bool*/ this.scrollEvent = function( theEvent ){
		theEvent.preventDefault();
		
		var deltaY = 0;
		
		if( document.body.onmousewheel ){
			deltaY = theEvent.wheelDelta/12;
		} else {
			deltaY = -theEvent.detail;
		}
		
		if( deltaY != 0 ){
			_mouseLocation = new MokaPoint( theEvent.clientX, theEvent.clientY ); //does not work properly in Firefox
			
			var flags = 0;
			if( theEvent.altKey ){ flags |= MokaAlternateKey; }
			if( theEvent.ctrlKey ){ flags |= MokaControlKey; }
			if( theEvent.shiftKey ){ flags |= MokaShiftKey; }
			
			var newEvent = MokaEvent.scrollEvent( _mouseLocation, flags, 0, deltaY );
			
			_mostRecentEvent = newEvent;

			for( var i = 0; i < _respondersCapturingPagewideMouseEvents.count(); i++ ){
				_respondersCapturingPagewideMouseEvents.objectAtIndex(i).scrollWheel(newEvent);
			}

			var hitPanel = null;
			var count;
			if( (count = _documentPanelLevel.count()) != 0 ){
				for( var i = 0, p = _documentPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			if( (count = _normalPanelLevel.count()) != 0 && hitPanel == null ){
				for( var i = 0, p = _normalPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			if( (count = _floatingPanelLevel.count()) != 0 && hitPanel == null ){
				for( var i = 0, p = _floatingPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			if( (count = _modalPanelLevel.count()) != 0 && hitPanel == null ){
				for( var i = 0, p = _modalPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			if( (count = _mainMenuPanelLevel.count()) != 0 && hitPanel == null ){
				for( var i = 0, p = _mainMenuPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}
			if( (count = _popUpMenuPanelLevel.count()) != 0 && hitPanel == null ){
				for( var i = 0, p = _popUpMenuPanelLevel.objectAtIndex(i); i < count; i++ ){
					if(p.frame().containsPoint(_mouseLocation)){ hitPanel = p; break; }
				}
			}

			if( hitPanel ){
				if( hitPanel.ignoresMouseEvents() ){ return; }
				hitPanel.sendEvent(newEvent);
			}
			
		}
		
		return false;
	}
	
	//Tracking mouse events for non-target responders
	/*void*/ this.responderIsCapturingPagewideMouseEvents = function(aResponder,yn){
		if( aResponder == undefined ){ return; }
		if( typeof(aResponder.isKindOfClass) != "function" ){ return; }
		if( !aResponder.isKindOfClass(MokaResponder) ){ return; }
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		if( yn && !_respondersCapturingPagewideMouseEvents.containsObject(aResponder) ){ _respondersCapturingPagewideMouseEvents.addObject(aResponder); }
		else if( !yn ){ _respondersCapturingPagewideMouseEvents.removeObject(aResponder); }
	}
	/*void*/ this.responderIsCapturingPagewideKeyEvents = function(aResponder,yn){
		if( aResponder == undefined ){ return; }
		if( typeof(aResponder.isKindOfClass) != "function" ){ return; }
		if( !aResponder.isKindOfClass(MokaResponder) ){ return; }
		if( yn == undefined ){ return; }
		if( typeof(yn) != "boolean" ){ return; }
		
		if( yn && !_respondersCapturingPagewideKeyEvents.containsObject(aResponder) ){ _respondersCapturingPagewideKeyEvents.addObject(aResponder); }
		else if( !yn ){ _respondersCapturingPagewideKeyEvents.removeObject(aResponder); }
	}
	
	//Mouse information
	/*MokaPoint*/ this.mouseLocation = function(){
		return _mouseLocation;
	}
	/*bool*/ this.mouseIsDown = function(){
		return _mouseIsDown;
	}
	
	
	//Window information
	/*MokaSize*/ this.windowContentSize = function(){
		
	}
	

	
}

MokaPageSizeUnits = "px";