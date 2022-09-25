<?php

//takes user id
//retrieve data of the user

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");
include("image_handler.php");

$user_id=$_POST['user_id'];

//select info from the table users of specific user

$client_data = $mysql -> prepare("SELECT username,name,email,date_joined,money FROM users where id=$user_id");

if ($client_data === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$client_data -> execute();
$array = $client_data -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

echo json_encode($response);

?>
