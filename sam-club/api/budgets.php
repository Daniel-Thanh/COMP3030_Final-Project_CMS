<?php
require "../config/db.php";
require "../auth/guard.php";

header("Content-Type: application/json");

/**
 * GET → Fetch budgets + usage
 * POST → Create budget OR add expense
 */

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    requireRole("SAM");

    $sql = "
        SELECT 
            b.budget_id,
            c.club_name,
            b.fiscal_year,
            b.allocated_amount,
            IFNULL(SUM(e.amount), 0) AS spent,
            (b.allocated_amount - IFNULL(SUM(e.amount), 0)) AS remaining
        FROM club_budgets b
        JOIN clubs c ON b.club_id = c.club_id
        LEFT JOIN expenses e ON b.budget_id = e.budget_id
        GROUP BY b.budget_id
    ";

    $stmt = $pdo->query($sql);
    echo json_encode($stmt->fetchAll());
    exit;
}

/* ================================
   POST REQUESTS
   ================================ */

$data = json_decode(file_get_contents("php://input"), true);

/* ➕ CREATE BUDGET */
if (isset($data["type"]) && $data["type"] === "create_budget") {

    requireRole("SAM");

    $stmt = $pdo->prepare("
        INSERT INTO club_budgets (club_id, fiscal_year, allocated_amount)
        VALUES (?, ?, ?)
    ");

    $stmt->execute([
        $data["club_id"],
        $data["year"],
        $data["amount"]
    ]);

    echo json_encode(["success" => true]);
    exit;
}

/* ➕ ADD EXPENSE */
if (isset($data["type"]) && $data["type"] === "add_expense") {

    requireRole("SAM");

    $stmt = $pdo->prepare("
        INSERT INTO expenses (budget_id, category, amount, expense_date, description)
        VALUES (?, ?, ?, CURDATE(), ?)
    ");

    $stmt->execute([
        $data["budget_id"],
        $data["category"],
        $data["amount"],
        $data["description"]
    ]);

    echo json_encode(["success" => true]);
    exit;
}

http_response_code(400);
echo json_encode(["error" => "Invalid request"]);
