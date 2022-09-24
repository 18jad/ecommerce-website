<?php

// Takes in: prodId.
// Returns: All Product Data.

// example:

// [
//     {
//         "id": 1,
//         "seller_id": 2,
//         "name": "RTX 3080 Ti",
//         "category": "electronics",
//         "description": "8gb",
//         "price": 1200,
//         "orders": 0,
//         "times_favorited": 0,
//         "discount": 0,
//         "visited": 0,
//         "times_purchased": 2,
//         "photo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAn4A
//             AAEOCAYAAAAXGho8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJc
//             EhZcwAAFiUAABYlAUlSJPAAAP+lSURBVHhe7L0FfFXH+v19b10priFOCMHdrbQ
//             FChR3d3d3d3dtsQpFCoXi7k4Cwd1poS3FLWG9a83JwO65ob3Sy/++v8+esHjG9
//             2yb+e7Zcv6Gl+aiEf30MapVr4Sa1SrjaORBnD93FtevX8cTxh8/HInZ06fhx2tX
//             cPvObURHR8eUc53rXOc617nOda5z3V/hXir4AVHo3KU92rZsjoMH9uHC+XO4ePEi
//             HkTdx+C+vVGqyIc4cvggTp89hTt37niKuc51rnOd61znOte57i9xLwH8nuLpU8/sX
//             XR0FL5b/A0mDx+EvTu349yF87hw6aKJH9y/D9o0b4TjRw/j9OnTZibQda5znetc5z
//             rXuc51f517yeD3BKvXLMNXU8dj66YNOHPuHM5fvGBu627ZuA4D+/TA+rWrcfLkSVy+
//             fJnlnppyrnOd61znOte5znWu+8/dSwW/p0+jsHHTKgN+a1YuN+CnWb9Hjx7iyKFwTB
//             g9HEsXf2fA7/z584iKijLlXOc617nOda5znetc95+7lwx+0Th8ZD/mT....." //VERY LONG
//     }
// ]

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");
include("image_handler.php");

// Init Variables

$prodId = $_POST["prodId"];

// Functions

function getData($id, $mysql) {
    $query = $mysql -> prepare(
        "SELECT * FROM products
        WHERE id = ?"
    );

    $query -> bind_param("s", $id);
    $query -> execute();
    $array = $query -> get_result();

    $response = [];
    $response[] = $array -> fetch_assoc();

    return $response;
};

// Main

$data = getData($prodId, $mysql);
$image = imageRetrieve($prodId, "product", $mysql);

$data[0]["photo"] = $image;

echo json_encode($data);

?>
