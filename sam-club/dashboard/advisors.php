<?php
require "../auth/guard.php";
requireRole("SAM");
?>
<!DOCTYPE html>
<html>
<head>
<title>Advisors</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="../assets/css/dashboard.css" rel="stylesheet">
<link href="../assets/css/style.css" rel="stylesheet">


</head>
<body>

<?php include __DIR__ . "/partials/sidebar.php"; ?>

<div class="main">
  <h3>Advisor Management</h3>

  <table class="table table-bordered mt-3" id="advisorsTable">
    <tr>
      <th>Name</th>
      <th>Department</th>
      <th>Assign</th>
    </tr>
  </table>

  <div class="card shadow mt-4 p-3">
    <label>Club</label>
    <select id="clubSelect" class="form-select mb-2"></select>

    <label>Start Date</label>
    <input type="date" id="startDate" class="form-control mb-2">

    <label>End Date</label>
    <input type="date" id="endDate" class="form-control">
  </div>
</div>

<script src="../assets/js/advisors.js"></script>
</body>
</html>
