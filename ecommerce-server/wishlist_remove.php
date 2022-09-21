<?php
//Takes in: user_id / product_id
//Returns succes message if the execute query true(if the product deleted form the wishlit)
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
$remove_wishlist = $mysql -> prepare("DELETE from wishlists where user_id=$user_id and product_id=$product_id");

if ($remove_wishlist=== false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the query
$remove_wishlist -> execute();

// send the resposne with succces message
echo json_encode("product hass been removed from wishlist");

?>
