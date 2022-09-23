<?php

// NEEDS TESTING

// NEEDS TESTING

// NEEDS TESTING

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

//decalre the input varaibales
$id = $_POST["id"];
$name = $_POST["name"];
$photo = $_POST["photo"];

if (isset($photo)) {
    $decodedImage = imageDecode($photo);
    imageSave($decodedImage, $id, "client", $mysql);
};

if(isset($name)) {
    $query = $mysql->prepare("UPDATE users SET name = ? WHERE id = ?");
    $query->bind_param("ss", $name, $id);
    $query->execute();
} 

// send the resposne with succces message
echo json_encode("user updated");

?>
