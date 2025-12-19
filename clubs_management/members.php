<?php
include 'config.php';

/* =========================
   HANDLE FORM SUBMISSION
========================= */
if (isset($_POST['add_membership'])) {
    $club_id = sanitize($_POST['club_id']);
    $student_id = sanitize($_POST['student_id']);
    $role = sanitize($_POST['role']);
    $join_date = date('Y-m-d');

    executeQuery("
        INSERT INTO club_memberships (club_id, student_id, role, join_date)
        VALUES ('$club_id', '$student_id', '$role', '$join_date')
    ");
}

/* =========================
   FETCH DATA
========================= */
$clubs = executeQuery("
    SELECT club_id, club_name 
    FROM clubs 
    WHERE status='Active'
");

$students = executeQuery("
    SELECT student_id, full_name 
    FROM students 
    WHERE status='Active'
");

$memberships = executeQuery("
    SELECT 
        s.full_name,
        c.club_name,
        cm.role,
        cm.join_date,
        cm.membership_status
    FROM club_memberships cm
    JOIN students s ON cm.student_id = s.student_id
    JOIN clubs c ON cm.club_id = c.club_id
    ORDER BY c.club_name, s.full_name
");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Membership Management</title>
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

    <div class="section-title">Membership Management</div>

    <div class="two-column-layout">

        <!-- ASSIGN FORM -->
        <div class="card">
            <h3 class="card-title">Assign Student to Club</h3>

            <form method="post">
                <label>Club</label>
                <select name="club_id" required>
                    <option value="">Select Club</option>
                    <?php while ($c = $clubs->fetch_assoc()) { ?>
                        <option value="<?= $c['club_id']; ?>">
                            <?= $c['club_name']; ?>
                        </option>
                    <?php } ?>
                </select>

                <label>Student</label>
                <select name="student_id" required>
                    <option value="">Select Student</option>
                    <?php while ($s = $students->fetch_assoc()) { ?>
                        <option value="<?= $s['student_id']; ?>">
                            <?= $s['full_name']; ?>
                        </option>
                    <?php } ?>
                </select>

                <label>Role</label>
                <input type="text" name="role" placeholder="e.g. Member, President" required>

                <button type="submit" name="add_membership">Assign</button>
            </form>
        </div>

        <!-- MEMBERSHIP TABLE -->
        <div class="card wide">
            <h3 class="card-title">Club Memberships</h3>

            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Club</th>
                        <th>Role</th>
                        <th>Join Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($m = $memberships->fetch_assoc()) { ?>
                    <tr>
                        <td><?= $m['full_name']; ?></td>
                        <td><?= $m['club_name']; ?></td>
                        <td><?= $m['role']; ?></td>
                        <td><?= $m['join_date']; ?></td>
                        <td><?= $m['membership_status']; ?></td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>

    </div>

</div>

</body>
</html>
