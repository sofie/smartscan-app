(function() {
	var navWindow;

	Smart.ui.createAccountWin = function() {
		var mainWindow = Ti.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false
		});
		var lblTitle = Titanium.UI.createLabel({
			text : 'Mijn account',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		mainWindow.setTitleControl(lblTitle);

		navWindow = Ti.UI.createWindow();
		Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : mainWindow
		});
		navWindow.add(Smart.navGroup);
		
		//
		// back button/logout
		//
		var backButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(mainWindow, {
				animated : true
			});
		});
		mainWindow.leftNavButton = backButton;
		
		var lblName = Titanium.UI.createLabel({
			text:'Naam: ',
			left:20,
			top:0
		});
		mainWindow.add(lblName);

		navWindow.open();
	}
})();
