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



?>
