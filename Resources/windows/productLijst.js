//////////////////////////////////////////////////////////////////////////////////////
/// Overzicht van producten in categorie om toe te voegen aan boodschappenlijst	 	//
//////////////////////////////////////////////////////////////////////////////////////

(function() {

	Smart.ui.createProductLijstWindow = function() {
		var productLijstWin = Titanium.UI.createWindow(style.Window);
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Product toevoegen'
		}));
		productLijstWin.setTitleControl(lblTitle);

		productLijstWin.addEventListener('open', function() {
			getProducts();
		});

		//Backbutton
		var backButton = Titanium.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(productLijstWin, {
				animated : false
			});
		});
		productLijstWin.leftNavButton = backButton;

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

		productLijstWin.add(productNaam);
		productLijstWin.add(btnAddProduct);
		productLijstWin.add(categorieLbl);

		return productLijstWin;


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
				product_id : Titanium.App.selectedProdIndex
			};
			Ti.API.info('Add: ' + params.list_id + ' ' + params.product_id);

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					Titanium.API.info(this.responseText);
					if(response.add === true) {
						Smart.navGroup.close(productLijstWin, {
							animated : false
						});

						Ti.App.fireEvent('app:reloadLijst', {
							action : 'Reload links'
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
		function getProducts() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				getReq.open("GET", "http://localhost/smartscan/get_category_products.php");
			} else {
				getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_category_products.php");
			}
			
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var categories = JSON.parse(this.responseText);

					if(categories.getCatProd === false) {
						var lblNoCat = Titanium.UI.createLabel(Smart.combine(style.textError, {
							top : 130,
							text : 'Geen producten gevonden.',
							left : 30
						}));
						productLijstWin.add(lblNoCat);

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
						productLijstWin.add(listCat);

						//Open detail van window
						listCat.addEventListener('click', function(e) {
							Titanium.App.selectedProdIndex = categories[e.index].id;
							Titanium.App.selectedProdNaam = categories[e.index].naam;
							Ti.API.info('Titanium.App.selectedProdIndex: ' + categories[e.index].id);
							Ti.API.info('Titanium.App.selectedProdNaam: ' + categories[e.index].naam);
							Smart.navGroup.close(productLijstWin, {
								animated : false
							});
							addProduct();
							Smart.navGroup.open(Smart.ui.createLijstjeInhoudWindow(), {
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
			var params = {
				id : Titanium.App.selectedCatIndex
			};

			getReq.send(params);
		}

	};
})();
