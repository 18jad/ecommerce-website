<?php

// Takes in: userName and password
// Returns: "Username Not Found!" or "Incorrect Password!" if failed
// Returns id, username, token if success

include("connection.php");
include("token.php");

// Init Variables

$userName = $_POST["userName"];
$password = $_POST["password"];

// Functions

function checkAdmin($user, $mysql) {
    $query = $mysql -> prepare(
        "SELECT id FROM admins
        WHERE username = '$user'"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    if($response[0] == null) {
        die(json_encode("Incorrect Username!"));
    }

    return $response[0]["id"];
};

function checkPassword($user, $pass, $mysql) {
    $hashedPassword = hash("sha256", $pass . "thcaj5445");

    $query = $mysql -> prepare(
        "SELECT username FROM admins
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

$id = checkAdmin($userName, $mysql);

if(checkPassword($userName, $password, $mysql)) {
    $tokenPayload = payloadCreate($userName, "admin");
    $token = tokenEncode($tokenHeader, $tokenPayload, $SECRETKEY);

    $json = new stdClass();
    $json -> id = $id;
    $json -> userName = $userName;
    $json -> token = $token;

    die(json_encode($json));
};

?>
