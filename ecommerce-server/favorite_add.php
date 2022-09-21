<?php

//Takes in: user_id / product_id
//Returns succes message if the execute query true
//otherwise returns error message

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

//execute the query
$add_favorite -> bind_param("ss", $user_id, $product_id);
$add_favorite -> execute();

// send the resposne with succces message
echo json_encode("product added to favorites");

?>
