<?php
require "../auth/guard.php";
requireRole("SAM");
?>
<!DOCTYPE html>
<html>
<head>
<title>Budgets</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="../assets/css/dashboard.css" rel="stylesheet">
<link href="../assets/css/style.css" rel="stylesheet">

</head>
<body>

<?php include "partials/sidebar.php"; ?>

<div class="main">
  <h3>Budget Management</h3>

  <div class="row mb-4">
    <div class="col-md-4">
      <div class="card shadow p-3">
        <small>Allocated</small>
        <h4 id="allocated">—</h4>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card shadow p-3">
        <small>Spent</small>
        <h4 id="spent">—</h4>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card shadow p-3">
        <small>Remaining</small>
        <h4 id="remaining">—</h4>
      </div>
    </div>
  </div>

  <table class="table table-striped" id="expensesTable">
    <tr>
      <th>Club</th>
      <th>Spent</th>
      <th>Year</th>
    </tr>
  </table>
</div>

<script src="../assets/js/budgets.js"></script>
</body>
</html>
