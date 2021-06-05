<?php
include_once("conn.php");

$login = $pass = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $login = test_input($_POST['login']);
  $pass = test_input($_POST['pass']);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$pepper = get_cfg_var("pepper");
$pwd_peppered = hash_hmac("sha256", $pass, $pepper);
$pwd_hashed = password_hash($pwd_peppered, PASSWORD_ARGON2ID);

$sql = "INSERT INTO users (login, pass) VALUES ('$login', '$pwd_hashed')";
mysqli_query($conn, $sql);

echo "OK";
?>

