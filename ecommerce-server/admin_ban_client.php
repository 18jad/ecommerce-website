<?php

include("connection.php");

// Init Variables

$userName = $_POST["userName"];

// Functions

function deleteUser($user) {
    $query = $mysql -> prepare(
        "DELETE FROM users 
        WHERE username = '$user'"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> execute();

    return true
};

// Main

echo json_encode(deleteUser($userName));

?>
