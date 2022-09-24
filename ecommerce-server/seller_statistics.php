<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connection.php");

$seller_id=$_POST["seller_id"];

//tested
//function to get the top 5 selleviewd productrs depends on the visited
function getTopViewdProduct($seller_id,$mysql) {

      $top_5= $mysql -> prepare("SELECT * FROM products where seller_id=$seller_id ORDER BY visited DESC LIMIT 5");

      if ($top_5 === false) {
        die(json_encode("error: " . $mysql -> error));
      };

      //execute the select query
      $top_5 -> execute();
      $array = $top_5 -> get_result();
      $response = [];

      //put the data in the response array
      while($info  = $array -> fetch_assoc()){
          $response[] = $info;
      };

      return $response[0];
};

//tested
//function to get the product lits of the seller
function getProductList($seller_id,$mysql) {

       $product_list= $mysql -> prepare("SELECT count(id) FROM products where seller_id=$seller_id");
    
       if ($product_list === false) {
          die(json_encode("error: " . $mysql -> error));
       };
    
       //execute the select query
       $product_list -> execute();
       $array = $product_list -> get_result();
       $response = [];
    
       //put the data in the response array
       while($info  = $array -> fetch_assoc()){
           $response[] = $info;
        };
    
        return $response[0];
};

//tested
//function to get the total products sold of a seller
function TotalItemsSold($seller_id,$mysql) {

        $item_sold= $mysql -> prepare("SELECT Sum(times_purchased) FROM products where seller_id=$seller_id");
        
        if ($item_sold === false) {
            die(json_encode("error: " . $mysql -> error));
        };
        
        //execute the select query
        $item_sold -> execute();
        $array = $item_sold -> get_result();
        $response = [];
        
        //put the data in the response array
        while($info  = $array -> fetch_assoc()){
            $response[] = $info;
        };
        
        return $response[0];
};

//tested
//function to get the total revnenue of a seller
function TotalRevnenue($seller_id,$mysql) {

    $total_money= $mysql -> prepare("SELECT money FROM sellers where id=$seller_id");
    
    if ($total_money === false) {
        die(json_encode("error: " . $mysql -> error));
    };
    
    //execute the select query
    $total_money -> execute();
    $array = $total_money -> get_result();
    $response = [];
    
    //put the data in the response array
    while($info  = $array -> fetch_assoc()){
        $response[] = $info;
    };
    
    return $response[0];
};


$TopProduct= getTopViewdProduct($seller_id,$mysql);
$ProductList= getProductList($seller_id,$mysql);
$ItemSold= TotalItemsSold($seller_id,$mysql);
$TotalRevnenue= TotalRevnenue($seller_id,$mysql);
$json = [];
$json[] = $TopProduct;
$json[] = $ProductList;
$json[] = $ItemSold;
$json[] = $TotalRevnenue;
echo json_encode($json);

?>
