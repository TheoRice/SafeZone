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

function placeMarker(position, map) {
	var choiceURL = 'resources/markerImages/uncategorized.png';
	var type = "uncategorized";
	if (hom == true) {  
		// If the user has clicked homicide, we change the marker image to the homicide png.
		choiceURL = 'resources/markerImages/homicide.png';
		type = "homicide";
	}
	else if (rob == true) {
		// If the user has clicked robbery, we change the marker image to the robbery png.
		choiceURL = 'resources/markerImages/robbery.png';
		type = "robbery";
	}
	else if (assault == true) {
		// If the user has clicked assault, we change the marker image to the assault png.
		choiceURL = 'resources/markerImages/assault.png';
		type = "assault";
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
	var obj = {
		type: type,
		lat: position.lat(),
		lng: position.lng()
	};

	var string = "type=" + type + "&lat=" + position.lat() + "&lng=" + position.lng();

	var request = new XMLHttpRequest();
	request.open('POST', 'update.php', false);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(string);
}

/*other code*/

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center:{lat: 42.730282, lng: -73.678717},
		zoom: 15
	});

	var input = document.getElementById('pac-input');

	var centerControlDiv = document.createElement('div');
	var centerControl = new CenterControl(centerControlDiv, map);

	centerControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

	// This event listener calls addMarker() when the map is clicked.
	google.maps.event.addListener(map, 'click', function(e) {
		var marker = placeMarker(e.latLng, map);
	});

	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);

	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var infowindow = new google.maps.InfoWindow();
	var marker = new google.maps.Marker({
		map: map
	});
	marker.addListener('click', function() {
		infowindow.open(map, marker);
	});

	autocomplete.addListener('place_changed', function() {
	infowindow.close();
	var place = autocomplete.getPlace();
	if (!place.geometry) {
		return;
	}

	if (place.geometry.viewport) {
		map.fitBounds(place.geometry.viewport);
	} else {
		map.setCenter(place.geometry.location);
		map.setZoom(17);
	}

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
    	placeId: place.place_id,
    	location: place.geometry.location
    });
    marker.setVisible(true);

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
    	'Place ID: ' + place.place_id + '<br>' +
    	place.formatted_address);
    infowindow.open(map, marker);
});
	}

// displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

var placeSearch, autocomplete;
var componentForm = {
	street_number: 'short_name',
	route: 'long_name',
	locality: 'long_name',
	administrative_area_level_1: 'short_name',
	country: 'long_name',
	postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
  	/** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
  	{types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

// [START region_fillform]
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
  	document.getElementById(component).value = '';
  	document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
  	var addressType = place.address_components[i].types[0];
  	if (componentForm[addressType]) {
  		var val = place.address_components[i][componentForm[addressType]];
  		document.getElementById(addressType).value = val;
  	}
  }
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			var circle = new google.maps.Circle({
				center: geolocation,
				radius: position.coords.accuracy
			});
			autocomplete.setBounds(circle.getBounds());
		});
	}
}
// [END region_geolocation]

