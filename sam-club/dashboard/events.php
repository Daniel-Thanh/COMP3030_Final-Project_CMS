<?php
require "../auth/guard.php";
requireRole("SAM");
?>
<!DOCTYPE html>
<html>
<head>
<title>Events</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="../assets/css/dashboard.css" rel="stylesheet">
<link href="../assets/css/style.css" rel="stylesheet">

</head>
<body>

<?php include __DIR__ . "/partials/sidebar.php"; ?>

<div class="main">
  <h3>Event Management</h3>

  <div class="card shadow p-3 mb-4">
    <select id="clubSelect" class="form-select mb-2"></select>
    <input id="eventName" class="form-control mb-2" placeholder="Event name">
    <input type="date" id="eventDate" class="form-control mb-2">
    <input id="location" class="form-control mb-2" placeholder="Location">
    <button class="btn btn-primary" onclick="createEvent()">Create Event</button>
  </div>

  <table class="table table-bordered" id="eventsTable">
    <tr>
      <th>Name</th>
      <th>Club</th>
      <th>Date</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </table>
</div>

<script src="../assets/js/events.js"></script>
</body>
</html>
