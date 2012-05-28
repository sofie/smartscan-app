//////////////////////////////////////////////////////////////////////////////////////////////////
/// Gebruiker maakt boodschappenlijstje aan														//
//////////////////////////////////////////////////////////////////////////////////////////////////

(function() {

	Smart.ui.createAddLijstjeWindow = function() {
		var addWin = Titanium.UI.createWindow(style.Window);

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Nieuw lijstje'
		}));
		addWin.setTitleControl(lblTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addWin, {
				animated : false
			});
		});
		addWin.leftNavButton = backButton;

		//Inhoud add lijstje window
		var lijstNaam = Titanium.UI.createTextField(Smart.combine(style.inputField, {
			top : 10,
			hintText : 'Nieuw boodschappenlijstje'
		}));

		var btnCreateLijstje = Titanium.UI.createButton(Smart.combine(style.makenButton, {
			top : 65
		}));

		addWin.add(lijstNaam);
		addWin.add(btnCreateLijstje);

		btnCreateLijstje.addEventListener('click', function(e) {
			if(lijstNaam.value != '') {
				addLijst();
			} else {
				alert('Gelieve een naam in te vullen.');
			}
		});

		function addLijst() {
			var createReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {
				createReq.open("POST", "http://localhost/SmartScan/post_addlijst.php");
			} else {
				createReq.open("POST", "http://sofiehendrickx.eu/SmartScan/post_addlijst.php");
			}
			var currentTime = new Date();
			var hours = currentTime.getHours();
			var minutes = currentTime.getMinutes();
			var secondes = currentTime.getSeconds();
			var month = currentTime.getMonth() + 1;
			var day = currentTime.getDate();
			var year = currentTime.getFullYear();
			

			var params = {
				name : lijstNaam.value,
				user_id : Titanium.App.userId,
				created : year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + secondes
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					Ti.API.info('JSON: ' + json);
					var response = JSON.parse(json);

					if(response.add === true) {
						Ti.App.naamLijst = lijstNaam.value;
						Ti.API.info('Lijst is toegevoegd aan databank.');

						Smart.navGroup.close(addWin, {
							animated : false
						});

					} else {
						alert('Lijst bestaat al. Kies een andere naam.');
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

		return addWin;
	};
})();
