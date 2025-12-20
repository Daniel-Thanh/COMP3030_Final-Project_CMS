<?php
session_start();

function requireRole($role) {
    if (!isset($_SESSION["role"]) || $_SESSION["role"] !== $role) {
        header("Location: ../auth/login.php");
        exit;
    }
}
