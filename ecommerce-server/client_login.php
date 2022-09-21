<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
//include("token.php");

// Init Variables

$userName = $_POST["userName"];
$password = $_POST["password"];

// Functions

function retrieveDate($user, $mysql) {
    $query = $mysql -> prepare(
        "SELECT date_joined AS dj FROM users
        WHERE username = '$user'"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    if($response[0] == null) {
        die(json_encode("Username Not Found!"));
    }

    return $response[0]["dj"];
};

function checkPassword($user, $pass, $date, $mysql) {
    $hashedPassword = hash("sha256", $pass . $date . "thcaj5445");

    $query = $mysql -> prepare(
        "SELECT username FROM users
        WHERE username = '$user' AND password = '$hashedPassword'"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    if($response[0] == null) {
        die(json_encode("Incorrect Password!"));
    }

    return true;
};

// Main

$dateJoined = retrieveDate($userName, $mysql);

if($dateJoined) {
    if(checkPassword($userName, $password, $dateJoined, $mysql)) {
        echo "success";
    };
};

?>
