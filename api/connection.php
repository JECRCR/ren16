<?php
function getDB()
{
    try {
        $db_username = "lokesh";
        $db_password = "lokesh";
        $db_name = "ren16";
        $conn = new PDO('mysql:host=localhost;dbname='.$db_name, $db_username, $db_password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
    }
    return $conn;
}