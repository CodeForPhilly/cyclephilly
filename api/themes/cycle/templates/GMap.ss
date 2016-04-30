<!DOCTYPE html>
<html>
  <head>
    <% base_tag %>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
    <script type="text/javascript" src="http://mbostock.github.com/d3/d3.js?1.29.1"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.1.min.js"></script>
    <script type='text/javascript'
        src='https://cdn.firebase.com/v0/firebase-simple-login.js'>
</script>
    <script type='text/javascript' src='https://cdn.firebase.com/v0/firebase.js'></script>
    <style type="text/css">

html, body, #map {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.stations, .stations svg {
  position: absolute;
}

.stations svg {
  width: 60px;
  height: 20px;
  padding-right: 100px;
  font: 10px sans-serif;
}

.stations circle {
  fill: red;
  stroke: black;
  stroke-width: 1.5px;
}

#about {
z-index: 9000;
position: absolute;
right: 25px;
top: 60px;
background: #eee;
font-family: sans-serif;
width: 315px;
padding: 1em;
opacity: 0.85;
}

.strong{
  font-weight: bold;
}

    </style>
  </head>
  <body>
    <div id="map"></div>
<div id="about">
    
    <a href="//cycle-philly.rhcloud.com"><img alt="CyclePhilly" src="biketrace.png" height="50"></a>
      <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" src="http://platform.twitter.com/widgets/tweet_button.1387492107.html#_=1389102676391&amp;count=horizontal&amp;id=twitter-widget-0&amp;lang=en&amp;original_referer=http%3A%2F%2Flive.phillyopen.org%2Fmap&amp;size=l&amp;text=Live%20map%20of%20SEPTA&amp;url=http%3A%2F%2Flive.phillyopen.org%2Fmap&amp;via=Firebase" class="twitter-share-button twitter-tweet-button twitter-count-horizontal" title="Twitter Tweet Button" data-twttr-rendered="true" style="width: 138px; height: 28px;"></iframe>
      
      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

    <div class="clearfix"></div>
    
    <h4>This Trip was ...</h4><select name="tripDescription" id="tripDescription">
<option value="Extremely Slow/Rough">Extremely Slow/Rough</option>
<option value="A bit slower than Usual">A bit slower than Usual</option>
<option value="Normal Biking">Normal Biking</option>
<option value="Smooth Sailing All the Way">Smooth Sailing All the Way</option>
<option value="Invalid">Invalid Recording</option>

</select>
<h3>Trip Details</h3>
      <p id="tripPurpose">Purpose: </p>
      <p id="tripDate">Date: </p>
      <p id="tripStartTime">Start Time: </p>
      <p id="tripDuration">Duration: </p>
      <p id="averageSpeed">Average Speed: </p>
      <p id="numberOfPoints">Number of Points: </p>
      <p id="weather">Weather: </p>

      <p></p>
<h3>Past Trips</h3>
      <ul id="pastList">

      </ul>
   <a href="api/trip/{$TripId}">Download This Trip Data</a>
    </div>

    <script type="text/javascript">
var tripId = {$TripId};
var totalPoints = 0;
var styles = [
  {
    "featureType": "road.local",
    "stylers": [
      { "visibility": "simplified" }
    ]
  },{
    "featureType": "road.local",
    "stylers": [
      { "color": "#808080" },
      { "lightness": -48 }
    ]
  },{
    "featureType": "landscape.man_made",
    "stylers": [
      { "visibility": "on" },
      { "lightness": -35 }
    ]
  },{
    "featureType": "road.arterial",
    "stylers": [
      { "visibility": "on" },
      { "lightness": -16 }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "invert_lightness": true }
    ]
  },{
    "featureType": "poi.medical",
    "stylers": [
      { "invert_lightness": true }
    ]
  },{
    "featureType": "poi.school",
    "stylers": [
      { "invert_lightness": true }
    ]
  },{
    "featureType": "poi.business",
    "stylers": [
      { "invert_lightness": true }
    ]
  },{
    "featureType": "transit",
    "stylers": [
      { "invert_lightness": true },
      { "lightness": 17 },
      { "weight": 4.6 }
    ]
  },{
    "featureType": "administrative.neighborhood",
    "stylers": [
      { "hue": "#ff3300" },
      { "saturation": 100 }
    ]
  },{
    "featureType": "poi.attraction",
    "stylers": [
      { "hue": "#0066ff" },
      { "lightness": 33 }
    ]
  }
];
var line;
var styledMap = new google.maps.StyledMapType(styles,
    {name: "Cycle Map"});

var chatRef = new Firebase('https://cyclephilly.firebaseio.com');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    //var chatRef = new Firebase('https://cyclephilly.firebaseio.com');
    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
    //chatRef.set('User Logged In: '+user.id);
  } else {
    // user is logged out
  }
});
$(document).ready(function(){

  auth.login('anonymous');


// Create the Google Map…
var map = new google.maps.Map(d3.select("#map").node(), {
  zoom: 17,
  center: new google.maps.LatLng(39.95790955, -75.17570396),
  mapTypeControlOptions: {
    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
  }
});

map.mapTypes.set('map_style', styledMap);
map.setMapTypeId('map_style');
var tripRef = new Firebase('https://cyclephilly.firebaseio.com/trips/'+tripId);

d3.json("api/trip/"+tripId+'/details', function(data) {
  totalPoints = data.TotalPoints;
  $('#tripDuration').append('<span class="strong">'+data.Duration+'</span>');
  $('#tripDate').append('<span class="strong">'+data.Date+'</span>');
  $('#tripPurpose').append('<span class="strong">'+data.Purpose+'</span>');
  $('#tripStartTime').append('<span class="strong">'+data.StartTime+'</span>');
  $('#averageSpeed').append('<span class="strong">'+data.AverageSpeed+'</span>');
  $('#numberOfPoints').append('<span class="strong">'+data.TotalPoints+'</span>');

  $.each(data.UserTrips,function(i,d){
    //$('#pastList').append('<li><a href="map/t/'+d.id+'"><span class="strong">'+d.purpose+'</span></a></li>');
  });
});
// Load the station data. When the data comes back, create an overlay.
d3.json("api/trip/"+tripId, function(data) {
  var path = [];
  //tripRef.set('User Viewing Trip '+tripId);
  
  $('#tripDescription').on('change', function(e){
    tripRef.set('description: '+ $('#tripDescription').val());
  })

   var lineSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: '#222'
  };
  var p;
  $.each(data,function(i,d){
    path.push(new google.maps.LatLng(d.latitude,d.longitude));
    if (i ==3){
      p = d;
    }
  })
  map.setCenter(new google.maps.LatLng(p.latitude,p.longitude));
  line = new google.maps.Polyline({
    path: path,
    strokeColor: 'red',
    strokeOpacity: 0.6,
    strokeWeight: 4,
    icons: [{
      icon: lineSymbol,
      offset: '100%'
    }],
    map: map
  });
  // Bind our overlay to the map…
  //overlay.setMap(map);
  animateBike();
});

})

function animateBike() {
    var count = 0;
    if (totalPoints > 1000) {
      var delayspeed = 50;
    } else{
      var delayspeed = 150;
    };
    window.setInterval(function() {
      count = (count + 1) % 1600;

      var icons = line.get('icons');
      icons[0].offset = (count / 16) + '%';
      line.set('icons', icons);
  }, delayspeed);
}

    </script>
  </body>
</html>
