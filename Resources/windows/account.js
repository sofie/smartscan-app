(function() {

	Smart.ui.createAccountWindow = function() {
		var accountWin = Titanium.UI.createWindow(style.Window);

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Mijn account'
		}));
		accountWin.setTitleControl(lblTitle);
		accountWin.addEventListener('open', function() {
			getDetail();
			getAankopen();
		});

		var logoutButton = Titanium.UI.createButton(style.logoutButton);
		logoutButton.addEventListener('click', function() {
			Smart.ui.createLoginWindow();
		});
		accountWin.add(logoutButton);

		var lblAccount = Titanium.UI.createLabel(Smart.combine(style.textNormal, {
			text : 'Account gegevens',
			left : 20,
			top : -360
		}));
		accountWin.add(lblAccount);
		var userEmail = Titanium.UI.createTextField(Smart.combine(style.inputField, {
			top : 80,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL
		}));
		accountWin.add(userEmail);
		var username = Titanium.UI.createTextField(Smart.combine(style.inputField, {
			top : 40
		}));
		accountWin.add(username);

		var updateBtn = Titanium.UI.createButton(style.updateButton);
		accountWin.add(updateBtn);
		updateBtn.addEventListener('click', function() {
			updateAccount();
		});

		var lblAankopen = Titanium.UI.createLabel(Smart.combine(style.textNormal, {
			text : 'Aankopen',
			left : 20,
			top : -10
		}));
		accountWin.add(lblAankopen);

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
					Ti.API.info(this.responseText);
					if(detail.getItem === false) {
						var lblNoDetail = Titanium.UI.createLabel(Smart.combine(style.textError, {
							text : 'Kan user niet ophalen.',
							top : 30
						}));
						accountWin.add(lblNoDetail);

					} else {

						var email = detail.email;
						var name = detail.username;
						userEmail.value = email;
						username.value = name;

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
			var createReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				createReq.open("POST", "http://localhost/SmartScan/post_accountDetail.php");
			} else {
				createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_accountDetail.php");
			}
			Ti.API.info(Ti.App.localonline);

			var params = {
				id : Titanium.App.userId,
				email : userEmail.value,
				username : username.value
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					Ti.API.info('JSON: ' + json);
					var response = JSON.parse(json);
					if(response.add === true) {
						Ti.API.info('UPDATE users SET email= '+params.email+' AND username= '+params.username+' WHERE id= '+params.id);
						var alertDialog = Ti.UI.createAlertDialog({
							title : 'Account',
							message : 'Account gegevens aangepast.',
							buttonNames : ['OK']
						});
						alertDialog.show();

					} else {
						alert('Kan niet updaten.');
					}

				} catch(e) {
					alert(e);
				}
			};
			//Databank niet ok (path, MAMP,...)
			createReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			};
			createReq.send(params);
		};

		function getAankopen() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {

				getReq.open("GET", "http://localhost/SmartScan/get_usersession.php");
			} else {
				getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_usersession.php");
			}

			var params = {
				user_id : Titanium.App.userId
			};
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var lists = JSON.parse(this.responseText);
					if(lists.length === 0) {
						Ti.API.info('Geen lists');
					}

					//Er zijn nog geen lijstjes
					if(lists.getList == false) {
						Titanium.API.info('Geen lijstjes');
						var noListLbl = Titanium.UI.createLabel(Smart.combine(style.textError, {
							text : 'Je hebt nog geen aankopen gedaan.',
							top : 215,
							left:12,
							color:'#76746f'
						}));
						accountWin.add(noListLbl);

					} else {

						for(var i = 0; i < lists.length; i++) {
							var startuur = lists[i].startuur;
							var totaal = lists[i].totaal;
							var num_products = lists[i].num_products;

							var jaar = startuur.substr(0, 4);
							var maand = startuur.substr(5, 2);
							var dag = startuur.substr(8, 2);
							var prettyDate = dag + '-' + maand + '-' + jaar;

							var row = Ti.UI.createTableViewRow(style.row);

							var uur = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : prettyDate,
								top : -13
							}));
							var aantal = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : num_products+' artikelen',
								top : 18,
								font : {
									fontSize : 10
								},
								opacity : 0.5
							}));
							var tot = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : '€ '+totaal,
								top : -13,
								textAlign : 'right',
								right : 60
							}));

							row.add(uur);
							row.add(aantal);
							row.add(tot);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLists = Titanium.UI.createTableView(Smart.combine(style.tableView, {
							data : data,
							top:215,
							bottom:55
						}));
						accountWin.add(listLists);

					}

				} catch(e) {
					alert(e);
				}
			};
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send(params);
		}

		return accountWin;
	};
})();
