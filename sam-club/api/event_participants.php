<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("Student");

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("
  INSERT INTO event_participants (event_id, student_id, participation_status)
  VALUES (?, ?, 'Registered')
");

try {
  $stmt->execute([
    $data["event_id"],
    $_SESSION["linked_student_id"]
  ]);
  echo json_encode(["success" => true]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "error" => "Already registered"]);
}
