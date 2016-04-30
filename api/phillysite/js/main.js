

var tripCount; 

$(document).ready(function(){
  var cycleRef = new Firebase('https://cyclephilly.firebaseio.com/trips-started/2015/');
  cycleRef.on('value', function(snapshot) {
  var fireTrips = snapshot.val();;
//console.log(fireTrips);
console.log( _.size(fireTrips) );
console.log( _.keys(fireTrips).length );
var count = 0;

for (var key in fireTrips) {
   var obj = fireTrips[key]; // this gets us inside the first child/subgroup of the object (months for firebase)
   for (var prop in obj) {

    // console.log(prop);

      // important check that this is objects own property 
      // not from prototype prop inherited
      //console.log("keys =" + _.keys(obj[prop]));
      if(obj.hasOwnProperty(prop)){ // this accesses the days
        

        console.log("for this day" + prop + "- size = " + _.size(obj[prop]));
        count = count + _.size(obj[prop]);

      }
      
   }
}

console.log("All trips count = " + count);
 tripCount = count;
 console.log(tripCount);
return tripCount;
  });



  collapsedBar = false;
  document.body.style.backgroundPosition = (-window.pageXOffset / 2) + "px " + (-window.pageYOffset / 2) + "px";
  window.onscroll = function() {
        var speed = 8.0;
        var localtripCount = tripCount;
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
          
         // document.getElementById('span1').innerHTML='some value...';
            
            $('#counter').removeClass('hidden');

            console.log(localtripCount);

    
      ticker = new countUp("ticker", 0, localtripCount, 0, 0, options);
      ticker.start();
      
             //$('#counter').html(localtripCount);



        }else if(window.pageYOffset == 0){ //full size
          collapsedBar = false;
          $('.navbar-brand').css('padding', '15px 15px');
    
       
         $('#logotext').css('display', 'inline'); 
          
            $('#counter').addClass('hidden');

         $('img#navbar-logo').animate({width: "122px"},300,function(){});

        }
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
