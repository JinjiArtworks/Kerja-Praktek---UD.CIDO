<?php
require_once("open_connection.php");

class Product extends Koneksi
{
    public function __construct($server, $user, $password, $database)
    {
        header("Access-Control-Allow-Origin: *");
        parent::__construct($server, $user, $password, $database);
    }

    //Method
    public function getSearch($keyword)
    {
        $sql = "SELECT * FROM products where product_name LIKE '%" . $keyword . "%'";
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
}
