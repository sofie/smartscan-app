//////////////////////////////////////////////////////////////////////////////////////////////////
/// Gebruiker maakt account aan, als hij er nog geen heeft										//
//////////////////////////////////////////////////////////////////////////////////////////////////

(function() {
	var navWindow;

	Smart.ui.createAccountWin = function() {
		var registerWin = Titanium.UI.createWindow(style.Window);
		
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text : 'Mijn account'
		}));
		registerWin.setTitleControl(lblTitle);
		
		navWindow = Ti.UI.createWindow();
		Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : registerWin
		});
		navWindow.add(Smart.navGroup);

		//
		// back button
		//
		var backButton = Titanium.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Smart.ui.createLoginWindow();
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

		var viewRegister = Titanium.UI.createView(style.inputFieldRegister);
		viewScrollRegister.add(viewRegister);

		var userEmail = Titanium.UI.createTextField(Smart.combine(style.inputFieldNoBg,{
			top : 7,
			hintText : 'Email',
			keyboardType : Titanium.UI.KEYBOARD_EMAIL
		}));
		viewRegister.add(userEmail);
		var password1 = Titanium.UI.createTextField(Smart.combine(style.inputFieldNoBg,{
			top : 54,
			hintText : 'Wachtwoord',
			passwordMask : true
		}));
		viewRegister.add(password1);

		var password2 = Titanium.UI.createTextField(Smart.combine(style.inputFieldNoBg,{
			top : 101,
			hintText : 'Herhaal wachtwoord',
			passwordMask : true

		}));
		viewRegister.add(password2);

		var userName = Titanium.UI.createTextField(Smart.combine(style.inputFieldNoBg,{
			top : 148,
			hintText : 'Gebruikersnaam'
		}));
		viewRegister.add(userName);
		
		var scanKaartBtn = Titanium.UI.createButton(Smart.combine(style.scanKaartButton,{
			top:230
		}));
		registerWin.add(scanKaartBtn);

		var registerBtn = Titanium.UI.createButton(style.registerButton);
		registerWin.add(registerBtn);
		
		scanKaartBtn.addEventListener('click', function() {
			Ti.include("/config/barcode.js");
			Ti.API.debug(JSON.stringify(config));
			TiBar.scan({
				configure : config,
				success : function(data) {
					Ti.App.barcode = data.barcode;
					
					if(data && data.barcode) {
						Ti.API.info("Barcode: " + data.barcode + ", symbol: " + data.symbology);
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
					Titanium.App.userId = response.userid;

					Ti.API.info("Id:"+Titanium.App.userId);
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
						if(Ti.App.localonline==="local"){
							createReq.open("POST", "http://localhost/SmartScan/post_register.php");
						}else{
							createReq.open("POST","http://sofiehendrickx.eu/SmartScan/post_register.php");
						}	
						
						var params = {
							userPassword : password1.value,
							userEmail : userEmail.value,
							userName : userName.value,
							barcode:Ti.App.barcode
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
