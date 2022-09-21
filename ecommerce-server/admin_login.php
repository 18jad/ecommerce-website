<!-- Takes in: userName and password
Returns: "Username Not Found!" or "Incorrect Password!" if failed
Returns token if success -->

<?php

include("connection.php");
include("token.php");

// Init Variables

$userName = $_POST["userName"];
$password = $_POST["password"];

// Functions

function checkAdmin($user, $mysql) {
    $query = $mysql -> prepare(
        "SELECT username FROM users
        WHERE username = '$user'"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    if($response[0] == null) {
        die(json_encode("Incorrect Username!"));
    }

    return true;
};

function checkPassword($user, $pass, $mysql) {
    $hashedPassword = hash("sha256", $pass . "thcaj5445");

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

if(checkAdmin($userName, $mysql)) {
    if(checkPassword($userName, $password, $mysql)) {
        $tokenPayload = payloadCreate($userName, "admin");
        echo json_encode(tokenEncode($tokenHeader, $tokenPayload, $SECRETKEY));
    };
};

?>
