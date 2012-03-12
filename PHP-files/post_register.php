    <?php  
    $con =@ new mysqli('localhost','root','root', 'SmartscanDB'); 
    if ($con->connect_error)  
    {  
        echo "Oeps, geen connectie met de databank.";  
        exit;  
    }  
      
       
    $username   = $_POST['userName'];  
    $password   = $_POST['userPassword'];  
    $firstname  = $_POST['userFirstname'];
    $lastname   = $_POST['userLastname'];   
    $email      = $_POST['userEmail'];  
      
    $sql        = "SELECT userName,userEmail FROM tblUser WHERE userName = '" . $username . "' OR userEmail = '" . $email . "'";  
    $query      = $con->query($sql);  
    if ($num_rows = $query->num_rows > 0)  
    {  
        echo "Deze gebruikersnaam en/of e-mail is al in gebruik.";  
    }  
    else  
    {  
        $insert = "INSERT INTO tblUser (userName,userPassword,userFirstname,userLastname,userEmail) VALUES ('" . mysqli_real_escape_string($con,$username) . "','" . mysqli_real_escape_string($con,$password) . "','" . mysqli_real_escape_string($con,$firstname) . "','" . mysqli_real_escape_string($con,$lastname) . "','" . mysqli_real_escape_string($con,$email) . "')";  
        $query  = $con->query($insert);  
        if ($query)  
        {  
            echo "Bedankt voor uw registratie.";  
        }  
        else  
        {  
            echo "Sorry, het registreren is mislukt.";  
        }  
    }  
    ?>  