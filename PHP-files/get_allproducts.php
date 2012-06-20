<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	
	$name = $_POST['name'];
	
	$name = '%'.$name.'%';
	
	$qry = "SELECT name, id
			FROM products
			WHERE name LIKE '".$name ."'";
			
	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getProd" => true, "naam" => $singleResult['name'],"id" => $singleResult['id'], "qry"=>$qry);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getProd" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  