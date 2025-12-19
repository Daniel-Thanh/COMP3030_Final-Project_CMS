<?php
include 'config.php';

/* ADD CLUB */
if (isset($_POST['add_club'])) {
    mysqli_query($conn, "
        INSERT INTO clubs (club_name, category, email, date_established)
        VALUES (
            '{$_POST['club_name']}',
            '{$_POST['category']}',
            '{$_POST['email']}',
            '{$_POST['date_established']}'
        )
    ");
}

/* DEACTIVATE CLUB */
if (isset($_GET['deactivate'])) {
    mysqli_query($conn, "
        UPDATE clubs SET status='Inactive'
        WHERE club_id='{$_GET['deactivate']}'
    ");
}

/* VIEW MEMBERS */
$members = null;
if (isset($_GET['view_members'])) {
    $members = mysqli_query($conn, "
        SELECT 
            s.full_name,
            cm.role,
            cm.join_date,
            cm.membership_status
        FROM club_memberships cm
        JOIN students s ON cm.student_id = s.student_id
        WHERE cm.club_id='{$_GET['view_members']}'
    ");
}

$clubs = mysqli_query($conn, "SELECT * FROM clubs");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Club Management</title>
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

    <div class="section-title">Add Club</div>
    <form method="post">
        <input name="club_name" placeholder="Club Name" required>
        <input name="category" placeholder="Category">
        <input name="email" placeholder="Email">
        <input type="date" name="date_established">
        <button name="add_club">Add Club</button>
    </form>

    <div class="section-title">Clubs</div>
    <table>
        <thead>
            <tr>
                <th>Club</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($c = mysqli_fetch_assoc($clubs)) { ?>
            <tr>
                <td><?= $c['club_name']; ?></td>
                <td><?= $c['status']; ?></td>
                <td>
                    <a href="?view_members=<?= $c['club_id']; ?>">View Members</a>
                    <?php if ($c['status'] == 'Active') { ?>
                        &nbsp;|&nbsp;
                        <a href="?deactivate=<?= $c['club_id']; ?>">Deactivate</a>
                    <?php } ?>
                </td>
            </tr>
            <?php } ?>
        </tbody>
    </table>

    <?php if ($members) { ?>
        <div class="section-title">Club Members</div>
        <table>
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Role</th>
                    <th>Join Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($m = mysqli_fetch_assoc($members)) { ?>
                <tr>
                    <td><?= $m['full_name']; ?></td>
                    <td><?= $m['role']; ?></td>
                    <td><?= $m['join_date']; ?></td>
                    <td><?= $m['membership_status']; ?></td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
    <?php } ?>

</div>

</body>
</html>
