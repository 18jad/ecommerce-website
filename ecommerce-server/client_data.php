<?php

//retrieve clients data from users table
//Returns json array data if success
//otherwise returns error message

// example:

// [
//     {
//         "id": 1,
//         "username": "charbel_daoud",
//         "name": "Charbel",
//         "password": "e1ccab0921527dd9de1237cb8f364ef6a4843dfd4e102c685e6c8434565401c3",
//         "email": "charbel@sefactory.io",
//         "is_banned": 0,
//         "date_joined": "22 Sep 2022 @ 16:51",
//         "money": 2600,
//         "photo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfMAAAGcCAYAAADNrUnEAAAAAXN
//             SR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAANNXSURBVHhe7f15tDTZWd/
//             55jnnddMN3W6v282/FvZtX+P7B/Y1vfquVbbgLq9Lt/syNDa3uxndbUSXwYjZgNAAm..........." //EXTREMELY LONG
//         "voucher": null,
//         "amount_spent": 2400
//     },
//     {
//         "id": 2,
//         "username": "Hassan",
//         "name": "Hassan",
//         "password": "5e4ee882b79d83b3949a777ae3d3eb19200830e731200126201cd886f6c0aa69",
//         "email": "hasaan@",
//         "is_banned": 0,
//         "date_joined": "23 Sep 2022 @ 22:28",
//         "money": 0,
//         "photo": null,
//         "voucher": null,
//         "amount_spent": 0
//     },
//     {
//         "id": 3,
//         "username": "batata",
//         "name": "Batata",
//         "password": "69da55c7d30f97975ad4b66c3b4947f96127de7d07cb5cb8befc1761bb75cf06",
//         "email": "batata@gmail.com",
//         "is_banned": 0,
//         "date_joined": "24 Sep 2022 @ 00:03",
//         "money": 0,
//         "photo": null,
//         "voucher": null,
//         "amount_spent": 0
//     }
// ]

// include the headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//include the connection to the database
include("connection.php");
include("image_handler.php");

//select info from the table sellers of specific username
$clients_data = $mysql->prepare("SELECT * FROM users");

if ($clients_data === false) {
    die(json_encode("error: " . $mysql->error));
};

//execute the select query
$clients_data->execute();
$array = $clients_data->get_result();
$response = [];

//put the data in the response array
while ($info  = $array->fetch_assoc()) {
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
