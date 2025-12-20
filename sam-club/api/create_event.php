<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("SAM");

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("
  INSERT INTO events (club_id, event_name, event_date, location)
  VALUES (?, ?, ?, ?)
");

$stmt->execute([
  $data["club_id"],
  $data["event_name"],
  $data["event_date"],
  $data["location"]
]);

echo json_encode(["success" => true]);
