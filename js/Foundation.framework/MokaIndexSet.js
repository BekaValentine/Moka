function MokaIndexSet(){
	this.extend(MokaObject);
	
	//Index ranges
	var _ranges = new MokaArray;
	
	
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		copy.initWithIndexSet(this);
		
		return copy;
	}
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_ranges.init();
		
		return this;
	}
	/*id*/ this.initWithIndex = function(anIndex){
		this.supers().init();
		_ranges.init();
		
		if( anIndex == undefined ){ return this; }
		if( !MokaNumberIsInt(anIndex) ){ return this; }
		if( anIndex < 0 ){ return this; }
		
		_ranges.addObject(new MokaRange(anIndex,1));
		return this;
	}
	/*id*/ this.initWithIndexesInRange = function(aRange){
		this.supers().init();
		_ranges.init();
		
		if( aRange == undefined ){ return this; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return this; }
		if( !aRange.isKindOfClass(MokaRange) ){ return this; }
		if( aRange.location() < 0 ){ return this; }
		
		_ranges.addObject(aRange);
		
		return this;
	}
	/*id*/ this.initWithIndexSet = function(anIndexSet){
		this.supers().init();
		_ranges.init();
		
		if( anIndexSet == undefined ){ return this; }
		if( typeof(anIndexSet.isKindOfClass) != "function" ){ return this; }
		if( !anIndexSet.isKindOfClass(MokaIndexSet) ){ return this; }
		
		_ranges = anIndexSet.allRanges();
		
		return this;
	}
	
	//Comparison
	/*bool*/ this.isEqualToIndexSet = function(anIndexSet){
		if( anIndexSet == undefined ){ return NO; }
		if( typeof(anIndexSet.isKindOfClass) != "function" ){ return NO; }
		if( !anIndexSet.isKindOfClass(MokaIndexSet) ){ return NO; }
		
		var otherIndexes = anIndexSet.allIndexes();
		
		if( otherIndexes.count() != _range.count() ){ return NO; }
		
		for( var i = 0; i < _ranges.count(); i++ ){
			var thisRange = _ranges.objectAtIndex(i);
			var matched = NO;
			for( var j = 0; j < otherIndexes.count(); i++ ){
				var thatRange = otherIndexes.objectAtIndex(j);
				if( thisRange.location() == thatRange.location() && thisRange.length() == thatRange.length() ){ matched = YES; }
			}
			if( !matched ){ return NO; }
		}
		return YES;
	}
	
	//Querying
	/*bool*/ this.containsIndex = function(anIndex){
		if( anIndex == undefined ){ return NO; }
		if( !MokaNumberIsInt(anIndex) ){ return NO; }
		
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() <= anIndex && r.location() + r.length() - 1 >= anIndex ){ return YES; }
		}
		return NO;
	}
	/*bool*/ this.containsIndexes = function(anIndexSet){
		if( anIndexSet == undefined ){ return NO; }
		if( typeof(anIndexSet.isKindOfClass) != "function" ){ return NO; }
		if( !anIndexSet.isKindOfClass(MokaIndexSet) ){ return NO; }
		
		if( _ranges.count() == 0 ){ return NO; }
		
		var otherIndexes = anIndexSet.allIndexes();
		for( var i = 0; i < otherIndexes.count(); i++ ){
			if( !this.containsIndexesInRange(otherIndexes.objectAtIndex(i)) ){ return NO; }
		}
		return YES;
	}
	/*bool*/ this.containsIndexesInRange = function(aRange){
		if( aRange == undefined ){ return NO; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return NO; }
		if( !aRange.isKindOfClass(MokaRange) ){ return NO; }
		
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() <= aRange.location() && r.location() + r.length() >= aRange.location() + aRange.length() ){ return YES; }
		}
		return NO;
	}
	/*bool*/ this.intersectsIndexesInRange = function(aRange){
		if( aRange == undefined ){ return NO; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return NO; }
		if( !aRange.isKindOfClass(MokaRange) ){ return NO; }
		
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() <= aRange.location() + aRange.length() - 1 && r.location() + r.length() - 1 >= aRange.location() ){ return YES; }
		}
		return NO;
	}
	/*int*/ this.count = function(){
		var count = 0;
		for( var i = 0; i < _ranges.count(); i++ ){
			count += _ranges.objectAtIndex(i).length();
		}
		return count;
	}
	
	//Accessing indexes
	/*MokaArray*/ this.allIndexes = function(){
		return _ranges;
	}
	/*int*/ this.firstIndex = function(){
		if( _ranges.count() == 0 ){ return -1; }
		
 		var lowest = _ranges.objectAtIndex(0).location();
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() < lowest ){ lowest = r.location(); }
		}
		return lowest;
	}
	/*int*/ this.lastIndex = function(){
		if( _ranges.count() == 0 ){ return -1; }
		
		var highest = _ranges.objectAtIndex(0);
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() > highest.location() ){ highest = r; }
		}
		return highest.location() + highest.length() - 1;
	}
	/*int*/ this.indexGreaterThanIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		if( anIndex < 0 ){ return -1; }
		
		var nearestAbove = -1;
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() <= anIndex && r.location() + r.length() - 1 > anIndex ){ return anIndex+1; }
			else if( r.location() > anIndex && nearestAbove > r.location() ){
					nearestAbove = r.location();
			}
		}
		
		return nearestAbove;
	}
	/*int*/ this.indexLessThanIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		if( anIndex < 0 ){ return -1; }
		
		var nearestBelow = -1;
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() < anIndex && r.location() + r.length() - 1 >= anIndex ){ return anIndex-1; }
			else if( r.location() < anIndex && nearestBelow < r.location() ){
					nearestBelow = r.location();
			}
		}
		
		return nearestBelow;
	}
	/*int*/ this.indexGreaterThanOrEqualToIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		if( anIndex < 0 ){ return -1; }
		
		var nearestAbove = -1;
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() <= anIndex && r.location() + r.length() - 1 >= anIndex ){ return anIndex; }
			else if( r.location() > anIndex && nearestAbove > r.location() ){
					nearestAbove = r.location();
			}
		}
		
		return nearestAbove;
	}
	/*int*/ this.indexLessThanOrEqualToIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		if( anIndex < 0 ){ return -1; }
		
		var nearestBelow = -1;
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() <= anIndex && r.location() + r.length() - 1 >= anIndex ){ return anIndex; }
			else if( r.location() < anIndex && nearestBelow < r.location() ){
					nearestBelow = r.location();
			}
		}
		
		return nearestBelow;
	}
	
	//Adding indexes
	/*void*/ this.addIndex = function(anIndex){
		if( anIndex == undefined ){ return; }
		if( !MokaNumberIsInt(anIndex) ){ return; }
		
		this.addIndexesInRange(new MokaRange(anIndex,1));
	}
	/*void*/ this.addIndexes = function(anIndexSet){
		if( anIndexSet == undefined ){ return; }
		if( typeof(anIndexSet.isKindOfClass) != "function" ){ return; }
		if( !anIndexSet.isKindOfClass(MokaIndexSet) ){ return; }
		
		var otherIndexes = anIndexSet.allIndexes();
		for( var i = 0; i < otherIndexes.count(); i++ ){
			this.addIndexesInRange(otherIndexes.objectAtIndex(i));
		}
	}
	/*void*/ this.addIndexesInRange = function(aRange){
		if( aRange == undefined ){ return; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return; }
		if( !aRange.isKindOfClass(MokaRange) ){ return; }
		
		if( aRange.length() <= 0 ){ return; }
		
		var lowest = aRange.location();
		var highest = aRange.location() + aRange.length() - 1;
		var rangesToMerge = new MokaArray;
		
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() <= aRange.location() + aRange.length() && r.location() + r.length() >= aRange.location() ){
				rangesToMerge.addObject(r);
				if( r.location() < lowest ){ lowest = r.location(); }
				if( r.location() + r.length() - 1 > highest ){ highest = r.location() + r.length() - 1; }
			}
		}
		
		_ranges.removeObjectsInArray(rangesToMerge);
		_ranges.addObject( new MokaRange(lowest,highest-lowest) );
	}
	
	//Removing indexes
	/*void*/ this.removeIndex = function(anIndex){
		if( removeIndex == undefined ){ return; }
		if( !MokaNumberIsInt(removeIndex) ){ return; }
		
		this.removeIndexesInRange(new MokaRange(anIndex,1));
	}
	/*void*/ this.removeIndexes = function(anIndexSet){
		if( anIndexSet == undefined ){ return; }
		if( typeof(anIndexSet.isKindOfClass) != "function" ){ return; }
		if( !anIndexSet.isKindOfClass(MokaIndexSet) ){ return; }
		
		var otherIndexes = anIndexSet.allIndexes();
		for( var i = 0; i < otherIndexes.count(); i++ ){
			this.removeIndexesInRange(otherIndexes.objectAtIndex(i));
		}
	}
	/*void*/ this.removeIndexesInRange = function(aRange){
		if( aRange == undefined ){ return; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return; }
		if( !aRange.isKindOfClass(MokaRange) ){ return; }
		
		var lowest = null;
		var highest = null;
		var rangesToDelete = new MokaArray;
		
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() <= aRange.location() + aRange.length() && r.location() + r.length() >= aRange.location() ){
				rangesToDelete.addObject(r);
				if( r.location() < aRange.location() ){ lowest = r.location(); }
				if( r.location() + r.length() > aRange.location() + aRange.length() ){ highest = r.location() + r.length() - 1; }
			}
		}
		
		_ranges.removeObjectsInArray(rangesToDelete);
		if( lowest ){
			_ranges.addObject( new MokaRange(lowest,aRange.location() - lowest) );
		}
		if( highest ){
			_ranges.addObject( new MokaRange(aRange.location() + aRange.length(),highest - aRange.location() - aRange.length()))
		}
	}
	
	//Shifting index groups
	/*void*/ this.shiftIndexesStartingAtIndexBy = function(startIndex,shift){
		if( startIndex == undefined ){ return; }
		if( !MokaNumberIsInt(startIndex) ){ return; }
		if( startIndex < 0 ){ return; }
		
		var rangesToShift = new MokaArray;
		
		for( var i = 0; i < _ranges.count(); i++ ){
			var r = _ranges.objectAtIndex(i);
			if( r.location() >= startIndex ){ rangesToShift.addObject( new MokaRange(r.location() + shift,r.length()) ); }
			else if( r.location() < startIndex && r.location() + r.length() - 1 > startIndex ){
				rangesToShift.addObject( new MokaRange(startIndex + shift,r.location() + r.length() - startIndex) );
			}
		}
		
		this.removeIndexesInRange( new MokaRange(startIndex + (shift < 0 ? shift : 0 ), this.lastIndex() - startIndex - (shift < 0 ? shift : 0 )) );
		_ranges.addObjectsInArray(rangesToShift);
	}

	/*string*/ this.toString = function(){
		var s = this.description()+"[";
		
		for( var i = 0; i < this.allIndexes().count(); i++ ){
			s += ( i == 0 ? " " : ", " ) + this.allIndexes().objectAtIndex();
		}
		
		return s + " ]";
	}
	
}
/*MokaIndexSet*/ MokaIndexSet.indexSetWithIndex = function(anIndex){
	var s = this.makeAndInit();
	s.addIndex(anIndex);
	return s;
}
/*MokaIndexSet*/ MokaIndexSet.indexSetWithIndexesInRange = function(aRange){
	var s = this.makeAndInit();
	s.addIndexesInRange(aRange);
	return s;
}