<?php

//retrieve clients data from users table
//Returns json array data if success
//otherwise returns error message

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");
include("image_handler.php");

//select info from the table sellers of specific username
$clients_data = $mysql -> prepare("SELECT * FROM users");

if ($clients_data === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$clients_data -> execute();
$array = $clients_data -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

foreach($response as $res) {
    $address = $res["photo"];
    if(isset($address)) {
        $res["photo"] = imageEncode($address);
    };
};

// send the resposne with succces message
echo json_encode($response);

?>
