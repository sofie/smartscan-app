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
		var searchBg = Titanium.UI.createView(style.searchBar);
		productLijstWin.add(searchBg);
		
		var searchbar = Titanium.UI.createTextField(Smart.combine(style.SearchField,{
			hintText : 'Voeg producten toe aan lijst...'
		}));
		productLijstWin.add(searchbar);
		
		searchbar.addEventListener('change', function() {
			getProductNaam();
		});
		
		var categorieLbl = Titanium.UI.createLabel(Smart.combine(style.textProductTitle, {
			text : 'Zoek product in categoriëen',
			top : 60
		}));

		productLijstWin.add(categorieLbl);

		return productLijstWin;
		
		//////////////////////////////////////////////////////////////////////////////////////
		/// Product toevoegen door zoeken op naam											//
		//////////////////////////////////////////////////////////////////////////////////////
		function getProductNaam() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				getReq.open("GET", "http://localhost/smartscan/get_allproducts.php");
			} else {
				getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_allproducts.php");
			}
			
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var products = JSON.parse(this.responseText);
					Titanium.App.product = products;
					Titanium.App.dataproduct = products.length;
					
					//Er zijn nog geen linken in de databank
					if(products.getProd === false) {
						var lblNoCat = Titanium.UI.createLabel(Smart.combine(style.textError, {
							top : 42,
							text : 'Geen producten gevonden.',
							left : 45,
							right : 30,
							width : 300,
							height : 'auto'
						}));
						productLijstWin.add(lblNoCat);

					} else {
						for(var i = 0; i < products.length; i++) {
							var id = products[i].id;
							var pNaam = products[i].naam;

							var row = Ti.UI.createTableViewRow(style.row);

							var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : pNaam
							}));

							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listCat = Titanium.UI.createTableView(Smart.combine(style.tableView, {
							data : data,
							top:40,
							bottom:200
						}));
						productLijstWin.add(listCat);
						
						listCat.addEventListener('click', function(e) {
							Titanium.App.selectedProdIndex = products[e.index].id;
							addProduct();
						});

					}

				} catch(e) {
					alert(e);
				}
			};
			var params = {
				name : searchbar.value
			};
			Ti.API.info('Search: '+params.name);
			
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send(params);
		}
		
		//////////////////////////////////////////////////////////////////////////////////////
		/// Product toevoegen aan boodschappenlijst door zoeken op naam						//
		//////////////////////////////////////////////////////////////////////////////////////
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

						Ti.App.fireEvent('app:reloadLijst', {
							action : 'Reload links'
						});
						Smart.navGroup.close(productLijstWin, {
							animated : false
						});
						Smart.ui.createLijstjeInhoudWindow();

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
	

		//////////////////////////////////////////////////////////////////////////////////////
		/// Producten van gekozen categorie													//
		//////////////////////////////////////////////////////////////////////////////////////
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
							var discount = categories[i].discount;
							

							var row = Ti.UI.createTableViewRow(style.row);

							var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : naam
							}));
							
							var discountLbl = Ti.UI.createLabel(Smart.combine(style.textError, {
								text : 'PROMO',
								textAlign : 'right',
								right:60
							}));
							
							if(discount===null){
								discountLbl.text="";
							}

							row.add(name);
							row.add(discountLbl);
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
