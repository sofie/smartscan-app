(function() {

	Smart.ui.createDetailProductWindow = function() {
		var detailproductWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false,
			font : {
				fontFamily : 'Bree Serif'
			},
			layout:'vertical'
		});
		var lblTitle = Titanium.UI.createLabel({
			text : 'Product',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		detailproductWindow.setTitleControl(lblTitle);

		//
		//Back button
		//
		var backButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(detailproductWindow, {
				animated : true
			});
		});
		detailproductWindow.leftNavButton = backButton;

		//
		// Product in detail
		//
		var bgView = Titanium.UI.createView({
			backgroundColor:'#fff',
			opacity:0.7,
			left:20,
			top:30,
			right:20,
			height:200,
			borderRadius:10
		});
		var lblName= Titanium.UI.createLabel({
			text:'ProductNaam',
			font:{
				fontFamily:'Bree Serif',
				fontSize:17
			},
			color:'#474240',
			top:-150,
			left:20
		});
		bgView.add(lblName);
		
		var pImage= Titanium.UI.createView({
			backgroundColor:'green',
			width:100,
			height:100,
			left:20
		});
		bgView.add(pImage);
		
		var lblDescription= Titanium.UI.createLabel({
			text:'ProductOmschrijving',
			font:{
				fontFamily:'Bree Serif',
				fontSize:14
			},
			color:'#474240',
			left:130,
			top:-90
		});
		bgView.add(lblDescription);
		detailproductWindow.add(bgView);

		
		return detailproductWindow;
	};
})();
