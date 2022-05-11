<?php
    class Koneksi
    {
        protected $koneksi;

        //Constructor
        public function __construct($server, $username="root", $password="", $db)
        {
            $this->koneksi = new mysqli($server, $username, $password, $db);
        }

        public function status()
        {
            echo "<br>Ready to process database<br>";
        }

        //Destructor
        public function __destruct()
        {
            $this->koneksi->close();
        }
    }
?>