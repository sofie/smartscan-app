(function() {
	var navWindow;

	Smart.ui.createAccountWin = function() {
		var registerWin = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			backgroundImage:'img/bg.png'
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
			registerWin.close();
			Ti.App.fireEvent('app:accountclose', {
				action : 'Account window close'
			});
		});
		registerWin.leftNavButton = backButton;

		//
		//Registreren - interface
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
		registerWin.add(viewRegister);
		
		var userEmail = Titanium.UI.createTextField({
			color : '#474240',
			top : 0,
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
		var password1 = Titanium.UI.createTextField({
			color : '#474240',
			top : 50,
			left : 20,
			width : 260,
			height : 50,
			hintText : 'Wachtwoord',
			passwordMask : true,
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
			top : 100,
			left : 20,
			width : 260,
			height : 50,
			hintText : 'Herhaal wachtwoord',
			passwordMask : true,
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
	
		var userName = Titanium.UI.createTextField({
			color : '#474240',
			top : 150,
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
	
		
		/*
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
		*/
		var registerBtn = Titanium.UI.createButton({
			backgroundImage : '/img/btn_registreer.png',
			top : 320,
			right : 20,
			width : 99,
			height : 37
		});
		registerWin.add(registerBtn);

		//
		//registeren
		//
		var testresults;

		function checkemail(emailAddress) {
			var str = emailAddress;
			var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if(filter.test(str)) {
				testresults = true;
			} else {
				testresults = false;
			}
			return (testresults);
		};

		var createReq = Titanium.Network.createHTTPClient();

		createReq.onload = function() {
			var json = this.responseText;
			var response = JSON.parse(json);
			if(response.registered == true) {
				registerWin.close({animated:false});
				mainWin = Smart.ui.createApplicationMainWin();
				mainWin.open({animated:false});
	
			} else {
				Titanium.API.info('Alert: '+response.message);
				alert(response.message);
			}
		};

		registerBtn.addEventListener('click', function(e) {
			if(password1.value != '' && password2.value != '' && userEmail.value != '' && userName.value!='') {
			//if(userName.value != '' && password1.value != '' && password2.value != '' && userFirstname.value != '' && userLastname.value != '' && userEmail.value != '') {
				if(password1.value != password2.value) {
					alert("Uw wachtwoorden komen niet overeen.");
				} else {
					if(!checkemail(userEmail.value)) {
						alert("Gelieve een geldig e-mailadres in te voeren.");
					} else {
						//registerBtn.enabled = false;
						//registerBtn.opacity = 0.3;
						createReq.open("POST", "http://localhost/SmartScan/post_register.php");
						var params = {
							//userPassword : Ti.Utils.md5HexDigest(password1.value),
							userPassword : password1.value,
							userEmail : userEmail.value,
							userName: userName.value
						};
						createReq.send(params);
					}
				}
			} else {
				alert("Alle velden zijn verplicht.");
			}
		});

		navWindow.open();
	}
})();
