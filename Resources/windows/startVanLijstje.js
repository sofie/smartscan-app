(function() {

	Smart.ui.createStartVanLijstjeWindow = function() {
		var lijstjeWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false
		});
		var lblTitle = Titanium.UI.createLabel({
			text : 'Kies lijstje',
			color : '#fff',
			font : FontTitle
		});
		lijstjeWindow.setTitleControl(lblTitle);
		

		//
		// Bestaande lijstjes van gebruiker
		//
		var data = [Ti.UI.createTableViewRow({
			title : 'Lijstje van de bomma',
			hasChild : true
		}), Ti.UI.createTableViewRow({
			title : 'Lijstje van elke week',
			hasChild : true
		}), Ti.UI.createTableViewRow({
			title : 'Toiletpapier,...',
			hasChild : true
		})];

		var tableview = Titanium.UI.createTableView({
			data : data,
			backgroundImage : 'img/bg.png',
			scrollable : false,
			fullscreen : false,
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED
		});
		lijstjeWindow.add(tableview);

		
		return lijstjeWindow;
	};
})();
