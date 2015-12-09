var map;
var hom = false;
var rob = false;
var assault = false;

var keysToScroll = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1};

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
	if (keysToScroll[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

function disableScroll() {
	if (window.addEventListener) {// older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
		window.onwheel = preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
		window.ontouchmove  = preventDefault; // mobile
		document.onkeydown  = preventDefaultForScrollKeys;
	}
}	

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

function setColor(id) {
	var myElement = document.querySelector(id);
	myElement.style.backgroundColor = "red";
	myElement.style.color = "white"
}

function removeColor(id) {
	var myElement = document.querySelector(id);
	myElement.style.backgroundColor = "white";
	myElement.style.color = "red";
}

function setHomicide() { // When the homicide button is clicked, set hom to true and everything else to false
	if (hom == false) {
		hom = true;
		rob = false;
		assault = false;
		setColor("#homButton");
		removeColor("#robButton");
		removeColor("#assaultButton");
	}
	else {
		hom = false;
		removeColor("#homButton");
	}
}

function setRobbery() { // When the robbery button is clicked, set rob to true and everything else to false
	if (rob == false) {
		rob = true;
		hom = false;
		assault = false;
		setColor("#robButton");
		removeColor("#homButton");
		removeColor("#assaultButton");
	}
	else if (rob == true) {
		rob = false;
		removeColor("#robButton");
	}
}

function setAssault() {
	if (assault == false) {
		assault = true;
		hom = false;
		rob = false;
		setColor("#assaultButton");
		removeColor("#robButton");
		removeColor("#homButton");
	}
	else {
		assault = false;
		removeColor("#assaultButton");
	}
}

function xmlToJson(xml) {
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

function placeMarkerWithType(latitude, longitude, map, type) {
	var position = {lat: latitude, lng: longitude};
	var choiceURL;
	if (type == "homicide") {  
		// If the user has clicked homicide, we change the marker image to the homicide png.
		choiceURL = 'resources/markerImages/homicide.png';
	}
	else if (type == "assault") {
		// If the user has clicked robbery, we change the marker image to the robbery png.
		choiceURL = 'resources/markerImages/assault.png';
	}
	else if (type == "robbery") {
		// If the user has clicked assault, we change the marker image to the assault png.
		choiceURL = 'resources/markerImages/robbery.png';
	}
	var iconChoice = {
		url: choiceURL
	}
	var marker = new google.maps.Marker({
		position: position,
		map: map,
		icon: iconChoice
	}); 
}

function placeMarker(position, map) {
	if (hom == false && rob == false && assault == false) {
		return;
	}
	var choiceURL;
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

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center:{lat: 42.730282, lng: -73.678717},
		zoom: 15
	});

	var request = new XMLHttpRequest();
	request.open('GET', 'getReleMarkers.php', false);
	request.send();

	var domparser = new DOMParser();
	var fromString = domparser.parseFromString(request.responseText,"text/xml");
	var parsedResponse = xmlToJson(fromString);

	var m;
	if (parsedResponse["markers"]["marker"] instanceof Array) {
		for (var i = 0; i < parsedResponse["markers"]["marker"].length; i++) { 
			m = parsedResponse["markers"]["marker"][i];
			placeMarkerWithType(Number(m["lat"]["#text"]), Number(m["lng"]["#text"]), map, m["type"]["#text"]);
		}
	}
	else if (parsedResponse["markers"]["marker"] instanceof Object) {
		m = parsedResponse["markers"]["marker"];
		placeMarkerWithType(Number(m["lat"]["#text"]), Number(m["lng"]["#text"]), map, m["type"]["#text"]);
	}

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

	autocomplete.addListener('place_changed', function() {
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			return;
		}

		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(15);
		}

		placeMarker(place.geometry.location, map);
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
  autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),{types: ['geocode']});
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
	var place = autocomplete.getPlace();

	for (var component in componentForm) {
		document.getElementById(component).value = '';
		document.getElementById(component).disabled = false;
  	}

	for (var i = 0; i < place.address_components.length; i++) {
		var addressType = place.address_components[i].types[0];
		if (componentForm[addressType]) {
			var val = place.address_components[i][componentForm[addressType]];
			document.getElementById(addressType).value = val;
		}
	}
}

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

