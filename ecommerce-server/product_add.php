<?php

include("connection.php");

// Init Variables

$sellerUserName = $_POST["userName"];
$name = $_POST["name"];
$category = $_POST["category"];
$description = $_POST["description"];
$price = $_POST["price"];
$orders = 0;
$times_favorited = 0;
$discount = 0;
$visited = 0;

// Functions

function addProduct($name, $cat, $desc, $price, $ord, $fav, $disc, $visit, $mysql) {
    $query = $mysql -> prepare(
        "INSERT INTO products(`name`, category, `description`,
        price, orders, times_favorited, discount, visited)
        VALUE (?, ?, ?, ?, '$ord', '$fav', '$disc', '$visit')");

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> bind_param("ssss", $name, $cat, $desc, $price);
    $query -> execute();

    return true;
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



?>
