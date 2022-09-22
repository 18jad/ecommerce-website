<?php

// Before Requesting this API, Make sure client has enough money to purchase product(s)
// This API only handles 1 purchase at a time. call it multiple times for more products
// Takes in: userName / prodId / quantity
// Returns: true on successful purchase

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
include("discount_validity");

// Init Variables

$userName = $_POST["userName"];
$prodId = $_POST["prodId"];
$quantity = $_POST["quantity"];
$time = date("d M Y @ " . "H" . ":i");

// Functions

function addOrder($id, $quan, $time, $price, $mysql) {
    $query = $mysql -> prepare(
        "INSERT INTO orders(product_id, quantity, `time`, price)
        VALUE (?, ?, '$time', ?)"
    );

    $query -> bind_param("sss", $id, $quan, $price);
    $query -> execute();

    return true;
};

function getData($id, $mysql) {
    $query = $mysql -> prepare(
        "SELECT seller_id AS id, `price` FROM products
        WHERE id = ?"
    );

    $query -> bind_param("s", $id);
    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    return $response;
};

function updateProduct($id, $quan, $mysql) {
    $query = $mysql -> prepare(
        "UPDATE products SET times_purchased += '$quan'
        WHERE id = '$id'"
    );

    $query -> execute();

    return true;
};

function addMoneySeller($id, $totalPrice, $mysql) {
    $query = $mysql -> prepare(
        "UPDATE sellers SET `money` += '$totalPrice'
        WHERE id = '$id'"
    );

    $query -> execute();

    return true;
};

function removeMoneyClient($user, $totalPrice, $mysql) {
    $query = $mysql -> prepare(
        "UPDATE clients SET `money` -= '$totalPrice'
        WHERE username = '$user'"
    );

    $query -> execute();

    return true;
};

// Main

$data = getPrice($prodId, $mysql);
$price = $data[0]["price"];
$sellerId = $data[0]["id"];
$totalPrice = $price * $quantity;



?>
