(function() {

	Smart.ui.createStartWinkelenWindow = function() {
		var winkelenWindow = Titanium.UI.createWindow(style.Window);
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Scan producten'
		}));
		winkelenWindow.setTitleControl(lblTitle);
		startSession();

		btn_scan = Ti.UI.createButton(style.makenButton);
		btn_scan.addEventListener('click', function() {
			scan();
		});
		winkelenWindow.add(btn_scan);

		var btn_klaar = Ti.UI.createButton(style.klaarButton);
		winkelenWindow.add(btn_klaar);
		btn_klaar.addEventListener('click', function() {
			endSession();
		});
		var lbl_totaal = Ti.UI.createLabel(Smart.combine(style.textTotaal, {
			text : '0 Artikelen'
		}));
		winkelenWindow.add(lbl_totaal);
		var num_totaal = Ti.UI.createLabel(Smart.combine(style.textTotaal, {
			text : '€ 0,00',
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

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/// Barcode scannen																							//
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function scan() {
			Ti.include("/config/barcode.js");
			Ti.API.debug(JSON.stringify(config));
			TiBar.scan({
				configure : config,
				success : function(data) {
					Ti.App.productBarcode = data.barcode;
					var createReq = Titanium.Network.createHTTPClient();
					if(Ti.App.localonline === "local") {
						createReq.open("POST", "http://localhost/SmartScan/post_sessieproducten.php");
					} else {
						createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_sessieproducten.php");
					}

					var params = {
						barcode : Ti.App.productBarcode,
						session_id : Ti.App.sessionId
					};

					createReq.onload = function() {
						try {
							var json = this.responseText;
							var response = JSON.parse(json);
							Ti.API.info("Add link: " + this.responseText);

							if(response.add === true) {
								getProducts();
							} else {
								alert('Product kan niet toegevoegd worden.');
							}

						} catch(e) {
							alert(e);
						}
					};
					createReq.onerror = function(e) {
						Ti.API.info("TEXT onerror:   " + this.responseText);
						alert('Er is iets mis met de databank.');
					}

					createReq.send(params);
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
			});
		}

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/// Gescande producten in tableview																			//
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function getProducts() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				getReq.open("GET", "http://localhost/SmartScan/get_sessieproducten.php");
			} else {
				createReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_sessieproducten.php");
			}

			var params = {
				session_id : Ti.App.sessionId
			};
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var products = JSON.parse(this.responseText);

					//Er staan nog geen producten op lijst
					if(products.getList === false) {

					} else {

						for(var i = 0; i < products.length; i++) {
							var productId = products[i].id;
							var productNaam = products[i].naam;
							var productTitle = products[i].title;
							var productPrijs = products[i].prijsStuk;
							lbl_totaal.text = products[i].aantal + ' Artikelen';
							num_totaal.text = '€ ' +products[i].totaalPrijs;

							var row = Ti.UI.createTableViewRow(style.row);

							var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : productNaam,
								top : -13
							}));
							var title = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : productTitle,
								top : 18,
								font : {
									fontSize : 10
								},
								opacity : 0.5
							}));
							var prijs = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : '€ ' + productPrijs,
								textAlign : 'right',
								right : 60,
								top : -17

							}));

							row.add(name);
							row.add(prijs);
							row.add(title);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLists = Titanium.UI.createTableView(Smart.combine(style.tableView, {
							data : data,
							top : 55,
							bottom : 80
						}));
						winkelenWindow.add(listLists);

					}

				} catch(e) {
					alert(e);
				}
			};
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send(params);
		}

		return winkelenWindow;
	};
})();
