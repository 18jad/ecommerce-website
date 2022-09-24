<?php

// Before Requesting this API, Make sure client has enough money to purchase product(s)
// This API only handles 1 purchase at a time. call it multiple times for more products
// Takes in: userId / userName / prodId / quantity / discount(if not POST null)
// Returns: true on successful purchase

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
include("discount_validity.php");

// Init Variables

$userId = $_POST["userId"];
$userName = $_POST["userName"];
$prodId = $_POST["prodId"];
$quantity = $_POST["quantity"];
$discount = $_POST["discount"];
$time = date("d M Y @ " . "H" . ":i");

// Functions

function addOrder($id, $prodId, $quan, $time, $price, $mysql) {
    $query = $mysql -> prepare(
        "INSERT INTO orders(`user_id`, product_id, quantity, `time`, price)
        VALUE (?, ?, ?, '$time', ?)"
    );

    if ($query === false) {
        return false;
    };

    $query -> bind_param("ssss", $id, $prodId, $quan, $price);
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
        "UPDATE products SET times_purchased = times_purchased + '$quan'
        WHERE id = '$id'"
    );

    if ($query === false) {
        return false;
    };

    $query -> execute();

    return true;
};

function addMoneySeller($id, $price, $mysql) {
    $query = $mysql -> prepare(
        "UPDATE sellers SET `money` = `money` + '$price'
        WHERE id = '$id'"
    );

    if ($query === false) {
        return false;
    };

    $query -> execute();

    return true;
};

function removeMoneyClient($user, $price, $mysql) {
    $query = $mysql -> prepare(
        "UPDATE users SET `money` = `money` - '$price', amount_spent = amount_spent + '$price'
        WHERE username = '$user'"
    );

    if ($query === false) {
        return false;
    };

    $query -> execute();

    return true;
};

// Main

$data = getData($prodId, $mysql);
$price = $data[0]["price"];
$sellerId = $data[0]["id"];
$totalPrice = $price * $quantity;

if(isset($discount)) {
    $discount = checkDiscountValidity($sellerId, $discount, $mysql);

    if($discount) {
        $discountAmount = ($totalPrice * $discount["p"]) / 100 ;
        $totalPrice = $totalPrice - $discountAmount;
    };
};

if(addOrder($userId, $prodId, $quantity, $time, $totalPrice, $mysql)) {
    if(updateProduct($prodId, $quantity, $mysql)) {
        if(addMoneySeller($sellerId, $totalPrice, $mysql)) {
            die(json_encode(removeMoneyClient($userName, $totalPrice, $mysql)));
        };
    };
};

echo json_encode("false");

?>
