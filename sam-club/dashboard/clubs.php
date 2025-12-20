<?php
require "../auth/guard.php";
requireRole("SAM");
?>
<!DOCTYPE html>
<html>
<head>
<title>Clubs</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="../assets/css/dashboard.css" rel="stylesheet">
<link href="../assets/css/style.css" rel="stylesheet">

</head>
<body>

<?php include __DIR__ . "/partials/sidebar.php"; ?>

<div class="main">
  <h3>Club Management</h3>

  <table class="table table-bordered mt-3" id="clubsTable">
    <tr>
      <th>Name</th>
      <th>Category</th>
      <th>Status</th>
    </tr>
  </table>
</div>

<script src="../assets/js/clubs.js"></script>
</body>
</html>
