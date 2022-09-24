<?php

// Get Request
// 5 Top Sellers
// 10 Random Products
// example:

// [
//     [
//         {
//             top 5
//         }
//         {
//             top 5
//         }
//         {
//             top 5
//         }
//     ]
//     [
//         {
//             random 10
//         }
//         {
//             random 10
//         }
//     ]
// ]

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
        ORDER BY times_purchased DESC
        LIMIT 5"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];

    while($i = $array -> fetch_assoc()){
        $response[] = $i;
    };
    
    return $response;
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
    
    return $response;
};

$best = getBestProducts($mysql);
$random = getRandomProducts($mysql);

foreach($best as $b) {
    $prodId = $b["id"];
    $photo = imageRetrieve($prodId, "product", $mysql);
    $best[$index]["photo"] = $photo;
    $index++;
};

$index = 0;

foreach($random as $r) {
    $prodId = $r["id"];
    $photo = imageRetrieve($prodId, "product", $mysql);
    $random[$index]["photo"] = $photo;
    $index++;
};

$json = [];
$json[] = $best;
$json[] = $random;

echo json_encode($json);

?>
