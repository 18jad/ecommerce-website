<?php

include("connection.php");
include("token.php");



// Functions

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

// $dateJoined = retrieveDate($userName, $mysql);

// if($dateJoined) {
//     if(checkPassword($userName, $password, $dateJoined, $mysql)) {
//         $tokenPayload = payloadCreate($userName, "client");
//         echo json_encode(tokenEncode($tokenHeader, $tokenPayload, $SECRETKEY));
//     };
// };

?>
