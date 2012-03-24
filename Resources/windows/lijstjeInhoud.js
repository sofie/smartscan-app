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
			text : 'Inhoud lijstje',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
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
			Smart.navGroup.open(addProductWin, {
				animated : false
			});
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
		//Add window
		//
		var addProductWin = Titanium.UI.createWindow({
			barImage : 'img/header.png'
		});
		var lblAddTitle = Titanium.UI.createLabel({
			text : 'Nieuw product',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		addProductWin.setTitleControl(lblAddTitle);

		//Back button
		var addBackButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
		addBackButton.addEventListener('click', function() {
			Smart.navGroup.close(addProductWin, {
				animated : false
			});
		});
		addProductWin.leftNavButton = addBackButton;

		//Inhoud add product window
		var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 43 - 45;

		var nameProduct = Titanium.UI.createTextField({
			color : '#888',
			top : 20,
			left : 20,
			height : 40,
			width : widthTxtField,
			hintText : 'Boodschappen toevoegen...',
			font : {
				fontSize : 15,
				fontFamily : 'Bree Serif'
			},
			opacity : 0.65,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		});

		var btnSearchProduct = Titanium.UI.createButton({
			backgroundImage : 'img/btn_search.png',
			width : 43,
			height : 42,
			right : 20,
			top : 20
		});
		btnSearchProduct.addEventListener('click', function(e) {
			Ti.API.info('Nieuwe product: ' + nameProduct.value)
		});

		addProductWin.add(nameProduct);
		addProductWin.add(btnSearchProduct);

		//
		// Producten op lijst
		//
		var data = [Ti.UI.createTableViewRow({
			title : 'Tomaten',
			hasChild : true
		}), Ti.UI.createTableViewRow({
			title : 'Kip',
			hasChild : true
		}), Ti.UI.createTableViewRow({
			title : 'Choco',
			hasChild : true
		})];

		var tableview = Titanium.UI.createTableView({
			data : data,
			backgroundImage : 'img/bg.png',
			scrollable : false,
			fullscreen : false,
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED
		});
		inhoudlijstjeWindow.add(tableview);

		//
		// Details lijstje tonen
		//
		
	
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
