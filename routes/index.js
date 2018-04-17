var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated');
var verifyToken = require('../middleware/verifyToken');
var Student = require('../models/student');



module.exports = function(passport){

  router.get('/', require('./main'));
  router.get('/personalArea', isAuthenticated, require('./personalArea'));
  // router.get('/profileStudent', isAuthenticated, require('./profileStudent'));
  router.get('/profileStudent/id:idTag', require('./profileStudent').get);
  router.get('/test_settings/id:idTag', require('./testSettings').get);


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



  router.post('/addNewAdmin', require('./addNewAdmin').post);
  router.post('/addNewCoach', require('./addNewCoach').post);
  router.post('/addNewStudent', require('./addNewStudent').post);
  router.post('/deleteStudent/id:idTag', require('./deleteStudent').post);
  router.post('/deleteAdmin/id:idTag', require('./deleteAdmin').post);
  router.post('/deleteCoach/id:idTag', require('./deleteCoach').post);
  router.post('/updateStudent/id:idTag', require('./updateStudent').post);




  // API
  router.post('/api/v1/loginStudent', require('./api/v1/loginStudent').post);
  router.get('/api/v1/informationStudent', verifyToken, require('./api/v1/informationStudent').get);

  return router;
}
