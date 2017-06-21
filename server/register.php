<?php

header('Access-Control-Allow-Origin: *');
require_once 'utils.php';

$name = trim($_POST['name']);
$email = trim(strtolower($_POST['email']));
$password = $_POST['password'];
$confpassword = $_POST['confpassword'];

$return = array();
if (empty($email) or empty($password) or empty($confpassword)) {
    $return['status'] = false;
    $return['error'] = 'Email or password cannot be empty';
} else if ($password !== $confpassword) {
    $return['status'] = false;
    $return['error'] = 'Passwords don\'t match';
} else if(strlen($password) < 6) {
    $return['status'] = false;
    $return['error'] = 'Password is too short';
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $return['status'] = false;
    $return['error'] = 'Invalid email';
} else if (is_registered($email)) {
    $return['status'] = false;
    $return['error'] = 'This Email was already registered';
} else if (!register_user($name, $email, $password)) {
    $return['status'] = false;
    $return['error'] = 'DB error';
} else {
    $return['status'] = true;
}

header('Content-Type: application/json');
echo json_encode($return, JSON_UNESCAPED_UNICODE);
