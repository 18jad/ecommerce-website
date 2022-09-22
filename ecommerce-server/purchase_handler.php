<?php

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

function getPrice($id, $mysql) {
    $query = $mysql -> prepare(
        "SELECT `price` FROM products
        WHERE id = ?"
    );

    $query -> bind_param("s", $id);
    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    return $response[0]["price"];
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

$price = getPrice($prodId, $mysql);
$totalPrice = $price * $quantity;

?>
