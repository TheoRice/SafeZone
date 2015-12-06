	var map;
	var hom = false;
	var rob = false;
	var assault = false;

	function CenterControl(controlDiv, map) {

		// Set CSS for the control border.
		var controlUI = document.createElement('div');
		controlUI.className = controlUI.className + "controlUI";
		controlUI.title = 'Click to recenter the map';
		controlDiv.appendChild(controlUI);

		// Set CSS for the control interior.
		var controlText = document.createElement('div');
		controlText.className = controlText.className + "controlText";
		controlText.innerHTML = 'Center On RPI';
		controlUI.appendChild(controlText);

		  // On click, the map is recentered to RPI campus and the zoom level is reset to 15.
		controlUI.addEventListener('click', function() {
		 	map.setCenter({lat: 42.730282, lng: -73.678717});
		  	map.setZoom(15)
		});
	}

	function setHomicide() { // When the homicide button is clicked, set hom to true and everything else to false
		hom = true;
		rob = false;
		assault = false;
	}

	function setRobbery() { // When the robbery button is clicked, set rob to true and everything else to false
		rob = true;
		hom = false;
		assault = false;
	}

	function setAssault() {
		assault = true;
		hom = false;
		rob = false;
	}

	function initMap() {										      // Function to initialize map
	  	map = new google.maps.Map(document.getElementById('map'), {   // Creates a new map
	    	center: {lat: 42.730282, lng: -73.678717},				  // Centers the coordinates to RPI
	   		zoom: 15												  // Zooms in close to the campus		   
		});

	    // Create the DIV to hold the control and call the CenterControl() constructor
	    // passing in this DIV.
		var centerControlDiv = document.createElement('div');
		var centerControl = new CenterControl(centerControlDiv, map);
		
		centerControlDiv.index = 1;
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

		// This event listener calls addMarker() when the map is clicked.
		google.maps.event.addListener(map, 'click', function(e) {
			var marker = placeMarker(e.latLng, map);
		});

		var infowindow = new google.maps.InfoWindow({
			content: 'test'
			});

		marker.addListener('click', function() {
			infowindow.open(map, mar)
		});
	}

	function placeMarker(position, map) {
		var choiceURL = 'resources/markerImages/uncategorized.png'
		if (hom == true) {  
			// If the user has clicked homicide, we change the marker image to the homicide png.
			choiceURL = 'resources/markerImages/homicide.png';
		}
		else if (rob == true) {
			// If the user has clicked robbery, we change the marker image to the robbery png.
			choiceURL = 'resources/markerImages/robbery.png';
		}
		else if (assault == true) {
			// If the user has clicked assault, we change the marker image to the assault png.
			choiceURL = 'resources/markerImages/assault.png';
		}
		// The iconChoice variable needs to be set based on which crime is true.
		var iconChoice = {
			url: choiceURL
		}
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			icon: iconChoice
		}); 
	}