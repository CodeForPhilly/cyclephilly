// create the map content
var map = L.map('mapBody', {
    center: [33.77, -84.372],
    zoom: 17
});

// add an OpenStreetMap tile layer
var stamenUrl = 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png';
var stamenAttribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.';

var mapTileLayer = new L.TileLayer(stamenUrl, {maxZoom: 18, attribution: stamenAttribution});
map.addLayer(mapTileLayer);

var tilesVisible = true;

function toggleTiles (){
	if(tilesVisible){
		mapTileLayer.setOpacity(0);
		tilesVisible = false;
		$('.tileToggle').text('Show');
	}else{
		mapTileLayer.setOpacity(1);
		tilesVisible = true;
		$('.tileToggle').text('Hide');
	}
}

function loadData (){
	Trips.init({loadNum: 5});
}

var Trips ={
	init: function(config) {
		this.trip_count = 1;
		this.config =config;
	 	this.trips = this.fetchTrips();	 	
	},
	fetchTrips: function(query) {
		var self = Trips;
		$.ajax({
			url: 'routeData.php',
			type: 'POST',
			data: {
				t:'get_trip_ids',
				}, 
			dataType: 'json',
			success: function(results) {
				$('.trip_total').text(results.length);
				for(var n in results){
		 			self.fetchData(results[n].id);
			 	}			 
				self.trips = results;
				
			}
		});
		return self.trips;
	},
	fetchData: function(query) {
		var self = Trips;
		$.ajax({
			url: 'routeData.php',
			type: 'POST',
			data: {
				q:query,
				t:'get_coords_by_trip',
				}, 
			dataType: 'json',
			success: function(results) {
				self.data = results;
				self.attachPolyline();
			}
		});
		return self.data;
	},
	attachPolyline: function() {
		var latlng,
			polyline;

			latlngs = new Array();

		$(this.data).each(function() {
			self = $(this)[0]; 
			latlng = new L.LatLng(self.latitude,self.longitude);
			latlngs.push(latlng);
		});	
		polyline = L.polyline(latlngs, {color: 'red', weight: 1, opacity: .1}).addTo(map);
		$('.trip_count').text(this.trip_count++);
	}
}


