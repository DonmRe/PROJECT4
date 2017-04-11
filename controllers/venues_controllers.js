var dotenv    = require('dotenv').load({silent: true}),
    Yelp      = require('yelp-api-v3'),
    Venue  = require('../models/venue'),
    User   = require('../models/user');

var yelp      = new Yelp({
  app_id      : process.env.YELP_ID,
  app_secret  : process.env.YELP_SECRET
});

function searchVenues(req, res) {
  var Term = req.query.term,
      zipSearch  = req.query.zip || '90401';

  yelp.search({term: Term, categories: ["danceclubs"], location: zipSearch, limit: 10})
  .then(function (data) {
    var jsonString = JSON.parse(data);
    res.json(jsonString.businesses);

  })
  .catch(function (err) {
      console.error(err);
      res.json({message: "There was a problem", success: false})
  });
}

function createVenue(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) throw err;

    // user.favVenues.push({
      // name      : req.body.name,
      // image_url : req.body.image_url,
      // address   : req.body.address,
      // zipCode   : req.body.zip_code
    });

    user.save(function(err, user) {
      if (err) throw err;

      res.redirect('/');
    });

  };


function updateVenue(req, res) {
  var id = req.params.id;

  User.findById(req.user._id, function(err, user) {
    if (err) throw err;

    var venue = user.venues.id(id);

    user.save(function(err, updatedUser) {
      if (err) throw err;
      var updateVenue = updatedUser.venues.id(id);
      res.json(updateVenue);
    });

  });
}

function deleteVenue(req, res) {
  var id     = req.params.id,
      userId = req.user._id;

  User.findById(userId, function(err, user) {
    if (err) throw err;

    var venue = user.venues.id(id);

    user.venues.pull(id);
    user.save(function(err, updatedUser) {
      if (err) throw err;

      res.json({message: 'Venue has been removed from favorites'});
    })
  })
}

module.exports = {
  searchVenues: searchVenues,
  createVenue : createVenue,
  updateVenue : updateVenue,
  deleteVenue : deleteVenue
}
