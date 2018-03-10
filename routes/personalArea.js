var express = require('express');
var router = express.Router();
var Student = require('../models/student');
//https://metanit.com/nosql/mongodb/2.4.php

router.get('/personalArea', function(req, res) {

var students = [];

// Получим список студентов, привязанных к тренеру
Student.find({trainer_ID: req.user._id }, {login: true},  function(err, data) {
//  console.log(err, data, data.length);
students = data;

res.render('personalArea', {
  title: 'personalArea',
  user: req.user,
  length: data.length,
  students: students
});
});


 //  res.render('personalArea', {
 //    title: 'personalArea',
 //    user: req.user
 //  });
});

module.exports = router;
