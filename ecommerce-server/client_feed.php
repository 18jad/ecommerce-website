<?php

// Get Request
// 5 Top Sellers
// 10 Random Products

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
include("image_handler.php");

// Init Variables

$index = 0;

// Functions

function getBestProducts($mysql) {
    $query = $mysql -> prepare(
        "SELECT id, `name`, `description`, category, price FROM products
        ORDER BY times_purchased DES
        LIMIT 5"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];

    while($i = $array -> fetch_assoc()){
        $response[] = $i;
    };
    
    return $response[0];
};


function getRandomProducts($mysql) {
    $query = $mysql -> prepare(
        "SELECT id, `name`, `description`, category, price FROM products
        ORDER BY RAND()
        LIMIT 10"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];

    while($i = $array -> fetch_assoc()){
        $response[] = $i;
    };
    
    return $response[0];
};

$best = getBestProducts($mysql);
$random = getRandomProducts($mysql);

foreach($best)

$json = [];
$json[] = $best;
$json[] = $random;

echo json_encode($json); 

?>
