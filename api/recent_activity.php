<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
require "../config/db.php";

header("Content-Type: application/json");

$stmt = $pdo->query("
    SELECT club_name, activity_text, action_time
    FROM v_recent_activity
    ORDER BY action_time DESC
    LIMIT 10
");

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
