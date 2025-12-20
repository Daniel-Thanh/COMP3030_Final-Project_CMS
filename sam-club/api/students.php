<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("SAM");

header("Content-Type: application/json");

$stmt = $pdo->query("SELECT * FROM students WHERE status='Active'");
echo json_encode($stmt->fetchAll());
