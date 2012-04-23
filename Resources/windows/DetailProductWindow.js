(function() {

	Smart.ui.createDetailProductWindow = function() {
		var detailproductWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false,
			font : {
				fontFamily : 'Bree Serif'
			},
			layout : 'vertical'
		});
		var lblTitle = Titanium.UI.createLabel({
			text : Titanium.App.productTitle,
			color : '#fff',
			font : FontTitle
		});
		detailproductWindow.setTitleControl(lblTitle);

		//
		//Back button
		//
		var backButton = Titanium.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(detailproductWindow, {
				animated : false
			});
		});
		detailproductWindow.leftNavButton = backButton;

		//
		// Product in detail
		//
		var bgView = Titanium.UI.createView({
			backgroundColor : '#fff',
			opacity : 0.7,
			left : 20,
			top : 30,
			right : 20,
			height : 200,
			borderRadius : 10
		});
		
		var pName = Titanium.UI.createLabel({
			text : 'ProductNaam',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 17
			},
			color : '#474240',
			top : -150,
			left : 20
		});
		bgView.add(pName);

		var pImageBorder = Titanium.UI.createView({
			backgroundColor : '#fff',
			borderWidth : 1,
			borderColor : '#494341',
			width : 100,
			height : 100,
			left : 20
		});
		bgView.add(pImageBorder);
		
		var pImage = Ti.UI.createImageView({
			image : '/img/milka.jpg',
			left : 'auto',
			right: 'auto',
			height : 100
		});
		pImageBorder.add(pImage);

		var pDescription = Titanium.UI.createLabel({
			text : 'ProductOmschrijving',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 14
			},
			color : '#474240',
			left : 130,
			top : -90
		});
		bgView.add(pDescription);

		var pPrice = Titanium.UI.createLabel({
			text : 'ProductPrijs',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 14
			},
			color : '#474240',
			left : 130,
			top : 85
		});
		bgView.add(pPrice);

		detailproductWindow.add(bgView);

		return detailproductWindow;
	};
})();
