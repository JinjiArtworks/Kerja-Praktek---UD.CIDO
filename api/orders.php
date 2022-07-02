<?php
require_once("open_connection.php");

class Orders extends Koneksi
{
    public function __construct($server, $user, $password, $database)
    {
        header("Access-Control-Allow-Origin: *");
        parent::__construct($server, $user, $password, $database);
    }


    public function insertOrder($no_order, $order_date, $username, $idproducts, $product_quantity, $product_price)
    {
        $data = array();
        $data2 = array();
        $quantity = 0;
        $idorders = 0;
        $arr = array();
        $sql = "INSERT INTO orders(no_order, order_date, username) VALUES(?,?,?)";
        if ($stmt = $this->koneksi->prepare($sql)) {
            $stmt->bind_param("iss", $no_order,  $order_date, $username);
            if ($stmt->execute()) {
                // get id order
                $sql2 = "SELECT idorder FROM orders ORDER BY idorder DESC LIMIT 1";
                $result2 = $this->koneksi->query($sql2);
                if ($result2->num_rows > 0) {
                    $data[] = $result2->fetch_assoc();
                    $idorders = $data[0]["idorder"];
                }
                // insert ke order details
                $sql3 = "INSERT INTO order_details(idproducts, idorders, product_quantity, product_price, subtotal) VALUES(?,?,?,?,?)";
                $stmt2 = $this->koneksi->prepare($sql3);
                $subtotal = ROUND($product_quantity * $product_price);
                $stmt2->bind_param("iiidd", $idproducts, $idorders, $product_quantity, $product_price, $subtotal);
                if ($stmt2->execute()) {
                    $sqlQuantity = "SELECT product_quantity 
          FROM `order_details`
          ORDER BY order_idorder DESC LIMIT 1";
                    $result3 = $this->koneksi->query($sqlQuantity);
                    if ($result3->num_rows > 0) {
                        $data2[] = $result3->fetch_assoc();
                        $quantity = $data2[0]["product_quantity"];
                    }

                    $sql4 = "UPDATE products p INNER JOIN order_details od on p.idproducts = od.idproducts SET p.stock = (p.stock - $quantity) WHERE p.idproducts = ?";
                    if ($stmt3 = $this->koneksi->prepare(($sql4))) {
                        $stmt3->bind_param("i", $idproducts);
                        if ($stmt3->execute()) {
                            $arr = array("result" => "OK", "message" => "Successfully add order");
                        }
                    }
                } else {
                    $arr = array("result" => "FAILED", "message" => "Cannot update stok.");
                }
            } else {
                $arr = array("result" => "FAILED", "message" => "Cannot add order 2.");
            }
        } else {
            $arr = array("result" => "FAILED", "message" => "Cannot add order, Your Connection");
        }
        return $arr;
    }

    public function getOrderList($username)
    {
        $sql = "SELECT p.product_name, od.product_quantity, od.subtotal, o.no_order, o.status, p.image
      FROM orders o INNER JOIN `order_details` od ON o.idorder = od.idorders
      INNER JOIN products p ON od.idproducts = p.idproducts
      WHERE o.username = ?
      ORDER BY o.idorder DESC";
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
            $arr[0] = 'No Order Record';
        }
        return $arr;
    }
}
