<?php

//retrieve sellers data from sellers table
//Returns json array data if success
//otherwise returns error message

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");
include("image_handler.php");

//select info from the table sellers of specific username
$seller_data = $mysql -> prepare("SELECT * FROM sellers");

if ($seller_data === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$seller_data -> execute();
$array = $seller_data -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

$i = 0;

foreach($response as $res) {
    $address = $res["photo"];
    if(isset($address)) {
        $encodedImage = imageEncode($address);
        $response[$i]["photo"] = $encodedImage;
    };
    $i ++;
};

// send the resposne with succces message
echo json_encode($response);

?>
