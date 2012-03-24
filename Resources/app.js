var Ti;

Titanium.UI.setBackgroundImage('img/bg.png');

//libraries
Ti.include('smart/smart.js');

//windows & ui
Ti.include(
	'windows/lijstje.js', 
	'windows/lijstjeInhoud.js', 
	'windows/addLijstje.js', 
	//'windows/DetailProductWindow.js',
	
	'windows/winkelen.js', 
	'windows/startVanLijstje.js',
	'windows/startWinkelen.js',
	
	'windows/winkels.js',
	'windows/info.js',
	
	'smart/icons.js', 
	'windows/main.js',
	'windows/login.js',
	'windows/account.js'
);
