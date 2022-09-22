<?php

// Takes in: searchQuery
// Returns: All matches in name / category / description

// example:

// [
//     {
//         "id": 1,
//         "name": "RTX 3080 Ti",
//         "category": "electronics",
//         "description": "8gb",
//         "price": 1200
//     },
//     {
//         "id": 2,
//         "name": "GTX 970",
//         "category": "electronics",
//         "description": "4gb",
//         "price": 400
//     }
// ]

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");

// Init Variables

$searchQuery = $_POST["searchQuery"];
$regEx = ".*(" . $searchQuery . ").*";
$i = 0;

// Functions

function searchFor($search, $mysql) {
    $query = $mysql -> prepare(
        "SELECT id, `name`, category, `description`, price FROM products
        WHERE `name` REGEXP ? OR category REGEXP ? OR description REGEXP ?"
    );

    $query -> bind_param("sss", $search, $search, $search);
    $query -> execute();
    $array = $query -> get_result();

    $response = [];

    while($i = $array -> fetch_assoc()){
        $response[] = $i;
    };

    return $response;
};

// Main

$allData = searchFor($regEx, $mysql);
echo json_encode($allData);

?>
