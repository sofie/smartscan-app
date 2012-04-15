(function() {

	Smart.ui.createLijstjeInhoudWindow = function() {
		var inhoudlijstjeWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false,
			font : {
				fontFamily : 'Bree Serif'
			}
		});
		var lblTitle = Titanium.UI.createLabel({
			text : Titanium.App.selectedLijstjeNaam,
			color : '#fff',
			font : FontTitle
		});
		inhoudlijstjeWindow.setTitleControl(lblTitle);

		//
		//Add button (rightNavButton)
		//
		var addButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_add.png",
			width : 37,
			height : 35
		});
		addButton.addEventListener('click', function() {
			Smart.navGroup.open(Smart.ui.createAddProductWindow({
				animated : false
			}));
		});
		inhoudlijstjeWindow.rightNavButton = addButton;

		//
		//Back button
		//
		var backButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
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
			getReq.open("GET", "http://localhost/SmartScan/get_products.php");
			var params = {
				lijstId : Titanium.App.selectedLijstje
			};
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var products = JSON.parse(this.responseText);

					//Er staan nog geen producten op lijst
					if(products.getList == false) {
						Titanium.API.info('Geen lijstjes');
						var lblNoLinks = Titanium.UI.createLabel({
							top : 70,
							text : 'Dit lijstje bevat nog geen producten. Voeg er toe.',
							font : FontNormal,
							color : '#AC3724',
							left : 30,
							right : 30,
							width : 300,
							height : 'auto'
						});
						inhoudlijstjeWindow.add(lblNoLinks);

					} else {

						for(var i = 0; i < products.length; i++) {
							var productId = products[i].productId;
							var productNaam = products[i].productNaam;

							var row = Ti.UI.createTableViewRow({
								height : 35
							});

							var name = Ti.UI.createLabel({
								text : productNaam,
								left : 10,
								width : 'auto',
								height : 'auto',
								textAlign : 'left',
								color : '#474240',
								font : FontNormal
							});

							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLists = Titanium.UI.createTableView({
							top : 5,
							left : 10,
							right : 10,
							bottom : 15,
							data : data,

							backgroundImage : 'img/bg.png',
							style : Titanium.UI.iPhone.TableViewStyle.GROUPED
						});
						inhoudlijstjeWindow.add(listLists);

						//Open detail van window
						/*listLists.addEventListener('click', function(e) {
						 Titanium.App.selectedIndex = products[e.index].linkId;
						 Titanium.App.selectedNaam = products[e.index].linkNaam;
						 Titanium.App.selectedProd1 = products[e.index].productNaam;
						 Smart.navGroup.open(Smart.ui.createDetailWindow(), {
						 animated : false
						 });
						 });*/
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
