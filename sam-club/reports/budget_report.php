<?php
require "../config/db.php";
require "../auth/guard.php";
requireRole("SAM");

$sql = "
    SELECT 
        c.club_name,
        b.fiscal_year,
        b.allocated_amount,
        IFNULL(SUM(e.amount),0) AS spent,
        (b.allocated_amount - IFNULL(SUM(e.amount),0)) AS remaining
    FROM club_budgets b
    JOIN clubs c ON b.club_id = c.club_id
    LEFT JOIN expenses e ON b.budget_id = e.budget_id
    GROUP BY b.budget_id
";

$data = $pdo->query($sql)->fetchAll();
?>

<!DOCTYPE html>
<html>
<head>
<title>Budget Report</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-4">

<h2>Club Budget Report</h2>

<table class="table table-bordered">
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

<?php foreach ($data as $row): ?>
<tr>
    <td><?= htmlspecialchars($row["club_name"]) ?></td>
    <td><?= $row["fiscal_year"] ?></td>
    <td><?= number_format($row["allocated_amount"], 2) ?></td>
    <td><?= number_format($row["spent"], 2) ?></td>
    <td class="<?= $row["remaining"] < 0 ? 'text-danger' : 'text-success' ?>">
        <?= number_format($row["remaining"], 2) ?>
    </td>
</tr>
<?php endforeach; ?>

</tbody>
</table>

</body>
</html>
