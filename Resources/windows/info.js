(function() {

	Smart.ui.createInfoWindow = function() {
		var infoWindow = Titanium.UI.createWindow({
			barColor:'#',
			barImage : 'img/header.png',
			backgroundImage : 'img/bg.png',
			//fullscreen : false
		});
		
		var lblTitle = Titanium.UI.createLabel({
			text:'Informatie',
			color:'#fff',
			font : FontTitle
		});
		infoWindow.setTitleControl(lblTitle);
		
		var lblCreatedBy = Titanium.UI.createLabel({
			text:'Created by',
			top:160,
			width:150,
			left:'auto',
			right:'auto',
			color:'#474240',
			font:{
				fontFamily:'Bree serif',
				fontSize:15
			}
		});
		infoWindow.add(lblCreatedBy);
		
		var lblNiels = Titanium.UI.createLabel({
			text:'Niels Dierickx',
			top:190,
			width:150,
			left:'auto',
			right:'auto',
			color:'#474240',
			font:{
				fontFamily:'Bree serif',
				fontSize:17
			}
		});
		infoWindow.add(lblNiels);
		
		
		return infoWindow;
	};
})();
