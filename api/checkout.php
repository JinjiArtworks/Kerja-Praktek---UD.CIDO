<?php

require("product.php"); //Akan menghentikan scripting saat library atau class tidak berhasil dipanggil

$checkout = new Product("localhost", "root", "", "cido2");

extract($_POST);
$date   = new DateTime(); //this returns the current date time
$order_date = $date->format('Y-m-d');
$no_order = rand(10, 1000);
$hasil = $checkout->insertOrder($no_order, $order_date, $username, $idproducts, $product_quantity, $product_price);

echo json_encode($hasil);
