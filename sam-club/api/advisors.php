<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("SAM");

header("Content-Type: application/json");

$stmt = $pdo->query("SELECT * FROM advisors");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
