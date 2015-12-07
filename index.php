<!DOCTYPE html>
<html>
<title>RPI SafeZone</title>
<head>
  <link rel="css/stylesheet" type="text/css" href="resources/main.css">
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <meta charset="utf-8">
  <link href='https://fonts.googleapis.com/css?family=Poppins:500' rel='stylesheet' type='text/css'>
</head>

<body>
  <div id="floating-panel">
    <input onclick="setHomicide();" type=button value="Homicide" id="homButton">
    <input onclick="setRobbery();" type=button value="Robbery" id="robButton">
    <input onclick="setAssault();" type=button value="Assault" id="assaultButton">
  </div>
  <div id="map"></div>
  <div id= "floating-top-panel">
  <p>SafeZone</p>
  <script src="resources/main.js"></script>
  <input id="pac-input" class="controls" type="text" placeholder="Enter a location">
  <div id="map"></div>
    
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGyx-4zqnfA_VWIEbywqF19PniaKZuM2Q&libraries=places&signed_in=true&callback=initMap"
        async defer></script>
  </div>
  <?php
    exec("php update.php &");
  ?>
  </body>
</html>