(function() {
	var iconHeight = 85;
	var iconWidth = 75;

	Smart.ui.iconsWinkelen = {
		height: iconHeight,
		width: iconWidth,
		list : [{
			image : 'img/btn_startwinkelen.png',
			func : Smart.ui.createStartWinkelenWindow
		}, {
			image : 'img/btn_startlijstje.png',
			func : Smart.ui.createStartVanLijstjeWindow
		}]
	};
})();
