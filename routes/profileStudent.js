var Student = require('../models/student');
var express = require('express');
var router = express.Router();

exports.get = function(req, res) {

  // Получим данные о конкретном студенте
  Student.findById(req.params.idTag,  function(err, data) {

    res.render('profileStudent', {
      title: 'profileStudent',
      id: data._id,
      login: data.login,
      name: data.name,
      age: data.age,
      gender: data.gender
    });
  });

};
