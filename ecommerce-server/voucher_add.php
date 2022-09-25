<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

//decalre the post varaibales
$user_id= $_POST["user_id"];
$code = $_POST["code"];

$check_code = $mysql -> prepare("SELECT code FROM vouchers WHERE code = '$code'");

//execute the select query
$check_code -> execute();
$array = $check_code -> get_result();
$response = [];

//put the data in the array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};



?>
