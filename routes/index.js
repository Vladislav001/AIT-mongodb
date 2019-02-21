const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const isAuthenticated = require('../middleware/isAuthenticated');
const isCaregiver = require('../middleware/isCaregiver');
const verifyToken = require('../middleware/verifyToken');


module.exports = function (passport) {

  router.get('/', require('./pages/main').get);
  router.get('/personalArea/:page', isAuthenticated, require('./pages/personal_area'));

  // Либо регуляркой мб проверять, либо передалть вообще - но надо понимать кого смотрим
  router.get('/publicProfile/admins/id:_id', require('./pages/public_profile').get);
  router.get('/publicProfile/coaches/id:_id', require('./pages/public_profile').get);
  router.get('/publicProfile/students/id:_id', require('./pages/public_profile').get);
  router.get('/test_settings/id:_id', require('./pages/test_settings').get);
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
  router.post('/restorePassword', require('./restore_password').post);

  router.post('/addNewAdmin', isAuthenticated, require('./add/admin').post);
  router.post('/addNewCoach', isAuthenticated, require('./add/caregiver').post);
  router.post('/addNewStudent', isAuthenticated, require('./add/pid').post);

  router.post('/deleteStudent/id:_id', isAuthenticated, require('./delete_pid').post);
  router.post('/deleteAdmin/id:_id', isAuthenticated, require('./delete_admin').post);
  router.post('/deleteCoach/id:_id', isAuthenticated, require('./delete_caregiver').post);
  router.post('/updateStudent/id:_id', isAuthenticated, isCaregiver, require('./update_pid').post);


  // MoneyGame
  router.get('/customizeMoneyGame/collectionMoney/id:_id', isAuthenticated, require('./applications/money_game/collection_money').get);
  router.get('/customizeMoneyGame/paymentPurchase/id:_id', isAuthenticated, require('./applications/money_game/payment_purchase').get);
  router.get('/customizeMoneyGame/selectionGoods/id:_id', isAuthenticated, require('./applications/money_game/selection_goods').get);
  router.get('/customizeMoneyGame/takeChangee/id:_id', isAuthenticated, require('./applications/money_game/take_changee').get);

  router.post('/customizeMoneyGame/collectionMoney/id:_id', isAuthenticated, require('./applications/money_game/collection_money').post);
  router.post('/customizeMoneyGame/paymentPurchase/id:_id', isAuthenticated, require('./applications/money_game/payment_purchase').post);
  router.post('/customizeMoneyGame/selectionGoods/id:_id', isAuthenticated, require('./applications/money_game/selection_goods').post);
  router.post('/customizeMoneyGame/takeChangee/id:_id', isAuthenticated, require('./applications/money_game/take_changee').post);


  

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


  /*-----------------
      **** API ****
  *-----------------/
  
 /**
   * @swagger
   * /api/v1/login/pid:
   *   post:
   *     tags:
   *       - ""
   *     summary: "PID authorization"
   *     description: ""
   *     produces:
   *       - application/json
   *     parameters:
   *     - name: "login"
   *       in: "x-www-form-urlencoded"
   *       description: "PID login"
   *       required: true
   *       type: "string"
   *     - name: "password"
   *       in: "x-www-form-urlencoded"
   *       description: "PID password"
   *       required: true
   *       type: "string"
   *     responses:
   *       200:  
   *        description: The PID was successfully authorized
   *        examples:
   *           application/json: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTdkMWE1ZjI5MGNjMGRhMDIzYTQwYyIsImlhdCI6MTU0NTA2NDg2OSwiZXhwIjoxNTQ1MTUxMjY5fQ.Qb-klBvif8IhW4YXAoOftdLSpiqBgl7wMTsj0gMxPsU" }
   *       401:
   *         description: Invalid data entered
   *         examples:
   *           application/json: 
   *            {  
   *              errors:
   *              [
   *                {
   *                 "id": 1, "title": Required fields are not filled, "detail": "login, password are required"
   *                },{
   *                 "id": 2, "code": password-Invalid, "title": Invalid data entered, "detail": "The number of characters in the password must be from 4 to 7"
   *                },{
   *                 "id": 2, "code": login-Invalid, "title": Invalid data entered, "detail": "Incorrectly specified login" 
   *                },{
   *                 "id": 2, "code": login-and-password-Invalid, "title": Invalid data entered, "detail": "You entered an incorrect login or password" 
   *                 }         
   *              ]
   *            }
   *           
   */
  router.post('/api/v1/login/pid', require('./api/v1/login_pid').post);

  /**
    * @swagger
    * /api/v1/information/pid:
    *   post:
    *     tags:
    *       - ""
    *     summary: "Information about PID"
    *     description: ""
    *     produces:
    *       - application/json
    *     parameters:
    *     - name: "x-access-token"
    *       in: "header"
    *       description: "PID token"
    *       required: true
    *       type: "string"
    *     responses:
    *       200:  
    *        description: Information about PID is successfully received
    *        examples:
    *           application/json: { "id": "5c4573204b457d9e38ff18b7",  "login": "tim.zaitsev123", "name": "Tima", 
    *           "age": 22, "gender": "male", "caregiver_ID": "5b3e4dd2512813264c6a0925"  }
    *       401:
    *         description: Invalid data entered
    *         examples:
    *           application/json: 
    *            {  
    *              errors:
    *              [
    *               {
    *                "id": 1, "title": Required fields are not filled, "detail": "Empty token value"
    *                },{
    *                "id": 2, "code": token-Invalid, "title": Invalid data entered, "detail": "Invalid token entered, or token expired"
    *                },{
    *                "id": 2, "token": token-Invalid, "title": Invalid data entered, "detail": "The PID with the token entered has been deleted."
    *                }         
    *              ]
    *            }
    *           
    */
  router.post('/api/v1/information/pid', verifyToken, require('./api/v1/information_pid').post);




  /**
    * @swagger
    * /api/v1/applications/moneygame/get/settings:
    *   post:
    *     tags:
    *       - ""
    *     summary: "Get settings for MoneyGame"
    *     description: ""
    *     produces:
    *       - application/json
    *     parameters:
    *     - name: "x-access-token"
    *       in: "header"
    *       description: "PID token"
    *       required: true
    *       type: "string"
    *     responses:
    *       200:  
    *        description: Information about settings for MoneyGame
    *        examples:
    *           application/json: { "progress_bar": true, back_btn: "test-ait.herokuapp.com/application/applicationImages/MoneyGame/backBtn/1.png",
    *           "next_btn": "...", "again_btn": "...", "wallet": "...", "basket": "..." }
    *       401:
    *         description: Invalid data entered
    *         examples:
    *           application/json: 
    *            {  
    *              errors:
    *              [
    *               {
    *                "id": 1, "title": Required fields are not filled, "detail": "Empty token value"
    *                },{
    *                "id": 2, "code": token-Invalid, "title": Invalid data entered, "detail": "Invalid token entered, or token expired"
    *                },{
    *                "id": 2, "token": token-Invalid, "title": Invalid data entered, "detail": "The PID with the token entered has been deleted."
    *                }         
    *              ]
    *            }
    *           
    */
  router.post('/api/v1/applications/moneygame/get/settings', verifyToken, require('./api/v1/applications/moneygame/get_settings').post);


  /**
    * @swagger
    * /api/v1/applications/moneygame/get/currency:
    *   post:
    *     tags:
    *       - ""
    *     summary: "Get currency for MoneyGame"
    *     description: ""
    *     produces:
    *       - application/json
    *     parameters:
    *     - name: "x-access-token"
    *       in: "header"
    *       description: "PID token"
    *       required: true
    *       type: "string"
    *     responses:
    *       200:  
    *        description: Information about currency for MoneyGame
    *        examples:
    *           application/json:  [{ "image": "test-ait.herokuapp.com/system_images/currency/euro/0,01.png", "count": 0.01 },
    *           { "image": "test-ait.herokuapp.com/system_images/currency/euro/1.png", "count": 1 }] 
    *       401:
    *         description: Invalid data entered
    *         examples:
    *           application/json: 
    *            {  
    *              errors:
    *              [
    *               {
    *                "id": 1, "title": Required fields are not filled, "detail": "Empty token value"
    *                },{
    *                "id": 2, "code": token-Invalid, "title": Invalid data entered, "detail": "Invalid token entered, or token expired"
    *                },{
    *                "id": 2, "token": token-Invalid, "title": Invalid data entered, "detail": "The PID with the token entered has been deleted."
    *                }         
    *              ]
    *            }
    *           
    */
   router.post('/api/v1/applications/moneygame/get/currency', verifyToken, require('./api/v1/applications/moneygame/get_currency').post);

  return router;
}
