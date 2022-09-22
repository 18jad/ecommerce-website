<?php

include("connection.php");

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

    return $response;
};

?>
