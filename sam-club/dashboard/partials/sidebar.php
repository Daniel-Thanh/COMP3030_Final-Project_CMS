<div class="sidebar">
  <h5>SAM Dashboard</h5>

  <a href="SAM.php" class="<?= basename($_SERVER['PHP_SELF'])=='SAM.php'?'active':'' ?>">Dashboard</a>
  <a href="clubs.php" class="<?= basename($_SERVER['PHP_SELF'])=='clubs.php'?'active':'' ?>">Clubs</a>
  <a href="members.php" class="<?= basename($_SERVER['PHP_SELF'])=='members.php'?'active':'' ?>">Members</a>
  <a href="advisors.php" class="<?= basename($_SERVER['PHP_SELF'])=='advisors.php'?'active':'' ?>">Advisors</a>
  <a href="events.php" class="<?= basename($_SERVER['PHP_SELF'])=='events.php'?'active':'' ?>">Events</a>
  <a href="event_attendance.php" class="<?= basename($_SERVER['PHP_SELF'])=='event_attendance.php'?'active':'' ?>">Attendance</a>
  <a href="budgets.php" class="<?= basename($_SERVER['PHP_SELF'])=='budgets.php'?'active':'' ?>">Budgets</a>
  <a href="../reports/budget_report.php">Reports</a>

  <hr style="border-color:#1e293b">
  <a href="../auth/logout.php" style="color:#f87171">Logout</a>
</div>
