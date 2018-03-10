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
    trainer_ID: {
        type: String,
        required: true
    },
});

studentSchema.virtual('userId').get(function(){
    return this._id;
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;
