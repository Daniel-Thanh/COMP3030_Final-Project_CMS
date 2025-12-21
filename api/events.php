<?php
// Add CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require "../config/db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $stmt = $pdo->query("
        SELECT e.*, c.club_name
        FROM events e
        JOIN clubs c ON e.club_id = c.club_id
        ORDER BY e.event_date DESC
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("
        INSERT INTO events (club_id, event_name, event_date, location, status)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $data["club_id"],
        $data["event_name"],
        $data["event_date"],
        $data["location"],
        $data["status"] ?? 'Pending'
    ]);
    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET["id"];
    $stmt = $pdo->prepare("
        UPDATE events 
        SET club_id = ?, event_name = ?, event_date = ?, location = ?, status = ?
        WHERE event_id = ?
    ");
    $stmt->execute([
        $data["club_id"],
        $data["event_name"],
        $data["event_date"],
        $data["location"],
        $data["status"],
        $id
    ]);
    echo json_encode(["success" => true]);
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = $_GET["id"];
    $stmt = $pdo->prepare("DELETE FROM events WHERE event_id = ?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true]);
}
