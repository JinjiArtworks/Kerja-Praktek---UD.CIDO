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
    public function createUser($username, $password, $phone, $alamat)
    {
        if ($username == "" && $password == "" && $phone = "" && $alamat = "") {
            $arr = array("result" => "FAILED", "message" => "Cannot create new account.");
        } else {
            $sql = "INSERT INTO user(username, password,alamat,nomor_hp) VALUES (?,?,?,?)";
            if ($stmt = $this->koneksi->prepare($sql)) {
                $stmt->bind_param("ssss", $username, $password, $alamat, $phone);
                if ($stmt->execute()) {
                    // SHOW OK RESULT
                    $arr = array("result" => "OK", "message" => "Successfully create new account");
                } else {
                    $arr = array("result" => "FAILED", "message" => "Cannot create new account. \nEmail already exist");
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
}
