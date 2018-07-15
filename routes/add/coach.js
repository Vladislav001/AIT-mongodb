var Coach = require('../../models/user');
var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');

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
        sendEmailSuccesRegistration(req.headers.host, req.body.email);
        console.log('Coach Registration succesful');

        return done(null, newCoach);
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
