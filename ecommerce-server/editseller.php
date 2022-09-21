<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");


$username = $_POST["username"];

//decalre the input varaibales
$new_name = $_POST["new_name"];
$new_desc = $_POST["new_desc"];
$new_money =$_POST["new_money"];

//select info from the table sellers of specific username
$seller_info = $mysql -> prepare("SELECT name,description,money FROM sellers WHERE username = '$username'");

if ($seller_info === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$seller_info -> execute();
$array = $seller_info -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};
//fetch the array and get the data
$name = $response[0]["name"];
$desc = $response[0]["description"];
$money = $response[0]["money"];

//check if the varaibles is set
if (isset($new_name)) {
    $Name = $new_name;
} else {
    $Name = $name;
};

if (isset($new_desc)) {
    $Desc = $new_desc;
} else {
    $Desc  = $desc;
};

if (isset($new_money)) {
    $Money = $new_money;
} else {
    $Money = $money;
};

//decalre newpassword variable
$new_password = hash("sha256", $_POST["new_password"]);

//prepare the query update
$query = $mysql -> prepare ("UPDATE sellers set name='$Name', description='$Desc', money=$Money, password='$new_password' WHERE username ='$username'");

if ($query === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the query

$query -> execute();
// send the resposne with succces message
echo json_encode("success");

?>