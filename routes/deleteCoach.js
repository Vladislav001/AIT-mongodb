var Coach = require('../models/user');
var Student = require('../models/student');
var express = require('express');
var router = express.Router();
var async = require('async');
// переделать бы на https://metanit.com/nosql/mongodb/2.11.php

exports.post = function(req, res) {

  // Необходимо выполнить последоватеьное удаление - ибо иногда тренер удаляется раньше, чем студенты -> студенты не удалились из БД
  async.waterfall(
      [
          function(callback) {
            // Удаляем студентов, привязанных к тренеру
            var deleteStudents = Student.remove({parent_ID : req.params.idTag}, function (err) {});
              callback(null, deleteStudents);
          },
          function(deleteStudents, callback) {
            // Удаляем тренера
              var deleteCoache =   Coach.remove({ _id: req.params.idTag }, function (err) {});
              callback(null, deleteCoache);
          },
      ],
      function (err, deleteCoache) {
        //  console.log(deleteAdmin);
          // Node.js and JavaScript Rock!
      }
  );


  // удаление студентов привязанных к нему или перепривязка??
  res.redirect('/personalArea/1');
};
