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
        SELECT 
            ca.*,
            c.club_name,
            a.full_name as advisor_name
        FROM club_advisors ca
        JOIN clubs c ON ca.club_id = c.club_id
        JOIN advisors a ON ca.advisor_id = a.advisor_id
        ORDER BY c.club_name, ca.start_date DESC
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("
        INSERT INTO club_advisors (club_id, advisor_id, start_date, end_date)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([
        $data["club_id"],
        $data["advisor_id"],
        $data["start_date"],
        $data["end_date"] ?? null
    ]);
    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = $_GET["id"];
    $stmt = $pdo->prepare("DELETE FROM club_advisors WHERE assignment_id = ?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true]);
}
