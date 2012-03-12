(function() {
	var iconHeight = 91;
	var iconWidth = 87;

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
