<?php

require_once ('connection.php');
$conn = @new mysqli($dbserver, $dbuser, $dbpass, $dbase);

if (!$conn -> connect_error) {

	$id = $_POST['id'];

	$delete = "DELETE FROM winkel_sessie WHERE id='" . mysqli_real_escape_string($conn, $id) . "'";

	$query = $conn -> query($delete);
	if ($query) {
		
			$response = array('remove' => true, 'id' => $id);
			echo json_encode($response);
			$conn -> close();

	}


} else {
throw new Exception('Oeps, geen connectie.');

echo "Oeps, geen connectie.";
exit ;
}
?> 