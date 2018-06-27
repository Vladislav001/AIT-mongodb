var Admin = require('../models/user');
var Student = require('../models/student');
var express = require('express');
var router = express.Router();
var async = require('async');

exports.post = function(req, res) {

  // Необходимо выполнить последоватеьное удаление - ибо иногда тренер удаляется раньше, чем студенты -> студенты не удалились из БД
  async.waterfall(
      [
          function(callback) {
            // Удаляем студентов, привязанных к тренерам, которые привязаны к админу
            var deleteStudents =  Admin.find({parent_ID : req.params.idTag},  function(err, coaches) { // находим всех тренеров
              if (err) return next(err)
              for(var i = 0; i < coaches.length; i++){
                  Student.remove({parent_ID : coaches[i]._id}, function (err) {}); // удаляем студентов, с parent_ID конкретного тренера
              }
            });
              callback(null, deleteStudents);
          },
          function(deleteStudents, callback) {
            // Удаляем тренеров, привязанных к админу
              var deleteCoaches =  Admin.remove({parent_ID : req.params.idTag}, function (err) {});
              callback(null, deleteCoaches);
          },
          function(deleteCoaches, callback) {
            // Удаляем админа
              deleteAdmin =   Admin.remove({ _id: req.params.idTag }, function (err) {});
              callback(null, deleteAdmin);
          }
      ],
      function (err, deleteAdmin) {
        //  console.log(deleteAdmin);
          // Node.js and JavaScript Rock!
      }
  );

// Удаление всех тренеров и студентов тренеров или же перепривязка
  res.redirect('/personalArea/1');
};
