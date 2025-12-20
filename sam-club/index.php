<?php
session_start();
if (isset($_SESSION["role"])) {
    header("Location: dashboard/{$_SESSION['role']}.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
<title>SAM Club Management</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="assets/css/style.css" rel="stylesheet">
</head>
<body class="bg-light d-flex align-items-center justify-content-center">

<div class="card p-4 shadow" style="width:350px">
<h4 class="text-center mb-3">SAM Login</h4>

<input type="text" id="username" class="form-control mb-2" placeholder="Username">
<input type="password" id="password" class="form-control mb-3" placeholder="Password">

<button class="btn btn-primary w-100" onclick="login()">Login</button>

<p id="error" class="text-danger mt-2 text-center"></p>
</div>

<script src="assets/js/app.js"></script>
</body>
</html>
