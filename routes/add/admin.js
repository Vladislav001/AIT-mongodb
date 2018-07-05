var Admin = require('../../models/user');
var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');

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
      res.redirect('/personalArea/1');

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
        sendEmailSuccesRegistration(req.headers.host, req.body.email);
        console.log('Admin Registration succesful');

        return done(null, newAdmin);
      });
      res.redirect('/personalArea/1');
    }
  });
};

// Generates hash using bCrypt
var createHash = function(password){
return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

//Выслать на почту уведомление
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
