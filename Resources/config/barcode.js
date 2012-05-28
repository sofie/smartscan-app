var TiBar = require('tibar');
Ti.API.info("module is => " + TiBar);

var allConfigWithDefaults = {
	classType : [{
		"ZBarReaderController" : true
	}],
	sourceType : [{
		"Library" : false
	}, {
		"Camera" : true
	}, {
		"Album" : false
	}],
	cameraMode : [{
		"Default" : true
	}],
	config : {
		"showsCameraControls" : true,
		"showsZBarControls" : true,
		"tracksSymbols" : true,
		"enableCache" : true,
		"showsHelpOnFail" : true,
		"takesPicture" : false
	},
	symbol : {
		"QR-Code" : false,
		"CODE-128" : false,
		"CODE-39" : false,
		"I25" : false,
		"DataBar" : false,
		"DataBar-Exp" : false,
		"EAN-13" : true,
		"EAN-8" : true,
		"UPC-A" : false,
		"UPC-E" : false,
		"ISBN-13" : false,
		"ISBN-10" : false
	}
};
var config = {};
for(var section in allConfigWithDefaults) {
	if( typeof allConfigWithDefaults[section] === 'object' && allConfigWithDefaults[section] instanceof Array) {
		for(var itemix in allConfigWithDefaults[section]) {
			for(var labelname in allConfigWithDefaults[section][itemix]) {

				if(allConfigWithDefaults[section][itemix][labelname]) {
					config[section] = labelname;
				}
			}
		}
	} else {
		config[section] = allConfigWithDefaults[section];
	}
}
