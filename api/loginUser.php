<?php

require("user.php"); //Akan menghentikan scripting saat library atau class tidak berhasil dipanggil

$product = new User("localhost", "root", "", "cido2");

extract($_POST);
$hasil = $product->getLogin($username, $password);

echo json_encode($hasil);
