<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

//select info from the table sellers of specific username
$clients_data = $mysql -> prepare("SELECT * FROM users");

if ($clients_data === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$clients_data -> execute();
$array = $clients_data -> get_result();
$response = [];

?>
