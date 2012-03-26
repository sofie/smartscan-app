<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) {
	
	$userId = $_POST['userId'];
	
	$qry = "SELECT lijstNaam, lijstId
			FROM tblLijst
			WHERE userId='".$userId ."'";
			
	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();

		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getList" => true, "lijstNaam" => $singleResult['lijstNaam'],"lijstId" => $singleResult['lijstId']);
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