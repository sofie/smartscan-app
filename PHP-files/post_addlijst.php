<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	
	$name = $_POST['name'];
	$user_id = $_POST['user_id'];

	$qry = "SELECT name FROM lists WHERE user_id = '" .$user_id. "' AND name ='".$name."'";
	
	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0){
		$response = array('add' => false);
		echo json_encode($response);
	}else {
		$insert = "
			INSERT INTO lists (name, user_id) 
			VALUES ('" . mysqli_real_escape_string($conn, $name) . "',
					'" . mysqli_real_escape_string($conn, $user_id ). "')
			";

		$query = $conn -> query($insert);
		if ($query) 
		{
			$response = array('add' => true, 'lijstNaam' => $name, 'userId' => $user_id);
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