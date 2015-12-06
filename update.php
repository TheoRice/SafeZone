<?php

	include "datalibrary.php";

	$db = new Data();
	$db->placeMarker($_POST["type"], $_POST["lat"], $_POST["lng"]);
?>