<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("SAM");

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("
  INSERT INTO club_memberships (club_id, student_id, role, join_date)
  VALUES (?, ?, ?, CURDATE())
");

try {
    $stmt->execute([
      $data["club_id"],
      $data["student_id"],
      $data["role"]
    ]);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Already a member"]);
}
