<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {

	$product_id = $_POST['product_id'];
	$link_id = $_POST['link_id'];
	
	$qry = "SELECT linkId FROM links WHERE linkHoofdproduct='".$product_id ."'";
			
	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();
		mysqli_data_seek($result,0);
		
		while ($singleResult = mysqli_fetch_assoc($result)) {
			
			$qryDetail = "SELECT productId,name,barcode
							FROM `link_details` 
							INNER JOIN products ON(products.id=link_details.productId)
							WHERE `linkId`='".$link_id ."' AND `productId`!='".$product_id ."'";
			$resultDetail = $conn -> query($qryDetail);
			$singleResultDetail = mysqli_fetch_assoc($resultDetail);
			
			$response = array("getLink" => true, "linkId" => $singleResult['linkId'], 
								"anderName" => $singleResultDetail['name'], "anderId" => $singleResultDetail['productId'],
								"anderBarcode" => $singleResultDetail['barcode']);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getLink" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  