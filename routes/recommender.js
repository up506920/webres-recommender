var express = require('express');
var router = express.Router();
var Yelp = require('yelp');
var testData = new Object();
var yelp = new Yelp({
  consumer_key: 'CDxDgN2XzpUuq1vFw2rzrw',
  consumer_secret: 'iVG9mera886LOIq6tMwkkuPEIsI',
  token: 'Rkd78JZX9ZtO_ds6TbvF9OX17THHTACe',
  token_secret: 'RWdRpka4haqeCuazg7LUG2bcLbM',
});


router.get('/test', function(req, res, next) {
var placeObj1 = {
  placeID: "1",
  placeName: "McDonalds",
  category: "Food",
  userDislikes: false,
  popularity: 50,
  yelpStars: 4.3,
  yelpNo: 200,
  distance: 20,
  description: "Test",
  IMG: "",
  address: ["218 London Road", "Portsmouth PO2 9JQ", "UK"],
  userPreference: true,
  coOrds: [50.796437, -1.067415]
};
var placeObj2 = {
  placeID: "2",
  placeName: "Dominos",
  category: "Food",
  userDislikes: false,
  popularity: 25,
  yelpStars: 4.7,
  yelpNo: 100,
  distance: 30,
  description: "Test",
  IMG: "",
  address: ["218 London Road", "Portsmouth PO2 9JQ", "UK"],
  userPreference: false,
  coOrds: [50.798385, -1.077028]
};
var placeObj3 = {
  placeID: "3",
  placeName: "Wetherspoons",
  category: "Food",
  userDislikes: true,
  popularity: 250,
  yelpStars: 2.1,
  yelpNo: 1000,
  distance: 12,
  description: "Test",
  IMG: "",
  address: ["218 London Road", "Portsmouth PO2 9JQ", "UK"],
  userPreference: false,
  coOrds: [50.796999, -1.092673]
};
var placeObj4 = {
  placeID: "4",
  placeName: "KFC Waterlooville",
  category: "Food",
  userDislikes: false,
  popularity: 300,
  yelpStars: 3.7,
  yelpNo: 20,
  distance: 440,
  description: "Test",
  IMG: "",
  address: ["218 London Road", "Portsmouth PO2 9JQ", "UK"],
  userPreference: true,
  coOrds: [50.898477, -1.016019]
};
var placeObj5 = {
  placeID: "5",
  placeName: "The Deco",
  category: "Pub",
  userDislikes: false,
  popularity: 12,
  yelpStars: 3.2,
  yelpNo: 2,
  distance: 10,
  description: "Test",
  IMG: "",
  address: ["218 London Road", "Portsmouth PO2 9JQ", "UK"],
  userPreference: true,
  coOrds: [50.789359, -1.084148]
};
var placeObj6 = {
  placeID: "6",
  placeName: "One Eyed Dog",
  category: "Pub",
  userDislikes: false,
  popularity: 22,
  yelpStars: 5,
  yelpNo: 40,
  distance: 2,
  description: "Test",
  IMG: "",
  address: ["218 London Road", "Portsmouth PO2 9JQ", "UK"],
  userPreference: false,
  coOrds: [50.789375, -1.082842]
};

  testData.places = [placeObj1, placeObj2, placeObj3, placeObj4, placeObj5, placeObj6];
  res.send(testData.places);
});

router.get('/', function(req, res, next) {
  //Receive location coords from client
  var val = req.query;
  var yelpData;
  var latitude = val.lat;
  var longitude = val.lng;

  //Get closest location to coords (with a city != null) from 4Square
  //Add to place table and add +1 to visited
  //Add to sequence table, and add to sequence end on the latest start by user


  //Get count of categories of places user goes to after category of current location
  //Top category is category to find
  //If no data: Get count of places most people go to after current location

  //Find places that are in the categoryID and sort by distance from location, where city is not null

  //Get list of user's preferences from DB and join them to list of places from 4square
  var fourSquarePlaceList;
  for(i=0; i<fourSquarePlaceList.length-1; i++)
  {
    for(x=0; x<userPreferencesPlaceList.length-1; x++)
    {
      if(fourSquarePlaceList[i].name.toLowerCase() == userPreferencesPlaceList[x].name.toLowerCase())
      {
        if(userPreferencesPlaceList[x].dislike == true){
          fourSquarePlaceList.remove(i);
          break;
        }
        fourSquarePlaceList[i].preference = true;
      }

    }
  }


  //Get Yelp stars and number of reviews for each place
  for(i=0; i<fourSquarePlaceList.length-1; i++)
  {
    yelp.search({ term: fourSquarePlaceList[i].name, location: fourSquarePlaceList[i].city, sort: 1 })
    .then(function (data) {
      console.log(data);
      for(x=0; x<data.businesses.length-1; x++){
        if(data.businesses[x].name.toLowerCase() == fourSquarePlaceList[i].name.toLowerCase())
        {
          fourSquarePlaceList[i].yelpStars = data.businesses[x].rating;
          fourSquarePlaceList[i].yelpNo = data.businesses[x].review_count;
        }
      }
    });
  }

  //Send JSON array of objects in this format to client:
  /*
  {
  	placeName: "McDonalds",
          category: "Food",
          popularity: 50,
          yelpStars: 4.3,
          yelpNo: 200,
          userPreference: true,
  	coOrds: [50.796437, -1.067415]
  }
  */

res.send(fourSquarePlaceList);


//Client ranks and displays the data
});
module.exports = router;
