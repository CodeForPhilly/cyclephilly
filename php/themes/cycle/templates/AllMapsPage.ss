<!DOCTYPE html>
    <head>
        <% base_tag %>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        $MetaTags
        <title>$SiteConfig.Title - Maps</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="{$ThemeDir}/css/weather-icons.min.css">
        <link rel="stylesheet" href="{$ThemeDir}/css/animation.css">
        <link rel="stylesheet" type="text/css" href="{$ThemeDir}/css/L.Control.Sidebar.css">
        <link rel="stylesheet" type="text/css" href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css" />
        <link href='http://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css' rel='stylesheet' />

        
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
        <script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.2.4"></script>
        <script src='http://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.js'></script>
        <script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>

        <script src="{$ThemeDir}/js/v/modernizr-2.6.2-respond-1.1.0.min.js"></script>
        <script type="text/javascript" src="//cdn.firebase.com/js/client/1.0.11/firebase.js"></script>
        <%-- <script type="text/javascript" src="{$ThemeDir}/js/L.Control.Sidebar.js"></script> --%>
  
    <!-- <script src="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.js"></script> --> 

    <%-- <script src="http://cdn.leafletjs.com/leaflet-0.7/leaflet.js"></script> --%>
        <style>
        html, body, #map {
            height: 100%;
            width: 100%;
            padding: 0;
            overflow: hidden;
        }

        body {
            padding-top: 50px;
        }

        #map-ui {
            width: 180px;
        }

        #loading {
            position: fixed;
            z-index: 200;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: rgba(255,255,255,.8);
            overflow: hidden;
        }

        #searchbox {
            -webkit-border-top-left-radius: 4px;
            -webkit-border-bottom-left-radius: 4px;
            -moz-border-top-left-radius: 4px;
            -moz-border-bottom-left-radius: 4px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }

        .search-container {
            width: 400px;
        }

        @media (max-width: 992px) {
            .search-container {
                width: 300px;
            }
        }

        @media (max-width: 765px) {
            .search-container {
                width: 100%;
            }
        }
        
        .Commute { background-color:#256baf; }
        .School { background-color:#dfdeb6; }
        .Exercise { background-color:#16ac69; }
        .Social { background-color:#ccd93e; }
        .Other { background-color:#698ea2; }
        .Work-Related { background-color:#0a5983; }
        .Errand { background-color:#99cccc; }
        .Shopping { background-color:#2487bc; }

        </style>
    </head>
   <!-- Only copy over the body to the live site -->


<body style="padding-top:0px;">
    <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
    

    <!-- loading animation -->
    <div id="loading">
        <div class="bubblingG">
            <span id="bubblingG_1"></span>
            <span id="bubblingG_2"></span>
            <span id="bubblingG_3"></span>
        </div>
    </div>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">No results found</h4>
                </div>
                <div id="myModalBody" class="modal-body">
                    No results found for address search.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <% include FlatNavigation %>
    <% include MapsNavigation %>
    </div>
    </div>

    <div id="sidebar">
        <h2>Layers</h2>
        <div id="sidebar-content"></div>
    </div>
    <div id='map' style="top:0px;" class="container"></div>

<!-- end copying to live site -->
    <%-- <div class="animated pulse infinite pad-5" id="status"><span class="marg-loading" id ="loading">loading tracks</span><img class="no-scale marg-logo" src="{$ThemeDir}/img/logo112w.png"/></div>
 --%>
</body>
</html>
