const mongoose = require('mongoose');

const moneyGameSchema = mongoose.Schema({
    pid_id: {
        type: String,
        required: true
    },
    settings: {
        type: Array,
        required: true
    },
    statistics: {
        type: Array
    }
}); 

moneyGameSchema.virtual('moneyGameId').get(function(){
    return this._id;
});

let moneyGame = mongoose.model('moneyGame', moneyGameSchema);

module.exports = moneyGame;

