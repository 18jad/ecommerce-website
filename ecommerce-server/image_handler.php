<?php

include("connection.php");

function imageDecode($image) {
    return base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image)); //stackoverflow
};

function imageSave($image, $id, $type, $mysql) {
    $photoAddress = dirname(__FILE__) . "../images/" . $type . $id . ".png";
    file_put_contents($photoAddress, $image);
    $postAddress = "images/" . $type . $id . ".png";

    if($type == "client") {
        $query = $mysql -> prepare(
            "UPDATE users SET photo = '$postAddress'
            WHERE id = '$id'");
    } else if($type == "seller"){
        $query = $mysql -> prepare(
            "UPDATE sellers SET photo = '$postAddress'
            WHERE id = '$id'");
    } else if($type == "product"){
        $query = $mysql -> prepare(
            "INSERT INTO images(product_id, `image`)
            VALUE ('$id', '$postAddress')");
    };

    if ($query === false) {
        die("error: " . $mysql -> error);
    };

    $query -> execute();
};

function imageEncode($address) {
    $image = file_get_contents($address);
    $imageEncoded = base64_encode($image);
    
    return ("data:image/png;base64," . $imageEncoded);
};

function imageRetrieve($id, $type, $mysql) {
    if($type == "client") {
        $query = $mysql -> prepare(
            "SELECT photo AS pic FROM users
            WHERE id = '$id'");
    } else if($type == "seller") {
        $query = $mysql -> prepare(
            "SELECT photo AS pic FROM sellers
            WHERE id = '$id'");
    } else if($type == "product") {
        $query = $mysql -> prepare(
            "SELECT `image` AS pic FROM images
            WHERE product_id = '$id'");
    };

    if ($query === false) {
        return false;
    };

    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    if($response[0] == null) {
        return null;
    };
    echo $response;

    $photoAddress =  $response[0]["pic"];
    $image = file_get_contents($photoAddress);
    $imageEncoded = base64_encode($image);
    
    return ("data:image/png;base64," . $imageEncoded);
};

?>
