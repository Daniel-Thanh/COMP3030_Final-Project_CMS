<?php
include 'config.php';

/* =========================
   ADD ADVISOR
========================= */
if (isset($_POST['add_advisor'])) {
    mysqli_query($conn, "
        INSERT INTO advisors (full_name, email, department)
        VALUES (
            '{$_POST['full_name']}',
            '{$_POST['email']}',
            '{$_POST['department']}'
        )
    ");
}

/* =========================
   ASSIGN ADVISOR TO CLUB
========================= */
if (isset($_POST['assign_advisor'])) {
    mysqli_query($conn, "
        INSERT INTO club_advisors (club_id, advisor_id, start_date)
        VALUES (
            '{$_POST['club_id']}',
            '{$_POST['advisor_id']}',
            '{$_POST['start_date']}'
        )
    ");
}

/* =========================
   FETCH DATA
========================= */
$advisors = mysqli_query($conn, "SELECT * FROM advisors");
$clubs = mysqli_query($conn, "SELECT * FROM clubs WHERE status='Active'");

$assignments = mysqli_query($conn, "
    SELECT 
        a.full_name AS advisor_name,
        c.club_name,
        ca.start_date,
        ca.end_date
    FROM club_advisors ca
    JOIN advisors a ON ca.advisor_id = a.advisor_id
    JOIN clubs c ON ca.club_id = c.club_id
    ORDER BY ca.start_date DESC
");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Advisor Management</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header>
    <h1>Student Affairs Management</h1>
</header>

<nav>
    <a href="index.php">Dashboard</a>
    <a href="clubs.php">Clubs</a>
    <a href="members.php">Memberships</a>
    <a href="advisors.php">Advisors</a>
    <a href="events.php">Events</a>
    <a href="budgets.php">Budgets</a>
    <a href="reports.php">Reports</a>
</nav>

<div class="container">

    <div class="section-title">Add Advisor</div>
    <form method="post">
        <input type="text" name="full_name" placeholder="Full Name" required>
        <input type="email" name="email" placeholder="Email">
        <input type="text" name="department" placeholder="Department">
        <button type="submit" name="add_advisor">Add Advisor</button>
    </form>

    <div class="section-title">Assign Advisor to Club</div>
    <form method="post">
        <select name="advisor_id" required>
            <option value="">Select Advisor</option>
            <?php while ($a = mysqli_fetch_assoc($advisors)) { ?>
                <option value="<?= $a['advisor_id']; ?>">
                    <?= $a['full_name']; ?>
                </option>
            <?php } ?>
        </select>

        <select name="club_id" required>
            <option value="">Select Club</option>
            <?php
            mysqli_data_seek($clubs, 0);
            while ($c = mysqli_fetch_assoc($clubs)) { ?>
                <option value="<?= $c['club_id']; ?>">
                    <?= $c['club_name']; ?>
                </option>
            <?php } ?>
        </select>

        <input type="date" name="start_date" required>

        <button type="submit" name="assign_advisor">Assign Advisor</button>
    </form>

    <div class="section-title">Advisor Assignments</div>

    <table>
        <thead>
            <tr>
                <th>Advisor</th>
                <th>Club</th>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($as = mysqli_fetch_assoc($assignments)) { ?>
            <tr>
                <td><?= $as['advisor_name']; ?></td>
                <td><?= $as['club_name']; ?></td>
                <td><?= $as['start_date']; ?></td>
                <td><?= $as['end_date'] ? $as['end_date'] : 'Current'; ?></td>
            </tr>
            <?php } ?>
        </tbody>
    </table>

</div>

</body>
</html>
