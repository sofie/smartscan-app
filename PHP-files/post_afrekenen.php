<?php

require_once ('connection.php');
$conn = @new mysqli($dbserver, $dbuser, $dbpass, $dbase);

if (!$conn -> connect_error) {

	$id = $_POST['id'];
	$totaal = $_POST['totaal'];
	$num_products = $_POST['num_products'];

	$insert = "UPDATE winkel_sessie
				SET totaal='" . mysqli_real_escape_string($conn, $totaal) . "',num_products='" . mysqli_real_escape_string($conn, $num_products) . "'
				WHERE id='" . mysqli_real_escape_string($conn, $id) . "'";

	$query = $conn -> query($insert);
	if ($query) {
		$products = "SELECT * FROM winkel_sessie WHERE id='" . mysqli_real_escape_string($conn, $id) . "'";
		$queryProd = $conn -> query($products);
		$singleResultProd = mysqli_fetch_assoc($queryProd);
		if ($singleResultProd['num_products'] == "0") {
			$response = array('add' => false);
			echo json_encode($response);
			$conn -> close();
		} else {
			$response = array('add' => true, 'id' => $id);
			echo json_encode($response);
			$conn -> close();
		}
	}


} else {
throw new Exception('Oeps, geen connectie.');

echo "Oeps, geen connectie.";
exit ;
}
?> 