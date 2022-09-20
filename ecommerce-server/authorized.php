<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("token.php");

// Init Variables

$userName = $_POST["userName"];
$userToken = $_POST["token"];

// Main

echo json_encode(isAuthorized($userName, $userToken, $SECRETKEY));

?>
