<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {

	$id = $_POST['id'];

	$qry = "SELECT name,title,description,price, photo FROM `products` WHERE id='" .$id. "'";

	$result = $conn -> query($qry);
	

	if (mysqli_num_rows($result) > 0) {
		$singleResult = mysqli_fetch_assoc($result);
			$response = array(
				"getItem" => true, 
				"name" => $singleResult['name'], 
				"id" => $singleResult['id'], 
				"title" => $singleResult['title'], 
				"foto" => $singleResult['photo'], 
				"beschrijving" => $singleResult['description'], 
				"prijs" => $singleResult['price']
			);
		echo json_encode($response);

	} else {
		$response = array("getItem" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  