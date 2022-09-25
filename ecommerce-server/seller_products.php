<?php

// Takes in: sellerId.
// Returns: All Products of Seller.

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
        $response[] = $i;
    };

    return $response;
};

// Main

$response = getData($sellerId, $mysql);
$i = 0;

foreach($response as $res) {
    $image = imageRetrieve($id, "product", $mysql);
    $response[0]["photo"] = $image;
    $i++;
};

echo json_encode($response);

?>
