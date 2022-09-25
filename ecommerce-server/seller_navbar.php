<?php

//takes seller id
//retrieve data of the seller

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");
include("image_handler.php");

$seller_id=$_POST['seller_id'];

//select info from the table users of specific user

$seller_data = $mysql -> prepare("SELECT username,name,description,date_joined,money FROM sellers where id=$seller_id");

if ($seller_data === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$seller_data -> execute();
$array = $seller_data -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

$photo = imageRetrieve($user_id, "seller", $mysql);
$response[0]["photo"] = $photo;

echo json_encode($response);

?>
