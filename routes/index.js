var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated');
var verifyToken = require('../middleware/verifyToken');
var Student = require('../models/student');
// создаем парсер для данных в формате js
// https://monsterlessons.com/project/lessons/obrabatyvaem-oshibki-v-express-i-mongoose
var bodyParser = require("body-parser");

// создаем парсер для данных в формате json
var jsonParser = bodyParser.json();

module.exports = function(passport){

  router.get('/', require('./main').get);
  router.get('/personalArea/:page', isAuthenticated, require('./personalArea'));
  // router.get('/profileStudent', isAuthenticated, require('./profileStudent'));
  //router.get('/publicProfile/admins/id:idTag', require('./publicProfile').get);
  // Либо регуляркой мб проверять, либо передалть вообще - но надо понимать кого смотрим
  router.get('/publicProfile/admins/id:idTag', require('./publicProfile').get);
  router.get('/publicProfile/coaches/id:idTag', require('./publicProfile').get);
  router.get('/publicProfile/students/id:idTag', require('./publicProfile').get);
  router.get('/test_settings/id:idTag', require('./testSettings').get);
  router.get('/developers', isAuthenticated, require('./developers').get);

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/personalArea/1',
    failureRedirect: '/',
    failureFlash : true
  }));
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/personalArea/1',
    failureRedirect: '/',
    failureFlash : true
  }));
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  router.post('/restorePassword', require('./restorePassword').post);


  router.post('/addNewAdmin', require('./add/admin').post);
  router.post('/addNewCoach', require('./add/coach').post);
  router.post('/addNewStudent',jsonParser, require('./add/student').post);

  router.post('/deleteStudent/id:idTag', require('./deleteStudent').post);
  router.post('/deleteAdmin/id:idTag', require('./deleteAdmin').post);
  router.post('/deleteCoach/id:idTag', require('./deleteCoach').post);
  router.post('/updateStudent/id:idTag', require('./updateStudent').post);


  // API
  router.post('/api/v1/loginStudent', require('./api/v1/loginStudent').post);
  router.get('/api/v1/informationStudent', verifyToken, require('./api/v1/informationStudent').get);
  router.post('/api/v1/updatePersonalDataStudent', verifyToken, require('./api/v1/updatePersonalDataStudent').post);

  return router;
}
