<?php
// Add CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require "../config/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("
    INSERT INTO events (club_id, event_name, event_date, location, status)
    VALUES (?, ?, ?, ?, 'Pending')
");
$stmt->execute([
    $data["club_id"],
    $data["event_name"],
    $data["event_date"],
    $data["location"]
]);

echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
