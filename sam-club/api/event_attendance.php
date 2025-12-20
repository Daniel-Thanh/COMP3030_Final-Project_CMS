<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("SAM");

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  $stmt = $pdo->query("
    SELECT ep.event_id, ep.student_id, ep.participation_status,
           s.full_name, e.event_name
    FROM event_participants ep
    JOIN students s ON ep.student_id = s.student_id
    JOIN events e ON ep.event_id = e.event_id
  ");
  echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  $stmt = $pdo->prepare("
    UPDATE event_participants
    SET participation_status = ?
    WHERE event_id = ? AND student_id = ?
  ");

  $stmt->execute([
    $data["status"],
    $data["event_id"],
    $data["student_id"]
  ]);

  echo json_encode(["success" => true]);
}
