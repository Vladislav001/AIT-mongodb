const PID = require('../../../models/pid');

exports.post = function(req, res) {
  // После того как данные будут заноситься - проверить, чтобы можно было подтянуть значения + можно добавлять другие сущности (напр result_2)
  numberResult = req.body.numberResult; // номер результата - приходит из android
  numberQuestion = req.body.numberQuestion; //  номер вопроса - приходит из android
  answerOnQuestion = req.body.answerOnQuestion; // ответ на вопрос (нравится/не нравится) - приходит из android
  timeOnQuestion = req.body.timeOnQuestion; // время ответа (может и не будет такого) - приходит из android
  happinesOnQuestion = req.body.happinesOnQuestion; // уровень счастья при ответе на вопрос - приходит из android


  // Формируем путь до рез-ов вопроса в БД
  //var path = "application_1.results." + numberResult + "." + numberQuestion;
  let path = "application_1.results." + numberResult + "." + numberQuestion;

  // 1 вариант мб
  PID.updateOne({
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



  // робит для path = "application_2";
  //   Student.findOne({ "_id": req.userId }, function(err, user) {
  //   if (err) throw err;
  //   console.log(user + " user");
  //   console.log(user.application_2[0].answer + " user.application_2");
  //   console.log(Array(JSON.stringify (user.application_2) + " application_2"));
  // });

  // робит для path = "application_2.results";
  // Student.findOne({ "_id": req.userId }, function(err, user) {
  // if (err) throw err;
  // console.log(user + " user");
  // console.log(user.application_2[0].results.answer + " user.application_2");
  // console.log(Array(JSON.stringify (user.application_2[0].results) + " application_2"));
  // });

  // робит для var path = "application_2.results." + numberResult;
  // Student.findOne({ "_id": req.userId }, function(err, user) {
  // if (err) throw err;
  // console.log(user + " user");
  // console.log(user.application_2[0].results[1].time + " user.application_2");
  // console.log(Array(JSON.stringify (user.application_2[0].results[1].answer) + " application_2"));
  // });

  // робит для var path = "application_2.results." + numberResult + "." + numberQuestion;
  // Вроде так работает*
  // application_2[0] - указывает на сущность, т.е если добавим settings, то к ней обращаться [1]
  //results[1][0] - [1] указывает на номер рез-та, [0] - на номер вопроса (где значение в [] есть КЛЮЧ, а не номер в массиве, т.е возможно и так ['ggg'])

  // Student.findOne({ "_id": req.userId }, function(err, user) {
  // if (err) throw err;
  // console.log(user + " user");
  // console.log(user.application_1[0].results[1] + " user.application_1");
  // console.log(Array(JSON.stringify (user.application_1[0].results[1][1].answer) + " application_1")); // Получаем значение answer из 2 ответа, находящегося в рез-те=1
  // //console.log(Array(J SON.stringify (user.application_2[0].test_settings) + " test_settings")); // второй массив
  // });


};
