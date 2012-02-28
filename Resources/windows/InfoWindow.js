(function() {

	Smart.ui.createInfoWindow = function() {
		var infoWindow = Titanium.UI.createWindow({
			title : 'Info',
			barImage : 'img/header.png',
			backgroundImage : 'img/bg_info.png',
			fullscreen : false
		});

		return infoWindow;
	};
})();
