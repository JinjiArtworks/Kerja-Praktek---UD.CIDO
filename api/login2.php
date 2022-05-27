<?php
header("Access-Control-Allow-Origin: *");
extract($_POST);

$c = new mysqli("localhost", "root", "", "cido2");
$sql = "SELECT * FROM user WHERE username = ? AND password = ?";
// $sql = "SELECT * FROM master_user WHERE userid='$userid' AND pwd='$pwd'";
$us = array();
$i = 0;
$result = $c->query($sql);
while ($obj = $result->fetch_assoc()) {
    $us[$i]['username'] = $obj['username'];
    $us[$i]['password'] = $obj['password'];
    $i++;
    $arr = array('result' => 'OK', 'data' => $array);
}
echo json_encode($us);
$c->close();
