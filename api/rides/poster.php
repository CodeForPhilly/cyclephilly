<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Visualizing Cycle Atlanta Data</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.4/leaflet.css" />
        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
        </style>
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="css/print.css">

<!--         <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script> -->
        <script type="text/javascript">	
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-35489732-1']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
	</script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- This code is taken from http://twitter.github.com/bootstrap/examples/hero.html -->

        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">

                    <p class="cycleAtl_title">Visualizing Cycle Atlanta Data.</p>

                </div>
            </div>
        </div>

        <div class="container">
	        <div id="controls"><a href="#" class="tileToggle" onclick="toggleTiles();">Hide</a> streets. <a href="#" class="tileToggle" onclick="loadData();">Load</a> data.</div>
            <div id="mapBody"></div>
            <hr>

            <footer>
                <p>Visualizing <span class="trip_count">n</span> of <span class="trip_total">m</span> trips collected by users of the <a href="http://cycleatlanta.org">Cycle Atlanta apps</a>.</p>
            </footer>

        </div> <!-- /container -->

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.3.min.js"><\/script>')</script>
         <script src="http://cdn.leafletjs.com/leaflet-0.4/leaflet.js"></script>

        <script src="js/vendor/bootstrap.min.js"></script>

        <script src="js/print.js"></script>

        <script type="text/javascript">
	            /*
(function() {
	                Trips.init({
	                    loadNum: 5
	                });
	
	            })();
*/
        </script>
    </body>
</html>
