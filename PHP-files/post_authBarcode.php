<?php

require_once('connection.php');
$con = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);
 
if ($con->connect_error)  
{  
	echo "Oeps, geen connectie.";  
	exit;  
} 

$barcode = $_POST['barcode'];


$sql = "SELECT * FROM users WHERE barcode = '" . mysqli_real_escape_string($con,$barcode) ."'";
$query = $con->query($sql);
if ($num_rows = $query->num_rows > 0)
{
	$row = mysqli_fetch_array($query);
	$response = array(
		'logged' => true,
		'id' => $row['id'],
		'barcode'=> $row['barcode'],
		'user' => $row['username']
	);
	echo json_encode($response);
}
else
{
	$response = array(
		'logged' => false,
		'message' => 'Foute barcode.'
	);
	echo json_encode($response);
}
?>