//////////////////////////////////////////////////////////////////////////////////
/// Window met details van geselecteerd product tijdens winkelen				//
//////////////////////////////////////////////////////////////////////////////////
(
	function() {

		Smart.ui.createDetailProductSessionWindow = function() {
			var detailproductWindow = Titanium.UI.createWindow(style.Window);
			var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
				text : 'Productinfo'
			}));
			detailproductWindow.setTitleControl(lblTitle);

			var backButton = Titanium.UI.createButton(style.backButton);
			backButton.addEventListener('click', function() {
				Smart.navGroup.close(detailproductWindow, {
					animated : false
				});
			});
			detailproductWindow.leftNavButton = backButton;
			var navActInd = Titanium.UI.createActivityIndicator({
				style : Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN
			});
			detailproductWindow.setRightNavButton(navActInd);

			detailproductWindow.addEventListener('open', function() {
				getDetail();
				getLink();
				navActInd.show();
			});

			var amount = Ti.UI.createTextField({
				width : 50,
				height : 30,
				top : 120,
				left : 130,
				hintText : '1',
				font : {
					fontSize : 13,
					fontFamily : 'Bree Serif'
				},
				autocapitalization : false,
				keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
				returnKeyType : Titanium.UI.RETURNKEY_DONE,
				borderStyle : Titanium.UI.INPUT_BORDERSTYLE_LINE,
				clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
			});

			//////////////////////////////////////////////////////////////////////////////////
			/// Haalt detail op uit databank												//
			//////////////////////////////////////////////////////////////////////////////////
			function getDetail() {
				var getReq = Titanium.Network.createHTTPClient();
				if (Ti.App.localonline === "local") {
					getReq.open("GET", "http://localhost/SmartScan/get_itemdetail.php");
				} else {
					getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_itemdetail.php");
				}
				var params = {
					id : Titanium.App.selectedProdIndex
				};

				getReq.timeout = 5000;
				getReq.onload = function() {
					try {
						var detail = JSON.parse(this.responseText);
						if (detail.getItem === false) {
							var lblNoDetail = Titanium.UI.createLabel(Smart.combine(style.textError, {
								text : 'Kan product niet ophalen.',
								top : 30
							}));
							detailproductWindow.add(lblNoDetail);

						} else {

							name = detail.name;
							title = detail.title;
							var pFoto = detail.foto;
							Ti.App.pId = detail.id;
							var pBeschrijving = detail.beschrijving;
							var pPrijs = detail.prijs;

							var bgView = Titanium.UI.createView(style.bgProduct);

							var cropView = Titanium.UI.createView({
								width : 100,
								height : 100
							});

							var baseImg = Titanium.UI.createImageView({
								image : pFoto
							});
							cropView.add(baseImg);

							var croppedImage = cropView.toImage();

							var imageView = Titanium.UI.createImageView({
								image : croppedImage,
								width : 100,
								height : 100,
								left : 20,
								top : 45
							});

							var title = Titanium.UI.createLabel(Smart.combine(style.textProductTitle, {
								text : name + ' ' + title
							}));
							var promo = Titanium.UI.createLabel(Smart.combine(style.textError, {
								text : 'PROMO',
								top : 13,
								textAlign : 'right',
								right : 30
							}));
							var beschrijving = Titanium.UI.createLabel(Smart.combine(style.textProductDescription, {
								text : pBeschrijving
							}));

							var prijs = Titanium.UI.createLabel(Smart.combine(style.textProductPrice, {
								text : '€ ' + pPrijs
							}));

							if (Titanium.App.selectedDiscount) {
								prijs.opacity = 0.4;
								prijs.top = 105;
								bgView.add(promo);
							}
							var discountPrijs = pPrijs - pPrijs * Titanium.App.selectedDiscount;
							discountPrijs = discountPrijs.toFixed(2);
							var discount = Ti.UI.createLabel(Smart.combine(style.textProductPrice, {
								text : ' € ' + discountPrijs,
								top : 125,
								color : '#AC3724'
							}));
							if (Ti.App.selectedDiscount === null) {
								discount.text = "";
							}

							bgView.add(title);
							bgView.add(imageView);
							bgView.add(beschrijving);
							bgView.add(prijs);
							bgView.add(discount);
							bgView.add(amount);

							detailproductWindow.add(bgView);
							navActInd.hide();

						}

					} catch(e) {
						alert(e);
					}
				}
				getReq.onerror = function(e) {
					Ti.API.info("TEXT onerror:   " + this.responseText);
					alert('Er is iets mis met de databank.');
				}

				getReq.send(params);
			};
			var verwijderenButton = Titanium.UI.createButton(style.verwijderenButton);
			detailproductWindow.add(verwijderenButton);

			var sessieKlaarButton = Ti.UI.createButton(Smart.combine(style.klaarButton, {
				top : 220,
				left : 180
			}));
			detailproductWindow.add(sessieKlaarButton);
			sessieKlaarButton.addEventListener('click', function() {
				Ti.API.info(Ti.App.amount);
				updateAantal();
			});

			//////////////////////////////////////////////////////////////////////////////////
			/// Haalt link op uit databank													//
			//////////////////////////////////////////////////////////////////////////////////
			function getLink() {
				var data = [];
				var getReq = Titanium.Network.createHTTPClient();
				if (Ti.App.localonline === "local") {
					getReq.open("GET", "http://localhost/SmartScan/get_itemlink.php");
				} else {
					getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_itemlink.php");
				}
				var params = {
					product_id : Titanium.App.selectedProdIndex,
					link_id : Titanium.App.link
				};

				getReq.timeout = 5000;
				getReq.onload = function() {
					try {
						var detail = JSON.parse(this.responseText);

						if (detail.getLink === false) {
							Ti.API.info('Geen link');

						} else {
							var lbl = Titanium.UI.createLabel(Smart.combine(style.textProductTitle, {
								text : 'Korting als je dit product samen met het product hieronder koopt.',
								top : 230,
								height : 50,
								font : {
									fontSize : 14,
									fontFamily : 'Bree serif'
								}
							}));
							detailproductWindow.add(lbl);

							for (var i = 0; i < detail.length; i++) {

								var row = Ti.UI.createTableViewRow(Smart.combine(style.row, {

								}));
								var title = Titanium.UI.createLabel(Smart.combine(style.textProductTitle, {
									text : detail[i].anderName,
									top : 0
								}));

								row.add(title);
								row.className = 'item' + i;
								data[i] = row;
							};

							var listLists = Titanium.UI.createTableView(Smart.combine(style.tableView, {
								data : data,
								top : 275
							}));
							detailproductWindow.add(listLists);
							listLists.addEventListener('click', function(e) {
								Titanium.App.selectedProdIndex = detail[e.index].anderId;
								Titanium.App.selectedProdNaam = detail[e.index].anderName;
								Titanium.App.selectedBarcode = detail[e.index].anderBarcode;

								Ti.API.info('Titanium.App.selectedProdIndex: ' + detail[e.index].anderId);
								Ti.API.info('Titanium.App.selectedProdNaam: ' + detail[e.index].anderName);
								Smart.navGroup.close(detailproductWindow, {
									animated : false
								});
								addProduct();
							});

						}

					} catch(e) {
						alert(e);
					}
				}
				getReq.onerror = function(e) {
					Ti.API.info("TEXT onerror:   " + this.responseText);
					alert('Er is iets mis met de databank.');
				}

				getReq.send(params);
			};

			//////////////////////////////////////////////////////////////////////////////////
			/// Link toevoegen																//
			//////////////////////////////////////////////////////////////////////////////////
			function addProduct() {

				var createReq = Titanium.Network.createHTTPClient();
				if (Ti.App.localonline === "local") {
					createReq.open("POST", "http://localhost/SmartScan/post_sessieproducten.php");
				} else {
					createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_sessieproducten.php");
				}

				var params = {
					barcode : Titanium.App.selectedBarcode,
					session_id : Ti.App.sessionId
				};

				createReq.onload = function() {
					try {
						var json = this.responseText;
						var response = JSON.parse(json);
						Ti.API.info("Add link: " + this.responseText);

						if (response.add === true) {
							Ti.App.fireEvent('app:reloadSession', {
								action : 'Reload producten sessie'
							});
							Smart.navGroup.close(detailproductWindow, {
								animated : false
							});
							Smart.ui.createStartWinkelenWindow();
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

			};

			//////////////////////////////////////////////////////////////////////////////////
			/// Hoeveelheid van gescand product aanpassen									//
			//////////////////////////////////////////////////////////////////////////////////
			function updateAantal() {

				var createReq = Titanium.Network.createHTTPClient();
				if (Ti.App.localonline === "local") {
					createReq.open("POST", "http://localhost/SmartScan/post_updateaantal.php");
				} else {
					createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_updateaantal.php");
				}
				if (amount.value == "") {
					amount.value = 1;
				}

				var params = {
					product_id : Titanium.App.selectedProdIndex,
					session_id : Titanium.App.selectedSessionId,
					aantal : amount.value
				};

				createReq.onload = function() {
					try {
						var json = this.responseText;
						Ti.API.info('JSON: ' + json);
						var response = JSON.parse(json);
						if (response.add === true) {
							Ti.API.info('Sessie ' + Ti.App.sessionId + ' beëindigd');
							Ti.App.fireEvent('app:reloadSession', {
								action : 'Reload producten sessie'
							});
							Smart.navGroup.close(detailproductWindow, {
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

			//////////////////////////////////////////////////////////////////////////////////
			/// Product verwijderen uit lijst												//
			//////////////////////////////////////////////////////////////////////////////////
			verwijderenButton.addEventListener('click', function() {

				Ti.API.info('DELETE FROM winkel_productenlijst WHERE product_id=' + Titanium.App.selectedProdIndex + ' AND session_id=' + Titanium.App.selectedSessionId);

				var deleteReq = Titanium.Network.createHTTPClient();
				if (Ti.App.localonline === "local") {
					deleteReq.open("GET", "http://localhost/SmartScan/post_removeproductSession.php");
				} else {
					deleteReq.open("GET", "http://sofiehendrickx.eu/SmartScan/post_removeproductSession.php");
				}

				deleteReq.timeout = 5000;
				deleteReq.onload = function() {
					try {
						var json = this.responseText;
						var response = JSON.parse(json);
						if (response.remove === true) {
							Titanium.API.info('Remove product: ' + this.responseText);

							Ti.App.fireEvent('app:reloadSession', {
								action : 'Reload producten sessie'
							});
							Smart.navGroup.close(detailproductWindow, {
								animated : false
							});

						} else {
							alert('Product kan niet verwijderd worden.');
						}
					} catch(e) {
						alert(e);
					}
				};

				var params = {
					product_id : Titanium.App.selectedProdIndex,
					session_id : Titanium.App.selectedSessionId
				};
				deleteReq.send(params);

			})

			return detailproductWindow;
		};
	})();
