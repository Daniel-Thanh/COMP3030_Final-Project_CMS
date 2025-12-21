<?php
// Add CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require "../config/db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $stmt = $pdo->query("SELECT * FROM advisors ORDER BY full_name");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("
        INSERT INTO advisors (full_name, email, department)
        VALUES (?, ?, ?)
    ");
    $stmt->execute([
        $data["full_name"],
        $data["email"],
        $data["department"]
    ]);
    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET["id"];
    $stmt = $pdo->prepare("
        UPDATE advisors 
        SET full_name = ?, email = ?, department = ?
        WHERE advisor_id = ?
    ");
    $stmt->execute([
        $data["full_name"],
        $data["email"],
        $data["department"],
        $id
    ]);
    echo json_encode(["success" => true]);
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = $_GET["id"];
    $stmt = $pdo->prepare("DELETE FROM advisors WHERE advisor_id = ?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true]);
}
