<?php

require '../inc/connection.php';

if (isset($_POST['token'])){
    global $db;
    $sql = $db->prepare("SELECT events.name, events.title, teamname from users, events, registrations WHERE eventID = events.id && users.token = ?");
    $sql->execute(array($_POST['token']));
    $sql = $sql->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($sql);
} else{
    echo "error";
}
