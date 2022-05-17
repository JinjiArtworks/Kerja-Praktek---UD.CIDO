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

  public function getSomeProduct($idcategories)
  {
    $sql = "SELECT * FROM products where idcategories = ? ORDER BY idproducts ASC ";
    $stmt = $this->koneksi->prepare($sql);
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
      $arr[0] = 'No Product';
    }
    return $arr;
  }

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
