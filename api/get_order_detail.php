<?php

require("product.php"); //Akan menghentikan scripting saat library atau class tidak berhasil dipanggil

$product = new Product("localhost", "root", "", "cido2");

extract($_POST);
$hasil = $product->getOrderDetails($username);

echo json_encode($hasil);
