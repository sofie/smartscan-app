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
				animated : false
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
			Titanium.App.fireEvent('app:listclicked', {
				action : 'Inhoud lijst'
			});
			Smart.navGroup.open(Smart.ui.createLijstjeInhoudWindow({
				title : e.rowData.title,
				barImage : 'img/header.png',
				fullscreen : false
			}), {
				animated : false
			});

		});
		
		//
		// Add lijstje window
		//
		var addWin = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			backgroundImage:'img/bg.png',
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

		//Backbutton
		var backButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addWin, {
				animated : false
			});
		});
		addWin.leftNavButton = backButton;
		
		
		//Inhoud add lijstje window
		var lijstNaam = Titanium.UI.createTextField({
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
			backgroundImage : 'img/btn_maken.png',
			width : 100,
			height : 42,
			right : 20,
			top : 15
		});

		addWin.add(nameLijstje);
		addWin.add(btnCreateLijstje);
		
		var createReq = Titanium.Network.createHTTPClient({
			onload : function() {
				var json = this.responseText;
				var response = JSON.parse(json);
							
				if(response.add == true) {
					alert('Lijst is toegevoegd aan databank.');
				} else {
					alert('Lijst bestaat al. Kies een andere naam.');
				}
			},
			
			//Databank niet ok (path, MAMP,...)
			onerror : function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			},
			timeout : 5000
		});


		btnCreateLijstje.addEventListener('click', function(e) {
			if(nameLijstje.value != '') {
				createReq.open("POST", "http://localhost/SmartScan/post_addlijst.php");
				var params = {
					lijstNaam : lijstNaam.value,
					message:'Niet ok'
				};
				createReq.send(params);
			}else{
				alert('Gelieve een naam in te vullen.');
			}
		});
		
		
		return lijstjeWindow;
	};
})();
