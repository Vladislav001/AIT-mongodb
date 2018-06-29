var Student = require('../../../models/student');
var express = require('express');
var router = express.Router();

exports.post = function(req, res) {

  numberResult = req.body.numberResult; // номер результатов (должна быть выбора из бд рез-ов и наращивание счетчика) - req.body исчезнет
  numberQuestion = req.body.numberQuestion; // тащим уже непосредственно с req.body
  answerOnQuestion = req.body.answerOnQuestion; // тащим уже непосредственно с req.body
  timeOnQuestion = req.body.timeOnQuestion; // тащим уже непосредственно с req.body
  happinesOnQuestion = req.body.happinesOnQuestion; // тащим уже непосредственно с req.body

  Student.updateOne({
    "_id": req.userId
  }, {
    $set: {
      "results":  {
      [numberResult]: {
        [numberQuestion]: {
            "answer": answerOnQuestion,
            "time":  timeOnQuestion,
            "happines": happinesOnQuestion
          }
        }
      },
    }
  }, function(err, results) {
    if (err) return res.status(500).send('Error on the server.');
    res.status(200).send({ results: "Данные успешно обновлены" });
  });


};
