var mongoose    = require('mongoose'),
    User        = require('./user')


var Venue = new mongoose.Schema({
  yelp_id    : String,
  name       : String,
  image      : String,
  phone      : Number,
  address    : String,
  city       : String,
  zip_code   : Number,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  // latitude   : String,
  // longitude  : String,
  rating     : String,
  reviews    : String,
  url        : String
})



module.exports  = mongoose.model('Venue', Venue)
