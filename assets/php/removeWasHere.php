<?php
include_once("conn.php");
$data = $_POST['data'];
$id = $_POST['id'];

$sql = "UPDATE users SET wasHere='$data' WHERE id='$id'";
mysqli_query($conn, $sql);
mysqli_close($conn);
?>