(function() {

	Smart.ui.createWinkelenWindow = function() {
		//
		// Main window
		//
		var winkelenWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false
		});
		var lblTitle = Titanium.UI.createLabel({
			text : 'Winkelen',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		winkelenWindow.setTitleControl(lblTitle);

		//
		//Inhoud
		//
		var dialog = Titanium.UI.createOptionDialog({
			title : 'Hoe wenst u te starten met winkelen?',
			options : ['Starten van lijstje', 'Gewoon starten','Annuleren'],
			cancel : 2
		});
		dialog.show();
		
		return winkelenWindow;
	};
})();
