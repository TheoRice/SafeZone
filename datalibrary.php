<?php

	include "dblib.php";

	class Data {
		private $db;
		function __construct () {
			$this->db = new MyDB();
		}

		function placeMarker($type, $lat, $lng) {
			$data = [];
			$data["type"]=$type;
			$data["lat"]=$lat;
			$data["lng"]=$lng;
			$data["timecode"]=time();
			$this->db->addEntry($data, "markers");
		}

		function getReleMarkers() {
			return $this->db->getReleMarkers();
		}
	}
?>