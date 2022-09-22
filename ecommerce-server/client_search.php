<?php

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

$userId = returnId($userName, $mysql);
$blockedBy = checkBlocked($userId, $mysql);
$allData = searchFor($regEx, $mysql);

foreach($allData as $data) {
    foreach($blockedBy as $id){
        if($data["id"] == $id["user_id"]) {
            unset($allData[$i]);
        };
    };
    $i++;
};

$array = [];
foreach($allData as $data) {
    $array[] = $data;
};

echo json_encode($array);

?>
