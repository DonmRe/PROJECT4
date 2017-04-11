var mongoose    = require('mongoose'),
    User        = require('./user')


var Venue = new mongoose.Schema({
  name     : String,
  address  : String,
  zip_code : Number,
  image_url: String,
  phone    : Number,
  rating   : String,
  dance    : String,
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



module.exports  = mongoose.model('Venue', Venue)
