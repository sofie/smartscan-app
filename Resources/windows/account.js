(function() {
	var navWindow;

	Smart.ui.createAccountWin = function() {
		var registerWin = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			backgroundImage : 'img/bg.png'
		});
		var lblTitle = Titanium.UI.createLabel({
			text : 'Mijn account',
			color : '#fff',
			font : FontTitle
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
		var viewScrollRegister = Titanium.UI.createScrollView({
			contentWidth : 'auto',
			contentHeight : 'auto',
			top : 0,
			showVerticalScrollIndicator : true
		});
		registerWin.add(viewScrollRegister);

		var viewRegister = Titanium.UI.createView({
			backgroundImage : '/img/input_register.png',
			width : 277,
			height : 188,
			top : 20,
			left : 'auto',
			right : 'auto',
			opacity : 0.7
		});
		viewScrollRegister.add(viewRegister);

		var userEmail = Titanium.UI.createTextField({
			color : '#474240',
			top : -3,
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
			top : 47,
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
			top : 97,
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
			top : 140,
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

		var registerBtn = Titanium.UI.createButton({
			backgroundImage : '/img/btn_registreer.png',
			top : 230,
			right : 20,
			width : 99,
			height : 37
		});
		registerWin.add(registerBtn);

		/*
		var viewSpace = Titanium.UI.createView({
		top:340,
		height:100,
		left:30,
		width:100
		});
		registerWin.add(viewSpace);
		*/
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

		var createReq = Titanium.Network.createHTTPClient({
			onload : function() {
				var json = this.responseText;
				var response = JSON.parse(json);

				if(response.registered == true) {
					registerWin.close({
						animated : false
					});
					mainWin = Smart.ui.createApplicationMainWin();
					mainWin.open({
						animated : false
					});
				} else {
					alert('User bestaat al.');
				}
			},
			//Databank niet ok (path, MAMP,...)
			onerror : function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			},
			timeout : 5000
		});

		registerBtn.addEventListener('click', function(e) {
			if(password1.value != '' && password2.value != '' && userEmail.value != '' && userName.value != '') {
				if(password1.value != password2.value) {
					alert("Uw wachtwoorden komen niet overeen.");
				} else {
					if(!checkemail(userEmail.value)) {
						alert("Gelieve een geldig e-mailadres in te voeren.");
					} else {
						createReq.open("POST", "http://localhost/SmartScan/post_register.php");
						var params = {
							userPassword : password1.value,
							userEmail : userEmail.value,
							userName : userName.value
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
