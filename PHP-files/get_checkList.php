<?php

require_once ('connection.php');
$conn = @new mysqli($dbserver, $dbuser, $dbpass, $dbase);

if (!$conn -> connect_error) {

	$barcode = $_POST['barcode'];

	$qryId = "SELECT id,price FROM products WHERE barcode = '" . $barcode . "'";
	$queryId = $conn -> query($qryId);
	if ($num_rows = $queryId -> num_rows > 0) {
		$singleResultId = mysqli_fetch_assoc($queryId);
		
		$response = array('check' => true, 'product_id' => $singleResultId['id']);
		echo json_encode($response);
		$conn -> close();
	
		
	}else{
		$response = array('check' => false, 'message' => 'Product niet gevonden.');
		echo json_encode($response);
		$conn -> close();
	}

} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?> 