<!DOCTYPE HTML>
<html>
	<head>
		<script src="https://www.google.com/jsapi?key=ABQIAAAA9gUTM6dV-cEFaa_abvKvcBQoduPFNWYwf0N7f3pVEjXoo2DNDBTb_qhDroTzCIbzIK943R17zzUb1Q" type="text/javascript"></script>
		<script type="text/javascript">google.load("jquery", "1.6.4");</script>
		<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false&language=en"></script>
		<script type="text/javascript" src="viewer.js"></script>
		<meta charset="UTF-8">
		<title>QuickBlox Tool: Location Viewer</title>
		<style type="text/css">
			#wrap {
				width:900px;
				margin:0 auto;
			}
			#map_canvas {
				width:100%;
				height:500px;
				background:gray;
			}
			#qb_server_url {
				width:600px;
			}
			#loader {
				display:none;				
				position:absolute;
				margin-left:5px;
				margin-top:-4px;
			}
		</style>
	</head>
	<body onload="initialize()">
		<div id="wrap">
			<h1>QuickBlox Tool: Location Viewer</h1>
			<p>
				<label for="qb_server_url"><strong>Geopos query (URL)</strong></label><br>
				<input value="http://geopos.quickblox.com/geodata/find.xml" type="text" name="qb_server_url" id="qb_server_url" placeholder="Enter URL here" /> 
				<input type="button" id="qb_draw" value="Draw markers" />
				<img id="loader" src="ajax-loader.gif">
			</p>
			<div id="map_canvas"></div>
		</div>
	</body>
</html>