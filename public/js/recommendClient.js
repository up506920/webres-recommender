var userCoOrds;
$(document).ready(function(){

var userID = "1";

  var recommendations = getRecommendations(userID, userCoOrds);






});


function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      userCoOrds = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 14,
        center: userCoOrds
    });
    var marker = new google.maps.Marker({
        position: userCoOrds,
        map: map,
        title: 'You are here'
    });
      var infoWindow = new google.maps.InfoWindow({map: map});
        infoWindow.setPosition(userCoOrds);
        infoWindow.setContent('You are here');
        map.setCenter(userCoOrds);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      // Default Portsmouth location
      userCoOrds = {lat: 50.799059, lng: -1.098358};
      map.setCenter(userCoOrds);
      handleLocationError(false, infoWindow, map.getCenter());
    }



    }
function getRecommendations(userID, userCoOrds){
  var recommendations;
  $.get('getRecommendations', {userID: $("#userID").val(), location: "portsmouth"}, function(data){
    //$("#yelp").html(JSON.stringify(data));
  });


  return recommendations;
}

function handleLocationError(browserHasGeolocation, infoWindow, userCoOrds) {
infoWindow.setPosition(userCoOrds);
infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
}
