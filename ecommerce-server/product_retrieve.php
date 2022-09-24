<?php

// Takes in: 
// Returns: 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
include("image_handler.php");

// Init Variables

$prodId = $_POST["prodId"];

// Functions

function getData($id, $mysql) {
    $query = $mysql -> prepare(
        "SELECT * FROM products
        WHERE id = ?"
    );

    $query -> bind_param("s", $id);
    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    return $response;
};

// Main

$data = getData($prodId, $mysql);
$image = imageRetrieve($prodId, "product", $mysql);

$data[0]["photo"] = $image;

echo json_encode($data);

?>
