(function() {

	Smart.ui.createScannenWindow = function() {
		var scannenWindow = Titanium.UI.createWindow({
			title : 'Scannen',
			barImage : 'img/header.png',
			fullscreen : false
		});
		
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
