<?php
include 'config.php';

/* =========================
   REPORT 1: MEMBERS PER CLUB
========================= */
$members_report = mysqli_query($conn, "
    SELECT 
        c.club_name,
        COUNT(cm.membership_id) AS total_members
    FROM clubs c
    LEFT JOIN club_memberships cm ON c.club_id = cm.club_id
    GROUP BY c.club_id
");

/* =========================
   REPORT 2: EVENTS PER CLUB
========================= */
$events_report = mysqli_query($conn, "
    SELECT 
        c.club_name,
        COUNT(e.event_id) AS total_events
    FROM clubs c
    LEFT JOIN events e ON c.club_id = e.club_id
    GROUP BY c.club_id
");

/* =========================
   REPORT 3: BUDGET USAGE
========================= */
$budget_report = mysqli_query($conn, "
    SELECT 
        c.club_name,
        cb.fiscal_year,
        cb.allocated_amount,
        IFNULL(SUM(e.amount),0) AS spent,
        cb.allocated_amount - IFNULL(SUM(e.amount),0) AS remaining
    FROM club_budgets cb
    JOIN clubs c ON cb.club_id = c.club_id
    LEFT JOIN expenses e ON cb.budget_id = e.budget_id
    GROUP BY cb.budget_id
    ORDER BY cb.fiscal_year DESC
");
?>

<!DOCTYPE html>
<html>
<head>
    <title>System Reports</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<h2>Members per Club</h2>

<table border="1" cellpadding="5">
    <tr>
        <th>Club</th>
        <th>Total Members</th>
    </tr>
    <?php while ($r = mysqli_fetch_assoc($members_report)) { ?>
    <tr>
        <td><?= $r['club_name']; ?></td>
        <td><?= $r['total_members']; ?></td>
    </tr>
    <?php } ?>
</table>

<hr>

<h2>Events per Club</h2>

<table border="1" cellpadding="5">
    <tr>
        <th>Club</th>
        <th>Total Events</th>
    </tr>
    <?php while ($r = mysqli_fetch_assoc($events_report)) { ?>
    <tr>
        <td><?= $r['club_name']; ?></td>
        <td><?= $r['total_events']; ?></td>
    </tr>
    <?php } ?>
</table>

<hr>

<h2>Budget Usage</h2>

<table border="1" cellpadding="5">
    <tr>
        <th>Club</th>
        <th>Year</th>
        <th>Allocated</th>
        <th>Spent</th>
        <th>Remaining</th>
    </tr>
    <?php while ($r = mysqli_fetch_assoc($budget_report)) { ?>
    <tr>
        <td><?= $r['club_name']; ?></td>
        <td><?= $r['fiscal_year']; ?></td>
        <td><?= number_format($r['allocated_amount'], 2); ?></td>
        <td><?= number_format($r['spent'], 2); ?></td>
        <td><?= number_format($r['remaining'], 2); ?></td>
    </tr>
    <?php } ?>
</table>

</body>
</html>
