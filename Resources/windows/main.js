//////////////////////////////////////////////////////////////////////////////////////
/// Window als login succcesvol, dashboard (winkelen, lijstjes, winkels, account)	//
//////////////////////////////////////////////////////////////////////////////////////

(function() {
	var navWindow;

	Smart.ui.createApplicationMainWin = function() {
		var mainWindow = Ti.UI.createWindow(Smart.combine(style.Window,{
			backgroundImage : 'img/bg_main_1.png',
			navBarHidden : true,
			fullscreen : false
		}));
		navWindow = Ti.UI.createWindow();
		Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : mainWindow
		});
		navWindow.add(Smart.navGroup);
		
		//
		//Icons
		//
		var viewIcons = Titanium.UI.createView({
			bottom : 48,
			height : 180,
			left : 63,
			width : 280,
			layout : 'horizontal'
		});

		mainWindow.add(viewIcons);

		// Create each menu icon and include properties for any windows it opens
		var createIcon = function(icon) {
			var iconWin = undefined;
			var view = Titanium.UI.createView({
				backgroundImage : icon.image,
				top : 15,
				right : 40,
				height : 75,
				width : 75
			});
			view.addEventListener('click', function(e) {
				iconWin = icon.func(icon.args);
				iconWin.orientationModes = [Ti.UI.PORTRAIT];

				//Navbar tonen om terug naar main te gaan
				iconWin.navBarHidden = false;
				Smart.navGroup.open(iconWin, {
					animated : false
				});

				var backButton = Titanium.UI.createButton(style.backButton);
				backButton.addEventListener('click', function() {
					Smart.navGroup.close(iconWin, {
						animated : false
					});
				});
				iconWin.leftNavButton = backButton;

			});
			return view;
		};
		// Layout dashboard icons
		for( i = 0; i < Smart.ui.icons.list.length; i++) {
			viewIcons.add(createIcon(Smart.ui.icons.list[i]));
		}

		navWindow.open();
	}
})();
Ti.include('/smart/iconsWinkelen.js');
