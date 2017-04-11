var User  = require('../models/user'),
    Venue = require('../models/venue');

function apiIndex(req, res){
  User.find({}, function(err, users){
      if (err) res.status(404).send(err)
      res.status(200).send(users)
  })
}


module.exports = {
  apiIndex
}
