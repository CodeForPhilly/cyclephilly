  <!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
 <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Cycle Philly: Interactive map</title>
        <meta name="description" content="">
<meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="stylesheet" href="http://mytracks.phillyopen.org/css/bootstrap.min.css">
<!-- <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.css" /> -->
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7/leaflet.css" />

        <link rel="stylesheet" href="http://mytracks.phillyopen.org/css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/themes/base/jquery-ui.css" type="text/css" media="all" />
        <link rel="stylesheet" href="css/main.css">
</head>
<body>

     <script> 
  
  // if ( (screen.width < 1024) && (screen.height < 768) ) { 
window.location = 'index.php'; // redirecting to main index.php page
// } 

</script>
<!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

<div class="section group cyclePHL_title">
  <div class="col span_5_of_5">
    
      <div id="cycleTitleText"><a href="http://www.cyclephilly.org">Cycle Philly</a>  <span class="smallTitle"><em>Ride. Record. Reimagine your Routes.</em></span></div>
    
  </div>
</div>
<div class="section group chosenBox">

  <div class="col span_5_of_5">
    <div class="section group">
      <div class="col span_1_of_5">
        <div id="filterText">Filter Rides:</div>
      </div>
      <div class="col span_2_of_5">
        <form id="ca_data_selector" action="#">
          <div style="padding: 3px;">
            <select id="ca_data_selector_field" list="purposes" multiple="true" style="width:150px;">
              <datalist id="Ride Purpose:">
              <option value="Commute">Commute</option>
              <option value="School">School</option>
              <option value="Work-Related">Work Related</option>
              <option value="Exercise">Exercise</option>
              <option value="Social">Social</option>
              <option value="Shopping">Shopping</option>
              <option value="Errand">Errand</option>
              <option value="Other">Other</option>
              </datalist>
              
             <!-- <optgroup label="Rider Type:">
              <option value="Strong & fearless">Strong &amp; Fearless</option>
              <option value="Enthused & confident">Enthused &amp; Confident</option>
              <option value="Comfortable, but cautious">Comfortable but Cautious</option>
              <option value="Interested, but concerned">No Way, No How</option>
              </optgroup> -->
            </select>
           <input type="submit" value="Update" style="position: relative;"/>
        
          </div>
          
           
        
        </form>

      </div>
      <div class="col span_1_of_5"></div>
          
    </div>
  </div>
</div>
<!-- <div class="section group"> -->
<!--  <div class="col span_5_of_5">-->
<div id="map"></div>
<!-- </div> -->
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
<script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.2.1"></script>
<!-- <script src="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.js"></script> --> 

<script src="http://cdn.leafletjs.com/leaflet-0.7/leaflet.js"></script>

<script src="js/main_datalist.js"></script>


</body>
</html>
