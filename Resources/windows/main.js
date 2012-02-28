(function() {
	var updateTimeout = 15000;
	var i = 0;
	var navWindow;
	var mainWindow = Ti.UI.createWindow({
		backgroundImage : 'img/bg_main.png',
		navBarHidden: true,
		exitOnClose : true,
		fullscreen:false

	});
	var platformWidth = Titanium.Platform.displayCaps.platformWidth;
	var viewIcons = Titanium.UI.createView({
		bottom:30,
		height : 190,
		width : 190,
		layout : 'horizontal',
	});
	var viewIconsBg = Titanium.UI.createView({
		bottom:35,
		height : 190,
		width : 264,
		layout : 'horizontal',
		backgroundImage:'img/bg_menu.png',
		opacity:0.5
	});
	mainWindow.add(viewIconsBg);
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

	// Create each menu icon and include properties for any windows it opens
	var createIcon = function(icon) {
		var iconWin = undefined;
		var view = Ti.UI.createView({
			backgroundImage : icon.image,
			top : 15,
			left : 15,
			bottom:15,
			height : 67,
			width : 64
		});
		view.addEventListener('click', function(e) {
			iconWin = icon.func(icon.args);
			iconWin.orientationModes = [Ti.UI.PORTRAIT];

			// add a left navigation button for ios
			if(!Smart.isAndroid()) {
				var leftButton = Ti.UI.createButton({
					title:'Back',
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
