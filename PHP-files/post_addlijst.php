<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) 
{
	
	$lijstNaam = $_POST['lijstNaam'];

	$qry = "SELECT lijstNaam FROM tblLijst WHERE lijstNaam = '" .$lijstNaam. "'";

	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) 
	{
		$response = array('add' => false);
		echo json_encode($response);
	} 
	else 
	{
		$insert = "
			INSERT INTO tblLijst (lijstNaam) 
			VALUES ('" . mysqli_real_escape_string($conn, $lijstNaam) . "')
			";

		$query = $conn -> query($insert);
		if ($query) 
		{
			$response = array('add' => true, 'lijstNaam' => $lijstNaam);
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