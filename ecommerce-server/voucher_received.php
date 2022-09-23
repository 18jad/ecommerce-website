<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

$username=$_POST['username'];



//select qrcode from the table voucher_sent of specific username
$voucher_received = $mysql -> prepare("SELECT qrcode FROM voucher_sent where user_received='$username'");

if ($voucher_received === false) {
    die(json_encode("error: " . $mysql -> error));
};


?>