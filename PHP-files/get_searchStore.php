<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	$gemeente = $_POST['gemeente'];
	
	$gemeente = '%'.$gemeente.'%';
	
	$qry = "SELECT naam, longitude, latitude
			FROM stores
			WHERE gemeente LIKE '".$gemeente ."'";
			
	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getStores" => true, "naam" => $singleResult['naam'],"longitude" => $singleResult['longitude'],"latitude" => $singleResult['latitude']);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getStores" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  