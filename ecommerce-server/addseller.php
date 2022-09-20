<?php

//declare the headers
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


