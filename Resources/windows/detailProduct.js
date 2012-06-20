//////////////////////////////////////////////////////////////////////////////////
/// Window met details van product op boodschappenlijst							//
//////////////////////////////////////////////////////////////////////////////////
(
	function() {

		Smart.ui.createDetailProductWindow = function() {
			var detailproductWindow = Titanium.UI.createWindow(style.Window);
			var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
				text : 'Productinfo'
			}));
			detailproductWindow.setTitleControl(lblTitle);

			var backButton = Titanium.UI.createButton(style.backButton);
			backButton.addEventListener('click', function() {
				Smart.navGroup.close(detailproductWindow, {
					animated : false
				});
			});
			detailproductWindow.leftNavButton = backButton;
			var navActInd = Titanium.UI.createActivityIndicator({
				style : Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN
			});
			detailproductWindow.setRightNavButton(navActInd);

			detailproductWindow.addEventListener('open', function() {
				getDetail();

				navActInd.show();
			});

			//////////////////////////////////////////////////////////////////////////////////
			/// Haalt detail op uit databank												//
			//////////////////////////////////////////////////////////////////////////////////
			function getDetail() {
				var getReq = Titanium.Network.createHTTPClient();
				if (Ti.App.localonline === "local") {
					getReq.open("GET", "http://localhost/SmartScan/get_itemdetail.php");
				} else {
					getReq.open("GET", "http://sofiehendrickx.eu/SmartScan/get_itemdetail.php");
				}
				var params = {
					id : Titanium.App.selectedProdIndex
				};

				getReq.timeout = 5000;
				getReq.onload = function() {
					try {
						var detail = JSON.parse(this.responseText);
						if (detail.getItem === false) {
							var lblNoDetail = Titanium.UI.createLabel(Smart.combine(style.textError, {
								text : 'Kan product niet ophalen.',
								top : 30
							}));
							detailproductWindow.add(lblNoDetail);

						} else {

							name = detail.name;
							title = detail.title;
							var pFoto = detail.foto;
							Ti.App.pId = detail.id;
							var pBeschrijving = detail.beschrijving;
							var pPrijs = detail.prijs;

							var bgView = Titanium.UI.createView(style.bgProduct);

							var cropView = Titanium.UI.createView({
								width : 100,
								height : 100
							});

							var baseImg = Titanium.UI.createImageView({
								image : pFoto
							});
							cropView.add(baseImg);

							var croppedImage = cropView.toImage();

							var imageView = Titanium.UI.createImageView({
								image : croppedImage,
								width : 100,
								height : 100,
								left : 20,
								top : 45
							});

							var title = Titanium.UI.createLabel(Smart.combine(style.textProductTitle, {
								text : name + ' ' + title
							}));
							var beschrijving = Titanium.UI.createLabel(Smart.combine(style.textProductDescription, {
								text : pBeschrijving
							}));

							var prijs = Titanium.UI.createLabel(Smart.combine(style.textProductPrice, {
								text : '€ ' + pPrijs
							}));

							if (Titanium.App.discount) {
								Ti.API.info('Discount opacity');
								prijs.opacity = 0.4
							}
							var discountPrijs = pPrijs - pPrijs * Titanium.App.discount;
							discountPrijs = discountPrijs.toFixed(2);
							var discount = Ti.UI.createLabel(Smart.combine(style.textProductPrice, {
								text : 'PROMO  € ' + discountPrijs,
								top : 140,
								color : '#AC3724'
							}));
							if (Ti.App.discount === null) {
								discount.text = "";
							}

							bgView.add(title);
							bgView.add(imageView);
							bgView.add(beschrijving);
							bgView.add(prijs);
							bgView.add(discount);

							detailproductWindow.add(bgView);
							navActInd.hide();

						}

					} catch(e) {
						alert(e);
					}
				}
				getReq.onerror = function(e) {
					Ti.API.info("TEXT onerror:   " + this.responseText);
					alert('Er is iets mis met de databank.');
				}

				getReq.send(params);
			};
			var verwijderenButton = Titanium.UI.createButton(style.verwijderenButton);
			detailproductWindow.add(verwijderenButton);

			//////////////////////////////////////////////////////////////////////////////////
			/// Product verwijderen uit lijst												//
			//////////////////////////////////////////////////////////////////////////////////
			verwijderenButton.addEventListener('click', function() {
				var deleteReq = Titanium.Network.createHTTPClient();
				if (Ti.App.localonline === "local") {
					deleteReq.open("GET", "http://localhost/SmartScan/post_removeproduct.php");
				} else {
					deleteReq.open("GET", "http://sofiehendrickx.eu/SmartScan/post_removeproduct.php");
				}

				deleteReq.timeout = 5000;
				deleteReq.onload = function() {
					try {
						var json = this.responseText;
						var response = JSON.parse(json);
						if (response.remove === true) {
							Titanium.API.info('Remove product: ' + this.responseText);

						} else {
							alert('Product kan niet verwijderd worden.');
						}
					} catch(e) {
						alert(e);
					}
				};

				var params = {
					id : Titanium.App.selectedListId
				};
				deleteReq.send(params);
				Smart.navGroup.close(detailproductWindow, {
					animated : false
				});
				Ti.App.fireEvent('app:reloadLijst', {
					action : 'Reload links'
				});
			});

			return detailproductWindow;
		};
	})();
