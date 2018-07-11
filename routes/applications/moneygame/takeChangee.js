var Student = require("../../../models/student");
var Application = require("../../../models/application");
var express = require("express");

exports.get = function (req, res) {
  // Получим данные о конкретном студенте
  Student.findById(req.params.idTag, function (err, student) {
    Application.find({ name: 'MoneyGame' }, { settings: '5b3dedead35c5a375cb6021e' }, function (err, application) {
      console.log(application);
      res.render("./applications/moneygame/takeChangee", {
        student: student,
        settings: JSON.stringify((application[0].settings[0][req.params.idTag]))
      });
    });
  });
};

exports.post = function (req, res) {
  Application.update({ name: 'MoneyGame' }, { $set: { settings: { '5b3dedead35c5a375cb6021e': req.body } } }, function (err, data) {
    if (err) return res.status(500).send('Error on the server: ' + err);
    res.status(200).send({ results: "Данные успешно обновлены" });
  });

}