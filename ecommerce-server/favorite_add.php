<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

//decalre the input varaibales
$user_id = $_POST["user_id"];
$product_id = $_POST["product_id"];

//select the username from the database to check if exist
$add_favorite = $mysql -> prepare("INSERT INTO favorited_products(user_id,product_id) VALUE (?, ?)");

if ($add_favorite=== false) {
    die(json_encode("error: " . $mysql -> error));
};

?>