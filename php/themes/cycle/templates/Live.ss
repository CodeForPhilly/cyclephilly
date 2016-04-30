<!DOCTYPE html>
<html>
	<head>
		<title>Where's Guru?</title>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script type='text/javascript' src='//static.firebase.com/v0/firebase.js'></script>
		<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
		<style type="text/css">
      		html { height: 100% }
		    body { height: 100%; margin: 0; padding: 0 }
      		#map_canvas { height: 100% }
	    </style>
	</head>
	<body>
		<h1>Where's Guru?</h1>
		<%-- <p>Powered by <a href="http://melle.io">Melle.io</a></p> --%>
		<h2>Last update: <span id="ts"></span></h2>
		<div id="map_canvas"></div>
		<script type="text/javascript">
			$(function() {
				var currentMarker = null;
				function initializeMap() {
					var div = $('#map_canvas')[0];
					var mapOptions = {
						center: new google.maps.LatLng(39.9653818,-75.1425628,17),
						zoom: 15,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					var map = new google.maps.Map(div, mapOptions);
					return map;
				}
				
				function updateMap(map_data, map) {
					var latlng = new google.maps.LatLng(map_data.lat, map_data.lon);
					map.setCenter(latlng);
					if (currentMarker) {
						currentMarker.setPosition(latlng);
					} else {
						var marker_data = {
							map: map,
							position: latlng,
							title: "Lizzy is here"
						};
						currentMarker = new google.maps.Marker(marker_data);
					}
					var date = new Date(map_data.ts);
					$('#ts').text(date.toLocaleString());
				}
				var map = initializeMap();
				/* TODO: Change this to your own firebase location. 
				   Make sure it matches what you put in MainActivity.java  */
				new Firebase('https://carboncycle.firebaseio.com/location/guru')
						.on('value', function(snap) {
					var map_data = snap.val();
					console.log(map_data)
					updateMap(map_data, map);
				});
				
			});
		</script>
	</body>
</html>