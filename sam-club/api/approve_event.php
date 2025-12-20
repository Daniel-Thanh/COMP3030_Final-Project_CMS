<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("SAM");

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("
  UPDATE events SET status = ? WHERE event_id = ?
");

$stmt->execute([
  $data["status"],
  $data["event_id"]
]);

echo json_encode(["success" => true]);
