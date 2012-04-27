<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) {
	$id = $_POST['id'];
	$user_id=$_POST['user_id'];

	$qry = "SELECT id FROM lists WHERE id = '" . mysqli_real_escape_string($conn, $id) . "'";

	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) {
		$remove = "DELETE FROM lists WHERE id='" . $id . "'";
		$remove1 = "DELETE FROM list_details WHERE list_id='" . $id . "'";
		
		$queryRemove = $conn -> query($remove);
		$query1 = $conn -> query($remove1);
		
		if ($queryRemove && $query1) {
				$noLists = "SELECT * FROM `lists` WHERE user_id='".$user_id."'";
				$queryNoLists = $conn -> query($noLists);
				if ($num_rows = $queryNoLists -> num_rows = 0) {
					$singleResult = mysqli_fetch_assoc($queryNoLists);
				}
				$response = array('remove' => true,'');
				echo json_encode($response);
		}
		
	} else {
		$response = array('remove' => false);
		echo json_encode($response);
	}

} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>  