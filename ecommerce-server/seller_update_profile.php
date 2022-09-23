<?php

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");

//decalre the input varaibales
$id = $_POST["id"];
$name = $_POST["name"];
$photo = $_POST["photo"];
$description = $_POST["description"];

if(isset($name) and isset($photo) and isset($description)) {
    $query = $mysql->prepare("UPDATE sellers SET name = ?, photo = ?, description = ? WHERE id = ?");
    $query->bind_param("ssss",$name, $photo, $description, $id);
    $query->execute();

} elseif (isset($name) and isset($photo)) {
    $query1 = $mysql->prepare("UPDATE sellers SET name = ?, photo = ? WHERE id = ?");
    $query1->bind_param("sss", $name, $photo, $id);
    $query1->execute();

} elseif (isset($name) and isset($description)) {
    $query1 = $mysql->prepare("UPDATE sellers SET name = ?, description = ? WHERE id = ?");
    $query1->bind_param("sss", $name, $description, $id);
    $query1->execute();

} elseif (isset($description) and isset($photo)) {
        $query1 = $mysql->prepare("UPDATE sellers SET description = ?, photo = ? WHERE id = ?");
        $query1->bind_param("sss", $description, $photo, $id);
        $query1->execute();

} elseif (isset($name)) {
    $query1 = $mysql->prepare("UPDATE sellers SET name = ? WHERE id = ?");
    $query1->bind_param("ss", $name, $id);
    $query1->execute();

} elseif (isset($photo)) {
    $query1 = $mysql->prepare("UPDATE sellers SET photo = ? WHERE id = ?");
    $query1->bind_param("ss", $photo, $id);
    $query1->execute();

} elseif (isset($description)) {
    $query1 = $mysql->prepare("UPDATE sellers SET description = ? WHERE id = ?");
    $query1->bind_param("ss", $description, $id);
    $query1->execute();

} 

// send the resposne with succces message
echo json_encode("user updated");

?>
