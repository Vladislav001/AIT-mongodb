var Coach = require('../models/user');
var Student = require('../models/student');
var express = require('express');
var router = express.Router();

exports.post = function(req, res) {

  // Удаляем студентов, привязанных к тренеру
  Student.remove({parent_ID : req.params.idTag}, function (err) {});
  // Удаляем тренера
  Coach.remove({ _id: req.params.idTag }, function (err) {});

  // удаление студентов привязанных к нему или перепривязка??
  res.redirect('/personalArea/1');
};
