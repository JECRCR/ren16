<?php

require 'config.php';
require 'inc/connection.php';

function valid($data){
    $valid = true;
    foreach ($data as $key => $value){
        if($value==''){
            $valid = false;
            break;
        }
    }
    return $valid;
}

function already_registered($data){
   global $db;
   $sql = 'SELECT * from users, events, registrations WHERE eventID = events.id && userID = users.id && users.token = :token  && eventID = :eventID';
   $q = $db->prepare($sql);
   $q->execute(array(':token'=>$data['token'], ':eventID'=>$data['eventID']));
   $result = $q->fetchAll();
   if(count($result)){
      return true;
   } else{
      return false;
   }
}

function register($data){
    global $db;

    $sql = 'SELECT id from `users` WHERE token = :token';
    $q = $db->prepare($sql);
    $q->execute(array(':token'=>$data['token']));
    $result = $q->fetch();
    $userID = $result['id'];

    $sql="INSERT INTO `registrations` (eventID, userID, teamname, team) VALUES(:eventID, :userID, :teamname, :team)";
    $q = $db->prepare($sql);
    $q->execute(array(':eventID'=>$data['eventID'],
                      ':userID'=>$userID,
                      ':teamname'=>$data['teamname'],
                      ':team'=>$data['team']
    ));
}

if (isset($_POST)){
    if($_POST['form'] == 'register'){
        $error = '';
        $data   = array();
        if(valid($_POST)){
            if(already_registered($_POST)){
                $error = 'Already Registered';
            } else{
                register($_POST);
            }
        } else{
            $error = 'Please Fill The Form';
        }

        if ( $error != '') {
            $data['success'] = false;
            $data['error']  = $error;
        } else {
            $data['success'] = true;
            $data['message'] = 'success';
        }

        echo json_encode($data);
    } else if (isset($_POST['token'])){
        global $db;
        $sql = $db->prepare("SELECT events.name, events.title, teamname from users, events, registrations WHERE eventID = events.id && userID = users.id && users.token = ?");
        $sql->execute(array($_POST['token']));
        $sql = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($sql);
    } else{
        echo "error";
    }
} else{
    echo "error";
}
