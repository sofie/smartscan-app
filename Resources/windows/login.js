(function() {
	Smart.ui.createLoginWindow = function() {
		var navWindow;

		var loginWin = Titanium.UI.createWindow(Smart.combine(style.Window, {
			tabBarHidden : true,
			modal : true,
			layout : 'vertical'
		}));

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
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
		var scanKaartBtn = Titanium.UI.createButton(style.scanKaartButton);
		loginWin.add(scanKaartBtn);

		var viewLogin = Titanium.UI.createView(style.bgLoginTextField);

		var userEmail = Titanium.UI.createTextField(Smart.combine(style.inputFieldNoBg, {
			top : 7,
			hintText : 'Email',
			keyboardType : Titanium.UI.KEYBOARD_EMAIL
		}));
		viewLogin.add(userEmail);

		var userPassword = Titanium.UI.createTextField(Smart.combine(style.inputFieldNoBg, {
			top : 54,
			hintText : 'Wachtwoord',
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

		/*
		 * Login via scannen
		 */
		var TiBar = require('tibar');
		Ti.API.info("module is => " + TiBar);

		var allConfigWithDefaults = {
			classType : [{
				"ZBarReaderController" : true
			}],
			sourceType : [{
				"Library" : false
			}, {
				"Camera" : false
			}, {
				"Album" : true
			}],
			cameraMode : [{
				"Default" : true
			}],
			config : {
				"showsCameraControls" : true,
				"showsZBarControls" : true,
				"tracksSymbols" : true,
				"enableCache" : true,
				"showsHelpOnFail" : true,
				"takesPicture" : false
			},
			symbol : {
				"QR-Code" : false,
				"CODE-128" : false,
				"CODE-39" : false,
				"I25" : false,
				"DataBar" : false,
				"DataBar-Exp" : false,
				"EAN-13" : true,
				"EAN-8" : true,
				"UPC-A" : false,
				"UPC-E" : false,
				"ISBN-13" : false,
				"ISBN-10" : false
			}
		};
		scanKaartBtn.addEventListener('click', function() {
			var config = {};
			for(var section in allConfigWithDefaults) {
				if( typeof allConfigWithDefaults[section] === 'object' && allConfigWithDefaults[section] instanceof Array) {
					for(var itemix in allConfigWithDefaults[section]) {
						for(var labelname in allConfigWithDefaults[section][itemix]) {

							if(allConfigWithDefaults[section][itemix][labelname]) {
								config[section] = labelname;
							}
						}
					}
				} else {
					config[section] = allConfigWithDefaults[section];
				}
			}

			Ti.API.debug(JSON.stringify(config));
			TiBar.scan({
				configure : config,
				success : function(data) {
					Ti.App.userBarcode = data.barcode;
					loginBarcode();
					Ti.API.info('TiBar success callback!');
					if(data && data.barcode) {
						Ti.API.info("Barcode: " + data.barcode + ", symbol: " + data.symbology);
						/*Ti.UI.createAlertDialog({
						 title : "Scan result",
						 message : "Inloggen gelukt."
						 }).show();*/
					}
				},
				cancel : function() {
					Ti.API.info('TiBar cancel callback!');
				},
				error : function() {
					Ti.API.info('TiBar error callback!');
				}
			});

		});
		function loginBarcode() {
			var loginReq = Titanium.Network.createHTTPClient();
			loginReq.open("POST", "http://localhost/SmartScan/post_authBarcode.php");
			loginReq.timeout = 5000;

			var params = {
				barcode : Ti.App.userBarcode,
			};

			loginReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					if(response.logged == true) {
						Titanium.App.userId = response.id;

						loginWin.close({
							animated : false
						});
						Titanium.API.info(this.responseText);
						loginWin.close({
							animated : false
						});
						mainWin = Smart.ui.createApplicationMainWin();

					} else {
						var alertDialog = Ti.UI.createAlertDialog({
							title : 'Login',
							message : 'Onjuiste login. Personeelsnummer staat op achterkant van personeelskaart.',
							buttonNames : ['OK']
						});
						alertDialog.show();
					}
				} catch(e) {
					alert(e);
				}
			};
			loginReq.onerror = function(e) {
				var alertDialog = Ti.UI.createAlertDialog({
					title : 'Login',
					message : 'Kan niet inloggen. Controleer uw internetverbinding.',
					buttonNames : ['OK']
				});
				alertDialog.show();
				//personeelNummer.blur();

				//alert('Er is iets mis met de databank.');
			}

			loginReq.send(params);
		};
		
		//
		//Login via form
		//
		function loginForm() {
			var loginReq = Titanium.Network.createHTTPClient();
			loginReq.open("POST", "http://localhost/SmartScan/post_auth.php");
			loginReq.timeout = 5000;
			var params = {
				userEmail : userEmail.value,
				userPassword : userPassword.value
			};
			loginReq.onload = function() {
				var json = this.responseText;
				var response = JSON.parse(json);

				Titanium.API.info(this.responseText);

				if(response.logged == true) {
					Titanium.App.userId = response.userId;

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
			};
			//Databank niet ok (path, MAMP,...)
			loginReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			};

			loginReq.send(params);

		};
		//verbinding met phpfile en database
		loginBtn.addEventListener('click', function() {
			if(userEmail.value != '' && userPassword.value != '') {
				loginForm();
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
