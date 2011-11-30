<?php
function GETRequest($url) {
	$content = @file_get_contents($url);
	echo $content;
}

if (isset($_GET['url'])) {
	GETRequest($_GET['url']);
} else {
	echo 'Use "url" property.';
}
?>