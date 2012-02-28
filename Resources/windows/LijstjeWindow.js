(function() {

	Smart.ui.createLijstjeWindow = function() {
		var lijstjeWindow = Titanium.UI.createWindow({
			title : 'Mijn lijstjes',
			barImage : 'img/header.png',
			fullscreen : false
		});

		//
		// Bestaande lijstjes van gebruiker
		//
		var data = [Ti.UI.createTableViewRow({
			title : 'Lijstje van de bomma',
			hasChild : true
		}), Ti.UI.createTableViewRow({
			title : 'Lijstje van elke week',
			hasChild : true
		}), Ti.UI.createTableViewRow({
			title : 'Toiletpapier,...',
			hasChild : true
		})];
		var tableview = Titanium.UI.createTableView({
			data : data,
			backgroundImage : 'img/bg.png',
			scrollable : false,
			fullscreen : false,
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED
		});
		lijstjeWindow.add(tableview);

		//
		// Details lijstje tonen
		//

		tableview.addEventListener('click', function(e) {
			Titanium.API.info('Detail: ' + e.rowData.title);
			Smart.navGroup.open(Titanium.UI.createWindow({
				title : e.rowData.title,
				barImage : 'img/header.png',
				fullscreen : false,
			}));
			/*
			 Smart.navGroup.open(Smart.ui.createNieuwLijstjeWindow({
			 title : e.rowData.title
			 }), {
			 animated : true
			 });
			 */
		});
		//
		// Add lijstje window
		//
		var addWin = Titanium.UI.createWindow({
			title : 'Nieuw lijstje',
			barImage : 'img/header.png',
			layout : 'vertical'
		});

		var nameLijstje = Titanium.UI.createTextField({
			color : '#888',
			top : 10,
			left : 20,
			right : 20,
			height : 40,
			hintText : 'Nieuw boodschappenlijstje',
			font : {
				fontSize : 15
			},
			opacity : 0.65,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		});
		
		var btnCreateLijstje = Titanium.UI.createButton({
			backgroundImage : 'img/btn_maak.png',
			width : 100,
			height : 42,
			right : 20,
			top : 15
		});
		btnCreateLijstje.addEventListener('click', function(e) {
			Ti.API.info('Nieuwe lijst: ' + nameLijstje.value)
		});

		addWin.add(nameLijstje);
		addWin.add(btnCreateLijstje);

		var addButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_add.png",
			width : 37,
			height : 35
		});
		addButton.addEventListener('click', function() {
			Smart.navGroup.open(addWin, {
				animated : true
			});
		});
		lijstjeWindow.rightNavButton = addButton;

		return lijstjeWindow;
	};
})();