// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 3
      });
  $.ajax({
        method: 'GET',
        url: weekly_quakes_endpoint,
        success: function(json) {
          // console.log(`sent back ${json.metadata.count}`);
          findFeature(json)
          // console.log(json.features[0].properties.title)
          // $("#info").html(json.metadata.count);
        },
        error: function() {
          alert('There was an error getting weather data.');
        }
        // beforeSend: function () {
        //   $('#page').append('Loading');
        // },
        // complete: function () {
        //   $('#loading').remove();
        // }
  });
  var findFeature = function (json) {
      console.log(json.metadata.count);
    $(json.features).each(function (index, feature) {
      var titles = feature.properties.title;
    console.log(titles);
    console.log(index);
    $('#info').append(`<p>${titles}<p>`);
  });
};

// First, create an object containing LatLng and population for each city.
  var citymap = {
    chicago: {
      center: {lat: 41.878, lng: -87.629},
      population: 2714856
    },
    newyork: {
      center: {lat: 40.714, lng: -74.005},
      population: 8405837
    },
    losangeles: {
      center: {lat: 34.052, lng: -118.243},
      population: 3857799
    },
    vancouver: {
      center: {lat: 49.25, lng: -123.1},
      population: 603502
    }
  };
  
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 3
      });
    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (var city in citymap) {
      // Add the circle for this city to the map.
      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: citymap[city].center,
        radius: Math.sqrt(citymap[city].population) * 100
      });
  }
}


  
initMap();
});

