var Ti;

Titanium.UI.setBackgroundImage('img/bg.png');

//libraries
Ti.include('smart/smart.js');

//windows & ui
Ti.include(
	'windows/WinkelenWindow.js', 
	'windows/LijstjeWindow.js', 
	'windows/LijstjeInhoudWindow.js', 
	'windows/DetailProductWindow.js',
	'windows/InfoWindow.js', 
	'windows/WinkelsWindow.js', 
	'smart/icons.js', 
	'windows/main.js'
);
