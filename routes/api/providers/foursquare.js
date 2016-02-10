var express = require('express'),
    router = express.Router();

module.exports = function(passport) {
  router.get("/auth", passport.authenticate("foursquare"));
  router.get("/callback", passport.authenticate("foursquare", {failureRedirect: '/login'}), (req, res) => {res.redirect('/')});
  return router;
};
