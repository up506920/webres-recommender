var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/algorithm', function(req, res, next) {
  res.render("proofOfConcept");
});

module.exports = router;
