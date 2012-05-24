<?php

require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) 
{
	$userEmail = $_POST['userEmail'];
	$userPassword = md5($_POST['userPassword']);

	$qry = "SELECT * FROM users WHERE email = '" .$userEmail . "' AND password = '".$userPassword. "'";
	
	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) 
	{
		$row = mysqli_fetch_array($query);
		$response = array('logged' => true, 'userEmail' => $userEmail, 'userId' => $row['id']);
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