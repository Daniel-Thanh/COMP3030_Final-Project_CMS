<?php
require "../auth/guard.php";
requireRole("SAM");
?>
<!DOCTYPE html>
<html>
<head>
<title>Members</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="../assets/css/dashboard.css" rel="stylesheet">
<link href="../assets/css/style.css" rel="stylesheet">

</head>
<body>

<?php include __DIR__ . "/partials/sidebar.php"; ?>

<div class="main">
  <h3>Membership Management</h3>

  <div class="card shadow mt-3">
    <div class="card-body">
      <table class="table table-hover" id="studentsTable">
        <tr>
          <th>Name</th>
          <th>Program</th>
          <th>Action</th>
        </tr>
      </table>
    </div>
  </div>

  <div class="card shadow mt-4 p-3">
    <label>Select Club</label>
    <select id="clubSelect" class="form-select"></select>
  </div>
</div>

<script src="../assets/js/members.js"></script>
</body>
</html>
