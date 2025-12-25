<?php
require "../config/db.php";
header("Content-Type: application/json");

$type = $_GET["type"] ?? "";

try {

  if ($type === "memberships") {
    $stmt = $pdo->query("SELECT * FROM v_monthly_membership_stats");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
  }

  if ($type === "club-summary") {
    $stmt = $pdo->prepare("CALL sp_club_summary()");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    echo json_encode($data);
    exit;
  }

  if ($type === "expenses") {
    $stmt = $pdo->prepare("CALL sp_monthly_expenses()");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    echo json_encode($data);
    exit;
  }

  if ($type === "activity-log") {
    $stmt = $pdo->query("
      SELECT * FROM v_recent_activity
      ORDER BY action_time DESC
      LIMIT 20
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
  }

  http_response_code(400);
  echo json_encode(["error" => "Invalid report type"]);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(["error" => $e->getMessage()]);
}
