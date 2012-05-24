(function() {
	Smart.ui.theme = {
		redColor : '#AC3724',
		darkColor : '#474240',
	};

	Smart.ui.properties = {
		platformWidth : Ti.Platform.displayCaps.platformWidth,
		platformHeight : Ti.Platform.displayCaps.platformHeight,

		Window : {
			width : '100%',
			height : '100%',
			backgroundImage : '/img/bg.png',
			barImage : 'img/header.png'
		},
		tableView : {
			top : 0,
			left : 0,
			right : 0,
			bottom : 10,

			editable : true,
			allowsSelectionDuringEditing : true,

			backgroundImage : '/img/bg.png',
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED
		},
		row : {
			height : 40,
			backgroundImage : '/img/bg_row.png',
			width : 280,
			selectedBackgroundColor : '#e3602b',
			backgroundSelectedColor : '#e3602b',
		},
		titleBar : {
			color : '#fff',
			font : {
				fontFamily : 'Bree serif',
				fontSize : 22
			},
			height : 30
		},
		bgProduct : {
			left : 'auto',
			right : 'auto',
			width : 280,
			top : 20,
			backgroundImage : 'img/bg_product.png',
			height : 179
		},
		
		
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Text																									//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
		textDelete : {
			font : {
				fontSize : 13,
				fontFamily : 'Bree serif'
			},
			color : '#AC3724',
			top : 13,
			right : 15,
			height : 20,
			width : 'auto'
		},
		textProductTitle : {
			left : 20,
			top : 10,
			width : 255,
			height : 25,
			textAlign : 'left',
			color : '#474240',
			font : {
				fontSize : 16,
				fontFamily : 'Bree serif'
			}
		},
		
		textProductDescription : {
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
		textProductPrice : {
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
		textError : {
			font : {
				fontSize : 13,
				fontFamily : 'Bree serif'
			},
			color : '#AC3724',
			left : 30,
			right : 30,
			width : 260,
			height : 'auto'
		},
		textTotaal : {
			right : 20,
			bottom : 40,
			height : 25,
			width:60,
			textAlign : 'right',
			color : '#474240',
			font : {
				fontSize : 16,
				fontFamily : 'Bree serif'
			}
		},
		
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Textfields																								//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

		inputFieldRegister : {
			paddingLeft:10,
			backgroundImage : '/img/bg_inputRegister.png',
			width : 280,
			height : 200,
			top : 20,
			left : 'auto',
			right : 'auto'
		},
		inputFieldNoBg : {
			color : '#3A3737',
			left : 20,
			height : 40,
			width : Ti.Platform.displayCaps.platformWidth - 60,
			font : {
				fontSize : 13,
				fontFamily : 'Bree Serif'
			},
			opacity : 0.9,
			autocapitalization : false,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		},
		inputField : {
			paddingLeft:10,
			color : '#3A3737',
			left : 20,
			height : 40,
			width : 280,
			right : 20,
			font : {
				fontSize : 13,
				fontFamily : 'Bree Serif'
			},
			opacity : 0.9,
			autocapitalization : false,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
			backgroundImage : '/img/bg_textInput.png'
		},
		inputFieldKort : {
			paddingLeft:10,
			color : '#3A3737',
			left : 20,
			height : 40,
			width : 230,
			font : {
				fontSize : 13,
				fontFamily : 'Bree Serif'
			},
			opacity : 0.9,
			autocapitalization : false,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
			backgroundImage : '/img/bg_textInput_kort.png'
		},
		
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Buttons																									//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

		loginButton : {
			backgroundImage : '/img/btn_login.png',
			top : 25,
			right : 20,
			width : 90,
			height : 37
		},
		accountButton : {
			backgroundImage : '/img/btn_account.png',
			top : -37,
			left : 20,
			width : 178,
			height : 37
		},
		gpsButton:{
			backgroundImage : '/img/btn_gps.png',
			width : 37,
			height : 35
		},
		registerButton : {
			backgroundImage : '/img/btn_registreer.png',
			top : 230,
			right : 20,
			width : 123,
			height : 37
		},
		logoutButton : {
			backgroundImage : "img/btn_logout.png",
			width : 82,
			height : 35,
			right : 20,
			top : 20
		},
		klaarButton : {
			backgroundImage : "img/btn_sessieklaar.png",
			width : 166,
			height : 45,
			left : 20,
			bottom : 20
		},
		scanKaartButton : {
			backgroundImage : "img/btn_scanKaart.png",
			width : 280,
			height : 36,
			left : 20,
			top : 20
		},
		addButton : {
			backgroundImage : "img/btn_add.png",
			width : 33,
			height : 31
		},
		scanButton : {
			backgroundImage : "img/btn_scan.png",
			width : 28,
			height : 28
		},
		backButton : {
			backgroundImage : "img/btn_back.png",
			width : 49,
			height : 28
		},
		makenButton : {
			backgroundImage : 'img/btn_maken.png',
			width : 95,
			height : 37,
			right : 20,
			top : 15
		},
		searchButton : {
			backgroundImage : "img/btn_search.png",
			width : 37,
			height : 37,
			right : 15,
			top : 15
		},
		verwijderenButton : {
			backgroundImage : '/img/btn_verwijderen.png',
			top : 220,
			left : 20,
			width : 128,
			height : 37
		},
		
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Andere																									//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		bgLoginTextField : {
			backgroundImage : '/img/bg_inputLogin.png',
			width : 280,
			height : 100,
			top : 40,
			left : 'auto',
			right : 'auto'
		},
		wrmAccount : {
			width : 320,
			height : 136,
			top : 30,
			opacity : 0.5,
			backgroundImage : '/img/wrmAccount.png'
		},
		bgProduct : {
			left : 'auto',
			right : 'auto',
			width : 288,
			top : 20,
			backgroundImage : 'img/bg_product.png',
			height : 179
		}
	};
})();

//Shortcut for UI properties
var style = Smart.ui.properties;
