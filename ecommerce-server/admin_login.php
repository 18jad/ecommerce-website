<?php

// Takes in: userName and password
// Returns: "Username Not Found!" or "Incorrect Password!" if failed
// Returns id, username, token if success

// example:

// {
//     "id": 1,
//     "userName": "admin1",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFk
//     bWluMSIsInR5cGUiOiJhZG1pbiIsImlhdCI6IjE2NjM3OTQ3NjgiLCJleHAiOiIxNjYzO
//     DA1NTY4In0=.cbd142156784acb614a0ea4d7f29cc3489f8e884349dc5fc03bde3eaf90fe780"
// }

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

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
