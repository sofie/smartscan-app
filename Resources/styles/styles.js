(function() {
	Smart.ui.theme = {
		redColor : '#AC3724',
		darkColor: '#474240',
	};

	Smart.ui.properties = {
		platformWidth : Ti.Platform.displayCaps.platformWidth,
		platformHeight : Ti.Platform.displayCaps.platformHeight,

		Window : {
			width : '100%',
			height : '100%',
			backgroundImage:'/img/bg.png',
			barImage : 'img/header.png'
		},
		tableView : {
			top : 0,
			left : 0,
			right : 0,
			bottom : 10,
							
			editable:true,
			allowsSelectionDuringEditing:true,

			backgroundImage : 'img/bg.png',
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED
		},
		
		titleBar : {
			color : '#fff',
			font : {
				fontFamily : 'Bree serif', 
				fontSize: 24
			},
			height:30
		},
		bgProduct:{
			left : 'auto',
			right : 'auto',
			width:288,
			top : 20,
			backgroundImage:'img/bg_product.png',
			height : 179
		},
		textNormal : {
			color : '#3A3737',
			left : 20,
			font : {
				fontSize : 13, 
				fontFamily : 'Bree serif'
			},
			textAlign : 'left',
			width : '280'
		},
		textDelete:{
			font : {
				fontSize : 13, 
				fontFamily : 'Bree serif'
			},
			color : '#AC3724',
			top:13,
			right:15,
			height:20,
			width:'auto'
		},
		textProductTitle:{
			left : 20,
			top : 10,
			width : 230,
			height : 25,
			textAlign : 'left',
			color : '#474240',
			font : { 
				fontSize : 16, 
				fontFamily : 'Bree serif' 
			}
		},
		textProductDescription:{
			left : 130,
			right : 20,
			top : 46,
			height : 70,
			textAlign : 'left',
			color : '#474240',
			font : {
				fontSize : 13, 
				fontFamily : 'Merge'
			}
		},
		textProductPrice:{
			right : 20,
			top : 120,
			height : 30,
			textAlign : 'right',
			color : '#474240',
			font : { 
				fontSize : 16, 
				fontFamily : 'Bree serif' 
			}
		},
		textError:{
			font : {
				fontSize : 13, 
				fontFamily : 'Bree serif'
			},
			color : '#AC3724',
			left : 30,
			right : 30,
			width : 300,
			height : 'auto'		
		},
		
		inputField:{
			color : '#3A3737',
			left : 20,
			height : 40,
			width : Ti.Platform.displayCaps.platformWidth-60,
			font : {
				fontSize : 13, 
				fontFamily : 'Bree Serif'
			},
			opacity : 0.9,
			autocapitalization : false,
			keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		},
		inputFieldBorder:{
			color : '#3A3737',
			left : 20,
			height : 40,
			right:20,
			font : {
				fontSize : 13, 
				fontFamily : 'Bree Serif'
			},
			opacity : 0.9,
			autocapitalization : false,
			keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		},
		
		loginButton:{
			backgroundImage : '/img/btn_login.png',
			top : 25,
			right : 20,
			width : 90,
			height : 37
		},
		accountButton:{
			backgroundImage : '/img/btn_account.png',
			top : -37,
			left : 20,
			width : 178,
			height : 37
		},
		logoutButton:{
			backgroundImage : "img/btn_logout.png",
			width : 82,
			height : 35,
			right : 20,
			top : 20
		},
		addButton : {
			backgroundImage : "img/btn_add.png",
			width : 33,
			height : 31
		},
		backButton : {
			backgroundImage : "img/btn_back.png",
			width : 49,
			height : 28
		},
		makenButton:{
			backgroundImage : 'img/btn_maken.png',
			width : 95,
			height : 37,
			right : 20,
			top : 15
		},
		searchButton:{
			backgroundImage : "img/btn_search.png",
			width : 43,
			height : 42,
			right : 15,
			top : 10
		},
		bgLoginTextField:{
			backgroundImage : '/img/bg_inputLogin.png',
			width : 280,
			height : 100,
			top : 20,
			left : 'auto',
			right : 'auto'
		},
		wrmAccount:{
			width : 320,
			height : 136,
			top : 100,
			opacity : 0.5,
			backgroundImage : '/img/wrmAccount.png'
		}
		
	};
})();

//Shortcut for UI properties
var style = Smart.ui.properties;
