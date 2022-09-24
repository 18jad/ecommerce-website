<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
include("image_handler.php");

$id = $_POST["id"];
$userName = $_POST["userName"];

function getUserData($user, $mysql) {
    $query = $mysql -> prepare(
        "SELECT f_name, l_name FROM users
        WHERE username = '$user'"
    );
    
    $query -> execute();
    $array = $query -> get_result();
    
    $response = [];
    
    while($i = $array -> fetch_assoc()) {
        $response[] = $i;
    };

    $response[0]["username"] = $user;
    return $response;
};

function returnId($user, $mysql) {
    $check = $mysql -> prepare(
        "SELECT id FROM users
        WHERE username = ?"
    );

    $check -> bind_param("s", $user);
    $check -> execute();
    $array = $check -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    return $response[0]["id"];
};

function getFollowing($user, $mysql) {
    $query = $mysql -> prepare(
        "SELECT followed_user_id FROM follows
        WHERE `user_id` = '$user'"
    );

    $query -> execute();
    $array = $query -> get_result();

    $response = [];

    while($i = $array -> fetch_assoc()){
        $response[] = $i;
    };
    
    $ids = [];

    foreach($response as $resp) {
        $ids[] = $resp["followed_user_id"];
    };
    
    return $ids;
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
