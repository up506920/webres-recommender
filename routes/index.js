var express = require('express');
var router = express.Router();
var request = require('request');
var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/placeLink', function(req, res, next) {
  //Get data on place from DB from the place ID, populate JSON into var "place"

  var url = "https://api.foursquare.com/v2/venues/" + req.query.id + "?client_id=13XIETMTGP1MX4HKZSFWJ1QNES422NIMFAZKTTRMRPLF05ZY&client_secret=3U2KZIYMDVXENYCEN11IOW1XN1Y2AVAXNW5QOHI5QTECR03A&v=20150212";
  request({
    url:url,
    json: true
  }, function (error, response, body) {

    if(!error && response.statusCode === 200){
      var venue = body.response.venue;
      var place = {
        placeID: venue.id,
        placeName: venue.name,
        category: venue.categories[0].name,
        description: "Test",
        IMG: venue.photos.groups[0].items[0].prefix+"300x300"+venue.photos.groups[0].items[0].suffix,
        address: venue.location.formattedAddress,
        score: req.query.score,
        coOrds: {lat: venue.location.lat, lng: venue.location.lng}
      };


  res.render('placeLink.hjs', { place: JSON.stringify(place) });
}
});

});

//Send Location coords
/*
  var place = {
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
    coOrds: {lat: 50.796437, lng: -1.067415}
  };*/
//Get closest location to coords (with a city != null) from 4Square
//Add to place table and add +1 to visited
//Add to Sequence, and add to sequence end on the latest start by user

//Get count of categories of places user goes to after category of current location
//Top category is category to find
//If no data: Get count of places most people go to after current location

//Get list of user's preferences from DB

//Find places that are in the categoryID and sort by distance from location, where city is not null

//Get Yelp stars and number of reviews for each place

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

//Client ranks and displays

module.exports = router;
