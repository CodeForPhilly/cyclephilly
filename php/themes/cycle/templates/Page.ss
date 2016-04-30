<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <% base_tag %>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="{$ThemeDir}/css/bootstrap.min.css">
        <style>
            body {
                padding-top: 50px;
                padding-bottom: 20px;
            }
        </style>
        <link rel="stylesheet" href="{$ThemeDir}/css/bootstrap-theme.css">
        <link rel="stylesheet" href="{$ThemeDir}/css/weather-icons.min.css">
        <link rel="stylesheet" href="{$ThemeDir}/css/main.css">

        <link rel="stylesheet" href="{$ThemeDir}/css/masterslider/masterslider.css">
        <link rel="stylesheet" href="{$ThemeDir}/css/masterslider/skins/black-1/style.css">


        <script src="{$ThemeDir}/js/v/modernizr-2.6.2-respond-1.1.0.min.js"></script>
        <script type="text/javascript" src="//cdn.firebase.com/js/client/1.0.11/firebase.js"></script>
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    </head>
   <!-- Only copy over the body to the live site -->


<body>
    <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
    <% include Navigation %>

    <!-- Section #1 -->
    <section id="intro" data-speed="6" data-type="background">
        
        <div class="container">
            <header id="masthead" class="wrapper">
                <div class="container" id="center_top">
                    <h1 class="text-center" id="chunk">CyclePhilly</h1>
                    <p class="text-center">CyclePhilly is a smartphone app for recording your bicycle trips. Data from the app can be used by regional transportation planners in the Philadelphia area to make Philly a better place to ride.</p>

                    <p class="text-center">
                        <a href="android"><img class="no-scale" src="{$ThemeDir}/img/play.png" /></a>
                        <a href="https://itunes.apple.com/us/app/cyclephilly/id850035510?ls=1&mt=8">
                        <img class="no-scale" src="{$ThemeDir}/img/appstore.png" />
                        </a>
                    </p> 
                    
                       <p class="text-center">
                           <a href="http://awards.codeforamerica.org/2015/winner/CyclePhilly/"><img class="percent-50" src="{$ThemeDir}/img/logo-tech-awards-gray.png" /></a
                     </p>
                   </div>
                <%-- Twitter start  --%>
                <div class="container" style="max-height: 70px;">
                    <div class="row">
                        <div class="span4">
                        <a href="http://www.twitter.com/cyclephilly">
                            <img class="no-scale float-right" src="{$ThemeDir}/img/Twitter_logo_white_sml.png" />
                        </a>
                        </div>
                    </div>
                </div>
                <%-- Twitter end --%>
            </header>
        </div>
    </section>

        <!-- Section #3 -->
    <section class="pad-10" id="about" data-speed="4" data-type="background">
        <% with Page("about") %>
        <div class="container">
            <div class="page-header">
                <h1>$Title</h1>
            </div>
            <div class="row-fluid">
                <div class="span4">
                $Content
                </div><!-- /.span4 -->
            </div>
        </div>
        <% end_with %>
    </section>

    <section class="pad-10" id="imap" data-speed="2" data-type="background">
    <% with Page("maps") %>
           <div class="container">
            <div class="page-header">
                <h1>$Title</h1>
            </div>
            <div class="row-fluid">
                <div class="span4">
                $Content
                </div><!-- /.span4 -->
            </div>
        </div>
        <% end_with %>   
    </section>

    <!-- Section Shirts -->
    <section class="pad-10 home-section" id="shirts" data-speed="1" data-type="background">
        <% with Page("shirts") %>
        <div class="container">
            <div class="page-header">
                <h1>$Title</h1>
            </div>
            <div class="row-fluid" style="background: rgba(0, 0, 0, 0.72);padding: 5px 10px;">
                <div class="span4">
                $Content
                </div><!-- /.span4 -->
            </div>
        </div>
    <% end_with %>
    </section>

<!-- FOOTER --> 
    <section id="foot" data-speed="1" data-type="background">
        <div class="container">
            <div class="row-fluid">
                <div class="span4">
                    <h2>Partners</h2>
                    <div class="clearfix">
                        <a href="http://codeforphilly.org/" ><img class="float-left no-scale marg-1"  src="{$ThemeDir}/img/codeforphilly1.png" /></a>
                        <a href="http://www.dvrpc.org/"><img class="float-left no-scale marg-1" src="{$ThemeDir}/img/dvrpc1.png" /></a>
                        <a href="http://www.septa.org/sustain/"><img class="float-left no-scale marg-1" src="{$ThemeDir}/img/septa.png" /></a>
                        <a href="http://www.phila.gov/Pages/default.aspx"><img class="float-left no-scale marg-1" src="{$ThemeDir}/img/cityphilly1.png" /></a>
                        <a href="http://www.bicyclecoalition.org/"><img class="float-left no-scale marg-1" src="{$ThemeDir}/img/bikecoalition.png" /></a>
                    </div>
                </div><!-- /.span4 -->
             </div>
        </div>
    </section>

  <section class="pad-5" id="foot" data-speed="2" data-type="background">
        <div class="container">
            <div class="row-fluid">
                <div class="span4">
 <!-- Begin terms and contact -->
                    <div align="center">

<a href="#terms">Terms and Privacy</a> | <a href="mailto:support@cyclephilly.org">Contact Us</a> | Powered by <a href="http://melle.io">-melle.io-</a> | <a href="https://plus.google.com/102535786071048979146" rel="publisher">+CyclePhilly</a></div>
                     $Form
<!-- lightbox container hidden with CSS -->
<% include TermsAndConditions %>
<!-- End terms and contact --> 
                    </div><!-- /.span4 -->
                </div>
        </div>
  </section>

<%-- <div id="footer">
      <div class="container">

      </div>
    </div> --%>


<%-- <div class="navbar navbar-default navbar-fixed-bottom">
    <div class ="container">
            <p class="navbar-text text-center">      </p>
            <p class="navbar-btn btn-success btn pull-right">Counts</p>
    </div>

</div> --%>
<!-- end copying to live site -->
<% include Counter %>
 <% include HomeStats %>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script src="{$ThemeDir}/js/jquery.leddisplay.js"></script>
    <script src="{$ThemeDir}/js/v/bootstrap.min.js"></script>
    <script src="{$ThemeDir}/js/countUp.min.js"></script>
    <script src="{$ThemeDir}/js/jquery.backstretch.min.js"></script>
    <script src="{$ThemeDir}/js/main.js"></script>
    <script src="{$ThemeDir}/js/underscore.js"></script>

    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-45952613-1', 'cyclephilly.org');
    ga('send', 'pageview');
    </script>
</body>
</html>
