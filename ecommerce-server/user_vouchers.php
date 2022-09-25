<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

$user_id=$_POST['user_id'];

//select qrcode from the table voucher_sent of specific username
$get_voucher = $mysql -> prepare("SELECT amount,code,qrcode FROM vouchers where user_id=$user_id");

if ($get_voucher === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$get_voucher -> execute();
$array =$get_voucher -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

// encode the data array by jsonencode
echo json_encode($response);

?>