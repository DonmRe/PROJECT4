var express         = require('express'),
    router          = express.Router(),
    bodyParser      = require('body-parser'),
    {userIndex, userShow, userCreate, userEdit, userUpdate, userDestroy, getSignup, postSignup, getLogin, postLogin, getLogout} = require('../controllers/users_controller'),
    methodOverride  = require('method-override'),
    passport        = require('passport');


    function authenticateUser(req, res, next) {
      // If the user is authenticated, then we continue the execution
      if (req.isAuthenticated()) return next();

      // Otherwise the request is always redirected to the home page
      res.redirect('/');
    }

    function isAdmin(req, res, next) {
      if(req.user && req.user.admin){
        return next()
      } else if (req.user) {
        res.redirect("/users/" + req.user.id)
      } else {
        res.redirect("/users/signup")
      }
    }

//this is for users
  router.route('/')
  // .get(isAdmin, userIndex)
  .get(isAdmin, userIndex)
  .post(userCreate)

  router.route('/signup')
  .get(getSignup)
  .post(postSignup)

  router.route('/login')
  .get(getLogin)
  .post(postLogin)

  router.route('/logout')
  .get(getLogout)

  router.route('/:id/edit')
    .get(userEdit)

  router.route('/:id')
  .get(userShow)
  .post(userUpdate)
  .delete(userDestroy)



module.exports = router
