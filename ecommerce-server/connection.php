<?php

// Variables

$host = "localhost"; //Where to send data
$db_user = "root"; //Credentials of sever
$db_pass = null;
$db_name = "ecommerce"; //Name of DB

//Create New Instance of Class
$mysql = new mysqli($host, $db_user, $db_pass, $db_name);

?>
