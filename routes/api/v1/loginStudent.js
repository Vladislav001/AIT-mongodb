var Student = require('../../../models/student');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bCrypt = require('bcrypt-nodejs');

exports.post = function(req, res) {
  Student.findOne({ 'login' : req.body.login }, function (err, student) {
      if (err) return res.status(500).send('Error on the server: ' + err);
      if (!student) return res.status(404).send({ auth: false, token: null }); 
      // var isValidPassword = function(student, password){
      // return bCrypt.compareSync(password, student.password);
      // }
      // if (!isValidPassword) return res.status(401).send({ auth: false, token: null });
      if(student.password != req.body.password ) return res.status(401).send({ auth: false, token: null }); // т.к не шифрую для студентов пароль
      var token = jwt.sign({ id: student._id }, 'supersecret', {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
};
