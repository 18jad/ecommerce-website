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
        "SELECT id, username, f_name, l_name FROM users
        WHERE `username` REGEXP ? OR f_name REGEXP ? OR l_name REGEXP ?"
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
