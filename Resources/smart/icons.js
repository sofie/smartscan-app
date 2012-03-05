(function() {
	var iconHeight = 67;
	var iconWidth = 64;

	Smart.ui.icons = {
		height: iconHeight,
		width: iconWidth,
		list : [{
			image : 'img/btn_winkelen.png',
			func : Smart.ui.createWinkelenWindow
		}, {
			image : 'img/btn_lijstje.png',
			func : Smart.ui.createLijstjeWindow
		}, {
			image : 'img/btn_winkels.png',
			func : Smart.ui.createWinkelsWindow
		}, {
			image : 'img/btn_info.png',
			func : Smart.ui.createInfoWindow
		}]
	};
})();
