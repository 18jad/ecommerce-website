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


?>