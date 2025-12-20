<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("SAM");

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("
  INSERT INTO club_advisors (club_id, advisor_id, start_date, end_date)
  VALUES (?, ?, ?, ?)
");

$stmt->execute([
  $data["club_id"],
  $data["advisor_id"],
  $data["start_date"],
  $data["end_date"] ?: null
]);

echo json_encode(["success" => true]);
