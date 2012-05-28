<?php

require_once ('connection.php');
$conn = @new mysqli($dbserver, $dbuser, $dbpass, $dbase);

if (!$conn -> connect_error) {

	$session_id = $_POST['session_id'];
	$product_id = $_POST['product_id'];
	$aantal = $_POST['aantal'];

	$insert = "UPDATE winkel_productenlijst
				SET aantal='" . mysqli_real_escape_string($conn, $aantal) . "'
				WHERE session_id='" . mysqli_real_escape_string($conn, $session_id) . "' AND product_id='" . mysqli_real_escape_string($conn, $product_id) . "'";

	$query = $conn -> query($insert);
	if ($query) {
		
			$response = array('add' => true, 'id' => $id);
			echo json_encode($response);
			$conn -> close();

	}


} else {
throw new Exception('Oeps, geen connectie.');

echo "Oeps, geen connectie.";
exit ;
}
?> 