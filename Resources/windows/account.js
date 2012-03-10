(function() {
	var navWindow;

	Smart.ui.createAccountWin = function() {
		var registerWin = Ti.UI.createWindow({ //mainWindow
			barImage : 'img/header.png',
			fullscreen : false
		});
		var lblTitle = Titanium.UI.createLabel({
			text : 'Mijn account',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		registerWin.setTitleControl(lblTitle);

		navWindow = Ti.UI.createWindow();
		Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : registerWin
		});
		navWindow.add(Smart.navGroup);
		
		//
		// back button/logout
		//
		var backButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(registerWin, {
				animated : true
			});
		});
		registerWin.leftNavButton = backButton;
		
		/*var lblName = Titanium.UI.createLabel({
			text:'Naam: ',
			left:20,
			top:0
		});
		mainWindow.add(lblName);*/
		
		//
		//Registreren
		//
		var viewRegister = Titanium.UI.createView({
			backgroundImage : '/img/inputRegistreer.png',
			width : 277,
			height : 283,
			top : 20,
			left : 'auto',
			right : 'auto',
			opacity : 0.7
		});
		
		var userName = Titanium.UI.createTextField({
		color : '#474240',
		top : 0,
		left : 20,
		width : 260,
		height : 50,
		hintText : 'Gebruikersnaam',
		autocapitalization : false,
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		keyboardType : Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		
		});
		viewRegister.add(userName);
		
		var password1 = Titanium.UI.createTextField({
		color : '#474240',
		top : 47,
		left : 20,
		width : 260,
		height : 50,
		hintText : 'Wachtwoord',
		passwordMask:true, 
		autocapitalization : false,
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		keyboardType : Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		
		});
		viewRegister.add(password1);
		
		
		var password2 = Titanium.UI.createTextField({
		color : '#474240',
		top : 93,
		left : 20,
		width : 260,
		height : 50,
		hintText : 'Herhaal wachtwoord',
		passwordMask:true, 
		autocapitalization : false,
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		keyboardType : Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		
		});
		viewRegister.add(password2);
		
		
		
		var userEmail = Titanium.UI.createTextField({
		color : '#474240',
		top : 140,
		left : 20,
		width : 260,
		height : 50,
		hintText : 'Email',
		autocapitalization : false,
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		keyboardType : Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		
		});
		viewRegister.add(userEmail);
		
		
		var userFirstname = Titanium.UI.createTextField({
		color : '#474240',
		top : 187,
		left : 20,
		width : 260,
		height : 50,
		hintText : 'Voornaam',
		autocapitalization : false,
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		keyboardType : Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		
		});
		viewRegister.add(userFirstname);
		
		
		var userLastname = Titanium.UI.createTextField({
		color : '#474240',
		top : 233,
		left : 20,
		width : 260,
		height : 50,
		hintText : 'Achternaam',
		autocapitalization : false,
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		keyboardType : Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		
		});
		viewRegister.add(userLastname);
		registerWin.add(viewRegister);
		
		var registerBtn = Titanium.UI.createButton({
		backgroundImage : '/img/btn_registreer.png',
		top : 320,
		right : 20,
		width : 99,
		height : 37
		});
		registerWin.add(registerBtn);
		
		navWindow.open();
	}
})();
