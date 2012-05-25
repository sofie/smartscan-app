<?php

require_once ('connection.php');
$conn = @new mysqli($dbserver, $dbuser, $dbpass, $dbase);

if (!$conn -> connect_error) {

	$user_id = $_POST['user_id'];
	$startuur= $_POST['startuur'];

	$insert = "INSERT INTO winkel_sessie (user_id, startuur) 
				VALUES ('" . mysqli_real_escape_string($conn, $user_id) . "',
						'" . mysqli_real_escape_string($conn, $startuur) . "')";

	$query = $conn -> query($insert);
	if ($query) {
		$session_id = "SELECT id FROM winkel_sessie WHERE user_id='".$user_id."' AND startuur='".$startuur."'";
		$query_sessionId = $conn -> query($session_id);
		$singleResult = mysqli_fetch_assoc($query_sessionId);
		$response = array('add' => true, 'sessionId' => $singleResult['id'], 'userId' => $user_id,'startuur'=>$startuur);
		echo json_encode($response);
		$conn -> close();
	}

} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>  