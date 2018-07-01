var Student = require('../models/student');
var express = require('express');
var router = express.Router();


exports.post = function(req, res) {

  // Обновим данные конкретнго студента
  Student.updateOne({
    "_id": req.params.idTag
  }, {
    $set: {
      "login": req.body.login,
      "name": req.body.name,
      "age": req.body.age,
      "gender": req.body.gender,
    }
  }, function(err, results) {
    console.log(results.result);
  });
  res.redirect('/publicProfile/students/id' + req.params.idTag);

};
