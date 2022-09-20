<?php

// Init Variables

$SECRETKEY = "f6kL*Ur^7r!vugmU2LIg6Dmw";

$myObj = new stdClass();
$myObj -> alg = "HS256";
$myObj -> typ = "JWT";
$tokenHeader = json_encode($myObj);

// Functions

//Encodes and Creates the Full Token
function tokenEncode($header, $payload, $key) {
    $encodedHeader = base64_encode($header);
    $encodedPayload = base64_encode($payload);
    $encodedSignature = hash_hmac("sha256", "$encodedHeader" . "." . "$encodedPayload", $key);
    return ("$encodedHeader" . "." . "$encodedPayload" . "." . "$encodedSignature");
};

//Verifies Last Part of Token
function verifySignature($token, $key) {
    $explodedArray = explode(".", $token);
    $encodedSignature = hash_hmac("sha256", "$explodedArray[0]" . "." . "$explodedArray[1]", $key);
    return ($explodedArray[2] === $encodedSignature);
};

//Decodes the Payload of the Token
function tokenDecode($token) {
    $payload = explode(".", $token);
    return base64_decode($payload[1]);
};

//Verifies Last Part of Token AND Checks if Token Expired
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

//Check if User is Allowed To Manipulate Data
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
