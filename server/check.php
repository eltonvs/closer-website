<?php

header('Access-Control-Allow-Origin: *');

require 'utils.php';

$return = array();

$return['status'] = check_login();

header('Content-Type: application/json');
echo json_encode($return);
