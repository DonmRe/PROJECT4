var User     = require('../models/user.js'),
    passport = require('passport'),
    Venue    = require('../models/venue.js')


    function getSignup(req, res) {
      res.render('/', {message: req.flash('signupMessage')})
    }

    function postSignup(req, res) {
      var signupStrategy = passport.authenticate('local-signup', {
          successRedirect: '/users',
          failureRedirect: '/users/signup',
          failureFlash: true
        }
      )
      return signupStrategy(req, res);
    }

    function getLogin(req, res) {
      res.render('/', {message: req.flash('loginMessage')})
    }

    function postLogin(req, res) {
      var loginProperty = passport.authenticate('local-login', {
        successRedirect: '/users',
        failureRedirect: '/users/login',
        failureFlash: true
      })

      return loginProperty(req, res)
    }

    function getLogout(req, res, next) {
      req.logout();

        res.redirect('/users/login');
      }

/////////////////////////////////
function userIndex(req, res){
    // User.find({}).populate('favVenues').exec(function(err, users){
    //   if(err) res.status(404).send(err)
    //   res.status(200).send(users)
    // })

    User.find({}).populate('favVenues').exec().then((users) => {
      res.json(users)
    })
}

function userCreate(req, res, next){
    var newUser = passport.authenticate('local-signup', {
      successRedirect: '/users',
      failureRedirect: '/users/signup',
      failureFlash: true
    })
}

function userShow(req, res){
    User.find({_id: req.params.id}).populate('favVenues').exec(function(err, user){
      if(err) res.status(404).send(err)
      res.status(200).send(user)
    })
}

function userEdit(req, res){
  var id = req.params.id
  User.findById(id, function(err, user) {
    if (err) res.status(404).send(err)
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
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getLogout,
  userIndex,
  userCreate,
  userShow,
  userEdit,
  userUpdate,
  userDestroy
}
