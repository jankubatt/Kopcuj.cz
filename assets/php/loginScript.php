<?php
include_once("conn.php");

$login = $_POST['login'];
$pass = $_POST['pass'];

$pepper = get_cfg_var("pepper");
$pwd_peppered = hash_hmac("sha256", $pass, $pepper);

$sql = "SELECT id, pass FROM users WHERE login = '$login'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $pwd_hashed = $row['pass'];
    $id = $row['id'];

    $sql = "SELECT id FROM ids WHERE id='$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $sql = "DELETE FROM ids WHERE id='$id'";
        mysqli_query($conn, $sql);
    }
    }

    $cookie_value = password_hash($id, PASSWORD_DEFAULT);
    $sql = "INSERT INTO ids (id, idKey) VALUES ('$id', '$cookie_value')";
    mysqli_query($conn, $sql);  
  }
}

if (password_verify($pwd_peppered, $pwd_hashed)) {
    setcookie("id", $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
    date_default_timezone_set('Europe/Prague');
    $date=date("Y-m-d H:i:s");
    $sql = "UPDATE users SET lastLogin=now() WHERE login='$login'";
    mysqli_query($conn, $sql);
    echo "OK";
}
?>