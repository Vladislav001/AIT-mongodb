var mongoose = require('mongoose');

// Задаем имя коллекции - *в БД оно преобразуется в нижний регистр
// module.exports = mongoose.model('Student',{
//     login: String,
//     password: String
// });

var studentSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    parent_ID: {
        type: String,
        required: true
    },
    application_1: {
        type: Array
      },
      application_2: {
          type: Array
        }
});

studentSchema.virtual('userId').get(function(){
    return this._id;
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;
