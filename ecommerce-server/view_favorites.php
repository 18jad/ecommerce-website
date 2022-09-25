<?php

//Takes in: user_id 
//Returns favorite products if the execute query true
//otherwise returns error message

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

$user_id = $_POST["user_id"];

//select info from the table products which favorites by a user
$view_favorites= $mysql -> prepare("SELECT id,seller_id,name,category,description,price,times_favorited,discount,visited 
FROM products p inner join favorited_products fav 
on p.id=fav.product_id where fav.user_id=$user_id");

if ($view_favorites === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$view_favorites -> execute();
$array = $view_favorites -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

// send the resposne with succces message
echo json_encode($response);

?>
