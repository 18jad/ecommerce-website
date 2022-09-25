<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

//decalre the post varaibales
$user_id= $_POST["user_id"];
$code = $_POST["code"];

$check_code = $mysql -> prepare("SELECT code FROM vouchers WHERE code = '$code'");

//execute the select query
$check_code -> execute();
$array = $check_code -> get_result();
$response = [];

//put the data in the array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

// check if response have data, if true send an error message
if ($response) {

//udpate the user_id on the insert code
$add_voucher = $mysql -> prepare("UPDATE vouchers set user_id=$user_id WHERE code ='$code'");

if ($add_voucher=== false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the update query
$add_voucher -> execute();

echo json_encode("success");
    
}

else{

    echo json_encode("error: code not found.");
};

?>
