<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");

$seller_id=$_POST["seller_id"];

//function to get the top 5 selleviewd productrs depends on the visited
function getTopViewdProduct($seller_id,$mysql) {

//select top 5 visited products
$top_5= $mysql -> prepare("SELECT * FROM products where seller_id=$seller_id ORDER BY visited DESC LIMIT 5");

if ($top_5 === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$top_5 -> execute();
$array = $top_5 -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

return $response;
};


?>
