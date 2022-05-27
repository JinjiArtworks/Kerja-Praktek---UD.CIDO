<?php

require("profile.php"); //Akan menghentikan scripting saat library atau class tidak berhasil dipanggil

$profile = new Profile("localhost", "root", "", "cido2");

extract($_POST);
$hasil = $profile->getProfile($username);

echo json_encode($hasil);
