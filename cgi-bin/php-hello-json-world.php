<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache');

$date = date('Y-m-d H:i:s');
$address = $_SERVER['REMOTE_ADDR'];

$message = array(
  'title' => 'Hello, JSON World!',
  'heading' => 'Hello, JSON World!',
  'message' => 'This page was generated with PHP and returned as JSON',
  'time' => $date,
  'IP' => $address
);

echo json_encode($message);
?>
