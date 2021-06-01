<?php
include_once("conn.php");

$login = $_POST['login'];
$pass = $_POST['pass'];

$pepper = get_cfg_var("pepper");
$pwd_peppered = hash_hmac("sha256", $pass, $pepper);
$pwd_hashed = password_hash($pwd_peppered, PASSWORD_ARGON2ID);

$sql = "INSERT INTO users (login, pass) VALUES ('$login', '$pwd_hashed')";
mysqli_query($conn, $sql);

echo "OK";
?>