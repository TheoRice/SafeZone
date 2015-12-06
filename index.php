<!DOCTYPE html>
<html>
<title>RPI SafeZone</title>
<head>
	<link rel="stylesheet" type="text/css" href="resources/main.css">
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
</head>
<body>

	<div id="floating-panel">
      <input onclick="setHomicide();" type=button value="Homicide" id="homButton">
      <input onclick="setRobbery();" type=button value="Robbery" id="robButton">
      <input onclick="setAssault();" type=button value="Assault" id="assaultButton">
    </div>
    <input id="pac-input" class="controls" type="text" placeholder="Search Box">
    <div id="map"></div>
    <p>Click on the map to add markers.</p>
	<script src="resources/main.js"></script>

    <div id="map"></div>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGyx-4zqnfA_VWIEbywqF19PniaKZuM2Q&libraries=places&signed_in=true&callback=initMap"
        async defer></script>

	<?php
		exec("php update.php &");
	?>
	</body>
</html>