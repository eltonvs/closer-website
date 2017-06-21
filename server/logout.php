<?php

header('Access-Control-Allow-Origin: *');

require "utils.php";

logout();

$return = array('status' => empty(session_id()));

header('Content-Type: application/json');
echo json_encode($return, JSON_UNESCAPED_UNICODE);
