var mongoose    = require('mongoose'),
    User        = require('./user')

    
var venueSchema = new mongoose.Schema({
  name     : String,
  address  : String,
  zip_code : Number,
  image_url: String,
  phone    : Number,
  rating   : String,
  dance    : String
  favorite : {
    type     : Boolean,
    default  : false
  },
  url      : String,
  coordinates: {
    latitude : Number,
    longitude: Number
  }
})

var Venue       = mongoose.model('Venue', venueSchema)

module.exports  = Venue
