<?php
// Add CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require "../config/db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Get all expenses with budget and club information
    $stmt = $pdo->query("
        SELECT 
            e.*,
            cb.fiscal_year,
            c.club_name
        FROM expenses e
        JOIN club_budgets cb ON e.budget_id = cb.budget_id
        JOIN clubs c ON cb.club_id = c.club_id
        ORDER BY e.expense_date DESC
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Add new expense
    $data = json_decode(file_get_contents("php://input"), true);
    
    $stmt = $pdo->prepare("
        INSERT INTO expenses (budget_id, category, amount, expense_date, description)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $data["budget_id"],
        $data["category"],
        $data["amount"],
        $data["expense_date"],
        $data["description"]
    ]);
    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET["id"];
    
    $stmt = $pdo->prepare("
        UPDATE expenses 
        SET category = ?, amount = ?, expense_date = ?, description = ?
        WHERE expense_id = ?
    ");
    $stmt->execute([
        $data["category"],
        $data["amount"],
        $data["expense_date"],
        $data["description"],
        $id
    ]);
    echo json_encode(["success" => true]);
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = $_GET["id"];
    $stmt = $pdo->prepare("DELETE FROM expenses WHERE expense_id = ?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true]);
}
