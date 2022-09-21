<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

$seller_id=$_POST["seller_id"];

//select top 5 visited products
$top_5= $mysql -> prepare("SELECT * FROM products where seller_id=$seller_id ORDER BY visited DESC LIMIT 5");

if ($top_5 === false) {
    die(json_encode("error: " . $mysql -> error));
};

?>