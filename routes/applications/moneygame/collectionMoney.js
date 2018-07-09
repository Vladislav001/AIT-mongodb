var Student = require("../../../models/student");
var Application = require("../../../models/application");
var express = require("express");

exports.get = function(req, res) {
  // Получим данные о конкретном студенте
  Student.findById(req.params.idTag, function(err, student) {
    Application.find({name: 'MoneyGame'}, function(err, application) {
      res.render("./applications/moneygame/collectionMoney", {
        student: student,
        settings: JSON.stringify((application[0].settings[0][req.params.idTag]))
      });
    });
  });
};
