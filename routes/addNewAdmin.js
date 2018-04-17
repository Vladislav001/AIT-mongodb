var Admin = require('../models/user');
var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');

exports.post = function(req, res, done) {
  Admin.findOne({ 'email' : req.body.email }, function(err, user) {
    // In case of any error, return using the done method
    if (err){
      console.log('Error in SignUp: '+ err);
      return done(err);
    }
    // already exists
    if (user) {
      console.log('Admin already exists with email: ' + req.body.email);
      res.redirect('/personalArea');

    } else {
      var newAdmin = new Admin();

      newAdmin.email = req.body.email;
      newAdmin.password = createHash(req.body.password);
      newAdmin.access_level = 2;


      // save the user
      newAdmin.save(function(err) {
        if (err){
          console.log('Error in Saving admin: '+err);
          throw err;
        }
        console.log('Admin Registration succesful');

        return done(null, newAdmin);

      });
      res.redirect('/personalArea');
    }
  });
};

// Generates hash using bCrypt
var createHash = function(password){
return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
