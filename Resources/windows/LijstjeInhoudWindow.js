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
			Smart.navGroup.open(Smart.ui.createDetailProductWindow({
				title : e.rowData.title,
				barImage : 'img/header.png',
				fullscreen : false
			}),{animated:false});
		});
		return inhoudlijstjeWindow;
	};
})();
