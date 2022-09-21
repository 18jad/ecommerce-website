<!-- Bans Unbans Clients
Returns true When Completed 
POST userName of Client to be Banned -->

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");

// Init Variables

$userName = $_POST["userName"];

// Functions

function banUser($user, $mysql) {
    $query = $mysql -> prepare(
        "UPDATE users SET is_banned = 1
        WHERE username = '$user'"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> execute();

    return true;
};

function unbanUser($user, $mysql) {
    $query = $mysql -> prepare(
        "UPDATE users SET is_banned = 0
        WHERE username = '$user'"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> execute();

    return true;
};

function checkUserStatus($user, $mysql) {
    $query = $mysql -> prepare(
        "SELECT is_banned AS ban FROM users
        WHERE username = '$user'"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    return $response[0]["ban"];
};

// Main

if(checkUserStatus($userName, $mysql) == 1) {
    echo json_encode(unbanUser($userName, $mysql));
} else {
    echo json_encode(banUser($userName, $mysql));
};

?>
