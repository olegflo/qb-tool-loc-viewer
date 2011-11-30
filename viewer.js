var CENTER_LAT = 19.642587534013032;
var CENTER_LNG = -10.1953125;
var ZOOM = 2;
var map_canvas;
var infoWindow = null;
var markersArray = new Array();

function initialize() {
	// Google Map
	var latlng = new google.maps.LatLng(CENTER_LAT, CENTER_LNG);

	var mapOptions = {
		zoom : ZOOM,
		center : latlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map_canvas = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	
	$('#qb_server_url').focus();
	$('#qb_draw').click(draw);
	$('#qb_server_url').keypress(function(event) {
		if (event.which == 13) {
			draw();
		}
	});
}

function getLatLng(xmlNode) {
	var lat = xmlNode.find('latitude').text();
	var lng = xmlNode.find('longitude').text();
	var latlng = new google.maps.LatLng(lat, lng);
	return latlng;
}

function clearOverlays() {
	if(markersArray) {
		for(i in markersArray) {
			markersArray[i].setMap(null);
		}
	}
}


function draw() {
	var url = $('#qb_server_url').val();
	if (url == '') {
		alert('Ooops, URL can\'t be blank');
	}
	
	$.ajax({
		type: 'GET',
		cache: false,
		url: 'GETRequest.php',
		data: 'url=' + escape(url),
		beforeSend: function() {
			$('#loader').show();
		},
		success: function(xml) {
			$('#loader').hide();
			var flag = false;
			
			clearOverlays();
			
			$(xml).find('geo-data').each(function() {
				flag = true;
				var status = $(this).find('status').text();
				var latlng = getLatLng($(this));
				
				var marker = new google.maps.Marker({
					position : latlng,
					map : map_canvas,
					title : 'Lat ' + latlng.lat() + ', Lng ' + latlng.lng()
				});
				markersArray.push(marker);

				var contentString = '<p>' + 'Status: <strong>' + status + '</strong></p><p>Lat: <strong>' + latlng.lat() + '</strong></p><p>Lng: <strong>' + latlng.lng() + '</strong></p>';

				if (infoWindow) infoWindow.close();
				infoWindow = new google.maps.InfoWindow({
					content: contentString
				});
				
				google.maps.event.addListener(marker, 'click', function() {
					infoWindow.open(map_canvas, marker);	
				});    
			});
			if (!flag) {
				alert('Ooops, probably URL is wrong.');
			}
		}
	});
}