var express = require('express');
var router = express.Router();
var request = require('request');
var $ = require('jQuery');
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
  var url = "https://api.foursquare.com/v2/venues/search?ll=" + val.lat + "," + val.lng + "&categoryId=4bf58dd8d48988d11b941735&client_id=13XIETMTGP1MX4HKZSFWJ1QNES422NIMFAZKTTRMRPLF05ZY&client_secret=3U2KZIYMDVXENYCEN11IOW1XN1Y2AVAXNW5QOHI5QTECR03A&v=20150212";
  request({
    url:url,
    json: true
  }, function (error, response, body) {

    if(!error && response.statusCode === 200){
      console.log("response code received");
      var fourSquarePlaceList = body.response.venues;
      var userPreferencesPlaceList = [{name: "McDonalds", dislike: false}, {name: "KFC", dislike: false}, {name: "Burger King", dislike: true}];


        for(i=0; i<fourSquarePlaceList.length-1; i++)
        {
                console.log("outer loop " + i);
                if(typeof fourSquarePlaceList[i].location.city === 'undefined' || fourSquarePlaceList[i].location.city == null){

                fourSquarePlaceList.splice(i, 1);
                break;
              }
          for(x=0; x<userPreferencesPlaceList.length-1; x++)
          {
                  console.log("inner loop " + x);
            if(fourSquarePlaceList[i].name.toLowerCase() == userPreferencesPlaceList[x].name.toLowerCase())
            {
              console.log("user pref loop " + i + " " + x);
              if(userPreferencesPlaceList[x].dislike == true){

                fourSquarePlaceList.splice(i, 1);
                break;
              }
              fourSquarePlaceList[i].preference = true;
            }

          }
        }
              console.log("went past loop");
        var newObj = new Object();
        var newList = [];
        var yelpList;
        //Get Yelp stars and number of reviews for each place
        yelp.search({term: "pub", ll: fourSquarePlaceList[i].location.lat + "," + fourSquarePlaceList[i].location.lng, sort: 1 })
        .then(function (data) {
          console.log("GOT YELP STUFF");
          yelpList = data;
          for(i=0; i<fourSquarePlaceList.length-1; i++)
          {
            console.log(i);
            console.log(fourSquarePlaceList[i]);
              for(x=0; x<yelpList.businesses.length-1; x++){
                console.log("comparison loop " + i + " " + x + " ");
                console.log(yelpList.businesses[x].name.toLowerCase() + " vs " + fourSquarePlaceList[i].name.toLowerCase());
                if(yelpList.businesses[x].name.toLowerCase() == fourSquarePlaceList[i].name.toLowerCase())
                {
                  console.log("adding object " + fourSquarePlaceList[i].name);
                  newObj.placeID = fourSquarePlaceList[i].id;
                  console.log(newObj.placeID);
                  newObj.placeName = fourSquarePlaceList[i].name;
                  newObj.category = fourSquarePlaceList[i].categories[0].shortName;
                  newObj.popularity = fourSquarePlaceList[i].stats.checkinsCount;
                  newObj.yelpStars = yelpList.businesses[x].rating;
                  newObj.yelpNo = yelpList.businesses[x].review_count;
                  newObj.distance = fourSquarePlaceList[i].location.distance;
                  newObj.description = fourSquarePlaceList[i].categories.name; //placeholder
                  newObj.IMG = "";
                  newObj.address = yelpList.businesses[x].location.display_address;
                  if(typeof fourSquarePlaceList[i].preference === 'undefined'){
                    newObj.userPreference = false;
                  }
                  else{
                    newObj.userPreference = fourSquarePlaceList[i].preference;
                  }
                    newObj.coOrds = {lat: fourSquarePlaceList[i].location.lat, lng: fourSquarePlaceList[i].location.lng}
                    console.log(newObj);
                  newList.push(newObj);
                  console.log(newList);
                }
              }
          }
                console.log(newList);
                res.send(newList);
        });



        //Send JSON array of objects in this format to client:
        /*
        {  var place = {
            placeID: "1",
            placeName: "McDonalds",
            category: "Food",
            popularity: 50, *****(how often people have been there in our DB)
            yelpStars: 4.3,
            yelpNo: 200, *****(number of reviews on yelp)
            distance: 20,
            description: "Test",
            IMG: "",
            address: ["218 London Road", "Portsmouth PO2 9JQ", "UK"],
            userPreference: true, *****(if the user has indicated that they like the place)
            coOrds: {lat: 50.796437, lng: -1.067415}
          };
        */


    }
  });

  //Add to place table and add +1 to visited *** TBC

  //Add to sequence table, and add to sequence end on the latest start by user *** TBC



  //Get count of categories of places user goes to after category of current location *** TBC
  //Top category is category to find *** TBC
  //If no data: Get count of places most people go to after current location *** TBC

  //Find places that are in the categoryID and sort by distance from location *** TBC - just find all nearby places for now

  //Get list of user's preferences from DB and join them to list of places from 4square *** TBC

//Test data:



//Client ranks and displays the data
});
module.exports = router;

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
