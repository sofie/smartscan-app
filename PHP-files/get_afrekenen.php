<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	
	$session_id = $_POST['session_id'];
	
	$qry = "SELECT name, product_id,title,prijsStuk, session_id, startuur,user_id,aantal,barcode
			FROM products
			INNER JOIN winkel_productenlijst ON ( products.id = winkel_productenlijst.product_id )
			INNER JOIN winkel_sessie ON ( winkel_sessie.id = winkel_productenlijst.session_id )
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
			$totaal="SELECT SUM(prijsStuk*aantal),SUM(aantal)
					FROM products
					INNER JOIN winkel_productenlijst ON ( products.id = winkel_productenlijst.product_id )
					WHERE session_id='".$session_id ."'";
			
			$resultTotaal = $conn -> query($totaal);	
			$singleResultTotaal = mysqli_fetch_assoc($resultTotaal);
			
			$response = array("getAfrekenen" => true, "naam" => $singleResult['name'],"title" => $singleResult['title'],"id" => $singleResult['product_id'],
								"prijsStuk"=>$singleResult['prijsStuk'],
								"totaalPrijs"=>$singleResultTotaal['SUM(prijsStuk*aantal)'],"sum_aantal"=>$singleResultTotaal['SUM(aantal)'],
								"session_id"=>$singleResult['session_id'],"startuur"=>$singleResult['startuur'],"user_id"=>$singleResult['user_id'],
								"aantal"=>$singleResult['aantal'],"barcode"=>$singleResult['barcode']);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getAfrekenen" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  