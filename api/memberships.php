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
            cm.*,
            c.club_name,
            s.full_name as student_name,
            s.student_code
        FROM club_memberships cm
        JOIN clubs c ON cm.club_id = c.club_id
        JOIN students s ON cm.student_id = s.student_id
        ORDER BY c.club_name, s.full_name
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO club_memberships (club_id, student_id, role, join_date, membership_status)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $data["club_id"],
            $data["student_id"],
            $data["role"],
            $data["join_date"],
            $data["membership_status"] ?? 'Active'
        ]);
        echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => "Student already member of this club"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET["id"];
    $stmt = $pdo->prepare("
        UPDATE club_memberships 
        SET role = ?, membership_status = ?
        WHERE membership_id = ?
    ");
    $stmt->execute([
        $data["role"],
        $data["membership_status"],
        $id
    ]);
    echo json_encode(["success" => true]);
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = $_GET["id"];
    $stmt = $pdo->prepare("DELETE FROM club_memberships WHERE membership_id = ?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true]);
}
