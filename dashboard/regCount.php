<?php
require_once("../config.php");
require_once("../inc/connection.php");
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['username'])){
        global $db;
        $id = substr($_POST['eventID'],0,1);
        $q = $db->prepare("SELECT eventId as 'id', count(*) as 'count' FROM users JOIN registrations ON registrations.`userId` = users.id WHERE registrations.`eventId` like '$id%%' group by eventId");
        $q->execute();
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
