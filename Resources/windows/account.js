(function() {

	Smart.ui.createAccountWindow = function() {
		var accountWin = Titanium.UI.createWindow(style.Window);

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Mijn account'
		}));
		accountWin.setTitleControl(lblTitle);
		accountWin.addEventListener('open', function() {
			getDetail();
		});

		var logoutButton = Titanium.UI.createButton(style.logoutButton);
		logoutButton.addEventListener('click', function() {
			Smart.ui.createLoginWindow();
		});
		accountWin.add(logoutButton);

		var lblAccount = Titanium.UI.createLabel(Smart.combine(style.textNormal, {
			text : 'Account gegevens',
			left : 20,
			top : -350
		}));
		accountWin.add(lblAccount);
		
		var updateBtn = Titanium.UI.createButton(style.updateButton);
		accountWin.add(updateBtn);
		updateBtn.addEventListener('click',function(){
			updateAccount();
		});

		//////////////////////////////////////////////////////////////////////////////////
		/// Haalt detail op uit databank												//
		//////////////////////////////////////////////////////////////////////////////////
		function getDetail() {
			var getReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				getReq.open("GET", "http://localhost/SmartScan/get_accountDetail.php");
			} else {
				getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_accountDetail.php");
			}
			var params = {
				id : Titanium.App.userId
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);
					if(detail.getItem === false) {
						var lblNoDetail = Titanium.UI.createLabel(Smart.combine(style.textError, {
							text : 'Kan user niet ophalen.',
							top : 30
						}));
						accountWin.add(lblNoDetail);

					} else {

						var email = detail.email;
						var password = detail.password;

						var userEmail = Titanium.UI.createTextField(Smart.combine(style.inputField, {
							top : 50,
							value : email,
							keyboardType : Titanium.UI.KEYBOARD_EMAIL
						}));
						accountWin.add(userEmail);
						var username = Titanium.UI.createTextField(Smart.combine(style.inputField, {
							top : 90,
							value : username
						}));
						accountWin.add(username);

					}

				} catch(e) {
					alert(e);
				}
			}
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send(params);
		};
		//////////////////////////////////////////////////////////////////////////////////
		/// Account gegevens updaten													//
		//////////////////////////////////////////////////////////////////////////////////
		function updateAccount() {
			var getReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				getReq.open("GET", "http://localhost/SmartScan/get_accountDetail.php");
			} else {
				getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_accountDetail.php");
			}
			var params = {
				id : Titanium.App.userId
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);
					if(detail.getItem === false) {
						var lblNoDetail = Titanium.UI.createLabel(Smart.combine(style.textError, {
							text : 'Kan user niet ophalen.',
							top : 30
						}));
						accountWin.add(lblNoDetail);

					} else {

						var email = detail.email;
						var password = detail.password;

						var userEmail = Titanium.UI.createTextField(Smart.combine(style.inputField, {
							top : 50,
							value : email,
							keyboardType : Titanium.UI.KEYBOARD_EMAIL
						}));
						accountWin.add(userEmail);
						var username = Titanium.UI.createTextField(Smart.combine(style.inputField, {
							top : 90,
							value : username
						}));
						accountWin.add(username);

					}

				} catch(e) {
					alert(e);
				}
			}
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send(params);
		};

		return accountWin;
	};
})();
