var Ti;

Titanium.UI.setBackgroundImage('img/bg.png');

//Ti.App.localonline="local";
Ti.App.localonline="online";

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
	'windows/startVanLijstjeInhoud.js',
	'windows/detailProductSession.js',
	'windows/afrekenen.js',
	
	'windows/winkels.js',
	'windows/account.js',
	
	'smart/icons.js', 
	'windows/main.js',
	'windows/login.js',
	'windows/register.js',
	
	'config/config.js',
	'styles/styles.js'
);
Titanium.App.addEventListener('app:logoutback', function(e) {
	Smart.ui.createLoginWindow();
});
Smart.ui.createLoginWindow();
