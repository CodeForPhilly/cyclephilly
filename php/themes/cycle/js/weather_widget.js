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
        weatherString += 'cloudy';
      }
      $('#weatherIcon').removeClass();
      $('#weatherIcon').addClass('wi');
      $('#weatherIcon').addClass(weatherString);
  });
  
});