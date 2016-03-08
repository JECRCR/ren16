<?php
require_once("../config.php");
require_once("../inc/connection.php");
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['username'])){
        global $db;
        $id = $_POST['eventID'];
        $q = $db->prepare("SELECT name, college, city, email, contact, teamname, team FROM users JOIN registrations ON registrations.`userId` = users.id WHERE registrations.`eventId`=? order by registrations.time desc");
        $q->execute(array($id));
        $result = [];
        while($row = $q->fetch(PDO::FETCH_ASSOC)){
            $result[] = $row;
        }

        $json = json_encode($result);
        echo $json;
   } else{
       echo "ERROR!";
   }
} else{
    echo "ERROR!";
}

?>
