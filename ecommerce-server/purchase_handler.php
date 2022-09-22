<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");

$userName = $_POST["userName"];
$prodId = $_POST["prodId"];
$quantity = $_POST["quantity"];
$time = date("d M Y @ " . "H" . ":i");

function addOrder($id, $quan, $time, $price, $mysql) {
    $query = $mysql -> prepare(
        "INSERT INTO orders(product_id, quan, `time`, price)
        VALUE (?, ?, '$time', ?)"
    );

    $query -> bind_param("sss", $id, $quan, $price);
    $query -> execute();

    return true;
};

