(function() {

	Smart.ui.createScannenWindow = function() {
		var scannenWindow = Titanium.UI.createWindow({
			title : 'Scannen',
			barImage : 'img/header.png',
			backgroundImage: 'img/bg.png',
			fullscreen : false
		});
		
		var label1 = Titanium.UI.createLabel({
			text:'Scannen',
			left:10
		});
		scannenWindow.add(label1);
		

		return scannenWindow;
	};
})();
