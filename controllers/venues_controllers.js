var dotenv    = require('dotenv').load({silent: true}),
    Yelp      = require('yelp-api-v3'),
    Venue     = require('../models/venue'),
    User      = require('../models/user');

var yelp      = new Yelp({
  app_id      : process.env.YELP_ID,
  app_secret  : process.env.YELP_SECRET
});

function searchVenues(req, res) {
  // var Term         = req.query.term,
  //     zipCode      = req.query.zip || '90401';
  //
  // yelp.search({term: Term, categories: "danceclubs", location: zipCode, limit: 10})
  // .then(function (data) {
  var searchQueries = {
    categories: 'danceclubs',
    location: '90401'
  }

  if (req.query.term) searchQueries.term = req.query.term
  if (req.query.zip) searchQueries.location = req.query.zip

  // yelp.search({term: searchTerm, location: zipSearch, open_now: openNow, categories: 'vegan,vegetarian,farmersmarket', price: price})
  console.log(searchQueries)

  yelp.search(searchQueries)
    .then(function(data) {
      var jsonString = JSON.parse(data);
      res.json({location: jsonString.businesses});

    })

    //
    // var jsonString = JSON.parse(data);
    // res.status(200).send(jsonString.businesses);

  // })
  .catch(function (err) {
      console.error(err);
      res.status(404).json({err: err, message: "There was a problem", success: false})
  });
}
//
// function favVenue(req, res) {
//   User.findById(req.user.id, function(err, user) {
//     if (err) res.status(404).send(err)
//     console.log()
//     user.favVenues.push({
//       id                    : req.body.id,
//       name                  : req.body.name,
//       image                 : req.body.image_url,
//       phone                 : req.body.phone,
//       address               : req.body.address1,
//       city                  : req.body.city,
//       zipCode               : req.body.zip_code,
//       // latitude              : req.body.coordinates.latitude,
//       // longitude             : req.body.coordinates.longitude,
//       rating                : req.body.rating,
//       reviews               : req.body.review_count,
//       url                   : req.body.url
//     });
//     user.save(function(err, user) {
//       if (err)res.status(404).send(err)
//
//       res.redirect('/venues/favorites');
//     });
//   })
// };
//
// function favVenueIndex(req, res){
//   var favVenues = user.favVenues.id(id);
//     user.favVenues.find({}, function(err, venues){
//       if(err) res.status(404).send(err)
//       res.status(200).send(venues)
//     })
// }
//
// function updateVenue(req, res) {
//   var id = req.params.id;
//
//   User.findById(req.user._id, function(err, user) {
//     if (err) res.status(404).send(err)
//
//     var venue = user.favVenues.id(id);
//
//     user.save(function(err, updatedUser) {
//       if (err) res.status(404).send(err);
//       var updateVenue = updatedUser.favVenues.id(id);
//       res.status(200).send(updateVenue);
//     });
//
//   });
// }
//
// function deleteVenue(req, res) {
//   var id     = req.params.id,
//       userId = req.user._id;
//
//   User.findById(userId, function(err, user) {
//     if (err) res.status(404).send(err)
//
//     var venue = user.favVenues.id(id);
//
//     user.favVenues.pull(id);
//     user.save(function(err, updatedUser) {
//       if (err) res.status(500).send(err);
//
//       res.status(202).send({message: 'Venue has been removed from favorites'});
//     })
//   })
// }

module.exports = {
  searchVenues,
  // favVenue,
  // favVenueIndex,
  // updateVenue,
  // deleteVenue
}
