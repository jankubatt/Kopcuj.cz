<?php
include_once("conn.php");
$data = $_POST['data'];
$id = $_POST['id'];
$wasHere = "";
$parsedData = "";

$sql = "SELECT wasHere FROM users WHERE id='$id'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  while($row = mysqli_fetch_assoc($result)) {
    $wasHere = $row['wasHere'];
  }
}

$data = $wasHere . ", " . $data;
echo "data " . $data;
$data = explode(",", $data);

foreach ($data as &$value) {
  echo $value;
	if (is_numeric($value)) {
		$parsedData .= $value . ",";
	}
}

$sql = "UPDATE users SET wasHere='$parsedData' WHERE id='$id'";
mysqli_query($conn, $sql);
mysqli_close($conn);
?>