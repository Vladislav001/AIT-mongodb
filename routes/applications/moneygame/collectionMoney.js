var Student = require('../../../models/student');
var express = require('express');


exports.get = function(req, res) {

    // Получим данные о конкретном студенте
    Student.findById(req.params.idTag,  function(err, data) {
  
      res.render('./applications/moneygame/collectionMoney', {
        id: data._id,
      });
    });
  
  };