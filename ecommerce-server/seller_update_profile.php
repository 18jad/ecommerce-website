<?php

// NEEDS TESTING

// NEEDS TESTING

// NEEDS TESTING

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");
include("image_handler.php");

//decalre the input varaibales
$id = $_POST["id"];
$name = $_POST["name"];
$photo = $_POST["photo"];
$description = $_POST["description"];

// Main

if (isset($photo)) {
    $decodedImage = imageDecode($photo);
    imageSave($decodedImage, $id, "seller", $mysql);
};

if(isset($name) and isset($description)) {
    $query = $mysql->prepare("UPDATE sellers SET name = ?, description = ? WHERE id = ?");
    $query->bind_param("sss",$name, $description, $id);
    $query->execute();

} elseif (isset($name)) {
    $query1 = $mysql->prepare("UPDATE sellers SET name = ? WHERE id = ?");
    $query1->bind_param("ss", $name, $id);
    $query1->execute();

} elseif (isset($description)) {
    $query1 = $mysql->prepare("UPDATE sellers SET description = ? WHERE id = ?");
    $query1->bind_param("ss", $description, $id);
    $query1->execute();

} 

// send the resposne with succces message
echo json_encode("user updated");

?>
