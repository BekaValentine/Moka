function MokaCharacterSet(){
	this.extend(MokaObject);
	
	/*Set Range*/
	var _codepoints = new MokaIndexSet;
	
	
	
	
	
	
	
	
	/*id*/ this.copy = function(){
		var copy;
		if( typeof(this.supers().copy) == "function" ){ copy = this.supers().copy(); }
		else{ copy = this.constructor.makeAndInit(); }
		
		var codepoints = this.codepoints().enumerator();
		var r;
		while( r = codepoints.nextObject() ){
			copy.addCharactersInRange(r);
		}
		
		return copy;
	}
	
	//Initialization
	/*id*/ this.init = function(){
		this.supers().init();
		
		_codepoints.init();
		
		return this;
	}
	
	//Testing characterset membership
	/*bool*/ this.characterIsMember = function(aJSString){
		if( aJSString == undefined ){ return; }
		if( typeof(aJSString) != "string" ){ return; }
		
		return _codepoints.containsIndex(aJSString.charCodeAt(0));
	}
	/*bool*/ this.hasMemberInPlane = function(aCharacterPlane){
		if( aCharacterPlane == undefined ){ return; }
		if( !MokaNumberIsInt(aCharacterPlane) ){ return; }
		
		return _codepoints.intersectsIndexesInRange( new MokaRange(65536*aCharacterPlane,65536) );
		
	}
	/*bool*/ this.isSupersetOfSet = function(aCharacterSet){
		if( aCharacterSet == undefined ){ return; }
		if( typeof(aCharacterSet.isKindOfClass) != "function" ){ return; }
		if( !aCharacterSet.isKindOfClass(MokaCharacterSet) ){ return; }
		
		return _codepoints.containsIndexes(aCharacterSet.codepoints());
		
	}
	
	//Inverting a character set
	/*MokaCharacterSet*/ this.invertedSet = function(){
		var complementarySet = MokaIndexSet.indexSetWithIndexesInRange( new MokaRange(0,1114112) )
		complementarySet.removeIndexes(_codepoints);
		return complementarySet;
	}
	/*void*/ this.invert = function(){
		_codepoints = this.invertedSet().codepoints();
	}
	
	//Adding and removing characters
	/*void*/ this.addCharactersInRange = function(aRange){
		if( aRange == undefined ){ return; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return; }
		if( !aRange.isKindOfClass(MokaRange) ){ return; }
		
		_codepoints.addIndexesInRange(aRange);
		
	}
	/*void*/ this.addCharactersInRanges = function(){
		for( var m in arguments ){
			this.addCharactersInRange(arguments[m]);
		}
	}	
	/*void*/ this.removeCharactersInRange = function(aRange){
		if( aRange == undefined ){ return; }
		if( typeof(aRange.isKindOfClass) != "function" ){ return; }
		if( !aRange.isKindOfClass(MokaRange) ){ return; }
		
		_codepoints.removeIndexesInRange(aRange);
		
	}
	/*void*/ this.removeCharactersInRanges = function(){
		for( var m in arguments ){
			this.removeCharactersInRange(arguments[m]);
		}
	}
	/*void*/ this.addCharactersInString = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		for( var i = 0; i < aString.length(); i++ ){
			this.addCharactersInRange( new MokaRange(aString.characterAtIndex(i).charCodeAt(0),1) );
		}
	}
	/*void*/ this.removeCharactersInString = function(aString){
		if( aString == undefined ){ return; }
		if( typeof(aString.isKindOfClass) != "function" ){ return; }
		if( !aString.isKindOfClass(MokaString) ){ return; }
		
		for( var i = 0; i < aString.length(); i++ ){
			this.removeCharactersInRange( new MokaRange(aString.characterAtIndex(i).charCodeAt(0),1) );
		}
	}
	
	//Combining character sets
	/*void*/ this.formIntersectionWithCharacterSet = function(aCharacterSet){
		if( aCharacterSet == undefined ){ return; }
		if( typeof(aCharacterSet.isKindOfClass) != "function" ){ return; }
		if( !aCharacterSet.isKindOfClass(MokaCharacterSet) ){ return; }
		
		_codepoints.removeIndexes(this.invertedSet().codepoints());
	}
	/*void*/ this.formUnionWithCharacterSet = function(aCharacterSet){
		if( aCharacterSet == undefined ){ return; }
		if( typeof(aCharacterSet.isKindOfClass) != "function" ){ return; }
		if( !aCharacterSet.isKindOfClass(MokaCharacterSet) ){ return; }
		
		_codepoints.addIndexes(aCharacterSet.codepoints());
	}
	
	//Getting the character codepoints
	/*MokaIndexSet*/ this.codepoints = function(){
		return _codepoints.copy()
	}
	
}

/*MokaCharacterSet*/ MokaCharacterSet.alphanumericCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("alphanumericCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(65, 26), new MokaRange(192, 23), new MokaRange(216, 7), new MokaRange(256, 1), new MokaRange(258, 1),
				new MokaRange(260, 1), new MokaRange(262, 1), new MokaRange(264, 1), new MokaRange(266, 1), new MokaRange(268, 1),
				new MokaRange(270, 1), new MokaRange(272, 1), new MokaRange(274, 1), new MokaRange(276, 1), new MokaRange(278, 1),
				new MokaRange(280, 1), new MokaRange(282, 1), new MokaRange(284, 1), new MokaRange(286, 1), new MokaRange(288, 1),
				new MokaRange(290, 1), new MokaRange(292, 1), new MokaRange(294, 1), new MokaRange(296, 1), new MokaRange(298, 1),
				new MokaRange(300, 1), new MokaRange(302, 1), new MokaRange(304, 1), new MokaRange(306, 1), new MokaRange(308, 1),
				new MokaRange(310, 1), new MokaRange(313, 1), new MokaRange(315, 1), new MokaRange(317, 1), new MokaRange(319, 1),
				new MokaRange(321, 1), new MokaRange(323, 1), new MokaRange(325, 1), new MokaRange(327, 1), new MokaRange(330, 1),
				new MokaRange(332, 1), new MokaRange(334, 1), new MokaRange(336, 1), new MokaRange(338, 1), new MokaRange(340, 1),
				new MokaRange(342, 1), new MokaRange(344, 1), new MokaRange(346, 1), new MokaRange(348, 1), new MokaRange(350, 1),
				new MokaRange(352, 1), new MokaRange(354, 1), new MokaRange(356, 1), new MokaRange(358, 1), new MokaRange(360, 1),
				new MokaRange(362, 1), new MokaRange(364, 1), new MokaRange(366, 1), new MokaRange(368, 1), new MokaRange(370, 1),
				new MokaRange(372, 1), new MokaRange(374, 1), new MokaRange(376, 2), new MokaRange(379, 1), new MokaRange(381, 1),
				new MokaRange(385, 2), new MokaRange(388, 1), new MokaRange(390, 2), new MokaRange(393, 3), new MokaRange(398, 4),
				new MokaRange(403, 2), new MokaRange(406, 3), new MokaRange(412, 2), new MokaRange(415, 2), new MokaRange(418, 1),
				new MokaRange(420, 1), new MokaRange(422, 2), new MokaRange(425, 1), new MokaRange(428, 1), new MokaRange(430, 2),
				new MokaRange(433, 3), new MokaRange(437, 1), new MokaRange(439, 2), new MokaRange(444, 1), new MokaRange(452, 1),
				new MokaRange(455, 1), new MokaRange(458, 1), new MokaRange(461, 1), new MokaRange(463, 1), new MokaRange(465, 1),
				new MokaRange(467, 1), new MokaRange(469, 1), new MokaRange(471, 1), new MokaRange(473, 1), new MokaRange(475, 1),
				new MokaRange(478, 1), new MokaRange(480, 1), new MokaRange(482, 1), new MokaRange(484, 1), new MokaRange(486, 1),
				new MokaRange(488, 1), new MokaRange(490, 1), new MokaRange(492, 1), new MokaRange(494, 1), new MokaRange(497, 1),
				new MokaRange(500, 1), new MokaRange(502, 3), new MokaRange(506, 1), new MokaRange(508, 1), new MokaRange(510, 1),
				new MokaRange(512, 1), new MokaRange(514, 1), new MokaRange(516, 1), new MokaRange(518, 1), new MokaRange(520, 1),
				new MokaRange(522, 1), new MokaRange(524, 1), new MokaRange(526, 1), new MokaRange(528, 1), new MokaRange(530, 1),
				new MokaRange(532, 1), new MokaRange(534, 1), new MokaRange(536, 1), new MokaRange(538, 1), new MokaRange(540, 1),
				new MokaRange(542, 1), new MokaRange(544, 1), new MokaRange(546, 1), new MokaRange(548, 1), new MokaRange(550, 1),
				new MokaRange(552, 1), new MokaRange(554, 1), new MokaRange(556, 1), new MokaRange(558, 1), new MokaRange(560, 1),
				new MokaRange(562, 1), new MokaRange(570, 2), new MokaRange(573, 2), new MokaRange(577, 1), new MokaRange(579, 4),
				new MokaRange(584, 1), new MokaRange(586, 1), new MokaRange(588, 1), new MokaRange(590, 1), new MokaRange(902, 1),
				new MokaRange(904, 3), new MokaRange(908, 1), new MokaRange(910, 2), new MokaRange(913, 17), new MokaRange(931, 9),
				new MokaRange(978, 3), new MokaRange(984, 1), new MokaRange(986, 1), new MokaRange(988, 1), new MokaRange(990, 1),
				new MokaRange(992, 1), new MokaRange(994, 1), new MokaRange(996, 1), new MokaRange(998, 1), new MokaRange(1000, 1),
				new MokaRange(1002, 1), new MokaRange(1004, 1), new MokaRange(1006, 1), new MokaRange(1012, 1), new MokaRange(1015, 1),
				new MokaRange(1017, 2), new MokaRange(1021, 51), new MokaRange(1120, 1), new MokaRange(1122, 1), new MokaRange(1124, 1),
				new MokaRange(1126, 1), new MokaRange(1128, 1), new MokaRange(1130, 1), new MokaRange(1132, 1), new MokaRange(1134, 1),
				new MokaRange(1136, 1), new MokaRange(1138, 1), new MokaRange(1140, 1), new MokaRange(1142, 1), new MokaRange(1144, 1),
				new MokaRange(1146, 1), new MokaRange(1148, 1), new MokaRange(1150, 1), new MokaRange(1152, 1), new MokaRange(1162, 1),
				new MokaRange(1164, 1), new MokaRange(1166, 1), new MokaRange(1168, 1), new MokaRange(1170, 1), new MokaRange(1172, 1),
				new MokaRange(1174, 1), new MokaRange(1176, 1), new MokaRange(1178, 1), new MokaRange(1180, 1), new MokaRange(1182, 1),
				new MokaRange(1184, 1), new MokaRange(1186, 1), new MokaRange(1188, 1), new MokaRange(1190, 1), new MokaRange(1192, 1),
				new MokaRange(1194, 1), new MokaRange(1196, 1), new MokaRange(1198, 1), new MokaRange(1200, 1), new MokaRange(1202, 1),
				new MokaRange(1204, 1), new MokaRange(1206, 1), new MokaRange(1208, 1), new MokaRange(1210, 1), new MokaRange(1212, 1),
				new MokaRange(1214, 1), new MokaRange(1216, 2), new MokaRange(1219, 1), new MokaRange(1221, 1), new MokaRange(1223, 1),
				new MokaRange(1225, 1), new MokaRange(1227, 1), new MokaRange(1229, 1), new MokaRange(1232, 1), new MokaRange(1234, 1),
				new MokaRange(1236, 1), new MokaRange(1238, 1), new MokaRange(1240, 1), new MokaRange(1242, 1), new MokaRange(1244, 1),
				new MokaRange(1246, 1), new MokaRange(1248, 1), new MokaRange(1250, 1), new MokaRange(1252, 1), new MokaRange(1254, 1),
				new MokaRange(1256, 1), new MokaRange(1258, 1), new MokaRange(1260, 1), new MokaRange(1262, 1), new MokaRange(1264, 1),
				new MokaRange(1266, 1), new MokaRange(1268, 1), new MokaRange(1270, 1), new MokaRange(1272, 1), new MokaRange(1274, 1),
				new MokaRange(1276, 1), new MokaRange(1278, 1), new MokaRange(1280, 1), new MokaRange(1282, 1), new MokaRange(1284, 1),
				new MokaRange(1286, 1), new MokaRange(1288, 1), new MokaRange(1290, 1), new MokaRange(1292, 1), new MokaRange(1294, 1),
				new MokaRange(1296, 1), new MokaRange(1298, 1), new MokaRange(1329, 38), new MokaRange(4256, 38), new MokaRange(7680, 1),
				new MokaRange(7682, 1), new MokaRange(7684, 1), new MokaRange(7686, 1), new MokaRange(7688, 1), new MokaRange(7690, 1),
				new MokaRange(7692, 1), new MokaRange(7694, 1), new MokaRange(7696, 1), new MokaRange(7698, 1), new MokaRange(7700, 1),
				new MokaRange(7702, 1), new MokaRange(7704, 1), new MokaRange(7706, 1), new MokaRange(7708, 1), new MokaRange(7710, 1),
				new MokaRange(7712, 1), new MokaRange(7714, 1), new MokaRange(7716, 1), new MokaRange(7718, 1), new MokaRange(7720, 1),
				new MokaRange(7722, 1), new MokaRange(7724, 1), new MokaRange(7726, 1), new MokaRange(7728, 1), new MokaRange(7730, 1),
				new MokaRange(7732, 1), new MokaRange(7734, 1), new MokaRange(7736, 1), new MokaRange(7738, 1), new MokaRange(7740, 1),
				new MokaRange(7742, 1), new MokaRange(7744, 1), new MokaRange(7746, 1), new MokaRange(7748, 1), new MokaRange(7750, 1),
				new MokaRange(7752, 1), new MokaRange(7754, 1), new MokaRange(7756, 1), new MokaRange(7758, 1), new MokaRange(7760, 1),
				new MokaRange(7762, 1), new MokaRange(7764, 1), new MokaRange(7766, 1), new MokaRange(7768, 1), new MokaRange(7770, 1),
				new MokaRange(7772, 1), new MokaRange(7774, 1), new MokaRange(7776, 1), new MokaRange(7778, 1), new MokaRange(7780, 1),
				new MokaRange(7782, 1), new MokaRange(7784, 1), new MokaRange(7786, 1), new MokaRange(7788, 1), new MokaRange(7790, 1),
				new MokaRange(7792, 1), new MokaRange(7794, 1), new MokaRange(7796, 1), new MokaRange(7798, 1), new MokaRange(7800, 1),
				new MokaRange(7802, 1), new MokaRange(7804, 1), new MokaRange(7806, 1), new MokaRange(7808, 1), new MokaRange(7810, 1),
				new MokaRange(7812, 1), new MokaRange(7814, 1), new MokaRange(7816, 1), new MokaRange(7818, 1), new MokaRange(7820, 1),
				new MokaRange(7822, 1), new MokaRange(7824, 1), new MokaRange(7826, 1), new MokaRange(7828, 1), new MokaRange(7840, 1),
				new MokaRange(7842, 1), new MokaRange(7844, 1), new MokaRange(7846, 1), new MokaRange(7848, 1), new MokaRange(7850, 1),
				new MokaRange(7852, 1), new MokaRange(7854, 1), new MokaRange(7856, 1), new MokaRange(7858, 1), new MokaRange(7860, 1),
				new MokaRange(7862, 1), new MokaRange(7864, 1), new MokaRange(7866, 1), new MokaRange(7868, 1), new MokaRange(7870, 1),
				new MokaRange(7872, 1), new MokaRange(7874, 1), new MokaRange(7876, 1), new MokaRange(7878, 1), new MokaRange(7880, 1),
				new MokaRange(7882, 1), new MokaRange(7884, 1), new MokaRange(7886, 1), new MokaRange(7888, 1), new MokaRange(7890, 1),
				new MokaRange(7892, 1), new MokaRange(7894, 1), new MokaRange(7896, 1), new MokaRange(7898, 1), new MokaRange(7900, 1),
				new MokaRange(7902, 1), new MokaRange(7904, 1), new MokaRange(7906, 1), new MokaRange(7908, 1), new MokaRange(7910, 1),
				new MokaRange(7912, 1), new MokaRange(7914, 1), new MokaRange(7916, 1), new MokaRange(7918, 1), new MokaRange(7920, 1),
				new MokaRange(7922, 1), new MokaRange(7924, 1), new MokaRange(7926, 1), new MokaRange(7928, 1), new MokaRange(7944, 8),
				new MokaRange(7960, 6), new MokaRange(7976, 8), new MokaRange(7992, 8), new MokaRange(8008, 6), new MokaRange(8025, 1),
				new MokaRange(8027, 1), new MokaRange(8029, 1), new MokaRange(8031, 1), new MokaRange(8040, 8), new MokaRange(8120, 4),
				new MokaRange(8136, 4), new MokaRange(8152, 4), new MokaRange(8168, 5), new MokaRange(8184, 4), new MokaRange(8450, 1),
				new MokaRange(8455, 1), new MokaRange(8459, 3), new MokaRange(8464, 3), new MokaRange(8469, 1), new MokaRange(8473, 5),
				new MokaRange(8484, 1), new MokaRange(8486, 1), new MokaRange(8488, 1), new MokaRange(8490, 4), new MokaRange(8496, 4),
				new MokaRange(8510, 2), new MokaRange(8517, 1), new MokaRange(8579, 1), new MokaRange(11264, 47), new MokaRange(11360, 1),
				new MokaRange(11362, 3), new MokaRange(11367, 1), new MokaRange(11369, 1), new MokaRange(11371, 1), new MokaRange(11381, 1),
				new MokaRange(11392, 1), new MokaRange(11394, 1), new MokaRange(11396, 1), new MokaRange(11398, 1), new MokaRange(11400, 1),
				new MokaRange(11402, 1), new MokaRange(11404, 1), new MokaRange(11406, 1), new MokaRange(11408, 1), new MokaRange(11410, 1),
				new MokaRange(11412, 1), new MokaRange(11414, 1), new MokaRange(11416, 1), new MokaRange(11418, 1), new MokaRange(11420, 1),
				new MokaRange(11422, 1), new MokaRange(11424, 1), new MokaRange(11426, 1), new MokaRange(11428, 1), new MokaRange(11430, 1),
				new MokaRange(11432, 1), new MokaRange(11434, 1), new MokaRange(11436, 1), new MokaRange(11438, 1), new MokaRange(11440, 1),
				new MokaRange(11442, 1), new MokaRange(11444, 1), new MokaRange(11446, 1), new MokaRange(11448, 1), new MokaRange(11450, 1),
				new MokaRange(11452, 1), new MokaRange(11454, 1), new MokaRange(11456, 1), new MokaRange(11458, 1), new MokaRange(11460, 1),
				new MokaRange(11462, 1), new MokaRange(11464, 1), new MokaRange(11466, 1), new MokaRange(11468, 1), new MokaRange(11470, 1),
				new MokaRange(11472, 1), new MokaRange(11474, 1), new MokaRange(11476, 1), new MokaRange(11478, 1), new MokaRange(11480, 1),
				new MokaRange(11482, 1), new MokaRange(11484, 1), new MokaRange(11486, 1), new MokaRange(11488, 1), new MokaRange(11490, 1),
				new MokaRange(65313, 26), new MokaRange(66560, 40), new MokaRange(119808, 26), new MokaRange(119860, 26), new MokaRange(119912, 26),
				new MokaRange(119964, 1), new MokaRange(119966, 2), new MokaRange(119970, 1), new MokaRange(119973, 2), new MokaRange(119977, 4),
				new MokaRange(119982, 8), new MokaRange(120016, 26), new MokaRange(120068, 2), new MokaRange(120071, 4), new MokaRange(120077, 8),
				new MokaRange(120086, 7), new MokaRange(120120, 2), new MokaRange(120123, 4), new MokaRange(120128, 5), new MokaRange(120134, 1),
				new MokaRange(120138, 7), new MokaRange(120172, 26), new MokaRange(120224, 26), new MokaRange(120276, 26), new MokaRange(120328, 26),
				new MokaRange(120380, 26), new MokaRange(120432, 26), new MokaRange(120488, 25), new MokaRange(120546, 25), new MokaRange(120604, 25),
				new MokaRange(120662, 25), new MokaRange(120720, 25), new MokaRange(120778, 1),
				new MokaRange(97, 26), new MokaRange(170, 1), new MokaRange(181, 1), new MokaRange(186, 1), new MokaRange(223, 24),
				new MokaRange(248, 8), new MokaRange(257, 1), new MokaRange(259, 1), new MokaRange(261, 1), new MokaRange(263, 1),
				new MokaRange(265, 1), new MokaRange(267, 1), new MokaRange(269, 1), new MokaRange(271, 1), new MokaRange(273, 1),
				new MokaRange(275, 1), new MokaRange(277, 1), new MokaRange(279, 1), new MokaRange(281, 1), new MokaRange(283, 1),
				new MokaRange(285, 1), new MokaRange(287, 1), new MokaRange(289, 1), new MokaRange(291, 1), new MokaRange(293, 1),
				new MokaRange(295, 1), new MokaRange(297, 1), new MokaRange(299, 1), new MokaRange(301, 1), new MokaRange(303, 1),
				new MokaRange(305, 1), new MokaRange(307, 1), new MokaRange(309, 1), new MokaRange(311, 2), new MokaRange(314, 1),
				new MokaRange(316, 1), new MokaRange(318, 1), new MokaRange(320, 1), new MokaRange(322, 1), new MokaRange(324, 1),
				new MokaRange(326, 1), new MokaRange(328, 2), new MokaRange(331, 1), new MokaRange(333, 1), new MokaRange(335, 1),
				new MokaRange(337, 1), new MokaRange(339, 1), new MokaRange(341, 1), new MokaRange(343, 1), new MokaRange(345, 1),
				new MokaRange(347, 1), new MokaRange(349, 1), new MokaRange(351, 1), new MokaRange(353, 1), new MokaRange(355, 1),
				new MokaRange(357, 1), new MokaRange(359, 1), new MokaRange(361, 1), new MokaRange(363, 1), new MokaRange(365, 1),
				new MokaRange(367, 1), new MokaRange(369, 1), new MokaRange(371, 1), new MokaRange(373, 1), new MokaRange(375, 1),
				new MokaRange(378, 1), new MokaRange(380, 1), new MokaRange(382, 3), new MokaRange(387, 1), new MokaRange(389, 1),
				new MokaRange(392, 1), new MokaRange(396, 2), new MokaRange(402, 1), new MokaRange(405, 1), new MokaRange(409, 3),
				new MokaRange(414, 1), new MokaRange(417, 1), new MokaRange(419, 1), new MokaRange(421, 1), new MokaRange(424, 1),
				new MokaRange(426, 2), new MokaRange(429, 1), new MokaRange(432, 1), new MokaRange(436, 1), new MokaRange(438, 1),
				new MokaRange(441, 2), new MokaRange(445, 3), new MokaRange(454, 1), new MokaRange(457, 1), new MokaRange(460, 1),
				new MokaRange(462, 1), new MokaRange(464, 1), new MokaRange(466, 1), new MokaRange(468, 1), new MokaRange(470, 1),
				new MokaRange(472, 1), new MokaRange(474, 1), new MokaRange(476, 2), new MokaRange(479, 1), new MokaRange(481, 1),
				new MokaRange(483, 1), new MokaRange(485, 1), new MokaRange(487, 1), new MokaRange(489, 1), new MokaRange(491, 1),
				new MokaRange(493, 1), new MokaRange(495, 2), new MokaRange(499, 1), new MokaRange(501, 1), new MokaRange(505, 1),
				new MokaRange(507, 1), new MokaRange(509, 1), new MokaRange(511, 1), new MokaRange(513, 1), new MokaRange(515, 1),
				new MokaRange(517, 1), new MokaRange(519, 1), new MokaRange(521, 1), new MokaRange(523, 1), new MokaRange(525, 1),
				new MokaRange(527, 1), new MokaRange(529, 1), new MokaRange(531, 1), new MokaRange(533, 1), new MokaRange(535, 1),
				new MokaRange(537, 1), new MokaRange(539, 1), new MokaRange(541, 1), new MokaRange(543, 1), new MokaRange(545, 1),
				new MokaRange(547, 1), new MokaRange(549, 1), new MokaRange(551, 1), new MokaRange(553, 1), new MokaRange(555, 1),
				new MokaRange(557, 1), new MokaRange(559, 1), new MokaRange(561, 1), new MokaRange(563, 7), new MokaRange(572, 1),
				new MokaRange(575, 2), new MokaRange(578, 1), new MokaRange(583, 1), new MokaRange(585, 1), new MokaRange(587, 1),
				new MokaRange(589, 1), new MokaRange(591, 69), new MokaRange(661, 27), new MokaRange(891, 3), new MokaRange(912, 1),
				new MokaRange(940, 35), new MokaRange(976, 2), new MokaRange(981, 3), new MokaRange(985, 1), new MokaRange(987, 1),
				new MokaRange(989, 1), new MokaRange(991, 1), new MokaRange(993, 1), new MokaRange(995, 1), new MokaRange(997, 1),
				new MokaRange(999, 1), new MokaRange(1001, 1), new MokaRange(1003, 1), new MokaRange(1005, 1), new MokaRange(1007, 5),
				new MokaRange(1013, 1), new MokaRange(1016, 1), new MokaRange(1019, 2), new MokaRange(1072, 48), new MokaRange(1121, 1),
				new MokaRange(1123, 1), new MokaRange(1125, 1), new MokaRange(1127, 1), new MokaRange(1129, 1), new MokaRange(1131, 1),
				new MokaRange(1133, 1), new MokaRange(1135, 1), new MokaRange(1137, 1), new MokaRange(1139, 1), new MokaRange(1141, 1),
				new MokaRange(1143, 1), new MokaRange(1145, 1), new MokaRange(1147, 1), new MokaRange(1149, 1), new MokaRange(1151, 1),
				new MokaRange(1153, 1), new MokaRange(1163, 1), new MokaRange(1165, 1), new MokaRange(1167, 1), new MokaRange(1169, 1),
				new MokaRange(1171, 1), new MokaRange(1173, 1), new MokaRange(1175, 1), new MokaRange(1177, 1), new MokaRange(1179, 1),
				new MokaRange(1181, 1), new MokaRange(1183, 1), new MokaRange(1185, 1), new MokaRange(1187, 1), new MokaRange(1189, 1),
				new MokaRange(1191, 1), new MokaRange(1193, 1), new MokaRange(1195, 1), new MokaRange(1197, 1), new MokaRange(1199, 1),
				new MokaRange(1201, 1), new MokaRange(1203, 1), new MokaRange(1205, 1), new MokaRange(1207, 1), new MokaRange(1209, 1),
				new MokaRange(1211, 1), new MokaRange(1213, 1), new MokaRange(1215, 1), new MokaRange(1218, 1), new MokaRange(1220, 1),
				new MokaRange(1222, 1), new MokaRange(1224, 1), new MokaRange(1226, 1), new MokaRange(1228, 1), new MokaRange(1230, 2),
				new MokaRange(1233, 1), new MokaRange(1235, 1), new MokaRange(1237, 1), new MokaRange(1239, 1), new MokaRange(1241, 1),
				new MokaRange(1243, 1), new MokaRange(1245, 1), new MokaRange(1247, 1), new MokaRange(1249, 1), new MokaRange(1251, 1),
				new MokaRange(1253, 1), new MokaRange(1255, 1), new MokaRange(1257, 1), new MokaRange(1259, 1), new MokaRange(1261, 1),
				new MokaRange(1263, 1), new MokaRange(1265, 1), new MokaRange(1267, 1), new MokaRange(1269, 1), new MokaRange(1271, 1),
				new MokaRange(1273, 1), new MokaRange(1275, 1), new MokaRange(1277, 1), new MokaRange(1279, 1), new MokaRange(1281, 1),
				new MokaRange(1283, 1), new MokaRange(1285, 1), new MokaRange(1287, 1), new MokaRange(1289, 1), new MokaRange(1291, 1),
				new MokaRange(1293, 1), new MokaRange(1295, 1), new MokaRange(1297, 1), new MokaRange(1299, 1), new MokaRange(1377, 39),
				new MokaRange(7424, 44), new MokaRange(7522, 22), new MokaRange(7545, 34), new MokaRange(7681, 1), new MokaRange(7683, 1),
				new MokaRange(7685, 1), new MokaRange(7687, 1), new MokaRange(7689, 1), new MokaRange(7691, 1), new MokaRange(7693, 1),
				new MokaRange(7695, 1), new MokaRange(7697, 1), new MokaRange(7699, 1), new MokaRange(7701, 1), new MokaRange(7703, 1),
				new MokaRange(7705, 1), new MokaRange(7707, 1), new MokaRange(7709, 1), new MokaRange(7711, 1), new MokaRange(7713, 1),
				new MokaRange(7715, 1), new MokaRange(7717, 1), new MokaRange(7719, 1), new MokaRange(7721, 1), new MokaRange(7723, 1),
				new MokaRange(7725, 1), new MokaRange(7727, 1), new MokaRange(7729, 1), new MokaRange(7731, 1), new MokaRange(7733, 1),
				new MokaRange(7735, 1), new MokaRange(7737, 1), new MokaRange(7739, 1), new MokaRange(7741, 1), new MokaRange(7743, 1),
				new MokaRange(7745, 1), new MokaRange(7747, 1), new MokaRange(7749, 1), new MokaRange(7751, 1), new MokaRange(7753, 1),
				new MokaRange(7755, 1), new MokaRange(7757, 1), new MokaRange(7759, 1), new MokaRange(7761, 1), new MokaRange(7763, 1),
				new MokaRange(7765, 1), new MokaRange(7767, 1), new MokaRange(7769, 1), new MokaRange(7771, 1), new MokaRange(7773, 1),
				new MokaRange(7775, 1), new MokaRange(7777, 1), new MokaRange(7779, 1), new MokaRange(7781, 1), new MokaRange(7783, 1),
				new MokaRange(7785, 1), new MokaRange(7787, 1), new MokaRange(7789, 1), new MokaRange(7791, 1), new MokaRange(7793, 1),
				new MokaRange(7795, 1), new MokaRange(7797, 1), new MokaRange(7799, 1), new MokaRange(7801, 1), new MokaRange(7803, 1),
				new MokaRange(7805, 1), new MokaRange(7807, 1), new MokaRange(7809, 1), new MokaRange(7811, 1), new MokaRange(7813, 1),
				new MokaRange(7815, 1), new MokaRange(7817, 1), new MokaRange(7819, 1), new MokaRange(7821, 1), new MokaRange(7823, 1),
				new MokaRange(7825, 1), new MokaRange(7827, 1), new MokaRange(7829, 7), new MokaRange(7841, 1), new MokaRange(7843, 1),
				new MokaRange(7845, 1), new MokaRange(7847, 1), new MokaRange(7849, 1), new MokaRange(7851, 1), new MokaRange(7853, 1),
				new MokaRange(7855, 1), new MokaRange(7857, 1), new MokaRange(7859, 1), new MokaRange(7861, 1), new MokaRange(7863, 1),
				new MokaRange(7865, 1), new MokaRange(7867, 1), new MokaRange(7869, 1), new MokaRange(7871, 1), new MokaRange(7873, 1),
				new MokaRange(7875, 1), new MokaRange(7877, 1), new MokaRange(7879, 1), new MokaRange(7881, 1), new MokaRange(7883, 1),
				new MokaRange(7885, 1), new MokaRange(7887, 1), new MokaRange(7889, 1), new MokaRange(7891, 1), new MokaRange(7893, 1),
				new MokaRange(7895, 1), new MokaRange(7897, 1), new MokaRange(7899, 1), new MokaRange(7901, 1), new MokaRange(7903, 1),
				new MokaRange(7905, 1), new MokaRange(7907, 1), new MokaRange(7909, 1), new MokaRange(7911, 1), new MokaRange(7913, 1),
				new MokaRange(7915, 1), new MokaRange(7917, 1), new MokaRange(7919, 1), new MokaRange(7921, 1), new MokaRange(7923, 1),
				new MokaRange(7925, 1), new MokaRange(7927, 1), new MokaRange(7929, 1), new MokaRange(7936, 8), new MokaRange(7952, 6),
				new MokaRange(7968, 8), new MokaRange(7984, 8), new MokaRange(8000, 6), new MokaRange(8016, 8), new MokaRange(8032, 8),
				new MokaRange(8048, 14), new MokaRange(8064, 8), new MokaRange(8080, 8), new MokaRange(8096, 8), new MokaRange(8112, 5),
				new MokaRange(8118, 2), new MokaRange(8126, 1), new MokaRange(8130, 3), new MokaRange(8134, 2), new MokaRange(8144, 4),
				new MokaRange(8150, 2), new MokaRange(8160, 8), new MokaRange(8178, 3), new MokaRange(8182, 2), new MokaRange(8305, 1),
				new MokaRange(8319, 1), new MokaRange(8458, 1), new MokaRange(8462, 2), new MokaRange(8467, 1), new MokaRange(8495, 1),
				new MokaRange(8500, 1), new MokaRange(8505, 1), new MokaRange(8508, 2), new MokaRange(8518, 4), new MokaRange(8526, 1),
				new MokaRange(8580, 1), new MokaRange(11312, 47), new MokaRange(11361, 1), new MokaRange(11365, 2), new MokaRange(11368, 1),
				new MokaRange(11370, 1), new MokaRange(11372, 1), new MokaRange(11380, 1), new MokaRange(11382, 2), new MokaRange(11393, 1),
				new MokaRange(11395, 1), new MokaRange(11397, 1), new MokaRange(11399, 1), new MokaRange(11401, 1), new MokaRange(11403, 1),
				new MokaRange(11405, 1), new MokaRange(11407, 1), new MokaRange(11409, 1), new MokaRange(11411, 1), new MokaRange(11413, 1),
				new MokaRange(11415, 1), new MokaRange(11417, 1), new MokaRange(11419, 1), new MokaRange(11421, 1), new MokaRange(11423, 1),
				new MokaRange(11425, 1), new MokaRange(11427, 1), new MokaRange(11429, 1), new MokaRange(11431, 1), new MokaRange(11433, 1),
				new MokaRange(11435, 1), new MokaRange(11437, 1), new MokaRange(11439, 1), new MokaRange(11441, 1), new MokaRange(11443, 1),
				new MokaRange(11445, 1), new MokaRange(11447, 1), new MokaRange(11449, 1), new MokaRange(11451, 1), new MokaRange(11453, 1),
				new MokaRange(11455, 1), new MokaRange(11457, 1), new MokaRange(11459, 1), new MokaRange(11461, 1), new MokaRange(11463, 1),
				new MokaRange(11465, 1), new MokaRange(11467, 1), new MokaRange(11469, 1), new MokaRange(11471, 1), new MokaRange(11473, 1),
				new MokaRange(11475, 1), new MokaRange(11477, 1), new MokaRange(11479, 1), new MokaRange(11481, 1), new MokaRange(11483, 1),
				new MokaRange(11485, 1), new MokaRange(11487, 1), new MokaRange(11489, 1), new MokaRange(11491, 2), new MokaRange(11520, 38),
				new MokaRange(64256, 7), new MokaRange(64275, 5), new MokaRange(65345, 26), new MokaRange(66600, 40), new MokaRange(119834, 26),
				new MokaRange(119886, 7), new MokaRange(119894, 18), new MokaRange(119938, 26), new MokaRange(119990, 4), new MokaRange(119995, 1),
				new MokaRange(119997, 7), new MokaRange(120005, 11), new MokaRange(120042, 26), new MokaRange(120094, 26), new MokaRange(120146, 26),
				new MokaRange(120198, 26), new MokaRange(120250, 26), new MokaRange(120302, 26), new MokaRange(120354, 26), new MokaRange(120406, 26),
				new MokaRange(120458, 28), new MokaRange(120514, 25), new MokaRange(120540, 6), new MokaRange(120572, 25), new MokaRange(120598, 6),
				new MokaRange(120630, 25), new MokaRange(120656, 6), new MokaRange(120688, 25), new MokaRange(120714, 6), new MokaRange(120746, 25),
				new MokaRange(120772, 6), new MokaRange(120779, 1),
				new MokaRange(453, 1), new MokaRange(456, 1), new MokaRange(459, 1), new MokaRange(498, 1), new MokaRange(8072, 8),
				new MokaRange(8088, 8), new MokaRange(8104, 8), new MokaRange(8124, 1), new MokaRange(8140, 1), new MokaRange(8188, 1),
				new MokaRange(688, 18), new MokaRange(710, 12), new MokaRange(736, 5), new MokaRange(750, 1), new MokaRange(890, 1),
				new MokaRange(1369, 1), new MokaRange(1600, 1), new MokaRange(1765, 2), new MokaRange(2036, 2), new MokaRange(2042, 1),
				new MokaRange(3654, 1), new MokaRange(3782, 1), new MokaRange(4348, 1), new MokaRange(6103, 1), new MokaRange(6211, 1),
				new MokaRange(7468, 54), new MokaRange(7544, 1), new MokaRange(7579, 37), new MokaRange(8336, 5), new MokaRange(11631, 1),
				new MokaRange(12293, 1), new MokaRange(12337, 5), new MokaRange(12347, 1), new MokaRange(12445, 2), new MokaRange(12540, 3),
				new MokaRange(40981, 1), new MokaRange(42775, 4), new MokaRange(65392, 1), new MokaRange(65438, 2),
				new MokaRange(443, 1), new MokaRange(448, 4), new MokaRange(660, 1), new MokaRange(1488, 27), new MokaRange(1520, 3),
				new MokaRange(1569, 26), new MokaRange(1601, 10), new MokaRange(1646, 2), new MokaRange(1649, 99), new MokaRange(1749, 1),
				new MokaRange(1774, 2), new MokaRange(1786, 3), new MokaRange(1791, 1), new MokaRange(1808, 1), new MokaRange(1810, 30),
				new MokaRange(1869, 33), new MokaRange(1920, 38), new MokaRange(1969, 1), new MokaRange(1994, 33), new MokaRange(2308, 54),
				new MokaRange(2365, 1), new MokaRange(2384, 1), new MokaRange(2392, 10), new MokaRange(2427, 5), new MokaRange(2437, 8),
				new MokaRange(2447, 2), new MokaRange(2451, 22), new MokaRange(2474, 7), new MokaRange(2482, 1), new MokaRange(2486, 4),
				new MokaRange(2493, 1), new MokaRange(2510, 1), new MokaRange(2524, 2), new MokaRange(2527, 3), new MokaRange(2544, 2),
				new MokaRange(2565, 6), new MokaRange(2575, 2), new MokaRange(2579, 22), new MokaRange(2602, 7), new MokaRange(2610, 2),
				new MokaRange(2613, 2), new MokaRange(2616, 2), new MokaRange(2649, 4), new MokaRange(2654, 1), new MokaRange(2674, 3),
				new MokaRange(2693, 9), new MokaRange(2703, 3), new MokaRange(2707, 22), new MokaRange(2730, 7), new MokaRange(2738, 2),
				new MokaRange(2741, 5), new MokaRange(2749, 1), new MokaRange(2768, 1), new MokaRange(2784, 2), new MokaRange(2821, 8),
				new MokaRange(2831, 2), new MokaRange(2835, 22), new MokaRange(2858, 7), new MokaRange(2866, 2), new MokaRange(2869, 5),
				new MokaRange(2877, 1), new MokaRange(2908, 2), new MokaRange(2911, 3), new MokaRange(2929, 1), new MokaRange(2947, 1),
				new MokaRange(2949, 6), new MokaRange(2958, 3), new MokaRange(2962, 4), new MokaRange(2969, 2), new MokaRange(2972, 1),
				new MokaRange(2974, 2), new MokaRange(2979, 2), new MokaRange(2984, 3), new MokaRange(2990, 12), new MokaRange(3077, 8),
				new MokaRange(3086, 3), new MokaRange(3090, 23), new MokaRange(3114, 10), new MokaRange(3125, 5), new MokaRange(3168, 2),
				new MokaRange(3205, 8), new MokaRange(3214, 3), new MokaRange(3218, 23), new MokaRange(3242, 10), new MokaRange(3253, 5),
				new MokaRange(3261, 1), new MokaRange(3294, 1), new MokaRange(3296, 2), new MokaRange(3333, 8), new MokaRange(3342, 3),
				new MokaRange(3346, 23), new MokaRange(3370, 16), new MokaRange(3424, 2), new MokaRange(3461, 18), new MokaRange(3482, 24),
				new MokaRange(3507, 9), new MokaRange(3517, 1), new MokaRange(3520, 7), new MokaRange(3585, 48), new MokaRange(3634, 2),
				new MokaRange(3648, 6), new MokaRange(3713, 2), new MokaRange(3716, 1), new MokaRange(3719, 2), new MokaRange(3722, 1),
				new MokaRange(3725, 1), new MokaRange(3732, 4), new MokaRange(3737, 7), new MokaRange(3745, 3), new MokaRange(3749, 1),
				new MokaRange(3751, 1), new MokaRange(3754, 2), new MokaRange(3757, 4), new MokaRange(3762, 2), new MokaRange(3773, 1),
				new MokaRange(3776, 5), new MokaRange(3804, 2), new MokaRange(3840, 1), new MokaRange(3904, 8), new MokaRange(3913, 34),
				new MokaRange(3976, 4), new MokaRange(4096, 34), new MokaRange(4131, 5), new MokaRange(4137, 2), new MokaRange(4176, 6),
				new MokaRange(4304, 43), new MokaRange(4352, 90), new MokaRange(4447, 68), new MokaRange(4520, 82), new MokaRange(4608, 73),
				new MokaRange(4682, 4), new MokaRange(4688, 7), new MokaRange(4696, 1), new MokaRange(4698, 4), new MokaRange(4704, 41),
				new MokaRange(4746, 4), new MokaRange(4752, 33), new MokaRange(4786, 4), new MokaRange(4792, 7), new MokaRange(4800, 1),
				new MokaRange(4802, 4), new MokaRange(4808, 15), new MokaRange(4824, 57), new MokaRange(4882, 4), new MokaRange(4888, 67),
				new MokaRange(4992, 16), new MokaRange(5024, 85), new MokaRange(5121, 620), new MokaRange(5743, 8), new MokaRange(5761, 26),
				new MokaRange(5792, 75), new MokaRange(5888, 13), new MokaRange(5902, 4), new MokaRange(5920, 18), new MokaRange(5952, 18),
				new MokaRange(5984, 13), new MokaRange(5998, 3), new MokaRange(6016, 52), new MokaRange(6108, 1), new MokaRange(6176, 35),
				new MokaRange(6212, 52), new MokaRange(6272, 41), new MokaRange(6400, 29), new MokaRange(6480, 30), new MokaRange(6512, 5),
				new MokaRange(6528, 42), new MokaRange(6593, 7), new MokaRange(6656, 23), new MokaRange(6917, 47), new MokaRange(6981, 7),
				new MokaRange(8501, 4), new MokaRange(11568, 54), new MokaRange(11648, 23), new MokaRange(11680, 7), new MokaRange(11688, 7),
				new MokaRange(11696, 7), new MokaRange(11704, 7), new MokaRange(11712, 7), new MokaRange(11720, 7), new MokaRange(11728, 7),
				new MokaRange(11736, 7), new MokaRange(12294, 1), new MokaRange(12348, 1), new MokaRange(12353, 86), new MokaRange(12447, 1),
				new MokaRange(12449, 90), new MokaRange(12543, 1), new MokaRange(12549, 40), new MokaRange(12593, 94), new MokaRange(12704, 24),
				new MokaRange(12784, 16), new MokaRange(13312, 1), new MokaRange(19893, 1), new MokaRange(19968, 1), new MokaRange(40891, 1),
				new MokaRange(40960, 21), new MokaRange(40982, 1143), new MokaRange(43008, 2), new MokaRange(43011, 3), new MokaRange(43015, 4),
				new MokaRange(43020, 23), new MokaRange(43072, 52), new MokaRange(44032, 1), new MokaRange(55203, 1), new MokaRange(63744, 302),
				new MokaRange(64048, 59), new MokaRange(64112, 106), new MokaRange(64285, 1), new MokaRange(64287, 10), new MokaRange(64298, 13),
				new MokaRange(64312, 5), new MokaRange(64318, 1), new MokaRange(64320, 2), new MokaRange(64323, 2), new MokaRange(64326, 108),
				new MokaRange(64467, 363), new MokaRange(64848, 64), new MokaRange(64914, 54), new MokaRange(65008, 12), new MokaRange(65136, 5),
				new MokaRange(65142, 135), new MokaRange(65382, 10), new MokaRange(65393, 45), new MokaRange(65440, 31), new MokaRange(65474, 6),
				new MokaRange(65482, 6), new MokaRange(65490, 6), new MokaRange(65498, 3), new MokaRange(65536, 12), new MokaRange(65549, 26),
				new MokaRange(65576, 19), new MokaRange(65596, 2), new MokaRange(65599, 15), new MokaRange(65616, 14), new MokaRange(65664, 123),
				new MokaRange(66304, 31), new MokaRange(66352, 17), new MokaRange(66370, 8), new MokaRange(66432, 30), new MokaRange(66464, 36),
				new MokaRange(66504, 8), new MokaRange(66640, 78), new MokaRange(67584, 6), new MokaRange(67592, 1), new MokaRange(67594, 44),
				new MokaRange(67639, 2), new MokaRange(67644, 1), new MokaRange(67647, 1), new MokaRange(67840, 22), new MokaRange(68096, 1),
				new MokaRange(68112, 4), new MokaRange(68117, 3), new MokaRange(68121, 27), new MokaRange(73728, 879), new MokaRange(131072, 1),
				new MokaRange(173782, 1), new MokaRange(194560, 542),
				new MokaRange(48, 10), new MokaRange(1632, 10), new MokaRange(1776, 10), new MokaRange(1984, 10), new MokaRange(2406, 10),
				new MokaRange(2534, 10), new MokaRange(2662, 10), new MokaRange(2790, 10), new MokaRange(2918, 10), new MokaRange(3046, 10),
				new MokaRange(3174, 10), new MokaRange(3302, 10), new MokaRange(3430, 10), new MokaRange(3664, 10), new MokaRange(3792, 10),
				new MokaRange(3872, 10), new MokaRange(4160, 10), new MokaRange(6112, 10), new MokaRange(6160, 10), new MokaRange(6470, 10),
				new MokaRange(6608, 10), new MokaRange(6992, 10), new MokaRange(65296, 10), new MokaRange(66720, 10), new MokaRange(120782, 50),
				new MokaRange(5870, 3), new MokaRange(8544, 35), new MokaRange(12295, 1), new MokaRange(12321, 9), new MokaRange(12344, 3),
				new MokaRange(65856, 53), new MokaRange(66369, 1), new MokaRange(66378, 1), new MokaRange(66513, 5), new MokaRange(74752, 99),
				new MokaRange(178, 2), new MokaRange(185, 1), new MokaRange(188, 3), new MokaRange(2548, 6), new MokaRange(3056, 3),
				new MokaRange(3882, 10), new MokaRange(4969, 20), new MokaRange(6128, 10), new MokaRange(8304, 1), new MokaRange(8308, 6),
				new MokaRange(8320, 10), new MokaRange(8531, 13), new MokaRange(9312, 60), new MokaRange(9450, 22), new MokaRange(10102, 30),
				new MokaRange(11517, 1), new MokaRange(12690, 4), new MokaRange(12832, 10), new MokaRange(12881, 15), new MokaRange(12928, 10),
				new MokaRange(12977, 15), new MokaRange(65799, 45), new MokaRange(65909, 4), new MokaRange(65930, 1), new MokaRange(66336, 4),
				new MokaRange(67862, 4), new MokaRange(68160, 8), new MokaRange(119648, 18)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("alphanumericCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("alphanumericCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.capitalizedLetterCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("capitalizedLetterCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(453, 1), new MokaRange(456, 1), new MokaRange(459, 1), new MokaRange(498, 1), new MokaRange(8072, 8),
				new MokaRange(8088, 8), new MokaRange(8104, 8), new MokaRange(8124, 1), new MokaRange(8140, 1), new MokaRange(8188, 1)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("capitalizedLetterCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("capitalizedLetterCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.controlCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("controlCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(0, 32), new MokaRange(127, 33)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("controlCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("controlCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.decimalDigitCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("decimalDigitCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(48, 10), new MokaRange(1632, 10), new MokaRange(1776, 10), new MokaRange(1984, 10), new MokaRange(2406, 10),
				new MokaRange(2534, 10), new MokaRange(2662, 10), new MokaRange(2790, 10), new MokaRange(2918, 10), new MokaRange(3046, 10),
				new MokaRange(3174, 10), new MokaRange(3302, 10), new MokaRange(3430, 10), new MokaRange(3664, 10), new MokaRange(3792, 10),
				new MokaRange(3872, 10), new MokaRange(4160, 10), new MokaRange(6112, 10), new MokaRange(6160, 10), new MokaRange(6470, 10),
				new MokaRange(6608, 10), new MokaRange(6992, 10), new MokaRange(65296, 10), new MokaRange(66720, 10), new MokaRange(120782, 50)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("decimalDigitCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("decimalDigitCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.decomposableCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("decomposableCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(160, 1), new MokaRange(168, 1), new MokaRange(170, 1), new MokaRange(175, 1), new MokaRange(178, 4),
				new MokaRange(184, 3), new MokaRange(188, 3), new MokaRange(192, 6), new MokaRange(199, 9), new MokaRange(209, 6),
				new MokaRange(217, 5), new MokaRange(224, 6), new MokaRange(231, 9), new MokaRange(241, 6), new MokaRange(249, 5),
				new MokaRange(255, 17), new MokaRange(274, 20), new MokaRange(296, 9), new MokaRange(306, 6), new MokaRange(313, 8),
				new MokaRange(323, 7), new MokaRange(332, 6), new MokaRange(340, 18), new MokaRange(360, 24), new MokaRange(416, 2),
				new MokaRange(431, 2), new MokaRange(452, 25), new MokaRange(478, 6), new MokaRange(486, 16), new MokaRange(504, 36),
				new MokaRange(542, 2), new MokaRange(550, 14), new MokaRange(688, 9), new MokaRange(728, 6), new MokaRange(736, 5),
				new MokaRange(832, 2), new MokaRange(835, 2), new MokaRange(884, 1), new MokaRange(890, 1), new MokaRange(894, 1),
				new MokaRange(900, 7), new MokaRange(908, 1), new MokaRange(910, 3), new MokaRange(938, 7), new MokaRange(970, 5),
				new MokaRange(976, 7), new MokaRange(1008, 3), new MokaRange(1012, 2), new MokaRange(1017, 1), new MokaRange(1024, 2),
				new MokaRange(1027, 1), new MokaRange(1031, 1), new MokaRange(1036, 3), new MokaRange(1049, 1), new MokaRange(1081, 1),
				new MokaRange(1104, 2), new MokaRange(1107, 1), new MokaRange(1111, 1), new MokaRange(1116, 3), new MokaRange(1142, 2),
				new MokaRange(1217, 2), new MokaRange(1232, 4), new MokaRange(1238, 2), new MokaRange(1242, 6), new MokaRange(1250, 6),
				new MokaRange(1258, 12), new MokaRange(1272, 2), new MokaRange(1415, 1), new MokaRange(1570, 5), new MokaRange(1653, 4),
				new MokaRange(1728, 1), new MokaRange(1730, 1), new MokaRange(1747, 1), new MokaRange(2345, 1), new MokaRange(2353, 1),
				new MokaRange(2356, 1), new MokaRange(2392, 8), new MokaRange(2507, 2), new MokaRange(2524, 2), new MokaRange(2527, 1),
				new MokaRange(2611, 1), new MokaRange(2614, 1), new MokaRange(2649, 3), new MokaRange(2654, 1), new MokaRange(2888, 1),
				new MokaRange(2891, 2), new MokaRange(2908, 2), new MokaRange(2964, 1), new MokaRange(3018, 3), new MokaRange(3144, 1),
				new MokaRange(3264, 1), new MokaRange(3271, 2), new MokaRange(3274, 2), new MokaRange(3402, 3), new MokaRange(3546, 1),
				new MokaRange(3548, 3), new MokaRange(3635, 1), new MokaRange(3763, 1), new MokaRange(3804, 2), new MokaRange(3852, 1),
				new MokaRange(3907, 1), new MokaRange(3917, 1), new MokaRange(3922, 1), new MokaRange(3927, 1), new MokaRange(3932, 1),
				new MokaRange(3945, 1), new MokaRange(3955, 1), new MokaRange(3957, 5), new MokaRange(3969, 1), new MokaRange(3987, 1),
				new MokaRange(3997, 1), new MokaRange(4002, 1), new MokaRange(4007, 1), new MokaRange(4012, 1), new MokaRange(4025, 1),
				new MokaRange(4134, 1), new MokaRange(4348, 1), new MokaRange(6918, 1), new MokaRange(6920, 1), new MokaRange(6922, 1),
				new MokaRange(6924, 1), new MokaRange(6926, 1), new MokaRange(6930, 1), new MokaRange(6971, 1), new MokaRange(6973, 1),
				new MokaRange(6976, 2), new MokaRange(6979, 1), new MokaRange(7468, 3), new MokaRange(7472, 11), new MokaRange(7484, 18),
				new MokaRange(7503, 28), new MokaRange(7544, 1), new MokaRange(7579, 37), new MokaRange(7680, 156), new MokaRange(7840, 90),
				new MokaRange(7936, 22), new MokaRange(7960, 6), new MokaRange(7968, 38), new MokaRange(8008, 6), new MokaRange(8016, 8),
				new MokaRange(8025, 1), new MokaRange(8027, 1), new MokaRange(8029, 1), new MokaRange(8031, 31), new MokaRange(8064, 53),
				new MokaRange(8118, 15), new MokaRange(8134, 14), new MokaRange(8150, 6), new MokaRange(8157, 19), new MokaRange(8178, 3),
				new MokaRange(8182, 9), new MokaRange(8192, 11), new MokaRange(8209, 1), new MokaRange(8215, 1), new MokaRange(8228, 3),
				new MokaRange(8239, 1), new MokaRange(8243, 2), new MokaRange(8246, 2), new MokaRange(8252, 1), new MokaRange(8254, 1),
				new MokaRange(8263, 3), new MokaRange(8279, 1), new MokaRange(8287, 1), new MokaRange(8304, 2), new MokaRange(8308, 27),
				new MokaRange(8336, 5), new MokaRange(8360, 1), new MokaRange(8448, 4), new MokaRange(8453, 3), new MokaRange(8457, 11),
				new MokaRange(8469, 2), new MokaRange(8473, 5), new MokaRange(8480, 3), new MokaRange(8484, 1), new MokaRange(8486, 1),
				new MokaRange(8488, 1), new MokaRange(8490, 4), new MokaRange(8495, 3), new MokaRange(8499, 7), new MokaRange(8507, 6),
				new MokaRange(8517, 5), new MokaRange(8531, 45), new MokaRange(8602, 2), new MokaRange(8622, 1), new MokaRange(8653, 3),
				new MokaRange(8708, 1), new MokaRange(8713, 1), new MokaRange(8716, 1), new MokaRange(8740, 1), new MokaRange(8742, 1),
				new MokaRange(8748, 2), new MokaRange(8751, 2), new MokaRange(8769, 1), new MokaRange(8772, 1), new MokaRange(8775, 1),
				new MokaRange(8777, 1), new MokaRange(8800, 1), new MokaRange(8802, 1), new MokaRange(8813, 5), new MokaRange(8820, 2),
				new MokaRange(8824, 2), new MokaRange(8832, 2), new MokaRange(8836, 2), new MokaRange(8840, 2), new MokaRange(8876, 4),
				new MokaRange(8928, 4), new MokaRange(8938, 4), new MokaRange(9001, 2), new MokaRange(9312, 139), new MokaRange(10764, 1),
				new MokaRange(10868, 3), new MokaRange(10972, 1), new MokaRange(11631, 1), new MokaRange(11935, 1), new MokaRange(12019, 1),
				new MokaRange(12032, 214), new MokaRange(12288, 1), new MokaRange(12342, 1), new MokaRange(12344, 3), new MokaRange(12364, 1),
				new MokaRange(12366, 1), new MokaRange(12368, 1), new MokaRange(12370, 1), new MokaRange(12372, 1), new MokaRange(12374, 1),
				new MokaRange(12376, 1), new MokaRange(12378, 1), new MokaRange(12380, 1), new MokaRange(12382, 1), new MokaRange(12384, 1),
				new MokaRange(12386, 1), new MokaRange(12389, 1), new MokaRange(12391, 1), new MokaRange(12393, 1), new MokaRange(12400, 2),
				new MokaRange(12403, 2), new MokaRange(12406, 2), new MokaRange(12409, 2), new MokaRange(12412, 2), new MokaRange(12436, 1),
				new MokaRange(12443, 2), new MokaRange(12446, 2), new MokaRange(12460, 1), new MokaRange(12462, 1), new MokaRange(12464, 1),
				new MokaRange(12466, 1), new MokaRange(12468, 1), new MokaRange(12470, 1), new MokaRange(12472, 1), new MokaRange(12474, 1),
				new MokaRange(12476, 1), new MokaRange(12478, 1), new MokaRange(12480, 1), new MokaRange(12482, 1), new MokaRange(12485, 1),
				new MokaRange(12487, 1), new MokaRange(12489, 1), new MokaRange(12496, 2), new MokaRange(12499, 2), new MokaRange(12502, 2),
				new MokaRange(12505, 2), new MokaRange(12508, 2), new MokaRange(12532, 1), new MokaRange(12535, 4), new MokaRange(12542, 2),
				new MokaRange(12593, 94), new MokaRange(12690, 14), new MokaRange(12800, 31), new MokaRange(12832, 36), new MokaRange(12880, 47),
				new MokaRange(12928, 127), new MokaRange(13056, 256), new MokaRange(63744, 270), new MokaRange(64016, 1), new MokaRange(64018, 1),
				new MokaRange(64021, 10), new MokaRange(64032, 1), new MokaRange(64034, 1), new MokaRange(64037, 2), new MokaRange(64042, 4),
				new MokaRange(64048, 59), new MokaRange(64112, 106), new MokaRange(64256, 7), new MokaRange(64275, 5), new MokaRange(64285, 1),
				new MokaRange(64287, 24), new MokaRange(64312, 5), new MokaRange(64318, 1), new MokaRange(64320, 2), new MokaRange(64323, 2),
				new MokaRange(64326, 108), new MokaRange(64467, 363), new MokaRange(64848, 64), new MokaRange(64914, 54), new MokaRange(65008, 13),
				new MokaRange(65040, 10), new MokaRange(65072, 21), new MokaRange(65095, 12), new MokaRange(65108, 19), new MokaRange(65128, 4),
				new MokaRange(65136, 3), new MokaRange(65140, 1), new MokaRange(65142, 135), new MokaRange(65281, 190), new MokaRange(65474, 6),
				new MokaRange(65482, 6), new MokaRange(65490, 6), new MokaRange(65498, 3), new MokaRange(65504, 7), new MokaRange(65512, 7),
				new MokaRange(119134, 7), new MokaRange(119227, 6), new MokaRange(119808, 85), new MokaRange(119894, 71), new MokaRange(119966, 2),
				new MokaRange(119970, 1), new MokaRange(119973, 2), new MokaRange(119977, 4), new MokaRange(119982, 12), new MokaRange(119995, 1),
				new MokaRange(119997, 7), new MokaRange(120005, 65), new MokaRange(120071, 4), new MokaRange(120077, 8), new MokaRange(120086, 7),
				new MokaRange(120094, 28), new MokaRange(120123, 4), new MokaRange(120128, 5), new MokaRange(120134, 1), new MokaRange(120138, 7),
				new MokaRange(120146, 340), new MokaRange(120488, 292), new MokaRange(120782, 50), new MokaRange(194560, 542)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("decomposableCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("decomposableCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.illegalCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("illegalCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(173, 1), new MokaRange(1536, 4), new MokaRange(1757, 1), new MokaRange(1807, 1), new MokaRange(6068, 2),
				new MokaRange(8203, 5), new MokaRange(8234, 5), new MokaRange(8288, 4), new MokaRange(8298, 6), new MokaRange(65279, 1),
				new MokaRange(65529, 3), new MokaRange(119155, 8), new MokaRange(917505, 1), new MokaRange(917536, 96),
				new MokaRange(55296, 1), new MokaRange(56191, 2), new MokaRange(56319, 2), new MokaRange(57343, 1),
				new MokaRange(57344, 1), new MokaRange(63743, 1), new MokaRange(983040, 1), new MokaRange(1048573, 1), new MokaRange(1048576, 1),
				new MokaRange(1114109, 1)				
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("illegalCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("illegalCharacterSet")).copy();	
}
/*MokaCharacterSet*/ MokaCharacterSet.letterCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("letterCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(65, 26), new MokaRange(192, 23), new MokaRange(216, 7), new MokaRange(256, 1), new MokaRange(258, 1),
				new MokaRange(260, 1), new MokaRange(262, 1), new MokaRange(264, 1), new MokaRange(266, 1), new MokaRange(268, 1),
				new MokaRange(270, 1), new MokaRange(272, 1), new MokaRange(274, 1), new MokaRange(276, 1), new MokaRange(278, 1),
				new MokaRange(280, 1), new MokaRange(282, 1), new MokaRange(284, 1), new MokaRange(286, 1), new MokaRange(288, 1),
				new MokaRange(290, 1), new MokaRange(292, 1), new MokaRange(294, 1), new MokaRange(296, 1), new MokaRange(298, 1),
				new MokaRange(300, 1), new MokaRange(302, 1), new MokaRange(304, 1), new MokaRange(306, 1), new MokaRange(308, 1),
				new MokaRange(310, 1), new MokaRange(313, 1), new MokaRange(315, 1), new MokaRange(317, 1), new MokaRange(319, 1),
				new MokaRange(321, 1), new MokaRange(323, 1), new MokaRange(325, 1), new MokaRange(327, 1), new MokaRange(330, 1),
				new MokaRange(332, 1), new MokaRange(334, 1), new MokaRange(336, 1), new MokaRange(338, 1), new MokaRange(340, 1),
				new MokaRange(342, 1), new MokaRange(344, 1), new MokaRange(346, 1), new MokaRange(348, 1), new MokaRange(350, 1),
				new MokaRange(352, 1), new MokaRange(354, 1), new MokaRange(356, 1), new MokaRange(358, 1), new MokaRange(360, 1),
				new MokaRange(362, 1), new MokaRange(364, 1), new MokaRange(366, 1), new MokaRange(368, 1), new MokaRange(370, 1),
				new MokaRange(372, 1), new MokaRange(374, 1), new MokaRange(376, 2), new MokaRange(379, 1), new MokaRange(381, 1),
				new MokaRange(385, 2), new MokaRange(388, 1), new MokaRange(390, 2), new MokaRange(393, 3), new MokaRange(398, 4),
				new MokaRange(403, 2), new MokaRange(406, 3), new MokaRange(412, 2), new MokaRange(415, 2), new MokaRange(418, 1),
				new MokaRange(420, 1), new MokaRange(422, 2), new MokaRange(425, 1), new MokaRange(428, 1), new MokaRange(430, 2),
				new MokaRange(433, 3), new MokaRange(437, 1), new MokaRange(439, 2), new MokaRange(444, 1), new MokaRange(452, 1),
				new MokaRange(455, 1), new MokaRange(458, 1), new MokaRange(461, 1), new MokaRange(463, 1), new MokaRange(465, 1),
				new MokaRange(467, 1), new MokaRange(469, 1), new MokaRange(471, 1), new MokaRange(473, 1), new MokaRange(475, 1),
				new MokaRange(478, 1), new MokaRange(480, 1), new MokaRange(482, 1), new MokaRange(484, 1), new MokaRange(486, 1),
				new MokaRange(488, 1), new MokaRange(490, 1), new MokaRange(492, 1), new MokaRange(494, 1), new MokaRange(497, 1),
				new MokaRange(500, 1), new MokaRange(502, 3), new MokaRange(506, 1), new MokaRange(508, 1), new MokaRange(510, 1),
				new MokaRange(512, 1), new MokaRange(514, 1), new MokaRange(516, 1), new MokaRange(518, 1), new MokaRange(520, 1),
				new MokaRange(522, 1), new MokaRange(524, 1), new MokaRange(526, 1), new MokaRange(528, 1), new MokaRange(530, 1),
				new MokaRange(532, 1), new MokaRange(534, 1), new MokaRange(536, 1), new MokaRange(538, 1), new MokaRange(540, 1),
				new MokaRange(542, 1), new MokaRange(544, 1), new MokaRange(546, 1), new MokaRange(548, 1), new MokaRange(550, 1),
				new MokaRange(552, 1), new MokaRange(554, 1), new MokaRange(556, 1), new MokaRange(558, 1), new MokaRange(560, 1),
				new MokaRange(562, 1), new MokaRange(570, 2), new MokaRange(573, 2), new MokaRange(577, 1), new MokaRange(579, 4),
				new MokaRange(584, 1), new MokaRange(586, 1), new MokaRange(588, 1), new MokaRange(590, 1), new MokaRange(902, 1),
				new MokaRange(904, 3), new MokaRange(908, 1), new MokaRange(910, 2), new MokaRange(913, 17), new MokaRange(931, 9),
				new MokaRange(978, 3), new MokaRange(984, 1), new MokaRange(986, 1), new MokaRange(988, 1), new MokaRange(990, 1),
				new MokaRange(992, 1), new MokaRange(994, 1), new MokaRange(996, 1), new MokaRange(998, 1), new MokaRange(1000, 1),
				new MokaRange(1002, 1), new MokaRange(1004, 1), new MokaRange(1006, 1), new MokaRange(1012, 1), new MokaRange(1015, 1),
				new MokaRange(1017, 2), new MokaRange(1021, 51), new MokaRange(1120, 1), new MokaRange(1122, 1), new MokaRange(1124, 1),
				new MokaRange(1126, 1), new MokaRange(1128, 1), new MokaRange(1130, 1), new MokaRange(1132, 1), new MokaRange(1134, 1),
				new MokaRange(1136, 1), new MokaRange(1138, 1), new MokaRange(1140, 1), new MokaRange(1142, 1), new MokaRange(1144, 1),
				new MokaRange(1146, 1), new MokaRange(1148, 1), new MokaRange(1150, 1), new MokaRange(1152, 1), new MokaRange(1162, 1),
				new MokaRange(1164, 1), new MokaRange(1166, 1), new MokaRange(1168, 1), new MokaRange(1170, 1), new MokaRange(1172, 1),
				new MokaRange(1174, 1), new MokaRange(1176, 1), new MokaRange(1178, 1), new MokaRange(1180, 1), new MokaRange(1182, 1),
				new MokaRange(1184, 1), new MokaRange(1186, 1), new MokaRange(1188, 1), new MokaRange(1190, 1), new MokaRange(1192, 1),
				new MokaRange(1194, 1), new MokaRange(1196, 1), new MokaRange(1198, 1), new MokaRange(1200, 1), new MokaRange(1202, 1),
				new MokaRange(1204, 1), new MokaRange(1206, 1), new MokaRange(1208, 1), new MokaRange(1210, 1), new MokaRange(1212, 1),
				new MokaRange(1214, 1), new MokaRange(1216, 2), new MokaRange(1219, 1), new MokaRange(1221, 1), new MokaRange(1223, 1),
				new MokaRange(1225, 1), new MokaRange(1227, 1), new MokaRange(1229, 1), new MokaRange(1232, 1), new MokaRange(1234, 1),
				new MokaRange(1236, 1), new MokaRange(1238, 1), new MokaRange(1240, 1), new MokaRange(1242, 1), new MokaRange(1244, 1),
				new MokaRange(1246, 1), new MokaRange(1248, 1), new MokaRange(1250, 1), new MokaRange(1252, 1), new MokaRange(1254, 1),
				new MokaRange(1256, 1), new MokaRange(1258, 1), new MokaRange(1260, 1), new MokaRange(1262, 1), new MokaRange(1264, 1),
				new MokaRange(1266, 1), new MokaRange(1268, 1), new MokaRange(1270, 1), new MokaRange(1272, 1), new MokaRange(1274, 1),
				new MokaRange(1276, 1), new MokaRange(1278, 1), new MokaRange(1280, 1), new MokaRange(1282, 1), new MokaRange(1284, 1),
				new MokaRange(1286, 1), new MokaRange(1288, 1), new MokaRange(1290, 1), new MokaRange(1292, 1), new MokaRange(1294, 1),
				new MokaRange(1296, 1), new MokaRange(1298, 1), new MokaRange(1329, 38), new MokaRange(4256, 38), new MokaRange(7680, 1),
				new MokaRange(7682, 1), new MokaRange(7684, 1), new MokaRange(7686, 1), new MokaRange(7688, 1), new MokaRange(7690, 1),
				new MokaRange(7692, 1), new MokaRange(7694, 1), new MokaRange(7696, 1), new MokaRange(7698, 1), new MokaRange(7700, 1),
				new MokaRange(7702, 1), new MokaRange(7704, 1), new MokaRange(7706, 1), new MokaRange(7708, 1), new MokaRange(7710, 1),
				new MokaRange(7712, 1), new MokaRange(7714, 1), new MokaRange(7716, 1), new MokaRange(7718, 1), new MokaRange(7720, 1),
				new MokaRange(7722, 1), new MokaRange(7724, 1), new MokaRange(7726, 1), new MokaRange(7728, 1), new MokaRange(7730, 1),
				new MokaRange(7732, 1), new MokaRange(7734, 1), new MokaRange(7736, 1), new MokaRange(7738, 1), new MokaRange(7740, 1),
				new MokaRange(7742, 1), new MokaRange(7744, 1), new MokaRange(7746, 1), new MokaRange(7748, 1), new MokaRange(7750, 1),
				new MokaRange(7752, 1), new MokaRange(7754, 1), new MokaRange(7756, 1), new MokaRange(7758, 1), new MokaRange(7760, 1),
				new MokaRange(7762, 1), new MokaRange(7764, 1), new MokaRange(7766, 1), new MokaRange(7768, 1), new MokaRange(7770, 1),
				new MokaRange(7772, 1), new MokaRange(7774, 1), new MokaRange(7776, 1), new MokaRange(7778, 1), new MokaRange(7780, 1),
				new MokaRange(7782, 1), new MokaRange(7784, 1), new MokaRange(7786, 1), new MokaRange(7788, 1), new MokaRange(7790, 1),
				new MokaRange(7792, 1), new MokaRange(7794, 1), new MokaRange(7796, 1), new MokaRange(7798, 1), new MokaRange(7800, 1),
				new MokaRange(7802, 1), new MokaRange(7804, 1), new MokaRange(7806, 1), new MokaRange(7808, 1), new MokaRange(7810, 1),
				new MokaRange(7812, 1), new MokaRange(7814, 1), new MokaRange(7816, 1), new MokaRange(7818, 1), new MokaRange(7820, 1),
				new MokaRange(7822, 1), new MokaRange(7824, 1), new MokaRange(7826, 1), new MokaRange(7828, 1), new MokaRange(7840, 1),
				new MokaRange(7842, 1), new MokaRange(7844, 1), new MokaRange(7846, 1), new MokaRange(7848, 1), new MokaRange(7850, 1),
				new MokaRange(7852, 1), new MokaRange(7854, 1), new MokaRange(7856, 1), new MokaRange(7858, 1), new MokaRange(7860, 1),
				new MokaRange(7862, 1), new MokaRange(7864, 1), new MokaRange(7866, 1), new MokaRange(7868, 1), new MokaRange(7870, 1),
				new MokaRange(7872, 1), new MokaRange(7874, 1), new MokaRange(7876, 1), new MokaRange(7878, 1), new MokaRange(7880, 1),
				new MokaRange(7882, 1), new MokaRange(7884, 1), new MokaRange(7886, 1), new MokaRange(7888, 1), new MokaRange(7890, 1),
				new MokaRange(7892, 1), new MokaRange(7894, 1), new MokaRange(7896, 1), new MokaRange(7898, 1), new MokaRange(7900, 1),
				new MokaRange(7902, 1), new MokaRange(7904, 1), new MokaRange(7906, 1), new MokaRange(7908, 1), new MokaRange(7910, 1),
				new MokaRange(7912, 1), new MokaRange(7914, 1), new MokaRange(7916, 1), new MokaRange(7918, 1), new MokaRange(7920, 1),
				new MokaRange(7922, 1), new MokaRange(7924, 1), new MokaRange(7926, 1), new MokaRange(7928, 1), new MokaRange(7944, 8),
				new MokaRange(7960, 6), new MokaRange(7976, 8), new MokaRange(7992, 8), new MokaRange(8008, 6), new MokaRange(8025, 1),
				new MokaRange(8027, 1), new MokaRange(8029, 1), new MokaRange(8031, 1), new MokaRange(8040, 8), new MokaRange(8120, 4),
				new MokaRange(8136, 4), new MokaRange(8152, 4), new MokaRange(8168, 5), new MokaRange(8184, 4), new MokaRange(8450, 1),
				new MokaRange(8455, 1), new MokaRange(8459, 3), new MokaRange(8464, 3), new MokaRange(8469, 1), new MokaRange(8473, 5),
				new MokaRange(8484, 1), new MokaRange(8486, 1), new MokaRange(8488, 1), new MokaRange(8490, 4), new MokaRange(8496, 4),
				new MokaRange(8510, 2), new MokaRange(8517, 1), new MokaRange(8579, 1), new MokaRange(11264, 47), new MokaRange(11360, 1),
				new MokaRange(11362, 3), new MokaRange(11367, 1), new MokaRange(11369, 1), new MokaRange(11371, 1), new MokaRange(11381, 1),
				new MokaRange(11392, 1), new MokaRange(11394, 1), new MokaRange(11396, 1), new MokaRange(11398, 1), new MokaRange(11400, 1),
				new MokaRange(11402, 1), new MokaRange(11404, 1), new MokaRange(11406, 1), new MokaRange(11408, 1), new MokaRange(11410, 1),
				new MokaRange(11412, 1), new MokaRange(11414, 1), new MokaRange(11416, 1), new MokaRange(11418, 1), new MokaRange(11420, 1),
				new MokaRange(11422, 1), new MokaRange(11424, 1), new MokaRange(11426, 1), new MokaRange(11428, 1), new MokaRange(11430, 1),
				new MokaRange(11432, 1), new MokaRange(11434, 1), new MokaRange(11436, 1), new MokaRange(11438, 1), new MokaRange(11440, 1),
				new MokaRange(11442, 1), new MokaRange(11444, 1), new MokaRange(11446, 1), new MokaRange(11448, 1), new MokaRange(11450, 1),
				new MokaRange(11452, 1), new MokaRange(11454, 1), new MokaRange(11456, 1), new MokaRange(11458, 1), new MokaRange(11460, 1),
				new MokaRange(11462, 1), new MokaRange(11464, 1), new MokaRange(11466, 1), new MokaRange(11468, 1), new MokaRange(11470, 1),
				new MokaRange(11472, 1), new MokaRange(11474, 1), new MokaRange(11476, 1), new MokaRange(11478, 1), new MokaRange(11480, 1),
				new MokaRange(11482, 1), new MokaRange(11484, 1), new MokaRange(11486, 1), new MokaRange(11488, 1), new MokaRange(11490, 1),
				new MokaRange(65313, 26), new MokaRange(66560, 40), new MokaRange(119808, 26), new MokaRange(119860, 26), new MokaRange(119912, 26),
				new MokaRange(119964, 1), new MokaRange(119966, 2), new MokaRange(119970, 1), new MokaRange(119973, 2), new MokaRange(119977, 4),
				new MokaRange(119982, 8), new MokaRange(120016, 26), new MokaRange(120068, 2), new MokaRange(120071, 4), new MokaRange(120077, 8),
				new MokaRange(120086, 7), new MokaRange(120120, 2), new MokaRange(120123, 4), new MokaRange(120128, 5), new MokaRange(120134, 1),
				new MokaRange(120138, 7), new MokaRange(120172, 26), new MokaRange(120224, 26), new MokaRange(120276, 26), new MokaRange(120328, 26),
				new MokaRange(120380, 26), new MokaRange(120432, 26), new MokaRange(120488, 25), new MokaRange(120546, 25), new MokaRange(120604, 25),
				new MokaRange(120662, 25), new MokaRange(120720, 25), new MokaRange(120778, 1),
				new MokaRange(97, 26), new MokaRange(170, 1), new MokaRange(181, 1), new MokaRange(186, 1), new MokaRange(223, 24),
				new MokaRange(248, 8), new MokaRange(257, 1), new MokaRange(259, 1), new MokaRange(261, 1), new MokaRange(263, 1),
				new MokaRange(265, 1), new MokaRange(267, 1), new MokaRange(269, 1), new MokaRange(271, 1), new MokaRange(273, 1),
				new MokaRange(275, 1), new MokaRange(277, 1), new MokaRange(279, 1), new MokaRange(281, 1), new MokaRange(283, 1),
				new MokaRange(285, 1), new MokaRange(287, 1), new MokaRange(289, 1), new MokaRange(291, 1), new MokaRange(293, 1),
				new MokaRange(295, 1), new MokaRange(297, 1), new MokaRange(299, 1), new MokaRange(301, 1), new MokaRange(303, 1),
				new MokaRange(305, 1), new MokaRange(307, 1), new MokaRange(309, 1), new MokaRange(311, 2), new MokaRange(314, 1),
				new MokaRange(316, 1), new MokaRange(318, 1), new MokaRange(320, 1), new MokaRange(322, 1), new MokaRange(324, 1),
				new MokaRange(326, 1), new MokaRange(328, 2), new MokaRange(331, 1), new MokaRange(333, 1), new MokaRange(335, 1),
				new MokaRange(337, 1), new MokaRange(339, 1), new MokaRange(341, 1), new MokaRange(343, 1), new MokaRange(345, 1),
				new MokaRange(347, 1), new MokaRange(349, 1), new MokaRange(351, 1), new MokaRange(353, 1), new MokaRange(355, 1),
				new MokaRange(357, 1), new MokaRange(359, 1), new MokaRange(361, 1), new MokaRange(363, 1), new MokaRange(365, 1),
				new MokaRange(367, 1), new MokaRange(369, 1), new MokaRange(371, 1), new MokaRange(373, 1), new MokaRange(375, 1),
				new MokaRange(378, 1), new MokaRange(380, 1), new MokaRange(382, 3), new MokaRange(387, 1), new MokaRange(389, 1),
				new MokaRange(392, 1), new MokaRange(396, 2), new MokaRange(402, 1), new MokaRange(405, 1), new MokaRange(409, 3),
				new MokaRange(414, 1), new MokaRange(417, 1), new MokaRange(419, 1), new MokaRange(421, 1), new MokaRange(424, 1),
				new MokaRange(426, 2), new MokaRange(429, 1), new MokaRange(432, 1), new MokaRange(436, 1), new MokaRange(438, 1),
				new MokaRange(441, 2), new MokaRange(445, 3), new MokaRange(454, 1), new MokaRange(457, 1), new MokaRange(460, 1),
				new MokaRange(462, 1), new MokaRange(464, 1), new MokaRange(466, 1), new MokaRange(468, 1), new MokaRange(470, 1),
				new MokaRange(472, 1), new MokaRange(474, 1), new MokaRange(476, 2), new MokaRange(479, 1), new MokaRange(481, 1),
				new MokaRange(483, 1), new MokaRange(485, 1), new MokaRange(487, 1), new MokaRange(489, 1), new MokaRange(491, 1),
				new MokaRange(493, 1), new MokaRange(495, 2), new MokaRange(499, 1), new MokaRange(501, 1), new MokaRange(505, 1),
				new MokaRange(507, 1), new MokaRange(509, 1), new MokaRange(511, 1), new MokaRange(513, 1), new MokaRange(515, 1),
				new MokaRange(517, 1), new MokaRange(519, 1), new MokaRange(521, 1), new MokaRange(523, 1), new MokaRange(525, 1),
				new MokaRange(527, 1), new MokaRange(529, 1), new MokaRange(531, 1), new MokaRange(533, 1), new MokaRange(535, 1),
				new MokaRange(537, 1), new MokaRange(539, 1), new MokaRange(541, 1), new MokaRange(543, 1), new MokaRange(545, 1),
				new MokaRange(547, 1), new MokaRange(549, 1), new MokaRange(551, 1), new MokaRange(553, 1), new MokaRange(555, 1),
				new MokaRange(557, 1), new MokaRange(559, 1), new MokaRange(561, 1), new MokaRange(563, 7), new MokaRange(572, 1),
				new MokaRange(575, 2), new MokaRange(578, 1), new MokaRange(583, 1), new MokaRange(585, 1), new MokaRange(587, 1),
				new MokaRange(589, 1), new MokaRange(591, 69), new MokaRange(661, 27), new MokaRange(891, 3), new MokaRange(912, 1),
				new MokaRange(940, 35), new MokaRange(976, 2), new MokaRange(981, 3), new MokaRange(985, 1), new MokaRange(987, 1),
				new MokaRange(989, 1), new MokaRange(991, 1), new MokaRange(993, 1), new MokaRange(995, 1), new MokaRange(997, 1),
				new MokaRange(999, 1), new MokaRange(1001, 1), new MokaRange(1003, 1), new MokaRange(1005, 1), new MokaRange(1007, 5),
				new MokaRange(1013, 1), new MokaRange(1016, 1), new MokaRange(1019, 2), new MokaRange(1072, 48), new MokaRange(1121, 1),
				new MokaRange(1123, 1), new MokaRange(1125, 1), new MokaRange(1127, 1), new MokaRange(1129, 1), new MokaRange(1131, 1),
				new MokaRange(1133, 1), new MokaRange(1135, 1), new MokaRange(1137, 1), new MokaRange(1139, 1), new MokaRange(1141, 1),
				new MokaRange(1143, 1), new MokaRange(1145, 1), new MokaRange(1147, 1), new MokaRange(1149, 1), new MokaRange(1151, 1),
				new MokaRange(1153, 1), new MokaRange(1163, 1), new MokaRange(1165, 1), new MokaRange(1167, 1), new MokaRange(1169, 1),
				new MokaRange(1171, 1), new MokaRange(1173, 1), new MokaRange(1175, 1), new MokaRange(1177, 1), new MokaRange(1179, 1),
				new MokaRange(1181, 1), new MokaRange(1183, 1), new MokaRange(1185, 1), new MokaRange(1187, 1), new MokaRange(1189, 1),
				new MokaRange(1191, 1), new MokaRange(1193, 1), new MokaRange(1195, 1), new MokaRange(1197, 1), new MokaRange(1199, 1),
				new MokaRange(1201, 1), new MokaRange(1203, 1), new MokaRange(1205, 1), new MokaRange(1207, 1), new MokaRange(1209, 1),
				new MokaRange(1211, 1), new MokaRange(1213, 1), new MokaRange(1215, 1), new MokaRange(1218, 1), new MokaRange(1220, 1),
				new MokaRange(1222, 1), new MokaRange(1224, 1), new MokaRange(1226, 1), new MokaRange(1228, 1), new MokaRange(1230, 2),
				new MokaRange(1233, 1), new MokaRange(1235, 1), new MokaRange(1237, 1), new MokaRange(1239, 1), new MokaRange(1241, 1),
				new MokaRange(1243, 1), new MokaRange(1245, 1), new MokaRange(1247, 1), new MokaRange(1249, 1), new MokaRange(1251, 1),
				new MokaRange(1253, 1), new MokaRange(1255, 1), new MokaRange(1257, 1), new MokaRange(1259, 1), new MokaRange(1261, 1),
				new MokaRange(1263, 1), new MokaRange(1265, 1), new MokaRange(1267, 1), new MokaRange(1269, 1), new MokaRange(1271, 1),
				new MokaRange(1273, 1), new MokaRange(1275, 1), new MokaRange(1277, 1), new MokaRange(1279, 1), new MokaRange(1281, 1),
				new MokaRange(1283, 1), new MokaRange(1285, 1), new MokaRange(1287, 1), new MokaRange(1289, 1), new MokaRange(1291, 1),
				new MokaRange(1293, 1), new MokaRange(1295, 1), new MokaRange(1297, 1), new MokaRange(1299, 1), new MokaRange(1377, 39),
				new MokaRange(7424, 44), new MokaRange(7522, 22), new MokaRange(7545, 34), new MokaRange(7681, 1), new MokaRange(7683, 1),
				new MokaRange(7685, 1), new MokaRange(7687, 1), new MokaRange(7689, 1), new MokaRange(7691, 1), new MokaRange(7693, 1),
				new MokaRange(7695, 1), new MokaRange(7697, 1), new MokaRange(7699, 1), new MokaRange(7701, 1), new MokaRange(7703, 1),
				new MokaRange(7705, 1), new MokaRange(7707, 1), new MokaRange(7709, 1), new MokaRange(7711, 1), new MokaRange(7713, 1),
				new MokaRange(7715, 1), new MokaRange(7717, 1), new MokaRange(7719, 1), new MokaRange(7721, 1), new MokaRange(7723, 1),
				new MokaRange(7725, 1), new MokaRange(7727, 1), new MokaRange(7729, 1), new MokaRange(7731, 1), new MokaRange(7733, 1),
				new MokaRange(7735, 1), new MokaRange(7737, 1), new MokaRange(7739, 1), new MokaRange(7741, 1), new MokaRange(7743, 1),
				new MokaRange(7745, 1), new MokaRange(7747, 1), new MokaRange(7749, 1), new MokaRange(7751, 1), new MokaRange(7753, 1),
				new MokaRange(7755, 1), new MokaRange(7757, 1), new MokaRange(7759, 1), new MokaRange(7761, 1), new MokaRange(7763, 1),
				new MokaRange(7765, 1), new MokaRange(7767, 1), new MokaRange(7769, 1), new MokaRange(7771, 1), new MokaRange(7773, 1),
				new MokaRange(7775, 1), new MokaRange(7777, 1), new MokaRange(7779, 1), new MokaRange(7781, 1), new MokaRange(7783, 1),
				new MokaRange(7785, 1), new MokaRange(7787, 1), new MokaRange(7789, 1), new MokaRange(7791, 1), new MokaRange(7793, 1),
				new MokaRange(7795, 1), new MokaRange(7797, 1), new MokaRange(7799, 1), new MokaRange(7801, 1), new MokaRange(7803, 1),
				new MokaRange(7805, 1), new MokaRange(7807, 1), new MokaRange(7809, 1), new MokaRange(7811, 1), new MokaRange(7813, 1),
				new MokaRange(7815, 1), new MokaRange(7817, 1), new MokaRange(7819, 1), new MokaRange(7821, 1), new MokaRange(7823, 1),
				new MokaRange(7825, 1), new MokaRange(7827, 1), new MokaRange(7829, 7), new MokaRange(7841, 1), new MokaRange(7843, 1),
				new MokaRange(7845, 1), new MokaRange(7847, 1), new MokaRange(7849, 1), new MokaRange(7851, 1), new MokaRange(7853, 1),
				new MokaRange(7855, 1), new MokaRange(7857, 1), new MokaRange(7859, 1), new MokaRange(7861, 1), new MokaRange(7863, 1),
				new MokaRange(7865, 1), new MokaRange(7867, 1), new MokaRange(7869, 1), new MokaRange(7871, 1), new MokaRange(7873, 1),
				new MokaRange(7875, 1), new MokaRange(7877, 1), new MokaRange(7879, 1), new MokaRange(7881, 1), new MokaRange(7883, 1),
				new MokaRange(7885, 1), new MokaRange(7887, 1), new MokaRange(7889, 1), new MokaRange(7891, 1), new MokaRange(7893, 1),
				new MokaRange(7895, 1), new MokaRange(7897, 1), new MokaRange(7899, 1), new MokaRange(7901, 1), new MokaRange(7903, 1),
				new MokaRange(7905, 1), new MokaRange(7907, 1), new MokaRange(7909, 1), new MokaRange(7911, 1), new MokaRange(7913, 1),
				new MokaRange(7915, 1), new MokaRange(7917, 1), new MokaRange(7919, 1), new MokaRange(7921, 1), new MokaRange(7923, 1),
				new MokaRange(7925, 1), new MokaRange(7927, 1), new MokaRange(7929, 1), new MokaRange(7936, 8), new MokaRange(7952, 6),
				new MokaRange(7968, 8), new MokaRange(7984, 8), new MokaRange(8000, 6), new MokaRange(8016, 8), new MokaRange(8032, 8),
				new MokaRange(8048, 14), new MokaRange(8064, 8), new MokaRange(8080, 8), new MokaRange(8096, 8), new MokaRange(8112, 5),
				new MokaRange(8118, 2), new MokaRange(8126, 1), new MokaRange(8130, 3), new MokaRange(8134, 2), new MokaRange(8144, 4),
				new MokaRange(8150, 2), new MokaRange(8160, 8), new MokaRange(8178, 3), new MokaRange(8182, 2), new MokaRange(8305, 1),
				new MokaRange(8319, 1), new MokaRange(8458, 1), new MokaRange(8462, 2), new MokaRange(8467, 1), new MokaRange(8495, 1),
				new MokaRange(8500, 1), new MokaRange(8505, 1), new MokaRange(8508, 2), new MokaRange(8518, 4), new MokaRange(8526, 1),
				new MokaRange(8580, 1), new MokaRange(11312, 47), new MokaRange(11361, 1), new MokaRange(11365, 2), new MokaRange(11368, 1),
				new MokaRange(11370, 1), new MokaRange(11372, 1), new MokaRange(11380, 1), new MokaRange(11382, 2), new MokaRange(11393, 1),
				new MokaRange(11395, 1), new MokaRange(11397, 1), new MokaRange(11399, 1), new MokaRange(11401, 1), new MokaRange(11403, 1),
				new MokaRange(11405, 1), new MokaRange(11407, 1), new MokaRange(11409, 1), new MokaRange(11411, 1), new MokaRange(11413, 1),
				new MokaRange(11415, 1), new MokaRange(11417, 1), new MokaRange(11419, 1), new MokaRange(11421, 1), new MokaRange(11423, 1),
				new MokaRange(11425, 1), new MokaRange(11427, 1), new MokaRange(11429, 1), new MokaRange(11431, 1), new MokaRange(11433, 1),
				new MokaRange(11435, 1), new MokaRange(11437, 1), new MokaRange(11439, 1), new MokaRange(11441, 1), new MokaRange(11443, 1),
				new MokaRange(11445, 1), new MokaRange(11447, 1), new MokaRange(11449, 1), new MokaRange(11451, 1), new MokaRange(11453, 1),
				new MokaRange(11455, 1), new MokaRange(11457, 1), new MokaRange(11459, 1), new MokaRange(11461, 1), new MokaRange(11463, 1),
				new MokaRange(11465, 1), new MokaRange(11467, 1), new MokaRange(11469, 1), new MokaRange(11471, 1), new MokaRange(11473, 1),
				new MokaRange(11475, 1), new MokaRange(11477, 1), new MokaRange(11479, 1), new MokaRange(11481, 1), new MokaRange(11483, 1),
				new MokaRange(11485, 1), new MokaRange(11487, 1), new MokaRange(11489, 1), new MokaRange(11491, 2), new MokaRange(11520, 38),
				new MokaRange(64256, 7), new MokaRange(64275, 5), new MokaRange(65345, 26), new MokaRange(66600, 40), new MokaRange(119834, 26),
				new MokaRange(119886, 7), new MokaRange(119894, 18), new MokaRange(119938, 26), new MokaRange(119990, 4), new MokaRange(119995, 1),
				new MokaRange(119997, 7), new MokaRange(120005, 11), new MokaRange(120042, 26), new MokaRange(120094, 26), new MokaRange(120146, 26),
				new MokaRange(120198, 26), new MokaRange(120250, 26), new MokaRange(120302, 26), new MokaRange(120354, 26), new MokaRange(120406, 26),
				new MokaRange(120458, 28), new MokaRange(120514, 25), new MokaRange(120540, 6), new MokaRange(120572, 25), new MokaRange(120598, 6),
				new MokaRange(120630, 25), new MokaRange(120656, 6), new MokaRange(120688, 25), new MokaRange(120714, 6), new MokaRange(120746, 25),
				new MokaRange(120772, 6), new MokaRange(120779, 1),
				new MokaRange(453, 1), new MokaRange(456, 1), new MokaRange(459, 1), new MokaRange(498, 1), new MokaRange(8072, 8),
				new MokaRange(8088, 8), new MokaRange(8104, 8), new MokaRange(8124, 1), new MokaRange(8140, 1), new MokaRange(8188, 1),
				new MokaRange(688, 18), new MokaRange(710, 12), new MokaRange(736, 5), new MokaRange(750, 1), new MokaRange(890, 1),
				new MokaRange(1369, 1), new MokaRange(1600, 1), new MokaRange(1765, 2), new MokaRange(2036, 2), new MokaRange(2042, 1),
				new MokaRange(3654, 1), new MokaRange(3782, 1), new MokaRange(4348, 1), new MokaRange(6103, 1), new MokaRange(6211, 1),
				new MokaRange(7468, 54), new MokaRange(7544, 1), new MokaRange(7579, 37), new MokaRange(8336, 5), new MokaRange(11631, 1),
				new MokaRange(12293, 1), new MokaRange(12337, 5), new MokaRange(12347, 1), new MokaRange(12445, 2), new MokaRange(12540, 3),
				new MokaRange(40981, 1), new MokaRange(42775, 4), new MokaRange(65392, 1), new MokaRange(65438, 2),
				new MokaRange(443, 1), new MokaRange(448, 4), new MokaRange(660, 1), new MokaRange(1488, 27), new MokaRange(1520, 3),
				new MokaRange(1569, 26), new MokaRange(1601, 10), new MokaRange(1646, 2), new MokaRange(1649, 99), new MokaRange(1749, 1),
				new MokaRange(1774, 2), new MokaRange(1786, 3), new MokaRange(1791, 1), new MokaRange(1808, 1), new MokaRange(1810, 30),
				new MokaRange(1869, 33), new MokaRange(1920, 38), new MokaRange(1969, 1), new MokaRange(1994, 33), new MokaRange(2308, 54),
				new MokaRange(2365, 1), new MokaRange(2384, 1), new MokaRange(2392, 10), new MokaRange(2427, 5), new MokaRange(2437, 8),
				new MokaRange(2447, 2), new MokaRange(2451, 22), new MokaRange(2474, 7), new MokaRange(2482, 1), new MokaRange(2486, 4),
				new MokaRange(2493, 1), new MokaRange(2510, 1), new MokaRange(2524, 2), new MokaRange(2527, 3), new MokaRange(2544, 2),
				new MokaRange(2565, 6), new MokaRange(2575, 2), new MokaRange(2579, 22), new MokaRange(2602, 7), new MokaRange(2610, 2),
				new MokaRange(2613, 2), new MokaRange(2616, 2), new MokaRange(2649, 4), new MokaRange(2654, 1), new MokaRange(2674, 3),
				new MokaRange(2693, 9), new MokaRange(2703, 3), new MokaRange(2707, 22), new MokaRange(2730, 7), new MokaRange(2738, 2),
				new MokaRange(2741, 5), new MokaRange(2749, 1), new MokaRange(2768, 1), new MokaRange(2784, 2), new MokaRange(2821, 8),
				new MokaRange(2831, 2), new MokaRange(2835, 22), new MokaRange(2858, 7), new MokaRange(2866, 2), new MokaRange(2869, 5),
				new MokaRange(2877, 1), new MokaRange(2908, 2), new MokaRange(2911, 3), new MokaRange(2929, 1), new MokaRange(2947, 1),
				new MokaRange(2949, 6), new MokaRange(2958, 3), new MokaRange(2962, 4), new MokaRange(2969, 2), new MokaRange(2972, 1),
				new MokaRange(2974, 2), new MokaRange(2979, 2), new MokaRange(2984, 3), new MokaRange(2990, 12), new MokaRange(3077, 8),
				new MokaRange(3086, 3), new MokaRange(3090, 23), new MokaRange(3114, 10), new MokaRange(3125, 5), new MokaRange(3168, 2),
				new MokaRange(3205, 8), new MokaRange(3214, 3), new MokaRange(3218, 23), new MokaRange(3242, 10), new MokaRange(3253, 5),
				new MokaRange(3261, 1), new MokaRange(3294, 1), new MokaRange(3296, 2), new MokaRange(3333, 8), new MokaRange(3342, 3),
				new MokaRange(3346, 23), new MokaRange(3370, 16), new MokaRange(3424, 2), new MokaRange(3461, 18), new MokaRange(3482, 24),
				new MokaRange(3507, 9), new MokaRange(3517, 1), new MokaRange(3520, 7), new MokaRange(3585, 48), new MokaRange(3634, 2),
				new MokaRange(3648, 6), new MokaRange(3713, 2), new MokaRange(3716, 1), new MokaRange(3719, 2), new MokaRange(3722, 1),
				new MokaRange(3725, 1), new MokaRange(3732, 4), new MokaRange(3737, 7), new MokaRange(3745, 3), new MokaRange(3749, 1),
				new MokaRange(3751, 1), new MokaRange(3754, 2), new MokaRange(3757, 4), new MokaRange(3762, 2), new MokaRange(3773, 1),
				new MokaRange(3776, 5), new MokaRange(3804, 2), new MokaRange(3840, 1), new MokaRange(3904, 8), new MokaRange(3913, 34),
				new MokaRange(3976, 4), new MokaRange(4096, 34), new MokaRange(4131, 5), new MokaRange(4137, 2), new MokaRange(4176, 6),
				new MokaRange(4304, 43), new MokaRange(4352, 90), new MokaRange(4447, 68), new MokaRange(4520, 82), new MokaRange(4608, 73),
				new MokaRange(4682, 4), new MokaRange(4688, 7), new MokaRange(4696, 1), new MokaRange(4698, 4), new MokaRange(4704, 41),
				new MokaRange(4746, 4), new MokaRange(4752, 33), new MokaRange(4786, 4), new MokaRange(4792, 7), new MokaRange(4800, 1),
				new MokaRange(4802, 4), new MokaRange(4808, 15), new MokaRange(4824, 57), new MokaRange(4882, 4), new MokaRange(4888, 67),
				new MokaRange(4992, 16), new MokaRange(5024, 85), new MokaRange(5121, 620), new MokaRange(5743, 8), new MokaRange(5761, 26),
				new MokaRange(5792, 75), new MokaRange(5888, 13), new MokaRange(5902, 4), new MokaRange(5920, 18), new MokaRange(5952, 18),
				new MokaRange(5984, 13), new MokaRange(5998, 3), new MokaRange(6016, 52), new MokaRange(6108, 1), new MokaRange(6176, 35),
				new MokaRange(6212, 52), new MokaRange(6272, 41), new MokaRange(6400, 29), new MokaRange(6480, 30), new MokaRange(6512, 5),
				new MokaRange(6528, 42), new MokaRange(6593, 7), new MokaRange(6656, 23), new MokaRange(6917, 47), new MokaRange(6981, 7),
				new MokaRange(8501, 4), new MokaRange(11568, 54), new MokaRange(11648, 23), new MokaRange(11680, 7), new MokaRange(11688, 7),
				new MokaRange(11696, 7), new MokaRange(11704, 7), new MokaRange(11712, 7), new MokaRange(11720, 7), new MokaRange(11728, 7),
				new MokaRange(11736, 7), new MokaRange(12294, 1), new MokaRange(12348, 1), new MokaRange(12353, 86), new MokaRange(12447, 1),
				new MokaRange(12449, 90), new MokaRange(12543, 1), new MokaRange(12549, 40), new MokaRange(12593, 94), new MokaRange(12704, 24),
				new MokaRange(12784, 16), new MokaRange(13312, 1), new MokaRange(19893, 1), new MokaRange(19968, 1), new MokaRange(40891, 1),
				new MokaRange(40960, 21), new MokaRange(40982, 1143), new MokaRange(43008, 2), new MokaRange(43011, 3), new MokaRange(43015, 4),
				new MokaRange(43020, 23), new MokaRange(43072, 52), new MokaRange(44032, 1), new MokaRange(55203, 1), new MokaRange(63744, 302),
				new MokaRange(64048, 59), new MokaRange(64112, 106), new MokaRange(64285, 1), new MokaRange(64287, 10), new MokaRange(64298, 13),
				new MokaRange(64312, 5), new MokaRange(64318, 1), new MokaRange(64320, 2), new MokaRange(64323, 2), new MokaRange(64326, 108),
				new MokaRange(64467, 363), new MokaRange(64848, 64), new MokaRange(64914, 54), new MokaRange(65008, 12), new MokaRange(65136, 5),
				new MokaRange(65142, 135), new MokaRange(65382, 10), new MokaRange(65393, 45), new MokaRange(65440, 31), new MokaRange(65474, 6),
				new MokaRange(65482, 6), new MokaRange(65490, 6), new MokaRange(65498, 3), new MokaRange(65536, 12), new MokaRange(65549, 26),
				new MokaRange(65576, 19), new MokaRange(65596, 2), new MokaRange(65599, 15), new MokaRange(65616, 14), new MokaRange(65664, 123),
				new MokaRange(66304, 31), new MokaRange(66352, 17), new MokaRange(66370, 8), new MokaRange(66432, 30), new MokaRange(66464, 36),
				new MokaRange(66504, 8), new MokaRange(66640, 78), new MokaRange(67584, 6), new MokaRange(67592, 1), new MokaRange(67594, 44),
				new MokaRange(67639, 2), new MokaRange(67644, 1), new MokaRange(67647, 1), new MokaRange(67840, 22), new MokaRange(68096, 1),
				new MokaRange(68112, 4), new MokaRange(68117, 3), new MokaRange(68121, 27), new MokaRange(73728, 879), new MokaRange(131072, 1),
				new MokaRange(173782, 1), new MokaRange(194560, 542)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("letterCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("letterCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.lowercaseLetterCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("lowercaseLetterCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(97, 26), new MokaRange(170, 1), new MokaRange(181, 1), new MokaRange(186, 1), new MokaRange(223, 24),
				new MokaRange(248, 8), new MokaRange(257, 1), new MokaRange(259, 1), new MokaRange(261, 1), new MokaRange(263, 1),
				new MokaRange(265, 1), new MokaRange(267, 1), new MokaRange(269, 1), new MokaRange(271, 1), new MokaRange(273, 1),
				new MokaRange(275, 1), new MokaRange(277, 1), new MokaRange(279, 1), new MokaRange(281, 1), new MokaRange(283, 1),
				new MokaRange(285, 1), new MokaRange(287, 1), new MokaRange(289, 1), new MokaRange(291, 1), new MokaRange(293, 1),
				new MokaRange(295, 1), new MokaRange(297, 1), new MokaRange(299, 1), new MokaRange(301, 1), new MokaRange(303, 1),
				new MokaRange(305, 1), new MokaRange(307, 1), new MokaRange(309, 1), new MokaRange(311, 2), new MokaRange(314, 1),
				new MokaRange(316, 1), new MokaRange(318, 1), new MokaRange(320, 1), new MokaRange(322, 1), new MokaRange(324, 1),
				new MokaRange(326, 1), new MokaRange(328, 2), new MokaRange(331, 1), new MokaRange(333, 1), new MokaRange(335, 1),
				new MokaRange(337, 1), new MokaRange(339, 1), new MokaRange(341, 1), new MokaRange(343, 1), new MokaRange(345, 1),
				new MokaRange(347, 1), new MokaRange(349, 1), new MokaRange(351, 1), new MokaRange(353, 1), new MokaRange(355, 1),
				new MokaRange(357, 1), new MokaRange(359, 1), new MokaRange(361, 1), new MokaRange(363, 1), new MokaRange(365, 1),
				new MokaRange(367, 1), new MokaRange(369, 1), new MokaRange(371, 1), new MokaRange(373, 1), new MokaRange(375, 1),
				new MokaRange(378, 1), new MokaRange(380, 1), new MokaRange(382, 3), new MokaRange(387, 1), new MokaRange(389, 1),
				new MokaRange(392, 1), new MokaRange(396, 2), new MokaRange(402, 1), new MokaRange(405, 1), new MokaRange(409, 3),
				new MokaRange(414, 1), new MokaRange(417, 1), new MokaRange(419, 1), new MokaRange(421, 1), new MokaRange(424, 1),
				new MokaRange(426, 2), new MokaRange(429, 1), new MokaRange(432, 1), new MokaRange(436, 1), new MokaRange(438, 1),
				new MokaRange(441, 2), new MokaRange(445, 3), new MokaRange(454, 1), new MokaRange(457, 1), new MokaRange(460, 1),
				new MokaRange(462, 1), new MokaRange(464, 1), new MokaRange(466, 1), new MokaRange(468, 1), new MokaRange(470, 1),
				new MokaRange(472, 1), new MokaRange(474, 1), new MokaRange(476, 2), new MokaRange(479, 1), new MokaRange(481, 1),
				new MokaRange(483, 1), new MokaRange(485, 1), new MokaRange(487, 1), new MokaRange(489, 1), new MokaRange(491, 1),
				new MokaRange(493, 1), new MokaRange(495, 2), new MokaRange(499, 1), new MokaRange(501, 1), new MokaRange(505, 1),
				new MokaRange(507, 1), new MokaRange(509, 1), new MokaRange(511, 1), new MokaRange(513, 1), new MokaRange(515, 1),
				new MokaRange(517, 1), new MokaRange(519, 1), new MokaRange(521, 1), new MokaRange(523, 1), new MokaRange(525, 1),
				new MokaRange(527, 1), new MokaRange(529, 1), new MokaRange(531, 1), new MokaRange(533, 1), new MokaRange(535, 1),
				new MokaRange(537, 1), new MokaRange(539, 1), new MokaRange(541, 1), new MokaRange(543, 1), new MokaRange(545, 1),
				new MokaRange(547, 1), new MokaRange(549, 1), new MokaRange(551, 1), new MokaRange(553, 1), new MokaRange(555, 1),
				new MokaRange(557, 1), new MokaRange(559, 1), new MokaRange(561, 1), new MokaRange(563, 7), new MokaRange(572, 1),
				new MokaRange(575, 2), new MokaRange(578, 1), new MokaRange(583, 1), new MokaRange(585, 1), new MokaRange(587, 1),
				new MokaRange(589, 1), new MokaRange(591, 69), new MokaRange(661, 27), new MokaRange(891, 3), new MokaRange(912, 1),
				new MokaRange(940, 35), new MokaRange(976, 2), new MokaRange(981, 3), new MokaRange(985, 1), new MokaRange(987, 1),
				new MokaRange(989, 1), new MokaRange(991, 1), new MokaRange(993, 1), new MokaRange(995, 1), new MokaRange(997, 1),
				new MokaRange(999, 1), new MokaRange(1001, 1), new MokaRange(1003, 1), new MokaRange(1005, 1), new MokaRange(1007, 5),
				new MokaRange(1013, 1), new MokaRange(1016, 1), new MokaRange(1019, 2), new MokaRange(1072, 48), new MokaRange(1121, 1),
				new MokaRange(1123, 1), new MokaRange(1125, 1), new MokaRange(1127, 1), new MokaRange(1129, 1), new MokaRange(1131, 1),
				new MokaRange(1133, 1), new MokaRange(1135, 1), new MokaRange(1137, 1), new MokaRange(1139, 1), new MokaRange(1141, 1),
				new MokaRange(1143, 1), new MokaRange(1145, 1), new MokaRange(1147, 1), new MokaRange(1149, 1), new MokaRange(1151, 1),
				new MokaRange(1153, 1), new MokaRange(1163, 1), new MokaRange(1165, 1), new MokaRange(1167, 1), new MokaRange(1169, 1),
				new MokaRange(1171, 1), new MokaRange(1173, 1), new MokaRange(1175, 1), new MokaRange(1177, 1), new MokaRange(1179, 1),
				new MokaRange(1181, 1), new MokaRange(1183, 1), new MokaRange(1185, 1), new MokaRange(1187, 1), new MokaRange(1189, 1),
				new MokaRange(1191, 1), new MokaRange(1193, 1), new MokaRange(1195, 1), new MokaRange(1197, 1), new MokaRange(1199, 1),
				new MokaRange(1201, 1), new MokaRange(1203, 1), new MokaRange(1205, 1), new MokaRange(1207, 1), new MokaRange(1209, 1),
				new MokaRange(1211, 1), new MokaRange(1213, 1), new MokaRange(1215, 1), new MokaRange(1218, 1), new MokaRange(1220, 1),
				new MokaRange(1222, 1), new MokaRange(1224, 1), new MokaRange(1226, 1), new MokaRange(1228, 1), new MokaRange(1230, 2),
				new MokaRange(1233, 1), new MokaRange(1235, 1), new MokaRange(1237, 1), new MokaRange(1239, 1), new MokaRange(1241, 1),
				new MokaRange(1243, 1), new MokaRange(1245, 1), new MokaRange(1247, 1), new MokaRange(1249, 1), new MokaRange(1251, 1),
				new MokaRange(1253, 1), new MokaRange(1255, 1), new MokaRange(1257, 1), new MokaRange(1259, 1), new MokaRange(1261, 1),
				new MokaRange(1263, 1), new MokaRange(1265, 1), new MokaRange(1267, 1), new MokaRange(1269, 1), new MokaRange(1271, 1),
				new MokaRange(1273, 1), new MokaRange(1275, 1), new MokaRange(1277, 1), new MokaRange(1279, 1), new MokaRange(1281, 1),
				new MokaRange(1283, 1), new MokaRange(1285, 1), new MokaRange(1287, 1), new MokaRange(1289, 1), new MokaRange(1291, 1),
				new MokaRange(1293, 1), new MokaRange(1295, 1), new MokaRange(1297, 1), new MokaRange(1299, 1), new MokaRange(1377, 39),
				new MokaRange(7424, 44), new MokaRange(7522, 22), new MokaRange(7545, 34), new MokaRange(7681, 1), new MokaRange(7683, 1),
				new MokaRange(7685, 1), new MokaRange(7687, 1), new MokaRange(7689, 1), new MokaRange(7691, 1), new MokaRange(7693, 1),
				new MokaRange(7695, 1), new MokaRange(7697, 1), new MokaRange(7699, 1), new MokaRange(7701, 1), new MokaRange(7703, 1),
				new MokaRange(7705, 1), new MokaRange(7707, 1), new MokaRange(7709, 1), new MokaRange(7711, 1), new MokaRange(7713, 1),
				new MokaRange(7715, 1), new MokaRange(7717, 1), new MokaRange(7719, 1), new MokaRange(7721, 1), new MokaRange(7723, 1),
				new MokaRange(7725, 1), new MokaRange(7727, 1), new MokaRange(7729, 1), new MokaRange(7731, 1), new MokaRange(7733, 1),
				new MokaRange(7735, 1), new MokaRange(7737, 1), new MokaRange(7739, 1), new MokaRange(7741, 1), new MokaRange(7743, 1),
				new MokaRange(7745, 1), new MokaRange(7747, 1), new MokaRange(7749, 1), new MokaRange(7751, 1), new MokaRange(7753, 1),
				new MokaRange(7755, 1), new MokaRange(7757, 1), new MokaRange(7759, 1), new MokaRange(7761, 1), new MokaRange(7763, 1),
				new MokaRange(7765, 1), new MokaRange(7767, 1), new MokaRange(7769, 1), new MokaRange(7771, 1), new MokaRange(7773, 1),
				new MokaRange(7775, 1), new MokaRange(7777, 1), new MokaRange(7779, 1), new MokaRange(7781, 1), new MokaRange(7783, 1),
				new MokaRange(7785, 1), new MokaRange(7787, 1), new MokaRange(7789, 1), new MokaRange(7791, 1), new MokaRange(7793, 1),
				new MokaRange(7795, 1), new MokaRange(7797, 1), new MokaRange(7799, 1), new MokaRange(7801, 1), new MokaRange(7803, 1),
				new MokaRange(7805, 1), new MokaRange(7807, 1), new MokaRange(7809, 1), new MokaRange(7811, 1), new MokaRange(7813, 1),
				new MokaRange(7815, 1), new MokaRange(7817, 1), new MokaRange(7819, 1), new MokaRange(7821, 1), new MokaRange(7823, 1),
				new MokaRange(7825, 1), new MokaRange(7827, 1), new MokaRange(7829, 7), new MokaRange(7841, 1), new MokaRange(7843, 1),
				new MokaRange(7845, 1), new MokaRange(7847, 1), new MokaRange(7849, 1), new MokaRange(7851, 1), new MokaRange(7853, 1),
				new MokaRange(7855, 1), new MokaRange(7857, 1), new MokaRange(7859, 1), new MokaRange(7861, 1), new MokaRange(7863, 1),
				new MokaRange(7865, 1), new MokaRange(7867, 1), new MokaRange(7869, 1), new MokaRange(7871, 1), new MokaRange(7873, 1),
				new MokaRange(7875, 1), new MokaRange(7877, 1), new MokaRange(7879, 1), new MokaRange(7881, 1), new MokaRange(7883, 1),
				new MokaRange(7885, 1), new MokaRange(7887, 1), new MokaRange(7889, 1), new MokaRange(7891, 1), new MokaRange(7893, 1),
				new MokaRange(7895, 1), new MokaRange(7897, 1), new MokaRange(7899, 1), new MokaRange(7901, 1), new MokaRange(7903, 1),
				new MokaRange(7905, 1), new MokaRange(7907, 1), new MokaRange(7909, 1), new MokaRange(7911, 1), new MokaRange(7913, 1),
				new MokaRange(7915, 1), new MokaRange(7917, 1), new MokaRange(7919, 1), new MokaRange(7921, 1), new MokaRange(7923, 1),
				new MokaRange(7925, 1), new MokaRange(7927, 1), new MokaRange(7929, 1), new MokaRange(7936, 8), new MokaRange(7952, 6),
				new MokaRange(7968, 8), new MokaRange(7984, 8), new MokaRange(8000, 6), new MokaRange(8016, 8), new MokaRange(8032, 8),
				new MokaRange(8048, 14), new MokaRange(8064, 8), new MokaRange(8080, 8), new MokaRange(8096, 8), new MokaRange(8112, 5),
				new MokaRange(8118, 2), new MokaRange(8126, 1), new MokaRange(8130, 3), new MokaRange(8134, 2), new MokaRange(8144, 4),
				new MokaRange(8150, 2), new MokaRange(8160, 8), new MokaRange(8178, 3), new MokaRange(8182, 2), new MokaRange(8305, 1),
				new MokaRange(8319, 1), new MokaRange(8458, 1), new MokaRange(8462, 2), new MokaRange(8467, 1), new MokaRange(8495, 1),
				new MokaRange(8500, 1), new MokaRange(8505, 1), new MokaRange(8508, 2), new MokaRange(8518, 4), new MokaRange(8526, 1),
				new MokaRange(8580, 1), new MokaRange(11312, 47), new MokaRange(11361, 1), new MokaRange(11365, 2), new MokaRange(11368, 1),
				new MokaRange(11370, 1), new MokaRange(11372, 1), new MokaRange(11380, 1), new MokaRange(11382, 2), new MokaRange(11393, 1),
				new MokaRange(11395, 1), new MokaRange(11397, 1), new MokaRange(11399, 1), new MokaRange(11401, 1), new MokaRange(11403, 1),
				new MokaRange(11405, 1), new MokaRange(11407, 1), new MokaRange(11409, 1), new MokaRange(11411, 1), new MokaRange(11413, 1),
				new MokaRange(11415, 1), new MokaRange(11417, 1), new MokaRange(11419, 1), new MokaRange(11421, 1), new MokaRange(11423, 1),
				new MokaRange(11425, 1), new MokaRange(11427, 1), new MokaRange(11429, 1), new MokaRange(11431, 1), new MokaRange(11433, 1),
				new MokaRange(11435, 1), new MokaRange(11437, 1), new MokaRange(11439, 1), new MokaRange(11441, 1), new MokaRange(11443, 1),
				new MokaRange(11445, 1), new MokaRange(11447, 1), new MokaRange(11449, 1), new MokaRange(11451, 1), new MokaRange(11453, 1),
				new MokaRange(11455, 1), new MokaRange(11457, 1), new MokaRange(11459, 1), new MokaRange(11461, 1), new MokaRange(11463, 1),
				new MokaRange(11465, 1), new MokaRange(11467, 1), new MokaRange(11469, 1), new MokaRange(11471, 1), new MokaRange(11473, 1),
				new MokaRange(11475, 1), new MokaRange(11477, 1), new MokaRange(11479, 1), new MokaRange(11481, 1), new MokaRange(11483, 1),
				new MokaRange(11485, 1), new MokaRange(11487, 1), new MokaRange(11489, 1), new MokaRange(11491, 2), new MokaRange(11520, 38),
				new MokaRange(64256, 7), new MokaRange(64275, 5), new MokaRange(65345, 26), new MokaRange(66600, 40), new MokaRange(119834, 26),
				new MokaRange(119886, 7), new MokaRange(119894, 18), new MokaRange(119938, 26), new MokaRange(119990, 4), new MokaRange(119995, 1),
				new MokaRange(119997, 7), new MokaRange(120005, 11), new MokaRange(120042, 26), new MokaRange(120094, 26), new MokaRange(120146, 26),
				new MokaRange(120198, 26), new MokaRange(120250, 26), new MokaRange(120302, 26), new MokaRange(120354, 26), new MokaRange(120406, 26),
				new MokaRange(120458, 28), new MokaRange(120514, 25), new MokaRange(120540, 6), new MokaRange(120572, 25), new MokaRange(120598, 6),
				new MokaRange(120630, 25), new MokaRange(120656, 6), new MokaRange(120688, 25), new MokaRange(120714, 6), new MokaRange(120746, 25),
				new MokaRange(120772, 6), new MokaRange(120779, 1)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("lowercaseLetterCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("lowercaseLetterCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.nonBaseCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("nonBaseCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(768, 112), new MokaRange(1155, 4), new MokaRange(1425, 45), new MokaRange(1471, 1), new MokaRange(1473, 2),
				new MokaRange(1476, 2), new MokaRange(1479, 1), new MokaRange(1552, 6), new MokaRange(1611, 20), new MokaRange(1648, 1),
				new MokaRange(1750, 7), new MokaRange(1759, 6), new MokaRange(1767, 2), new MokaRange(1770, 4), new MokaRange(1809, 1),
				new MokaRange(1840, 27), new MokaRange(1958, 11), new MokaRange(2027, 9), new MokaRange(2305, 2), new MokaRange(2364, 1),
				new MokaRange(2369, 8), new MokaRange(2381, 1), new MokaRange(2385, 4), new MokaRange(2402, 2), new MokaRange(2433, 1),
				new MokaRange(2492, 1), new MokaRange(2497, 4), new MokaRange(2509, 1), new MokaRange(2530, 2), new MokaRange(2561, 2),
				new MokaRange(2620, 1), new MokaRange(2625, 2), new MokaRange(2631, 2), new MokaRange(2635, 3), new MokaRange(2672, 2),
				new MokaRange(2689, 2), new MokaRange(2748, 1), new MokaRange(2753, 5), new MokaRange(2759, 2), new MokaRange(2765, 1),
				new MokaRange(2786, 2), new MokaRange(2817, 1), new MokaRange(2876, 1), new MokaRange(2879, 1), new MokaRange(2881, 3),
				new MokaRange(2893, 1), new MokaRange(2902, 1), new MokaRange(2946, 1), new MokaRange(3008, 1), new MokaRange(3021, 1),
				new MokaRange(3134, 3), new MokaRange(3142, 3), new MokaRange(3146, 4), new MokaRange(3157, 2), new MokaRange(3260, 1),
				new MokaRange(3263, 1), new MokaRange(3270, 1), new MokaRange(3276, 2), new MokaRange(3298, 2), new MokaRange(3393, 3),
				new MokaRange(3405, 1), new MokaRange(3530, 1), new MokaRange(3538, 3), new MokaRange(3542, 1), new MokaRange(3633, 1),
				new MokaRange(3636, 7), new MokaRange(3655, 8), new MokaRange(3761, 1), new MokaRange(3764, 6), new MokaRange(3771, 2),
				new MokaRange(3784, 6), new MokaRange(3864, 2), new MokaRange(3893, 1), new MokaRange(3895, 1), new MokaRange(3897, 1),
				new MokaRange(3953, 14), new MokaRange(3968, 5), new MokaRange(3974, 2), new MokaRange(3984, 8), new MokaRange(3993, 36),
				new MokaRange(4038, 1), new MokaRange(4141, 4), new MokaRange(4146, 1), new MokaRange(4150, 2), new MokaRange(4153, 1),
				new MokaRange(4184, 2), new MokaRange(4959, 1), new MokaRange(5906, 3), new MokaRange(5938, 3), new MokaRange(5970, 2),
				new MokaRange(6002, 2), new MokaRange(6071, 7), new MokaRange(6086, 1), new MokaRange(6089, 11), new MokaRange(6109, 1),
				new MokaRange(6155, 3), new MokaRange(6313, 1), new MokaRange(6432, 3), new MokaRange(6439, 2), new MokaRange(6450, 1),
				new MokaRange(6457, 3), new MokaRange(6679, 2), new MokaRange(6912, 4), new MokaRange(6964, 1), new MokaRange(6966, 5),
				new MokaRange(6972, 1), new MokaRange(6978, 1), new MokaRange(7019, 9), new MokaRange(7616, 11), new MokaRange(7678, 2),
				new MokaRange(8400, 13), new MokaRange(8417, 1), new MokaRange(8421, 11), new MokaRange(12330, 6), new MokaRange(12441, 2),
				new MokaRange(43014, 1), new MokaRange(43019, 1), new MokaRange(43045, 2), new MokaRange(64286, 1), new MokaRange(65024, 16),
				new MokaRange(65056, 4), new MokaRange(68097, 3), new MokaRange(68101, 2), new MokaRange(68108, 4), new MokaRange(68152, 3),
				new MokaRange(68159, 1), new MokaRange(119143, 3), new MokaRange(119163, 8), new MokaRange(119173, 7), new MokaRange(119210, 4),
				new MokaRange(119362, 3), new MokaRange(917760, 240),
				new MokaRange(1160, 2), new MokaRange(1758, 1), new MokaRange(8413, 4), new MokaRange(8418, 3),
				new MokaRange(2307, 1), new MokaRange(2366, 3), new MokaRange(2377, 4), new MokaRange(2434, 2), new MokaRange(2494, 3),
				new MokaRange(2503, 2), new MokaRange(2507, 2), new MokaRange(2519, 1), new MokaRange(2563, 1), new MokaRange(2622, 3),
				new MokaRange(2691, 1), new MokaRange(2750, 3), new MokaRange(2761, 1), new MokaRange(2763, 2), new MokaRange(2818, 2),
				new MokaRange(2878, 1), new MokaRange(2880, 1), new MokaRange(2887, 2), new MokaRange(2891, 2), new MokaRange(2903, 1),
				new MokaRange(3006, 2), new MokaRange(3009, 2), new MokaRange(3014, 3), new MokaRange(3018, 3), new MokaRange(3031, 1),
				new MokaRange(3073, 3), new MokaRange(3137, 4), new MokaRange(3202, 2), new MokaRange(3262, 1), new MokaRange(3264, 5),
				new MokaRange(3271, 2), new MokaRange(3274, 2), new MokaRange(3285, 2), new MokaRange(3330, 2), new MokaRange(3390, 3),
				new MokaRange(3398, 3), new MokaRange(3402, 3), new MokaRange(3415, 1), new MokaRange(3458, 2), new MokaRange(3535, 3),
				new MokaRange(3544, 8), new MokaRange(3570, 2), new MokaRange(3902, 2), new MokaRange(3967, 1), new MokaRange(4140, 1),
				new MokaRange(4145, 1), new MokaRange(4152, 1), new MokaRange(4182, 2), new MokaRange(6070, 1), new MokaRange(6078, 8),
				new MokaRange(6087, 2), new MokaRange(6435, 4), new MokaRange(6441, 3), new MokaRange(6448, 2), new MokaRange(6451, 6),
				new MokaRange(6576, 17), new MokaRange(6600, 2), new MokaRange(6681, 3), new MokaRange(6916, 1), new MokaRange(6965, 1),
				new MokaRange(6971, 1), new MokaRange(6973, 5), new MokaRange(6979, 2), new MokaRange(43010, 1), new MokaRange(43043, 2),
				new MokaRange(43047, 1), new MokaRange(119141, 2), new MokaRange(119149, 6)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("nonBaseCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("nonBaseCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.punctuationCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("punctuationCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(95, 1), new MokaRange(8255, 2), new MokaRange(8276, 1), new MokaRange(65075, 2), new MokaRange(65101, 3),
				new MokaRange(65343, 1),
				new MokaRange(45, 1), new MokaRange(1418, 1), new MokaRange(6150, 1), new MokaRange(8208, 6), new MokaRange(11799, 1),
				new MokaRange(12316, 1), new MokaRange(12336, 1), new MokaRange(12448, 1), new MokaRange(65073, 2), new MokaRange(65112, 1),
				new MokaRange(65123, 1), new MokaRange(65293, 1),
				new MokaRange(40, 1), new MokaRange(91, 1), new MokaRange(123, 1), new MokaRange(3898, 1), new MokaRange(3900, 1),
				new MokaRange(5787, 1), new MokaRange(8218, 1), new MokaRange(8222, 1), new MokaRange(8261, 1), new MokaRange(8317, 1),
				new MokaRange(8333, 1), new MokaRange(9001, 1), new MokaRange(10088, 1), new MokaRange(10090, 1), new MokaRange(10092, 1),
				new MokaRange(10094, 1), new MokaRange(10096, 1), new MokaRange(10098, 1), new MokaRange(10100, 1), new MokaRange(10181, 1),
				new MokaRange(10214, 1), new MokaRange(10216, 1), new MokaRange(10218, 1), new MokaRange(10627, 1), new MokaRange(10629, 1),
				new MokaRange(10631, 1), new MokaRange(10633, 1), new MokaRange(10635, 1), new MokaRange(10637, 1), new MokaRange(10639, 1),
				new MokaRange(10641, 1), new MokaRange(10643, 1), new MokaRange(10645, 1), new MokaRange(10647, 1), new MokaRange(10712, 1),
				new MokaRange(10714, 1), new MokaRange(10748, 1), new MokaRange(12296, 1), new MokaRange(12298, 1), new MokaRange(12300, 1),
				new MokaRange(12302, 1), new MokaRange(12304, 1), new MokaRange(12308, 1), new MokaRange(12310, 1), new MokaRange(12312, 1),
				new MokaRange(12314, 1), new MokaRange(12317, 1), new MokaRange(64830, 1), new MokaRange(65047, 1), new MokaRange(65077, 1),
				new MokaRange(65079, 1), new MokaRange(65081, 1), new MokaRange(65083, 1), new MokaRange(65085, 1), new MokaRange(65087, 1),
				new MokaRange(65089, 1), new MokaRange(65091, 1), new MokaRange(65095, 1), new MokaRange(65113, 1), new MokaRange(65115, 1),
				new MokaRange(65117, 1), new MokaRange(65288, 1), new MokaRange(65339, 1), new MokaRange(65371, 1), new MokaRange(65375, 1),
				new MokaRange(65378, 1),
				new MokaRange(41, 1), new MokaRange(93, 1), new MokaRange(125, 1), new MokaRange(3899, 1), new MokaRange(3901, 1),
				new MokaRange(5788, 1), new MokaRange(8262, 1), new MokaRange(8318, 1), new MokaRange(8334, 1), new MokaRange(9002, 1),
				new MokaRange(10089, 1), new MokaRange(10091, 1), new MokaRange(10093, 1), new MokaRange(10095, 1), new MokaRange(10097, 1),
				new MokaRange(10099, 1), new MokaRange(10101, 1), new MokaRange(10182, 1), new MokaRange(10215, 1), new MokaRange(10217, 1),
				new MokaRange(10219, 1), new MokaRange(10628, 1), new MokaRange(10630, 1), new MokaRange(10632, 1), new MokaRange(10634, 1),
				new MokaRange(10636, 1), new MokaRange(10638, 1), new MokaRange(10640, 1), new MokaRange(10642, 1), new MokaRange(10644, 1),
				new MokaRange(10646, 1), new MokaRange(10648, 1), new MokaRange(10713, 1), new MokaRange(10715, 1), new MokaRange(10749, 1),
				new MokaRange(12297, 1), new MokaRange(12299, 1), new MokaRange(12301, 1), new MokaRange(12303, 1), new MokaRange(12305, 1),
				new MokaRange(12309, 1), new MokaRange(12311, 1), new MokaRange(12313, 1), new MokaRange(12315, 1), new MokaRange(12318, 2),
				new MokaRange(64831, 1), new MokaRange(65048, 1), new MokaRange(65078, 1), new MokaRange(65080, 1), new MokaRange(65082, 1),
				new MokaRange(65084, 1), new MokaRange(65086, 1), new MokaRange(65088, 1), new MokaRange(65090, 1), new MokaRange(65092, 1),
				new MokaRange(65096, 1), new MokaRange(65114, 1), new MokaRange(65116, 1), new MokaRange(65118, 1), new MokaRange(65289, 1),
				new MokaRange(65341, 1), new MokaRange(65373, 1), new MokaRange(65376, 1), new MokaRange(65379, 1),
				new MokaRange(171, 1), new MokaRange(8216, 1), new MokaRange(8219, 2), new MokaRange(8223, 1), new MokaRange(8249, 1),
				new MokaRange(11778, 1), new MokaRange(11780, 1), new MokaRange(11785, 1), new MokaRange(11788, 1), new MokaRange(11804, 1),
				new MokaRange(187, 1), new MokaRange(8217, 1), new MokaRange(8221, 1), new MokaRange(8250, 1), new MokaRange(11779, 1),
				new MokaRange(11781, 1), new MokaRange(11786, 1), new MokaRange(11789, 1), new MokaRange(11805, 1),
				new MokaRange(33, 3), new MokaRange(37, 3), new MokaRange(42, 1), new MokaRange(44, 1), new MokaRange(46, 2),
				new MokaRange(58, 2), new MokaRange(63, 2), new MokaRange(92, 1), new MokaRange(161, 1), new MokaRange(183, 1),
				new MokaRange(191, 1), new MokaRange(894, 1), new MokaRange(903, 1), new MokaRange(1370, 6), new MokaRange(1417, 1),
				new MokaRange(1470, 1), new MokaRange(1472, 1), new MokaRange(1475, 1), new MokaRange(1478, 1), new MokaRange(1523, 2),
				new MokaRange(1548, 2), new MokaRange(1563, 1), new MokaRange(1566, 2), new MokaRange(1642, 4), new MokaRange(1748, 1),
				new MokaRange(1792, 14), new MokaRange(2039, 3), new MokaRange(2404, 2), new MokaRange(2416, 1), new MokaRange(3572, 1),
				new MokaRange(3663, 1), new MokaRange(3674, 2), new MokaRange(3844, 15), new MokaRange(3973, 1), new MokaRange(4048, 2),
				new MokaRange(4170, 6), new MokaRange(4347, 1), new MokaRange(4961, 8), new MokaRange(5741, 2), new MokaRange(5867, 3),
				new MokaRange(5941, 2), new MokaRange(6100, 3), new MokaRange(6104, 3), new MokaRange(6144, 6), new MokaRange(6151, 4),
				new MokaRange(6468, 2), new MokaRange(6622, 2), new MokaRange(6686, 2), new MokaRange(7002, 7), new MokaRange(8214, 2),
				new MokaRange(8224, 8), new MokaRange(8240, 9), new MokaRange(8251, 4), new MokaRange(8257, 3), new MokaRange(8263, 11),
				new MokaRange(8275, 1), new MokaRange(8277, 10), new MokaRange(11513, 4), new MokaRange(11518, 2), new MokaRange(11776, 2),
				new MokaRange(11782, 3), new MokaRange(11787, 1), new MokaRange(11790, 9), new MokaRange(12289, 3), new MokaRange(12349, 1),
				new MokaRange(12539, 1), new MokaRange(43124, 4), new MokaRange(65040, 7), new MokaRange(65049, 1), new MokaRange(65072, 1),
				new MokaRange(65093, 2), new MokaRange(65097, 4), new MokaRange(65104, 3), new MokaRange(65108, 4), new MokaRange(65119, 3),
				new MokaRange(65128, 1), new MokaRange(65130, 2), new MokaRange(65281, 3), new MokaRange(65285, 3), new MokaRange(65290, 1),
				new MokaRange(65292, 1), new MokaRange(65294, 2), new MokaRange(65306, 2), new MokaRange(65311, 2), new MokaRange(65340, 1),
				new MokaRange(65377, 1), new MokaRange(65380, 2), new MokaRange(65792, 2), new MokaRange(66463, 1), new MokaRange(66512, 1),
				new MokaRange(67871, 1), new MokaRange(68176, 9), new MokaRange(74864, 4)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("punctuationCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("punctuationCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.symbolCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("symbolCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(36, 1), new MokaRange(162, 4), new MokaRange(1547, 1), new MokaRange(2546, 2), new MokaRange(2801, 1),
				new MokaRange(3065, 1), new MokaRange(3647, 1), new MokaRange(6107, 1), new MokaRange(8352, 22), new MokaRange(65020, 1),
				new MokaRange(65129, 1), new MokaRange(65284, 1), new MokaRange(65504, 2), new MokaRange(65509, 2),
				new MokaRange(94, 1), new MokaRange(96, 1), new MokaRange(168, 1), new MokaRange(175, 1), new MokaRange(180, 1),
				new MokaRange(184, 1), new MokaRange(706, 4), new MokaRange(722, 14), new MokaRange(741, 9), new MokaRange(751, 17),
				new MokaRange(884, 2), new MokaRange(900, 2), new MokaRange(8125, 1), new MokaRange(8127, 3), new MokaRange(8141, 3),
				new MokaRange(8157, 3), new MokaRange(8173, 3), new MokaRange(8189, 2), new MokaRange(12443, 2), new MokaRange(42752, 23),
				new MokaRange(42784, 2), new MokaRange(65342, 1), new MokaRange(65344, 1), new MokaRange(65507, 1),
				new MokaRange(43, 1), new MokaRange(60, 3), new MokaRange(124, 1), new MokaRange(126, 1), new MokaRange(172, 1),
				new MokaRange(177, 1), new MokaRange(215, 1), new MokaRange(247, 1), new MokaRange(1014, 1), new MokaRange(8260, 1),
				new MokaRange(8274, 1), new MokaRange(8314, 3), new MokaRange(8330, 3), new MokaRange(8512, 5), new MokaRange(8523, 1),
				new MokaRange(8592, 5), new MokaRange(8602, 2), new MokaRange(8608, 1), new MokaRange(8611, 1), new MokaRange(8614, 1),
				new MokaRange(8622, 1), new MokaRange(8654, 2), new MokaRange(8658, 1), new MokaRange(8660, 1), new MokaRange(8692, 268),
				new MokaRange(8968, 4), new MokaRange(8992, 2), new MokaRange(9084, 1), new MokaRange(9115, 25), new MokaRange(9180, 6),
				new MokaRange(9655, 1), new MokaRange(9665, 1), new MokaRange(9720, 8), new MokaRange(9839, 1), new MokaRange(10176, 5),
				new MokaRange(10183, 4), new MokaRange(10192, 22), new MokaRange(10224, 16), new MokaRange(10496, 131), new MokaRange(10649, 63),
				new MokaRange(10716, 32), new MokaRange(10750, 258), new MokaRange(64297, 1), new MokaRange(65122, 1), new MokaRange(65124, 3),
				new MokaRange(65291, 1), new MokaRange(65308, 3), new MokaRange(65372, 1), new MokaRange(65374, 1), new MokaRange(65506, 1),
				new MokaRange(65513, 4), new MokaRange(120513, 1), new MokaRange(120539, 1), new MokaRange(120571, 1), new MokaRange(120597, 1),
				new MokaRange(120629, 1), new MokaRange(120655, 1), new MokaRange(120687, 1), new MokaRange(120713, 1), new MokaRange(120745, 1),
				new MokaRange(120771, 1),
				new MokaRange(166, 2), new MokaRange(169, 1), new MokaRange(174, 1), new MokaRange(176, 1), new MokaRange(182, 1),
				new MokaRange(1154, 1), new MokaRange(1550, 2), new MokaRange(1769, 1), new MokaRange(1789, 2), new MokaRange(2038, 1),
				new MokaRange(2554, 1), new MokaRange(2928, 1), new MokaRange(3059, 6), new MokaRange(3066, 1), new MokaRange(3313, 2),
				new MokaRange(3841, 3), new MokaRange(3859, 5), new MokaRange(3866, 6), new MokaRange(3892, 1), new MokaRange(3894, 1),
				new MokaRange(3896, 1), new MokaRange(4030, 8), new MokaRange(4039, 6), new MokaRange(4047, 1), new MokaRange(4960, 1),
				new MokaRange(5008, 10), new MokaRange(6464, 1), new MokaRange(6624, 32), new MokaRange(7009, 10), new MokaRange(7028, 9),
				new MokaRange(8448, 2), new MokaRange(8451, 4), new MokaRange(8456, 2), new MokaRange(8468, 1), new MokaRange(8470, 3),
				new MokaRange(8478, 6), new MokaRange(8485, 1), new MokaRange(8487, 1), new MokaRange(8489, 1), new MokaRange(8494, 1),
				new MokaRange(8506, 2), new MokaRange(8522, 1), new MokaRange(8524, 2), new MokaRange(8597, 5), new MokaRange(8604, 4),
				new MokaRange(8609, 2), new MokaRange(8612, 2), new MokaRange(8615, 7), new MokaRange(8623, 31), new MokaRange(8656, 2),
				new MokaRange(8659, 1), new MokaRange(8661, 31), new MokaRange(8960, 8), new MokaRange(8972, 20), new MokaRange(8994, 7),
				new MokaRange(9003, 81), new MokaRange(9085, 30), new MokaRange(9140, 40), new MokaRange(9186, 6), new MokaRange(9216, 39),
				new MokaRange(9280, 11), new MokaRange(9372, 78), new MokaRange(9472, 183), new MokaRange(9656, 9), new MokaRange(9666, 54),
				new MokaRange(9728, 111), new MokaRange(9840, 45), new MokaRange(9888, 19), new MokaRange(9985, 4), new MokaRange(9990, 4),
				new MokaRange(9996, 28), new MokaRange(10025, 35), new MokaRange(10061, 1), new MokaRange(10063, 4), new MokaRange(10070, 1),
				new MokaRange(10072, 7), new MokaRange(10081, 7), new MokaRange(10132, 1), new MokaRange(10136, 24), new MokaRange(10161, 14),
				new MokaRange(10240, 256), new MokaRange(11008, 27), new MokaRange(11040, 4), new MokaRange(11493, 6), new MokaRange(11904, 26),
				new MokaRange(11931, 89), new MokaRange(12032, 214), new MokaRange(12272, 12), new MokaRange(12292, 1), new MokaRange(12306, 2),
				new MokaRange(12320, 1), new MokaRange(12342, 2), new MokaRange(12350, 2), new MokaRange(12688, 2), new MokaRange(12694, 10),
				new MokaRange(12736, 16), new MokaRange(12800, 31), new MokaRange(12842, 26), new MokaRange(12880, 1), new MokaRange(12896, 32),
				new MokaRange(12938, 39), new MokaRange(12992, 63), new MokaRange(13056, 256), new MokaRange(19904, 64), new MokaRange(42128, 55),
				new MokaRange(43048, 4), new MokaRange(65021, 1), new MokaRange(65508, 1), new MokaRange(65512, 1), new MokaRange(65517, 2),
				new MokaRange(65532, 2), new MokaRange(65794, 1), new MokaRange(65847, 9), new MokaRange(65913, 17), new MokaRange(118784, 246),
				new MokaRange(119040, 39), new MokaRange(119082, 59), new MokaRange(119146, 3), new MokaRange(119171, 2), new MokaRange(119180, 30),
				new MokaRange(119214, 48), new MokaRange(119296, 66), new MokaRange(119365, 1), new MokaRange(119552, 87)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("symbolCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("symbolCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.uppercaseLetterCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("uppercaseLetterCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(65, 26), new MokaRange(192, 23), new MokaRange(216, 7), new MokaRange(256, 1), new MokaRange(258, 1),
				new MokaRange(260, 1), new MokaRange(262, 1), new MokaRange(264, 1), new MokaRange(266, 1), new MokaRange(268, 1),
				new MokaRange(270, 1), new MokaRange(272, 1), new MokaRange(274, 1), new MokaRange(276, 1), new MokaRange(278, 1),
				new MokaRange(280, 1), new MokaRange(282, 1), new MokaRange(284, 1), new MokaRange(286, 1), new MokaRange(288, 1),
				new MokaRange(290, 1), new MokaRange(292, 1), new MokaRange(294, 1), new MokaRange(296, 1), new MokaRange(298, 1),
				new MokaRange(300, 1), new MokaRange(302, 1), new MokaRange(304, 1), new MokaRange(306, 1), new MokaRange(308, 1),
				new MokaRange(310, 1), new MokaRange(313, 1), new MokaRange(315, 1), new MokaRange(317, 1), new MokaRange(319, 1),
				new MokaRange(321, 1), new MokaRange(323, 1), new MokaRange(325, 1), new MokaRange(327, 1), new MokaRange(330, 1),
				new MokaRange(332, 1), new MokaRange(334, 1), new MokaRange(336, 1), new MokaRange(338, 1), new MokaRange(340, 1),
				new MokaRange(342, 1), new MokaRange(344, 1), new MokaRange(346, 1), new MokaRange(348, 1), new MokaRange(350, 1),
				new MokaRange(352, 1), new MokaRange(354, 1), new MokaRange(356, 1), new MokaRange(358, 1), new MokaRange(360, 1),
				new MokaRange(362, 1), new MokaRange(364, 1), new MokaRange(366, 1), new MokaRange(368, 1), new MokaRange(370, 1),
				new MokaRange(372, 1), new MokaRange(374, 1), new MokaRange(376, 2), new MokaRange(379, 1), new MokaRange(381, 1),
				new MokaRange(385, 2), new MokaRange(388, 1), new MokaRange(390, 2), new MokaRange(393, 3), new MokaRange(398, 4),
				new MokaRange(403, 2), new MokaRange(406, 3), new MokaRange(412, 2), new MokaRange(415, 2), new MokaRange(418, 1),
				new MokaRange(420, 1), new MokaRange(422, 2), new MokaRange(425, 1), new MokaRange(428, 1), new MokaRange(430, 2),
				new MokaRange(433, 3), new MokaRange(437, 1), new MokaRange(439, 2), new MokaRange(444, 1), new MokaRange(452, 1),
				new MokaRange(455, 1), new MokaRange(458, 1), new MokaRange(461, 1), new MokaRange(463, 1), new MokaRange(465, 1),
				new MokaRange(467, 1), new MokaRange(469, 1), new MokaRange(471, 1), new MokaRange(473, 1), new MokaRange(475, 1),
				new MokaRange(478, 1), new MokaRange(480, 1), new MokaRange(482, 1), new MokaRange(484, 1), new MokaRange(486, 1),
				new MokaRange(488, 1), new MokaRange(490, 1), new MokaRange(492, 1), new MokaRange(494, 1), new MokaRange(497, 1),
				new MokaRange(500, 1), new MokaRange(502, 3), new MokaRange(506, 1), new MokaRange(508, 1), new MokaRange(510, 1),
				new MokaRange(512, 1), new MokaRange(514, 1), new MokaRange(516, 1), new MokaRange(518, 1), new MokaRange(520, 1),
				new MokaRange(522, 1), new MokaRange(524, 1), new MokaRange(526, 1), new MokaRange(528, 1), new MokaRange(530, 1),
				new MokaRange(532, 1), new MokaRange(534, 1), new MokaRange(536, 1), new MokaRange(538, 1), new MokaRange(540, 1),
				new MokaRange(542, 1), new MokaRange(544, 1), new MokaRange(546, 1), new MokaRange(548, 1), new MokaRange(550, 1),
				new MokaRange(552, 1), new MokaRange(554, 1), new MokaRange(556, 1), new MokaRange(558, 1), new MokaRange(560, 1),
				new MokaRange(562, 1), new MokaRange(570, 2), new MokaRange(573, 2), new MokaRange(577, 1), new MokaRange(579, 4),
				new MokaRange(584, 1), new MokaRange(586, 1), new MokaRange(588, 1), new MokaRange(590, 1), new MokaRange(902, 1),
				new MokaRange(904, 3), new MokaRange(908, 1), new MokaRange(910, 2), new MokaRange(913, 17), new MokaRange(931, 9),
				new MokaRange(978, 3), new MokaRange(984, 1), new MokaRange(986, 1), new MokaRange(988, 1), new MokaRange(990, 1),
				new MokaRange(992, 1), new MokaRange(994, 1), new MokaRange(996, 1), new MokaRange(998, 1), new MokaRange(1000, 1),
				new MokaRange(1002, 1), new MokaRange(1004, 1), new MokaRange(1006, 1), new MokaRange(1012, 1), new MokaRange(1015, 1),
				new MokaRange(1017, 2), new MokaRange(1021, 51), new MokaRange(1120, 1), new MokaRange(1122, 1), new MokaRange(1124, 1),
				new MokaRange(1126, 1), new MokaRange(1128, 1), new MokaRange(1130, 1), new MokaRange(1132, 1), new MokaRange(1134, 1),
				new MokaRange(1136, 1), new MokaRange(1138, 1), new MokaRange(1140, 1), new MokaRange(1142, 1), new MokaRange(1144, 1),
				new MokaRange(1146, 1), new MokaRange(1148, 1), new MokaRange(1150, 1), new MokaRange(1152, 1), new MokaRange(1162, 1),
				new MokaRange(1164, 1), new MokaRange(1166, 1), new MokaRange(1168, 1), new MokaRange(1170, 1), new MokaRange(1172, 1),
				new MokaRange(1174, 1), new MokaRange(1176, 1), new MokaRange(1178, 1), new MokaRange(1180, 1), new MokaRange(1182, 1),
				new MokaRange(1184, 1), new MokaRange(1186, 1), new MokaRange(1188, 1), new MokaRange(1190, 1), new MokaRange(1192, 1),
				new MokaRange(1194, 1), new MokaRange(1196, 1), new MokaRange(1198, 1), new MokaRange(1200, 1), new MokaRange(1202, 1),
				new MokaRange(1204, 1), new MokaRange(1206, 1), new MokaRange(1208, 1), new MokaRange(1210, 1), new MokaRange(1212, 1),
				new MokaRange(1214, 1), new MokaRange(1216, 2), new MokaRange(1219, 1), new MokaRange(1221, 1), new MokaRange(1223, 1),
				new MokaRange(1225, 1), new MokaRange(1227, 1), new MokaRange(1229, 1), new MokaRange(1232, 1), new MokaRange(1234, 1),
				new MokaRange(1236, 1), new MokaRange(1238, 1), new MokaRange(1240, 1), new MokaRange(1242, 1), new MokaRange(1244, 1),
				new MokaRange(1246, 1), new MokaRange(1248, 1), new MokaRange(1250, 1), new MokaRange(1252, 1), new MokaRange(1254, 1),
				new MokaRange(1256, 1), new MokaRange(1258, 1), new MokaRange(1260, 1), new MokaRange(1262, 1), new MokaRange(1264, 1),
				new MokaRange(1266, 1), new MokaRange(1268, 1), new MokaRange(1270, 1), new MokaRange(1272, 1), new MokaRange(1274, 1),
				new MokaRange(1276, 1), new MokaRange(1278, 1), new MokaRange(1280, 1), new MokaRange(1282, 1), new MokaRange(1284, 1),
				new MokaRange(1286, 1), new MokaRange(1288, 1), new MokaRange(1290, 1), new MokaRange(1292, 1), new MokaRange(1294, 1),
				new MokaRange(1296, 1), new MokaRange(1298, 1), new MokaRange(1329, 38), new MokaRange(4256, 38), new MokaRange(7680, 1),
				new MokaRange(7682, 1), new MokaRange(7684, 1), new MokaRange(7686, 1), new MokaRange(7688, 1), new MokaRange(7690, 1),
				new MokaRange(7692, 1), new MokaRange(7694, 1), new MokaRange(7696, 1), new MokaRange(7698, 1), new MokaRange(7700, 1),
				new MokaRange(7702, 1), new MokaRange(7704, 1), new MokaRange(7706, 1), new MokaRange(7708, 1), new MokaRange(7710, 1),
				new MokaRange(7712, 1), new MokaRange(7714, 1), new MokaRange(7716, 1), new MokaRange(7718, 1), new MokaRange(7720, 1),
				new MokaRange(7722, 1), new MokaRange(7724, 1), new MokaRange(7726, 1), new MokaRange(7728, 1), new MokaRange(7730, 1),
				new MokaRange(7732, 1), new MokaRange(7734, 1), new MokaRange(7736, 1), new MokaRange(7738, 1), new MokaRange(7740, 1),
				new MokaRange(7742, 1), new MokaRange(7744, 1), new MokaRange(7746, 1), new MokaRange(7748, 1), new MokaRange(7750, 1),
				new MokaRange(7752, 1), new MokaRange(7754, 1), new MokaRange(7756, 1), new MokaRange(7758, 1), new MokaRange(7760, 1),
				new MokaRange(7762, 1), new MokaRange(7764, 1), new MokaRange(7766, 1), new MokaRange(7768, 1), new MokaRange(7770, 1),
				new MokaRange(7772, 1), new MokaRange(7774, 1), new MokaRange(7776, 1), new MokaRange(7778, 1), new MokaRange(7780, 1),
				new MokaRange(7782, 1), new MokaRange(7784, 1), new MokaRange(7786, 1), new MokaRange(7788, 1), new MokaRange(7790, 1),
				new MokaRange(7792, 1), new MokaRange(7794, 1), new MokaRange(7796, 1), new MokaRange(7798, 1), new MokaRange(7800, 1),
				new MokaRange(7802, 1), new MokaRange(7804, 1), new MokaRange(7806, 1), new MokaRange(7808, 1), new MokaRange(7810, 1),
				new MokaRange(7812, 1), new MokaRange(7814, 1), new MokaRange(7816, 1), new MokaRange(7818, 1), new MokaRange(7820, 1),
				new MokaRange(7822, 1), new MokaRange(7824, 1), new MokaRange(7826, 1), new MokaRange(7828, 1), new MokaRange(7840, 1),
				new MokaRange(7842, 1), new MokaRange(7844, 1), new MokaRange(7846, 1), new MokaRange(7848, 1), new MokaRange(7850, 1),
				new MokaRange(7852, 1), new MokaRange(7854, 1), new MokaRange(7856, 1), new MokaRange(7858, 1), new MokaRange(7860, 1),
				new MokaRange(7862, 1), new MokaRange(7864, 1), new MokaRange(7866, 1), new MokaRange(7868, 1), new MokaRange(7870, 1),
				new MokaRange(7872, 1), new MokaRange(7874, 1), new MokaRange(7876, 1), new MokaRange(7878, 1), new MokaRange(7880, 1),
				new MokaRange(7882, 1), new MokaRange(7884, 1), new MokaRange(7886, 1), new MokaRange(7888, 1), new MokaRange(7890, 1),
				new MokaRange(7892, 1), new MokaRange(7894, 1), new MokaRange(7896, 1), new MokaRange(7898, 1), new MokaRange(7900, 1),
				new MokaRange(7902, 1), new MokaRange(7904, 1), new MokaRange(7906, 1), new MokaRange(7908, 1), new MokaRange(7910, 1),
				new MokaRange(7912, 1), new MokaRange(7914, 1), new MokaRange(7916, 1), new MokaRange(7918, 1), new MokaRange(7920, 1),
				new MokaRange(7922, 1), new MokaRange(7924, 1), new MokaRange(7926, 1), new MokaRange(7928, 1), new MokaRange(7944, 8),
				new MokaRange(7960, 6), new MokaRange(7976, 8), new MokaRange(7992, 8), new MokaRange(8008, 6), new MokaRange(8025, 1),
				new MokaRange(8027, 1), new MokaRange(8029, 1), new MokaRange(8031, 1), new MokaRange(8040, 8), new MokaRange(8120, 4),
				new MokaRange(8136, 4), new MokaRange(8152, 4), new MokaRange(8168, 5), new MokaRange(8184, 4), new MokaRange(8450, 1),
				new MokaRange(8455, 1), new MokaRange(8459, 3), new MokaRange(8464, 3), new MokaRange(8469, 1), new MokaRange(8473, 5),
				new MokaRange(8484, 1), new MokaRange(8486, 1), new MokaRange(8488, 1), new MokaRange(8490, 4), new MokaRange(8496, 4),
				new MokaRange(8510, 2), new MokaRange(8517, 1), new MokaRange(8579, 1), new MokaRange(11264, 47), new MokaRange(11360, 1),
				new MokaRange(11362, 3), new MokaRange(11367, 1), new MokaRange(11369, 1), new MokaRange(11371, 1), new MokaRange(11381, 1),
				new MokaRange(11392, 1), new MokaRange(11394, 1), new MokaRange(11396, 1), new MokaRange(11398, 1), new MokaRange(11400, 1),
				new MokaRange(11402, 1), new MokaRange(11404, 1), new MokaRange(11406, 1), new MokaRange(11408, 1), new MokaRange(11410, 1),
				new MokaRange(11412, 1), new MokaRange(11414, 1), new MokaRange(11416, 1), new MokaRange(11418, 1), new MokaRange(11420, 1),
				new MokaRange(11422, 1), new MokaRange(11424, 1), new MokaRange(11426, 1), new MokaRange(11428, 1), new MokaRange(11430, 1),
				new MokaRange(11432, 1), new MokaRange(11434, 1), new MokaRange(11436, 1), new MokaRange(11438, 1), new MokaRange(11440, 1),
				new MokaRange(11442, 1), new MokaRange(11444, 1), new MokaRange(11446, 1), new MokaRange(11448, 1), new MokaRange(11450, 1),
				new MokaRange(11452, 1), new MokaRange(11454, 1), new MokaRange(11456, 1), new MokaRange(11458, 1), new MokaRange(11460, 1),
				new MokaRange(11462, 1), new MokaRange(11464, 1), new MokaRange(11466, 1), new MokaRange(11468, 1), new MokaRange(11470, 1),
				new MokaRange(11472, 1), new MokaRange(11474, 1), new MokaRange(11476, 1), new MokaRange(11478, 1), new MokaRange(11480, 1),
				new MokaRange(11482, 1), new MokaRange(11484, 1), new MokaRange(11486, 1), new MokaRange(11488, 1), new MokaRange(11490, 1),
				new MokaRange(65313, 26), new MokaRange(66560, 40), new MokaRange(119808, 26), new MokaRange(119860, 26), new MokaRange(119912, 26),
				new MokaRange(119964, 1), new MokaRange(119966, 2), new MokaRange(119970, 1), new MokaRange(119973, 2), new MokaRange(119977, 4),
				new MokaRange(119982, 8), new MokaRange(120016, 26), new MokaRange(120068, 2), new MokaRange(120071, 4), new MokaRange(120077, 8),
				new MokaRange(120086, 7), new MokaRange(120120, 2), new MokaRange(120123, 4), new MokaRange(120128, 5), new MokaRange(120134, 1),
				new MokaRange(120138, 7), new MokaRange(120172, 26), new MokaRange(120224, 26), new MokaRange(120276, 26), new MokaRange(120328, 26),
				new MokaRange(120380, 26), new MokaRange(120432, 26), new MokaRange(120488, 25), new MokaRange(120546, 25), new MokaRange(120604, 25),
				new MokaRange(120662, 25), new MokaRange(120720, 25), new MokaRange(120778, 1)
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("uppercaseLetterCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("uppercaseLetterCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.whitespaceAndNewLineCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("whitespaceAndNewLineCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges(
				new MokaRange(32, 1), new MokaRange(160, 1), new MokaRange(5760, 1), new MokaRange(6158, 1), new MokaRange(8192, 11),
				new MokaRange(8239, 1), new MokaRange(8287, 1), new MokaRange(12288, 1),
				new MokaRange(8232, 1), new MokaRange(8233, 1)				
				);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("whitespaceAndNewLineCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("whitespaceAndNewLineCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.whitespaceCharacterSet = function(){
	if( !MokaCharacterSet.charsetRanges().containsKeyEqualTo($s("whitespaceCharacterSet")) ){
		(function(){
			var s = this.makeAndInit();
			s.addCharactersInRanges( new MokaRange(8232, 1), new MokaRange(8233, 1)	);
			MokaCharacterSet.charsetRanges().setObjectForKey(s,$s("whitespaceCharacterSet"));
		})();
	}
	
	return MokaCharacterSet.charsetRanges().objectForKeyEqualTo($s("whitespaceCharacterSet")).copy();
}
/*MokaCharacterSet*/ MokaCharacterSet.characterSetWithCharactersInString = function(aString){
	if( aString == undefined ){ return; }
	if( typeof(aString.isKindOfClass) != "function" ){ return; }
	if( !aString.isKindOfClass(MokaString) ){ return; }
	
	var s = this.makeAndInit();
	s.addCharactersInString(aString);
	return s;	
}
/*MokaCharacterSet*/ MokaCharacterSet.characterSetWithRange = function(aRange){
	if( aRange == undefined ){ return; }
	if( typeof(aRange.isKindOfClass) != "function" ){ return; }
	if( !aRange.isKindOfClass(MokaRange) ){ return; }
	
	var s = this.makeAndInit();
	s.addCharactersInSet(aRange);
	return s;
}

MokaCharacterSet.charsetRanges = function(){
	if( !is(this._charsetRanges,MokaDictionary) ){
		this._charsetRanges = $dict();
	}
	return this._charsetRanges;
}

//Character planes
MokaBasicMultilingualPlane				= 0;
	MokaCharPlaneBMP					= 0;
MokaSupplementaryMultilingualPlane		= 1;
	MokaCharPlaneSMP					= 1;
MokaSupplementaryIdeographicPlane		= 2;
	MokaCharPlaneSIP					= 2;
MokaSupplementarySpecialPurposePlane	= 14;
	MokaCharPlaneSSP					= 14;
MokaPrivateUsePlane1					= 15;
	MokaCharPlanePUA1					= 15;
MokaPrivateUsePlane2					= 16;
	MokaCharPlanePUA2					= 16;