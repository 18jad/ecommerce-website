<?php

// Takes in: userName / id
// Returns true on success. otherwise logs the error

include("connection.php");

// Init Variables

$sellerUserName = $_POST["userName"];
$productId = $_POST["id"];

// Functions

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

echo json_encode(deleteProduct($productId, $mysql));

?>
