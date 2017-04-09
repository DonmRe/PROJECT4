var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  phoneNbr: Number,
  zipCode: Number,
  favDance: String,
  favVenue: [venueSchema]
})

var User = mongoose.model('User', UserSchema)

module.exports = User
