var Student = require('../models/student');
var Application = require('../models/application');
var express = require('express');
var router = express.Router();

exports.post = function (req, res) {

  //remove settings of student before removing him
  Application.find({ name: 'MoneyGame' }, function (err, application) {
    var settings;
    var indexInArray = false;

    settings = application[0].settings;
    settings.map((item, index) => {
      for (var key in item) {
        if (key == req.params.idTag) {
          indexInArray = index;
          break;
        }
      }
    })

    //if settings exist, then remove
    if (indexInArray !== false) {
      settings.splice(indexInArray, 1);

      Application.update({ name: 'MoneyGame' }, { $set: { settings: settings } }, function (err, data) { });
    }

  });

  //removing student from DB
  Student.remove({ _id: req.params.idTag }, function (err) {
    if (err) return next(err)
  });


  res.redirect('/personalArea/1');
};
