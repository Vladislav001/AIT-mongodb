var Student = require('../models/student');
var express = require('express');
var router = express.Router();

exports.post = function(req, res, done) {
  var newStudent = new Student();

  newStudent.login = req.body.login;
  newStudent.password = req.body.password;
  newStudent.name = req.body.name;
  newStudent.age = req.body.age;
  newStudent.gender = req.body.gender;
  newStudent.trainer_ID = req.user._id;

  // save the user
  newStudent.save(function(err) {
  if (err){
  console.log('Error in Saving student: '+err);
  throw err;
  }
  console.log('Student Registration succesful');
  return done(null, newStudent);

  });

  res.redirect('/personalArea');

};


// router.post('/addNewStudent', function(req, res, done) {
// Student.findOne({ 'login' : req.body.login }, function(err, user) {
// // In case of any error, return using the done method
// if (err){
// console.log('Error in SignUp: '+err);
// return done(err);
// }
// // already exists
// if (user) {
// console.log('User already exists with email: '+req.body.login);
// return done(null, false, req.flash('message','User Already Exists'));
//
// } else {
// var newStudent = new Student();
//
// newStudent.login = req.body.login;
// newStudent.password = req.body.password;
// newStudent.name = req.body.name;
// newStudent.age = req.body.age;
// newStudent.gender = req.body.gender;
// newStudent.trainer_ID = req.user._id;
//
// // save the user
// newStudent.save(function(err) {
// if (err){
// console.log('Error in Saving student: '+err);
// throw err;
// }
// console.log('Student Registration succesful');
// return done(null, newStudent);
//
// });
// res.redirect('/personalArea');
// }
//   });
// });
