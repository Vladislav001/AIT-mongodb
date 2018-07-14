var Student = require('../../models/student');
var express = require('express');
var router = express.Router();
 

exports.post = function(req, res, done) {
  Student.findOne({ 'login' : req.body.login }, function(err, user) {
    // In case of any error, return using the done method
    if (err){
      console.log('Error in SignUp: '+ err);
      return done(err);
    }
    // already exists
    if (user) {
      return res.sendStatus(403);
      res.json('Student already exists with login: ' + req.body.login);
    } else {
      var newStudent = new Student();

      newStudent.login = req.body.login;
      newStudent.password = req.body.password;
      newStudent.name = req.body.name;
      newStudent.age = req.body.age;
      newStudent.gender = req.body.gender;
      //Если добавляем из ЛК, то по св-ву авторизованного, а если с публичного профиля - по GET
      if(req.user.access_level == 3){
        newStudent.parent_ID = req.user._id;
      } else {
        newStudent.parent_ID = req.body.idTag;
      }

      // save the user
      newStudent.save(function(err) {
        if (err){
          console.log('Error in Saving student: ' + err);
          throw err;
        }
        console.log('Student Registration succesful');

        return done(null, newStudent);

      });
      return res.sendStatus(200);
      //  res.redirect('/personalArea/1'); // т.к через ajax, то таблица автоматом обновляется
    }
  });
};
