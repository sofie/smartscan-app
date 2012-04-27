(function() {

	Smart.ui.createDetailProductWindow = function() {
		var detailproductWindow = Titanium.UI.createWindow(style.Window);
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : Titanium.App.selectedProd
		}));
		detailproductWindow.setTitleControl(lblTitle);

		//
		//Back button
		//
		var backButton = Titanium.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(detailproductWindow, {
				animated : false
			});
		});
		detailproductWindow.leftNavButton = backButton;
		
		detailproductWindow.addEventListener('open',function(){
			getDetail();
		});
		//
		// Product in detail
		//

		function getDetail() {
			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/SmartScan/get_itemdetail.php");
			//Titanium.API.info('Selected prod id: ' + Titanium.App.selectedProdIndex);
			var params = {
				name : Titanium.App.selectedProd
			};
			//Ti.API.info('Prod id: '+params.id);

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);
					//Ti.API.info('Detail: '+detail);
					if(detail.getItem === false) {
						Titanium.API.info(this.responseText);
						var lblNoDetail = Titanium.UI.createLabel(Smart.combine(style.textError, {
							text : 'Kan product niet ophalen.',
							top : 30
						}));
						detailproductWindow.add(lblNoDetail);

					} else {
						var scrollView = Titanium.UI.createScrollView(style.scrollView);

						Ti.App.pTitle = detail.name;
						pTitle = detail.title;
						var pFoto = detail.foto;
						Ti.App.pId = detail.id;
						var pBeschrijving = detail.beschrijving;
						var pPrijs = detail.prijs;

						var bgView = Titanium.UI.createView(style.bgProduct);

						var cropView = Titanium.UI.createView({
							width : 100,
							height : 100,
							borderColor : '#B6AFA9',
							backgroundColor : '#fff'
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

						var titel = Titanium.UI.createLabel(Smart.combine(style.textProductTitle, {
							text : Ti.App.pTitle
						}));

						var beschrijving = Titanium.UI.createLabel(Smart.combine(style.textProductDescription, {
							text : pBeschrijving
						}));

						var prijs = Titanium.UI.createLabel(Smart.combine(style.textProductPrice, {
							text : '€ ' + pPrijs
						}));
						bgView.add(titel);

						bgView.add(imageView);
						bgView.add(beschrijving);
						bgView.add(prijs);

						scrollView.add(bgView);

						detailproductWindow.add(scrollView);

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
		return detailproductWindow;
	};
})();
