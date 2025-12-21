<?php
// Add CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require "../config/db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Get all budgets with club names and total expenses
    $stmt = $pdo->query("
        SELECT 
            cb.budget_id,
            cb.club_id,
            c.club_name,
            cb.fiscal_year,
            cb.allocated_amount,
            COALESCE(SUM(e.amount), 0) as total_expenses
        FROM club_budgets cb
        JOIN clubs c ON cb.club_id = c.club_id
        LEFT JOIN expenses e ON cb.budget_id = e.budget_id
        GROUP BY cb.budget_id, cb.club_id, c.club_name, cb.fiscal_year, cb.allocated_amount
        ORDER BY cb.fiscal_year DESC, c.club_name
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Create new budget
    $data = json_decode(file_get_contents("php://input"), true);
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO club_budgets (club_id, fiscal_year, allocated_amount)
            VALUES (?, ?, ?)
        ");
        $stmt->execute([
            $data["club_id"],
            $data["fiscal_year"],
            $data["allocated_amount"]
        ]);
        echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => "Budget already exists for this club and year"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET["id"];
    
    try {
        $stmt = $pdo->prepare("
            UPDATE club_budgets 
            SET allocated_amount = ?
            WHERE budget_id = ?
        ");
        $stmt->execute([
            $data["allocated_amount"],
            $id
        ]);
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = $_GET["id"];
    $stmt = $pdo->prepare("DELETE FROM club_budgets WHERE budget_id = ?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true]);
}
