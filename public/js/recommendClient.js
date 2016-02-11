var userCoOrds;
function recommend(){
  //Get from HTML.
  var userID = "1";
  var recommendations = getRecommendations(userID, userCoOrds);





};


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
    google.maps.event.addListenerOnce(map, 'idle', function(){
    recommend();
    });

    var marker = new google.maps.Marker({
        position: userCoOrds,
        map: map,
        title: 'You are here'
    });
      }, function() {

      });
    } else {
      // Browser doesn't support Geolocation
      // Default Portsmouth location
      userCoOrds = {lat: 50.799059, lng: -1.098358};
      map.setCenter(userCoOrds);
    }


    }
function getRecommendations(userID, userCoOrds){
  var recommendations;
  $.get('getrecommendations/test', {userID: userID, lat: userCoOrds.lat, lng: userCoOrds.lng}, function(data){
    var json = SortJson(data);
    DisplayRecommendations(json);
  });


  return recommendations;
}


function SortJson(json) {
  //Algorithm:
  //If user preference - add score of 5000 (equivalent to a 5 star review)
  //Add local popularity
  //Add: Yelp score * 1000 (e.g. 2 star = 2000), added by the user modifier ((the distance from 2500)/1000 * number of reviews)

  $.each(json, function(index, value) {
    value.score += ((value.userPreference) ? 5000 : 0) + value.popularity + ((value.yelpStars * 1000) + ((value.yelpStars - 2.5) * value.yelpNo));
  });

  json.sort(function(a, b) {
    return parseFloat(b.score) - parseFloat(a.score);
  });

  return json;
}


function DisplayRecommendations(json) {
  $.each(json, function(index, value) {
    $("#placesList").append("<div id='places'><a href='placeLink?id=" + value.placeID + "'><div id='place" + value.placeID + "'><div id='placesImg'><img src='img/placeholder.png' alt='logo'></div><table><tr><td id='nameCSS'>" + value.placeName + "</td><td id='distanceCSS'>" + value.distance + "</td><td id='ratingCSS'>" + value.yelpStars + "/5</td></tr><tr><td colspan='3' id='addressCSS'>" + value.address + "</td></tr><tr><td colspan='3' id='descriptionCSS'>" + value.description + "</td></tr></table></div></a></div>");
  });
  return true;
}
