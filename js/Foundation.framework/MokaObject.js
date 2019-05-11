function MokaObject(){
	
	/*	Description	*/
	var _description = null;
	
	/*	Key-Value Observers	*/
	var _observers = new Array;
	
	/*	Class name	*/
	var _className = null;

	
	
	
	
	
	
	
	//Description
	/*MokaString*/ this.description = function(){
		if( !is(_description) ){
			_description = this.constructor.className()
		}
		return _description;
	}	
	/*void*/ this.setDescription = function(aMokaString){
		if( aMokaString == undefined ){ return; }
		if( typeof(aMokaString.isKindOfClass) != "function" ){ return; }
		if( !aMokaString.isKindOfClass(MokaString) ){ return; }
		
		_description = aMokaString;
	}
	
	//To string
	/*string*/ this.toString = function(){
		return "["+this.description()+"]"
	}	
	
	//Comparison
	/*
		Subclasses should override this to return custom values if the constructors are the same
	*/
	/*-1,0,1*/ this["<=>"] = function(o){
		if( is(o,Date) || is(o,Number) || is(o,String) ){ return -1; }
		else if( is(o,MokaObject) ){
			return (this.constructor.className())["<=>"](o.constructor.className());
		} else { return 1; }
	}
	/*bool*/ this.isEqual = function(o){
		return this == o;
	}
		
	//Initialization
	/*id*/ this.init = function(){
		return this;
	}
	
	//Class Identification
	/*bool*/ this.isKindOfClass = function( aClass ){
		
		if( typeof(aClass) != "function" ){
			return;
		}
		var object = this;
		while (object != null) {
			if (object instanceof aClass){
				return true;
			}
			if( typeof(object.superclass) == "function" ){
				object = new object.superclass;
			} else {
				//alert(typeof(object.superclass));
				object = null;
			}
		}
		return false;
		
	}
	/*bool*/ this.isMemberOfClass = function( aClass ){
		
		if( typeof(aClass) != "function" ){
			return;
		}
		
		if( this instanceof aClass ){
			return true;
		} else {
			return false;
		}
	}

	//Copying
	/*id*/ this.copy = function(){
		var copy = this.constructor.makeAndInit();
		var desc = ( this.description() ? $s(this.description().characters()) : null );
		copy.setDescription( desc );
		
		return copy;
	}

	//selectors
	/*bool*/ this.respondsToSelector = function(aSelector){
		if( typeof aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		
		return ( this[aSelector.selectorName()] ? YES : NO );
	}
	/*id*/ this.performSelector = function(aSelector){
		if( typeof aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		
		if( !this.respondsToSelector(aSelector) ){ return; }
		
		var returnValue = this[aSelector.selectorName()]();
		
		if( typeof(returnValue.isKindOfClass) != "function" ){ return; }
		
		return returnValue;
	}
	/*id*/ this.performSelectorWithObject = function(aSelector,anObject){
		if( aSelector == undefined ){ return; }
		if( typeof(aSelector.isKindOfClass) != "function" ){ return; }
		if( !aSelector.isKindOfClass(MokaSelector) ){ return; }
		if( anObject == undefined ){ return; }
		if( typeof(anObject.isKindOfClass) != "function" ){ return; }
		
		if( !this.respondsToSelector(aSelector)){ return; }
		
		var returnValue = this[aSelector.selectorName()](anObject);
		
		if( typeof(returnValue.isKindOfClass) != "function" ){ return; }
		
		return returnValue;
	}
	
	//Key-value coding: getting values
	/*id*/ this.valueForKey = function(aKeyString){
		if( typeof aKeyString == undefined ){ return; }
		if( typeof(aKeyString.isKindOfClass) != "function" ){ return; }
		if( !aKeyString.isKindOfClass(MokaString) ){ return; }
		
		var sel = $sel(aKeyString.characters());
		if( this.respondsToSelector(sel) ){
			return this[sel.selectorName()]();
		}
	}
	/*id*/ this.valueForKeyPath = function(aKeyPath){
		if( typeof aKeyPath == undefined ){ return; }
		if( typeof(aKeyPath.isKindOfClass) != "function" ){ return; }
		if( !aKeyPath.isKindOfClass(MokaString) ){ return; }
		
		var pathComponents = aKeyPath.componentsSeparatedByString($s("."));
		if( pathComponents.count() == 1 ){
			return this.valueForKey(aKeyPath);
		} else if( pathComponents.count() > 1 ){
			var sel = $sel(pathComponents.objectAtIndex(0).characters());
			
			if( this.respondsToSelector(sel) ){
				var o = this.performSelector(sel);
				if( is(o,MokaObject) ){
					return o.valueForKeyPath(pathComponents.rest().joinComponentsWithString($s(".")));
				}
			}
		}
	}
	/*MokaDictionary*/ this.dictionaryWithValuesForKeys = function(anArrayOfKeys){
		if( typeof anArrayOfKeys == undefined ){ return; }
		if( typeof(anArrayOfKeys.isKindOfClass) != "function" ){ return; }
		if( !anArrayOfKeys.isKindOfClass(MokaArray) ){ return; }
		
		var dict = new MokaDictionary;
		for( var i = 0; i < anArrayOfKeys.count(); i++ ){
			var o = anArrayOfKeys.objectAtIndex(i);
			if( typeof(o.isKindOfClass) == "function" && o.isKindOfClass(MokaString) ){
				var val = this.valueForKey(o);
				if( val ){
					dict.setObjectForKey(val,o);
				}
			}
		}
		return dict;
	}
	
	//Key-value coding: setting values
	/*void*/ this.setValueForKey = function(aValue,aKeyString){
		if( typeof aValue == undefined ){ return; }
		if( typeof aKeyString == undefined ){ return; }
		if( typeof(aKeyString.isKindOfClass) != "function" ){ return; }
		if( !aKeyString.isKindOfClass(MokaString) ){ return; }
		
		var selectorForKey = $s( "set" + aKeyString.capitalizedString().characters() );
		if( this.resondsToSelector(selectorForKey) ){
			this[selectorForKey.selectorName()](aValue);
		}
	}
	/*void*/ this.setValueForKeyPath = function(aValue,aKeyPath){
		if( typeof aValue == undefined ){ return; }
		if( typeof aKeyPath == undefined ){ return; }
		if( typeof(aKeyPath.isKindOfClass) != "function" ){ return; }
		if( !aKeyPath.isKindOfClass(MokaString) ){ return; }
		
		var pathComponents = aKeyPath.componentsSeparatedByString($s("."));
		if( pathComponents.count() == 1 ){
			return this.setValueForKey(aValue,aKeyPath);
		} else if( pathComponents.count() > 1 ){
			var sel = $sel(pathComponents.objectAtIndex(0).characters());
			
			if( this.respondsToSelector(sel) ){
				var o = this.performSelector(sel)
				if( is(o,MokaObject) ){
					return o.setValueForKeyPath(aValue,pathComponents.rest().joinComponentsWithString($s(".")));
				}
			}
		}
	}
	/*void*/ this.setValuesForKeysWithDictionary = function(aDictionary){
		if( typeof aDictionary == undefined ){ return; }
		if( typeof(aDictionary.isKindOfClass) != "function" ){ return; }
		if( !aDictionary.isKindOfClass(MokaDictionary) ){ return; }
		
		var keys = aDictionary.allKeys();
		for( var i = 0; i < keys.count(); i++ ){
			var key = keys.objectAtIndex(i);
			
			if( typeof(key.isKindOfClass) == "function" && key.isKindOfClass(MokaString) ){
				this.setValueForKey(aDictionary.objectForKey(key),key);
			}
		}
	}
	
	//Key-value observing
	/*void*/ this.observeValueForKeyPathOfObjectWithChangeAndContext = function(aKeyPath,anObject,aChange,aContext){
		//default implementation does nothing
	}
	/*void*/ this.addObserverForKeyPathWithOptionsAndContext = function(anObserver,aKeyPath,options,aContext){
		if( typeof anObserver == undefined ){ return; }
		if( typeof(anObserver.isKindOfClass) != "function" ){ return; }
		if( typeof aKeyPath == undefined ){ return; }
		if( typeof(aKeyPath.isKindOfClass) != "function" ){ return; }
		if( !aKeyPath.isKindOfClass(MokaString) ){ return; }
		if( typeof aChange == undefined ){ return; }
		if( typeof(aChange.isKindOfClass) != "function" ){ return; }
		if( !aChange.isKindOfClass(MokaDictionary) ){ return; }
		if( typeof aContext == undefined ){ return; }
		
		var newObserver = {	"observer": anObserver,
							"options": options,
							"context": aContext };
		
		if( !_observers[aKeyPath] ){ _observers[aKeyPath] = new Array; }
		_observers[aKeyPath].push(newObserver);
	}
	/*void*/ this.removeObserverForKey = function(anObserver,aKeyPath){
		if( !_observers[aKeyPath] ){ return; }
		
		for( var i in _observers[aKeyPath] ){
			if( _observers[aKeyPath][i].observer = anObserver ){
				delete(_observers[aKeyPath][i]);
			}
		}
	}
	/*void*/ this.valueChangedForKey = function(aKeyPath){
		if( !_observers[aKeyPath] ){ return; }
		
		var theChange;
		
		for( var i in _observers[aKeyPath] ){
			_observers[aKeyPath][i].observer.observerValueForKeyPathOfObjectWithChangeAndContext( aKeyPath, this, theChange, _observers[aKeyPath][i].context );
		}
	}
	
}
/*bool*/ MokaObject.automaticallyNotifiesObserversForKey = function(aKey){
	return YES;
}