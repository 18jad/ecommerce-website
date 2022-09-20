<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");

// Init Variables

$userName = $_POST["userName"];
$name = $_POST["name"];
$email = $_POST["email"];
$dateJoined = date("d M Y @ " . "H" . ":i");
$password = hash("sha256", $_POST["password"] . $dateJoined . "thcaj5445");
$money = 0;
$banned = 0;

?>
