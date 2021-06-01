<?php
    include_once("conn.php");

    $key = $_GET["key"];

    $sql = "SELECT id FROM ids WHERE idKey='$key'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $id = $row['id'];
    }
    }

    $sql = "SELECT login, wasHere FROM users WHERE id='$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $login = $row['login'];
        $wasHere = $row['wasHere'];
        $myObj = array("id" => $id, "login" => $login, "wasHere" => $wasHere);
        $myJSON = json_encode($myObj);
        echo $myJSON;
    }
    }

    mysqli_close($conn);
?>