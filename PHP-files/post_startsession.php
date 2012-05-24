<?php

require_once ('connection.php');
$conn = @new mysqli($dbserver, $dbuser, $dbpass, $dbase);

if (!$conn -> connect_error) {

	$user_id = $_POST['user_id'];

	$insert = "INSERT INTO winkel_sessie (user_id, startuur) 
				VALUES ('" . mysqli_real_escape_string($conn, $user_id) . "',
				'2012-05-24 13:15:00')";

	$query = $conn -> query($insert);
	if ($query) {
		$session_id = "SELECT id FROM winkel_sessie WHERE user_id='".$user_id."' AND startuur='2012-05-24 13:15:00'";
		$query_sessionId = $conn -> query($session_id);
		$singleResult = mysqli_fetch_assoc($query_sessionId);
		$response = array('add' => true, 'sessionId' => $singleResult['id'], 'userId' => $user_id);
		echo json_encode($response);
		$conn -> close();
	}

} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>  