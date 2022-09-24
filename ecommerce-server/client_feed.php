<?php

// 5 top sellers
// 10 random products

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
include("image_handler.php");

// Init Variables

$id = $_POST["id"];
$userName = $_POST["userName"];

// Functions

function getBestProducts($mysql) {
    $query = $mysql -> prepare(
        "SELECT * FROM products
        ORDER BY times_purchased DES
        LIMIT 5"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];

    while($i = $array -> fetch_assoc()){
        $response[] = $i;
    };
    
    return $response[0];
};


function getFollowedTweets($followedIds, $mysql) {
    $response = [];
    $index = 0;

    foreach($followedIds as $id) {
        $query = $mysql -> prepare(
            "SELECT t.id, u.username, u.f_name, u.l_name, t.`text`, t.`time` FROM users u, tweets t
            WHERE t.`user_id` = '$id' AND u.id = '$id'"
        );

        $query -> execute();
        $array = $query -> get_result();

        while($i = $array -> fetch_assoc()){
            $response[] = $i;
        };
    };

    foreach($response as $resp) {
        $id = $resp["id"];

        $query = $mysql -> prepare(
            "SELECT COUNT(`user_id`) AS likes FROM likes
            WHERE tweet_id = '$id'"
        );

        $query -> execute();
        $array = $query -> get_result();

        
        
        while($i = $array -> fetch_assoc()){
            $response[$index]["likes"] = $i["likes"];
            $test[] = $i;
            $index++;
        };
    };

    return $response;
};

$userId = returnId($userName, $mysql);
$followedIds = getFollowing($userId , $mysql);
$userData = getUserData($userName, $mysql);
$tweetsData = getFollowedTweets($followedIds, $mysql);
$json = [];
$json[] = $userData;
$json[] = $tweetsData;
echo json_encode($json);

?>
