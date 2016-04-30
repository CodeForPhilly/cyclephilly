

var tripCount; 
var fireTrips;
var todayCount;
var totalCount;
var dataTable;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 
google.load("visualization", "1.1", {packages:["calendar"]});
(function ($) {
  $.each(['show', 'hide'], function (i, ev) {
    var el = $.fn[ev];
    $.fn[ev] = function () {
      this.trigger(ev);
      return el.apply(this, arguments);
    };
  });
})(jQuery);

//Weather Function
$(document).ready(function(){
  
  var weatherRef = new Firebase('https://publicdata-weather.firebaseio.com/philadelphia/currently');
  var hourlyWeatherRef = new Firebase('https://publicdata-weather.firebaseio.com/philadelphia/hourly');
  hourlyWeatherRef.child('summary').on('value', function(snapshot) {
      //console.log('Temperature is currently ' + snapshot.val());
      $('#weatherDescription').html(snapshot.val());
  });
  weatherRef.child('temperature').on('value', function(snapshot) {
      // console.log('Temperature is currently ' + snapshot.val());
      $('#currentTemp').html(snapshot.val());
  });
  weatherRef.child('icon').on('value', function(snapshot) {
      // Parse icon
      var str = snapshot.val();
      var res = str.split("-");
      console.log(res);
      var r = str.indexOf("rain");
      var d = res[1];
      var c = str.indexOf("cloudy");
      var weatherString = 'wi-';
      if(d == "day"){
        //day
        weatherString += 'day-';
      }else{
        weatherString += 'night-';
      }
      if(r > 0 || res == "rain"){
        //day
        weatherString += 'rain';
      }else if(res[0] =="clear"){
        if(d == "day"){
          //day
          weatherString += 'sunny';
        }else{
          weatherString += 'clear';
        }
      }
      else if(res[0] =="cloudy"){
        weatherString = 'wi-cloudy';
      }
      $('#weatherIcon').removeClass();
      $('#weatherIcon').addClass('wi');
      $('#weatherIcon').addClass(weatherString);

    if ( $.isFunction($.fn.backstretch) ) {
    // $(".slider-wrapper").backstretch(["../images/slider/slide-wrapper.jpg"]);
    if (window.devicePixelRatio >= 2) {
      $("section.blur,.slug .overlay").backstretch(["../images/design/video-section-bg-retina.jpg"]);
      $(".slug .overlay,section.fixed .overlay").backstretch(["../images/design/video-section-bg-opac-retina.png"]);
    } else {
      $("section.blur,.slug .overlay").backstretch(["../images/design/video-section-bg.jpg"]);
      $(".slug .overlay,section.fixed .overlay").backstretch(["../images/design/video-section-bg-opac.png"]);
    }
  }
  });

  // google.load("visualization", "1.1", {packages:["calendar"]});
  // var statsRef = new Firebase('https://cyclephilly.firebaseio.com/stats/');
  // statsRef.child('users').on('value', function(snapshot) {
  //     var users = snapshot.val();
  //     $('#totalRiders').html(users.count);
  // });

  var cycleRef = new Firebase('https://cyclephilly.firebaseio.com/trips-started/2015/');
google.setOnLoadCallback(function (){
  cycleRef.on('value', function(snapshot) {
    // var snd = new Audio("/bell.wav"); // buffers automatically when created
    // snd.play();
    var calObj = [];
    var fireTrips = snapshot.val();
    //console.log(fireTrips);
    totalCount = 0;
    todayCount = 0;
    prevDay = 0;
    for (var month in fireTrips) {
      var obj = fireTrips[month]; // this gets us inside the first child/subgroup of the object (months for firebase)
      console.log("months =" + month);
      var dayCount = 0;
      for (var day in obj) {
        // important check that this is objects own Property 
        // not from prototype day inherited
        //console.log("months =" + _.months(obj[day]));
        if(obj.hasOwnProperty(day)){ // this accesses the days
          //console.log("for this day" + day + "- size = " + _.size(obj[day]));
          dayCount = _.size(obj[day]);
          var dayObj = [new Date(2015, month-1,day), dayCount];
          calObj.push(dayObj);
          totalCount = totalCount + dayCount;
          if (day == dd) {
            todayCount = dayCount;
          };
        }
      } // end loop through data for day. prepare calendar object
      
       //console.log( _.size(t) );
    }
    
    console.log("today: " + todayCount);
    // Create Calendar!
    
    
    //Format datatable for viz
    dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Total Trips' });
    dataTable.addRows(calObj);
    
    
    $('#tickerTotal').html(totalCount);
    $('#tickerToday').html(todayCount);
    
    //Check if stats is visible. if so, draw viz
    if($('#stats').is(':hidden')){
      //Stats not visible. so add visibility to click of button
      console.log('hidden')
      $('#statsBtn').on('click',function(){
        setTimeout(function(){
          var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));
        var options = {
          title: "2015 CyclePhilly Trips",
          height: 150,
          calendar: { cellSize: 13 },
          noDataPattern: {
           backgroundColor: '#F1E5D6',
           color: '#DAB17D'
          }
        };
        chart.draw(dataTable, options);
      },1000)
        
      });
    }else{
      
      var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));
      var options = {
        title: "2015 CyclePhilly Trips",
        height: 150,
        calendar: { cellSize: 13 },
        noDataPattern: {
         backgroundColor: '#F1E5D6',
         color: '#DAB17D'
        }
      };
      chart.draw(dataTable, options);
      google.visualization.events.addListener(chart, 'select', function(e){
        console.log(chart.getSelection());
      });
    }

    //Viz events 
    

  }); //cycleref
});//google

  

  collapsedBar = false;
  collapseBar();
  document.body.style.backgroundPosition = (-window.pageXOffset / 2) + "px " + (-window.pageYOffset / 2) + "px";
  window.onscroll = function() {
        var speed = 8.0;
        collapseBar();
        document.body.style.backgroundPosition = (-window.pageXOffset / speed) + "px " + (-window.pageYOffset / speed) + "px";
    }
   /*// cache the window object
   $window = $(window);
 
   $('section[data-type="background"]').each(function(){
     // declare the variable to affect the defined data-type
     var $scroll = $(this);
                     
      $(window).scroll(function() {
        // HTML5 proves useful for helping with creating JS functions!
        // also, negative value because we're scrolling upwards                             
        var yPos = -($window.scrollTop() / $scroll.data('speed')); 
         
        // background position
        var coords = '50% '+ yPos + 'px';
 
        // move the background
        $scroll.css({ backgroundPosition: coords });    
      }); // end window scroll
   });  // end section function*/
}); // close out script

function collapseBar(){
  var speed = 8.0;
        var today = todayCount;
        var total = totalCount;
        var options = {
                  useEasing : true, 
                  useGrouping : true, 
                  separator : ',', 
                  decimal : '.' 
        };

        var ticker;
  if(window.pageYOffset > 35 && !collapsedBar){  // collapsed size
    collapsedBar = true;
    //collapse bar
    $('.navbar-nav').css('padding-top','0');
    $('.navbar-brand').css('padding', '0');
   
    $('#logotext').css('display', 'none'); 
    $('img#navbar-logo').animate({width: "35px","padding-top":"5px"},300,function(){});
    // show weather
    $('#liveWeather').show();
   // document.getElementById('span1').innerHTML='some value...';
      
      $('#counter').removeClass('hidden');

      ticker_total = new countUp("tickerTotal", 0, total, 0, 0, options);
      ticker_total.start();

      // ticker_today = new countUp("tickerToday", 0, today, 0, 0, options);
      // ticker_today.start();



  }else if(window.pageYOffset == 0){ //full size
    collapsedBar = false;
    $('.navbar-brand').css('padding', '15px 15px');
    // hide weather
    $('#liveWeather').hide();
 
   $('#logotext').css('display', 'inline'); 
    
      $('#counter').addClass('hidden');

   $('img#navbar-logo').animate({width: "122px"},300,function(){});

  }
}