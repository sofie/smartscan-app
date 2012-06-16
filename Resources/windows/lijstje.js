//////////////////////////////////////////////////////////////////////////////////////
/// Lijstjes van gebruiker ophalen uit databank										//
//////////////////////////////////////////////////////////////////////////////////////
(function() {

	Smart.ui.createLijstjeWindow = function() {
		var lijstjeWindow = Titanium.UI.createWindow(style.Window);

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Mijn lijstjes'
		}));
		lijstjeWindow.setTitleControl(lblTitle);
		//
		//Add lijstje button (rightNavButton)
		//
		var addButton = Titanium.UI.createButton(style.addButton);
		addButton.addEventListener('click', function(e) {
			Smart.navGroup.open(Smart.ui.createAddLijstjeWindow(), {
				animated : false
			});
		});

		lijstjeWindow.rightNavButton = addButton;

		//
		// Bestaande lijstjes van gebruiker
		//
		lijstjeWindow.addEventListener('open', function() {
			Ti.API.info('Lijst win open');
			getLists();
		})
		function getLists() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline === "local") {

				getReq.open("GET", "http://localhost/SmartScan/get_lists.php");
			} else {
				getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_lists.php");
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
					if(lists.getList === false) {
						Titanium.API.info('Geen lijstjes');
						var noListView = Titanium.UI.createView({
							backgroundImage : "/img/no_list.png",
							width : 229,
							height : 376,
							right : 10,
							top : 5
						});
						lijstjeWindow.add(noListView);

					} else {

						for(var i = 0; i < lists.length; i++) {
							var lijstid = lists[i].lijstId;
							var lijstnaam = lists[i].lijstNaam;
							var created = lists[i].created;

							var jaar = created.substr(0, 4);
							var maand = created.substr(5, 2);
							var dag = created.substr(8, 2);
							var prettyDate = dag + '-' + maand + '-' + jaar;

							var row = Ti.UI.createTableViewRow(style.row);

							var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : lijstnaam,
								top : -13
							}));
							var created = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : prettyDate,
								top : 18,
								font : {
									fontSize : 10
								},
								opacity : 0.5
							}));

							row.add(name);
							row.add(created);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLists = Titanium.UI.createTableView(Smart.combine(style.tableView, {
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
							if(Ti.App.localonline === "local") {
								deleteReq.open("GET", "http://localhost/SmartScan/post_removelist.php");
							} else {
								deleteReq.open("GET", "http://sofiehendrickx.eu/SmartScan/post_removelist.php");
							}

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
								id : lists[e.index].lijstId,
								user_id : Titanium.App.userId
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
