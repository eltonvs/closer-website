<?php

header('Access-Control-Allow-Origin: *');
require_once 'utils.php';

$email = trim(strtolower($_POST['email']));
$password = $_POST['password'];

$return = array();

if (empty($email) or empty($password)) {
    $return['status'] = false;
    $return['error'] = 'Email or password cannot be empty';
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $return['status'] = false;
    $return['error'] = 'Invalid email';
} else if (auth_user($email, $password)) {
    $return['status'] = true;
} else {
    $return['status'] = false;
    $return['error'] = 'Invalid email or password';
}

header('Content-Type: application/json');
echo json_encode($return);
