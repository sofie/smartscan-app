<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) 
{
	
	$list_id = $_POST['list_id'];
	$product_id = $_POST['product_id'];

	$qry = "SELECT * FROM list_details WHERE list_id = '" .$list_id. "' AND product_id ='".$product_id."'";
	

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
					'" . mysqli_real_escape_string($conn, $product_id ). "')
			";

		$query = $conn -> query($insert);
		if ($query) 
		{
			$promoQry="SELECT id FROM products WHERE id in(SELECT product_id FROM promotions WHERE product_id='" .$product_id. "')";
			$promoQuery = $conn -> query($promoQry);
			$resultPromo = mysqli_fetch_assoc($promoQuery);
			
			$promo;
			if($num_rows = $promoQuery -> num_rows == 0){
				$promo = false;
			}else{
				$promo = true;
			}
			
			$response = array('add' => true, 'listId' => $list_id, 'productId' => $product_id, 'promo'=>$promo);
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