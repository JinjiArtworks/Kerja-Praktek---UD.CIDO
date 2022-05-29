<?php

require("user.php"); //Akan menghentikan scripting saat library atau class tidak berhasil dipanggil

$user = new User("localhost", "root", "", "cido2");

extract($_POST);
$hasil = $user->getLogin($username, $password);

echo json_encode($hasil);
