var Student = require('../models/student');
var express = require('express');
var router = express.Router();


router.post('/addNewStudent', function(req, res) {
console.log('ADd + ' + req.body.username);
});


module.exports = router;
