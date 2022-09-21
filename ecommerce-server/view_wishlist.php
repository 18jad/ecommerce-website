<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

$user_id = $_POST["user_id"];

//select info from the table products which wishlist by a user
$view_wishlist= $mysql -> prepare("SELECT id,seller_id,name,category,description,price,orders,times_favorited,discount,visited 
FROM products p inner join wishlists w 
on p.id= w.product_id where w.user_id=$user_id");

if ($view_wishlist === false) {
    die(json_encode("error: " . $mysql -> error));
};

?>
