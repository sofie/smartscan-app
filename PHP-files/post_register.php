<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) 
{
	$username = $_POST['userName'];
	$password = $_POST['userPassword'];
	//$firstname = $_POST['userFirstname'];
	//$lastname = $_POST['userLastname'];
	$email = $_POST['userEmail'];

	//$sql = "SELECT userName,userEmail FROM tblUser WHERE userName = '" . $username . "' OR userEmail = '" . $email . "'";
	$sql = "SELECT userEmail FROM tblUser WHERE userEmail = '" . $email . "' OR userName = '" . $username . "'";

	$query = $conn -> query($sql);
	if ($num_rows = $query -> num_rows > 0) 
	{
		$response = array('registered' => false);
		echo json_encode($response);
	} 
	else 
	{
		$insert = "INSERT INTO tblUser (userPassword,userEmail,userName) 
		VALUES (
		'" . mysqli_real_escape_string($conn, $password) . "',
		'" . mysqli_real_escape_string($conn, $email) . "',
		'" . mysqli_real_escape_string($conn, $username) . "')";

		$query = $conn -> query($insert);
		if ($query) 
		{
			$response = array('registered' => true, 'username' => $username);
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