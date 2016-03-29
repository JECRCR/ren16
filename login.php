<?php

require_once 'config.php';
require 'inc/connection.php';

function ifExists($email)
{
    global $db;
    $q = $db->prepare('SELECT * FROM users WHERE email = ?');
    $q->execute(array($email));
    $result = $q->fetchAll();
    if (count($result)) {
        return true;
    } else {
        return false;
    }
}

function signup($data)
{
    global $db;
    $name = $data['name'];
    $college = $data['college'];
    $city = $data['city'];
    $email = $data['email'];
    $contact = $data['contact'];
    $password = hash('sha256', $data['password']);
    $token = uniqid('', true);

    $sql = 'INSERT INTO `users` (name, college, city, email, contact, password, token) VALUES (:name, :college, :city, :email, :contact, :password, :token)';
    $q = $db->prepare($sql);
    $q->execute(array(':name' => $name,
                     ':college' => $college,
                     ':city' => $city,
                     ':email' => $email,
                     ':contact' => $contact,
                     ':password' => $password,
                     ':token' => $token,
   ));
}

$token = '';

function check_credentials($data)
{
    global $db, $token;
    $email = $data['email'];
    $password = hash('sha256', $data['password']);

    $sql = 'SELECT * FROM users WHERE email=:email and password=:password';
    $q = $db->prepare($sql);
    $q->execute(array(':email' => $email, ':password' => $password));
    $result = $q->fetchAll();
    $token = $result[0]['token'];
    $count = count($result);
    if (count($result)) {
        return true;
    } else {
        return false;
    }
}

function valid($data)
{
    $valid = true;
    foreach ($data as $key => $value) {
        if ($value == '') {
            $valid = false;
            break;
        }
    }
    if (filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
        $valid = false;
    }

    return $valid;
}

if (isset($_POST)) {
    $error = '';
    $data = array();

    if ($_POST['form'] == 'signup') {
        if (ifExists($_POST['email'])) {
            $error = 'Already Registered';
        } else {
            if (valid($_POST)) {
                signup($_POST);
            } else {
                $error = 'Invalid Data Entered';
            }
        }
    } elseif ($_POST['form'] == 'login') {
        if (valid($_POST)) {
            if (check_credentials($_POST) == false) {
                $error = 'Invalid Log In Credentials';
            } else {
                $data['token'] = $token;
            }
        } else {
            $error = 'Please Fill The Form';
        }
    }

    if ($error != '') {
        $data['success'] = false;
        $data['error'] = $error;
    } else {
        $data['success'] = true;
        $data['message'] = 'success';
    }

    echo json_encode($data);
} else {
    echo 'error';
}
