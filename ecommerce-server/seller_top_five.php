<?php

//retrieve top 5 product viewed data from table products
//return json with product data
//otherwise returns error message
// include the headers

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

$seller_id=$_POST["seller_id"];

//select top 5 visited products
$top_5= $mysql -> prepare("SELECT * FROM products where seller_id=$seller_id ORDER BY times_purchased DESC LIMIT 5");

if ($top_5 === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$top_5 -> execute();
$array = $top_5 -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

// send the resposne with succces message
echo json_encode($response);
