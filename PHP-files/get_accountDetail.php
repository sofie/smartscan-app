<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {

	$id = $_POST['id'];

	$qry = "SELECT email,username FROM `users` WHERE id='" .$id. "'";

	$result = $conn -> query($qry);
	

	if (mysqli_num_rows($result) > 0) {
		$singleResult = mysqli_fetch_assoc($result);
			$response = array(
				"getItem" => true, 
				"email" => $singleResult['email'], 
				"username" => $singleResult['username']);
			

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