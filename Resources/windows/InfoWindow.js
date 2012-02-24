(function() {

	Smart.ui.createInfoWindow = function() {
		var infoWindow = Titanium.UI.createWindow({
			title : 'Info',
			barImage : 'img/header.png',
			backgroundImage: 'img/bg.png',
			fullscreen : false,
			font:{fontFamily:'Museo'}
		});
		
		var label1 = Titanium.UI.createLabel({
			text:'Informatie',
			left:10
		});
		infoWindow.add(label1);
		

		return infoWindow;
	};
})();
