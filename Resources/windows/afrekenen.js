//////////////////////////////////////////////////////////////////////////////////////////////////
/// Afrekenen window: overzicht producten, prijs, aantal + QR code om af te rekenen aan kassa	//
//////////////////////////////////////////////////////////////////////////////////////////////////

(
	function() {

		Smart.ui.createAfrekenenWindow = function() {
			var mainWin = Titanium.UI.createWindow(style.afrekenenWindow);
			var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
				text : 'Afrekenen'
			}));
			mainWin.setTitleControl(lblTitle);

			var backButton = Titanium.UI.createButton(style.backButton);
			backButton.addEventListener('click', function() {
				Smart.navGroup.close(mainWin, {
					animated : false
				});
			});
			mainWin.leftNavButton = backButton;

			var navActInd = Titanium.UI.createActivityIndicator({
				style : Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN
			});
			mainWin.setRightNavButton(navActInd);

			mainWin.addEventListener('open', function() {
				navActInd.show();
				getProducts();
			});

			//////////////////////////////////////////////////////////////////////////////////////
			/// QR code genereren met info van winkelsessie										//
			//////////////////////////////////////////////////////////////////////////////////////
			function getQR() {
				var size = '150x150';
				var message = 'user:'+ Titanium.App.userId +'-totaal:' + Ti.App.totaal + '-aantal_producten:' + Ti.App.num_products;
				var url = 'http://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=' + encodeURI(message) + '&chld=H|0';
				var width = size.split('x')[0], height = size.split('x')[1];

				var webView = Ti.UI.createWebView({
					url : url,
					top : 20,
					left : 20
				});

				webView.addEventListener('load', function(e) {
					Ti.API.info('webview loaded: ' + e.url);
					navActInd.hide();
				});

				mainWin.add(webView);

				var sessieKlaarButton = Ti.UI.createButton(Smart.combine(style.klaarButton, {
					top : 120,
					left : 180
				}));
				mainWin.add(sessieKlaarButton);
				sessieKlaarButton.addEventListener('click', function() {
					endSession();
				});
			}

			//////////////////////////////////////////////////////////////////////////////////////
			/// Get sessie informatie: prijs, aantal stuks,...									//
			//////////////////////////////////////////////////////////////////////////////////////
			function getProducts() {

				var data = [];

				var getReq = Titanium.Network.createHTTPClient();
				if(Ti.App.localonline === "local") {
					getReq.open("GET", "http://localhost/SmartScan/get_afrekenen.php");
				} else {
					getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_afrekenen.php");
				}

				var params = {
					session_id : Ti.App.sessionId
				};
				getReq.timeout = 5000;

				getReq.onload = function() {
					try {
						var products = JSON.parse(this.responseText);
						Ti.API.info(this.responseText);
						if(products.noProduct === true) {
							Ti.API.info('Geen producten');
						}

						//Er staan nog geen producten op lijst
						if(products.getAfrekenen === false) {
							Smart.navGroup.close(mainWin, {
								animated : false
							});
						} else {
							getQR();

							for(var i = 0; i < products.length; i++) {
								var productId = products[i].id;
								var productAantal = products[i].aantal;
								var productNaam = products[i].naam;
								var productTitle = products[i].title;
								var productPrijs = products[i].prijsStuk;
								var productTotaalPrijs = products[i].totaalPrijs;
								var productTotaalAantal = products[i].sum_aantal;
								var productBarcode = products[i].barcode;
								var sessionId = products[i].session_id;
								var datum = products[i].startuur;

								var row = Ti.UI.createTableViewRow(style.rowAfrekenen);
								var aantal = Ti.UI.createLabel(Smart.combine(style.textNormal, {
									text : productAantal,
									top : -15
								}));
								var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
									text : productNaam,
									left : 40,
									top : -15
								}));
								var barcode = Ti.UI.createLabel(Smart.combine(style.textNormal, {
									text : productBarcode,
									left : 40,
									top : 15,
									font : {
										fontSize : 10
									},
									opacity : 0.5
								}));
								var prijs = Ti.UI.createLabel(Smart.combine(style.textNormal, {
									text : '€ ' + productPrijs,
									textAlign : 'right',
									right : 30,
									top:-15

								}));
								row.add(aantal);
								row.add(name);
								row.add(barcode);
								row.add(prijs);

								row.className = 'item' + i;
								data[i] = row;

							};
							var totaal = Ti.UI.createLabel(Smart.combine(style.textAfrekenen, {
								text : productTotaalAantal + ' artikelen',
								left : 30
							}));
							mainWin.add(totaal);
							var prijs = Ti.UI.createLabel(Smart.combine(style.textAfrekenen, {
								text : '€' + productTotaalPrijs,
								right : 20,
								textAlign : 'right'
							}));
							mainWin.add(prijs);

							var jaar = datum.substr(0, 4);
							var maand = datum.substr(5, 2);
							var dag = datum.substr(8, 2);
							var prettyDate = dag + '-' + maand + '-' + jaar;
							var date = Ti.UI.createLabel(Smart.combine(style.textAfrekenen, {
								text : prettyDate,
								top : 180,
								left : 30,
								font : {
									fontSize : 12,
									fontFamily : 'Bree serif'
								},
								opacity : 0.5
							}));
							mainWin.add(date);

							var aant = Ti.UI.createLabel(Smart.combine(style.textAfrekenen, {
								text : '#',
								top : 220,
								left : 30,
								font : {
									fontSize : 15,
									fontFamily : 'Bree serif'
								}
							}));
							mainWin.add(aant);

							var omschr = Ti.UI.createLabel(Smart.combine(style.textAfrekenen, {
								text : 'OMSCHRIJVING',
								top : 220,
								left : 50,
								font : {
									fontSize : 12,
									fontFamily : 'Bree serif'
								}
							}));
							mainWin.add(omschr);

							var bedrag = Ti.UI.createLabel(Smart.combine(style.textAfrekenen, {
								text : 'BEDRAG',
								top : 220,
								right : 20,
								textAlign : 'right',
								font : {
									fontSize : 12,
									fontFamily : 'Bree serif'
								}
							}));
							mainWin.add(bedrag);

							var listProducts = Titanium.UI.createTableView(Smart.combine(style.tableView, {
								data : data,
								top : 240,
								bottom : 0,
								backgroundImage : '/img/bg_afrekenen.png',
							}));
							mainWin.add(listProducts);

							listProducts.addEventListener('delete', function(e) {
								Titanium.App.selectedProduct = products[e.index].id;
								Titanium.App.selectedSession = products[e.index].session_id;

								var deleteReq = Titanium.Network.createHTTPClient();
								if(Ti.App.localonline === "local") {
									deleteReq.open("GET", "http://localhost/SmartScan/post_removeproductSession.php");
								} else {
									deleteReq.open("GET", "http://sofiehendrickx.eu/SmartScan/post_removeproductSession.php");
								}

								deleteReq.timeout = 5000;
								deleteReq.onload = function() {
									try {
										var json = this.responseText;
										var response = JSON.parse(json);
										if(response.remove === true) {
											Titanium.API.info('Remove product: ' + this.responseText);

										} else {
											alert('Product kan niet verwijderd worden.');
										}
									} catch(e) {
										alert(e);
									}
								};

								var params = {
									product_id : Titanium.App.selectedProduct,
									session_id : Titanium.App.selectedSession
								};
								deleteReq.send(params);
							});

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

			//////////////////////////////////////////////////////////////////////////////////////////////////////////////
			/// Sessie beëindigen																					//
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////
			function endSession() {

				var createReq = Titanium.Network.createHTTPClient();
				if(Ti.App.localonline === "local") {
					createReq.open("POST", "http://localhost/SmartScan/post_endsession.php");
				} else {
					createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_endsession.php");
				}

				var currentTime = new Date();
				var hours = currentTime.getHours();
				var minutes = currentTime.getMinutes();
				var secondes = currentTime.getSeconds();
				var month = currentTime.getMonth() + 1;
				var day = currentTime.getDate();
				var year = currentTime.getFullYear();

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
							mainWin.close({
								animated : false
							});
							mainWin = Smart.ui.createApplicationMainWin();

						} else {
							alert('Error.');
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

			return mainWin;

		};
	})();
