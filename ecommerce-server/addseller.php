<?php

// the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

//decalre the input varaibales
$username = $_POST["username"];
$name = $_POST["name"];
$password = hash("sha256", $_POST["password"]);
$description = $_POST["description"];
$money =$_POST["money"];
$date_joined = date("d M Y @ " . "H" . ":i");

//select the username from the database to check if exist
$check_seller = $mysql -> prepare(
    "SELECT username FROM sellers
    WHERE username = '$username'"
);

//execute the select query
$check_seller -> execute();
$array = $check_seller -> get_result();

$response = [];
