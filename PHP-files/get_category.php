<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) {
	
	$qry = "SELECT categorieNaam, categorieId
			FROM tblCategorie";
			
	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getCat" => true, "catNaam" => $singleResult['categorieNaam'],"catId" => $singleResult['categorieId']);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getCat" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  