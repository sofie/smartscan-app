<?php

//ZET DEZE FILE IN HTDOCS (MAMP) OM TE TESTEN
//LET OP DE JUISTE NAAM VAN DE DATABASE
//LET OP DE JUISTE TABELNAAM EN VELD

// Select your MySQL host, username and password
$con = @new mysqli('localhost', 'root', 'root', 'smartscan');
if ($con -> connect_error) {
	echo "Oeps, geen connectie.";
	exit ;
}

$userEmail = $_POST['userEmail'];
$userPassword = $_POST['userPassword'];

$sql = "SELECT userId FROM tblUser WHERE userEmail = '" . mysqli_real_escape_string($con, $userEmail) . "' AND userPassword = '" . mysqli_real_escape_string($con, $userPassword) . "'";

$query = $con -> query($sql);

if ($num_rows = $query -> num_rows > 0) 
{
	$row = mysqli_fetch_array($query);
	$response = array(
		'logged' => true, 
		'userEmail' => $row['userEmail'],
		'userPassword' => $row['userPassword']
	);
	echo json_encode($response);
} else {
	$response = array(
		'logged' => false, 
		'message' => 'Onjuiste login.',
		'message' => 'Onjuiste password.'
	);
	echo json_encode($response);
}
?>