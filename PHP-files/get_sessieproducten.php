<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	
	$session_id = $_POST['session_id'];
	
	$qry = "SELECT name, product_id,title,calculated_price, session_id,aantal,calculated_price*aantal
			FROM products
			INNER JOIN winkel_productenlijst ON ( products.id = winkel_productenlijst.product_id )
			WHERE session_id='".$session_id ."'";	

	
	$result = $conn -> query($qry);
	
	if ($num_rows = $result -> num_rows == 0) {
		$response = array('noProduct' => true);
		echo json_encode($response);
	}

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		 
		while ($singleResult = mysqli_fetch_assoc($result)) {
		
			$totaal="SELECT SUM(calculated_price*aantal),SUM(aantal)
					FROM winkel_productenlijst
					WHERE session_id='".$session_id ."'";
			$resultTotaal = $conn -> query($totaal);	
			$singleResultTotaal = mysqli_fetch_assoc($resultTotaal);
			
			$promo = "SELECT discount FROM `promotions` WHERE product_id='".$singleResult['product_id'] ."'";
			$resultPromo = $conn -> query($promo);
			$singleResultPromo = mysqli_fetch_assoc($resultPromo);
			
			$response = array("getList" => true, "naam" => $singleResult['name'],"title" => $singleResult['title'],"id" => $singleResult['product_id'],
								"aantal"=>$singleResultTotaal['SUM(aantal)'],"prijsStuk"=>$singleResult['calculated_price']*$singleResult['aantal'],
								"amount"=>$singleResult['aantal'],"discount"=>$singleResultPromo['discount'],
								"totaalPrijs"=>$singleResultTotaal['SUM(calculated_price*aantal)'],"session_id"=>$singleResult['session_id']);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getList" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  