<?php

require("product.php"); //Akan menghentikan scripting saat library atau class tidak berhasil dipanggil

$product = new Product("localhost", "root", "", "cido2");

extract($_POST);
$date   = new DateTime(); //this returns the current date time
$result = $date->format('Y-m-d');
$rand = rand(10, 1000);
// $hasil = $product->insertOrder($rand, $result, $username);

echo json_encode($hasil);
