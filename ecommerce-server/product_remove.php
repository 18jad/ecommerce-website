<?php

// Takes in: userName / id
// Returns true on success. otherwise logs the error

include("connection.php");

// Init Variables

$sellerUserName = $_POST["userName"];
$productId = $_POST["id"];

// Functions

function deleteImage($id, $mysql) {
    $query = $mysql -> prepare(
        "DELETE FROM images WHERE product_id = ?"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> bind_param("s", $id);
    $query -> execute();

    return true;
};

function deleteWishlists($id, $mysql) {
    $query = $mysql -> prepare(
        "DELETE FROM wishlists WHERE product_id = ?"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> bind_param("s", $id);
    $query -> execute();

    return true;
};

function deleteFavorites($id, $mysql) {
    $query = $mysql -> prepare(
        "DELETE FROM favorited_products WHERE product_id = ?"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> bind_param("s", $id);
    $query -> execute();

    return true;
};

function startKeyChecks($mysql) {
    $query = $mysql -> prepare(
        "SET FOREIGN_KEY_CHECKS = 1"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> execute();

    return true;
};

function stopKeyChecks($mysql) {
    $query = $mysql -> prepare(
        "SET FOREIGN_KEY_CHECKS = 0"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> execute();

    return true;
};

function deleteProduct($id, $mysql) {
    $query = $mysql -> prepare(
        "DELETE FROM products WHERE id = ?"
    );

    if ($query === false) {
        die(json_encode("error: " . $mysql -> error));
    };

    $query -> bind_param("s", $id);
    $query -> execute();

    return true;
};

// Main

stopKeyChecks($mysql);
deleteFavorites($productId, $mysql);
deleteWishlists($productId, $mysql);
deleteImage($productId, $mysql);
echo json_encode(deleteProduct($productId, $mysql));
stopKeyChecks($mysql);

?>
