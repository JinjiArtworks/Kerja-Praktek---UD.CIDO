<?php
header("Access-Control-Allow-Origin: *");
extract($_POST);


$c = new mysqli("localhost", "root", "", "cido2");
$sql = "SELECT * FROM user WHERE username = ? AND password = ?";

$stmt = $c->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$arr = array();
$arr2 = array();
$i = 0;
if ($hasil = $stmt->get_result()) {
    while ($obj = $hasil->fetch_object()) {
        $arr[$i] = $obj;
        $i++;
        $arr2 = array('result' => 'OK', 'data' => $arr);
    }
} else {
    $arr2[] = 'You have not send any email';
}


echo json_encode($arr2);
$c->close();
