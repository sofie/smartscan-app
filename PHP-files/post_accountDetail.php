<?php

require_once ('connection.php');
$conn = @new mysqli($dbserver, $dbuser, $dbpass, $dbase);

if (!$conn -> connect_error) {

	$id = $_POST['id'];
	$email = $_POST['email'];
	$username = $_POST['username'];

	$insert = "UPDATE users
				SET email='" . mysqli_real_escape_string($conn, $email) . "', username='" . mysqli_real_escape_string($conn, $username) . "'
				WHERE id='" . mysqli_real_escape_string($conn, $id) . "'";

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