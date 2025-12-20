<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();

require_once "../config/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "No data"]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$data["username"]]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($data["password"], $user["password_hash"])) {
    $_SESSION["user_id"] = $user["user_id"];
    $_SESSION["role"] = $user["role"];

    echo json_encode([
        "success" => true,
        "role" => $user["role"]
    ]);
} else {
    echo json_encode(["success" => false]);
}
