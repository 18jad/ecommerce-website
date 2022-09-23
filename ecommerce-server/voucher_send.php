<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");
//decalre the post varaibales
$user_send = $_POST["user_send"];
$username = $_POST["username"];
$code = $_POST["code"];

//select the qrcode frome table vouchers
$query = $mysql -> prepare("SELECT qrcode FROM vouchers WHERE code ='$code'");

if ($query=== false) {
    die(json_encode("error: " . $mysql -> error));
};


//execute the select query
$query -> execute();
$array = $query -> get_result();
$response = [];

//put the data in the array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};



$qr_code = $response[0]["qrcode"];

//insert into table voucher_sent
$send_voucher = $mysql -> prepare("INSERT INTO voucher_sent(user_send,user_received,qrcode) VALUE (?, ?, ?)");

if ($send_voucher === false) {
    die(json_encode("error: " . $mysql -> error));
};
//execute the query
$send_voucher -> bind_param("sss",$user_send,$username,$qr_code);
$send_voucher -> execute();

// send the resposne with succces message
echo json_encode("success");

?>