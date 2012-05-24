<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	
	$user_id = $_POST['user_id'];
	
	$qry = "SELECT name, id
			FROM lists
			WHERE user_id='".$user_id ."'";
			
	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getList" => true, "lijstNaam" => $singleResult['name'],"lijstId" => $singleResult['id']);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getList" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  