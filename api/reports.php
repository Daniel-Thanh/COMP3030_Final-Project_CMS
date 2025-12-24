<?php
require "../config/db.php";
header("Content-Type: application/json");

$type = $_GET["type"] ?? "";

if ($type === "memberships") {
    $stmt = $pdo->query("SELECT * FROM v_monthly_membership_stats");
}
elseif ($type === "club-summary") {
    $stmt = $pdo->query("CALL sp_club_summary()");
}
elseif ($type === "expenses") {
    $stmt = $pdo->query("CALL sp_monthly_expenses()");
}
elseif ($type === "activity-log") {
    $stmt = $pdo->query("SELECT * FROM audit_log ORDER BY action_time DESC");
}
else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid report type"]);
    exit;
}

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
