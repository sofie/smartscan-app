(function() {

	Smart.ui.createAddProductWindow = function() {
		var addProductWin = Titanium.UI.createWindow(style.Window);
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Product toevoegen'
		}));
		addProductWin.setTitleControl(lblTitle);

		addProductWin.addEventListener('open', function() {
			getCategories();
		});

		//Backbutton
		var backButton = Titanium.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addProductWin, {
				animated : false
			});
		});
		addProductWin.leftNavButton = backButton;

		var scanButton = Titanium.UI.createButton(style.scanButton);
		scanButton.addEventListener('click', function() {
			Ti.include("/config/barcode.js");
			Ti.API.debug(JSON.stringify(config));
			TiBar.scan({
				configure : config,
				success : function(data) {
					Ti.App.productBarcode = data.barcode;
					addProductBarcode();
					Ti.API.info('TiBar success callback!');
					if(data && data.barcode) {
						Ti.API.info("Barcode: " + data.barcode + ", symbol: " + data.symbology);
						/*Ti.UI.createAlertDialog({
						 title : "Scan result",
						 message : "Inloggen gelukt."
						 }).show();*/
					}
				},
				cancel : function() {
					Ti.API.info('TiBar cancel callback!');
				},
				error : function() {
					Ti.API.info('TiBar error callback!');
				}
			});
		});
		addProductWin.rightNavButton = scanButton;

		//
		//Inhoud window
		//
		var productNaam = Titanium.UI.createTextField(Smart.combine(style.inputFieldKort, {
			top : 15,
			hintText : 'Voeg product toe aan lijst...'
		}));

		var btnAddProduct = Titanium.UI.createButton(style.searchButton);

		btnAddProduct.addEventListener('click', function(e) {
			if(productNaam.value != '') {
				productNaam.blur();
				addProduct();

			} else {
				alert('Gelieve een naam in te vullen.');
			}
		});
		var categorieLbl = Titanium.UI.createLabel(Smart.combine(style.textProductTitle, {
			text : 'Product categoriëen',
			top : 75
		}));

		addProductWin.add(productNaam);
		addProductWin.add(btnAddProduct);
		addProductWin.add(categorieLbl);

		return addProductWin;

		/**
		 *
		 * HTTP Requests
		 *
		 */

		//Add product to list
		function addProduct() {
			var createReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				createReq.open("POST", "http://localhost/smartscan/post_addproduct.php");
			} else {
				createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_addproduct.php");
			}

			var params = {
				list_id : Titanium.App.selectedLijstje,
				product_id : productNaam.value
			};
			Ti.API.info('Add: ' + params.list_id + ' ' + params.product_id);

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					Titanium.API.info(this.responseText);
					if(response.add === true) {

						Ti.App.fireEvent('app:reloadLijst', {
							action : 'Reload links'
						});
						Smart.navGroup.close(addProductWin, {
							animated : false
						});

					} else {
						alert('Product staat al op lijstje');
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
		}

		function addProductBarcode() {
			var createReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				createReq.open("POST", "http://localhost/smartscan/post_addproduct_barcode.php");
			} else {
				createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_addproduct_barcode.php");
			}

			var params = {
				list_id : Titanium.App.selectedLijstje,
				barcode : Ti.App.productBarcode
			};
			Ti.API.info('Add: ' + params.list_id + ' ' + params.barcode);

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					Titanium.API.info(this.responseText);
					if(response.add === true) {

						Ti.App.fireEvent('app:reloadLijst', {
							action : 'Reload links'
						});
						Smart.navGroup.close(addProductWin, {
							animated : false
						});

					} else {
						alert('Product staat al op lijstje');
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
		}

		//Get categories
		function getCategories() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/smartscan/get_category.php");
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var categories = JSON.parse(this.responseText);
					//Er zijn nog geen linken in de databank
					if(categories.getCat === false) {
						var lblNoCat = Titanium.UI.createLabel({
							top : 70,
							text : 'Geen categoriëen gevonden.',
							color : '#AC3724',
							left : 30,
							right : 30,
							width : 300,
							height : 'auto'
						});
						addProductWin.add(lblNoCat);

					} else {
						for(var i = 0; i < categories.length; i++) {
							var id = categories[i].id;
							var naam = categories[i].naam;

							var row = Ti.UI.createTableViewRow(style.row);

							var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : naam
							}));

							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listCat = Titanium.UI.createTableView(Smart.combine(style.tableView, {
							top : 100,
							data : data
						}));
						addProductWin.add(listCat);

						//Open detail van window
						listCat.addEventListener('click', function(e) {
							Titanium.App.selectedCatIndex = categories[e.index].id;
							Titanium.App.selectedNaam = categories[e.index].naam;
							Ti.API.info('Titanium.App.selectedCatIndex: ' + categories[e.index].id);
							Smart.navGroup.open(Smart.ui.createProductLijstWindow(), {
								animated : false
							});
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

			getReq.send();
		}

	};
})();
