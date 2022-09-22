<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

require_once "phpqrcode/qrlib.php";

//decalre the post varaibales
$amount = $_POST["amount"];
$code = $_POST["code"];

//declare the path where the QR will saved
$path='images/';
//customize the name of the image
$qrcode=$path.$amount.".png";
//generate the QR code and customize the message when scan the code
Qrcode::png('Enjoy a '.$amount.'$ Voucher From JACHT',$qrcode);

?>
