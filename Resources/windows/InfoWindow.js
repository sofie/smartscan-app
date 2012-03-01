(function() {

	Smart.ui.createInfoWindow = function() {
		var infoWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			backgroundImage : 'img/bg_info.png',
			//fullscreen : false
		});
		var lblTitle = Titanium.UI.createLabel({
			text:'Informatie',
			color:'#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize:24
			}
		});
		infoWindow.setTitleControl(lblTitle);

		return infoWindow;
	};
})();
