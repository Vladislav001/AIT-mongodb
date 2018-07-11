var Student = require("../../../models/student");
var Application = require("../../../models/application");
var express = require("express");

exports.get = function (req, res) {
  // Получим данные о конкретном студенте
//   Student.findById(req.params.idTag, function (err, student) {

//     var defaultSettings = req.params.idTag.toString() = {
//       againBtn: '1',
//       backBtn: '1',
//       basket: '1',
//       parnet: '1',
//       progressBar: 'false'
//     }

//     Application.find({ name: 'MoneyGame' }, { settings: req.params.idTag }, function (err, application) {

//   //     if (err) {
//   //       Application.update({ name: 'MoneyGame' }, { $push: { settings: defaultSettings } }, function (err, application) {
//   //         Application.find({ name: 'MoneyGame' }, { settings: req.params.idTag }, function (err, application) {
//   //           res.render("./applications/moneygame/paymentPurchase", {
//   //             student: student,
//   //             settings: JSON.stringify((application[0].settings[0][req.params.idTag]))
//   //           });
//   //         })
//   //       })
//   //     }

//   //     res.render("./applications/moneygame/paymentPurchase", {
//   //       student: student,
//   //       settings: JSON.stringify((application[0].settings[0][req.params.idTag]))
//   //     });
//   //   });
//   }
// );
};

exports.post = function (req, res) {
  // Application.update({ name: 'MoneyGame' }, { $set: { settings: { [req.params.idTag]: req.body } } }, function (err, data) {
  //   if (err) return res.status(500).send('Error on the server: ' + err);
  //   res.status(200).send({ results: "Данные успешно обновлены" });
  // });

}