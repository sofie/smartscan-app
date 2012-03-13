var Ti;

Titanium.UI.setBackgroundImage('img/bg.png');

//libraries
Ti.include('smart/smart.js');

//windows & ui
Ti.include(
	'windows/LijstjeWindow.js', 
	'windows/LijstjeInhoudWindow.js', 
	//'windows/DetailProductWindow.js',
	
	 'windows/WinkelenWindow.js', 
	'windows/StartVanLijstjeWindow.js',
	'windows/StartWinkelenWindow.js',
	
	'windows/WinkelsWindow.js',
	'windows/InfoWindow.js',
	
	'smart/icons.js', 
	'windows/main.js',
	'windows/login.js',
	'windows/account.js'
);
