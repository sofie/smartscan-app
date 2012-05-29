<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	
	$user_id = $_POST['user_id'];
	
	$qry = "SELECT startuur,user_id,totaal,num_products
			FROM winkel_sessie
			WHERE user_id='".$user_id ."' AND einduur !='0000-00-00 00:00:00'";
			
	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getList" => true, "startuur" => $singleResult['startuur'],"totaal"=>$singleResult['totaal'],"num_products"=>$singleResult['num_products']);
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