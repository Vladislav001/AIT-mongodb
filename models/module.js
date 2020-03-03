const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    active: {
        type: String,
        default: 'true',
        required: true
    },
    created: {
        type: String,
        default: Date.now
    },
    developer_ID: {
        type: String,
        default: '',
        required: false
    }
});

moduleSchema.virtual('moduleId').get(function(){
    return this._id;
});

let Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
