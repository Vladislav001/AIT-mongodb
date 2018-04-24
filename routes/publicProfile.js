var Student = require('../models/student');
var Admin = require('../models/user');
var express = require('express');
var router = express.Router();

exports.get = function(req, res) {

  // Как-то же надо проверять кого смотрим - ИСПРАВИТЬ ПО НОРМУ
  var publicPage;
  var url = req.url;
  if(url.indexOf("admins") != -1){
    publicPage = "admins";
  } else if(url.indexOf("coaches") != -1){
        publicPage = "coaches";
  } else if(url.indexOf("students") != -1){
        publicPage = "students";
  }

  if(req.user.access_level == 3) {

  // Получим данные о конкретном студенте
  Student.findById(req.params.idTag,  function(err, dataStudent) {

    res.render('publicProfile', {
      title: 'profileStudent',
      user: req.user,
      student: dataStudent
    });
  });
} else if (req.user.access_level == 2) {
    var students = [];

    // Получим данные о конкретном тренере - его список студентов
    Student.find({parent_ID: req.params.idTag },  function(err, dataStudents) {
      students = dataStudents;

      // Получим данные о конкретном студенте
      Student.findById(req.params.idTag,  function(err, dataStudent) {

        res.render('publicProfile', {
          title: 'profileAdmin',
          user: req.user,
          lengthStudents: dataStudents.length,
          publicPage: publicPage,
          idTag: req.params.idTag,
          students: students,
          student: dataStudent
        });
      });
    });
  } else if (req.user.access_level == 1) {
      var coaches = [];
      var students = [];

      // Получим данные о конкретном админе(НЕ ГЛАВНОМ) - его список тренеров
      // Admin.find({ $or : [ { parent_ID :req.params.idTag }, {_id:req.params.idTag} ] },  function(err, dataCoaches) {
      Admin.find({parent_ID: req.params.idTag },  function(err, dataCoaches) {
        coaches = dataCoaches;
      
        // Получим данные о конкретном тренере - его список студентов
        Student.find({parent_ID: req.params.idTag },  function(err, dataStudents) {
          students = dataStudents;

          // Получим данные о конкретном студенте
          Student.findById(req.params.idTag,  function(err, dataStudent) {
              student = dataStudent;

            res.render('publicProfile', {
              title: 'profileAdmin',
              user: req.user,
              lengthCoaches: dataCoaches.length,
              lengthStudents: dataStudents.length,
              publicPage: publicPage,
              idTag: req.params.idTag,
              coaches: coaches,
              students: students,
              student: dataStudent
            });
          });
      });
    });
  }

};
