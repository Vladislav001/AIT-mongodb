var express = require('express');
var router = express.Router();
var Student = require('../models/student');


router.get('/profileStudent', function(req, res) {
  res.render('profileStudent', {
    title: 'profileStudent',
    user: req.user
  });
});

module.exports = router;
