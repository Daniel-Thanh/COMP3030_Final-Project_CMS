<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("Student");

header("Content-Type: application/json");

$stmt = $pdo->query("
  SELECT event_id, event_name, event_date, location
  FROM events
  WHERE status = 'Approved'
");

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
