var testData = new Object();
$(document).ready(function() {
  if (Number.prototype.toRadians === undefined) {
    Number.prototype.toRadians = function() {
      return this * Math.PI / 180;
    };
  }
  //create test JSON obj

  var placeObj1 = {
    placeName: "McDonalds",
    category: "Food",
    userDislikes: false,
    popularity: 50,
    yelpStars: 4.3,
    yelpNo: 200,
    userPreference: true,
    coOrds: [50.796437, -1.067415]
  };
  var placeObj2 = {
    placeName: "Dominos",
    category: "Food",
    userDislikes: false,
    popularity: 25,
    yelpStars: 4.7,
    yelpNo: 100,
    userPreference: false,
    coOrds: [50.798385, -1.077028]
  };
  var placeObj3 = {
    placeName: "Wetherspoons",
    category: "Food",
    userDislikes: true,
    popularity: 250,
    yelpStars: 2.1,
    yelpNo: 1000,
    userPreference: false,
    coOrds: [50.796999, -1.092673]
  };
  var placeObj4 = {
    placeName: "KFC Waterlooville",
    category: "Food",
    userDislikes: false,
    popularity: 300,
    yelpStars: 3.7,
    yelpNo: 20,
    userPreference: true,
    coOrds: [50.898477, -1.016019]
  };
  var placeObj5 = {
    placeName: "The Deco",
    category: "Pub",
    userDislikes: false,
    popularity: 12,
    yelpStars: 3.2,
    yelpNo: 2,
    userPreference: true,
    coOrds: [50.789359, -1.084148]
  };
  var placeObj6 = {
    placeName: "One Eyed Dog",
    category: "Pub",
    userDislikes: false,
    popularity: 22,
    yelpStars: 5,
    yelpNo: 40,
    userPreference: false,
    coOrds: [50.789375, -1.082842]
  };

  testData.places = [placeObj1, placeObj2, placeObj3, placeObj4, placeObj5, placeObj6];

});




$("#simulate").click(function() {

  //Clear div content

  $("#results").empty();

  //Send user location and preference data to server
  var userCoOrds = [parseFloat($("#lat").val()), parseFloat($("#lon").val())];
  var distance = parseFloat($("#distance").val());
  var category = $("#category option:selected").text();

  //AJAX STUFF HERE
  //Simulated server stuff. This will be replaced by an ajax call:
  var jsonString = ServerSimulation(userCoOrds, distance, category);
  var json = JSON.parse(jsonString);

  //SORT BY ALGORITHM:

  json = SortJson(json);

  //Dump this data on page

  DisplayRecommendations(json);





});

function DisplayRecommendations(json) {
  $.each(json, function(index, value) {
    $("#results").append("<p>" + value.placeName + " Score = " + value.score + " Distance from user = " + value.distance + "</p>");
  });
  return true;
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









//Server simulation stuff



function ServerSimulation(userCoOrds, distance, category) {
  //Take data from user and return a test JSON string with basic logic

  //Make new array where dislike is not true and within distance
  var dist;
  var processedPlaces = [];
  var newObj;
  $.each(testData.places, function(index, value) {
    dist = (DetermineDistance(userCoOrds, value.coOrds)) / 1000;
    if (!value.userDislikes && dist <= distance && value.category == category) {
      //remove unnecessary info from object, add distance and add to new array
      newObj = {
        placeName: value.placeName,
        category: value.category,
        popularity: value.popularity,
        yelpStars: value.yelpStars,
        yelpNo: value.yelpNo,
        userPreference: value.userPreference,
        distance: dist,
        score: 0
      }
      processedPlaces.push(newObj);
    }
  });
  return JSON.stringify(processedPlaces);
}

function DetermineDistance(coOrds1, coOrds2) {
  //Adapted from http://www.movable-type.co.uk/scripts/latlong.html
  //Code originally written by Chris Veness 2002-2015

  //Gets distance between 2 coordinates
  //coOrds1 and 2 are arrays, [0] accesses lat, [1] accesses lon.
  //RETURNS distance in METRES


  if (Number.prototype.toRadians === undefined) {
    Number.prototype.toRadians = function() {
      return this * Math.PI / 180;
    };
  }
  var R = 6371000; // metres
  var φ1 = coOrds1[0].toRadians();
  var φ2 = coOrds2[0].toRadians();
  var Δφ = (coOrds2[0] - coOrds1[0]).toRadians();
  var Δλ = (coOrds2[1] - coOrds1[1]).toRadians();

  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;

  return d;
}
