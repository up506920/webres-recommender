var express = require('express');
var router = express.Router();
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'CDxDgN2XzpUuq1vFw2rzrw',
  consumer_secret: 'iVG9mera886LOIq6tMwkkuPEIsI',
  token: 'Rkd78JZX9ZtO_ds6TbvF9OX17THHTACe',
  token_secret: 'RWdRpka4haqeCuazg7LUG2bcLbM',
});

router.get('/yelptest', function(req, res, next) {
  var val = req.query;
  var yelpData;
  yelp.search({ term: val.placetype, location: val.location, sort: 1 })
  .then(function (data) {
    console.log(data);
    for(i=0; i<data.businesses.length-1; i++){
      if(data.businesses[i].name.toLowerCase() == val.placetype.toLowerCase())
      {
        res.send(data.businesses[i]);
        break;
      }
    }

    //yelpData = findById(data.businesses, val.placeName);
  })
  .catch(function (err) {
    console.error(err);
      res.send(err);
  });



});

function findByName(source, name) {
    return source.filter(function( obj ) {
        // coerce both obj.id and id to numbers
        // for val & type comparison
        return +obj.name === +name;
    })[ 0 ];
}
module.exports = router;
