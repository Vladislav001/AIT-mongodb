const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
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
    profile_photo: {
      data: Buffer,
      contentType: String
    },
    parent_ID: {
        type: String,
        required: true
    },
    application_1: {
        type: Object,
        default: {
          results: { // т.к в api уже обращаемся к нему

          }
        }
      },
});

studentSchema.virtual('userId').get(function(){
    return this._id;
});

let Student = mongoose.model('Student', studentSchema);

module.exports = Student;
