(function() {

	Smart.ui.createNieuwLijstjeWindow = function() {
		var nieuwWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			backgroundImage : 'img/bg.png'
		});
		
		var label1 = Titanium.UI.createLabel({
			text:'Nieuw lijstje',
			top:20,
			left:20
		});
		
		nieuwWindow.add(label1);

		return nieuwWindow;
	};
})();
