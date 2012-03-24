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

		//
		// Details lijstje tonen
		//
		tableview.addEventListener('click', function(e) {
			Titanium.App.fireEvent('app:listclicked', {
				action : 'Inhoud lijst'
			});
			Smart.navGroup.open(Smart.ui.createLijstjeInhoudWindow({
				title : e.rowData.title,
				barImage : 'img/header.png',
				fullscreen : false
			}), {
				animated : false
			});

		});
		
		return lijstjeWindow;
	};
})();
