<?php
require "../config/db.php";
require "../auth/guard.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $stmt = $pdo->query("
      SELECT e.*, c.club_name
      FROM events e
      JOIN clubs c ON e.club_id = c.club_id
    ");
    echo json_encode($stmt->fetchAll());
}
