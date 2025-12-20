<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("SAM");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $sql = "INSERT INTO clubs (club_name, category, description, email, date_established)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param(
        $stmt,
        "sssss",
        $_POST["club_name"],
        $_POST["category"],
        $_POST["description"],
        $_POST["email"],
        $_POST["date_established"]
    );

    mysqli_stmt_execute($stmt);
    header("Location: list.php");
}
