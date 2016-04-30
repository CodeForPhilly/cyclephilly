<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>CyclePhilly: Interactive map</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <link rel="stylesheet" href="http://mytracks.phillyopen.org/css/bootstrap.min.css">
    <!-- <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.css" /> -->
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7/leaflet.css" />

    <link rel="stylesheet" href="http://mytracks.phillyopen.org/css/bootstrap-responsive.min.css">
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/themes/base/jquery-ui.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="chosen/chosen.css">



    <!-- Main site js css -->

    <link rel="stylesheet" href="./css/style.css" />


    <script src="js/picturefill.js"></script>
    <script src="js/matchmedia.js"></script>

    <link rel="stylesheet" href="./css/style.css" />
    <link rel="stylesheet" href="./css/animate.min.css">
    <!-- adding animation css -->


    <!-- Normalize hide address bar for iOS and Android -->
    <script src="./js/hideaddressbar.js"></script>


</head>

<style>

/* The CSS */

.datalist {
  list-style: none;
  display: none;
  background: white;
  box-shadow: 0 2px 2px #999;
  position: absolute;
  left: 0;
  top: 0;
  max-height: 300px;
  overflow-y: auto;
}
.datalist:empty {
  display: none !important;
}
.datalist li {
  padding: 3px;
  font: 13px "Lucida Grande", Sans-Serif;
}
.datalist li.active {
  background: #3875d7;
  color: white;
}

.select {

  -webkit-appearance: none;
  font-family: arial, Sans-Serif;
  font-size: 20px;
  appearance: none;
  width: 100px;
}

</style>




<body>

     <script> 
  
  // if ( (screen.width < 1024) && (screen.height < 768) ) { 
window.location = 'index.php'; // redirecting to main index.php page
// } 

</script>
    <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->



    <body lang="en">



        <div id="branding">
            <a href="http://www.cyclephilly.org">
                <div id="logo">
                    <img class="img-responsive" src="img/logo.png" />
                </div>
                <div id="cyclephilly">CyclePhilly</div><span id="ride">Ride. Record. Reimagine Your Routes.</span>
            </a>
        </div>


        <div id="container-nav" class="wrapper">

            <!-- <div><a href="#" ><div id="logo"><img class="img-responsive" src="img/logo.png"/></div><div id="cyclephilly">CyclePhilly</div><span id="ride">Ride. Record. Reimagine Your Routes.</span></a></div> -->

            <!--Add opening <section> tag below here-->

            <section id="nav">


                <!-- Checkbox Hack markup -->
                <!--  <input type="checkbox" id="toggle" />
        <label for="toggle" onclick>Menu</label> -->
                <!-- /Checkbox Hack markup -->

                <nav>


                </nav>
                <div class="animated pulse infinite pad-5" id="status"><span class="marg-loading" id="loading">loading tracks</span>
                    <img class="no-scale marg-logo" src="img/logo112w.png" />
                </div>
                <!-- pulsing animation logo courtesy of https://github.com/daneden/animate.css -->


            </section>

   

  <section class="float-left" id="selector">
<!-- <p id="chunk1" class="pad-5 marg-top-5">Want to see the tracks your fellow cyclists are carving throughout the City? </br></br> Just select one or multiple trip purposes (hold ctrl+click on a pc or command+click on a mac) and then select 'Make Tracks.'</p> -->

<p id="chunk1" class="pad-5 marg-top-5">Want to see the tracks your fellow cyclists are carving throughout the City? </br></br> Just select a trip type and 'Make Tracks.'</p>

 <div class="clear-fix">
       
        <form id="ca_data_selector" action="#" class="float-left pad-5">

 <!-- <p><input type="text" id="search" list="ca_data_selector_field" placeholder="Select trip purpose"></p> -->
              <select id="ca_data_selector_field">
              <!-- <datalist id="Ride Purpose:"> -->
              <option value="Commute">Commute</option>
              <option value="School">School</option>
              <option value="Work-Related">Work Related</option>
              <option value="Exercise">Exercise</option>
              <option value="Social">Social</option>
              <option value="Shopping">Shopping</option>
              <option value="Errand">Errand</option>
              <option value="Other">Other</option>
              </select>
           <input type="submit" value="&rsaquo; Make Tracks" class="float-left pad-5 marg-top-5" id="scroll"/>
        
        
          
           
        
        </form>

      </div>



    </div>


</section>


            <div id="map"></div>



            <!-- </div> -->
            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
            <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
            <script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.2.1"></script>
            <!-- <script src="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.js"></script> -->

            <script src="http://cdn.leafletjs.com/leaflet-0.7/leaflet.js"></script>

            <!-- <script src="js/main.js"></script> -->
            <!-- <script src="js/main_datalist_test.js"></script> -->
            <script src="js/main_datalist_test2.js"></script>


            <script src="js/jquery-1.8.2.min.js"></script>
            <script src="js/modernizr.custom.95508.js"></script>
            <script>
                // Safari reports success of list attribute, so doing detection instead
                yepnope({
                    test: (!Modernizr.input.list || (parseInt($.browser.version) > 400)),
                    yep: [
                        'js/jquery.relevant-dropdown.js',
                        'js/load-fallbacks.js'
                    ]
                });
            </script>


    </body>

</html>
