var dotenv = require('dotenv').load({
    silent: true
  }),
  Yelp = require('yelpv3'),
  Venue = require('../models/venue'),
  User = require('../models/user');

var yelp = new Yelp({
  app_id: process.env.YELP_ID,
  app_secret: process.env.YELP_SECRET
});

function searchVenues(req, res) {
  var searchQueries = {
    categories: ['danceclubs'],
    location: '90401'
  }

  if (req.query.term) searchQueries.term = req.query.term
  if (req.query.zip) searchQueries.location = req.query.zip
  console.log(searchQueries)

  yelp.search(searchQueries)
    .then(function(data) {
      var jsonString = JSON.parse(data);
      res.status(200).send(jsonString.businesses);
    })
    .catch(function(err) {
      console.error(err);
      res.status(404).json({
        err: err,
        message: "There was a problem",
        success: false
      })
    });
}

function favVenue(req, res) {
  // // console.log(req.user)
  User.findById(req.user.id, function(err, user) {
      if (err) res.status(404).send(err)
  //
  //
      Venue.findOne({yelp_id: req.params.yelp_id}, function(err, venue) {
          if (venue) {user.favVenues.push(venue);
            user.save(function(err, user) {
              if (err) res.status(404).send(err)
              res.json({message: "Boom! Added to favorites.", success: true, user });
            });
          } else {
              var searchQueries = {
                categories: ['danceclubs'],
                location: '90401'
              }
            if (req.query.term) searchQueries.term = req.query.term
            if (req.query.zip) searchQueries.location = req.query.zip
            yelp.search(searchQueries)
              .then(function(data) {
                var arr = JSON.parse(data)
                // console.log(arr)
                var newVenue = arr.find(venue => venue.yelp_id == req.params.id)
                console.log(newVenue)
                var venueFields = {
                  yelp_id: newVenue.yelp_id,
                  name: newVenue.name,
                  image: newVenue.image_url,
                  phone: newVenue.phone,
                  address: newVenue.address1,
                  city: newVenue.city,
                  zipCode: newVenue.zip_code,
                  // latitude              : newVenue.coordinates.latitude,
                  // longitude             : newVenue.coordinates.longitude,
                  rating: newVenue.rating,
                  reviews: newVenue.review_count,
                  url: newVenue.url
                }

                Venue.create(venueFields, function(err, venue) {
                  user.favVenues.push(venue);
                  user.save(function(err, user) {
                    if (err) res.status(404).send(err)
                    res.json({message: "Boom! Venue created and added to favorites", success: true, user});
                  });
                })


              })
            }
          })
      })

};

function favVenueIndex(req, res) {
  var favVenues = user.favVenues.id(id);
  user.favVenues.find({}, function(err, venues) {
    if (err) res.status(404).send(err)
    res.status(200).send(venues)
  })
}

function updateVenue(req, res) {
  var id = req.params.id;

  User.findById(req.user._id, function(err, user) {
    if (err) res.status(404).send(err)

    var venue = user.favVenues.id(id);

    user.save(function(err, updatedUser) {
      if (err) res.status(404).send(err);
      var updateVenue = updatedUser.favVenues.id(id);
      res.status(200).send(updateVenue);
    });
  });
}

function deleteVenue(req, res) {
  var id = req.params.id,
    userId = req.user._id;

  User.findById(userId, function(err, user) {
    if (err) res.status(404).send(err)

    var venue = user.favVenues.id(id);

    user.favVenues.pull(id);
    user.save(function(err, updatedUser) {
      if (err) res.status(500).send(err);

      res.status(202).send({
        message: 'Venue has been removed from favorites'
      });
    })
  })
}

module.exports = {
  searchVenues,
  favVenue,
  favVenueIndex,
  updateVenue,
  deleteVenue
}
