(function() {
	Smart.ui.createLoginWindow = function() {
		var navWindow;

		var loginWin = Titanium.UI.createWindow(Smart.combine(style.Window,{
			tabBarHidden : true,
			modal : true,
			layout : 'vertical'
		}));

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text : 'Inloggen'
		}));
		loginWin.setTitleControl(lblTitle);

		//
		//Back/logout button
		//
		var backButton = Titanium.UI.createButton(style.backButton);
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
		var viewLogin = Titanium.UI.createView(style.bgLoginTextField);

		var userEmail = Titanium.UI.createTextField(Smart.combine(style.inputField,{
			top : 7,
			hintText : 'Email',
			keyboardType : Titanium.UI.KEYBOARD_EMAIL
		}));
		viewLogin.add(userEmail);

		var userPassword = Titanium.UI.createTextField(Smart.combine(style.inputField,{
			top : 54,
			hintText : 'Password',
			passwordMask : true
		}));
		viewLogin.add(userPassword);
		loginWin.add(viewLogin);

		var loginBtn = Titanium.UI.createButton(style.loginButton);
		loginWin.add(loginBtn);

		var accountBtn = Titanium.UI.createButton(style.accountButton);
		loginWin.add(accountBtn);

		accountBtn.addEventListener('click', function() {
			loginWin.close({
				animated : false
			});
			Smart.ui.createAccountWin();
		})
		var wrmAccountView = Titanium.UI.createView(style.wrmAccount);
		loginWin.add(wrmAccountView);

		//
		//Login Service
		//
		//request
		var loginReq = Titanium.Network.createHTTPClient({
			onload : function() {
				var json = this.responseText;
				var response = JSON.parse(json);

				Titanium.API.info(this.responseText);

				Titanium.App.userId = response.userId;

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
			if(userEmail.value != '' && userPassword.value != '') {
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
	}
})();
