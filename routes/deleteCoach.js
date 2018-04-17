var Coach = require('../models/user');
var express = require('express');
var router = express.Router();

exports.post = function(req, res) {

  Coach.remove({ _id: req.params.idTag }, function (err) {});
  // удаление студентов привязанных к нему или перепривязка??
  res.redirect('/personalArea');
};
