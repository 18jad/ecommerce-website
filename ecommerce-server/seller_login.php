<?php

// Takes in: userName and password
// Returns: "Username Not Found!" or "Incorrect Password!" if failed
// Returns id, username, token if success

// example:

// {
//     "id": 6,
//     "userName": "bach_1",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey
//     J1c2VybmFtZSI6ImJhY2hfMSIsInR5cGUiOiJzZWxsZXIiLCJp
//     YXQiOiIxNjYzNzk2OTUxIiwiZXhwIjoiMTY2MzgwNzc1MSJ9.96
//     34305abc616fcfe9f55f0eec6ac59257864af528c407ae8bb9e784ed8ac829"
// }

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
include("token.php");

// Init Variables

$userName = $_POST["userName"];
$password = $_POST["password"];

// Functions

function retrieveData($user, $mysql) {
    $query = $mysql -> prepare(
        "SELECT date_joined AS dj, id FROM sellers
        WHERE username = '$user'"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];

    while($i = $array -> fetch_assoc()) {
        $response[] = $i;
    };

    if($response == null) {
        die(json_encode("Username Not Found!"));
    };

    return $response;
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

$data = retrieveData($userName, $mysql);
$id = $data[0]["id"];
$dateJoined = $data[0]["dj"];

if(checkPassword($userName, $password, $dateJoined, $mysql)) {
    $tokenPayload = payloadCreate($userName, "seller");
    $token = tokenEncode($tokenHeader, $tokenPayload, $SECRETKEY);

    $json = new stdClass();
    $json -> id = $id;
    $json -> userName = $userName;
    $json -> token = $token;

    die(json_encode($json));
};

?>
