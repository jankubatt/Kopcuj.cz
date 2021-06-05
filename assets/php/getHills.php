<?php
    include_once("conn.php");
    mysqli_set_charset($conn, "utf8");

    $data = [];

    $sql = "SELECT * FROM hills";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            array_push($data, [ "name"=>$row['name'],
                                "elevation"=>$row['elevation'],
                                "lat"=>$row['lat'],
                                "lon"=>$row['lon'],
                                "prominence"=>$row['prominence'],
                                "isolation"=>$row['isolation'],
                                "material"=>$row['material'],
                                "basin"=>$row['basin'],
                                "district"=>$row['district'],
                                "location"=>$row['location']]);
        }
    }

    echo json_encode($data);
?>