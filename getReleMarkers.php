<?php
	include 'datalibrary.php';

	$db = new Data();

	$fp = fopen("test.txt", "w");
	fwrite($fp, "FUCK");

	$xml = new SimpleXMLElement("<markers/>");
	$markers = array();
	$markers = $db->getReleMarkers();
	foreach ($markers as $marker) {
		$marxml = $xml->addChild("<marker\>");
		foreach($marker as $key=>$value){
			$marxml->addChild($key, $value);
		}
	}

	$fp = fopen("test.xml", "w");
	fwrite($fp, $xml->asXML());


	echo $xml->asXML();
	
	// HttpResponse::status(200);
	// HttpResponse::setContentType('text/xml');
	// HttpResponse::setData($xml->asXML());
	// HttpResponse::send();	

?>