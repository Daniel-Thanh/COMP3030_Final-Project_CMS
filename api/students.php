<?php
// Add CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require "../config/db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $stmt = $pdo->query("SELECT * FROM students ORDER BY full_name");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO students (student_code, full_name, email, program, status)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $data["student_code"],
            $data["full_name"],
            $data["email"],
            $data["program"],
            $data["status"] ?? 'Active'
        ]);
        echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => "Student code already exists"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET["id"];
    $stmt = $pdo->prepare("
        UPDATE students 
        SET student_code = ?, full_name = ?, email = ?, program = ?, status = ?
        WHERE student_id = ?
    ");
    $stmt->execute([
        $data["student_code"],
        $data["full_name"],
        $data["email"],
        $data["program"],
        $data["status"],
        $id
    ]);
    echo json_encode(["success" => true]);
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = $_GET["id"];
    $stmt = $pdo->prepare("DELETE FROM students WHERE student_id = ?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true]);
}
