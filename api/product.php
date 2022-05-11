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
  public function getProducts()
  {
    $sql = "SELECT * FROM products ORDER BY idproducts ASC";
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