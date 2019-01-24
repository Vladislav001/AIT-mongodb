const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const isAuthenticated = require('../middleware/isAuthenticated');
const verifyToken = require('../middleware/verifyToken');


module.exports = function (passport) {

  router.get('/', require('./pages/main').get);
  router.get('/personalArea/:page', isAuthenticated, require('./pages/personalArea'));
  // router.get('/profileStudent', isAuthenticated, require('./profileStudent'));
  //router.get('/publicProfile/admins/id:idTag', require('./publicProfile').get);
  // Либо регуляркой мб проверять, либо передалть вообще - но надо понимать кого смотрим
  router.get('/publicProfile/admins/id:idTag', require('./pages/publicProfile').get);
  router.get('/publicProfile/coaches/id:idTag', require('./pages/publicProfile').get);
  router.get('/publicProfile/students/id:idTag', require('./pages/publicProfile').get);
  router.get('/test_settings/id:idTag', require('./pages/testSettings').get);
  router.get('/developers', isAuthenticated, require('./pages/developers').get);

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/personalArea/1',
    failureRedirect: '/',
    failureFlash: true
  }));
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/personalArea/1',
    failureRedirect: '/',
    failureFlash: true
  }));
  router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
  router.post('/restorePassword', require('./restorePassword').post);

  router.post('/addNewAdmin', require('./add/admin').post);
  router.post('/addNewCoach', require('./add/coach').post);
  router.post('/addNewStudent', require('./add/student').post);

  router.post('/deleteStudent/id:idTag', require('./deleteStudent').post);
  router.post('/deleteAdmin/id:idTag', require('./deleteAdmin').post);
  router.post('/deleteCoach/id:idTag', require('./deleteCoach').post);
  router.post('/updateStudent/id:idTag', require('./updateStudent').post);


  // Applications

  // MoneyGame
  router.get('/customizeMoneyGame/collectionMoney/id:idTag', require('./applications/moneygame/collectionMoney').get);
  router.get('/customizeMoneyGame/paymentPurchase/id:idTag', require('./applications/moneygame/paymentPurchase').get);
  router.get('/customizeMoneyGame/selectionGoods/id:idTag', require('./applications/moneygame/selectionGoods').get);
  router.get('/customizeMoneyGame/takeChangee/id:idTag', require('./applications/moneygame/takeChangee').get);

  router.post('/customizeMoneyGame/collectionMoney/id:idTag', require('./applications/moneygame/collectionMoney').post);
  router.post('/customizeMoneyGame/paymentPurchase/id:idTag', require('./applications/moneygame/paymentPurchase').post);
  router.post('/customizeMoneyGame/selectionGoods/id:idTag', require('./applications/moneygame/selectionGoods').post);
  router.post('/customizeMoneyGame/takeChangee/id:idTag', require('./applications/moneygame/takeChangee').post);
  // Тут еще post будут - для записи в БД





  // swagger definition
  const swaggerDefinition = require('../swagger.json');

  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
  };

  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);

  // serve swagger
  router.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });



 




  
  // API
  router.post('/api/v1/loginStudent', require('./api/v1/loginStudent').post);
  router.get('/api/v1/informationStudent', verifyToken, require('./api/v1/informationStudent').get);
  //router.post('/api/v1/updatePersonalDataStudent', verifyToken, require('./api/v1/updatePersonalDataStudent').post); пока не нужно
  //router.post('/api/v1/updateResults', verifyToken, require('./api/v1/updateResults').post); пока не нужно
  router.get('/api/v1/applications/moneygame/getSettings', verifyToken, require('./api/v1/applications/moneygame/getSettings').get);

  return router;
}
