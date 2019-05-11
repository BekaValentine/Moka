function MokaNotificationCenter(){
	this.extend(MokaObject);
	
	/*	Dispatch table	*/
	var _dispatchTable = new Array;
	
	
	
	
	
	//Adding and removing observers
	/*void*/ this.addObserverWithSelectorNotificationNameAndObject = function(anObserver,aSelector,aString,anObject){
		if( anObserver == undefined ){ return; }
		if( typeof(anObserver.isKindOfClass) != "function" ){ return; }
		if( aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		
		if( aString != null ){
			if( aString == undefined ){ return; }
			if( typeof(aString.isKindOfClass) != "function" ){ return; }
			if( !aString.isKindOfClass(MokaString) ){ return; }
		}
		
		if( anObject != null ){
			if( anObject == undefined ){ return; }
			if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		}
		
		for(var m in _dispatchTable ){
			if(	_dispatchTable[m].observer == anObserver
			&&	_dispatchTable[m].selector == aSelector
			&&	_dispatchTable[m].name.isEqualToString(aString)
			&&	_dispatchTable[m].object == anObject ){
				return;
			}
		}
		
		_dispatchTable.push({
			observer: anObserver,
			selector: aSelector,
			name: aString,
			object: anObject
		});
	}
	/*void*/ this.removeObserver = function(anObserver){
		if( anObserver == undefined ){ return; }
		if( typeof(anObserver.isKindOfClass) != "function" ){ return; }
		
		var indexesToRemove = new Array;
		
		for( var m in _dispatchTable ){
			if( _dispatchTable[m].observer == anObserver ){
				indexesToRemove.push(m);
			}
		}
		for( var i in indexesToRemove ){
			delete _dispatchTable[i];
		}
	}
	/*void*/ this.removeObserverWithNameAndObject = function(anObserver,aName,anObject){
		if( anObserver == undefined ){ return; }
		if( typeof(anObserver.isKindOfClass) != "function" ){ return; }
		if( aName == undefined ){ return; }
		
		if( aString != null ){
			if( aString == undefined ){ return; }
			if( typeof(aString.isKindOfClass) != "function" ){ return; }
			if( !aString.isKindOfClass(MokaString) ){ return; }
		}
		
		if( anObject != null ){
			if( anObject == undefined ){ return; }
			if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		}
				
		var indexesToRemove = new Array;
		
		for( var m in _dispatchTable ){
			if( _dispatchTable[m].observer == anObserver
			&&	( aName == null || _dispatchTable[m].name.isEqualToString(aName) )
			&&	( anObject == null || _dispatchTable[m].object == anObject ) ){
				indexesToRemove.push(m);
			}
		}
		for( var i in indexesToRemove ){
			delete _dispatchTable[i];
		}
	}
	
	//Posting notifications
	/*void*/ this.postNotification = function(aNotification){
		if( aNotification == undefined ){ return; }
		if( typeof(aNotification.isKindOfClass) != "function" ){ return; }
		if( !aNotification.isKindOfClass(MokaNotification) ){ return; }
		
		for( var m in _dispatchTable ){
			if( _dispatchTable[m].name && aNotification.name() && _dispatchTable[m].name.isEqualToString(aNotification.name())
			&&	_dispatchTable[m].object && aNotification.object() && _dispatchTable[m].object == aNotification.object() ){
			
				_dispatchTable[m].observer[_dispatchTable[m].selector.selectorName()](_dispatchTable[m].object);
			
			} else if( _dispatchTable[m].name && aNotification.name() && _dispatchTable[m].name.isEqualToString(aNotification.name())
			&&	_dispatchTable[m].object == null ){
			
				_dispatchTable[m].observer[_dispatchTable[m].selector.selectorName()](_dispatchTable[m].object);
			
			} else if( _dispatchTable[m].object && aNotification.object() && _dispatchTable[m].object == aNotification.object()
			&&	_dispatchTable[m].name == null ){
			
				_dispatchTable[m].observer[_dispatchTable[m].selector.selectorName()](_dispatchTable[m].object);
			
			} else if( _dispatchTable[m].name == null && _dispatchTable[m].object == null ){
			
				_dispatchTable[m].observer[_dispatchTable[m].selector.selectorName()](_dispatchTable[m].object);
			
			}
		}
	}
	/*void*/ this.postNotificationWithNameAndObject = function(aName,anObject){
		if( aName == undefined ){ return; }
		if( typeof(aName.isKindOfClass) != "function" ){ return; }
		if( !aName.isKindOfClass(MokaString) ){ return; }
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		this.postNotification(MokaNotification.notificationWithNameAndObject(aName,anObject));
	}
	/*void*/ this.postNotificationWithNameObjectAndUserInfo = function(aName,anObject,userInfo){
		if( aName == undefined ){ return; }
		if( typeof(aName.isKindOfClass) != "function" ){ return; }
		if( !aName.isKindOfClass(MokaName) ){ return; }
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		if( userInfo == undefined ){ return; }
		if( typeof(userInfo.isKindOfClass) != "function" ){ return; }
		if( !userInfo.isKindOfClass(MokaDictionary) ){ return; }
		
		
		this.postNotification(MokaNotification.notificationWithNameObjectAndUserInfo(aName,anObject,userInfo));
	}
	
}

MokaNotificationCenter.defaultCenter = function(){
	if( !is(this._defaultCenter,MokaNotificationCenter) ){
		this._defaultCenter = MokaNotificationCenter.make().init();
	}
	
	return this._defaultCenter;
}