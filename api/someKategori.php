<?php
header("Access-Control-Allow-Origin: *");

$koneksi = new mysqli("localhost", "root", "", "cido");

extract($_POST);

$sql = "SELECT * FROM categories where idcategories=?";
$stmt = $koneksi->prepare($sql);
$stmt->bind_param("i", $idcategories);
$stmt->execute();
$arr = array();
$i = 0;
if ($hasil = $stmt->get_result()) {
  while ($obj = $hasil->fetch_object()) {
    $arr[$i] = $obj;
    $i++;
  }
} else {
  $arr[0] = 'No Categories';
}
echo json_encode($arr);
