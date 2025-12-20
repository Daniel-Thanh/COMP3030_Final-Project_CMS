<?php
require "../auth/guard.php";
requireRole("Student");
?>
<!DOCTYPE html>
<html>
<head>
<title>Student Events</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="../assets/css/style.css" rel="stylesheet">

</head>
<body class="container mt-4">

<h3>Available Events</h3>

<table class="table table-bordered" id="eventsTable">
  <tr>
    <th>Name</th>
    <th>Date</th>
    <th>Location</th>
    <th></th>
  </tr>
</table>

<script src="../assets/js/student_events.js"></script>
</body>
</html>
