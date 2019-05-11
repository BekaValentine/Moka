function _MokaCornerView(){
	this.extend(MokaView);
	
	//Size constraints
	/*MokaSize*/ this.constrainSize = function(aSize){
		return new MokaSize(16,16);
	}
		
}