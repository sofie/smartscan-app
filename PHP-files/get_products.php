<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) {
	
	$list_id = $_POST['list_id'];
	
	$qry = "SELECT name FROM products
			INNER JOIN list_details ON ( products.id = list_details.product_id )
			WHERE list_id='".$list_id ."'";	
	
	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getList" => true, "productNaam" => $singleResult['name'],"productId" => $singleResult['list_details.product_id ']);
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