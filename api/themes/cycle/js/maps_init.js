 var qryAddrUrl = "http://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=1&countrycodes=US&json_callback=gotAddress"

var myMarker, markerCol;
var geoAllowed = true;
var ui = document.getElementById('sidebar-content');

var map = L.map('map', {
  tileLayer: {
        detectRetina: true
    }
}).setView([39.952451,-75.163664], 12);

L.control.layers.autoZIndex = true;

addLayer(L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', { attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.' }), null, 'Base Map', 1, null);
  
addLayer(L.tileLayer('http://banderkat.com:8888/v2/bike-circuit/{z}/{x}/{y}.png', 
    {attribution:'Data from DVRPC'}), null, 'The Circuit', 3, null);

addCyclePhillyLayer('Commute');
addCyclePhillyLayer('School');
addCyclePhillyLayer('Exercise');
addCyclePhillyLayer('Social');
addCyclePhillyLayer('Other');
addCyclePhillyLayer('Work-Related');
addCyclePhillyLayer('Errand');
addCyclePhillyLayer('Shopping');

function addCyclePhillyLayer(purpose) {
    addLayer(L.tileLayer('http://54.165.29.118/tiles/' + purpose + 
        '/{z}/{x}/{y}.png', 
        {attribution:'CyclePhilly'}), 
        null,
        //L.mapbox.gridLayer('http://54.165.29.118/tiles/' + purpose + '.json'),
        purpose, null);
}

function addLayer(layer, infoLayer, name, zIndex, color) {
    var gridControl = null;
    layer.addTo(map);
    if (zIndex == 1) {
        layer.bringToBack(); // keep base layer at bottom
    }
        
    if (infoLayer) {
      infoLayer
        .addTo(map);
        gridControl = L.mapbox.gridControl(infoLayer, {follow: true}).addTo(map);
    }

    // Create a simple layer switcher that toggles layers on
    // and off.
    var item = document.createElement('li');
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active pull-right nav-justified';
    link.innerHTML = '<span class="badge pull-left approved ' + name + 
        '"><span class="glyphicon glyphicon-ok"></span></span><span class="pull-right">' + 
        name + '</span>';

    item.setAttribute('role', 'presentation');
    item.className = 'nav-justified';
    link.setAttribute('role', 'menuitem');
    link.tabindex = '-1';

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            if (infoLayer) {
              map.removeLayer(infoLayer);
              gridControl.hide(); // hide any tooltip currently showing
              map.removeControl(gridControl);
            }
            this.className = 'pull-right layeritem nav-justified';
            this.innerHTML = '<span class="pull-right">' + name + '</span>';
        } else {
            map.addLayer(layer);
            if (infoLayer) {
              map.addLayer(infoLayer);
              map.addControl(gridControl);
            }
            this.className = 'active pull-right layeritem nav-justified';
            this.innerHTML = '<span class="badge pull-left approved ' + name + 
                '"><span class="glyphicon glyphicon-ok"></span></span><span class="pull-right">' + 
                name + '</span>';
            
        }
    };

    item.appendChild(link);
    ui.appendChild(item);
}

var markerGroup = new L.featureGroup();

$('form').submit(function () {
    return false;
});

function selectLoc(locID) {
    var locStr = 'loc' + locID.toString();
    var thisMarker = markerCol[locStr];
    thisMarker.openPopup();
    sidebar.hide();
    map.setView(thisMarker.getLatLng(), 14, { animate: true });
}

var amQryAddr = false;
function searchAddress(searchStr) {
    if (amQryAddr) return;
    amQryAddr = true;
    var gotTxt = $('#enteredAddr').val();
    // disable button while searching
    $('#searchAddr').prop('disabled', true);
    $.ajax({
        url: qryAddrUrl, data: { 'q': gotTxt }, dataType: 'jsonp',
        error: function (xhr, status, error) {
            //console.log(error);
            //console.log(xhr.statusText);
            //console.log(xhr.responseText);
            amQryAddr = false;
        }
    });
}

$("#enteredAddr").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        // search on 'Enter' keypress
        if (!amQryAddr) searchAddress();
    }
});

function gotAddress(response) {
    amQryAddr = false;

    if (response.length < 1) {
        // tell user no results found and re-enable button
        $('#myModal').modal();
        $('#searchAddr').prop('disabled', false);
        return;
    }

    //console.log(response);
    var useAddr = response[0];
    //console.log(useAddr.display_name);

    //console.log(useAddr.lat + " " + useAddr.lon + " " + useAddr.display_name);
    var myLatLng = L.latLng(useAddr.lat, useAddr.lon);
    // re-enable button
    $('#searchAddr').prop('disabled', false);

    if (myMarker) {
        //myMarker.setLatLng(myLatLng).setZIndexOffset(999).setPopupContent('<p>' + useAddr.lat + ", " + useAddr.lon + '</p>').update().openPopup();
        myMarker.setLatLng(myLatLng).setZIndexOffset(999).setPopupContent('<p>' + useAddr.display_name + '</p>').update().openPopup();
    } else {
        //myMarker = L.marker(myLatLng).bindPopup('<p>' + useAddr.lat + ", " + useAddr.lon + '</p>').setZIndexOffset(999).addTo(map).openPopup();
        myMarker = L.marker(myLatLng).bindPopup('<p>' + useAddr.display_name + '</p>').setZIndexOffset(999).addTo(map).openPopup();
    }

    queryForLatLng(useAddr.lat, useAddr.lon);
}

function queryForLatLng(lat, lng) {
    map.setView([lat, lng], 14, { animate: true });
    $('#loading').hide();
}

$(document).ready(function(){
    // add sidebar
    sidebar = L.control.sidebar('sidebar', {
        position: 'right'
    });
    map.addControl(sidebar);
});
// try HTML5 geolocation
$(document).ready(function () {
    map.locate({ setView: true, maxZoom: 14, timeout: 5000 });
    markerGroup.addTo(map);
});

function onLocationFound(e) {
    //console.log('got position.');
    geoAllowed = true;
    if (myMarker) {
        myMarker.setLatLng(e.latlng).setZIndexOffset(99).setPopupContent('<p>' + ev.latlng + '</p>').update();
    } else {
        myMarker = L.marker(e.latlng).bindPopup('<p>' + e.latlng + '</p>').setZIndexOffset(99).addTo(map);
    }

    queryForLatLng(e.latlng.lat, e.latlng.lng);
}

map.on('locationfound', onLocationFound);   

function onLocationError(e) {
    //console.log(e.message);
    geoAllowed = false;
    $('#loading').hide();

}

map.on('locationerror', onLocationError);

map.on('contextmenu', function (ev) {
    if (myMarker) {
        myMarker.setLatLng(ev.latlng).setZIndexOffset(999).setPopupContent('<p>' + ev.latlng + '</p>').update(); //.openPopup();
    } else {
        myMarker = L.marker(ev.latlng).bindPopup('<p>' + ev.latlng + '</p>').setZIndexOffset(999).addTo(map); //.openPopup();
    }
    queryForLatLng(ev.latlng.lat, ev.latlng.lng);
});

$(document).ajaxStart(function () {
    $('#loading').show();
}).ajaxStop(function () {
    $('#loading').hide();
});