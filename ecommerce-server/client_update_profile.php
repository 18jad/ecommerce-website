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

if(isset($name) and isset($photo)) {
    $query = $mysql->prepare("UPDATE users SET name = ?, photo = ? WHERE id = ?");
    $query->bind_param("sss",$name, $photo, $id);
    $query->execute();
} elseif (isset($name)) {
    $query1 = $mysql->prepare("UPDATE users SET name = ? WHERE id = ?");
    $query1->bind_param("ss", $name, $id);
    $query1->execute();
}  else {
    $query1 = $mysql->prepare("UPDATE users SET photo = ? WHERE id = ?");
    $query1->bind_param("ss",$photo, $id);
    $query1->execute();
}

// send the resposne with succces message
echo json_encode("user updated");

?>
