<?php

require("orders.php"); //Akan menghentikan scripting saat library atau class tidak berhasil dipanggil

$orders = new Orders("localhost", "root", "", "cido2");

extract($_POST);
$hasil = $orders->getOrderList($username);

echo json_encode($hasil);
