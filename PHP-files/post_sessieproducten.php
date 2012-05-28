<?php

require_once ('connection.php');
$conn = @new mysqli($dbserver, $dbuser, $dbpass, $dbase);

if (!$conn -> connect_error) {

	$barcode = $_POST['barcode'];
	$session_id = $_POST['session_id'];

	$qryId = "SELECT id FROM products WHERE barcode = '" . $barcode . "'";
	$queryId = $conn -> query($qryId);
	if ($num_rows = $queryId -> num_rows != 0) {
		$singleResultId = mysqli_fetch_assoc($queryId);
		
		/*$bestaatAl = "SELECT id FROM winkel_productenlijst WHERE session_id = '" . $session_id . "' AND product_id='".$singleResultId['id']."'";
		$queryBestaatAl = $conn -> query($bestaatAl);
		if($queryBestaatAl->num_rows==0){*/	
			$insert = "
				INSERT INTO winkel_productenlijst (session_id,product_id)
				VALUES ('" . mysqli_real_escape_string($conn, $session_id) . "',
						'" . mysqli_real_escape_string($conn, $singleResultId['id']) . "')";
		
			$query = $conn -> query($insert);
			if ($query) {
				$response = array('add' => true, 'session_id' => $session_id, 'product_id' => $singleResultId['id']);
				echo json_encode($response);
				$conn -> close();
			}
		/*}else{
			$response = array('bestaatAl' => true);
		}*/
	}else{
		$response = array('add' => false, 'message' => 'Product niet gevonden.');
		echo json_encode($response);
		$conn -> close();
	}

} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?> 