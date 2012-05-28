<?php
require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	$product_id = $_POST['product_id'];
	$session_id = $_POST['session_id'];

	$qry = "SELECT id FROM winkel_productenlijst WHERE product_id = '" . mysqli_real_escape_string($conn, $product_id) . "'AND session_id='". mysqli_real_escape_string($conn, $session_id) ."'";

	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) {
		$remove1 = "DELETE FROM winkel_productenlijst WHERE product_id='" . $product_id . "' AND session_id='" . $session_id . "'";
		$query1 = $conn -> query($remove1);
		
		if ($query1) {
				$response = array('remove' => true);
				echo json_encode($response);
		}
		
	} else {
		$response = array('remove' => false);
		echo json_encode($response);
	}

} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}


?>  