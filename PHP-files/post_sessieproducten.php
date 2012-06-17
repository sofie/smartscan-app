<?php

require_once ('connection.php');
$conn = @new mysqli($dbserver, $dbuser, $dbpass, $dbase);

if (!$conn -> connect_error) {

	$barcode = $_POST['barcode'];
	$session_id = $_POST['session_id'];

	$qryId = "SELECT id,price FROM products WHERE barcode = '" . $barcode . "'";
	$queryId = $conn -> query($qryId);
	if ($num_rows = $queryId -> num_rows != 0) {
		$singleResultId = mysqli_fetch_assoc($queryId);
		
		$bestaatAl = "SELECT id,aantal FROM winkel_productenlijst WHERE session_id = '" . $session_id . "' AND product_id='".$singleResultId['id']."'";
		$queryBestaatAl = $conn -> query($bestaatAl);
		$bestaat = mysqli_fetch_assoc($queryBestaatAl);
		
		if($queryBestaatAl->num_rows==0){
			$promo = "SELECT id,discount FROM promotions WHERE product_id='".$singleResultId['id']."'";
			$queryPromo = $conn -> query($promo);
			$promoQry = mysqli_fetch_assoc($queryPromo);
			
			$insert = "
				INSERT INTO winkel_productenlijst (session_id,product_id,promotion_id,calculated_price)
				VALUES ('" . mysqli_real_escape_string($conn, $session_id) . "',
						'" . mysqli_real_escape_string($conn, $singleResultId['id']) . "',
						'" . mysqli_real_escape_string($conn, $promoQry['id']) . "',
						'" . mysqli_real_escape_string($conn, $singleResultId['price']-($promoQry['discount']*$singleResultId['price'])) . "')";
		
			$query = $conn -> query($insert);
			if ($query) {
				$response = array('add' => true, 'session_id' => $session_id, 'product_id' => $singleResultId['id'],'price'=>$singleResultId['price']-($promoQry['discount']*$singleResultId['price']));
				echo json_encode($response);
				$conn -> close();
			}
		}else{
			$aantal=$bestaat['aantal']+1;
			$insert = "UPDATE winkel_productenlijst
						SET aantal='" . mysqli_real_escape_string($conn, $aantal). "'
						WHERE session_id='" . mysqli_real_escape_string($conn, $session_id) . "' AND product_id='" . mysqli_real_escape_string($conn, $singleResultId['id']). "'";

			$query = $conn -> query($insert);
			
			$response = array('bestaatAl' => true,'oud_aantal'=>$bestaat['aantal'],'nieuw_aantal'=>$aantal);
			echo json_encode($response);
			$conn -> close();
		}
		
	}else{
		$response = array('add' => false, 'message' => 'Product niet gevonden.');
		echo json_encode($response);
		$conn -> close();
	}

} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?> 