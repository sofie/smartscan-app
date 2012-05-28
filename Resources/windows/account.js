(function() {

	Smart.ui.createAccountWindow = function() {
		var accountWin = Titanium.UI.createWindow(style.Window);
		
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text:'Mijn account'
		}));
		accountWin.setTitleControl(lblTitle);
		
		var logoutButton = Titanium.UI.createButton(style.logoutButton);
		logoutButton.addEventListener('click', function() {
			Smart.ui.createLoginWindow();
		});
		accountWin.add(logoutButton);
		
		var lblAccount = Titanium.UI.createLabel(Smart.combine(style.textNormal,{
			text:'Smartscan account',
			left:30,
			top:-250
		}));
		//accountWin.add(lblAccount);
		
		
		
		return accountWin;
	};
})();
