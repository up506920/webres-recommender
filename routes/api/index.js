var express = require('express'),
    router = express.Router();

module.exports = function(passport) {
  router.use("/foursquare", require("./providers/foursquare")(passport));
  return router;
};
