var Student = require('../../../models/student');
var express = require('express');
var router = express.Router();

exports.post = function(req, res) {
  Student.updateOne({
    "_id": req.userId
  }, {
    $set: {
      "name":  req.body.name,
    }
  }, function(err, results) {
    if (err) return res.status(500).send('Error on the server.');
    res.status(200).send({ results: "Данные успешно обновлены" });
  });
};
