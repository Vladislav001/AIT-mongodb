var express = require('express');
var router = express.Router();
var Student = require('../models/student');
var Admin = require('../models/user');
//https://metanit.com/nosql/mongodb/2.4.php

router.get('/personalArea', function(req, res) {

  var perPage = 5; // сколько человек отображаь
  var page = req.params.page || 1;

if(req.user.access_level == 3) {
  var students = [];

  // Получим список студентов, привязанных к тренеру
  Student.find({parent_ID: req.user._id },  function(err, students) {
    res.render('personalArea', {
      title: 'personalArea',
      user: req.user,
      students: students
    });
  });
} else if (req.user.access_level == 2) {
    var coaches = [];

    // Получим список тренеров, привязанных к админу
    Admin.find({parent_ID: req.user._id },  function(err, coaches) {
      res.render('personalArea', {
        title: 'personalArea',
        user: req.user,
        coaches: coaches
      });
    });
} else if (req.user.access_level == 1) {
    var admins = [];

    // Получим список админов(НЕ ГЛАВНЫХ)
    Admin.find({access_level: 2 },  function(err, admins) {
      res.render('personalArea', {
        title: 'personalArea',
        user: req.user,
        admins: admins
      });
    });
}




});

module.exports = router;
