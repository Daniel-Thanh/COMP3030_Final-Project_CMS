<?php
session_start();

if (!isset($_SESSION["user"])) {
  http_response_code(401);
  echo json_encode(["error" => "Unauthorized"]);
  exit;
}

function requireRole($role) {
  if ($_SESSION["user"]["role"] !== $role) {
    http_response_code(403);
    echo json_encode(["error" => "Forbidden"]);
    exit;
  }
}
