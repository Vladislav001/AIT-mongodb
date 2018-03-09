var mongoose = require('mongoose');

// Задаем имя коллекции - *в БД оно преобразуется в нижний регистр
module.exports = mongoose.model('Student',{
    name: String,
    password: String
});
