var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');

module.exports = function(passport){

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {

    findOrCreateUser = function(){
      // find a user in Mongo with provided email
      User.findOne({ 'email' : email }, function(err, user) {
        // In case of any error, return using the done method
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists with email: '+email);
          return done(null, false, req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();

          // set the user's local credentials
          newUser.email = email;
          newUser.password = createHash(password);

          var currentDate = new Date();
          newUser.created = currentDate.toUTCString();

          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);
              throw err;
            }
            console.log('User Registration succesful');

            sendEmailSuccesRegistration(req.headers.host, email);

            return done(null, newUser);
          });
        }
      });
    };
    // Delay the execution of findOrCreateUser and execute the method
    // in the next tick of the event loop
    process.nextTick(findOrCreateUser);

  })
);

// Generates hash using bCrypt
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

//Выслать на почту уведомление, потом вынести из addCoach, addAdmin (вызов 1 фун-ции везде)
var sendEmailSuccesRegistration = function(url, recipient){
  // указываем данные от почты
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

  var mailOptions = {
    from: '',
    to: recipient, // для нескольких - через запятую 'myfriend@yahoo.com, myotherfriend@yahoo.com'
    subject: 'Registration successful',
    html: '<h1>Congratulations on registration</h1><br><p><a href="http://' + url + '">Go to the site!</a></p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

}
