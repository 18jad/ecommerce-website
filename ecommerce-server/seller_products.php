<?php

// Retrieves 1 Product at a time. call multiple times for more products.
// Takes in: prodId.
// Returns: All Product Data.

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
include("image_handler.php");

// Init Variables

$sellerId = $_POST["sellerId"];

// Functions

function getData($id, $mysql) {
    $query = $mysql -> prepare(
        "SELECT * FROM products
        WHERE seller_id = ?"
    );

    $query -> bind_param("s", $id);
    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    while($i = $array -> fetch_assoc()) {
        
    }

    return $response;
};

// Main

$data = getData($prodId, $mysql);
$image = imageRetrieve($prodId, "product", $mysql);

$data[0]["photo"] = $image;

echo json_encode($data);

?>
