(function() {

	Smart.ui.createAddProductWindow = function() {
		var addProductWin = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			layout : 'vertical',
			fullscreen : false
		});
		var lblAddTitle = Titanium.UI.createLabel({
			text : 'Product toevoegen',
			color : '#fff',
			font : FontTitle
		});
		addProductWin.setTitleControl(lblAddTitle);
		
	//	getCategories();

		//Backbutton
		var backButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addProductWin, {
				animated : false
			});
		});
		addProductWin.leftNavButton = backButton;

		//
		//Inhoud window
		//
		var productNaam = Titanium.UI.createTextField({
			color : '#888',
			top : 15,
			left : 15,
			right : 60,
			height : 40,
			hintText : 'Voeg product toe aan lijst...',
			font : FontTextField,
			opacity : 0.65,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		});

		var btnAddProduct = Titanium.UI.createButton({
			backgroundImage : "img/btn_search.png",
			width : 43,
			height : 42,
			right : 15,
			top : -40
		});

		btnAddProduct.addEventListener('click', function(e) {
			if(productNaam.value != '') {
				productNaam.blur();
				addProduct();

			} else {
				alert('Gelieve een naam in te vullen.');
			}
		});

		addProductWin.add(productNaam);
		addProductWin.add(btnAddProduct);

		return addProductWin;

		/**
		 *
		 * HTTP Requests
		 *
		 */

		//Add product to list
		function addProduct() {
			var createReq = Titanium.Network.createHTTPClient();
			createReq.open("POST", "http://localhost/smartscan/post_addproduct.php");

			var params = {
				list_id : Titanium.App.selectedLijstje,
				product_id : productNaam.value
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					Titanium.API.info(this.responseText);
					if(response.add == true) {
						Smart.navGroup.close(addProductWin, {
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
/*
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
					if(categories.getCat == false) {
						var lblNoLinks = Titanium.UI.createLabel({
							top : 70,
							text : 'Er zijn nog geen links. Maak 1 aan.',
							font : FontNormal,
							color : '#AC3724',
							left : 30,
							right : 30,
							width : 300,
							height : 'auto'
						});
						mainWindow.add(lblNoLinks);

					} else {
						Titanium.API.info(this.responseText);

						for(var i = 0; i < categories.length; i++) {
							var linkid = categories[i].catId;
							var catNaam = categories[i].catNaam;

							var row = Ti.UI.createTableViewRow({
								height : 35
							});

							var name = Ti.UI.createLabel({
								text : catNaam,
								left : 10,
								width : 'auto',
								height : 'auto',
								textAlign : 'left',
								font : FontNormal
							});
							
							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLinks = Titanium.UI.createTableView({
							top : 50,
							left : 0,
							right : 0,
							bottom : 15,
							data : data,
							backgroundImage : 'img/bg.png',
							style : Titanium.UI.iPhone.TableViewStyle.GROUPED
						});
						

						//Open detail van window
						listLinks.addEventListener('click', function(e) {
							Titanium.App.selectedIndex = categories[e.index].linkId;
							Titanium.App.selectedNaam = categories[e.index].linkNaam;
							Titanium.App.selectedProd1 = categories[e.index].productNaam;
							Smart.navGroup.open(Smart.ui.createDetailWindow(), {
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
*/

	};
})();
