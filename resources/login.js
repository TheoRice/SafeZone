var map;

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center:{lat: 42.730282, lng: -73.678717},
		zoom: 15
	});
}