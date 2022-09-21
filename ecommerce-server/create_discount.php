<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

//decalre the post varaibales
$seller_id= $_POST["seller_id"];

//insert query to the table discounts
$add_favorite = $mysql -> prepare("INSERT INTO discounts(seller_id,percentage,code) VALUE (?, ?, ?)");

if ($add_favorite=== false) {
    die(json_encode("error: " . $mysql -> error));
};


?>