<?php

include("connection.php");

// Init Variables

$userName = $_POST["userName"];

// Functions

function banUser($user) {
    $query = $mysql -> prepare(
        "INSERT INTO users(is_banned) VALUE (1)
        WHERE username = '$user'"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> execute();

    return true
};

function unbanUser($user) {
    $query = $mysql -> prepare(
        "INSERT INTO users(is_banned) VALUE (0)
        WHERE username = '$user'"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> execute();

    return true
};

// Main

echo json_encode(unbanUser($userName));
//echo json_encode(banUser($userName));

?>
