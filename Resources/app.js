var Ti;

Titanium.UI.setBackgroundImage('img/bg.png');

/*Titanium.include('styles/font_styles.js');
var commonStyle = require('styles/common_styles').commonStyles();
*/
//libraries
Ti.include('smart/smart.js');

//windows & ui
Ti.include(
	'windows/lijstje.js', 
	'windows/lijstjeInhoud.js', 
	'windows/addLijstje.js', 
	'windows/addProduct.js',
	'windows/productLijst.js',
	'windows/detailProduct.js',
	
	'windows/winkelen.js', 
	'windows/startVanLijstje.js',
	'windows/startWinkelen.js',
	
	'windows/winkels.js',
	'windows/info.js',
	
	'smart/icons.js', 
	'windows/main.js',
	'windows/login.js',
	'windows/account.js',
	
	'config/config.js',
	'styles/styles.js'
);
Smart.ui.createLoginWindow();
