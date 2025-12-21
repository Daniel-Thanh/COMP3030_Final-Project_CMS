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
    UPDATE events SET status = ? WHERE event_id = ?
");
$stmt->execute([
    $data["status"],
    $data["event_id"]
]);

echo json_encode(["success" => true]);
