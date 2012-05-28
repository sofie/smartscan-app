(function() {
	var iconHeight = 75;
	var iconWidth = 75;

	Smart.ui.icons = {
		height: iconHeight,
		width: iconWidth,
		list : [{
			image : 'img/btn_winkelen.png',
			func : Smart.ui.createWinkelenWindow
		}, {
			image : 'img/btn_lijstjes.png',
			func : Smart.ui.createLijstjeWindow
		}, {
			image : 'img/btn_winkels.png',
			func : Smart.ui.createWinkelsWindow
		}, {
			image : 'img/btn_info.png',
			func : Smart.ui.createAccountWindow
		}]
	};
})();
