$(function(){
  collapsedBar = true;
    //collapse bar
    $('.navbar-nav').css('padding-top','0');
    $('.navbar-brand').css('padding', '0');
   
    $('#logotext').css('display', 'none'); 
    $('img#navbar-logo').animate({width: "35px","padding-top":"5px"},100,function(){});
    // show weather
    $('#liveWeather').show();
   // document.getElementById('span1').innerHTML='some value...';
      
      $('#counter').removeClass('hidden');
var map = new L.Map('map', {
          zoomControl: true,
          center: [39.980451,-75.263664],
          zoom: 12
        });

        L.tileLayer('https://{s}.tiles.mapbox.com/v3/afroza.ia3666gg/{z}/{x}/{y}.png', {
          attribution: 'MapBox'
        }).addTo(map);
        
        var CARTOCSS = [
          'Map {',
              '-torque-aggregation-function: "count(recorded)";',
              '-torque-frame-count: 4056;',
              '-torque-animation-duration: 90;',
              '-torque-resolution: 1',
              '}',
          '#layer {',
            '  marker-width: 2; ',
            '  marker-fill: #023858; ',
            '  [value > 2] { marker-fill: #a6bddb; }',
            '  [value > 3] { marker-fill: #74a9cf; }',
            '  [value > 4] { marker-fill: #3690c0; }',
            '  [value > 5] { marker-fill: #0570b0; }',
            '  [value > 6] { marker-fill: #045a8d; }',
            '  [value > 7] { marker-fill: #023858; }',
           '',
          '}',
          '',
          '#layer [frame-offset = 1] {  ',
            '  marker-fill: #023858; ',
            '  marker-width: 4;',
            '  marker-fill-opacity: 0.08;',
          '}',
          '',
            '#layer [frame-offset = 2] { ',
            '  marker-fill: #023858; ',
            '  marker-width: 6;',
            '  marker-fill-opacity: 0.06;',
          '}',
          '',
            '#layer [frame-offset = 3] { ',
            '  marker-fill: #045a8d; ',
            '  marker-width: 8;',
            '  marker-fill-opacity: 0.04;',
          '}',
          '',
            '#layer [frame-offset = 4] { ',
            '  marker-fill: #045a8d; ',
            '  marker-width: 10;',
            '  marker-fill-opacity: 0.02;',
          '}',
          '',
            '#layer [frame-offset = 5] { ',
            '  marker-fill: #0570b0; ',
            '  marker-width: 12;',
            '  marker-fill-opacity: 0.01;',
          '}'
        ].join('\n');

         var torqueLayer = new L.TorqueLayer({
          provider: 'sql_api',
          url: 'http://54.165.29.118/api/v2/sql',
          tiler_domain: '54.165.29.118',
          tiler_port: '',
          table: 'coord_geom_may',
          column: 'recorded',
          cartocss: CARTOCSS,
          blendmode  : 'lighter'
        });

        // each time time changes, tick counter
        torqueLayer.on('change:time', function(changes) {
          var new_time = changes.time.toString();
          if (new_time === 'Invalid Date') return;
          $('#torque-time').text(new_time);
        });

        torqueLayer.addTo(map);
        torqueLayer.play();
});
