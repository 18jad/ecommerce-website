<?php

// Takes in: userName and password
// Returns: "Username Not Found!" or "Incorrect Password!" if failed
// Returns token if success

include("connection.php");
include("token.php");

// Init Variables

$userName = $_POST["userName"];
$password = $_POST["password"];

// Functions

function retrieveDate($user, $mysql) {
    $query = $mysql -> prepare(
        "SELECT date_joined AS dj FROM sellers
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
        "SELECT username FROM sellers
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
        $tokenPayload = payloadCreate($userName, "seller");
        echo json_encode(tokenEncode($tokenHeader, $tokenPayload, $SECRETKEY));
    };
};

?>
