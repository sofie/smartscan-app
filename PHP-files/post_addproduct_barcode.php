<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) 
{
	
	$list_id = $_POST['list_id'];
	$barcode = $_POST['barcode'];
	
	$getBarcode = "SELECT id FROM products WHERE barcode='".$barcode."'";
	$queryBarcode = $conn -> query($getBarcode);
	$singleResult = mysqli_fetch_assoc($queryBarcode);

	$qry = "SELECT * FROM list_details WHERE list_id = '" .$list_id. "' AND product_id ='".$singleResult['id']."'";
	

	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) 
	{
		$response = array('add' => false);
		echo json_encode($response);
	} 
	else 
	{
		$insert = "
			INSERT INTO list_details (list_id, product_id) 
			VALUES ('" . mysqli_real_escape_string($conn, $list_id) . "',
					'" . mysqli_real_escape_string($conn, $singleResult['id'] ). "')
			";

		$query = $conn -> query($insert);
		if ($query) 
		{
			$response = array('add' => true, 'listId' => $list_id, 'productId' => $singleResult['id']);
			echo json_encode($response);
			$conn -> close();
		} 
		
	}
} 
else 
{
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>  