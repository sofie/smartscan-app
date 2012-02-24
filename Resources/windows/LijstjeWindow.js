(function() {

	Smart.ui.createLijstjeWindow = function() {
		var lijstjeWindow = Titanium.UI.createWindow({
			title : 'Lijstjes',
			barImage : 'img/header.png',
			backgroundImage : 'img/bg.png',
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
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED
		});
		lijstjeWindow.add(tableview);

		//
		// Details lijstje tonen
		//
		
		tableview.addEventListener('click', function(e) {
			Titanium.API.info('Detail: '+e.rowData.title);
			Smart.navGroup.open(Titanium.UI.createWindow({
				title : e.rowData.title
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
			title : 'Add',
			barImage : 'img/header.png',
			backgroundImage : 'img/bg.png',
			layout : 'vertical'
		});

		var nameLijstje = Titanium.UI.createTextField({
			color : '#888',
			top : 10,
			left : 20,
			right : 20,
			height : 40,
			hintText : 'Nieuw boodschappenlijstje',
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		var btnCreateLijstje = Titanium.UI.createButton({
			title : 'Maak lijstje',
			width : 150,
			height : 30,
			right : 20,
			top : 15
		});
		btnCreateLijstje.addEventListener('click',function(e){
			Ti.API.info('Nieuwe lijst: '+nameLijstje.value)
		});
		
		addWin.add(nameLijstje);
		addWin.add(btnCreateLijstje);

		var addButton = Ti.UI.createButton({
			title : '+',
			width : 41,
			height : 31
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

Ti.include('NieuwLijstjeWindow.js');
