var Student = require('../../../models/student');
var express = require('express');
var router = express.Router();

exports.post = function(req, res) {

  numberResult = req.body.numberResult; // номер результата - приходит из android
  numberQuestion = req.body.numberQuestion; //  номер вопроса - приходит из android
  answerOnQuestion = req.body.answerOnQuestion; // ответ на вопрос (нравится/не нравится) - приходит из android
  timeOnQuestion = req.body.timeOnQuestion; // время ответа (может и не будет такого) - приходит из android
  happinesOnQuestion = req.body.happinesOnQuestion; // уровень счастья при ответе на вопрос - приходит из android

  // Student.updateOne({
  //   "_id": req.userId
  // }, {
  //   $set: {
  //     "application_1": {
  //       "results":  {
  //       [numberResult]: {
  //         [numberQuestion]: {
  //             "answer": answerOnQuestion,
  //             "time":  timeOnQuestion,
  //             "happines": happinesOnQuestion
  //           }
  //         }
  //       }
  //     },
  //   }
  // }, function(err, results) {
  //   if (err) return res.status(500).send('Error on the server.');
  //   res.status(200).send({ results: "Данные успешно обновлены" });
  // });

  // Student.update({
  //   "_id": req.userId,
  //  },{
  //     $push: {
  //       "application_1" : {
  //         "results" : {
  //         1: {
  //             [numberQuestion]: {
  //               "answer": 'answerOnQuestion',
  //                "time":  'timeOnQuestion',
  //                "happines": 'happinesOnQuestion'
  //             }
  //           }
  //         }
  //       }
  //      }
  //    }, function(err, results) {
  //      if (err) return res.status(500).send('Error on the server.');
  //      res.status(200).send({ results: "Данные успешно обновлены" });
  //    });

Student.update({"_id":req.userId},{"results":{$set: {"NEW_KEY" : "NEW_VALUE"}}},false,true);


};


// Student.update({
//   "_id": req.userId
//  },{
//     $push: {
//       "application_2": "dad"
//      }
//    },callback)
