var Ti;

Titanium.UI.setBackgroundImage('img/bg.png');

//libraries
Ti.include('smart/smart.js');

//windows & ui
Ti.include(
	'windows/ScannenWindow.js', 
	'windows/LijstjeWindow.js', 
	'windows/LijstjeInhoudWindow.js', 
	'windows/InfoWindow.js', 
	'windows/WinkelsWindow.js', 
	'smart/icons.js', 
	'windows/main.js'
);
