var mongoose   = require('mongoose'),
    venue      = require('./venue'),
    bcrypt     = require('bcrypt-nodejs'),

var UserSchema = new mongoose.Schema({
  local   : {
    name    : String,
    email   : {
      type    : String,
      unique  : true,
      required: true
    },
    password: String
  },
  phoneNbr: Number,
  zipCode : Number,
  favDance: String,
  favVenue: [Venue.Schema],
  isAdmin : {
    type    :Boolean,
    default : false
  },

})

User.methods.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}

var User       = mongoose.model('User', UserSchema)

module.exports = User;
