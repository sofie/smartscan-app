(function() {

	Smart.ui.createWinkelsWindow = function() {
		var winkelsWindow = Titanium.UI.createWindow({
			title : 'Winkels',
			barImage : 'img/header.png'
		});

		var btnCurrentLocation = Titanium.UI.createButton({
			backgroundImage : 'img/btn_gps.png',
			width : 37,
			height : 35
		});
		btnCurrentLocation.addEventListener('click', function() {
			Titanium.API.info('User location: ---')
		});

		winkelsWindow.rightNavButton = btnCurrentLocation;

		var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 43 - 45;

		var searchField = Titanium.UI.createTextField({
			color : '#888',
			top : 20,
			left : 20,
			width : widthTxtField,
			height : 40,
			hintText : 'Stad, postcode,...',
			font : {
				fontSize : 15
			},
			opacity : 0.65,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		});

		var btnSearch = Titanium.UI.createButton({
			backgroundImage : 'img/btn_search.png',
			width : 43,
			height : 42,
			right : 20,
			top : 20
		});
		btnSearch.addEventListener('click', function(e) {
			Ti.API.info('Zoek winkel: ' + searchField.value)
		});
		var mapview = Titanium.Map.createView({
			left : 30,
			right : 30,
			top : 80,
			bottom : 30,
			mapType : Titanium.Map.STANDARD_TYPE,
			region : {
				latitude : 50.883333,
				longitude : 4.7,
				latitudeDelta : 0.005,
				longitudeDelta : 0.005
			},
			animate : true,
			regionFit : true,
			userLocation : true
		});
		winkelsWindow.add(mapview);

		winkelsWindow.add(searchField);
		winkelsWindow.add(btnSearch);

		return winkelsWindow;
	};
})();
