<!DOCTYPE html>
  <head>
        <title>$SiteConfig.Title - Timelapse Maps</title>
        
        <meta property="og:title" content="CyclePhilly Timelapse Map">
        <meta property="og:type" content="website">
        <meta property="og:description" content="The timelapse map displays an animation of riders over a 24 hour period in May of 2014. ">
        <meta property="og:url" content="http://www.cyclephilly.org/maps/timelapse/">
        <meta property="og:image" content="http://www.cyclephilly.org/assets/Uploads/_resampled/SetWidth400-Screen-Shot-2014-12-12-at-7.52.13-AM.png?r=5796">
        
        <link rel="stylesheet" href="/{$ThemeDir}/css/leaflet.css">
        <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="/{$ThemeDir}/css/weather-icons.min.css">
        
        
      <script type="text/javascript" src="//cdn.firebase.com/js/client/1.0.11/firebase.js"></script>
      <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
      <script type="text/javascript" src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
      <script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
      <script type="text/javascript" src="/torque/js/leaflet.js"></script>
      <script type="text/javascript" src="/torque/js/underscore.js"></script>
      <script type="text/javascript" src="/torque/js/carto.js"></script>
      <script type="text/javascript" src="/torque/js/torque.js"></script>
<style>
#map, html, body {
        width: 100%; height: 100%; padding: 0; margin: 0;
      }
#torque-time {
        position: absolute;
        top:80px;
        left: 5%;
        color: white;
        font-size: 24px;
        font-family: Georgia, serif;
        background-color: black;
      }
      </style>
  </head>
  <body style="padding-top:0px;">
      <% include FlatNavigation %>
      <div id="map"></div>
      <div id="torque-time">Loading...Check it out in action at <a href="http://y2u.be/BKIbM0Ehcxs" target="_BLANK" alt="CyclePhilly Timelapse Video">http://y2u.be/BKIbM0Ehcxs</a></div>
      <script type="text/javascript" src="/torque/js/tl.js"></script>
      <script type="text/javascript" src="/{$ThemeDir}/js/weather_widget.js"></script>
  </body>
  </html>