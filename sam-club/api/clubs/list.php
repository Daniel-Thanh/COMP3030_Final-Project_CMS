<?php
require "../config/db.php";

$result = mysqli_query($conn, "SELECT * FROM clubs");
?>

<table border="1">
<tr>
  <th>Name</th><th>Category</th><th>Status</th>
</tr>
<?php while ($row = mysqli_fetch_assoc($result)) : ?>
<tr>
  <td><?= $row["club_name"] ?></td>
  <td><?= $row["category"] ?></td>
  <td><?= $row["status"] ?></td>
</tr>
<?php endwhile; ?>
</table>
