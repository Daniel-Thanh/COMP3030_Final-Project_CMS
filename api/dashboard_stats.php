<?php
// CORS (same pattern as advisors.php)
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require "../config/db.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $stats = [];

    // 1. Total clubs
    $stmt = $pdo->query("SELECT COUNT(*) AS total FROM clubs");
    $stats["totalClubs"] = (int) $stmt->fetch(PDO::FETCH_ASSOC)["total"];

    // 2. Pending events (Pending approval)
    $stmt = $pdo->query("
        SELECT COUNT(*) AS total 
        FROM events 
        WHERE status = 'Pending'
    ");
    $stats["pendingEvents"] = (int) $stmt->fetch(PDO::FETCH_ASSOC)["total"];

    // 3. Total allocated budget (all clubs, all fiscal years)
    $stmt = $pdo->query("
        SELECT COALESCE(SUM(allocated_amount), 0) AS total
        FROM club_budgets
    ");
    $stats["totalBudget"] = (float) $stmt->fetch(PDO::FETCH_ASSOC)["total"];

    // 4. Active members across all clubs
    $stmt = $pdo->query("
        SELECT COUNT(*) AS total
        FROM club_memberships
        WHERE membership_status = 'Active'
    ");
    $stats["activeMembers"] = (int) $stmt->fetch(PDO::FETCH_ASSOC)["total"];

    echo json_encode($stats);
}
