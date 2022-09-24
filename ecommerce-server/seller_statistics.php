<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");

$seller_id=$_POST["seller_id"];

//function to get the top 5 selleviewd productrs depends on the visited
function getTopViewdProduct($seller_id,$mysql) {

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

//function to get the product lits of the seller
function getProductList($seller_id,$mysql) {

    $product_list= $mysql -> prepare("SELECT * FROM products where seller_id=$seller_id");
    
    if ($product_list === false) {
        die(json_encode("error: " . $mysql -> error));
    };
    
    //execute the select query
    $product_list -> execute();
    $array = $product_list -> get_result();
    $response = [];
    
    //put the data in the response array
    while($info  = $array -> fetch_assoc()){
        $response[] = $info;
    };
    
    return $response;
    };

$TopProduct= getTopViewdProduct($seller_id,$mysql);
$ProductList= getProductList($seller_id,$mysql);
$json = [];
$json[] = $TopProduct;
$json[] = $ProductList;
echo json_encode($json);

?>
