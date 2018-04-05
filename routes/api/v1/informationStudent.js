var Student = require('../../../models/student');
var express = require('express');
var router = express.Router();

exports.get = function(req, res) {
  Student.findById(req.userId, { password: 0 }, function (err, user) {
     if (err) return res.status(500).send("There was a problem finding the user.");
     if (!user) return res.status(404).send("No user found.");

     res.status(200).send(user);
   });
};
