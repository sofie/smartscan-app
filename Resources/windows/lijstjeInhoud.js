(function() {

	Smart.ui.createLijstjeInhoudWindow = function() {
		var inhoudlijstjeWindow = Titanium.UI.createWindow(style.Window);
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : Titanium.App.selectedLijstjeNaam
		}));
		inhoudlijstjeWindow.setTitleControl(lblTitle);

		//
		//Add button (rightNavButton)
		//
		var addButton = Titanium.UI.createButton(style.addButton);
		addButton.addEventListener('click', function() {
			Smart.navGroup.open(Smart.ui.createAddProductWindow(), {
				animated : false
			});
		});
		inhoudlijstjeWindow.rightNavButton = addButton;

		//
		//Back button
		//
		var backButton = Titanium.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(inhoudlijstjeWindow, {
				animated : false
			});
			/*Smart.navGroup.open(Smart.ui.createLijstjeWindow(), {
			 animated : false
			 });*/
		});
		inhoudlijstjeWindow.leftNavButton = backButton;

		//
		// Producten op lijst
		//
		Titanium.App.addEventListener('app:reloadLijst', function(e) {
			getProducts();
		});
		getProducts();
		function getProducts() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/SmartScan/get_products.php");
			var params = {
				list_id : Titanium.App.selectedLijstje
			};
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var products = JSON.parse(this.responseText);

					//Er staan nog geen producten op lijst
					if(products.getList === false) {
						Titanium.API.info('Geen lijstjes');
						var lblNoLinks = Titanium.UI.createLabel(Smart.combine(style.textError, {
							top : 30,
							text : 'Dit lijstje bevat nog geen producten. Voeg er toe.',
						}));
						inhoudlijstjeWindow.add(lblNoLinks);

					} else {

						for(var i = 0; i < products.length; i++) {
							var productId = products[i].productId;
							var productNaam = products[i].productNaam;

							var row = Ti.UI.createTableViewRow(style.row);

							var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : productNaam
							}));

							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLists = Titanium.UI.createTableView(Smart.combine(style.tableView, {
							data : data
						}));
						inhoudlijstjeWindow.add(listLists);

						//Open detail van product
						listLists.addEventListener('click', function(e) {
							Titanium.App.selectedProdIndex = products[e.index].productId;
							Titanium.App.selectedProd = products[e.index].productNaam;
							Smart.navGroup.open(Smart.ui.createDetailProductWindow(), {
								animated : false
							});
						});
						listLists.addEventListener('delete', function(e) {
							Titanium.App.selectedListItem = products[e.index].listId;
						
							Ti.API.info('DELETE FROM lists WHERE id=' + Titanium.App.selectedListItem);

							var deleteReq = Titanium.Network.createHTTPClient();
							deleteReq.open("GET", "http://localhost/SmartScan/post_removeproduct.php");
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
								id : Titanium.App.selectedListItem
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

		//
		// Details lijstje tonen
		//

		/*
		tableview.addEventListener('click', function(e) {
		//Globale variabele
		Titanium.App.productTitle=e.rowData.title;
		Smart.navGroup.open(detailproductWindow, {
		animated : false
		});
		Ti.App.fireEvent('app:detailtonen', {
		title:'Detail product tonen'
		});
		});
		*/
		//
		//
		// Product in detail
		//
		Titanium.App.addEventListener('app:detailtonen', function(e) {
			//Titanium.API.info('title: ' + e.rowData.title);
			lblTitle.text = Titanium.App.productTitle;
			pName.text = Titanium.App.productTitle;
			pImage.image = '/img/milka.jpg';
			pDescription.text = 'Omschrijving van product';
			pPrice.text = '€ 2,45'
		});
		var detailproductWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false,
			font : {
				fontFamily : 'Bree Serif'
			},
			layout : 'vertical'
		});
		var lblTitle = Titanium.UI.createLabel({
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		detailproductWindow.setTitleControl(lblTitle);

		//
		//Back button
		//
		var backDetailButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
		backDetailButton.addEventListener('click', function() {
			Smart.navGroup.close(detailproductWindow, {
				animated : false
			});
		});
		detailproductWindow.leftNavButton = backDetailButton;

		var bgView = Titanium.UI.createView({
			backgroundColor : '#fff',
			opacity : 0.7,
			left : 20,
			top : 30,
			right : 20,
			height : 200,
			borderRadius : 10
		});

		var pName = Titanium.UI.createLabel({
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 17
			},
			color : '#474240',
			top : -150,
			left : 20
		});
		bgView.add(pName);

		var pImageBorder = Titanium.UI.createView({
			backgroundColor : '#fff',
			borderWidth : 1,
			borderColor : '#494341',
			width : 100,
			height : 100,
			left : 20
		});
		bgView.add(pImageBorder);

		var pImage = Ti.UI.createImageView({
			left : 'auto',
			right : 'auto',
			height : 100
		});
		pImageBorder.add(pImage);

		var pDescription = Titanium.UI.createLabel({
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 14
			},
			color : '#474240',
			left : 130,
			top : -70
		});
		bgView.add(pDescription);

		var pPrice = Titanium.UI.createLabel({
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 14
			},
			color : '#474240',
			left : 130,
			top : 85
		});
		bgView.add(pPrice);

		detailproductWindow.add(bgView);
		return inhoudlijstjeWindow;
	};
})();
