<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) {

	$name = $_POST['name'];

	$qry = "SELECT name,title,description,prijsStuk, foto FROM `products` WHERE name=''" .$name. "''";

	$result = $conn -> query($qry);
	//$singleResult = mysqli_fetch_assoc($result);

	//if (mysqli_num_rows($result) > 0) {
		
		$singleResult = mysqli_fetch_assoc($result);
			$response = array(
				"getItem" => true, 
				"name" => $singleResult['name'], 
				"id" => $singleResult['id'], 
				"title" => $singleResult['title'], 
				"foto" => $singleResult['foto'], 
				"beschrijving" => $singleResult['description'], 
				"prijs" => $singleResult['prijsStuk']);
		/*	$response = array(
				"getItem" => true, 
				"name" => $result['name'], 
				"id" => $result['id'], 
				"title" => $result['title'], 
				"foto" => $result['foto'], 
				"beschrijving" => $result['description'], 
				"prijs" => $result['prijsStuk']);
*/
		echo json_encode($response);

	/*} else {
		$response = array("getItem" => false);
		echo json_encode($response);
		$conn -> close();
	}*/
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  