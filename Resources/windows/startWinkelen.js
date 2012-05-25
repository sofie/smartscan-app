(function() {

	Smart.ui.createStartWinkelenWindow = function() {
		var winkelenWindow = Titanium.UI.createWindow(style.Window);
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Scan producten'
		}));
		winkelenWindow.setTitleControl(lblTitle);

		winkelenWindow.addEventListener('open', function(e) {
			startSession();
			/*Ti.include("/config/barcode.js");
			 Ti.API.debug(JSON.stringify(config));
			 TiBar.scan({
			 configure : config,
			 success : function(data) {
			 Ti.App.productBarcode = data.barcode;
			 addProductBarcode();
			 Ti.API.info('TiBar success callback!');
			 if(data && data.barcode) {
			 Ti.API.info("Barcode: " + data.barcode + ", symbol: " + data.symbology);

			 }
			 },
			 cancel : function() {
			 Ti.API.info('TiBar cancel callback!');
			 },
			 error : function() {
			 Ti.API.info('TiBar error callback!');
			 }
			 });*/

		});
		var btn_klaar = Ti.UI.createButton(style.klaarButton);
		winkelenWindow.add(btn_klaar);
		btn_klaar.addEventListener('click', function() {
			endSession();
		});
		var lbl_totaal = Ti.UI.createLabel(Smart.combine(style.textTotaal, {
			text : 'Totaal'
		}));
		winkelenWindow.add(lbl_totaal);
		var num_totaal = Ti.UI.createLabel(Smart.combine(style.textTotaal, {
			text : '€49,3',
			bottom : 20,
			font : {
				fontSize : 20,
				fontFamily : 'Bree serif'
			}

		}));
		winkelenWindow.add(num_totaal);

		//////////////////////////////////////////////////////////////////////////////////
		/// Start sessie																//
		//////////////////////////////////////////////////////////////////////////////////

		function startSession() {
			var currentTime = new Date();
			var hours = currentTime.getHours();
			var minutes = currentTime.getMinutes();
			var secondes = currentTime.getSeconds();
			var month = currentTime.getMonth() + 1;
			var day = currentTime.getDate();
			var year = currentTime.getFullYear();
			var createReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				createReq.open("POST", "http://localhost/SmartScan/post_startsession.php");
			} else {
				createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_startsession.php");
			}

			var params = {
				user_id : Titanium.App.userId,
				startuur : year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + secondes
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					Ti.API.info('JSON: ' + json);
					var response = JSON.parse(json);

					if(response.add === true) {
						Ti.API.info('Sessie aangemaakt, id: ' + response.sessionId);
						Ti.App.sessionId = response.sessionId;

					} else {
						alert('Sessie niet aangemaakt');
					}
				} catch(e) {
					alert(e);
				}
			};
			//Databank niet ok (path, MAMP,...)
			createReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			};
			createReq.send(params);
		};

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/// Eind sessie																								//
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////

		function endSession() {
			var currentTime = new Date();
			var hours = currentTime.getHours();
			var minutes = currentTime.getMinutes();
			var secondes = currentTime.getSeconds();
			var month = currentTime.getMonth() + 1;
			var day = currentTime.getDate();
			var year = currentTime.getFullYear();
			var createReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				createReq.open("POST", "http://localhost/SmartScan/post_endsession.php");
			} else {
				createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_endsession.php");
			}

			var params = {
				id : Ti.App.sessionId,
				einduur : year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + secondes
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					Ti.API.info('JSON: ' + json);
					var response = JSON.parse(json);

					if(response.add === true) {
						Ti.API.info('Sessie ' + Ti.App.sessionId + ' beëindigd');

					} else {
						alert('Sessie niet beëindigd');
					}
				} catch(e) {
					alert(e);
				}
			};
			//Databank niet ok (path, MAMP,...)
			createReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			};
			createReq.send(params);
		};
		return winkelenWindow;
	};
})();
