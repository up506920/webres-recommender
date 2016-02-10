var express = require('express');
var router = express.Router();
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'CDxDgN2XzpUuq1vFw2rzrw',
  consumer_secret: 'iVG9mera886LOIq6tMwkkuPEIsI',
  token: 'Rkd78JZX9ZtO_ds6TbvF9OX17THHTACe',
  token_secret: 'RWdRpka4haqeCuazg7LUG2bcLbM',
});

module.exports = function(passport) {
  router.use("/foursquare", require("./providers/foursquare")(passport));
  return router;
};

router.get('/', function(req, res, next) {
  //Receive location coords from client
  var val = req.query;
  var yelpData;
  var latitude = val.latitude;
  var longitude = val.longitude;

  //Get closest location to coords (with a city != null) from 4Square
  //Add to place table and add +1 to visited
  //Add to sequence table, and add to sequence end on the latest start by user


  //Get count of categories of places user goes to after category of current location
  //Top category is category to find
  //If no data: Get count of places most people go to after current location

  //Find places that are in the categoryID and sort by distance from location, where city is not null

  //Get list of user's preferences from DB and join them to list of places from 4square
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
    }
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
