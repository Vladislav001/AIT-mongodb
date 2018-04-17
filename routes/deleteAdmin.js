var Admin = require('../models/user');
var express = require('express');
var router = express.Router();

exports.post = function(req, res) {

  Admin.remove({ _id: req.params.idTag }, function (err) {});
// Удаление всех тренеров и студентов тренеров или же перепривязка

  res.redirect('/personalArea');
};
 
