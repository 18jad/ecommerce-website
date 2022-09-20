<?php

// Init Variables

$SECRETKEY = "CDr9tr&Rk1c50ealZRrxcX#4";

$myObj = new stdClass();
$myObj -> alg = "HS256";
$myObj -> typ = "JWT";
$tokenHeader = json_encode($myObj);

// Functions

function tokenEncode($header, $payload, $key) {
    $encodedHeader = base64_encode($header);
    $encodedPayload = base64_encode($payload);
    $encodedSignature = hash_hmac("sha256", "$encodedHeader" . "." . "$encodedPayload", $key);
    return ("$encodedHeader" . "." . "$encodedPayload" . "." . "$encodedSignature");
};

function verifySignature($token, $key) {
    $explodedArray = explode(".", $token);
    $encodedSignature = hash_hmac("sha256", "$explodedArray[0]" . "." . "$explodedArray[1]", $key);
    return ($explodedArray[2] === $encodedSignature);
};

function tokenDecode($token) {
    $payload = explode(".", $token);
    return base64_decode($payload[1]);
};

function tokenUser($token) {
    tokenDecode($token);
};

function tokenAlive($token, $key){
    if(! verifySignature($token, $key)) {
        return false;
    };

    $userData = tokenDecode($token);
    $result = json_decode($userData, true);
    $expTime = $result["exp"];

    if ($expTime < time()) {
        return false;
    };

    return true;
};

//Check if user is allowed to manipulate his own data
function isAuthorized($user, $token, $key) {
    if (! tokenAlive($token, $key)) {
        return false;
    };

    $decodedUser = tokenDecode($token);
    $result = json_decode($decodedUser, true);
    $decodedUser = $result["username"];

    if (! ($user === $decodedUser)) {
        return false;
    };

    return true;
};

?>
