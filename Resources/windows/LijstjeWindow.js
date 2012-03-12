(function() {

	Smart.ui.createLijstjeWindow = function() {
		var lijstjeWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false
		});
		var lblTitle = Titanium.UI.createLabel({
			text : 'Mijn lijstjes',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		lijstjeWindow.setTitleControl(lblTitle);
		
		//
		//Add lijstje button (rightNavButton)
		//
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
			Titanium.App.fireEvent('app:listclicked',{action:'Inhoud lijst'});
			Smart.navGroup.open(Smart.ui.createLijstjeInhoudWindow({
				title : e.rowData.title,
				barImage : 'img/header.png',
				fullscreen : false
			}));
		});
		
		//
		// Add lijstje window
		//
		var addWin = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			layout : 'vertical'
		});
		var lblAddTitle = Titanium.UI.createLabel({
			text : 'Nieuw lijstje',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		addWin.setTitleControl(lblAddTitle);

		var nameLijstje = Titanium.UI.createTextField({
			color : '#888',
			top : 10,
			left : 20,
			right : 20,
			height : 40,
			hintText : 'Nieuw boodschappenlijstje',
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

		var btnCreateLijstje = Titanium.UI.createButton({
			backgroundImage : 'img/btn_maak.png',
			width : 100,
			height : 42,
			right : 20,
			top : 15
		});
		

		var lbLijst= Titanium.UI.createLabel({
			text:'Lijst',
			left:20,
			width:100,
			top:20
		});
		
		addWin.add(nameLijstje);
		addWin.add(btnCreateLijstje);
		addWin.add(lbLijst);
		
		btnCreateLijstje.addEventListener('click', function(e) {
			if(nameLijstje.value==""){
				lbLijst.text='Nieuwe lijstjes hebben een naam nodig.';
			}else{
				Ti.API.info('Nieuwe lijst: ' + nameLijstje.value);
				lbLijst.text=nameLijstje.value
			}
		});

		

		
		return lijstjeWindow;
	};
})();
