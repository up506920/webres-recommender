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
