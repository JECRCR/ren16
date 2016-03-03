<?php

require 'config.php';

if( ! ini_get('date.timezone') ){
    date_default_timezone_set('GMT');
}
$msg="";
function Validate($name,$phone,$email,$message){
	global $msg;
	if( $name == "" OR $phone == "" OR $email == "" OR $message =="" ){
		$msg = "Please fill all the fields.";
		return false;
	}
	foreach ($_POST as $value) {
		if(stripos($value,'Content-Type:')!==FALSE){
			$msg = "There was a problem with the information you entered.";
			return false;
		}
	}
	return true;
}
function ValidateEmail($mail,$email){
	global $msg;
	if( !$mail->ValidateAddress($email) ){
		$msg = "You must specify a valid email address.";
		return false;
	}
	return true;
}
if($_SERVER["REQUEST_METHOD"] == "POST"){
	$name = trim($_POST["name"]);
	$phone = trim($_POST["phone"]);
	$email = trim($_POST["email"]);
	$message = trim($_POST["message"]);
    $data   = array();
	if(Validate($name,$phone,$email,$message)){
		require_once('inc/phpmailer.php');
		$mail = new PHPMailer();
		if(ValidateEmail($mail,$email)){
            $email_body = "";
            $email_body = $email_body . "Name: " . $name . "<br>";
            $email_body = $email_body . "Phone: " . $phone . "<br>";
            $email_body = $email_body . "Email: " . $email . "<br>";
            $email_body = $email_body . "Message: " . $message . "<br>";

            $mail->isSMTP();
            $mail->Host = 'smtp.sendgrid.net';
            $mail->SMTPAuth = true;
            $mail->Username = SD_USERNAME;
            $mail->Password = SD_PASSWORD;
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->SetFrom($email, $name);
            $address = "renaissance@jecrc.ac.in";
            $mail->AddAddress($address, "Renaissance");
            $mail->Subject = $name . " | Renaissance Contact";
            $mail->MsgHTML($email_body);
            if(!$mail->Send()) {
              $msg = "There was a problem sending the email.";
            }
		}
	}
    if ( $msg != '') {
        $data['success'] = false;
        $data['error']  = $msg;
    } else {
        $data['success'] = true;
        $data['message'] = 'success';
    }

    echo json_encode($data);
} else{
    echo "error";
}
