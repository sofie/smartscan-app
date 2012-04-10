<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) {
	
	$lijstId = $_POST['lijstId'];
	
	$qry = "SELECT productId, productNaam
			FROM  `tblBevatten` 	
			WHERE lijstId = '".$lijstId ."'
			ORDER BY bevattenId";
			//INNER JOIN tblProduct ON ( tblBevatten.productId = tblProduct.productId ) 

			
	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getList" => true, "productNaam" => $singleResult['productNaam'],"productId" => $singleResult['productId']);
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