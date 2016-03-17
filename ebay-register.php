<?php

require 'config.php';
require 'inc/connection.php';


function already_registered($email){
   global $db;
   $sql = 'SELECT * from ebay_register WHERE email_c = ?';
   $q = $db->prepare($sql);
   $q->execute(array($email));
   $result = $q->fetchAll();
   if(count($result)){
      return true;
   } else{
      return false;
   }
}

function email_cropped($email){
  $parts = explode('@',$email);
  return implode('',explode('.',$parts[0])).'@'.$parts[1];
}

function ebay_register($name, $email, $email_c){
    global $db;
    $q = $db->prepare("INSERT INTO ebay_register(name,email,email_c,time) VALUES(?,?,?,NOW())");
    return $q->execute(array($name, $email,$email_c));
}

if (isset($_POST)){
  if(isset($_POST['name']) && isset($_POST['email']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $email_c = email_cropped($email);

    if(already_registered($email_c)){
      echo "You have been already registered. Please be patient, you'll receive the coupon soon";
    } else {
      if(ebay_register($name,$email,$email_c)){
        echo "Congrats! You'll recieve the mail coupon soon";
      } else {
        echo "Some unexpected error occurred. Try again later";
      }
    }
  } else {
    echo "Invalid Email ";
  }
}
