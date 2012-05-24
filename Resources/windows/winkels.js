(function() {

	Smart.ui.createWinkelsWindow = function() {
		var winkelsWindow = Titanium.UI.createWindow(style.Window);
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Winkels'
		}));
		winkelsWindow.setTitleControl(lblTitle);
		winkelsWindow.addEventListener('open', function(e) {
			getWinkels();
		});
		/*	
		var btnCurrentLocation = Titanium.UI.createButton(style.gpsButton);
		
		btnCurrentLocation.addEventListener('click', function() {
			Titanium.API.info('User location: ---')
		});

		winkelsWindow.rightNavButton = btnCurrentLocation;
		*/

		var searchField = Titanium.UI.createTextField(Smart.combine(style.inputFieldKort,{
			top : 15,
			hintText : 'Stad, postcode,...'
		}));

		var btnSearch = Titanium.UI.createButton(style.searchButton);
		btnSearch.addEventListener('click', function(e) {
			Ti.API.info('Zoek winkel: ' + searchField.value)
		});
		winkelsWindow.add(searchField);
		winkelsWindow.add(btnSearch);

		var point = Titanium.Map.createAnnotation({
			latitude : 51.029120,
			longitude : 4.478785,
			title : "U bevindt zich hier",
			animate : true,
			image : '/img/pin.png'
		});
		var mapview = Titanium.Map.createView({
			left : 20,
			right : 20,
			top : 80,
			bottom : 70,
			mapType : Titanium.Map.STANDARD_TYPE,
			region : {
				latitude : 51.029120,
				longitude : 4.478785,
				latitudeDelta : 0.003,
				longitudeDelta : 0.003
			},
			animate : true,
			regionFit : true,
			userLocation : true,
			annotations : [point]
		});
		winkelsWindow.add(mapview);

		mapview.addEventListener('click',function(){
			Ti.Platform.openURL('http://maps.google.com/maps?daddr=50.873666,4.699736');
		});


		var btnBar = Titanium.UI.createButtonBar({
			labels : ['Alle', 'Nu open'],
			backgroundColor : '#73BD47',
			bottom : 20,
			style : Titanium.UI.iPhone.SystemButtonStyle.BAR,
			height : 35,
			width : 280,

		});
		winkelsWindow.add(btnBar);

		function getWinkels() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				getReq.open("GET", "http://localhost/SmartScan/get_winkels.php");
			} else {
				getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_winkels.php");
			}

			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var stores = JSON.parse(this.responseText);

					//Er zijn geen winkels in de databank
					if(stores.getStores === false) {
						Titanium.API.info('Geen winkels');

						var lblNoLinks = Titanium.UI.createLabel(Smart.combine(style.textError, {
							top : 70,
							text : 'Er zijn geen winkels gevonden.'
						}));
						winkelsWindow.add(lblNoLinks);

					} else {
						Titanium.API.info('Winkels');

						for(var i = 0; i < stores.length; i++) {
							var naam = stores[i].naam;
							var longitude = stores[i].longitude;
							var latitude = stores[i].latitude;

							var point = Titanium.Map.createAnnotation({
								latitude : latitude,
								longitude : longitude,
								animate : true,
								image : '/img/pin_blue.png'
							});
							
							mapview.addAnnotation(point);
						};

					}
					
					

				} catch(e) {
					alert(e);
				}
			};
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send();
		};

		return winkelsWindow;
	};
})();
