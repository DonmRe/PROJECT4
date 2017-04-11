var express         = require('express'),
    router          = express.Router(),
    bodyParser      = require('body-parser'),
    {userIndex, userShow, userCreate, userEdit, userUpdate, userDestroy, getSignup, postSignup, getLogin, postLogin, getLogout} = require('../controllers/users_controller'),
    passport        = require('passport'),
    {searchVenues, createVenue, updateVenue, deleteVenue} = require('../controllers/venues_controllers')


    function authenticateUser(req, res, next) {
      // If the user is authenticated, then we continue the execution
      if (req.isAuthenticated()) return next();

      // Otherwise the request is always redirected to the home page
      res.redirect('/');
    }

    router.route('/')
      .get(searchVenues)
    	.post(createVenue);

    router.route('/:id')
      .patch(updateVenue)
    	.delete(deleteVenue);




    module.exports = router
