<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, PATCH, DELETE');

//include the connection to the database
include("connection.php");

//declare discount id varaible to delete on it
$discount_id=$_POST["discount_id"];

//query to delete seller of specific username
$delete_discount = $mysql -> prepare("DELETE from discounts where id= $discount_id");

if ($delete_discount === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the delete query
$delete_discount -> execute();

// send the resposne with succces message
echo json_encode("Discount has been deleted");


?>
