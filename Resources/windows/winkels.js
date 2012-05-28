//////////////////////////////////////////////////////////////////////////////////
/// Kaart met locatie gebruiker + winkels in de buurt + zoeken op postcode		//
//////////////////////////////////////////////////////////////////////////////////

(function() {

	Smart.ui.createWinkelsWindow = function() {
		var winkelsWindow = Titanium.UI.createWindow(style.Window);
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Winkels'
		}));
		winkelsWindow.setTitleControl(lblTitle);
		winkelsWindow.addEventListener('open', function(e) {

		});

		var searchField = Titanium.UI.createTextField(Smart.combine(style.inputFieldKort, {
			top : 15,
			hintText : 'Stad, postcode,...'
		}));

		var btnSearch = Titanium.UI.createButton(style.searchButton);
		btnSearch.addEventListener('click', function(e) {
			Ti.API.info('Zoek winkel: ' + searchField.value)
		});
		winkelsWindow.add(searchField);
		winkelsWindow.add(btnSearch);

		var reverseGeo = Titanium.UI.createLabel(Smart.combine(style.textProductDescription,{
			top:45,
			left:20,
			width:Ti.Platform.displayCaps.width-60,
			heigth:30
		}));
		winkelsWindow.add(reverseGeo);

		//////////////////////////////////////////////////////////////////////////////////
		/// Mapview winkels	+ huidige locatie											//
		//////////////////////////////////////////////////////////////////////////////////

		Ti.Geolocation.preferredProvider = "gps";
		Ti.Geolocation.purpose = "GPS find stores";

		var headingAdded = false;
		var locationAdded = false;

		if(Titanium.Geolocation.locationServicesEnabled === false) {
			Titanium.UI.createAlertDialog({
				title : 'SmartScan',
				message : 'U hebt geolocatie uitstaan. Zet geolocatie aan.'
			}).show();
		} else {
			if(Titanium.Platform.name != 'android') {
				var authorization = Titanium.Geolocation.locationServicesAuthorization;
				if(authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
					Ti.UI.createAlertDialog({
						title : 'SmartScan',
						message : 'Je hebt niet toegestaan dat SmartScan geolocatie diensten uitvoerd.'
					}).show();
				} else if(authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
					Ti.UI.createAlertDialog({
						title : 'SmartScan',
						message : 'Je systeem laat SmartScan niet toe geolocatie diensten uit te voeren.'
					}).show();
				}
			}
			var mapview;

			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
			Titanium.Geolocation.distanceFilter = 5;

			//
			// GET CURRENT POSITION
			//
			Titanium.Geolocation.getCurrentPosition(function(e) {
				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;

			});

			//
			// EVENT LISTENER FOR GEO EVENTS
			//
			var locationCallback = function(e) {
				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;

				var point = Titanium.Map.createAnnotation({
					latitude : latitude,
					longitude : longitude,
					title : "U bevindt zich hier",
					animate : true,
					image : '/img/pin.png'
				});
				var mapview = Titanium.Map.createView({
					left : 20,
					right : 20,
					top : 100,
					bottom : 70,
					mapType : Titanium.Map.STANDARD_TYPE,
					region : {
						latitude : latitude,
						longitude : longitude,
						latitudeDelta : 0.003,
						longitudeDelta : 0.003
					},
					animate : true,
					regionFit : true,
					userLocation : true,
					annotations : [point]
				});
				winkelsWindow.add(mapview);
				mapview.addEventListener('click', function(e) {
					var annotation = e.source;
					var clicksource = e.clicksource;
					var x = e.annotation.myid;
					Ti.API.info('Clicksource: ' + clicksource + ', annotation: ' + annotation + ', x: ' + x);
					//Ti.Platform.openURL('http://maps.google.com/maps?daddr=' + point.latitude + ',' + point.longitude);
				});

				//////////////////////////////////////////////////////////////////////////////////
				/// Winkels 																	//
				//////////////////////////////////////////////////////////////////////////////////
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
							for(var i = 0; i < stores.length; i++) {
								var naam = stores[i].naam;
								var longitudeDb = stores[i].longitude;
								var latitudeDb = stores[i].latitude;

								var point = Titanium.Map.createAnnotation({
									latitude : latitudeDb,
									longitude : longitudeDb,
									animate : true,
									title : naam,
									image : '/img/pin_blue.png'
								});
								Ti.App.annotation = point.latitude;

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

				// reverse geo
				Titanium.Geolocation.reverseGeocoder(latitude, longitude, function(evt) {
					if(evt.success) {
						var places = evt.places;
						if(places && places.length) {
							reverseGeo.text = places[0].address;
						} else {
							reverseGeo.text = "Geen adres gevonden.";
						}
						Ti.API.debug("reverse geolocation result = " + JSON.stringify(evt));
					} else {
						Ti.UI.createAlertDialog({
							title : 'Reverse geo error',
							message : evt.error
						}).show();
					}
				});

				Titanium.API.info('geo - location updated: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
			};
			Titanium.Geolocation.addEventListener('location', locationCallback);
			locationAdded = true;
		}

		return winkelsWindow;
	};
})();
