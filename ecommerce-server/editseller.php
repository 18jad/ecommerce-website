<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");


$username = $_POST["username"];

//decalre the input varaibales
$new_name = $_POST["new_name"];
$new_desc = $_POST["new_desc"];
$new_money =$_POST["new_money"];

//select info from the table sellers of specific username
$seller_info = $mysql -> prepare("SELECT name,description,money FROM sellers WHERE username = '$username'");

if ($seller_info === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$seller_info -> execute();
$array = $seller_info -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};
//fetch the array and get the data
$name = $response[0]["name"];
$desc = $response[0]["description"];
$money = $response[0]["money"];


?>