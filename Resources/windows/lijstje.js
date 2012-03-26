(function() {

	Smart.ui.createLijstjeWindow = function() {
		var lijstjeWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false
		});
		var lblTitle = Titanium.UI.createLabel({
			text : 'Mijn lijstjes',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		lijstjeWindow.setTitleControl(lblTitle);

		//
		//Add lijstje button (rightNavButton)
		//
		var addButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_add.png",
			width : 37,
			height : 35
		});
		addButton.addEventListener('click', function(ee) {

			Smart.navGroup.open(Smart.ui.createAddLijstjeWindow({
				animated : false
			}));
		});

		lijstjeWindow.rightNavButton = addButton;

		//
		// Bestaande lijstjes van gebruiker
		//

		getLists();
		function getLists() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/SmartScan/get_lists.php");
			var params = {
				userId : Titanium.App.userId
			};
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var lists = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(lists.getList == false) {
						Titanium.API.info('Geen links');
						var lblNoLinks = Titanium.UI.createLabel({
							top : 70,
							text : 'Er zijn nog geen links. Maak 1 aan.',
							//font : FontNormal,
							//color : '#AC3724',
							left : 30,
							right : 30,
							width : 300,
							height : 'auto'
						});
						lijstjeWindow.add(lblNoLinks);

					} else {

						for(var i = 0; i < lists.length; i++) {
							var lijstid = lists[i].listId;
							var lijstnaam = lists[i].lijstNaam;

							var row = Ti.UI.createTableViewRow({
								height : 35
							});

							var name = Ti.UI.createLabel({
								text : lijstnaam,
								left : 10,
								width : 'auto',
								height : 'auto',
								textAlign : 'left',
								color : '#474240',
								font : {
									fontFamily : 'Bree serif'
								}
							});

							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLists = Titanium.UI.createTableView({
							top : 0,
							left : 0,
							right : 0,
							bottom : 64,
							data : data,

							backgroundImage : 'img/bg.png',
							style : Titanium.UI.iPhone.TableViewStyle.GROUPED
						});
						lijstjeWindow.add(listLists);

						//Open detail van window
						/*listLists.addEventListener('click', function(e) {
						 Titanium.App.selectedIndex = lists[e.index].linkId;
						 Titanium.App.selectedNaam = lists[e.index].linkNaam;
						 Titanium.App.selectedProd1 = lists[e.index].productNaam;
						 Smart.navGroup.open(Smart.ui.createDetailWindow(), {
						 animated : false
						 });
						 });*/
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

		return lijstjeWindow;
	};
})();
