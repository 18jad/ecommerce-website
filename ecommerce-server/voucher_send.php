<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

//decalre the post varaibales
$username= $_POST["username"];
$user_id= $_POST["user_id"];

$user_id_send = $mysql -> prepare("SELECT id FROM users WHERE username='$username'");

//execute the select query
$user_id_send -> execute();
$array = $user_id_send -> get_result();
$get_userid = [];

//put the data in the array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

//get the id of the user send
$json=json_encode($response);
$user_send=$response[0]['id'];

//udpate the user_id in table users by id of the user send
$send_voucher = $mysql -> prepare("UPDATE vouchers set user_id=$user_send where user_id = $user_id ");

//execute the update query
$send_voucher -> execute();

echo json_encode("voucher sent");

?>
