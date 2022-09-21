<?php

// Takes in: userName / id / name / category / description / price
// Returns true on success. otherwise logs the error

include("connection.php");

// Init Variables

$sellerUserName = $_POST["userName"];
$productId = $_POST["id"];
$name = $_POST["name"];
$category = $_POST["category"];
$description = $_POST["description"];
$price = $_POST["price"];

// Functions

function editProduct($id, $name, $cat, $desc, $price, $mysql) {
    $query = $mysql -> prepare(
        "UPDATE products SET `name` = ?, category = ?,
        `description`= ?, price = ? WHERE id = ?"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> bind_param("sssss", $name, $cat, $desc, $price, $id);
    $query -> execute();

    return true;
};

function getProductData($id, $mysql) {
    $query = $mysql -> prepare(
        "SELECT `name`, category, `description`, price
        FROM products WHERE id = '$id'");

    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    
    while($i = $array -> fetch_assoc()) {
        $response[] = $i;
    };

    return $response;
};

// Main

$data = getProductData($productId, $mysql);

$oldName = $data[0]["name"];
$oldCategory = $data[0]["category"];
$oldDescription = $data[0]["description"];
$oldPrice = $data[0]["price"];

if(!isset($name)){
    $name = $oldName;
};

if(!isset($category)){
    $category = $oldCategory;
};

if(!isset($description)){
    $description = $oldDescription;
};

if(!isset($price)){
    $price = $oldPrice;
};

echo json_encode(editProduct($productId, $name, $category, $description, $price, $mysql));

?>
