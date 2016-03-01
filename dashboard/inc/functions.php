<?php
require_once("../config.php");
require_once("../inc/connection.php");
session_start();
if (isset($_SESSION['username'])){
   $username = $_SESSION['username'];
   check_session();
}
function check_credentials($info){
   global $db;
   $username = htmlspecialchars($info['uname'], ENT_QUOTES, 'UTF-8');
   $password = htmlspecialchars($info['pword'], ENT_QUOTES, 'UTF-8');

   $sql = 'SELECT * FROM dashboard WHERE username=:uname and password=:pword';
   $q = $db->prepare($sql);
   $q->execute(array(':uname'=>$username, ':pword'=>$password));
   $result = $q->fetchAll();
   $count = count($result);
   if(count($result)){
      return true;
   } else{
      return false;
   }
}

function start_session($username){
   $username = htmlspecialchars($username, ENT_QUOTES, 'UTF-8');
   $_SESSION['username'] =$username;
   $_SESSION['ac_time'] = time();
}

function check_session(){
   $time = time();
   if($time-$_SESSION['ac_time']>1000){
      echo "<script>
               alert('Your session has expired, Please Login!');
               window.location.href='logout.php';
            </script>";
   } else{
      $_SESSION['ac_time'] = $time;
   }
}
?>
