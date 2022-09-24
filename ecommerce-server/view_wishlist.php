<?php

//Takes in: user_id 
//Returns wishlist products if the execute query true
//otherwise returns error message

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");
include("image_handler.php");

$user_id = $_POST["user_id"];

//select info from the table products which wishlist by a user
$view_wishlist= $mysql -> prepare("SELECT id,seller_id,name,category,description,price,orders,times_favorited,discount,visited 
FROM products p inner join wishlists w 
on p.id= w.product_id where w.user_id=$user_id");

if ($view_wishlist === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$view_wishlist -> execute();
$array = $view_wishlist -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

$prodId = $response[0]["id"];
$photo = imageRetrieve($prodId, "product", $mysql);
$response[0]["photo"] = $photo;

// send the resposne with succces message
echo json_encode($response);

?>
