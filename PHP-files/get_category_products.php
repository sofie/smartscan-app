<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	
	$id = $_POST['id'];
	
	$qry = "SELECT products.name, products.id
			FROM products
			INNER JOIN categories ON (categories.id = products.category)
			WHERE categories.id='".$id ."'";
			
	$result = $conn -> query($qry);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			$promo = "SELECT discount FROM `promotions` WHERE product_id='".$singleResult['id'] ."'";
			$resultPromo = $conn -> query($promo);
			$singleResultPromo = mysqli_fetch_assoc($resultPromo);
			$response = array("getCatProd" => true, "naam" => $singleResult['name'],"id" => $singleResult['id'],"discount"=>$singleResultPromo['discount']);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getCatProd" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  