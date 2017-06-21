<?php

header('Access-Control-Allow-Origin: *');
require_once 'utils.php';

header('Content-Type: application/json');
echo json_encode(dash_info());
