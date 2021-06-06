<?php
include_once("conn.php");

$user = "";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $user = test_input($_GET['user']);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$sql = "SELECT login FROM users WHERE login='$user'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    echo "true";
}
else {
  echo "false";
}
?>

