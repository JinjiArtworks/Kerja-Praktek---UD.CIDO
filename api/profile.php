<!-- TO SHOW PROFILE USER DATA -->
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
        $sql = "SELECT * FROM user where username=?";
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
            $arr[0] = 'NData Customersct';
        }
        return $arr;
    }
}
