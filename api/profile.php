<?php
require_once("open_connection.php");

class Profile extends Koneksi
{
    public function __construct($server, $user, $password, $database)
    {
        header("Access-Control-Allow-Origin: *");
        parent::__construct($server, $user, $password, $database);
    }

    //Method
    public function getProfile($username)
    {
        // $sql = "SELECT * FROM user where username='$username'";
        // $result = $this->koneksi->prepare($sql);
        // // $stmt->bind_param("s", 'lalapoo');
        // // $stmt->execute();
        // $arr = array();
        // $i = 0;

        // if ($result->num_rows > 0) {
        //     while ($obj = $result->fetch_object()) {
        //         $data[$i] = $obj;
        //         $i++;
        //     }
        // } else {
        //     $data[] = "empty";
        // }

        // return $data;

        // if ($hasil = $stmt->get_result()) {
        //     while ($obj = $hasil->fetch_object()) {
        //         $arr[$i] = $obj;
        //         $i++;
        //     }
        // } else {
        //     $arr[] = 'No Data Customers';
        // }
        // return $arr;

        $sql = "SELECT * FROM user where username = '$username'";
        $result = $this->koneksi->query($sql);
        $data = array();

        if ($result->num_rows > 0) {

            $data[] = $result->fetch_assoc();
            // var_dump($data[0]["username"]);
        } else {
            $data[] = "empty";
        }

        return $data[0];
    }
}
