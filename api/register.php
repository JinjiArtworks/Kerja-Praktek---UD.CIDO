<?php

require("user.php"); //Akan menghentikan scripting saat library atau class tidak berhasil dipanggil

$user = new User("localhost", "root", "", "cido");

extract($_POST);
$hasil = $user->createUser($username, $password, $phone, $alamat);

echo json_encode($hasil);
