(function() {

	Smart.ui.createLijstjeWindow = function() {
		var lijstjeWindow = Titanium.UI.createWindow(style.Window);
		
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text : 'Mijn lijstjes'
		}));
		lijstjeWindow.setTitleControl(lblTitle);

		//
		//Add lijstje button (rightNavButton)
		//
		var addButton = Titanium.UI.createButton(style.addButton);
		addButton.addEventListener('click', function(e) {
			Smart.navGroup.open(Smart.ui.createAddLijstjeWindow(),{
				animated : false
			});
		});

		lijstjeWindow.rightNavButton = addButton;

		//
		// Bestaande lijstjes van gebruiker
		//
		lijstjeWindow.addEventListener('open',function(){
			Ti.API.info('Lijst win open');
			getLists();
		})
		
		function getLists() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/SmartScan/get_lists.php");
			var params = {
				user_id : Titanium.App.userId
			};
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var lists = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(lists.getList == false) {
						Titanium.API.info('Geen lijstjes');
						var lblNoLinks = Titanium.UI.createLabel(Smart.combine(style.textError,{
							top:30,
							text : 'Er zijn nog geen lijstjes. Maak 1 aan.'
						}));
						lijstjeWindow.add(lblNoLinks);

					} else {

						for(var i = 0; i < lists.length; i++) {
							var lijstid = lists[i].lijstId;
							var lijstnaam = lists[i].lijstNaam;

							var row = Ti.UI.createTableViewRow({
								height : 35
							});

							var name = Ti.UI.createLabel(Smart.combine(style.textNormal,{
								text : lijstnaam
							}));

							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLists = Titanium.UI.createTableView(Smart.combine(style.tableView,{
							data : data
						}));
						lijstjeWindow.add(listLists);

						//Open detail van window
						listLists.addEventListener('click', function(e) {
							Titanium.App.selectedLijstje = lists[e.index].lijstId;
							Titanium.App.selectedLijstjeNaam = lists[e.index].lijstNaam;
							Titanium.App.selectedProd1 = lists[e.index].productNaam;
							Smart.navGroup.open(Smart.ui.createLijstjeInhoudWindow(), {
								animated : false
							});
						});
						
						//Delete row
						listLists.addEventListener('delete', function(e) {
							Ti.API.info('DELETE FROM lists WHERE id=' + lists[e.index].lijstId);

							var deleteReq = Titanium.Network.createHTTPClient();
							deleteReq.open("GET", "http://localhost/SmartScan/post_removelist.php");
							deleteReq.timeout = 5000;
							deleteReq.onload = function() {
								try {
									var json = this.responseText;
									var response = JSON.parse(json);
									if(response.remove === true) {
										Titanium.API.info('Remove list: ' + this.responseText);

									} else {
										alert('Lijst kan niet verwijderd worden.');
									}
								} catch(e) {
									alert(e);
								}
							};

							var params = {
								id : lists[e.index].lijstId
							};
							deleteReq.send(params);

						});
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
