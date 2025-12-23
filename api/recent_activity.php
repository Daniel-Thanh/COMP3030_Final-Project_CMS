<?php
// CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require "../config/db.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    // Recent events (submitted / approved / rejected)
    $eventsStmt = $pdo->query("
        SELECT 
            e.event_id AS id,
            c.club_name,
            CONCAT('Event ', LOWER(e.status)) AS action,
            e.event_date AS activity_date
        FROM events e
        JOIN clubs c ON e.club_id = c.club_id
        ORDER BY e.event_date DESC
        LIMIT 5
    ");

    $events = $eventsStmt->fetchAll(PDO::FETCH_ASSOC);

    // Recent budgets (allocations)
    $budgetsStmt = $pdo->query("
        SELECT
            cb.budget_id AS id,
            c.club_name,
            'Budget allocated' AS action,
            cb.fiscal_year AS activity_date
        FROM club_budgets cb
        JOIN clubs c ON cb.club_id = c.club_id
        ORDER BY cb.fiscal_year DESC
        LIMIT 5
    ");

    $budgets = $budgetsStmt->fetchAll(PDO::FETCH_ASSOC);

    // Merge & sort
    $activities = array_merge($events, $budgets);

    usort($activities, function ($a, $b) {
        return strtotime($b['activity_date']) - strtotime($a['activity_date']);
    });

    echo json_encode(array_slice($activities, 0, 5));
}
