var Coach = require('../../models/user');
var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');


exports.post = function(req, res, done) {
  Coach.findOne({ 'email' : req.body.email }, function(err, user) {
    // In case of any error, return using the done method
    if (err){
      console.log('Error in SignUp: '+ err);
      return done(err);
    }
    // already exists
    if (user) {
      console.log('Coach already exists with email: ' + req.body.email);
      res.redirect('/personalArea/1');

    } else {
      var newCoach = new Coach();

      newCoach.email = req.body.email;
      newCoach.password = createHash(req.body.password);
      //Если добавляем из ЛК, то по св-ву авторизованного, а если с публичного профиля - по GET
      if(req.user.access_level == 2){
            newCoach.parent_ID = req.user._id;
      } else {
          newCoach.parent_ID = req.body.idTag;
      }

      newCoach.access_level = 3;

      // save the user 
      newCoach.save(function(err) {
        if (err){
          console.log('Error in Saving coach: '+err);
          throw err;
        }
        console.log('Coach Registration succesful');

        return done(null, newCoach);
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
      });
      res.redirect('/personalArea/1');
    }
  });
};

// Generates hash using bCrypt
var createHash = function(password){
return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
