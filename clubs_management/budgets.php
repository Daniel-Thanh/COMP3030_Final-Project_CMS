<?php
include 'config.php';

/* =========================
   ADD / UPDATE BUDGET
========================= */
if (isset($_POST['add_budget'])) {
    $club_id = $_POST['club_id'];
    $year = $_POST['fiscal_year'];
    $amount = $_POST['allocated_amount'];

    mysqli_query($conn, "
        INSERT INTO club_budgets (club_id, fiscal_year, allocated_amount)
        VALUES ('$club_id', '$year', '$amount')
        ON DUPLICATE KEY UPDATE allocated_amount='$amount'
    ");
}

/* =========================
   ADD EXPENSE
========================= */
if (isset($_POST['add_expense'])) {
    mysqli_query($conn, "
        INSERT INTO expenses (budget_id, category, amount, expense_date, description)
        VALUES (
            '{$_POST['budget_id']}',
            '{$_POST['category']}',
            '{$_POST['amount']}',
            '{$_POST['expense_date']}',
            '{$_POST['description']}'
        )
    ");
}

/* =========================
   FETCH DATA
========================= */
$clubs = mysqli_query($conn, "SELECT club_id, club_name FROM clubs WHERE status='Active'");

$budgets = mysqli_query($conn, "
    SELECT 
        cb.budget_id,
        c.club_name,
        cb.fiscal_year,
        cb.allocated_amount,
        IFNULL(SUM(e.amount), 0) AS spent,
        cb.allocated_amount - IFNULL(SUM(e.amount), 0) AS remaining
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
    <title>Budget Management</title>
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

    <div class="section-title">Allocate Club Budget</div>
    <form method="post">
        <select name="club_id" required>
            <option value="">Select Club</option>
            <?php while ($c = mysqli_fetch_assoc($clubs)) { ?>
                <option value="<?= $c['club_id']; ?>">
                    <?= $c['club_name']; ?>
                </option>
            <?php } ?>
        </select>

        <input type="number" name="fiscal_year" value="<?= date('Y'); ?>" required>
        <input type="number" step="0.01" name="allocated_amount" placeholder="Allocated Amount" required>

        <button type="submit" name="add_budget">Save Budget</button>
    </form>

    <div class="section-title">Budgets Overview</div>

    <table>
        <thead>
            <tr>
                <th>Club</th>
                <th>Year</th>
                <th>Allocated</th>
                <th>Spent</th>
                <th>Remaining</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($b = mysqli_fetch_assoc($budgets)) { ?>
            <tr>
                <td><?= $b['club_name']; ?></td>
                <td><?= $b['fiscal_year']; ?></td>
                <td><?= number_format($b['allocated_amount'], 2); ?></td>
                <td><?= number_format($b['spent'], 2); ?></td>
                <td><?= number_format($b['remaining'], 2); ?></td>
            </tr>
            <?php } ?>
        </tbody>
    </table>

    <div class="section-title">Add Expense</div>
    <form method="post">
        <select name="budget_id" required>
            <option value="">Select Budget</option>
            <?php
            mysqli_data_seek($budgets, 0);
            while ($b = mysqli_fetch_assoc($budgets)) {
                echo "<option value='{$b['budget_id']}'>
                        {$b['club_name']} ({$b['fiscal_year']})
                      </option>";
            }
            ?>
        </select>

        <input type="text" name="category" placeholder="Expense Category" required>
        <input type="number" step="0.01" name="amount" placeholder="Amount" required>
        <input type="date" name="expense_date" required>
        <input type="text" name="description" placeholder="Description (optional)">

        <button type="submit" name="add_expense">Add Expense</button>
    </form>

</div>

</body>
</html>
