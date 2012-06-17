<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	
	$list_id = $_POST['list_id'];
	
	$qry = "SELECT name, product_id, list_details.id,title
			FROM products
			INNER JOIN list_details ON ( products.id = list_details.product_id )
			WHERE list_id='".$list_id ."'";	
	
	$result = $conn -> query($qry);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			$promo = "SELECT discount FROM `promotions` WHERE product_id='".$singleResult['product_id'] ."'";
			$resultPromo = $conn -> query($promo);
			$singleResultPromo = mysqli_fetch_assoc($resultPromo);
			$response = array("getList" => true, "productNaam" => $singleResult['name'],"productTitle" => $singleResult['title'],
								"productId" => $singleResult['product_id'], "listId" => $singleResult['id'],
								"discount"=>$singleResultPromo['discount']);
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