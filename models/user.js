var mongoose = require('mongoose');

// Задаем имя коллекции - *в БД оно преобразуется в нижний регистр
module.exports = mongoose.model('Trainer',{
    email: String,
    password: String,
    date_registration: String
});
