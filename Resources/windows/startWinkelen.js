//////////////////////////////////////////////////////////////////////////////////////////////////////
/// Gebruiker start nieuwe sessie: scant producten + overzicht gescande producten, prijs, aantal	//
//////////////////////////////////////////////////////////////////////////////////////////////////////

(
	function() {

		Smart.ui.createStartWinkelenWindow = function() {
			var winkelenWindow = Titanium.UI.createWindow(style.Window);
			var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
				text : 'Scan producten'
			}));
			winkelenWindow.setTitleControl(lblTitle);
			startSession();

			winkelenWindow.addEventListener('close', function() {
				removeSession();
			});

			var backButton = Titanium.UI.createButton(style.backButton);
			winkelenWindow.leftNavButton = backButton;

			var scanButton = Titanium.UI.createButton(style.scanButton);
			scanButton.addEventListener('click', function() {
				scan();
			});
			winkelenWindow.setRightNavButton(scanButton);

			//Custom event: reload tableview na deleten product vanop detailProduct window
			Titanium.App.addEventListener('app:reloadSession', function(e) {
				getProducts();
			});

			var viewAfrekenen = Ti.UI.createView({
				backgroundColor : '#fff',
				width : 320,
				height : 100,
				bottom : 0,
				opacity : 0.5
			});
			winkelenWindow.add(viewAfrekenen);

			var btn_klaar = Ti.UI.createButton(style.afrekenenButton);
			winkelenWindow.add(btn_klaar);
			btn_klaar.addEventListener('click', function() {

				updateSession();

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
			var noProductView = Titanium.UI.createView({
				backgroundImage : "/img/no_productsSession.png",
				width : 239,
				height : 329,
				right : 10,
				top : 5
			});
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

							winkelenWindow.add(noProductView);
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
			/// Update aantal en totaal																					//
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////
			function updateSession() {

				var createReq = Titanium.Network.createHTTPClient();
				if(Ti.App.localonline === "local") {
					createReq.open("POST", "http://localhost/SmartScan/post_afrekenen.php");
				} else {
					createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_afrekenen.php");
				}

				var params = {
					id : Ti.App.sessionId,
					totaal : Ti.App.totaal,
					num_products : Ti.App.num_products
				};

				createReq.onload = function() {
					try {
						var json = this.responseText;
						Ti.API.info('JSON: ' + json);
						var response = JSON.parse(json);
						if(response.add === true) {
							Ti.API.info('Sessie ' + Ti.App.sessionId + ' beëindigd');
							Smart.navGroup.open(Smart.ui.createAfrekenenWindow(), {
								animated : false
							});

						} else {
							alert('U hebt nog geen producten gescand.');
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
			/// Delete session																					//
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////
			function removeSession() {
				Ti.API.info('remove');

				var createReq = Titanium.Network.createHTTPClient();
				if(Ti.App.localonline === "local") {
					createReq.open("POST", "http://localhost/SmartScan/post_removesession.php");
				} else {
					createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_removesession.php");
				}

				var params = {
					id : Ti.App.sessionId
				};

				createReq.onload = function() {
					try {
						var json = this.responseText;
						Ti.API.info('JSON: ' + json);
						var response = JSON.parse(json);
						if(response.remove === true) {
							Ti.API.info('Sessie ' + Ti.App.sessionId + ' verwijderd');

						} else {
							alert('Sessie niet verwijderd.');
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
						noProductView.hide();
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
									noProductView.show();
									alert('Product niet gevonden.');
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
					getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_sessieproducten.php");
				}

				var params = {
					session_id : Ti.App.sessionId
				};
				getReq.timeout = 5000;

				getReq.onload = function() {
					try {
						var products = JSON.parse(this.responseText);
						if(products.noProduct === true) {
							Ti.API.info('Geen prod1');
						}

						//Er staan nog geen producten op lijst
						if(products.getList === false) {
							Ti.API.info('Geen prod2');
							var lblNoProd = Ti.UI.createLabel({
								text : "Druk op button",
								top : 20,
								left : 20
							});
							winkelenWindow.add(lblNoProd);
						} else {

							for(var i = 0; i < products.length; i++) {
								var productId = products[i].id;
								var productNaam = products[i].naam;
								var productTitle = products[i].title;
								var productPrijs = products[i].prijsStuk;
								var sessionId = products[i].session_id;
								Ti.App.totaal = products[i].totaalPrijs;
								Ti.App.num_products = products[i].aantal;
								var amount = products[i].amount;
								lbl_totaal.text = Ti.App.num_products + ' Artikelen';
								num_totaal.text = '€ ' + Ti.App.totaal;

								var row = Ti.UI.createTableViewRow(style.row);

								var amount = Ti.UI.createLabel(Smart.combine(style.textNormal, {
									text : amount,
									top : -13
								}));

								var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
									text : productNaam,
									top : -13,
									left : 40
								}));
								var title = Ti.UI.createLabel(Smart.combine(style.textNormal, {
									text : productTitle,
									top : 18,
									left : 40,
									font : {
										fontSize : 10
									},
									opacity : 0.5
								}));
								var prijs = Ti.UI.createLabel(Smart.combine(style.textNormal, {
									text : '€ ' + productPrijs,
									textAlign : 'right',
									right : 80,
									top : -14

								}));

								row.add(amount);
								row.add(name);
								row.add(prijs);
								row.add(title);
								row.className = 'item' + i;
								data[i] = row;
							};

							var listProducts = Titanium.UI.createTableView(Smart.combine(style.tableView, {
								data : data,
								bottom : 100
							}));
							winkelenWindow.add(listProducts);

							listProducts.addEventListener('click', function(e) {
								Titanium.App.selectedProdIndex = products[e.index].id;
								Titanium.App.selectedProd = products[e.index].naam;
								Titanium.App.selectedSessionId = products[e.index].session_id;
								Ti.API.info('Session id: ' + Titanium.App.selectedSessionId);
								Smart.navGroup.open(Smart.ui.createDetailProductSessionWindow(), {
									animated : false
								});
							});
							listProducts.addEventListener('delete', function(e) {
								Titanium.App.selectedProduct = products[e.index].id;
								Titanium.App.selectedSession = products[e.index].session_id;

								Ti.API.info('DELETE FROM winkel_productenlijst WHERE product_id=' + Titanium.App.selectedProduct + ' AND session_id=' + Titanium.App.selectedSession);

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

			return winkelenWindow;
		};
	})();
