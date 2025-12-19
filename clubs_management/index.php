<?php
include 'config.php';

/* =========================
   DASHBOARD METRICS
========================= */

// Total clubs
$res = executeQuery("SELECT COUNT(*) AS total FROM clubs");
$clubs = $res->fetch_assoc()['total'];

// Active memberships
$res = executeQuery("
    SELECT COUNT(*) AS total
    FROM club_memberships
    WHERE membership_status = 'Active'
");
$memberships = $res->fetch_assoc()['total'];

// Approved events
$res = executeQuery("
    SELECT COUNT(*) AS total
    FROM events
    WHERE status = 'Approved'
");
$events = $res->fetch_assoc()['total'];

// Budgets allocated
$res = executeQuery("SELECT COUNT(*) AS total FROM club_budgets");
$budgets = $res->fetch_assoc()['total'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SAM Dashboard</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<!-- ===== HEADER ===== -->
<header>
    <h1>Student Affairs Management</h1>
</header>

<!-- ===== NAV ===== -->
<nav>
    <a href="index.php" style="color:#fff;">Dashboard</a>
    <a href="clubs.php">Clubs</a>
    <a href="members.php">Memberships</a>
    <a href="advisors.php">Advisors</a>
    <a href="events.php">Events</a>
    <a href="budgets.php">Budgets</a>
    <a href="reports.php">Reports</a>
    <a href="students.php">Students</a>
</nav>

<!-- ===== MAIN CONTENT ===== -->
<main class="container">

    <!-- DASHBOARD HEADER BLOCK (NEW) -->
    <div style="margin-bottom:32px;">
        <h2 style="font-size:22px; font-weight:600; margin-bottom:6px;">
            Dashboard Overview
        </h2>
        <p style="color:#9ca3af; font-size:14px;">
            Quick summary of clubs, memberships, events, and budget allocation
        </p>
    </div>

    <!-- STATS SECTION (NOW FEELS GROUPED) -->
    <section class="stats">

        <div class="stat-box">
            <h3>Total Clubs</h3>
            <p><?= $clubs ?></p>
        </div>

        <div class="stat-box">
            <h3>Active Memberships</h3>
            <p><?= $memberships ?></p>
        </div>

        <div class="stat-box">
            <h3>Approved Events</h3>
            <p><?= $events ?></p>
        </div>

        <div class="stat-box">
            <h3>Budgets Allocated</h3>
            <p><?= $budgets ?></p>
        </div>

    </section>

</main>

</body>
</html>
