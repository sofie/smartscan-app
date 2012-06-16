//////////////////////////////////////////////////////////////////////////////////
/// Producten die op boodschappenlijst staan									//
//////////////////////////////////////////////////////////////////////////////////

(function() {

	Smart.ui.createStartVanLijstjeInhoudWindow = function() {
		var inhoudlijstjeWindow = Titanium.UI.createWindow(style.Window);
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : Titanium.App.selectedLijstjeNaam
		}));
		inhoudlijstjeWindow.setTitleControl(lblTitle);

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

							row.add(name);
							row.add(title);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLists = Titanium.UI.createTableView(Smart.combine(style.tableView, {
							data : data
						}));
						inhoudlijstjeWindow.add(listLists);

						//Open detail van product
						listLists.addEventListener('click', function(e) {
							Ti.include("/config/barcode.js");
							Ti.API.debug(JSON.stringify(config));
							TiBar.scan({
								configure : config,
								success : function(data) {
									Ti.App.userBarcode = data.barcode;
									scanBarcode();
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

						});
						function scanBarcode() {
							var scanReq = Titanium.Network.createHTTPClient();
							if(Ti.App.localonline === "local") {
								scanReq.open("POST", "http://localhost/SmartScan/post_authBarcode.php");
							} else {
								scanReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_authBarcode.php");
							}
				
							scanReq.timeout = 5000;
				
							var params = {
								barcode : Ti.App.userBarcode,
							};
				
							scanReq.onload = function() {
								try {
									var json = this.responseText;
									var response = JSON.parse(json);
									if(response.logged == true) {
										Titanium.App.userId = response.id;
				
			
									} else {
										var alertDialog = Ti.UI.createAlertDialog({
											title : 'Login',
											message : 'Onjuiste barcode. Probeer opnieuw te scannen of laat artikel aan de kassa scannen.',
											buttonNames : ['OK']
										});
										alertDialog.show();
									}
								} catch(e) {
									alert(e);
								}
							};
							scanReq.onerror = function(e) {
								var alertDialog = Ti.UI.createAlertDialog({
									title : 'Login',
									message : 'Kan barcode niet scannen.',
									buttonNames : ['OK']
								});
								alertDialog.show();
							}
				
							scanReq.send(params);
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

		
		return inhoudlijstjeWindow;
	};
})();
