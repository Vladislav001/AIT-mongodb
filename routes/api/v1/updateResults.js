var Student = require('../../../models/student');
var express = require('express');
var router = express.Router();

exports.post = function(req, res) {
  // После того как данные будут заноситься - проверить, чтобы можно было подтянуть значения + можно добавлять другие сущности (напр result_2)
  numberResult = req.body.numberResult; // номер результата - приходит из android
  numberQuestion = req.body.numberQuestion; //  номер вопроса - приходит из android
  answerOnQuestion = req.body.answerOnQuestion; // ответ на вопрос (нравится/не нравится) - приходит из android
  timeOnQuestion = req.body.timeOnQuestion; // время ответа (может и не будет такого) - приходит из android
  happinesOnQuestion = req.body.happinesOnQuestion; // уровень счастья при ответе на вопрос - приходит из android


// Формируем путь до рез-ов вопроса в БД
var path = "application_1.results." + numberResult + "." + numberQuestion;

  // 1 вариант мб
  Student.updateOne({
    "_id": req.userId,
   },{
      $set: {
        [path] : {
          "answer": answerOnQuestion,
          "time":  timeOnQuestion,
          "happines": happinesOnQuestion
        }
       }
     }, function(err, results) {
       if (err) return res.status(500).send('Error on the server: ' + err);
       res.status(200).send({ results: "Данные успешно обновлены" });
     });


     Student.findOne({ "_id": req.userId }, function(err, user) {
      console.log(user + " user");
      console.log(user.application_1 + " user.application_1");
      console.log(Array(JSON.stringify (user.application_1)) + " application_1");
    //  console.log(JSON.stringify (user.application_1) + " application_1 sdsd");

     });



};
