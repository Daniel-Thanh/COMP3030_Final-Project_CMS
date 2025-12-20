<!DOCTYPE html>
<html>
<head>
<title><?= $title ?? "SAM System" ?></title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
body { background:#f4f6f9; }
.sidebar {
  width:220px; height:100vh; position:fixed;
  background:#212529; color:#fff; padding:15px;
}
.sidebar a {
  color:#adb5bd; text-decoration:none; display:block; margin:10px 0;
}
.sidebar a:hover { color:#fff; }
.main {
  margin-left:240px; padding:25px;
}
.card { border-radius:12px; }
</style>
</head>
<body>

<div class="sidebar">
  <h5>SAM Panel</h5>
  <a href="SAM.php">Dashboard</a>
  <a href="members.php">Members</a>
  <a href="advisors.php">Advisors</a>
  <a href="events.php">Events</a>
  <a href="budgets.php">Budgets</a>
</div>

<div class="main">
<?= $content ?>
</div>

</body>
</html>
