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

?>