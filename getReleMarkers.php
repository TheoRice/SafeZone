<?php

	include 'datalibrary.php';

	$db = new Data();
	$xml = new SimpleXMLElement("<markers/>");
	$markers = array();
	$markers = $db->getReleMarkers();
	foreach ($markers as $marker) {
		$marxml = $xml->addChild("marker");
		foreach($marker as $key=>$value){
			$marxml->addChild($key, $value);
		}
	}
	echo preg_replace('/^.+\n/', '', $xml->asXML());

?>
