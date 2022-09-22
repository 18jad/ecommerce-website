<?php

include("connection.php");

function imageDecode($image) {
    return base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image)); //stackoverflow
};

function imageSave($image, $id, $type, $mysql) {
    $photoAddress = dirname(__FILE__) . "../images/" . $type . $id . ".png";
    file_put_contents($photoAddress, $image);
    $postAddress = "images/" . $type . $id . ".png";

    if($type == "profile") {
        $query = $mysql -> prepare(
            "UPDATE users SET profile_pic = '$postAddress'
            WHERE id = '$id'");
    } else {
        $query = $mysql -> prepare(
            "INSERT INTO images(tweet_id, `image`)
            VALUE ('$id', '$postAddress')");
    };

    if ($query === false) {
        die("error: " . $mysql -> error);
    };

    $query -> execute();
};

function imageRetrieve($id, $type, $mysql) {
    if($type == "profile") {
        $query = $mysql -> prepare(
            "SELECT profile_pic AS pic FROM users
            WHERE id = '$id'");
    } else {
        $query = $mysql -> prepare(
            "SELECT `image` AS pic FROM images
            WHERE tweet_id = '$id'");
    };

    if ($query === false) {
        die("error: " . $mysql -> error);
    };

    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    $photoAddress =  $response[0]["pic"];
    $image = file_get_contents($photoAddress);
    $imageEncoded = base64_encode($image);
    
    return ("data:image/png;base64," . $imageEncoded);
};

?>
