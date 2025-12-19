<?php
include 'config.php';

/* =========================
   CREATE EVENT
========================= */
if (isset($_POST['add_event'])) {
    $club_id = sanitize($_POST['club_id']);
    $event_name = sanitize($_POST['event_name']);
    $event_date = sanitize($_POST['event_date']);
    $location = sanitize($_POST['location']);

    executeQuery("
        INSERT INTO events (club_id, event_name, event_date, location)
        VALUES ('$club_id', '$event_name', '$event_date', '$location')
    ");
}

/* =========================
   APPROVE EVENT (SAM)
========================= */
if (isset($_GET['approve'])) {
    $event_id = sanitize($_GET['approve']);
    executeQuery("UPDATE events SET status='Approved' WHERE event_id='$event_id'");
}

/* =========================
   ADD PARTICIPANT
========================= */
if (isset($_POST['add_participant'])) {
    $event_id = sanitize($_POST['event_id']);
    $student_id = sanitize($_POST['student_id']);

    executeQuery("
        INSERT IGNORE INTO event_participants (event_id, student_id, participation_status)
        VALUES ('$event_id', '$student_id', 'Registered')
    ");
}

/* =========================
   FETCH DATA
========================= */
$clubs = executeQuery("SELECT club_id, club_name FROM clubs WHERE status='Active'");
$students = executeQuery("SELECT student_id, full_name FROM students WHERE status='Active'");

$events = executeQuery("
    SELECT e.*, c.club_name
    FROM events e
    JOIN clubs c ON e.club_id = c.club_id
    ORDER BY e.event_date DESC
");

$approved_events = executeQuery("
    SELECT event_id, event_name FROM events WHERE status='Approved'
");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Event Management</title>
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

    <div class="section-title">Create Club Event</div>
    <form method="post">
        <select name="club_id" required>
            <option value="">Select Club</option>
            <?php while ($c = $clubs->fetch_assoc()) { ?>
                <option value="<?= $c['club_id']; ?>">
                    <?= $c['club_name']; ?>
                </option>
            <?php } ?>
        </select>

        <input type="text" name="event_name" placeholder="Event Name" required>
        <input type="date" name="event_date" required>
        <input type="text" name="location" placeholder="Location">

        <button type="submit" name="add_event">Create Event</button>
    </form>

    <div class="section-title">Events (SAM Approval)</div>
    <table>
        <thead>
            <tr>
                <th>Event</th>
                <th>Club</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($e = $events->fetch_assoc()) { ?>
            <tr>
                <td><?= $e['event_name']; ?></td>
                <td><?= $e['club_name']; ?></td>
                <td><?= $e['event_date']; ?></td>
                <td><?= $e['location']; ?></td>
                <td><?= $e['status']; ?></td>
                <td>
                    <?php if ($e['status'] === 'Pending') { ?>
                        <a href="?approve=<?= $e['event_id']; ?>">Approve</a>
                    <?php } else { ?>
                        Approved
                    <?php } ?>
                </td>
            </tr>
            <?php } ?>
        </tbody>
    </table>

    <div class="section-title">Register Participant</div>
    <form method="post">
        <select name="event_id" required>
            <option value="">Select Approved Event</option>
            <?php while ($ev = $approved_events->fetch_assoc()) { ?>
                <option value="<?= $ev['event_id']; ?>">
                    <?= $ev['event_name']; ?>
                </option>
            <?php } ?>
        </select>

        <select name="student_id" required>
            <option value="">Select Student</option>
            <?php while ($s = $students->fetch_assoc()) { ?>
                <option value="<?= $s['student_id']; ?>">
                    <?= $s['full_name']; ?>
                </option>
            <?php } ?>
        </select>

        <button type="submit" name="add_participant">Register</button>
    </form>

</div>

</body>
</html>
