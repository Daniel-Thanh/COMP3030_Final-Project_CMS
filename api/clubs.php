<?php
// Add CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require "../config/db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $stmt = $pdo->query("SELECT * FROM clubs");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("
        INSERT INTO clubs (club_name, category, description, email, status, date_established)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $data["club_name"],
        $data["category"],
        $data["description"],
        $data["email"],
        $data["status"],
        $data["date_established"]
    ]);
    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET["id"];
    $stmt = $pdo->prepare("
        UPDATE clubs 
        SET club_name = ?, category = ?, description = ?, email = ?, status = ?, date_established = ?
        WHERE club_id = ?
    ");
    $stmt->execute([
        $data["club_name"],
        $data["category"],
        $data["description"],
        $data["email"],
        $data["status"],
        $data["date_established"],
        $id
    ]);
    echo json_encode(["success" => true]);
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = $_GET["id"];
    $stmt = $pdo->prepare("DELETE FROM clubs WHERE club_id = ?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true]);
}
