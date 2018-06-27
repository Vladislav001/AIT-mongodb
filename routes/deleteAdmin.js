var Admin = require('../models/user');
var Student = require('../models/student');
var express = require('express');
var router = express.Router();

exports.post = function(req, res) {

  // Удаляем студентов, привязанных к тренерам, которые привязаны к админу
  Admin.find({parent_ID : req.params.idTag},  function(err, dataCoaches) { // находим всех тренеров
    for(var i = 0; i < dataCoaches.length; i++){
        Student.remove({parent_ID : dataCoaches[i]._id}, function (err) {}); // удаляем студентов, с parent_ID конкретного тренера
    }
  });
  // Удаляем тренеров, привязанных к админу
  Admin.remove({parent_ID : req.params.idTag}, function (err) {});
  // Удаляем админа
  Admin.remove({ _id: req.params.idTag }, function (err) {});


// Удаление всех тренеров и студентов тренеров или же перепривязка
  res.redirect('/personalArea/1');
};
