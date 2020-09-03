const router = require('express').Router()
const passport = require('passport');
const User = require('../models/user');
const notif = require('../models/notif')

const upload = require('../config/multer_cofig')


//  Signup ====================================================================
router.post('/signup', passport.authenticate('local-signup',  {
	failureRedirect : '/acceuil',
	failureFlash : true // allow flash messages
}), function(req, res, next)  {

	res.redirect('/acceuil')
});


// Login ====================================================================

router.post('/login', passport.authenticate('local-login' , {
	failureRedirect : '/acceuil',
	successRedirect:'/acceuil',
	failureFlash : true // allow flash messages
}), function(req, res, next)  {
  res.redirect('/acceuil')
});


// LOGOUT ==============================
router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/acceuil');
});


module.exports = router;