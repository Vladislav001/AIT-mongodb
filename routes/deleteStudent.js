var Student = require('../models/student');
var express = require('express');
var router = express.Router();

exports.post = function(req, res) {

  Student.remove({ _id: req.params.idTag }, function (err) {});
  res.redirect('/personalArea/1');
};
