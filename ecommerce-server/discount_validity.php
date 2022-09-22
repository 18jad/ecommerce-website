<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");

$id = $_POST["seller_id"];
$code = $_POST["code"];

function checkDiscountValidity($id, $code, $mysql) {
    $query = $mysql -> prepare(
        "SELECT `percentage` FROM discounts
        WHERE `code` = ? AND seller_id = ?"
    );

    $query -> bind_param("ss", $code, $id);
    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    if($response[0] == null) {
        return false;
    };

    return $response[0];
};

$check = checkDiscountValidity($id, $code, $mysql);

echo json_encode($check);

?>
