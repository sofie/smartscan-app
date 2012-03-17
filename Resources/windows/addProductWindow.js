(function() {

	Smart.ui.createAddProductWindow = function() {
		var addProductWin = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			layout : 'vertical',
			fullscreen:false
		});
		var lblAddTitle = Titanium.UI.createLabel({
			text : 'Nieuwe koppeling',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		addProductWin.setTitleControl(lblAddTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addProductWin, {
				animated : false
			});
		});
		addProductWin.leftNavButton = backButton;

		//
		//Inhoud window
		//
		var lijstjeNaam = Titanium.UI.createTextField({
			color : '#888',
			top : 10,
			left : 20,
			right : 20,
			height : 40,
			hintText : 'Naam Lijstje',
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
			backgroundImage : 'img/btn_search.png',
			width : 43,
			height : 42,
			right : 20,
			top : 10
		});
		
		/*var createReq = Titanium.Network.createHTTPClient({
			onload : function() {
				var json = this.responseText;
				var response = JSON.parse(json);
							
				if(response.add == true) {
					alert('Lijstje is toegevoegd aan databank.');
				} else {
					alert('Lijstje bestaat al.');
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
			if(linkNaam.value != '') {
				//createReq.open("POST", "http://localhost/smartscan/post_addlijstje.php");
				var params = {
					linkNaam : linkNaam.value,
					message:'Niet ok'
				};
				createReq.send(params);
			}else{
				alert('Gelieve een naam in te vullen.');
			}
		});*/

		addProductWin.add(lijstjeNaam);
		//addProductWin.add(btnCreateLijstje);
		
		return addProductWin;
	};
})();
