var Student = require('../models/student');
var express = require('express');
var router = express.Router();


router.post('/addNewStudent', function(req, res, done) {

var newStudent = new Student();

newStudent.login = req.body.login;
newStudent.password = req.body.password;
newStudent.trainer_ID = req.user._id;

// save the user
newStudent.save(function(err) {
if (err){
console.log('Error in Saving student: '+err);
throw err;
}
console.log('Student Registration succesful');
return done(null, newStudent);

});

res.redirect('/personalArea');
});


module.exports = router;
