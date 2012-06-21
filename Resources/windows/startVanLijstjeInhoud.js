//////////////////////////////////////////////////////////////////////////////////
/// Producten die op boodschappenlijst staan									//
//////////////////////////////////////////////////////////////////////////////////

(
	function() {

		Smart.ui.createStartVanLijstjeInhoudWindow = function() {
			var inhoudlijstjeWindow = Titanium.UI.createWindow(style.Window);
			var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
				text : Titanium.App.selectedLijstjeNaam
			}));
			inhoudlijstjeWindow.setTitleControl(lblTitle);
			startSession();

			inhoudlijstjeWindow.addEventListener('close', function() {
				removeSession();
			});

			var backButton = Titanium.UI.createButton(style.backButton);
			backButton.addEventListener('click', function() {
				Smart.navGroup.close(inhoudlijstjeWindow, {
					animated : false
				});
			});
			inhoudlijstjeWindow.leftNavButton = backButton;

			

			var viewAfrekenen = Ti.UI.createView({
				backgroundColor : '#fff',
				width : 320,
				height : 100,
				bottom : 0,
				opacity : 0.5
			});
			inhoudlijstjeWindow.add(viewAfrekenen);

			var btn_klaar = Ti.UI.createButton(style.afrekenenButton);
			inhoudlijstjeWindow.add(btn_klaar);
			btn_klaar.addEventListener('click', function() {
				updateSession();
			});

			var lbl_totaal = Ti.UI.createLabel(Smart.combine(style.textTotaal, {
				text : '0 Artikelen'
			}));
			inhoudlijstjeWindow.add(lbl_totaal);

			var num_totaal = Ti.UI.createLabel(Smart.combine(style.textTotaal, {
				text : '€ 0,00',
				bottom : 20,
				font : {
					fontSize : 20,
					fontFamily : 'Bree serif'
				}
			}));
			inhoudlijstjeWindow.add(num_totaal);

			//////////////////////////////////////////////////////////////////////////////////////////////////////////////
			/// Producten in lijst																						//
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////
			Titanium.App.addEventListener('app:reloadLijst', function(e) {
				getProducts();
			});
			getProducts();
			function getProducts() {

				var data = [];

				var getReq = Titanium.Network.createHTTPClient();
				if (Ti.App.localonline === "local") {
					getReq.open("GET", "http://localhost/SmartScan/get_products.php");
				} else {
					getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_products.php");
				}

				var params = {
					list_id : Titanium.App.selectedLijstje
				};
				getReq.timeout = 5000;

				getReq.onload = function() {
					try {
						var products = JSON.parse(this.responseText);

						//Er staan nog geen producten op lijst
						if (products.getList === false) {
							Titanium.API.info('Geen producten');
							var noProductView = Titanium.UI.createView({
								backgroundImage : "/img/no_products.png",
								width : 239,
								height : 376,
								right : 10,
								top : 5
							});
							inhoudlijstjeWindow.add(noProductView);

						} else {

							for (var i = 0; i < products.length; i++) {
								var productId = products[i].productId;
								var productNaam = products[i].productNaam;
								var productTitle = products[i].productTitle;

								var row = Ti.UI.createTableViewRow(style.row);

								var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
									text : productNaam,
									top : -13
								}));
								Ti.App.checkedName = name;
								var title = Ti.UI.createLabel(Smart.combine(style.textNormal, {
									text : productTitle,
									top : 18,
									font : {
										fontSize : 10
									},
									opacity : 0.5
								}));

								row.add(name);
								row.add(title);
								row.className = 'item' + i;
								data[i] = row;
							};

							var listLists = Titanium.UI.createTableView(Smart.combine(style.tableView, {
								data : data,
								bottom : 100
							}));
							inhoudlijstjeWindow.add(listLists);

							listLists.addEventListener('click', function(e) {
								Titanium.App.selectedProd = products[e.index].productId;
								Titanium.App.selectedProdNaam = products[e.index].productNaam;
								scan();
							})
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
			/// Start sessie																							//
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////
			function startSession() {
				var currentTime = new Date();
				var hours = currentTime.getHours();
				var minutes = currentTime.getMinutes();
				var secondes = currentTime.getSeconds();
				var month = currentTime.getMonth() + 1;
				var day = currentTime.getDate();
				var year = currentTime.getFullYear();
				var createReq = Titanium.Network.createHTTPClient();
				if (Ti.App.localonline === "local") {
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

						if (response.add === true) {
							Ti.API.info('Sessie aangemaakt, id: ' + response.sessionId);
							Ti.App.sessionId = response.sessionId;

							//////////////////////////////////////////////////////////////////////////////////////////////////////////////
							/// Delete session																							//
							//////////////////////////////////////////////////////////////////////////////////////////////////////////////
							function removeSession() {
								Ti.API.info('remove');

								var createReq = Titanium.Network.createHTTPClient();
								if (Ti.App.localonline === "local") {
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
										if (response.remove === true) {
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
						if (Ti.App.localonline === "local") {
							createReq.open("GET", "http://localhost/SmartScan/get_checkList.php");
						} else {
							createReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_checkList.php");
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

								if (response.check === true) {
									//Als barcode en product overeenkomen
									if (response.product_id == Titanium.App.selectedProd) {
										var createReq = Titanium.Network.createHTTPClient();
										if (Ti.App.localonline === "local") {
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

												if (response.add === true) {
													alert('Product '+Titanium.App.selectedProdNaam+' is toegevoegd aan jouw mandje.');
													Ti.API.info('Toegevoegd: '+Titanium.App.selectedProd);
													updateProducts();
												} else {

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
										if (data && data.barcode) {
											Ti.API.info("Barcode: " + data.barcode + ", symbol: " + data.symbology);

										}

									} else {
										alert('Dit is niet de juiste barcode. Scan de barcode van het product dat je van je lijstje wilt checken.');
									};
								} else {
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
						if (data && data.barcode) {
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
			/// Gegevens sessie																							//
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////
			function updateProducts() {

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
							var lblNoProd = Ti.UI.createLabel({
								text : "Druk op button",
								top : 20,
								left : 20
							});
							winkelenWindow.add(lblNoProd);
						} else {

							for(var i = 0; i < products.length; i++) {
								Ti.App.totaal = products[i].totaalPrijs;
								Ti.App.num_products = products[i].aantal;
								lbl_totaal.text = Ti.App.num_products + ' Artikelen';
								num_totaal.text = '€ ' + Ti.App.totaal;

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

				getReq.send(params);
			}
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////
			/// Delete session																							//
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////
			function removeSession() {
				Ti.API.info('remove');

				var createReq = Titanium.Network.createHTTPClient();
				if (Ti.App.localonline === "local") {
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
						if (response.remove === true) {
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

			return inhoudlijstjeWindow;
		};
	})();
