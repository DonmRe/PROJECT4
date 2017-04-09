var User = require('../models/user.js'),

function userIndex(req, res){
    User.find({}, function(err, users){
      if(err) res.status(404).send(err)
      res.status(200).send(users)
    })
}

function userCreate(req, res, next){
    var User = new User(req.body)

    user.save(function(err, user){
      if(err) res.status(500).send(err)
      res.status(201).send(user)
    })
}

function userShow(req, res){
    User.find({_id: req.params.id}, function(err, user){
      if(err) res.status(404).send(err)
      res.status(200).send(user)
    })
}

function userUpdate(req, res){
    User.findById({_id: req.params.id}, function(err){
      if(err) res.status(404).send(err)
      if(req.body.name) user.name = req.body.name
      if(req.body.email) user.email = req.body.email
      if(req.body.phoneNbr) user.phoneNbr = req.body.phoneNbr
      if(req.body.favDance) user.favDance = req.body.favDance
      if(req.body.favVenue) user.favVenue = req.body.favVenue

      user.save(function(err){
        if(err) res.status(500).send(err)
        res.status(200).send(user)
      })
    })
}

function userDestroy(req, res){
    User.remove({_id: req.params.id}, function(err){
      if(err) res.status(500).send(err)
      res.status(200).send({message: 'Guest Deleted'})
    })
}


module.exports = {
  userIndex  : userIndex,
  userCreate : userCreate,
  userShow   : userShow,
  userUpdate : userUpdate,
  userDestroy: userDestroy
}
