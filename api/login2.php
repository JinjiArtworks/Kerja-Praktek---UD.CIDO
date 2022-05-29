<?php
header("Access-Control-Allow-Origin: *");
extract($_POST);

$c = new mysqli("localhost", "root", "", "cido2");
$sql = "SELECT * FROM user WHERE username = ? AND password = ?";
// $sql = "SELECT * FROM master_user WHERE userid='$userid' AND pwd='$pwd'";
$i = 0;
$result = $c->query($sql);
// while ($obj = $result->fetch_assoc()) {
//     $us[$i]['username'] = $obj['username'];
//     $us[$i]['password'] = $obj['password'];
//     $i++;
//     $arr = array('result' => 'OK', 'data' => $array);
// }
// echo json_encode($us);

if ($result->num_rows > 0) {
    while ($baris = $result->fetch_assoc()) {
        $array[] = $baris;
        $arr = array('result' => 'OK', 'data' => $array);
        $i++;
    }
} else {
    $arr = array('result' => 'Failed');
}

echo json_encode($arr);
$c->close();
