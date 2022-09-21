<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

//select info from the table sellers of specific username
$seller_data = $mysql -> prepare("SELECT * FROM sellers");

if ($seller_data === false) {
    die(json_encode("error: " . $mysql -> error));
};

?>
