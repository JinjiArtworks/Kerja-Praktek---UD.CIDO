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

  public function insertOrder($no_order, $order_date, $is_delivered, $username)
  {
    $sql = "INSERT INTO orders(no_order, order_date, is_delivered, username) VALUES(?,?,?,?)";
    if ($stmt = $this->koneksi->prepare($sql)) {
      $stmt->bind_param("isisi", $no_order, $order_date, $is_delivered, $username);
      if ($stmt->execute()) {
        // SHOW OK RESULT
        $arr = array("result" => "OK", "message" => "Successfully add order");
      } else {
        $arr = array("result" => "FAILED", "message" => "Cannot add order.");
      }
    } else {
      $arr = array("result" => "FAILED", "message" => "Cannot add order.");
    }
    return $arr;
  }

  public function insertOrderDetails($order_idorder, $idcategories, $idproducts, $product_quantity, $product_price)
  {
    $sql = "INSERT INTO order_details(order_idorder, idcategories, idproducts, product_quantity, product_price, subtotal) VALUES(?,?,?,?,?, ROUND(product_quantity*product_price))";
    if ($stmt = $this->koneksi->prepare($sql)) {
      $stmt->bind_param("iiiid", $order_idorder, $idcategories, $idproducts, $product_quantity, $product_price);
      if ($stmt->execute()) {
        // SHOW OK RESULT
        $sql2 = "UPDATE products p INNER JOIN order_details od on p.idproducts = od.idproducts SET p.stock = p.stock - od.product_quantity WHERE p.idproducts = ?";
        if ($stmt2 = $this->koneksi->prepare(($sql2))) {
          $stmt2->bind_param("i", $idproducts);
          $arr = array("result" => "OK", "message" => "Successfully add order");
        }
      } else {
        $arr = array("result" => "FAILED", "message" => "Cannot add order.");
      }
    } else {
      $arr = array("result" => "FAILED", "message" => "Cannot add order.");
    }
    return $arr;
  }

  public function getOrderDetails($username)
  {
    $sql = "SELECT p.product_name, p.image, p.price, p.product_description
    FROM orders o INNER JOIN order_details od ON o.idorder = od.order_idorder
    LEFT JOIN products p ON od.idproducts = p.idproducts
    WHERE o.username = ?";
    $stmt = $this->koneksi->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $arr = array();
    $i = 0;
    if ($hasil = $stmt->get_result()) {
      while ($obj = $hasil->fetch_object()) {
        $arr[$i] = $obj;
        $i++;
      }
    } else {
      $arr[] = 'You have not Order';
    }
    return $arr;
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
