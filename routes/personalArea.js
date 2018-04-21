var express = require('express');
var router = express.Router();
var Student = require('../models/student');
var Admin = require('../models/user');
//https://metanit.com/nosql/mongodb/2.4.php

router.get('/personalArea', function(req, res) {

if(req.user.access_level == 3) {
  var students = [];

  // Получим список студентов, привязанных к тренеру
  Student.find({parent_ID: req.user._id },  function(err, data) {
    //  console.log(err, data, data.length);
    students = data;
    res.render('personalArea', {
      title: 'personalArea',
      user: req.user,
      length: data.length,
      students: students
    });
  });
} else if (req.user.access_level == 2) {
    var coaches = [];

    // Получим список тренеров, привязанных к админу
    Admin.find({parent_ID: req.user._id },  function(err, data) {
      coaches = data;

      res.render('personalArea', {
        title: 'personalArea',
        user: req.user,
        length: data.length,
        coaches: coaches
      });
    });
} else if (req.user.access_level == 1) {
    var admins = [];

    // Получим список админов(НЕ ГЛАВНЫХ)
    Admin.find({access_level: 2 },  function(err, data) {
      admins = data;
      res.render('personalArea', {
        title: 'personalArea',
        user: req.user,
        length: data.length,
        admins: admins
      });
    });
}




});

module.exports = router;
