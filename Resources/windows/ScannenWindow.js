(function() {

	Smart.ui.createScannenWindow = function() {
		//
		// Main window
		//
		var scannenWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false
		});
		var lblTitle = Titanium.UI.createLabel({
			text:'Scannen',
			color:'#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize:24
			}
		});
		scannenWindow.setTitleControl(lblTitle);
		
		//
		//Inhoud
		//
		var label1 = Titanium.UI.createLabel({
			text:'Scannen',
			left:10,
			font : {
				fontFamily : 'Bree Serif'
			}
		});
		scannenWindow.add(label1);
		

		return scannenWindow;
	};
})();
