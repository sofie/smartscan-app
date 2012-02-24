(function() {

	Smart.ui.createWinkelsWindow = function() {
		var winkelsWindow = Titanium.UI.createWindow({
			title : 'Winkels',
			barImage : 'img/header.png',
			backgroundImage: 'img/bg.png'
		});
		
		var label1 = Titanium.UI.createLabel({
			text:'Winkels',
			left:20,
			font:{fontSize:20,fontFamily:'Museo'}
		});
		winkelsWindow.add(label1);
		

		return winkelsWindow;
	};
})();
