<?php
include 'config.php';

/* =========================
   ADD STUDENT
========================= */
if (isset($_POST['add_student'])) {
    $student_code = sanitize($_POST['student_code']);
    $name = sanitize($_POST['full_name']);
    $email = sanitize($_POST['email']);
    $program = sanitize($_POST['program']);
    $status = sanitize($_POST['status']);

    executeQuery("
        INSERT INTO students (student_code, full_name, email, program, status)
        VALUES ('$student_code', '$name', '$email', '$program', '$status')
    ");
}


/* =========================
   TOGGLE STATUS
========================= */
if (isset($_GET['toggle'])) {
    $id = sanitize($_GET['toggle']);

    executeQuery("
        UPDATE students
        SET status = IF(status='Active','Inactive','Active')
        WHERE student_id = '$id'
    ");
}

/* =========================
   FETCH STUDENTS
========================= */
$students = executeQuery("
    SELECT student_id, full_name, email, status
    FROM students
    ORDER BY full_name
");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student Management</title>
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
    <a href="students.php">Students</a>
    <a href="advisors.php">Advisors</a>
    <a href="events.php">Events</a>
    <a href="budgets.php">Budgets</a>
    <a href="reports.php">Reports</a>
</nav>

<div class="container">

    <div class="section-title">Student Management</div>

    <div class="two-column-layout">

        <!-- ADD STUDENT -->
        <div class="card">
            <h3 class="card-title">Add Student</h3>

            <form method="post">
    <label>Student Code</label>
    <input type="text" name="student_code" required>

    <label>Full Name</label>
    <input type="text" name="full_name" required>

    <label>Email</label>
    <input type="email" name="email">

    <label>Program</label>
    <input type="text" name="program">

    <label>Status</label>
    <select name="status">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
    </select>

    <button type="submit" name="add_student">Add Student</button>
</form>

        </div>

        <!-- STUDENT LIST -->
        <div class="card wide">
            <h3 class="card-title">Students</h3>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($s = $students->fetch_assoc()) { ?>
                    <tr>
                        <td><?= $s['full_name']; ?></td>
                        <td><?= $s['email']; ?></td>
                        <td><?= $s['status']; ?></td>
                        <td>
                            <a href="?toggle=<?= $s['student_id']; ?>">
                                <?= $s['status'] === 'Active' ? 'Deactivate' : 'Activate'; ?>
                            </a>
                        </td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>

    </div>

</div>

</body>
</html>
