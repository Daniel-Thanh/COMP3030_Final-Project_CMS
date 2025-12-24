<?php
session_start();
header("Content-Type: application/json");

require "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["username"]) || empty($data["password"])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing username or password"]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$data["username"]]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($data["password"], $user["password_hash"])) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid credentials"]);
    exit;
}

$_SESSION["user"] = [
    "user_id" => $user["user_id"],
    "username" => $user["username"],
    "role" => $user["role"]
];

echo json_encode(["success" => true]);
