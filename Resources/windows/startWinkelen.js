(function() {

	Smart.ui.createStartWinkelenWindow = function() {
		var winkelenWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false
		});
		var lblTitle = Titanium.UI.createLabel({
			text : 'Scan uw producten',
			color : '#fff',
			font : FontTitle
		});
		winkelenWindow.setTitleControl(lblTitle);

		
		return winkelenWindow;
	};
})();
