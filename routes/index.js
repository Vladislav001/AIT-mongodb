
var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
// if user is authenticated in the session, call the next() to call the next request handler
// Passport adds this method to request object. A middleware is allowed to add properties to
// request and response objects
if (req.isAuthenticated())
return next();
// if the user is not authenticated then redirect him to the login page
res.redirect('/');
}



module.exports = function(passport){

router.get('/', require('./main'));
router.get('/personalArea', require('./personalArea'));


router.post('/signup', passport.authenticate('signup', {
successRedirect: '/personalArea',
failureRedirect: '/',
failureFlash : true
}));

router.post('/login', passport.authenticate('login', {
successRedirect: '/personalArea',
failureRedirect: '/',
failureFlash : true
}));

router.get('/signout', function(req, res) {
req.logout();
res.redirect('/');
});

router.get('/test', require('./test'));


/* GET Home Page */
// router.get('/home', isAuthenticated, function(req, res){
// res.render('home', { user: req.user });
// });



return router;
}
