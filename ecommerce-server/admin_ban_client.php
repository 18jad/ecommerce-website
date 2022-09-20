<?php

include("connection.php");

// Init Variables

$userName = $_POST["userName"];

// Functions

$query = $mysql -> prepare(
    "DELETE FROM users 
    WHERE username = '$userName'"
);

if ($query === false) {
    die(json_encode("error: " . $mysql -> error));
};

$query -> execute();

?>
