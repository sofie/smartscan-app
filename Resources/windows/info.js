(function() {

	Smart.ui.createInfoWindow = function() {
		var infoWindow = Titanium.UI.createWindow(style.Window);
		
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text:'Informatie'
		}));
		infoWindow.setTitleControl(lblTitle);
		
		var lblCreatedBy = Titanium.UI.createLabel(Smart.combine(style.textNormal,{
			text:'Created by',
			textAlign:'center',
			top:160
		}));
		infoWindow.add(lblCreatedBy);
		
		var lblNiels = Titanium.UI.createLabel(Smart.combine(style.textNormal,{
			text:'Niels Dierickx',
			top:200,
			textAlign:'center'
		}));
		infoWindow.add(lblNiels);
		var lblSofie = Titanium.UI.createLabel(Smart.combine(style.textNormal,{
			text:'Sofie Hendrickx',
			top:230,
			textAlign:'center'
		}));
		
		infoWindow.add(lblSofie);
		var lblLieselot = Titanium.UI.createLabel(Smart.combine(style.textNormal,{
			text:'Lieselot Van den Abbeele',
			top:260,
			textAlign:'center'
		}));
		infoWindow.add(lblLieselot);
		
		
		return infoWindow;
	};
})();
