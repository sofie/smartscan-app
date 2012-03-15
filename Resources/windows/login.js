(function() {
	var navWindow;

	var loginWin = Titanium.UI.createWindow({
		barImage : 'img/header.png',
		tabBarHidden : true,
		modal : true,
		layout : 'vertical',
		navBarHidden : false,
		backgroundImage : 'img/bg.png'
	});

	var lblTitle = Titanium.UI.createLabel({
		text : 'Inloggen',
		color : '#fff',
		font : {
			fontFamily : 'Bree Serif',
			fontSize : 24
		}
	});
	loginWin.setTitleControl(lblTitle);

	//
	//Back/logout button
	//
	var backButton = Titanium.UI.createButton({
		backgroundImage : "img/btn_back.png",
		width : 57,
		height : 35
	});
	backButton.addEventListener('click', function() {
		//navWindow.close();
	});
	loginWin.leftNavButton = backButton;

	//
	//Eerste scherm
	//
	navWindow = Titanium.UI.createWindow({
		exitOnClose : true,
		navBarHidden : false
	});
	Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
		window : loginWin
	});
	navWindow.add(Smart.navGroup);

	navWindow.open({
		transition : Titanium.UI.iPhone.AnimationStyle.NONE
	});

	//
	//Inloggen
	//
	var viewLogin = Titanium.UI.createView({
		backgroundImage : '/img/inputLogin.png',
		width : 280,
		height : 100,
		top : 20,
		left : 'auto',
		right : 'auto',
		opacity : 0.7
	});

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
	viewLogin.add(userEmail);

	var userPassword = Titanium.UI.createTextField({
		color : '#474240',
		top : 50,
		width : 260,
		left : 20,
		height : 50,
		hintText : 'Password',
		passwordMask : true,
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
	});
	viewLogin.add(userPassword);
	loginWin.add(viewLogin);

	var loginBtn = Titanium.UI.createButton({
		backgroundImage : '/img/btn_login.png',
		top : 25,
		right : 20,
		width : 90,
		height : 42
	});
	loginWin.add(loginBtn);

	var accountBtn = Titanium.UI.createButton({
		backgroundImage : '/img/btn_account.png',
		top : -42,
		left : 20,
		width : 182,
		height : 42
	});
	loginWin.add(accountBtn);

	accountBtn.addEventListener('click', function() {
		loginWin.close({
			animated : false
		});
		Smart.ui.createAccountWin();
	})
	var wrmAccountView = Titanium.UI.createView({
		width : 320,
		height : 136,
		top : 100,
		opacity : 0.5,
		backgroundImage : '/img/wrmAccount.png'
	});
	loginWin.add(wrmAccountView);

	//
	//Login Service
	//
	//request
	var loginReq = Titanium.Network.createHTTPClient({
		onload : function() {
			var json = this.responseText;
			var response = JSON.parse(json);
			
			if(response.logged == true) {
				loginWin.close({
					animated : false
				});
				mainWin = Smart.ui.createApplicationMainWin();
				mainWin.open({
					animated : false
				});

			} else {
				alert(response.message);
			}
		},
		//Databank niet ok (path, MAMP,...)
		onerror : function(e) {
			Ti.API.info("TEXT onerror:   " + this.responseText);
			alert('Er is iets mis met de databank.');
		},
		timeout : 5000
	});

	//verbinding met phpfile en database
	loginBtn.addEventListener('click', function() {
		if(userEmail.value != '') {
			loginReq.open("POST", "http://localhost/SmartScan/post_auth.php");
			var params = {
				userEmail : userEmail.value,
				userPassword : userPassword.value
			};
			loginReq.send(params);

		} else {
			alert("Gelieve alle velden in te vullen.");
		}

	});
	//
	//Logout
	//
	Titanium.App.addEventListener('app:logoutback', function(e) {
		userEmail.value = '';
		userPassword.value = '';
		loginWin.open({
			animated : false
		});
	});
	//Back event account window
	Titanium.App.addEventListener('app:accountclose', function(e) {
		userEmail.value = '';
		userPassword.value = '';
		loginWin.open({
			animated : false
		});
	});
})();
