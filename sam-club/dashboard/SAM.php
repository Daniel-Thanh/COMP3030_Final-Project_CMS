<?php
require "../auth/guard.php";
requireRole("SAM");
?>
<!DOCTYPE html>
<html>
<head>
  <title>SAM Dashboard</title>
  <link href="../assets/css/style.css" rel="stylesheet">
  <link href="../assets/css/dashboard.css" rel="stylesheet">
</head>
<body>

<?php include __DIR__ . "/partials/sidebar.php"; ?>

<div class="main">

  <h2>Dashboard</h2>
  <p style="color:#9ca3af;margin-bottom:24px">Overview</p>

  <!-- METRIC CARDS -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:30px">

    <div class="card" style="background:linear-gradient(135deg,#f97316,#ec4899)">
      <div class="card-body">
        <small>Total Clubs</small>
        <h3>12</h3>
      </div>
    </div>

    <div class="card" style="background:linear-gradient(135deg,#6366f1,#22d3ee)">
      <div class="card-body">
        <small>Total Members</small>
        <h3>248</h3>
      </div>
    </div>

    <div class="card" style="background:linear-gradient(135deg,#22c55e,#16a34a)">
      <div class="card-body">
        <small>Events</small>
        <h3>18</h3>
      </div>
    </div>

    <div class="card" style="background:linear-gradient(135deg,#f43f5e,#fb7185)">
      <div class="card-body">
        <small>Budgets</small>
        <h3>$24K</h3>
      </div>
    </div>

  </div>

  <!-- TABLE -->
  <div class="card">
    <div class="card-header">Recent Activities</div>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr><th>Club</th><th>Action</th><th>Date</th></tr>
        </thead>
        <tbody>
          <tr><td>IT Club</td><td>New Event</td><td>2025-09-01</td></tr>
          <tr><td>Business Club</td><td>Budget Approved</td><td>2025-09-02</td></tr>
        </tbody>
      </table>
    </div>
  </div>

</div>
</body>
</html>
