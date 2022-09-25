<?php

//takes user id
//retrieve data of the user

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");


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

echo json_encode($response);

?>