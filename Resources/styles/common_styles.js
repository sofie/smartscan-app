exports.commonStyles = function() {
	return {
		window : {
			width : '100%',
			height : '100%',
			backgroundImage:'/img/bg.png',
			barImage : 'img/header.png',
			layout:'vertical'
		},
		windowNoLayout : {
			width : '100%',
			height : '100%',
			backgroundImage:'/img/bg.png',
			barImage : 'img/header.png'
		},

		backButton : {
			backgroundImage : "img/btn_back.png",
			width : 52,
			height : 31
		},
		addButton : {
			backgroundImage : "img/btn_add.png",
			width : 33,
			height : 31
		}
	};
};
