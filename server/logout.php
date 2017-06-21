<?php

header('Access-Control-Allow-Origin: *');

session_id('123');
session_start();
session_unset();
session_destroy();

$return = array('status' => empty(session_id()));

header('Content-Type: application/json');
echo json_encode($return);
