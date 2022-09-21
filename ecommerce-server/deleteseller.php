<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, PATCH, DELETE');

//include the connection to the database
include("connection.php");

//declare seller iud varaible to delete on it
$seller_id=$_POST["seller_id"];

//query to delete seller of specific username
$delete_seller = $mysql -> prepare("DELETE from sellers where id= $seller_id");

if ($delete_seller === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the delete query
$delete_seller -> execute();

// send the resposne with succces message
echo json_encode("success");

?>