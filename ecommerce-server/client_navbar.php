<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");
include("image_handler.php");

$user_id=$_POST['user_id'];



?>