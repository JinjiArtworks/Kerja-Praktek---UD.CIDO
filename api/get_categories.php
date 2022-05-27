<?php

require("categories.php"); //Akan menghentikan scripting saat library atau class tidak berhasil dipanggil

$categories = new Category("localhost", "root", "", "cido2");

extract($_POST);
$hasil = $categories->getCategories();

echo json_encode($hasil);
