// create the map content
var map = L.map('map', {
    center: [39.9452735, -75.1485887], 
    zoom: 13
});

// add an OpenStreetMap tile layer
var stamenUrl = 'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png';
var stamenAttribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.';

//var mapTileLayer = new L.StamenTileLayer("toner-lite");

var mapTileLayer = new L.TileLayer(stamenUrl, {maxZoom: 17, attribution: stamenAttribution});
map.addLayer(mapTileLayer);
var tripsLayer = new L.LayerGroup().addTo(map);

$(".leaflet-control-zoom").css("background-color","rgba(0, 0, 0, 0.25)"); //changed zoom control to black
//$(".leaflet-control-zoom").css("position","relative"); //changed position to relative
//$(".leaflet-control-zoom").css("margin","15%"); //changed postition to top-left

var upControl = L.Control.extend({
    options: {
        position: 'bottomright'
    },



    onAdd: function(map) {
        
         var className = 'leaflet-control-up';
        var container = L.DomUtil.create('div', 'leaflet-control-up');

        var link = L.DomUtil.create('a', className + '-link', container);
        link.href = '#';
        link.title = 'Scroll to Top';

        
        L.DomEvent.on(link, 'click', function(evt) {
            L.DomEvent.stopPropagation(evt);
            $('html,body').animate({
                scrollTop: $('#branding').offset().top
            }, 250);       
        })                
        return container;  
    }
});     

var downControl = L.Control.extend({
    options: {
        position: 'topright'
    },



    onAdd: function(map) {
        
         var className = 'leaflet-control-down';
        var container = L.DomUtil.create('div', 'leaflet-control-down');

        var link = L.DomUtil.create('a', className + '-link', container);
        link.href = '#';
        link.title = 'Scroll to Map';

        
        L.DomEvent.on(link, 'click', function(evt) {
            L.DomEvent.stopPropagation(evt);
            $('html,body').animate({
                scrollTop: $('#map').offset().top
            }, 250);       
        })                
        return container;  
    }
});

map.addControl(new upControl());
map.addControl(new downControl());

map.locate({setView: true, maxZoom: 14});

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

var tilesVisible = true;

var loadedTrips = new Array();
var visibleTrips = new Array();

var riderType = "";
var gender = ""
var ethnicity = "";
var age = "";
var purpose = new Array();

var r_depth = 0; //keep track of recursion depth for status updates
var colorArray = ['#909291', '#C84140', '#3C6E9C', '#70A35C', '256baf', '#82538B', '#71D6D6', '#C5AACF', '#B6EF9F'];
//array order: grey, red, blue, green, cyclephillyDarkBlue, purple, shopping, l.purple, grey
var showColors = "none";

var LOAD_CHUNK = 35; // constant for how many trips to fetch at a time.

function tileOpacity (alpha){
	mapTileLayer.setOpacity(alpha);
}

// $('#ca_data_selector').submit(
//  $('html,body').animate({
//                         scrollTop: $('#map').offset().top
//                     }, 250);   
// );


$("#scroll").click(function() {
    $('html, body').animate({
        scrollTop: $("#map").offset().top
    }, 2000);
});


// This first function is for multiple trip selection, 
//remove the comments if you use a multiple trip selector and comment out the one below it

// $('#ca_data_selector').submit(function() {

// 	var selectedDemo = ""; //Empty string to pass to function

	
// 	var temp = $('#ca_data_selector_field').val(); // Get values from datalist
// 	temp.toString(); // Convert datalist array to string
// 	temp = "'"+temp+"'"; // Add ' to the beginning and end of string
// 	var selectedPurpose; // define variable to pass to function
//     selectedPurpose = temp.replace(/,/g,"', '"); // add interior apostrophes
// 	console.log(selectedDemo);
// 	console.log(selectedPurpose);
// 	getFilteredTrips(selectedDemo, selectedPurpose);
// return false;
// 	});



$('#ca_data_selector').submit(function() {

	var selectedDemo = ""; //Empty string to pass to function

	
	var temp = $('#ca_data_selector_field option:selected').val(); // Get values from datalist
	temp.toString(); // Convert datalist array to string
	temp = "'"+temp+"'"; // Add ' to the beginning and end of string
	var selectedPurpose; // define variable to pass to function
    selectedPurpose = temp.replace(/,/g,"', '"); // add interior apostrophes
	console.log(selectedDemo);
	console.log(selectedPurpose);
	getFilteredTrips(selectedDemo, selectedPurpose);
return false;
	});


// START OLD JS TO LEAVE COMMENTED OUT

	// var par = "";//$('#ca_data_selector_field :selected').parent().attr('label');

	/*temp.each();

	for (var i=0; i<temp.length;i++) {
		temp[i].parent().attr('label');
		exit();
		str += '"'+temp[i]+'":"'+temp[i]+'"';
		if (i!=(temp.length-1)) {
			str += ',';
		}
	}
	str += '}';

	getFilteredTrips(str);*/
	// console.log(str);
//	

//	
	
//	
//	
//	
	
	//more generous searches, will pull lots more data.	
/*
	if(0 === $('input:checkbox:checked').size()){
		alert('You must select at least one attribute to begin loading data.');
		return false;
	    // Error condition
    }
*/
   
    //more restricted searchers as only pulls data with something in each category
//	if(0 === $('input:checkbox.rider_type:checked').size() ||
//	   0 === $('input:checkbox.gender:checked').size() ||
//	   0 === $('input:checkbox.ethnicity:checked').size() ||
//	   0 === $('input:checkbox.age:checked').size() ||
//	   0 === $('input:checkbox.trip_purpose:checked').size()){
//		alert('You must select at least one item from each category.');
//		return false;
 //   }
	
//	$('input:checkbox.rider_type').each(function () {
//		if(this.checked){
//			if(riderType!="") riderType+=", ";
//			riderType += $(this).val();
//		}
//	});
	
//	$('input:checkbox.gender').each(function () {
//		if(this.checked){
//			if(gender!="") gender+=", ";
//			gender += $(this).val();
//		}
//	});
	
//	$('input:checkbox.ethnicity').each(function () {
//		if(this.checked){
//			if(ethnicity!="") ethnicity+=", ";
//			ethnicity += $(this).val();
//		}
//	});
	
//	$('input:checkbox.age').each(function () {
//		if(this.checked){
//			if(age!="") age+=", ";
//			age += $(this).val();
//		}
//	});
	
//	$('input:checkbox.trip_purpose').each(function () {
//		if(this.checked){
//			purpose.push($(this).val());
//		}
//	});
	
// END OLD JS TO LEAVE COMMENTED OUT




// 	if(riderType!="") demoQuery = "WHERE rider_type IN ("+riderType+") ";
// 	if(gender!=""){
// 		if(demoQuery != "") demoQuery += "AND gender IN ("+gender+") ";
// 		else demoQuery += "WHERE gender IN ("+gender+") ";
// 	}
// 	if(ethnicity!=""){
// 		if(demoQuery != "") demoQuery += "AND ethnicity IN ("+ethnicity+") ";
// 		else demoQuery += "WHERE ethnicity IN ("+ethnicity+") ";
// 	}
// 	if(age!=""){ 
// 		if(demoQuery != "")demoQuery += "AND age IN ("+age+") ";
// 		else demoQuery += "WHERE age IN ("+age+") ";
// 	}
// 	//generate the purposeQuery
// 	for(i=0; i < purpose.length; i++){
// 		if(purposeQuery != "")	purposeQuery += ", ";
// 		purposeQuery += "'" + purpose[i] + "'";
// 	}
	
// 	$('input[type="submit"]').attr('disabled','disabled');
	
// 	//tripsToDraw = new Array ();
// 	updatePolylines(0);
// 	visibleTrips = new Array(); //must happen after updating polylines 
// 	$('#statusMsg').text("Updating map...");
// 	$('#status').css("visibility", "visible");
// 	$('.trip_count').text("");	
// 	getFilteredTrips(demoQuery, purposeQuery);
// 	//prevent normal POST from occuring
// 	return false;
// });

function getFilteredTrips(selectedDemo, selectedPurpose) {
//	var self = Trips;
console.log(selectedDemo);
console.log(selectedPurpose);
	$.ajax({
		url: 'getData.php',
		type: 'POST',
		data: {
			t:'get_filtered_users',
			demo:selectedDemo,
			purpose:selectedPurpose,
			}, 
		dataType: 'json',
		success: function(results) {	
			console.log("Total trips to display: " + results.length);//HERE... simlify				
			var tripsToFetch = new Array();		
			var tripsToDraw = new Array();
			//populate the loaded trips array, indexed on trip_id			
			for(var i=0; i < results.length; i++){
				if(!loadedTrips[results[i].id]){
					//trip not already loaded					
					loadedTrips[results[i].id] = {trip : results[i], path : null};
					tripsToFetch.push(results[i].id);					
				}else{
					//trip is loaded and will need to be drawn again
					tripsToDraw.push(results[i].id);
				}
				//update overall visibleTrips array used for refreshing
				visibleTrips.push(results[i].id);
			}
			if(tripsToDraw.length>0) $('#statusMsg').text("Loading more rides...");
			else $('#statusMsg').text("Loading rides...");
			$('#status').css("visibility", "visible");					
			//get the data for new trips.
			console.log("Total new trips to fetch: " + tripsToFetch.length);
			if(tripsToFetch.length>0){			
				getTripData(tripsToFetch);
			}else {
				$('input[type="submit"]').removeAttr('disabled');
				$('#status').css("visibility", "hidden");				
			}
			//draw polylines for existing trips
			if(tripsToDraw.length>0) drawPolylines(loadedTrips, tripsToDraw);				
		}
	});	
}

function getTripData(tripArray){
	var query = "";
	if(tripArray.length > LOAD_CHUNK){
		for(var i=0; i < LOAD_CHUNK; i++){
			if(query != "") query += ", ";
			query += tripArray[i];
		}
		tripArray.splice(0,LOAD_CHUNK);
		r_depth++;
		getTripData(tripArray);
	}else{	
		for(var i=0; i < tripArray.length; i++){
			if(query != "") query += ", ";
			query += tripArray[i];
		}
	}
	$.ajax({
		url: 'getData.php',
		type: 'POST',
		data: {
			t:'get_coords_by_trip',
			q:query,
			}, 
		dataType: 'json',
		success: function(results) {
			if(results.length>0)
				drawPolylines(results);
			r_depth--;
			if (r_depth <= 0){
				$('#status').css("visibility", "hidden");
				$('input[type="submit"]').removeAttr('disabled');
			} else {
				$('#statusMsg').text("Loading rides...");
			}
		},
		error: function(){			
			r_depth--;
			if (r_depth <= 0){ 
				$('#status').css("visibility", "hidden");
				$('input[type="submit"]').removeAttr('disabled');
			}else {
				$('#statusMsg').text("Loading rides...");
			}
		}
	});
}



// Rewritten for Cycle Philly by Corey Acri to obscure beginning and end points acri.corey@gmail.com
function drawPolylines(tripData, tripsToDraw) {  
	var latlng;
	var latlng2;
	var pathColor='#256baf';
	var workingTrip = "";	
	var object_size = 0;



		for(var i=0; i< tripData.length; i++){

			var latlngClip;
			var latlngs = new Array();

	
			if (isNaN(tripData[i].trip_id) == false){  // checking to make sure we are in a valid trip before starting process.  Really just need to check if there is anything at that position in the object


			workingTrip = tripData[i].trip_id;
			
							for (var j = i; workingTrip == tripData[j].trip_id && j < tripData.length-1; j++){								
									
									latlng = new L.LatLng(tripData[j].latitude,tripData[j].longitude);
									latlngs.push(latlng);
									object_size++;
							
							}


						if (object_size > 100 && object_size < 3000) {   // only plot trips over 100 points in length 


								latlngClip = new Array();

								for (var k=Math.round(object_size*.10); k< Math.round(object_size*.90); k++){
										
								
									latlngClip.push(latlngs[k]);	



										
								} // close for loop that clips the object array

								loadedTrips[workingTrip].path = L.polyline(latlngClip, {color: pathColor, weight: 2, opacity: .5, smoothFactor: 5, lineCap: 'round', lineJoin: 'miter'});					
								tripsLayer.addLayer(loadedTrips[workingTrip].path); // draw trips using leaflet polyline function
							


			 			}  // close if statement

								i = j; //catching the first for loop up to the end of the position of the current Working Trip in the tripData object
								object_size=0; // reseting object size to prep for new trip
								delete latlngs; // clearing contents of objects
								delete latlngClip;
								

			} // close working id if statement 


			else {  // I think I can get rid of this if statement


				console.log("Nothing more to plot");

			}

							

		}  // close first for loop

		

} // close function


//CycleAtlanta Version of polylines 
// function drawPolylines(tripData, tripsToDraw) {
// 	var latlng;
// 	var	latlngs = new Array();
// 	var pathColor='#256baf';
// 	var workingTrip = "";	
// 	if(!tripsToDraw){
// 		//do this when dealing with a fresh ajax return, we know this is meant to be visible
// 		for(var i=0; i<tripData.length; i++){
// 			if(tripData[i].trip_id != workingTrip){
// 				if (latlngs.length>0){
// 					//add the previous, completed polyline, color coded if needed
// 					pathColor = setPolylineColor (loadedTrips[workingTrip]);				
// 					loadedTrips[workingTrip].path = L.polyline(latlngs, {color: pathColor, weight: 5, opacity: .5, smoothFactor: 5});					
// 					tripsLayer.addLayer(loadedTrips[workingTrip].path);
// 					//loadedTrips[workingTrip].path.bindPopup(workingTrip);
// 				}
// 				latlngs = new Array();
// 				workingTrip = tripData[i].trip_id;
// 			}
// 			//start the new polyline
// 			latlng = new L.LatLng(tripData[i].latitude,tripData[i].longitude);
// 			latlngs.push(latlng);		
// 		}
// 		//add the last polyline
// 		pathColor = setPolylineColor (loadedTrips[workingTrip]);
// 		loadedTrips[workingTrip].path = L.polyline(latlngs, {color: pathColor, weight: 5, opacity: .5, smoothFactor: 5});
// 		tripsLayer.addLayer(loadedTrips[workingTrip].path);
// 		//loadedTrips[workingTrip].path.bindPopup(workingTrip);
// 	}else{
// 		//do this when updating the polylines, we need to only render visible lines, not all the data potentially pulled down.
// 		for(var i=0; i<tripsToDraw.length; i++){
// 			if(tripData[tripsToDraw[i]].path){
// 				pathColor = setPolylineColor (loadedTrips[tripsToDraw[i]]);
// 				//recreate the polyline based on previous line's latlngs...?
// 				tripData[tripsToDraw[i]].path = L.polyline(tripData[tripsToDraw[i]].path._latlngs, {color: pathColor, weight: 5, opacity: .5, smoothFactor: 5});
// 				tripsLayer.addLayer(tripData[tripsToDraw[i]].path);	
// 				//tripData[tripsToDraw[i]].path.bindPopup(tripsToDraw[i]);
// 			}
// 		}
// 	}
// }

function updatePolylines(lineOpacity){
	if(visibleTrips.length>0){
		for(i=0; i<visibleTrips.length; i++){	
			if(	loadedTrips[visibleTrips[i]].path ){
				pathColor = setPolylineColor(loadedTrips[visibleTrips[i]]);
				loadedTrips[visibleTrips[i]].path.setStyle({color:pathColor, opacity: lineOpacity}); 						
			}
		}
	}
	if(r_depth <= 0) //just in case some updates the color while stuff is downloading.
		$('#status').css("visibility", "hidden");
}

//returns the color to use based on current color-coding selection
function setPolylineColor (currentTrip){
	if(showColors=="gender"){
		return colorArray[currentTrip.trip.gender];
	}else if (showColors=="ethnicity"){
		return colorArray[currentTrip.trip.ethnicity];
	}else if (showColors=="age"){
		return colorArray[currentTrip.trip.age-1]; //offset w/ array bcs we ignore <18 yrs old
	}else if (showColors=="rider_type"){
		return colorArray[currentTrip.trip.rider_type];
	}else if(showColors=="purpose"){
		if(currentTrip.trip.purpose=="Commute") return colorArray[1];
		if(currentTrip.trip.purpose=="School") return colorArray[2];
		if(currentTrip.trip.purpose=="Work-Related") return colorArray[3];
		if(currentTrip.trip.purpose=="Exercise") return colorArray[4];
		if(currentTrip.trip.purpose=="Social") return colorArray[5];
		if(currentTrip.trip.purpose=="Shopping") return colorArray[6];
		if(currentTrip.trip.purpose=="Errand") return colorArray[7];
		if(currentTrip.trip.purpose=="Other") return colorArray[8];
	}else{
		return "#256baf";
	}
}

function changeColor(tripCategory){
	if(loadedTrips.length>0){
		$('#statusMsg').text("Updating map...");
		$('#status').css("visibility", "visible");
	}
	showColors = tripCategory.value;
	colorIndex = 1;
	var checkboxes = document.getElementsByTagName("input");
	for(var i = 0; i < checkboxes.length; i++){
		if(checkboxes[i].type == "checkbox"){
			if(checkboxes[i].className.indexOf(showColors)!=-1){				
				document.getElementById("label_"+checkboxes[i].id).setAttribute("style", "background-color: " + colorArray[colorIndex] +"; border: 1px solid #fff; border-radius: 2px;");			
				colorIndex++;				
			} else {
				document.getElementById("label_"+checkboxes[i].id).setAttribute("style", "background-color: none; border: 1px solid rgba(255,255,255,0); border-radius: 2px;");
			}
		}
	}
	//use this when allowing to load w/o selecting from every category
	/*
	if(showColors=="none") 
		$('#missingAttrib').css("visibility", "hidden");
	else 
		$('#missingAttrib').css("visibility", "visible");
	*/		
	if(visibleTrips.length>0){					
		updatePolylines(.5);
	}
}

/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */


 
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

