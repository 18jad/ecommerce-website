<?php

//retrieve sellers data from sellers table
//Returns json array data if success
//otherwise returns error message

// example:

// [
//     {
//         "id": 2,
//         "name": "NZXT",
//         "username": "nzxt_gpus",
//         "password": "75756751634329a8380e1bafaf97badcbb764e9c10322aa4283e2b31f870277e",
//         "description": "We sell Gpus",
//         "money": 2400,
//         "photo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAh1
//             BMVEVRAHr///9KAHY2AGnv6PNEAHKMbaS0pcOQcKjd0+SwmsFOAHhBAHC8rslHAHT6+fuSdKnBrs62oMWmj
//             Lj18Pjj2ul2T5TVyd7p4e2FYaDDss+slL2KZ6Oskb69qMvOvtlfKYRSEHt9VpmUe6teI4ObhbBvQo9oO4pkM
//             oheMoNxSJB4WJWgjLNPsnR9AAAC+ElEQVRoge2W3XqjIBBABcVNMy7mh8SsSZuYtmk33fd/vhVlEAj5qrnYm
//             53Ti4bB4ciISJIQBEEQBEEQBEEQBEEQBEH8n4i0R4QB7vz2EU5HgWnFEIgmDVd2yLnKNGpv4mLVB7IDT+Sz+
//             e2h9pKvTYd6MWm8MoGjhKdIUqZW3JvuD2a49vHip2nPeHsPLII6ATQKW9surZibZtkOk8Wy2FLEvbtipHct2
//             +mdbZoejm9L05yLBKZ5WV+yb71ZA/qyGtvPbRpsTGMDcNcr73jZmY/xvnf5IG2lT1C84G9d9anzZUqO8GZme
//             chXjFSprfJKjzDZ23W5XrlipcFeM8NlmVYYOuzMjx3Xj2DiutL8kp7XuQzHyuxrCG8lC/jqU/KFZoZ3U/ftL
//             dz3qgZ8L3QkwhY1H+5GvAfaI77LHcWTCc+Lru1pAy+rRHS+dhHtUie3qLxcFexI1usVOO5lizTilWv7INzi8
//             4tXaa9vqledbr3whtOt/CmJvVvl1B95mpdVGBi8d6arZ7yxeerNf4BjvUfzv8RlaL1wujNdvT9a7zrsG+k9+I
//             vE8Qq75295mG3XOduEfSO9s/B1RC984nSP4QBDJfTwwYTHeotX5oHeYonT/YAwuXYTPv3usV4evI7GC7+xDvXN
//             E8y9hCd/QY/2Avcqbbz2g1eewumCYh5rTzDaG9x/74UPvJl9WhjwAXhV1niv0nivP1LvHULLWv/Vy2V96HqGIw
//             cKWCUf80LjfML678Ll5qPTH3TacfFaNSyMV/mQ16t0F0iP7JbOW9gzQS7sm6acNTDF61a6K8A1ou0Pdh/Yajex
//             wu7TR/mYFxrcJvsHHptu5xW4M5d6MdlzHcvlQ96EfzleuMS02jt8Kv5059grLoPMrulvvPjZW/DgRtqAPTL47M
//             VwQ3jqxj3cHjqGb9Uq5oVt3mN3OW4Ceoks8hgXgOsiSGuwc9HgyGd7ecSbQH8aco4/ToBHgSFrSLO94Tg8qiUI
//             giAIgiAIgiAIgiAIgvjn/AXU5i7PrFhkSgAAAABJRU5ErkJggg==",
//         "date_joined": "22 Sep 2022 @ 16:46"
//     }
// ]

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");
include("image_handler.php");

//select info from the table sellers of specific username
$seller_data = $mysql -> prepare("SELECT * FROM sellers");

if ($seller_data === false) {
    die(json_encode("error: " . $mysql -> error));
};

//execute the select query
$seller_data -> execute();
$array = $seller_data -> get_result();
$response = [];

//put the data in the response array
while($info  = $array -> fetch_assoc()){
    $response[] = $info;
};

$i = 0;

foreach($response as $res) {
    $address = $res["photo"];
    if(isset($address)) {
        $encodedImage = imageEncode($address);
        $response[$i]["photo"] = $encodedImage;
    };
    $i ++;
};

// send the resposne with succces message
echo json_encode($response);

?>
