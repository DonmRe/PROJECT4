var mongoose = require('mongoose');

var venueSchema = new mongoose.Schema({
  name: String,
  location: String,
  zipCode: Number,
  reviews: String,
  dance: String
})

var Venue = mongoose.model('Venue', venueSchema)

module.exports = Venue
