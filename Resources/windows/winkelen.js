//////////////////////////////////////////////////////////////////////////////////////
/// Gebruiker kan kiezen om sessie te starten van 1 van zijn boodschappenlijstjes,	//
/// of gewoon te starten															//
//////////////////////////////////////////////////////////////////////////////////////
(function() {

	Smart.ui.createWinkelenWindow = function() {
		//
		// Main window
		//
		var winkelenWindow = Titanium.UI.createWindow(Smart.combine(style.Window,{
			backgroundImage:'img/bg_winkelen_1.png'
		}));
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text : 'Winkelen'
		}));
		winkelenWindow.setTitleControl(lblTitle);

		//
		//Inhoud
		//
		var viewIcons = Titanium.UI.createView({
			bottom : 108,
			height : 100,
			left : 65,
			width : 280,
			layout : 'horizontal'
		});
		
		winkelenWindow.add(viewIcons);

		var createIcon = function(icon) {
			var iconWin = undefined;
			var view = Titanium.UI.createView({
				backgroundImage : icon.image,
				top : 25,
				right : 40,
				height : 85,
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
		for( i = 0; i < Smart.ui.iconsWinkelen.list.length; i++) {
			viewIcons.add(createIcon(Smart.ui.iconsWinkelen.list[i]));
		}
		
		
		
		return winkelenWindow;
	};
})();
