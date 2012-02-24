(function() {
	var updateTimeout = 15000;
	var i = 0;
	var navWindow;
	var mainWindow = Ti.UI.createWindow({
		backgroundImage : 'img/bg.png',
		titleImage:'img/t_smartscan.png',
		barImage : 'img/header.png',
		exitOnClose : true

	});
	var platformWidth = Titanium.Platform.displayCaps.platformWidth;
	var viewIcons = Ti.UI.createView({
		height : 300,
		width : platformWidth - 85,
		layout : 'horizontal'
	});
	mainWindow.add(viewIcons);

	// handle cross-platform navigation
	if(Smart.isAndroid()) {
		Smart.navGroup = {
			open : function(win, obj) {
				win.open(obj);
			},
			close : function(win, obj) {
				win.close(obj);
			}
		};
		navWindow = mainWindow;
	} else {
		navWindow = Ti.UI.createWindow();
		Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : mainWindow
		});
		navWindow.add(Smart.navGroup);
	}

	// Create each dashboard icon and include necessary properties
	// for any windows it opens.
	var createIcon = function(icon) {
		var iconWin = undefined;
		var view = Ti.UI.createView({
			backgroundImage : icon.image,
			top : 10,
			left : 10,
			height : 126,
			width : 99
		});
		view.addEventListener('click', function(e) {
			iconWin = icon.func(icon.args);
			iconWin.orientationModes = [Ti.UI.PORTRAIT];

			// add a left navigation button for ios
			if(!Smart.isAndroid()) {
				var leftButton = Ti.UI.createButton({
					backgroundImage : 'img/4dots.png',
					width : 41,
					height : 31
				});
				leftButton.addEventListener('click', function() {
					Smart.navGroup.close(iconWin, {
						animated : true
					});
				});
				iconWin.leftNavButton = leftButton;
			}
			//Navbar tonen om terug naar main te gaan
			iconWin.navBarHidden = false;
			Smart.navGroup.open(iconWin, {
				animated : true
			});
		});
		return view;
	};
	// Layout the dashboard icons
	for( i = 0; i < Smart.ui.icons.list.length; i++) {
		viewIcons.add(createIcon(Smart.ui.icons.list[i]));
	}

	if(Smart.isAndroid()) {
		mainWindow.open({
			animated : true
		});
	} else {
		navWindow.open({
			transition : Ti.UI.iPhone.AnimationStyle.CURL_DOWN
		});
	}

})();
