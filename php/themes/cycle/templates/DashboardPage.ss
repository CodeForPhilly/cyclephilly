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


    <!-- Section #3 -->
   

   
  <!-- Section Shirts -->
  


<!-- FOOTER --> 


  <section class="pad-5" id="foot" data-speed="2" data-type="background">
        <div class="container">
            <div class="row-fluid">
                <div class="span4">
 <!-- Begin terms and contact -->
                    <div align="center">

<a href="#terms">Terms and Privacy</a> | <a href="mailto:support@cyclephilly.org">Contact Us</a> | Powered by <a href="http://melle.io">-melle.io-</a> | <a href="https://plus.google.com/102535786071048979146" rel="publisher">Google+</a></div>
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
    <script src="{$ThemeDir}/js/underscore.js"></script>
    <script src="{$ThemeDir}/js/countUp.min.js"></script>
    <script src="{$ThemeDir}/js/main.js"></script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-45952613-1', 'cyclephilly.org');
      ga('send', 'pageview');

    </script>
    </body>
</html>
