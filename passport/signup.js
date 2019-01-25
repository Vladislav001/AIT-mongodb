const LocalStrategy = require('passport-local').Strategy;
const Caregiver = require('../models/caregiver');
const bCrypt = require('bcrypt-nodejs');
const sendMail = require('../functions/sendMail');

module.exports = function (passport) {

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function (req, email, password, done) {

      findOrCreateUser = function () {

        Caregiver.findOne({ 'email': email }, function (err, user) {
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }

          if (user) {
            console.log('User already exists with email: ' + email);
            return done(null, false, req.flash('message', 'User Already Exists'));
          } else {

            let newCaregiver = new Caregiver();

            newCaregiver.email = email;
            newCaregiver.password = createHash(password);

            let currentDate = new Date();
            newCaregiver.created = currentDate.toUTCString();

            newCaregiver.save(function (err) {
              if (err) {
                console.log('Error in Saving user: ' + err);
                throw err;
              }
              console.log('User Registration succesful');

              // Отправим уведомление на почту - пока нет необходимости
              //sendMail.sendEmailSuccesRegistration(req.headers.host, email);

              return done(null, newCaregiver);
            });
          }
        });
      };

      // Delay the execution of findOrCreateUser and execute the method
      // in the next tick of the event loop
      process.nextTick(findOrCreateUser);

    })
  );


  const createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }


}
