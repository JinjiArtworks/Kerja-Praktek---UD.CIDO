<?php

require("search.php"); //Akan menghentikan scripting saat library atau class tidak berhasil dipanggil

$product = new Product("localhost", "root", "", "cido");

extract($_POST);
$hasil = $product->getSearch($keyword);

echo json_encode($hasil);
