<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) 
{
	$username = $_POST['userName'];
	$password = $_POST['userPassword'];
	$email = $_POST['userEmail'];

	$sql = "SELECT email FROM users WHERE email = '" . $email . "' OR username = '" . $username . "'";

	$query = $conn -> query($sql);
	if ($num_rows = $query -> num_rows > 0) 
	{
		$response = array('registered' => false);
		echo json_encode($response);
	} 
	else 
	{
		$insert = "INSERT INTO users (password,email,username) 
		VALUES (
		'" . md5($password) . "',
		'" . mysqli_real_escape_string($conn, $email) . "',
		'" . mysqli_real_escape_string($conn, $username) . "')";
		
		$userId = "SELECT id FROM users WHERE username='".$username."'";

		$query = $conn -> query($insert);
		$queryId = $conn -> query ($userId);
		$singleResult = mysqli_fetch_assoc($queryId);
		if ($query) 
		{
			$response = array('registered' => true, 'username' => $username,"userid" => $singleResult['id']);
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