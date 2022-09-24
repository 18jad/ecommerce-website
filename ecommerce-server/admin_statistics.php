<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");

function getTopSellers($mysql) {
    $query = $mysql -> prepare("SELECT * FROM sellers ORDER BY money DESC LIMIT 5 ");
    
    $query -> execute();
    $array = $query -> get_result();
    
    $response = [];
    
    while($i = $array -> fetch_assoc()) {
        $response[] = $i;
    };

    return $response;
};

function getTopClients($mysql) {
    $query = $mysql -> prepare("SELECT * FROM users ORDER BY amount_spent DESC LIMIT 5 ");
    
    $query -> execute();
    $array = $query -> get_result();
    
    $response = [];
    
    while($i = $array -> fetch_assoc()) {
        $response[] = $i;
    };

    return $response;
};

$TopSellers = getTopSellers($mysql);
$Topclients = getTopClients($mysql);
$json = [];
$json[] = $TopSellers;
$json[] = $Topclients;
echo json_encode($json);


?>