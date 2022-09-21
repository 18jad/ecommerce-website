<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
include("token.php");

// Init Variables

$userName = $_POST["userName"];
$password = hash("sha256", $_POST["password"] . $dateJoined . "thcaj5445");

// Functions

function retrieveDate() {
    $query = $mysql -> prepare(
        "SELECT date_joined AS dj FROM users
        WHERE username = '$userName'"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    return $response[0]["dj"];
};

?>
