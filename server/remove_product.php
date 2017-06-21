<?php

header('Access-Control-Allow-Origin: *');
require_once 'utils.php';

$name = trim($_POST['name']);
$user = get_session()['email'];

$return = array();

if (empty($name) || empty($user)) {
    $return['status'] = false;
    $return['error'] = 'Product name cannot be empty';
} else if (!check_login()) {
    $return['status'] = false;
    $return['error'] = 'Invalid user';
} else if (!remove_product($user, $name)) {
    $return['status'] = false;
    $return['error'] = 'DB error';
} else {
    $return['status'] = true;
}

header('Content-Type: application/json');
echo json_encode($return);
