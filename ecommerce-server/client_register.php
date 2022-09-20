<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");

// Init Variables

$userName = $_POST["userName"];
$name = $_POST["name"];
$email = $_POST["email"];
$dateJoined = date("d M Y @ " . "H" . ":i");
$password = hash("sha256", $_POST["password"] . $dateJoined . "thcaj5445");
$money = 0;
$banned = 0;

// Functions

function checkExists($user, $email, $mysql) {
    $check = $mysql -> prepare(
        "SELECT username, email FROM users
        WHERE username = '$user' OR email = '$email'"
    );

    $check -> execute();
    $array = $check -> get_result();

    $response = [];

    while($i = $array -> fetch_assoc()){
        $response[] = $i;
    };

    if ($response) {
        return false;
    };

    return true;
};

function registerClient() {
    $query = $mysql -> prepare(
        "INSERT INTO users(`name`, username, `password`, email, date_joined, `money`, banned)
        VALUE (?, ?, '$password', ?, '$dateJoined', '$money', '$banned')");

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> bind_param("sss", $name, $user, $email);
    $query -> execute();

    return true;
};

?>
