//////////////////////////////////////////////////////////////////////////////////
/// Producten die op boodschappenlijst staan									//
//////////////////////////////////////////////////////////////////////////////////

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
		//Back button (leftNavButton)
		//
		var backButton = Titanium.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(inhoudlijstjeWindow, {
				animated : false
			});
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
			if(Ti.App.localonline === "local") {
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
					if(products.getList === false) {
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

						for(var i = 0; i < products.length; i++) {
							var productId = products[i].productId;
							var productNaam = products[i].productNaam;
							var productTitle = products[i].productTitle;
							var discount = products[i].discount;
							var link = products[i].link;
							Ti.API.info('link: '+link);

							var row = Ti.UI.createTableViewRow(style.row);

							var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : productNaam,
								top:-13
							}));
							var title = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : productTitle,
								top : 18,
								font : {
									fontSize : 10
								},
								opacity : 0.5
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
							row.add(title);
							row.add(discountLbl);
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
							Titanium.App.selectedListId = products[e.index].listId;
							Titanium.App.discount = products[e.index].discount;
							Titanium.App.link=products[e.index].link;
							Ti.API.info('Titanium.App.link: '+Titanium.App.link);
							Smart.navGroup.open(Smart.ui.createDetailProductWindow(), {
								animated : false
							});
						});
						//Delete product van lijstje
						listLists.addEventListener('delete', function(e) {
							Titanium.App.selectedListItem = products[e.index].listId;

							Ti.API.info('DELETE FROM lists WHERE id=' + Titanium.App.selectedListItem);

							var deleteReq = Titanium.Network.createHTTPClient();
							if(Ti.App.localonline === "local") {
								deleteReq.open("GET", "http://localhost/SmartScan/post_removeproduct.php");
							} else {
								deleteReq.open("GET", "http://sofiehendrickx.eu/SmartScan/post_removeproduct.php");
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

		
		return inhoudlijstjeWindow;
	};
})();
