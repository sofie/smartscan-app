<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) 
{
	$userEmail = $_POST['userEmail'];
	$userPassword = $_POST['userPassword'];

	$qry = "SELECT * FROM tblUser WHERE userEmail = '" . mysqli_real_escape_string($conn, $userEmail) . "' AND userPassword = '" . mysqli_real_escape_string($conn, $userPassword) . "'";
	
	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) 
	{
		$row = mysqli_fetch_array($query);
		$response = array('logged' => true, 'userEmail' => $row['userEmail'], 'userPassword' => $row['userPassword']);
		echo json_encode($response);
	} 
	else 
	{
		$response = array('logged' => false, 'message' => 'Onjuiste login.');
		echo json_encode($response);
	}
}
else 
{
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>