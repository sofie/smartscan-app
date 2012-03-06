(function() {
	var navWindow;

	Smart.ui.createApplicationMainWin = function() {
		var mainWindow = Ti.UI.createWindow({
			backgroundImage : 'img/bg_main.png',
			navBarHidden : true,
			exitOnClose : true,
			fullscreen : false
		});

		navWindow = Ti.UI.createWindow();
		Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : mainWindow
		});
		navWindow.add(Smart.navGroup);
		
		//
		// back button/logout
		//
		var backButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_logout.png",
			width : 100,
			height : 35,
			right:20,
			top:20
		});
		backButton.addEventListener('click', function() {
			mainWindow.close();
			Ti.App.fireEvent('app:logoutback', {
				action : 'Logout Back klik'
			});
		});
		mainWindow.add(backButton);
		
		//
		//Icons
		//
		var viewIcons = Titanium.UI.createView({
			bottom : 55,
			height : 180,
			left : 60,
			width : 280,
			layout : 'horizontal'
		});
		var viewIconsBg = Titanium.UI.createView({
			bottom : 35,
			height : 190,
			width : 264,
			layout : 'horizontal',
			backgroundImage : 'img/bg_menu.png',
			opacity : 0.5
		});
		mainWindow.add(viewIconsBg);
		mainWindow.add(viewIcons);

		// Create each menu icon and include properties for any windows it opens
		var createIcon = function(icon) {
			var iconWin = undefined;
			var view = Titanium.UI.createView({
				backgroundImage : icon.image,
				top : 25,
				right : 70,
				height : 67,
				width : 64
			});
			view.addEventListener('click', function(e) {
				iconWin = icon.func(icon.args);
				iconWin.orientationModes = [Ti.UI.PORTRAIT];

				//Navbar tonen om terug naar main te gaan
				iconWin.navBarHidden = false;
				Smart.navGroup.open(iconWin, {
					animated : true
				});
			});
			return view;
		};
		// Layout dashboard icons
		for( i = 0; i < Smart.ui.icons.list.length; i++) {
			viewIcons.add(createIcon(Smart.ui.icons.list[i]));
		}

		navWindow.open({
			transition : Ti.UI.iPhone.AnimationStyle.CURL_DOWN
		});
	}
})();
