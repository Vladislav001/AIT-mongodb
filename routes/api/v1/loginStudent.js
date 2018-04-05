var Student = require('../../../models/student');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bCrypt = require('bcrypt-nodejs');

exports.post = function(req, res) {
  Student.findOne({ 'login' : req.body.login }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var isValidPassword = function(user, password){
      return bCrypt.compareSync(password, user.password);
      }
      if (!isValidPassword) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, 'supersecret', {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
};
