var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated');

module.exports = function(passport){

router.get('/', require('./main'));
router.get('/personalArea', isAuthenticated, require('./personalArea'));


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

router.post('/addNewStudent', require('./addNewStudent'));



return router;
}
