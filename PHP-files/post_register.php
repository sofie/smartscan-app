<?php
$con = @new mysqli('localhost', 'root', 'root', 'smartscan');
if ($con -> connect_error) 
{
	echo "Oeps, geen connectie met de databank.";
	exit ;
}

$username = $_POST['userName'];
$password = $_POST['userPassword'];
//$firstname = $_POST['userFirstname'];
//$lastname = $_POST['userLastname'];
$email = $_POST['userEmail'];

//$sql = "SELECT userName,userEmail FROM tblUser WHERE userName = '" . $username . "' OR userEmail = '" . $email . "'";
$sql = "SELECT userEmail FROM tblUser WHERE userEmail = '" . $email . "' OR userName = '" . $username . "'";

$query = $con -> query($sql);
if ($num_rows = $query -> num_rows > 0) 
{
	echo "Deze gebruikersnaam en/of e-mail is al in gebruik.";
} else 
{
	$insert = 
		"INSERT INTO tblUser (userPassword,userEmail,userName) 
		VALUES (
		'" . mysqli_real_escape_string($con, $password) . "',
		'" . mysqli_real_escape_string($con, $email) . "',
		'" . mysqli_real_escape_string($con, $username) . "')";
	
	$query = $con -> query($insert);
	if ($query) 
	{
		$response = array(
			'registered' => true,
			'email' => $row['userEmail'],
			'password' => $row['userPassword']
		);
		echo json_encode($response);
		
	} 
	else 
	{
		$response = array(
			'registered' => false,
			'message' => 'Registreren is mislukt.'
		);
	echo json_encode($response);
	}
}
?>  