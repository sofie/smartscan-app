(function() {

	Smart.ui.createStartVanLijstjeWindow = function() {
		var lijstjeWindow = Titanium.UI.createWindow(style.Window);
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Kies lijstje'
		}));
		lijstjeWindow.setTitleControl(lblTitle);

		lijstjeWindow.addEventListener('open', function() {
			Ti.API.info('Lijst win open');
			getLists();
		});
		var lblInstructions=Ti.UI.createLabel({
			
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

					//Er zijn nog geen linken in de databank
					if(lists.getList == false) {
						Titanium.API.info('Geen lijstjes');
						var lblNoLinks = Titanium.UI.createLabel(Smart.combine(style.textError, {
							top : 30,
							text : 'Je hebt nog geen lijstjes.'
						}));
						lijstjeWindow.add(lblNoLinks);

					} else {

						for(var i = 0; i < lists.length; i++) {
							var lijstid = lists[i].lijstId;
							var lijstnaam = lists[i].lijstNaam;

							var row = Ti.UI.createTableViewRow(style.row);

							var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : lijstnaam
							}));

							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLists = Titanium.UI.createTableView(Smart.combine(style.tableView, {
							data : data
						}));
						lijstjeWindow.add(listLists);
						
						listLists.addEventListener('click', function(e) {
							Titanium.App.selectedLijstje = lists[e.index].lijstId;
							Titanium.App.selectedLijstjeNaam = lists[e.index].lijstNaam;
							Titanium.App.selectedProd1 = lists[e.index].productNaam;
							Smart.navGroup.open(Smart.ui.createStartVanLijstjeInhoudWindow(), {
								animated : false
							});
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
