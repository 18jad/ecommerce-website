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
$orders = 0;
$times_favorited = 0;
$discount = 0;
$visited = 0;

// Functions

function editProduct($id, $name, $cat, $desc, $price, $ord, $mysql) {
    $query = $mysql -> prepare(
        "UPDATE products SET `name` = ?, category = ?, `description`= ?,
        price = ?, orders = ? WHERE id = ?");

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> bind_param("ssssss", $name, $cat, $desc, $price, $ord, $id);
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

    $data = new stdClass();
    $data -> name = $response[0]["name"];
    $data -> category = $response[0]["category"];
    $data -> description = $response[0]["description"];
    $data -> price = $response[0]["price"];

    return $data;
};

function getSellerId($user, $mysql) {
    $query = $mysql -> prepare(
        "SELECT id FROM sellers
        WHERE username = '$user'");

    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    return $response[0]["id"];
};

// Main

$sellerId = getSellerId($sellerUserName, $mysql);

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

echo json_encode(addProduct($sellerId, $name, $category, $description,
$price, $orders, $times_favorited, $discount, $visited, $mysql));

?>
