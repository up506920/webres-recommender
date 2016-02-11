var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/placeLink', function(req, res, next) {
  //Get data on place from DB from the place ID, populate JSON into var "place"
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
    coOrds: [50.796437, -1.067415]
  };
  res.render('placeLink', { place: place });
});

//Send Location coords

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

//Client ranks and displays

module.exports = router;
