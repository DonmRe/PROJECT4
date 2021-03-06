var mongoose   = require('mongoose'),
    Venue      = require('./venue'),
    bcrypt     = require('bcrypt-nodejs')

var User = new mongoose.Schema({
  local     : {
     email   : {
      type    : String,
      unique  : true,
      required: true
    },
    password: String
  },
  name      : String,
  phoneNbr  : Number,
  zipCode   : Number,
  favDance  : String,
  // favVenues : [Venue.schema],
  favVenues : [{type: mongoose.Schema.Types.ObjectId, ref: 'Venue'}],
  isAdmin   : {
     type    : Boolean,
     default : false
  },

})

User.methods.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', User)
