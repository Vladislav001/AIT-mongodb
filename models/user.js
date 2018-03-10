var mongoose = require('mongoose');

// Задаем имя коллекции - *в БД оно преобразуется в нижний регистр
// module.exports = mongoose.model('Trainer',{
//     email: String,
//     password: String,
//     date_registration: String
// });


var trainerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: String,
        default: Date.now
    },
});

trainerSchema.virtual('userId').get(function(){
    return this._id;
});

var User = mongoose.model('Trainer', trainerSchema);

module.exports = User;