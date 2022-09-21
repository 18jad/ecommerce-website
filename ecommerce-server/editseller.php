<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");


$username = $_POST["username"];

//decalre the input varaibales
$new_name = $_POST["new_name"];
$new_desc = $_POST["new_desc"];
$new_money =$_POST["new_money"];



?>