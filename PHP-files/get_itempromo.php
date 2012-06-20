<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

	if (!$conn -> connect_error) {
		
	$product_id = $_POST['product_id'];
	$qry = "SELECT linkId FROM `link_details` WHERE `productId`='".$product_id."'";
			
	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getLink" => true, "linkId" => $singleResult['linkId']);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getLink" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  