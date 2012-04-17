(function() {

	Smart.ui.createAddLijstjeWindow = function() {
		var addWin = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			backgroundImage : 'img/bg.png',
			layout : 'vertical'
		});
		var lblAddTitle = Titanium.UI.createLabel({
			text : 'Nieuw lijstje',
			color : '#fff',
			font : FontTitle
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

		addWin.add(lijstNaam);
		addWin.add(btnCreateLijstje);
		
		btnCreateLijstje.addEventListener('click', function(e) {
			if(lijstNaam.value != '') {
				addLijst();
			} else {
				alert('Gelieve een naam in te vullen.');
			}
		});
		
		function addLijst() {
			var createReq = Titanium.Network.createHTTPClient();
			createReq.open("POST", "http://localhost/SmartScan/post_addlijst.php");
			
			var params = {
				name : lijstNaam.value,
				user_id : Titanium.App.userId
			};
			Ti.API.info('Naam: '+params.name);
			Ti.API.info('Id: '+params.user_id);
			
			createReq.onload = function() {
				try {
					var json = this.responseText;
					Ti.API.info('JSON: '+json);
					var response = JSON.parse(json);
					
					if(response.add === true) {
						Titanium.API.info(response);
						alert('Lijst is toegevoegd aan databank.');
						
						Smart.navGroup.open(Smart.ui.createAddProductWindow({
							animated : false
						}));
					} else {
						alert('Lijst bestaat al. Kies een andere naam.');
					}
				} catch(e) {
					alert(e);
				}
			};
			//Databank niet ok (path, MAMP,...)
			createReq.onerror =function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			};
			createReq.send(params);
		};
		
		return addWin;
	};
})();
