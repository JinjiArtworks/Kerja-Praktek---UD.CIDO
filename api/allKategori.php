<?php
header("Access-Control-Allow-Origin: *");

$koneksi = new mysqli("localhost", "root", "", "cido2");

extract($_POST);
$sql = "SELECT * FROM categories";
$hasil = $koneksi->query($sql);

if ($hasil->num_rows > 0) {
  while ($baris = $hasil->fetch_assoc()) {
    $array[] = $baris;
    $arr = array('result' => 'OK', 'data' => $array);
  }
} else {
  $arr = array('result' => 'Failed');
}

echo json_encode($arr);
