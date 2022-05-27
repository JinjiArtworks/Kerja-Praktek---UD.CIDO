<?php
require_once("open_connection.php");

class User extends Koneksi
{
    public function __construct($server, $user, $password, $database)
    {
        header("Access-Control-Allow-Origin: *");
        parent::__construct($server, $user, $password, $database);
    }

    //Method
    public function createUser($username, $password, $phone, $alamat, $role)
    {
        if ($username == "" && $password == "" && $phone = "" && $alamat = "" && $role = "") {
            $arr = array("result" => "FAILED", "message" => "Cannot create new account.");
        } else {
            $sql = "INSERT INTO user(username, password,phone,address,role) VALUES (?,?,?,?,?)";
            if ($stmt = $this->koneksi->prepare($sql)) {
                $stmt->bind_param("sssss", $username, $password, $alamat, $phone, $role);
                if ($stmt->execute()) {
                    // SHOW OK RESULT
                    $arr = array("result" => "OK", "message" => "Successfully create new account");
                } else {
                    $arr = array("result" => "FAILED", "message" => "Cannot create new account. \nAccount already exist");
                }
            } else {
                $arr = array("result" => "FAILED", "message" => "Cannot create new account.");
            }
        }


        return $arr;
    }

    public function updateUser($alamat, $username)
    {
        $sql = "UPDATE customers SET username = ? WHERE address = ?";
        if ($stmt = $this->koneksi->prepare($sql)) {
            $stmt->bind_param("ss", $username, $alamat);
            if ($stmt->execute()) {
                // SHOW OK RESULT
                $arr = array("result" => "OK", "message" => "Successfully update account.");
            } else {
                $arr = array("result" => "FAILED", "message" => "Cannot update account.");
            }
        } else {
            $arr = array("result" => "FAILED", "message" => "Cannot update account.");
        }

        return $arr;
    }
    public function getUser()
    {
        $sql = "SELECT * FROM user";
        $result = $this->koneksi->query($sql);
        $data = array();
        $i = 0;
        if ($result->num_rows > 0) {
            while ($obj = $result->fetch_object()) {
                $data[$i] = $obj;
                $i++;
            }
        } else {
            $data[] = "empty";
        }
        return $data;
    }
    public function getLogin($username, $password)
    {
        if ($username == "" && $password == "") {
            $arr = array("result" => "FAILED", "message" => "Cannot Login.");
        } else {
            $sql = "SELECT * FROM user WHERE username = ? AND password = ?";
            $result = $this->koneksi->query($sql);
            $data = array();
            $i = 0;
            // echo $result;
            // if ($result->num_rows > 0) {
            while ($obj = $result->fetch_object()) {
                $data[$i]['username'] = $obj['username'];
                $i++;
            }
            // } else {
            //     $data[] = "empty";
            // }

            return $result;
        }
    }
}
