<?php
require "../auth/guard.php";
requireRole("SAM");
?>
<!DOCTYPE html>
<html>
<head>
<title>Attendance</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="../assets/css/dashboard.css" rel="stylesheet">
<link href="../assets/css/style.css" rel="stylesheet">

</head>
<body>

<?php include __DIR__ . "/partials/sidebar.php"; ?>

<div class="main">
  <h3>Event Attendance</h3>

  <table class="table table-bordered mt-3" id="attendanceTable">
    <tr>
      <th>Event</th>
      <th>Student</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </table>
</div>

<script src="../assets/js/event_attendance.js"></script>
</body>
</html>
