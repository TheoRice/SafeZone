<!DOCTYPE html>
<html>
<title>RPI SafeZone</title>
<head>
	<link rel="stylesheet" type="text/css" href="resources/main.css">
</head>
<body>

	<div id="floating-panel">
      <input onclick="setHomicide();" type=button value="Homicide" id="homButton">
      <input onclick="setRobbery();" type=button value="Robbery" id="robButton">
      <input onclick="setAssault();" type=button value="Assault" id="assaultButton">
    </div>
    <div id="map"></div>
    <p>Click on the map to add markers.</p>
	<script src="resources/main.js"></script>



  
    
    <input id="pac-input" class="controls" type="text"
        placeholder="Enter a location">
    <div id="map"></div>

   


    </script>

<div id="locationField">
      <input id="autocomplete" placeholder="Enter your address"
             onFocus="geolocate()" type="text"></input>
    </div>

    <table id="address">
      <tr>
        <td class="label">Street address</td>
        <td class="slimField"><input class="field" id="street_number"
              disabled="true"></input></td>
        <td class="wideField" colspan="2"><input class="field" id="route"
              disabled="true"></input></td>
      </tr>
      <tr>
        <td class="label">City</td>
        <td class="wideField" colspan="3"><input class="field" id="locality"
              disabled="true"></input></td>
      </tr>
      <tr>
        <td class="label">State</td>
        <td class="slimField"><input class="field"
              id="administrative_area_level_1" disabled="true"></input></td>
        <td class="label">Zip code</td>
        <td class="wideField"><input class="field" id="postal_code"
              disabled="true"></input></td>
      </tr>
      <tr>
        <td class="label">Country</td>
        <td class="wideField" colspan="3"><input class="field"
              id="country" disabled="true"></input></td>
      </tr>
    </table>

   

    
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGyx-4zqnfA_VWIEbywqF19PniaKZuM2Q&libraries=places&signed_in=true&callback=initMap"
        async defer></script>
	<?php
		exec("php update.php &");
	?>
	</body>
</html>