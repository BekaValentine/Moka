function MokaAttributedString(){
	this.extend(MokaObject);
	
	/*	The String	*/
	var _string = $s("");
	
	/*	Attributes Runs	*/
	var _attributeRuns = MokaDictionary.make().init();
	
	
	
	
	
	
	
	
	//Initialization
	/*id*/ this.initWithString = function(aString){
		this.supers().init();
		
		if( is(aString,MokaString) ){
			_string = aString.copy();
		}
		
		return this;
	}
	/*id*/ this.initWithAttributedString = function(anAttributedString){
		this.supers().init();
		
		if( is(anAttributedString,MokaAttributedString) ){
			this.appendAttributedString(anAttributedString);
		}
		
		return this;
	}
	/*id*/ this.initWithStringAndAttributes = function(aString,anAttributeDict){
		this.supers().init();
		
		if( is(aString,MokaString) && is(anAttributedDict,MokaDictionary) ){
			_string = aString.copy();
			this.setAttributesInRange(anAttributeDict,new MokaRange(0,_string,length()));
		}
		
		return this;
	}
	/*id*/ this.initWithHTMLAndIndentAmount = function(anHTMLString,indentAmount){
		
	}
	/*id*/ this.initWithURLAndIndentAmount = function(aURL,indentAmount){
		this.supers().init();
		
		if( !is(aURL,MokaURL) ){ return this; }
		
		return this.initWithHTMLAndIndentAmount(aURL.resourceData(),indentAmount);
	}
	
	//Character information
	/*MokaString*/ this.string = function(){
		return _string;
	}
	/*void*/ this.setString = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		this.replaceCharactersInRangeWithString(new MokaRange(0,aString.length()),aString);
	}
	/*int*/ this.length = function(){
		return this.string().length();
	}
	/*void*/ this.replaceCharactersInRangeWithString = function(aRange,aString){
		if( !is(aRange,MokaRange) || !is(aString,MokaString) ){ return; }
		
		if( aRange.first() < 0 ){
			aRange.setFirst(0);
		}
		if( aRange.last() > this.length() - 1){
			aRange.setLast( this.length() - 1 );
		}
		
		var difference = aString.length() - aRange.length();
		
		var rangeToInheritAttributesFrom = null;
		for( var i = 0; i < this._attributeRuns().count(); i++ ){
			var testRange = this._attributeRuns().allKeys().objectAtIndex(i);
			
			if( ( aRange.length() == 0 && testRange.last() == aRange.location() - 1 || testRange.first() - 1 == aRange.location() )
			||	testRange.contains(aRange.location()) ){
				rangeToInheritAttributesFrom = testRange;
				rangeToInheritAttributesFrom.setLast( rangeToInheritAttributesFrom.last() + difference );
			} else if( testRange.location() > aRange.location() ){
				testRange.setLocation( testRange.location() + difference );
			}
		}
		
		_string.replaceCharactersInRangeWithString(aRange,aString);
		
	}
	/*void*/ this.deleteCharactersInRange = function(aRange){
		this.replaceCharactersInRangeWithString(aRange,$s(""));
	}
		
	//Attribute information
	/*MokaDictionary*/ this.attributesAtIndexWithEffectiveRange = function(anIndex, aRange){
		if( !is(anIndex,"int") || !is(attributeName,MokaString) ){ return; }
		
		var theRange = null;
		var rangeFirstAbove = this.string().length();
		var rangeLastBelow = 0;
		for( var i = 0; i < this._attributeRuns().count(); i++ ){
			var run = this._attributeRuns().allKeys().objectAtIndex(i);
			if( run.contains(anInt) ){
				theRange = run;
				break;
			} else {
				if( run.first() < rangeFirstAbove ){
					rangeFirstAbove = range.first();
				}
				if( run.last() > rangeLastBelow ){
					rangeLastBelow = range.last();
				}
			}
		}
		
		if( theRange ){
			if( is(aRange,MokaRange) ){
				aRange.setLocation(theRange.location());
				aRange.setLength(theRange.length());
			}
			return this._attributeRuns().objectForKey(theRange);
		} else {
			aRange.setFirst(rangeLastBelow+1);
			aRange.setLast(rangeFirstAbove-1);
			return $dict();
		}
	}
	/*MokaDictionary*/ this.attributesAtIndexWithLongestEffectiveRangeInRange = function(anIndex, aRange, rangeLimit){
		if( !is(rangeLimit,MokaRange) || !is(anIndex,"int") ){ return; }

		var attrs = this.attributesAtIndexWithEffectiveRange(attributeName,anIndex,aRange);
		
		if( is(aRange,MokaRange) ){
			if( aRange.first() < rangeLimit.first() ){ aRange.setFirst(rangeLimit.first()); }
			if( aRange.last() > rangeLimit.last() ){ aRange.setLast(rangeLimit.last()); }
		}
		
		return attrs;
	}
	/*id*/ this.attributeAtIndexWithEffectiveRange = function(attributeName, anIndex, aRange){
		if( !is(anIndex,"int") || !is(attributeName,MokaString) ){ return; }
		
		var testRange = aRange.copy();
		
		var attrs = this.attributesAtIndexWithEffectiveRange(anIndex,testRange);
		if( attrs.containsKey(attributeName) ){
			aRange.setLocation(testRange.location());
			aRange.setLength(testRange.length());
			return attrs.objectForKey(attributeName);
		} else {
			aRange.setLocation(0);
			aRange.setLength(0);
		}
	}
	/*id*/ this.attributeAtIndexWithLongestEffectiveRangeInRange = function(attributeName, anIndex, aRange, rangeLimit){
		if( !is(attributeName,MokaString) || !is(anIndex,"int") || !is(rangeLimit,MokaRange) ){ return; }

		var attr = this.attributeAtIndexWithEffectiveRange(attributeName,anIndex,aRange);
		
		if( is(aRange,MokaRange) && aRange.length() != 0 ){
			if( aRange.first() < rangeLimit.first() ){ aRange.setFirst(rangeLimit.first()); }
			if( aRange.last() > rangeLimit.last() ){ aRange.setLast(rangeLimit.last()); }
		}
		
		return attr;
	}
	/*void*/ this.setAttributesInRange = function(anAttributeDict,aRange){
		if( anAttributeDict == undefined ){ return; }
		if( typeof(anAttributeDict.isKindOfClass) != "function" ){ return; }
		if( !anAttributeDict.isKindOfClass(MokaDictionary) ){ return; }
		if( aRange == undefined ){ return; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return; }
		if( !aRange.isKindOfClass(MokaRange) ){ return; }
		
		aRange = aRange.copy();
		anAttributeDict = anAttributeDict.copy();
		
		var runsToDelete = [];
		var runBefore = null;
		var runAfter = null;
		var runToSplit = null;
		
		for( var i = 0; i < this._attributeRuns().allKeys().count(); i++ ){
			var run = this._attributeRuns().allKeys().objectAtIndex(i);
			
			if( run.first() < aRange.first() && run.last() > aRange.last() ){
								
				runToSplit = run;
				break;
				
			} else if( run.first() >= aRange.first() && run.last() <= aRange.last() ){
								
				runsToDelete.push(run);
				
			} else if( run.first() >= aRange.first() && run.first() < aRange.last() ){
				
				run.setLength( run.last() - aRange.last() )
				run.setLocation( aRange.last() );
				runAfter = run;
				
			} else if( run.last() >= aRange.first() && run.last() < aRange.last() ){
				
				run.setLength( aRange.location() - run.location() );
				runBefore = run;
				
			}
		}
		
		for( var i = 0; i < runsToDelete.length; i++ ){
			this._attributeRuns().deleteObjectForKey(runsToDelete[i]);
		}
		
		if( runToSplit ){
			var duplicateRun = runToSplit.copy();
			var duplicateEntries = MokaDictionary.dictionaryWithDictionary(_attributeStrings.objectForKey(runToSplit));
			for( var i = 0; i < duplicateEntries.count(); i++ ){
				var o = duplicateEntries.allObjects().objectAtIndex(i);
				if( is(o,MokaObject) ){
					duplicateEntries.setObjectForKey(	o.copy(),
														duplicateEntries.allKeysForObject(o).objectAtIndex(0) );
				}
			}
			
			runToSplit.setLast( aRange.first() - 1 );

			duplicateRun.setFirst( aRange.last() + 1 );
			this._attributeRuns().setObjectForKey(duplicateEntries,duplicateRun);
		}
		
		this._attributeRuns().setObjectForKey(aRange,anAttributeDict);
				
		this._mergeAdjacentRunsWithIdenticalAttributes();
	}
	/*void*/ this.addAttributeWithValueInRange = function(anAttribute,aValue,aRange){
		if( anAttribute == undefined ){ return; }
		if( typeof(anAttribute.isKindOfClass) != "function" ){ return; }
		if( !anAttribute.isKindOfClass(MokaString) ){ return; }
		if( aValue == undefined ){ return; }
		if( aRange == undefined ){ return; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return; }
		if( !aRange.isKindOfClass(MokaRange) ){ return; }
		
		var runsToAdd = [];
		
		for( var i = 0; i < this._attributeRuns().allKeys().count(); i++ ){
			var run = this._attributeRuns().allKeys().objectAtIndex(i);
			var entries = this._attributeRuns().objectForKey(run);
			
			if( run.first() <= aRange.last() && run.last() >= aRange.first() ){
				if( run.first() < aRange.first() && run.last() >= aRange.first() && run.last() <= aRange.last() ){
					//the run overlaps the range partially at the range's beginning
					//split into 2, make run the latter of the two
					var duplicateRun = run.copy();
					duplicateRun.setLast( aRange.first() - 1 );
					var duplicateEntries = entries.copy()
					for( var i = 0; i < duplicateEntries.count(); i++ ){
						var k = duplicateEntries.allKeys().objectAtIndex(i);
						var v = duplicateEntries.objectForKey(k);
						duplicateEntries.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRun,duplicateEntries] );
					
					run.setFirst( aRange.first() );
					entries.setObjectForKey(anAttribute,aValue);
				} else if( run.first() <= aRange.last() && run.first() >= aRange.first() && run.last() > aRange.last() ){
					//the run overlaps the range partially at the range's beginning
					//split into 2, make run the former of the two
					
					var duplicateRun = run.copy();
					duplicateRun.setFirst( aRange.last() + 1 );
					var duplicateEntries = entries.copy()
					for( var i = 0; i < duplicateEntries.count(); i++ ){
						var k = duplicateEntries.allKeys().objectAtIndex(i);
						var v = duplicateEntries.objectForKey(k);
						duplicateEntries.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRun,duplicateEntries] );
					
					run.setLast( aRange.last() + 1 );
					entries.setObjectForKey(anAttribute,aValue);
				} else if( run.first() < aRange.first() && run.last() > aRange.last() ){
					//the run overlaps on both ends of the range, and is larger than the range
					//split into 3, make run the middle of the three
										
					var duplicateRunBefore = run.copy();
					duplicateRunBefore.setLast( aRange.first() - 1 );
					var duplicateEntriesBefore = entries.copy()
					for( var i = 0; i < duplicateEntriesBefore.count(); i++ ){
						var k = duplicateEntriesBefore.allKeys().objectAtIndex(i);
						var v = duplicateEntriesBefore.objectForKey(k);
						duplicateEntriesBefore.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRunBefore,duplicateEntriesBefore] );
					
					var duplicateRunAfter = run.copy();
					duplicateRunAfter.setLast( aRange.last() + 1 );
					var duplicateEntriesAfter = entries.copy()
					for( var i = 0; i < duplicateEntriesAfter.count(); i++ ){
						var k = duplicateEntriesAfter.allKeys().objectAtIndex(i);
						var v = duplicateEntriesAfter.objectForKey(k);
						duplicateEntriesAfter.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRunAfter,duplicateEntriesAfter] );
					
					run.setLocation( aRange.location() );
					run.setLength( aRange.length() );
					entries.setObjectForKey(anAttribute,aValue);
					
					break;
				}
			}
		}
		
		for( var i = 0; i < runsToAdd.length; i++ ){
			this._attributeRuns().setObjectForKey(runsToAdd[1],runsToAdd[0]);
		}
		
		this._mergeAdjacentRunsWithIdenticalAttributes();
	}
	/*void*/ this.addAttributesInRange = function(anAttributeDict,aRange){
		if( anAttributeDict == undefined ){ return; }
		if( typeof(anAttributeDict.isKindOfClass) != "function" ){ return; }
		if( !anAttributeDict.isKindOfClass(MokaDictionary) ){ return; }
		if( aRange == undefined ){ return; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return; }
		if( !aRange.isKindOfClass(MokaRange) ){ return; }
		
		var runsToAdd = [];
		
		for( var i = 0; i < this._attributeRuns().allKeys().count(); i++ ){
			var run = this._attributeRuns().allKeys().objectAtIndex(i);
			var entries = this._attributeRuns().objectForKey(run);
			
			if( run.first() <= aRange.last() && run.last() >= aRange.first() ){
				if( run.first() < aRange.first() && run.last() >= aRange.first() && run.last() <= aRange.last() ){
					//the run overlaps the range partially at the range's beginning
					//split into 2, make run the latter of the two
					var duplicateRun = run.copy();
					duplicateRun.setLast( aRange.first() - 1 );
					var duplicateEntries = entries.copy()
					for( var i = 0; i < duplicateEntries.count(); i++ ){
						var k = duplicateEntries.allKeys().objectAtIndex(i);
						var v = duplicateEntries.objectForKey(k);
						duplicateEntries.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRun,duplicateEntries] );
					
					run.setFirst( aRange.first() );
					entries.addEntriesFromDictionary(anAttributeDict);
				} else if( run.first() <= aRange.last() && run.first() >= aRange.first() && run.last() > aRange.last() ){
					//the run overlaps the range partially at the range's beginning
					//split into 2, make run the former of the two
					
					var duplicateRun = run.copy();
					duplicateRun.setFirst( aRange.last() + 1 );
					var duplicateEntries = entries.copy()
					for( var i = 0; i < duplicateEntries.count(); i++ ){
						var k = duplicateEntries.allKeys().objectAtIndex(i);
						var v = duplicateEntries.objectForKey(k);
						duplicateEntries.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRun,duplicateEntries] );
					
					run.setLast( aRange.last() + 1 );
					entries.addEntriesFromDictionary(anAttributeDict);
				} else if( run.first() < aRange.first() && run.last() > aRange.last() ){
					//the run overlaps on both ends of the range, and is larger than the range
					//split into 3, make run the middle of the three
										
					var duplicateRunBefore = run.copy();
					duplicateRunBefore.setLast( aRange.first() - 1 );
					var duplicateEntriesBefore = entries.copy()
					for( var i = 0; i < duplicateEntriesBefore.count(); i++ ){
						var k = duplicateEntriesBefore.allKeys().objectAtIndex(i);
						var v = duplicateEntriesBefore.objectForKey(k);
						duplicateEntriesBefore.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRunBefore,duplicateEntriesBefore] );
					
					var duplicateRunAfter = run.copy();
					duplicateRunAfter.setLast( aRange.last() + 1 );
					var duplicateEntriesAfter = entries.copy()
					for( var i = 0; i < duplicateEntriesAfter.count(); i++ ){
						var k = duplicateEntriesAfter.allKeys().objectAtIndex(i);
						var v = duplicateEntriesAfter.objectForKey(k);
						duplicateEntriesAfter.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRunAfter,duplicateEntriesAfter] );
					
					run.setLocation( aRange.location() );
					run.setLength( aRange.length() );
					entries.addEntriesFromDictionary(anAttributeDict);
					
					break;
				}
			}
		}
		
		for( var i = 0; i < runsToAdd.length; i++ ){
			this._attributeRuns().setObjectForKey(runsToAdd[1],runsToAdd[0]);
		}
		
		this._mergeAdjacentRunsWithIdenticalAttributes();
	}
	/*void*/ this.removeAttributeInRange = function(anAttribute,aRange){
		if( anAttribute == undefined ){ return; }
		if( typeof(anAttribute.isKindOfClass) != "function" ){ return; }
		if( !anAttribute.isKindOfClass(MokaString) ){ return; }
		if( aRange == undefined ){ return; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return; }
		if( !aRange.isKindOfClass(MokaRange) ){ return; }
		
		var runsToAdd = [];
		
		for( var i = 0; i < this._attributeRuns().allKeys().count(); i++ ){
			var run = this._attributeRuns().allKeys().objectAtIndex(i);
			var entries = this._attributeRuns().objectForKey(run);
			
			if( run.first() <= aRange.last() && run.last() >= aRange.first() ){
				if( run.first() < aRange.first() && run.last() >= aRange.first() && run.last() <= aRange.last() ){
					//the run overlaps the range partially at the range's beginning
					//split into 2, make run the latter of the two
					var duplicateRun = run.copy();
					duplicateRun.setLast( aRange.first() - 1 );
					var duplicateEntries = entries.copy()
					for( var i = 0; i < duplicateEntries.count(); i++ ){
						var k = duplicateEntries.allKeys().objectAtIndex(i);
						var v = duplicateEntries.objectForKey(k);
						duplicateEntries.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRun,duplicateEntries] );
					
					run.setFirst( aRange.first() );
					entries.removeObjectForKey(anAttribute);
				} else if( run.first() <= aRange.last() && run.first() >= aRange.first() && run.last() > aRange.last() ){
					//the run overlaps the range partially at the range's beginning
					//split into 2, make run the former of the two
					
					var duplicateRun = run.copy();
					duplicateRun.setFirst( aRange.last() + 1 );
					var duplicateEntries = entries.copy()
					for( var i = 0; i < duplicateEntries.count(); i++ ){
						var k = duplicateEntries.allKeys().objectAtIndex(i);
						var v = duplicateEntries.objectForKey(k);
						duplicateEntries.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRun,duplicateEntries] );
					
					run.setLast( aRange.last() + 1 );
					entries.removeObjectForKey(anAttribute);
				} else if( run.first() < aRange.first() && run.last() > aRange.last() ){
					//the run overlaps on both ends of the range, and is larger than the range
					//split into 3, make run the middle of the three
										
					var duplicateRunBefore = run.copy();
					duplicateRunBefore.setLast( aRange.first() - 1 );
					var duplicateEntriesBefore = entries.copy()
					for( var i = 0; i < duplicateEntriesBefore.count(); i++ ){
						var k = duplicateEntriesBefore.allKeys().objectAtIndex(i);
						var v = duplicateEntriesBefore.objectForKey(k);
						duplicateEntriesBefore.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRunBefore,duplicateEntriesBefore] );
					
					var duplicateRunAfter = run.copy();
					duplicateRunAfter.setLast( aRange.last() + 1 );
					var duplicateEntriesAfter = entries.copy()
					for( var i = 0; i < duplicateEntriesAfter.count(); i++ ){
						var k = duplicateEntriesAfter.allKeys().objectAtIndex(i);
						var v = duplicateEntriesAfter.objectForKey(k);
						duplicateEntriesAfter.setObjectForKey( (is(v,MokaObject) ? v.copy() : v), k );
					}					
					runsToAdd.push( [duplicateRunAfter,duplicateEntriesAfter] );
					
					run.setLocation( aRange.location() );
					run.setLength( aRange.length() );
					entries.removeObjectForKey(anAttribute);
					
					break;
				}
			}
		}
		
		for( var i = 0; i < runsToAdd.length; i++ ){
			this._attributeRuns().setObjectForKey(runsToAdd[1],runsToAdd[0]);
		}
		
		this._mergeAdjacentRunsWithIdenticalAttributes();
	}
	
	//Utility
	/*MokaDictionary*/ this._attributeRuns = function(){
		return _attributeRuns;
	}	
	/*void*/ this._mergeAdjacentRunsWithIdenticalAttributes = function(){
		var runsToDelete = [];
		var sortedRanges = _attributeRuns.allKeys().sortedArrayUsingFunctionWithContext(function(range1,range2){
			if( range1.location() < range2.location() ){ return MokaOrderedAscending; }
			else if( range1.location() > range2.location() ){ return MokaOrderedDescending; }
			return MokaOrderedEqual;
		},null);
		
		
		for( var i = sortedRanges.count() - 2; i >= 0; i-- ){
			var run = sortedRanges.objectAtIndex(i);
			var attributes = _attributeRuns.objectForKey(run);
			var followingRun = sortedRanges.objectAtIndex(i+1);
			var followingAttributes = _attributeRuns.objectForKey(followingRun);
			
			if( attributes.count() != followingAttributes.count() ){ continue; }
			
			var runsHaveSameProperties = YES;
			
			for( var j = 0; j < attributes.count(); i++ ){
				var k = attribues.allKeys().objectAtIndex(i);
				if( !followingAttributes.containsKey(k) ){
					runsHaveSameProperties = NO;
					break;
				}
				var value = attributes.objectForKey(k);
				var followingValue = followingAttributes.objectForKey(k);
				
				if( is(value,MokaObject) && is(followingValue,MokaObject) ){
					if( !value.isEqualTo(followingValue) ){
						runsHaveSameProperties = NO;
						break;
					}
				} else if( value != followingValue ){
					runsHaveSameProperties = NO;
					break;
				}
			}
			
			if( runsHaveSameProperties ){
				run.setLast( followingRun.last() );
				runsToDelete.push(followingRun);
			}
		}
		
		for( var i = 0; i < runsToDelete.length; i++ ){
			_attributeRuns.removeObjectForKey(_attributeRuns.allKeys().objectAtIndex(i));
		}
	}
		
	//Changing characters and attributes
	/*void*/ this.appendAttributedString = function(anAttributedString){
		if( anAttributedString == undefined ){ return; }
		if( typeof(anAttributedString.isKindOfClass) != "function" ){ return; }
		if( !anAttributedString.isKindOfClass(MokaAttributedString) ){ return; }
		
		this.string().appendString(anAttributedString.string());
		
		var newAttributeRuns = $dict();
		for( var i = 0; i < this._attributeRuns().count(); i++ ){
			var run = this._attributeRuns().allKeys().objectAtIndex(i);
			var attributes = this._attributeRuns().objectForKey(run).copy();
			for( var j = 0; j < attributes.count(); j++ ){
				var k = attributes.allKeys().objectAtIndex(j);
				var v = attributes.objectForKey(k);
				if( is(v,MokaObject) ){
					attributes.setObjectForKey(v,k);
				}
			}
			run = run.copy();
			run.setLocation( run.location() + this.length() - 1 );
			newAttributes.setObjectForKey(attributes,run);
		}
		
		this._attributeRuns().addEntriesFromDictionary(newAttributeRuns);
				
	}
	/*void*/ this.insertAttributedStringAtIndex = function(anAttributedString,anIndex){
		if( !is(anAttributedString,MokaAttributedString) || !is(anIndex,"int") || anIndex < 0 || anIndex >= this.length() ){ return; }
		
		var stringBefore = this.attributedSubstringFromRange($r(0,anIndex-1));
		var stringAfter = this.attributedSubstringFromRange($r(anIndex,this.length()-1));
		
		stringBefore.appendAttributedString(anAttributedString);
		stringBefore.appendAttributedString(stringAfter);
		
		return stringBefore;
	}
	/*void*/ this.replaceCharactersInRangeWithAttributedString = function(aRange,anAttributedString){
		if( !is(anAttributedString,MokaAttributedString) || !is(aRange,MokaRange) ){ return; }
		
		if( aRange.first() < 0 ){
			aRange.setFirst(0);
		}
		if( aRange.last() >= this.length() ){
			aRange.setLast( this.length() - 1 );
		}
		
		var stringBefore = this.attributedSubstringFromRange($r(0,aRange.first()-1));
		var stringAfter = this.attributedSubstringFromRange($r(aRange.first(),aRange.last()));
		
		stringBefore.appendAttributedString(anAttributedString);
		stringBefore.appendAttributedString(stringAfter);
		
		return stringBefore;
	}
	/*void*/ this.setAttributedString = function(anAttributedString){
		if( anAttributedString == undefined ){ return; }
		if( typeof(anAttributedString.isKindOfClass) != "function" ){ return; }
		if( !anAttributedString.isKindOfClass(MokaAttributedString) ){ return; }
		
		this.replaceCharactersInRangeWithAttributedString(new MokaRange(0,this.length()), anAttributedString);
	}
		
	//Comparing attributed strings
	/*bool*/ this.isEqualToAttribuedString = function(anAttributedString){
		if( anAttributedString == undefined ){ return NO; }
		if( typeof(anAttributedString.isKindOfClass) != "function" ){ return NO; }
		if( !anAttributedString.isKindOfClass(MokaAttributedString) ){ return NO; }
		
		if( this.string().length() != anAttributedString.string().length() ){ return NO; }
		if( this.string().characters() != anAttributedString.string().characters() ){ return NO; }
		
		if( this._attributes().count() != anAttributedString._attributes().count() ){ return NO; }
		
		for( var i = 0; i < this._attributes().count(); i++ ){
			var run = this._attributes.allKeys().objectAtIndex(i);
			if( !attributedString._attributes().allKeys().containsObjectEqualTo(run) ){
				return NO;
			}
			var attrs = this._attributeRuns().objectForKey(run);
			var otherAttrs = anAttributeString._attributeRuns().objectForKey(run);
			if( attrs.count() != otherAttrs.count() ){ return NO; }
			
			for( var j = 0; j = attrs.count(); j++ ){
				var k = attrs.allKeys().objectAtIndex(j);
				var value = attrs.objectForKey(k);
				var otherValue = otherAttrs.objectForKey(k);
				if( (is(value,mokaObject) && !value.isEqualTo(otherValue)) || value != otherValue ){
					return NO;
				}				
			}
		}
		
		return YES;
		
	}
	
	//Extracting a substring
	/*MokaAttributedString*/ this.attributedSubstringFromRange = function(aRange){
		if( !is(aRange,MokaRange) ){ return; }
		
		var newAttributedString = MokaAttributedString.make().init();
		newAttributedString.setString(this.string().substringInRange(aRange));
		
		for( var i = 0; i < this._attributeRuns().count(); i++ ){
			var newRun = this._attributeRuns().allKeys().objectAtIndex(i);
			if( newRun.last() < aRange.first() || newRun.first() > aRange.last() ){ continue; }
						
			var attributes = this._attributeRuns().objectForKey(newRun);
			for( var j = 0; j < attributes.count(); j++ ){
				var k = attributes.allKeys().objectAtIndex(j);
				var v = attributes.objectForKey(k);
				if( is(v,MokaObject) ){
					attributes.setObjectForKey(v,k);
				}
			}
			
			newRun = newRun.copy();
			if( newRun.first() < aRange.first() ){
				newRun.setFirst( aRange.first() );
			}
			if( newRun.last() > aRange.last() ){
				newRun.setLast( aRange.last() );
			}
			
			newAttributedString._attributeRuns().setObjectForKey(attributes,newRun);
						
		}
		
		return newAttributedString;
	}
	
	//Generating data
	/*MokaString*/ this.HTMLFromRangeWithIndentAmount = function(aRange,indentAmount){
		if( !is(aRange,MokaRange) ){ return; }
		
		if( !is(indentAmount,"int") ){ indentAmount = 1; }
		
		var indentTabs = "\t".times(indentAmount);
		
		var htmlString = $s("");
		
		if( this.string().length() == 0 ){ return htmlString; }
		
		var sortedAttributes = this._attributes().sortedArrayUsingFunctionWithContext(function(range1,range2){
			if(range1.location() < range2.location()){ return MokaOrderedAscending; }
			else if( range1.location() > range2.location() ){ return MokaOrderedDescending; }
			return mokaOrderedEqual;
		},null);
		
		var paragraphs = this.string().split(/[\n\r(\n\r)\u2029]+/)
		
		lengthToParagraph = 0;
		for( var i = 0; i < paragraphs.count(); i++ ){
			var paragraph = paragraphs.objectAtIndex(i);
			var para = (i == 0 ? "" : "\n") + indentTabs + "<p>";
			
			var nextIndex = 0;
			while(nextIndex < paragraph.length()){
				var range = $r(0,0);
				var attributesAtIndex = this.attributesAtIndexWithLongestEffectiveRangeInRange(	nextIndex+lengthToParagraph,
																								range,
																								new MokaRange(	lengthToParagraph,
																												paragraph.length() ));
				
				var linkURL = null;
				var altText = null;
				var sub = NO;
				var supe = NO;
				if(attributesAtIndex.count() != 0 ){
					para += "<span style='"
					var decoration = "";					
					for( var j = 0; j < attributesAtIndex.count(); j++ ){
						if( j != 0 ){ para += " "; }
						var attrName = attributesAtIndex.allKeys().objectAtIndex(j);
						var value = attributesAtIndex.objectForKey(attrName);
						
						switch(attrName){
							case MokaFontAttributeName:
								para += "font: " + value;
								break;
							case MokaForegroundColorAttributeName:
								para += "color: " + value;
								break;
							case MokaUnderlineStyleAttributeName:
								decoration += ( !decoration ? "decoration: " : " " ) + value;
								break;
							case MokaStrikeStyleAttributeName:
								decoration += ( !decoration ? "decoration: " : " " ) + value;
								break;
							case MokaOverlineStyleAttributeName:
								decoration += ( !decoration ? "decoration: " : " " ) + value;
								break;
							case MokaTextTransformAttributeName:
								para += "text-transform: " + value;
								break;
							case MokaSubscriptAttributeName:
								sub = YES;
								break;
							case MokaSuperscriptAttributeName:
								supe = YES;
								break;
							case MokaBackgroundColorAttributeName:
								para += "background-color: " + value;
								break;
							case MokaBaselineOffsetAttributeName:
								para += "margin-bottom: " + value;
								break;
							case MokaKernAttributeName:
								para += "letter-spacing: " + value;
								break;
							case MokaWordSpacingAttributeName:
								para += "word-spacing: " + value;
								break;
							case MokaLinkAttributeName:
								linkURL = value;
								break;
							case MokaCursorAttributeName:
								para += "cursor: " + value;
								break;
							case MokaToolTipAttributeName:
								altText = value;
								break;
						}
						
						para += ";"
					}
					
					if( decoration ){
						para += decoration + ";";
					}
					
					para += "' ";
					
					if( altText && !linkURL ){
						para += "alt='" + altText + "' ";
					}
					
					para += ">"
					
				}
				
				if( linkURL ){
					para += "<a href='" + linkURL.location() + "' ";
					if( altText ){
						para += "alt='" + altText + "' ";
					}
					para += ">"
				}
				
				if( sub ){ para += "<sub>"; }
				if( supe ){ para += "<sup>"; }
				
				para += paragraph.substringFromRange(range);
				
				if( supe ){ para += "</sup>"; }
				if( sub ){ para += "</sub>"; }
				
				if( linkURL ){
					para += "</a>"
				}
				
				if(attributesAtIndex.count() != 0 ){
					para += "</span>";
				}
				nextIndex += range.length();
			}
			para += "</p>";
			htmlString.appendString($s(para));
			lengthToParagraph += paragraph.length();
		}
		
		return htmlString;
	}
	/*string*/ this.toString = function(){
		return this.HTMLFromRangeWithIndexAmount().toString();
	}
	
}

//Standard attributes
MokaFontAttributeName = $s("MokaFontAttributeName");
MokaForegroundColorAttributeName = $s("MokaForegroundColorAttributeName");
MokaUnderlineStyleAttributeName = $s("MokaUnderlineStyleAttributeName");
MokaStrikeStyleAttributeName = $s("MokaStringStyleAttributeName");
MokaOverlineStyleAttributeName = $s("MokaOverlineStyleAttributeName");
MokaSubscriptAttributeName = $s("MokaSubscriptAttributeName");
MokaSuperscriptAttributeName = $s("MokaSuperscriptAttributeName");
MokaBackgroundColorAttributeName = $s("MokaBackgroundColorAttributeName");
MokaBaselineOffsetAttributeName = $s("MokaBaselineOffsetAttributeName");
MokaKernAttributeName = $s("MokaKernAttributeName");
MokaWordSpacingAttributeName = $s("MokaWordSpacingAttributeName");
MokaLinkAttributeName = $s("MokaLinkAttributeName");
MokaCursorAttributeName = $s("MokaCursorAttributeName");
MokaToolTipAttributeName = $s("MokaToolTipAttributeName");
MokaTextTransformAttributeName = $s("MokaTextTransformAttributeName");